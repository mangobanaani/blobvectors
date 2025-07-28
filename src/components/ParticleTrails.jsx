import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ParticleTrails = ({ enabled = false }) => {
  const trailsRef = useRef()
  const particleCount = enabled ? 1000 : 0
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    
    for (let i = 0; i < particleCount; i++) {
      // Random initial positions
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      
      // Bright neon colors
      const color = new THREE.Color()
      color.setHSL(Math.random(), 1.0, 0.8)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
      
      sizes[i] = Math.random() * 2 + 1
    }
    
    return { positions, colors, sizes }
  }, [particleCount])

  useFrame((state) => {
    if (!trailsRef.current || !enabled) return
    
    const time = state.clock.elapsedTime
    const positions = trailsRef.current.geometry.attributes.position.array
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Create flowing motion
      positions[i3] += Math.sin(time + i * 0.1) * 0.02
      positions[i3 + 1] += Math.cos(time + i * 0.1) * 0.02
      positions[i3 + 2] += Math.sin(time * 0.5 + i * 0.05) * 0.01
      
      // Wrap around boundaries
      if (positions[i3] > 10) positions[i3] = -10
      if (positions[i3] < -10) positions[i3] = 10
      if (positions[i3 + 1] > 10) positions[i3 + 1] = -10
      if (positions[i3 + 1] < -10) positions[i3 + 1] = 10
    }
    
    trailsRef.current.geometry.attributes.position.needsUpdate = true
  })

  if (!enabled) return null

  return (
    <points ref={trailsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        transparent
        opacity={0.6}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default ParticleTrails
