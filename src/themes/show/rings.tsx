'use client'

import { useLevel } from '@/themes/kit/level.ts'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import type { Group } from 'three'

function RingSet() {
  const group = useRef<Group>(null)
  const { invalidate } = useThree()
  useEffect(() => {
    invalidate()
  }, [invalidate])
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.pointer.x * 0.35
    group.current.rotation.x = 0.7 + state.pointer.y * 0.15
  })
  return (
    <group ref={group}>
      {[1.1, 1.45, 1.8].map((radius) => (
        <mesh key={radius} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[radius, 0.012, 8, 64]} />
          <meshBasicMaterial color="#b45309" />
        </mesh>
      ))}
    </group>
  )
}

function CssRings() {
  return (
    <div aria-hidden className="relative h-40 w-full">
      <span className="absolute top-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full border" style={{ borderColor: 'var(--nx-mark)' }} />
      <span className="absolute top-4 left-1/2 h-32 w-40 -translate-x-1/2 rounded-full border" style={{ borderColor: 'var(--nx-mark)' }} />
    </div>
  )
}

export function OrreryRings() {
  const level = useLevel()
  const box = useRef<HTMLDivElement>(null)
  const draw = useRef<(() => void) | null>(null)
  const [onScreen, setOnScreen] = useState(true)
  useEffect(() => {
    const node = box.current
    if (!node || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin: '80px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  if (level !== 'rich' || !onScreen) {
    return (
      <div ref={box}>
        <CssRings />
      </div>
    )
  }
  return (
    <div ref={box} className="h-48 w-full" aria-hidden onPointerMove={() => draw.current?.()}>
      <Canvas
        dpr={[1, 1.25]}
        frameloop="demand"
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ antialias: false, powerPreference: 'low-power' }}
        onCreated={(state) => {
          draw.current = state.invalidate
          state.invalidate()
        }}
      >
        <RingSet />
      </Canvas>
    </div>
  )
}
