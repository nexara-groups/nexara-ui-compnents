'use client'

import { ContactShadows } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Color, Group, MathUtils, Mesh, MeshPhysicalMaterial, PointLight, Vector3 } from 'three'

type Mode = 'orbit' | 'beam' | 'focus'

export type OrbitalSceneProps = {
  pointer: { x: number; y: number }
  mode: Mode
  pulse: number
  active?: boolean
  onReady?: () => void
}

function Instrument({ pointer, mode, pulse }: OrbitalSceneProps) {
  const root = useRef<Group>(null)
  const crystal = useRef<Mesh>(null)
  const ringA = useRef<Mesh>(null)
  const ringB = useRef<Mesh>(null)
  const beam = useRef<Mesh>(null)
  const lamp = useRef<PointLight>(null)
  const aim = useMemo(() => new Vector3(), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (root.current) {
      const idle = mode === 'orbit' ? 0.18 : 0.06
      root.current.rotation.y += delta * idle
      root.current.rotation.x = MathUtils.damp(root.current.rotation.x, pointer.y * 0.55, 3.2, delta)
      root.current.rotation.z = MathUtils.damp(root.current.rotation.z, pointer.x * 0.22, 3.2, delta)
    }
    if (ringA.current) ringA.current.rotation.x = t * 0.55
    if (ringB.current) ringB.current.rotation.y = t * 0.38 + 0.6
    if (crystal.current) {
      const breathe = 1 + Math.sin(t * 2.1) * 0.02 + pulse * 0.08
      crystal.current.scale.setScalar(breathe)
      const material = crystal.current.material
      if (material instanceof MeshPhysicalMaterial) {
        const heat = mode === 'beam' ? 0.55 : mode === 'focus' ? 0.22 : 0.34
        material.emissiveIntensity = heat + pulse * 0.8
      }
    }
    if (beam.current) {
      aim.set(pointer.x * 2.6, -pointer.y * 1.8, 2.2)
      beam.current.lookAt(aim)
      beam.current.scale.z = mode === 'beam' ? 1.7 : mode === 'focus' ? 0.85 : 1.1
      const material = beam.current.material
      if (material instanceof MeshPhysicalMaterial) {
        material.opacity = mode === 'focus' ? 0.22 : 0.72 + pulse * 0.28
        material.emissiveIntensity = 2.8 + pulse * 2.4
      }
    }
    if (lamp.current) {
      lamp.current.position.set(pointer.x * 2.2, 1.4 - pointer.y, 2.2)
      lamp.current.intensity = 14 + pulse * 16
    }
  })

  return (
    <group ref={root} position={[0, 0.15, 0]}>
      <mesh ref={crystal}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshPhysicalMaterial
          color={new Color('#d9a85a')}
          metalness={0.62}
          roughness={0.16}
          transmission={0.42}
          thickness={1.4}
          ior={1.6}
          emissive={new Color('#ff4d1c')}
          emissiveIntensity={0.32}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <mesh ref={ringA}>
        <torusGeometry args={[1.55, 0.018, 16, 80]} />
        <meshStandardMaterial color="#f3ead8" metalness={0.8} roughness={0.28} />
      </mesh>
      <mesh ref={ringB} rotation={[1.2, 0.4, 0]}>
        <torusGeometry args={[1.82, 0.012, 12, 80]} />
        <meshStandardMaterial color="#3ee0c6" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.05, 2.08, 64]} />
        <meshBasicMaterial color="#d9a85a" transparent opacity={0.35} />
      </mesh>
      <mesh ref={beam} position={[0, 0, 0.35]}>
        <coneGeometry args={[0.22, 3.6, 24, 1, true]} />
        <meshPhysicalMaterial
          color="#ffb089"
          transparent
          opacity={0.7}
          roughness={0.08}
          metalness={0}
          emissive="#ff4d1c"
          emissiveIntensity={3.2}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.055, 3.2, 12, 1, true]} />
        <meshBasicMaterial color="#ffe7c4" transparent opacity={0.85} depthWrite={false} />
      </mesh>
      <mesh position={[0, -0.05, 1.8]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#ff4d1c" />
      </mesh>
      <pointLight ref={lamp} color="#ffb089" distance={10} intensity={14} />
    </group>
  )
}

export function OrbitalScene({ pointer, mode, pulse, active = true, onReady }: OrbitalSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'demand'}
      camera={{ position: [0, 0.35, 4.4], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: true }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      onCreated={({ gl }) => {
        gl.setClearColor('#07060b', 0)
        gl.domElement.setAttribute('data-helio-webgl', 'ready')
        onReady?.()
      }}
    >
      <color attach="background" args={['#07060b']} />
      <hemisphereLight args={['#f3ead8', '#1a1722', 0.7]} />
      <directionalLight position={[3.2, 4.2, 2.4]} intensity={3.1} color="#f6d7a8" />
      <directionalLight position={[-3.6, 1.2, -2]} intensity={1.3} color="#3ee0c6" />
      <Instrument pointer={pointer} mode={mode} pulse={pulse} />
      <ContactShadows position={[0, -1.35, 0]} opacity={0.45} scale={8} blur={2.4} far={3} color="#000000" />
    </Canvas>
  )
}
