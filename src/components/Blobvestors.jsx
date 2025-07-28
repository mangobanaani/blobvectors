import { useRef, useMemo, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MathematicalShapes } from '../utils/mathFunctions'
import ParametricSurface from './MathematicalShapes'

const Blob = forwardRef(function Blob({ position, scale, rotationSpeed, color, shape, material: materialProps, audioData }, ref) {
  const meshRef = useRef()
  
  // Audio reactive scaling and coloring
  const audioScale = audioData ? (1 + audioData.volume * 0.5) : 1
  const audioColor = audioData ? 
    new THREE.Color().setHSL((audioData.bass + audioData.treble) * 0.5, 0.8, 0.6) : 
    color

  // Check if this is a mathematical surface
  const isMathematicalSurface = MathematicalShapes[shape]

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the blob on multiple axes for that classic demoscene feel
      meshRef.current.rotation.x += rotationSpeed.x * delta
      meshRef.current.rotation.y += rotationSpeed.y * delta
      meshRef.current.rotation.z += rotationSpeed.z * delta
    }
  })

  // If it's a mathematical surface, render it as a parametric surface
  if (isMathematicalSurface) {
    return (
      <mesh 
        ref={(el) => { 
          meshRef.current = el; 
          if (ref && typeof ref === 'function') {
            ref(el);
          } else if (ref && ref.current !== undefined) {
            ref.current = el;
          }
        }} 
        position={position} 
        scale={[scale * audioScale, scale * audioScale, scale * audioScale]}
      >
        <ParametricSurface mathFunction={MathematicalShapes[shape]} resolution={24} />
        <meshStandardMaterial
          color={audioData ? audioColor : color}
          metalness={materialProps.metalness}
          roughness={materialProps.roughness}
          envMapIntensity={1.0}
        />
      </mesh>
    )
  }

  // For basic geometric shapes
  const getGeometry = () => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[1, 16, 16]} />
      case 'cube':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />
      case 'octahedron':
        return <octahedronGeometry args={[1]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1]} />
      case 'torus':
        return <torusGeometry args={[0.8, 0.3, 8, 16]} />
      case 'cone':
        return <coneGeometry args={[0.8, 1.6, 8]} />
      case 'cylinder':
        return <cylinderGeometry args={[0.6, 0.6, 1.5, 8]} />
      case 'icosahedron':
      default:
        return <icosahedronGeometry args={[1, 1]} />
    }
  }

  return (
    <mesh 
      ref={(el) => { 
        meshRef.current = el; 
        if (ref && typeof ref === 'function') {
          ref(el);
        } else if (ref && ref.current !== undefined) {
          ref.current = el;
        }
      }} 
      position={position} 
      scale={scale * audioScale} 
    >
      {getGeometry()}
      <meshStandardMaterial
        color={audioData ? audioColor : color}
        metalness={materialProps.metalness}
        roughness={materialProps.roughness}
        envMapIntensity={1.0}
      />
    </mesh>
  )
})

function ConfigurableBlobFormation({ settings, audioData }) {
  const groupRef = useRef()
  const blobsRef = useRef([])
  
  const blobs = useMemo(() => {
    const blobArray = []
    const { ballCount, radius, formation, ballSize, rotationSpeed: baseRotationSpeed } = settings
    
    for (let i = 0; i < ballCount; i++) {
      let x, y, z
      
      switch (formation) {
        case 'circle': {
          const angle = (i / ballCount) * Math.PI * 2
          x = Math.cos(angle) * radius
          z = Math.sin(angle) * radius
          y = 0
          break
        }
          
        case 'spiral': {
          const spiralAngle = (i / ballCount) * Math.PI * 4
          const spiralRadius = radius * (i / ballCount)
          x = Math.cos(spiralAngle) * spiralRadius
          z = Math.sin(spiralAngle) * spiralRadius
          y = (i / ballCount - 0.5) * radius
          break
        }
          
        case 'grid': {
          const gridSize = Math.ceil(Math.sqrt(ballCount))
          const gridX = (i % gridSize) - gridSize / 2
          const gridZ = Math.floor(i / gridSize) - gridSize / 2
          x = gridX * (radius / gridSize * 2)
          z = gridZ * (radius / gridSize * 2)
          y = 0
          break
        }
          
        case 'helix': {
          const helixAngle = (i / ballCount) * Math.PI * 6
          x = Math.cos(helixAngle) * radius
          z = Math.sin(helixAngle) * radius
          y = (i / ballCount - 0.5) * radius * 2
          break
        }

        case 'doubleHelix': {
          const helixAngle = (i / ballCount) * Math.PI * 8
          const helixRadius = radius * (0.7 + 0.3 * Math.sin(i))
          x = Math.cos(helixAngle + (i % 2) * Math.PI) * helixRadius
          z = Math.sin(helixAngle + (i % 2) * Math.PI) * helixRadius
          y = (i / ballCount - 0.5) * radius * 2.5
          break
        }

        case 'fibonacci': {
          const goldenAngle = Math.PI * (3 - Math.sqrt(5)) // Golden angle
          const angle = i * goldenAngle
          const spiralRadius = Math.sqrt(i / ballCount) * radius
          x = Math.cos(angle) * spiralRadius
          z = Math.sin(angle) * spiralRadius
          y = (i / ballCount - 0.5) * radius * 0.5
          break
        }

        case 'lissajous': {
          const t = (i / ballCount) * Math.PI * 4
          const a = 3, b = 2
          x = Math.sin(a * t) * radius
          y = Math.cos(b * t) * radius * 0.5
          z = Math.sin((a + b) * t) * radius * 0.8
          break
        }

        case 'rose': {
          const t = (i / ballCount) * Math.PI * 8
          const k = 5 // number of petals
          const r = Math.sin(k * t) * radius
          x = r * Math.cos(t)
          z = r * Math.sin(t)
          y = Math.sin(t * 2) * radius * 0.3
          break
        }

        case 'trefoil': {
          const t = (i / ballCount) * Math.PI * 2
          x = Math.sin(t) + 2 * Math.sin(2 * t)
          y = Math.cos(t) - 2 * Math.cos(2 * t)
          z = -Math.sin(3 * t)
          const scale = radius * 0.3
          x *= scale
          y *= scale
          z *= scale
          break
        }

        case 'torus': {
          const u = (i / ballCount) * Math.PI * 2
          const v = ((i * 7) % ballCount / ballCount) * Math.PI * 2
          const R = radius, r = radius * 0.3
          x = (R + r * Math.cos(v)) * Math.cos(u)
          z = (R + r * Math.cos(v)) * Math.sin(u)
          y = r * Math.sin(v)
          break
        }

        case 'spherical': {
          const phi = Math.acos(1 - 2 * (i / ballCount)) // inclination
          const theta = Math.PI * (1 + Math.sqrt(5)) * i // azimuth
          x = Math.sin(phi) * Math.cos(theta) * radius
          y = Math.sin(phi) * Math.sin(theta) * radius
          z = Math.cos(phi) * radius
          break
        }

        case 'mandelbrot': {
          const real = (i % 10 - 5) * radius * 0.1
          const imag = (Math.floor(i / 10) - 5) * radius * 0.1
          let zr = 0, zi = 0
          let iterations = 0
          while (zr * zr + zi * zi < 4 && iterations < 10) {
            const temp = zr * zr - zi * zi + real
            zi = 2 * zr * zi + imag
            zr = temp
            iterations++
          }
          x = real * 10
          z = imag * 10
          y = (iterations / 10 - 0.5) * radius
          break
        }

        case 'butterfly': {
          const t = (i / ballCount) * Math.PI * 12
          const r = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin(t / 12), 5)
          x = Math.sin(t) * r * radius * 0.2
          z = Math.cos(t) * r * radius * 0.2
          y = Math.sin(t * 3) * radius * 0.3
          break
        }

        case 'heart': {
          const t = (i / ballCount) * Math.PI * 2
          x = 16 * Math.pow(Math.sin(t), 3) * radius * 0.1
          y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * radius * 0.1
          z = Math.sin(t * 4) * radius * 0.2
          break
        }

        case 'klein': {
          const u = (i / ballCount) * Math.PI * 2
          const v = ((i * 3) % ballCount / ballCount) * Math.PI * 2
          if (u < Math.PI) {
            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v)
            z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v)
          } else {
            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI)
            z = -8 * Math.sin(u)
          }
          y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v)
          x *= radius * 0.05
          y *= radius * 0.05
          z *= radius * 0.05
          break
        }

        case 'mobius': {
          const u = (i / ballCount) * Math.PI * 2
          const v = ((i * 2) % ballCount / ballCount - 0.5) * 2
          x = (1 + v / 2 * Math.cos(u / 2)) * Math.cos(u) * radius * 0.5
          z = (1 + v / 2 * Math.cos(u / 2)) * Math.sin(u) * radius * 0.5
          y = v / 2 * Math.sin(u / 2) * radius * 0.5
          break
        }

        case 'hypercube': {
          const w = (i % 2) * 2 - 1
          const hypX = ((i >> 1) % 2) * 2 - 1
          const hypY = ((i >> 2) % 2) * 2 - 1
          const hypZ = ((i >> 3) % 2) * 2 - 1
          // Project 4D to 3D
          const projection = 1 / (2 - w)
          x = hypX * projection * radius
          y = hypY * projection * radius
          z = hypZ * projection * radius
          break
        }

        case 'fractalTree': {
          const depth = Math.floor(Math.log2(i + 1))
          const branchIndex = i - (Math.pow(2, depth) - 1)
          const angle = (branchIndex / Math.pow(2, depth)) * Math.PI * 2
          const branchRadius = radius * Math.pow(0.7, depth)
          x = Math.cos(angle) * branchRadius
          z = Math.sin(angle) * branchRadius
          y = depth * radius * 0.3
          break
        }

        case 'random':
        default:
          x = (Math.random() - 0.5) * radius * 2
          y = (Math.random() - 0.5) * radius * 2
          z = (Math.random() - 0.5) * radius * 2
          break
      }
      
      blobArray.push({
        id: i,
        basePosition: [x, y, z],
        scale: ballSize,
        rotationSpeed: {
          x: (Math.random() - 0.5) * baseRotationSpeed * 2,
          y: (Math.random() - 0.5) * baseRotationSpeed * 2,
          z: (Math.random() - 0.5) * baseRotationSpeed * 2,
        },
        color: new THREE.Color().setHSL(
          (i / ballCount + 0.2) % 1, // Hue progression
          0.7 + Math.random() * 0.3, // High saturation
          0.5 + Math.random() * 0.3   // Moderate lightness
        ),
        phaseOffset: i * 0.3 // Phase offset for wave variation
      })
    }
    
    return blobArray
  }, [settings])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const { wave } = settings
    
    // Update each blob's position based on wave settings
    blobs.forEach((blob, index) => {
      if (blobsRef.current[index]) {
        // Create sine wave effect
        const waveY = Math.sin(time * wave.speed * wave.frequency + blob.phaseOffset) * wave.amplitude
        
        // Add secondary wave for more complex motion
        const secondaryWave = Math.sin(time * wave.speed * wave.frequency * 1.5 + blob.basePosition[0] * 0.1) * (wave.amplitude * 0.2)
        
        // Update position with wave motion
        blobsRef.current[index].position.set(
          blob.basePosition[0],
          blob.basePosition[1] + waveY + secondaryWave,
          blob.basePosition[2]
        )
      }
    })
    
    // Rotate the entire formation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {blobs.map((blob, index) => (
        <Blob
          key={blob.id}
          ref={(el) => (blobsRef.current[index] = el)}
          position={blob.basePosition}
          scale={blob.scale}
          rotationSpeed={blob.rotationSpeed}
          color={blob.color}
          shape={settings.shape}
          material={settings.material}
          audioData={audioData}
        />
      ))}
    </group>
  )
}

function CameraController({ cameraSettings }) {
  useFrame((state) => {
    if (state.camera && cameraSettings.autoRotate) {
      // Smooth camera rotation around the scene
      const time = state.clock.elapsedTime * 0.3
      state.camera.position.x = Math.cos(time) * 8
      state.camera.position.z = Math.sin(time) * 8
      state.camera.position.y = Math.sin(time * 0.5) * 2 + 2
      state.camera.lookAt(0, 0, 0)
    } else if (state.camera) {
      // Manual camera position
      state.camera.position.set(
        cameraSettings.position.x,
        cameraSettings.position.y,
        cameraSettings.position.z
      )
      state.camera.fov = cameraSettings.fov
      state.camera.updateProjectionMatrix()
      state.camera.lookAt(0, 0, 0)
    }
  })
  
  return null
}

export default function Blobvectors({ settings, cameraSettings, audioData }) {
  return (
    <>
      {/* Ambient lighting for overall illumination */}
      <ambientLight intensity={0.6} />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Point lights for extra metallic reflections */}
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[10, -10, 10]} intensity={0.5} color="#4ecdc4" />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#ffe66d" />
      
      {/* Configurable blob formation */}
      <ConfigurableBlobFormation settings={settings} audioData={audioData} />
      
      {/* Camera controller */}
      <CameraController cameraSettings={cameraSettings} />
    </>
  )
}
