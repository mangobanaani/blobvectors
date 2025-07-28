import { useMemo } from 'react'
import * as THREE from 'three'

// Component to generate parametric surfaces
const ParametricSurface = ({ mathFunction, resolution = 32, ...props }) => {
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const indices = []
    const uvs = []

    // Generate vertices
    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const u = i / resolution
        const v = j / resolution
        
        const [x, y, z] = mathFunction(u, v)
        vertices.push(x, y, z)
        uvs.push(u, v)
      }
    }

    // Generate indices for triangles
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const a = i * (resolution + 1) + j
        const b = a + resolution + 1
        const c = a + 1
        const d = b + 1

        indices.push(a, b, c)
        indices.push(b, d, c)
      }
    }

    // Calculate normals
    const positionAttribute = new THREE.Float32BufferAttribute(vertices, 3)
    geometry.setIndex(indices)
    geometry.setAttribute('position', positionAttribute)
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    geometry.computeVertexNormals()

    return geometry
  }, [mathFunction, resolution])

  return <primitive object={geometry} {...props} />
}

export default ParametricSurface
