'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type Ref,
} from 'react'
import { LoopPause } from '@/lib/media.tsx'
import { cn, focusRing, touchTarget, useLoopControl, usePrefersReducedMotion } from '@/lib/utils.ts'

const MESH_VS = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const MESH_FS = `
precision highp float;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_play;
varying vec2 v_uv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.52;
  }
  return v;
}
void main() {
  vec2 uv = v_uv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  vec2 m = u_mouse - 0.5;
  float t = u_time * 0.16 * u_play;
  vec2 q = p + 0.22 * vec2(fbm(p * 1.7 + t), fbm(p * 1.7 - t));
  q += m * 0.28;
  float n = fbm(q * 2.2 + t);
  float n2 = fbm(q * 4.1 - t * 0.8);
  vec3 ink = vec3(0.035, 0.04, 0.075);
  vec3 iris = vec3(0.30, 0.275, 0.88);
  vec3 teal = vec3(0.13, 0.77, 0.69);
  vec3 gold = vec3(0.95, 0.76, 0.48);
  vec3 col = mix(ink, iris, smoothstep(0.18, 0.72, n));
  col = mix(col, teal, smoothstep(0.5, 0.92, n2) * 0.7);
  col = mix(col, gold, smoothstep(0.78, 1.0, n) * 0.5);
  float d = length(p - m * 0.85);
  col += exp(-d * 3.6) * vec3(0.5, 0.42, 1.0) * 0.5;
  float grain = hash(gl_FragCoord.xy + u_time) * 0.06;
  gl_FragColor = vec4(col + grain, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function useInView<T extends HTMLElement>(margin = '80px') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: margin })
    io.observe(node)
    return () => io.disconnect()
  }, [margin])
  return { ref, inView }
}

export function usePointerNorm() {
  const x = useRef(0.5)
  const y = useRef(0.5)
  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.current = (event.clientX - rect.left) / Math.max(1, rect.width)
    y.current = (event.clientY - rect.top) / Math.max(1, rect.height)
  }
  const onPointerLeave = () => {
    x.current = 0.5
    y.current = 0.5
  }
  return { x, y, onPointerMove, onPointerLeave }
}

/** Overlay host whose canvas is always contained by a relative box, never the viewport. */
function FieldFrame({
  className,
  children,
  hostRef,
  onPointerMove,
  onPointerLeave,
}: {
  className?: string
  children: ReactNode
  hostRef: Ref<HTMLDivElement>
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void
  onPointerLeave: () => void
}) {
  return (
    <div className={cn('absolute inset-0 isolate overflow-hidden', className)}>
      <div
        ref={hostRef}
        className="relative size-full overflow-hidden"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {children}
      </div>
    </div>
  )
}

/** Raw WebGL gradient-mesh. Pauses off-screen, on pause, and under reduced motion. */
export function ShaderMesh({
  className,
  paused,
}: {
  className?: string
  paused?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { ref, inView } = useInView<HTMLDivElement>()
  const pointer = usePointerNorm()
  const reduced = usePrefersReducedMotion()
  const loop = useLoopControl(true)
  const halt = paused ?? !loop.playing
  const showPause = paused === undefined && !loop.reduced

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return
    const vs = compile(gl, gl.VERTEX_SHADER, MESH_VS)
    const fs = compile(gl, gl.FRAGMENT_SHADER, MESH_FS)
    if (!vs || !fs) return
    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uRes = gl.getUniformLocation(program, 'u_res')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uPlay = gl.getUniformLocation(program, 'u_play')
    let frame = 0
    let start = performance.now()
    const draw = (now: number) => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth ?? 320
      const h = parent?.clientHeight ?? 200
      const dpr = Math.min(1.5, window.devicePixelRatio || 1)
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, pointer.x.current, 1 - pointer.y.current)
      gl.uniform1f(uTime, (now - start) / 1000)
      const live = !halt && !reduced && inView
      gl.uniform1f(uPlay, live ? 1 : 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (live) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      gl.deleteProgram(program)
    }
  }, [halt, inView, pointer.x, pointer.y, reduced])

  return (
    <FieldFrame className={className} hostRef={ref} onPointerMove={pointer.onPointerMove} onPointerLeave={pointer.onPointerLeave}>
      <canvas ref={canvasRef} className="block size-full" aria-hidden="true" />
      {showPause ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3 z-20" /> : null}
    </FieldFrame>
  )
}

type Particle = { x: number; y: number; vx: number; vy: number; r: number }

/** Cursor-reactive particle field. Caps count on small viewports. */
export function ParticleField({
  className,
  count = 70,
  paused,
  color = '255,255,255',
}: {
  className?: string
  count?: number
  paused?: boolean
  color?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { ref, inView } = useInView<HTMLDivElement>()
  const pointer = usePointerNorm()
  const reduced = usePrefersReducedMotion()
  const loop = useLoopControl(true)
  const halt = paused ?? !loop.playing
  const showPause = paused === undefined && !loop.reduced

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const parent = canvas.parentElement
    const w0 = parent?.clientWidth ?? 320
    const budget = w0 < 500 ? Math.min(36, count) : count
    const dots: Particle[] = Array.from({ length: budget }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
      r: 0.8 + Math.random() * 1.6,
    }))
    let frame = 0
    const draw = () => {
      const w = parent?.clientWidth ?? 320
      const h = parent?.clientHeight ?? 200
      const dpr = Math.min(1.5, window.devicePixelRatio || 1)
      if (canvas.width !== Math.floor(w * dpr)) {
        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const mx = pointer.x.current
      const my = pointer.y.current
      const live = !halt && !reduced && inView
      for (const dot of dots) {
        if (live) {
          const dx = mx - dot.x
          const dy = my - dot.y
          const dist = Math.max(0.04, Math.hypot(dx, dy))
          const force = 0.00018 / dist
          dot.vx += dx * force * (dist < 0.18 ? -1.8 : 0.35)
          dot.vy += dy * force * (dist < 0.18 ? -1.8 : 0.35)
          dot.x += dot.vx
          dot.y += dot.vy
          dot.vx *= 0.96
          dot.vy *= 0.96
          if (dot.x < 0 || dot.x > 1) dot.vx *= -1
          if (dot.y < 0 || dot.y > 1) dot.vy *= -1
          dot.x = Math.min(1, Math.max(0, dot.x))
          dot.y = Math.min(1, Math.max(0, dot.y))
        }
        ctx.beginPath()
        ctx.fillStyle = `rgba(${color},0.75)`
        ctx.arc(dot.x * w, dot.y * h, dot.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.strokeStyle = `rgba(${color},0.12)`
      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const a = dots[i]!
          const b = dots[j]!
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 0.12) {
            ctx.globalAlpha = 1 - d / 0.12
            ctx.beginPath()
            ctx.moveTo(a.x * w, a.y * h)
            ctx.lineTo(b.x * w, b.y * h)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      if (live) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [color, count, halt, inView, pointer.x, pointer.y, reduced])

  return (
    <FieldFrame className={className} hostRef={ref} onPointerMove={pointer.onPointerMove} onPointerLeave={pointer.onPointerLeave}>
      <canvas ref={canvasRef} className="block size-full" aria-hidden="true" />
      {showPause ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3 z-20" /> : null}
    </FieldFrame>
  )
}

/** Fibonacci-sphere globe, canvas projected, cursor-tilted. */
export function GlobeField({
  className,
  paused,
  count = 420,
}: {
  className?: string
  paused?: boolean
  count?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { ref, inView } = useInView<HTMLDivElement>()
  const pointer = usePointerNorm()
  const reduced = usePrefersReducedMotion()
  const loop = useLoopControl(true)
  const halt = paused ?? !loop.playing
  const showPause = paused === undefined && !loop.reduced

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const pts: { x: number; y: number; z: number }[] = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i += 1) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r })
    }
    let frame = 0
    let rot = 0
    const draw = () => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth ?? 320
      const h = parent?.clientHeight ?? 200
      const dpr = Math.min(1.5, window.devicePixelRatio || 1)
      if (canvas.width !== Math.floor(w * dpr)) {
        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const live = !halt && !reduced && inView
      if (live) rot += 0.004
      const tiltX = (pointer.y.current - 0.5) * 0.6
      const tiltY = (pointer.x.current - 0.5) * 0.8
      const cx = w * 0.5
      const cy = h * 0.5
      const scale = Math.min(w, h) * 0.38
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(124,108,255,0.18)'
      ctx.lineWidth = 1
      ctx.arc(cx, cy, scale * 1.08, 0, Math.PI * 2)
      ctx.stroke()
      for (const p of pts) {
        const x1 = p.x * Math.cos(rot + tiltY) - p.z * Math.sin(rot + tiltY)
        const z1 = p.x * Math.sin(rot + tiltY) + p.z * Math.cos(rot + tiltY)
        const y1 = p.y * Math.cos(tiltX) - z1 * Math.sin(tiltX)
        const z2 = p.y * Math.sin(tiltX) + z1 * Math.cos(tiltX)
        const depth = (z2 + 1.4) / 2.4
        ctx.fillStyle = `rgba(${z2 > 0 ? '243,194,122' : '124,108,255'},${0.2 + depth * 0.75})`
        ctx.beginPath()
        ctx.arc(cx + x1 * scale, cy + y1 * scale, 0.7 + depth * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
      if (live) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [count, halt, inView, pointer.x, pointer.y, reduced])

  return (
    <FieldFrame className={className} hostRef={ref} onPointerMove={pointer.onPointerMove} onPointerLeave={pointer.onPointerLeave}>
      <canvas ref={canvasRef} className="block size-full" aria-hidden="true" />
      {showPause ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3 z-20" /> : null}
    </FieldFrame>
  )
}

export function Grain({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay', className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
      }}
    />
  )
}

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789—·'

export function ScrambleText({
  text,
  className,
  as: Tag = 'span',
  trigger = 'mount',
  playing = true,
}: {
  text: string
  className?: string
  as?: 'span' | 'p' | 'h2' | 'h3'
  trigger?: 'mount' | 'hover'
  playing?: boolean
}) {
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(reduced ? text : text.replace(/[^\s]/g, '·'))
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (reduced || !playing) {
      setShown(text)
      return
    }
    if (trigger === 'hover' && !hover) {
      setShown(text)
      return
    }
    let frame = 0
    let step = 0
    const run = () => {
      step += 1
      const next = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < step / 2) return ch
          return CHARSET[Math.floor(Math.random() * CHARSET.length)] ?? ch
        })
        .join('')
      setShown(next)
      if (step < text.length * 2 + 8) frame = requestAnimationFrame(run)
      else setShown(text)
    }
    frame = requestAnimationFrame(run)
    return () => cancelAnimationFrame(frame)
  }, [hover, playing, reduced, text, trigger])

  return (
    <Tag
      className={className}
      aria-label={text}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <span aria-hidden="true">{shown}</span>
    </Tag>
  )
}

export function SplitMask({
  text,
  className,
  playing = true,
}: {
  text: string
  className?: string
  playing?: boolean
}) {
  const reduced = usePrefersReducedMotion()
  const lines = text.split('\n')
  return (
    <span className={cn('block', className)} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            aria-hidden="true"
            className="block"
            initial={reduced || !playing ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function Odometer({
  value,
  className,
  digits = 3,
}: {
  value: number
  className?: string
  digits?: number
}) {
  const reduced = usePrefersReducedMotion()
  const padded = String(Math.max(0, Math.round(value))).padStart(digits, '0').slice(-digits)
  return (
    <span className={cn('inline-flex font-mono tabular-nums tracking-tight', className)} aria-label={String(value)}>
      {padded.split('').map((digit, i) => (
        <span key={i} className="inline-block h-[1.05em] overflow-hidden leading-none">
          {reduced ? (
            <span aria-hidden="true">{digit}</span>
          ) : (
            <motion.span
              key={digit}
              aria-hidden="true"
              className="inline-block"
              initial={false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            >
              {digit}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  )
}

export function PathDraw({
  d,
  className,
  playing = true,
  duration = 1.4,
}: {
  d: string
  className?: string
  playing?: boolean
  duration?: number
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <svg viewBox="0 0 120 40" className={className} aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={reduced || !playing ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}

export function TiltGlare({
  children,
  className,
  max = 10,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 180, damping: 16 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 180, damping: 16 })
  const glareX = useTransform(mx, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(my, [-0.5, 0.5], [0, 100])

  function move(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width - 0.5)
    my.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className={cn('relative', className)}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
        style={{
          background: useTransform([glareX, glareY], ([x, y]) => `radial-gradient(420px circle at ${x}% ${y}%, rgba(255,255,255,0.42), transparent 55%)`),
        }}
      />
    </motion.div>
  )
}

export function MagneticWell({
  children,
  className,
  strength = 18,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  function move(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength * 2)
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength * 2)
  }

  return (
    <motion.div className={className} style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }}>
      {children}
    </motion.div>
  )
}

export function OrbitRing({
  items,
  className,
  radius = 88,
  paused,
}: {
  items: ReactNode[]
  className?: string
  radius?: number
  paused?: boolean
}) {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>()
  const loop = useLoopControl(true)
  const halt = (paused ?? !loop.playing) || reduced || !inView
  const showPause = paused === undefined && !loop.reduced
  return (
    <div ref={ref} className={cn('relative mx-auto aspect-square', className)} style={{ width: radius * 2 + 48 }}>
      {items.map((item, i) => {
        const angle = (i / items.length) * 360
        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            animate={halt ? { rotate: angle } : { rotate: [angle, angle + 360] }}
            transition={halt ? undefined : { duration: 22, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '0 0' }}
          >
            <motion.div
              style={{ transform: `translate(${radius}px, -50%)` }}
              animate={halt ? { rotate: -angle } : { rotate: [-angle, -angle - 360] }}
              transition={halt ? undefined : { duration: 22, repeat: Infinity, ease: 'linear' }}
              className="rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[11px] whitespace-nowrap text-white backdrop-blur"
            >
              {item}
            </motion.div>
          </motion.div>
        )
      })}
      {showPause ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-0 bottom-0 z-20" /> : null}
    </div>
  )
}

export function ScrollPin({
  children,
  className,
  height = '220vh',
}: {
  children: (progress: number) => ReactNode
  className?: string
  height?: string
}) {
  const track = useRef<HTMLDivElement | null>(null)
  const frame = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [nested, setNested] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const node = track.current
    const pane = frame.current
    if (!node) return
    let scroller = node.closest('[data-pin-scroller]') as HTMLElement | null
    if (!scroller) {
      let parent: HTMLElement | null = node.parentElement
      while (parent) {
        const oy = getComputedStyle(parent).overflowY
        if (oy === 'auto' || oy === 'scroll') {
          scroller = parent
          break
        }
        parent = parent.parentElement
      }
    }
    setNested(Boolean(scroller))
    const onScroll = () => {
      const rect = node.getBoundingClientRect()
      const viewH = scroller ? scroller.clientHeight : window.innerHeight
      const viewTop = scroller ? scroller.getBoundingClientRect().top : 0
      const total = rect.height - viewH
      const next = total <= 0 ? 1 : Math.min(1, Math.max(0, (viewTop - rect.top) / total))
      setProgress(next)
      if (pane && scroller) {
        const start = rect.top - viewTop + scroller.scrollTop
        const pinned = Math.min(Math.max(0, scroller.scrollTop - start), Math.max(0, node.offsetHeight - viewH))
        pane.style.transform = `translateY(${pinned}px)`
      }
    }
    onScroll()
    const target: EventTarget = scroller ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    return () => target.removeEventListener('scroll', onScroll)
  }, [reduced])

  if (reduced) {
    return (
      <div className={cn('relative', className)}>
        <div className="flex min-h-[min(52rem,100%)] items-stretch overflow-hidden">{children(1)}</div>
      </div>
    )
  }

  return (
    <div ref={track} className={cn('relative', className)} style={{ height }}>
      <div
        ref={frame}
        className="flex h-[min(56rem,92vh)] min-h-[28rem] w-full items-stretch overflow-hidden"
        style={{ position: nested ? 'absolute' : 'sticky', top: 0, left: 0, right: 0 }}
      >
        {children(progress)}
      </div>
    </div>
  )
}

export function LiquidFilter({ id }: { id: string }) {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true">
      <filter id={id}>
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </svg>
  )
}

export function WowStage({
  children,
  className,
  dark = true,
  shader = false,
  particles = false,
  globe = false,
  pauseable = true,
}: {
  children: ReactNode
  className?: string
  dark?: boolean
  shader?: boolean
  particles?: boolean
  globe?: boolean
  pauseable?: boolean
}) {
  const loop = useLoopControl(true)
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-[1.6rem]',
        dark ? 'bg-[#07070c] text-white' : 'bg-nx-card text-nx-fg',
        className,
      )}
    >
      {shader ? <ShaderMesh paused={!loop.playing} /> : null}
      {particles ? <ParticleField paused={!loop.playing} /> : null}
      {globe ? <GlobeField paused={!loop.playing} /> : null}
      <Grain />
      <div className="relative z-10">{children}</div>
      {pauseable && (shader || particles || globe) && !loop.reduced ? (
        <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3 z-20" />
      ) : null}
    </div>
  )
}

const Scene3D = lazy(() => import('@/components/ui/wow-scene.tsx'))

export function LazyMesh3D({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const loop = useLoopControl(true)
  return (
    <div ref={ref} className={cn('relative min-h-56', className)}>
      {reduced || !inView ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,#7c6cff_0%,#07070c_58%)]" />
      ) : (
        <Suspense fallback={<div className="absolute inset-0 bg-[#07070c]" />}>
          <Scene3D paused={!loop.playing} />
        </Suspense>
      )}
      {!reduced && inView ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3 z-20" /> : null}
    </div>
  )
}

export const INK_PATH = 'M8 28 C 28 8, 48 36, 72 16 S 104 8, 112 22'
export const CHECK_PATH = 'M18 22 L 42 32 L 96 10'

export const wowBtn =
  cn(
    focusRing,
    touchTarget,
    'relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 text-sm font-medium',
  )

export function NightType({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span className={cn('font-serif tracking-tight', className)} style={style}>
      {children}
    </span>
  )
}
