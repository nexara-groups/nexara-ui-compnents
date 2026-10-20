'use client'

import { useContainedPointer } from '@/lib/kit.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import { ContactShadows } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Color, Group, MathUtils, Mesh } from 'three'

export type HeroSceneProps = {
  className?: string
  mode?: string
  active?: boolean
}

type Palette = {
  metal: string
  cool: string
  elev: string
  accent: string
  bg: string
  fg: string
}

function readPalette(node: HTMLElement | null): Palette {
  const styles = node ? getComputedStyle(node) : null
  const take = (name: string, fallback: string) => {
    const value = styles?.getPropertyValue(name).trim()
    return value && value.length > 0 ? value : fallback
  }
  return {
    metal: take('--nx-metal', 'currentColor'),
    cool: take('--nx-cool', 'currentColor'),
    elev: take('--nx-elev', 'currentColor'),
    accent: take('--nx-accent', 'currentColor'),
    bg: take('--nx-bg', 'transparent'),
    fg: take('--nx-fg', 'currentColor'),
  }
}

function Plate({
  pointer,
  palette,
  mode,
}: {
  pointer: { x: number; y: number }
  palette: Palette
  mode?: string
}) {
  const root = useRef<Group>(null)
  const plate = useRef<Mesh>(null)
  const ring = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!root.current) return
    const idle = mode === 'still' ? 0 : 0.12
    root.current.rotation.y += delta * idle
    root.current.rotation.x = MathUtils.damp(root.current.rotation.x, pointer.y * 0.55, 3.4, delta)
    root.current.rotation.z = MathUtils.damp(root.current.rotation.z, pointer.x * 0.22, 3.4, delta)
    if (ring.current) ring.current.rotation.z += delta * 0.35
    if (plate.current) {
      plate.current.rotation.x = MathUtils.damp(plate.current.rotation.x, -0.18 + pointer.y * 0.2, 4, delta)
    }
  })

  return (
    <group ref={root} position={[0, 0.12, 0]}>
      <mesh position={[0, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 48]} />
        <meshStandardMaterial color={palette.elev} metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.96, 0]}>
        <cylinderGeometry args={[0.16, 0.28, 0.32, 20]} />
        <meshStandardMaterial color={palette.metal} metalness={0.82} roughness={0.28} />
      </mesh>
      <mesh position={[0, -0.68, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.36, 10]} />
        <meshStandardMaterial color={palette.metal} metalness={0.88} roughness={0.2} />
      </mesh>
      <mesh ref={plate} position={[0, -0.18, 0]}>
        <boxGeometry args={[1.7, 0.06, 1.12]} />
        <meshStandardMaterial color={palette.fg} metalness={0.35} roughness={0.42} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[1.42, 0.02, 0.88]} />
        <meshStandardMaterial color={palette.elev} metalness={0.2} roughness={0.55} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.18, 0]}>
        <torusGeometry args={[1.08, 0.018, 12, 64]} />
        <meshStandardMaterial color={palette.cool} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.62, 0.08, 0.36]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={new Color(palette.accent)} />
      </mesh>
    </group>
  )
}

/**
 * Optional WebGL instrument for Hero variant `orbit`.
 * Gimbaled plate — not a sphere. Pause offscreen. Required still lives on Hero.
 */
export function HeroScene({ className, mode, active = true }: HeroSceneProps) {
  const reduced = usePrefersReducedMotion()
  const host = useRef<HTMLDivElement>(null)
  const pointer = useContainedPointer<HTMLDivElement>()
  const [palette, setPalette] = useState<Palette>(() => readPalette(null))
  const [on, setOn] = useState(active)
  const px = useMemo(() => ({ x: 0, y: 0 }), [])

  useEffect(() => {
    setPalette(readPalette(host.current))
  }, [])

  useEffect(() => {
    const node = host.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setOn(Boolean(entry?.isIntersecting) && active), {
      threshold: 0.12,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [active])

  useEffect(() => {
    return pointer.sx.on('change', (value) => {
      px.x = value
    })
  }, [pointer.sx, px])
  useEffect(() => {
    return pointer.sy.on('change', (value) => {
      px.y = value
    })
  }, [pointer.sy, px])

  if (reduced) return null

  return (
    <div
      ref={(node) => {
        host.current = node
        pointer.ref.current = node
      }}
      className={cn('absolute inset-0', className)}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
      style={{ '--nx-scene': '1' } as CSSProperties}
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={on ? 'always' : 'demand'}
        camera={{ position: [0.4, 0.35, 5.2], fov: 28 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: true }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        onCreated={({ gl }) => {
          gl.setClearColor(palette.bg || '#000000', 0)
          gl.domElement.setAttribute('data-nexara-webgl', 'ready')
        }}
      >
        <hemisphereLight args={[palette.fg, palette.elev, 0.55]} />
        <directionalLight position={[3.2, 4.2, 2.4]} intensity={2.4} color={palette.fg} />
        <directionalLight position={[-2.8, 1.2, -1.8]} intensity={0.9} color={palette.cool} />
        <Plate pointer={px} palette={palette} mode={mode} />
        <ContactShadows position={[0, -1.28, 0]} opacity={0.46} scale={8} blur={2.1} far={3} color="#000000" />
      </Canvas>
    </div>
  )
}
