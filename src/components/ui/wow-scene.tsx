'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'

function Crystal() {
  const mesh = useRef<Mesh>(null)
  const ring = useRef<Mesh>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.18
      mesh.current.rotation.y = t * 0.28
      mesh.current.position.y = Math.sin(t * 0.7) * 0.08
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.22
      ring.current.rotation.x = 0.6 + Math.sin(t * 0.3) * 0.1
    }
    const pointer = state.pointer
    state.camera.position.x += (pointer.x * 0.8 - state.camera.position.x) * 0.04
    state.camera.position.y += (pointer.y * 0.4 - state.camera.position.y) * 0.04
    state.camera.lookAt(0, 0, 0)
  })
  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial color="#7c6cff" metalness={0.72} roughness={0.18} emissive="#221866" />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1.55, 0.018, 12, 80]} />
        <meshStandardMaterial color="#f3c27a" metalness={0.6} roughness={0.25} />
      </mesh>
    </group>
  )
}

export default function WowScene() {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#07070c']} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 2, 4]} intensity={1.4} color="#fff4d6" />
      <pointLight position={[-3, -1, 2]} intensity={0.8} color="#22c5b0" />
      <Crystal />
    </Canvas>
  )
}
