'use client'

import { ContactShadows } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Color, Group, MathUtils, Mesh, MeshStandardMaterial, PointLight, Vector3 } from 'three'

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
  const beam = useRef<Group>(null)
  const lamp = useRef<PointLight>(null)
  const aim = useMemo(() => new Vector3(), [])
  const up = useMemo(() => new Vector3(0, 1, 0), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (root.current) {
      const idle = mode === 'orbit' ? 0.16 : 0.045
      root.current.rotation.y += delta * idle
      root.current.rotation.x = MathUtils.damp(root.current.rotation.x, pointer.y * 0.4, 3.2, delta)
      root.current.rotation.z = MathUtils.damp(root.current.rotation.z, pointer.x * 0.16, 3.2, delta)
    }
    if (ringA.current) ringA.current.rotation.x = t * 0.42
    if (ringB.current) ringB.current.rotation.y = t * 0.3 + 0.6
    if (crystal.current) {
      const breathe = 1 + Math.sin(t * 2.1) * 0.015 + pulse * 0.06
      crystal.current.scale.setScalar(breathe)
      const material = crystal.current.material
      if (material instanceof MeshStandardMaterial) {
        const heat = mode === 'beam' ? 0.28 : mode === 'focus' ? 0.12 : 0.18
        material.emissiveIntensity = heat + pulse * 0.55
      }
    }
    if (beam.current) {
      aim.set(pointer.x * 1.8, 0.35 - pointer.y * 1.2, 1.15).normalize()
      beam.current.quaternion.setFromUnitVectors(up, aim)
      const throwScale = mode === 'beam' ? 1.2 + pulse * 0.25 : mode === 'focus' ? 0.72 : 0.92
      beam.current.scale.set(1, throwScale, 1)
    }
    if (lamp.current) {
      lamp.current.position.set(pointer.x * 2.2, 1.2 - pointer.y, 2.4)
      lamp.current.intensity = 10 + pulse * 12
    }
  })

  return (
    <group ref={root} position={[0, 0.08, 0]}>
      <mesh position={[0, -1.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.62, 48]} />
        <meshStandardMaterial color="#2a2116" metalness={0.35} roughness={0.55} />
      </mesh>
      <mesh position={[0, -1.08, 0]}>
        <cylinderGeometry args={[0.22, 0.34, 0.28, 24]} />
        <meshStandardMaterial color="#8a6a32" metalness={0.82} roughness={0.32} />
      </mesh>
      <mesh position={[0, -0.86, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.28, 12]} />
        <meshStandardMaterial color="#d9a85a" metalness={0.88} roughness={0.22} />
      </mesh>

      <mesh>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial color="#1a100c" metalness={0.4} roughness={0.45} />
      </mesh>
      <mesh ref={crystal}>
        <icosahedronGeometry args={[0.78, 0]} />
        <meshStandardMaterial
          color={new Color('#c4923a')}
          metalness={0.55}
          roughness={0.28}
          emissive={new Color('#5a220e')}
          emissiveIntensity={0.08}
        />
      </mesh>

      <mesh ref={ringA}>
        <torusGeometry args={[1.12, 0.03, 16, 80]} />
        <meshStandardMaterial color="#f3ead8" metalness={0.86} roughness={0.22} />
      </mesh>
      <mesh ref={ringB} rotation={[1.15, 0.35, 0]}>
        <torusGeometry args={[1.36, 0.018, 12, 80]} />
        <meshStandardMaterial color="#3ee0c6" metalness={0.55} roughness={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.52, 1.56, 64]} />
        <meshBasicMaterial color="#d9a85a" transparent opacity={0.45} />
      </mesh>

      <group ref={beam}>
        <mesh position={[0, 1.25, 0]}>
          <coneGeometry args={[0.18, 2.4, 22, 1, true]} />
          <meshBasicMaterial color="#ff6a33" transparent opacity={0.42} depthWrite={false} />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <coneGeometry args={[0.045, 2.4, 10, 1, true]} />
          <meshBasicMaterial color="#ffe7c4" transparent opacity={0.92} depthWrite={false} />
        </mesh>
        <mesh position={[0, 2.42, 0]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshBasicMaterial color="#ff4d1c" />
        </mesh>
      </group>
      <pointLight ref={lamp} color="#ffb089" distance={10} intensity={10} />
    </group>
  )
}

export function OrbitalScene({ pointer, mode, pulse, active = true, onReady }: OrbitalSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'demand'}
      camera={{ position: [0.35, 0.28, 5.5], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: true }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      onCreated={({ gl }) => {
        gl.setClearColor('#07060b', 0)
        gl.domElement.setAttribute('data-helio-webgl', 'ready')
        onReady?.()
      }}
    >
      <color attach="background" args={['#07060b']} />
      <hemisphereLight args={['#f3ead8', '#1a1722', 0.55]} />
      <directionalLight position={[3.4, 4.4, 2.6]} intensity={2.8} color="#f6d7a8" />
      <directionalLight position={[-3.2, 1.1, -2]} intensity={1.1} color="#3ee0c6" />
      <Instrument pointer={pointer} mode={mode} pulse={pulse} />
      <ContactShadows position={[0, -1.32, 0]} opacity={0.5} scale={8} blur={2.2} far={3} color="#000000" />
    </Canvas>
  )
}
