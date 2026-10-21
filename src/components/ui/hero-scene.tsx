'use client'

import { useContainedPointer } from '@/lib/kit.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import { ContactShadows } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Color, Group, MathUtils } from 'three'

export type HeroSceneProps = {
  className?: string
  mode?: string
  active?: boolean
  onReady?: () => void
}

function HelixMesh({ aim }: { aim: { current: { x: number; y: number } } }) {
  const root = useRef<Group>(null)
  const color = useMemo(() => new Color('#c9a0ff'), [])

  useFrame((_, delta) => {
    if (!root.current) return
    root.current.rotation.y += delta * 0.28
    root.current.rotation.x = MathUtils.damp(root.current.rotation.x, aim.current.y * 0.4, 3.2, delta)
    root.current.rotation.z = MathUtils.damp(root.current.rotation.z, aim.current.x * 0.18, 3.2, delta)
  })

  return (
    <group ref={root} position={[0, 0.12, 0]}>
      <mesh castShadow>
        <torusKnotGeometry args={[0.92, 0.26, 220, 36, 2, 3]} />
        <meshPhysicalMaterial
          color={color}
          metalness={1}
          roughness={0.14}
          iridescence={1}
          iridescenceIOR={1.35}
          iridescenceThicknessRange={[120, 420]}
          clearcoat={1}
          clearcoatRoughness={0.12}
          envMapIntensity={1.4}
        />
      </mesh>
    </group>
  )
}

/**
 * Contained WebGL plate for `hero / helix`.
 * Pauses offscreen. Never covers the viewport. Fallback still lives in the layout.
 */
export function HeroScene({ className, active = true, onReady }: HeroSceneProps) {
  const reduced = usePrefersReducedMotion()
  const pointer = useContainedPointer<HTMLDivElement>()
  const aim = useRef({ x: 0, y: 0 })
  const ready = useRef(onReady)
  ready.current = onReady
  if (reduced || !active) return null
  return (
    <div
      ref={pointer.ref}
      className={cn('absolute inset-0', className)}
      onPointerMove={(event) => {
        pointer.onPointerMove(event)
        const box = event.currentTarget.getBoundingClientRect()
        aim.current = {
          x: (event.clientX - box.left) / box.width - 0.5,
          y: (event.clientY - box.top) / box.height - 0.5,
        }
      }}
      onPointerLeave={() => {
        pointer.onPointerLeave()
        aim.current = { x: 0, y: 0 }
      }}
      data-nexara-webgl="helix"
    >
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.2, 4.2], fov: 32 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          requestAnimationFrame(() => ready.current?.())
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.55} />
        <hemisphereLight args={['#ffe4c2', '#1b1233', 1.1]} />
        <directionalLight position={[3.4, 4.2, 2]} intensity={4.2} color="#ffd29a" />
        <directionalLight position={[-3, 1.4, -2]} intensity={3.2} color="#e9a8ff" />
        <pointLight position={[0, -1.4, 2]} intensity={1.4} color="#7c5cff" />
        <HelixMesh aim={aim} />
        <ContactShadows position={[0, -1.45, 0]} opacity={0.45} blur={2.4} far={4} color="#000" />
      </Canvas>
    </div>
  )
}
