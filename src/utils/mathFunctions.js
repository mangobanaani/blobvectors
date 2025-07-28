// Mathematical shape generators for parametric surfaces
export const MathematicalShapes = {
  // Klein Bottle
  kleinBottle: (u, v) => {
    u = u * 2 * Math.PI
    v = v * 2 * Math.PI
    
    let x, y, z
    if (u < Math.PI) {
      x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v)
      z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v)
    } else {
      x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI)
      z = -8 * Math.sin(u)
    }
    y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v)
    
    return [x * 0.1, y * 0.1, z * 0.1]
  },

  // Möbius Strip
  mobiusStrip: (u, v) => {
    u = u * 2 * Math.PI
    v = (v - 0.5) * 2
    
    const x = (1 + v / 2 * Math.cos(u / 2)) * Math.cos(u)
    const y = (1 + v / 2 * Math.cos(u / 2)) * Math.sin(u)
    const z = v / 2 * Math.sin(u / 2)
    
    return [x, y, z]
  },

  // Trefoil Knot
  trefoilKnot: (u) => {
    u = u * 2 * Math.PI
    
    const p = 2, q = 3
    const r = Math.cos(q * u) + 2
    const x = r * Math.cos(p * u)
    const y = r * Math.sin(p * u)
    const z = -Math.sin(q * u)
    
    return [x * 0.3, y * 0.3, z * 0.3]
  },

  // Hyperbolic Paraboloid (Saddle)
  hyperbolicParaboloid: (u, v) => {
    u = (u - 0.5) * 4
    v = (v - 0.5) * 4
    
    const x = u
    const y = v
    const z = u * u - v * v
    
    return [x * 0.5, z * 0.2, y * 0.5]
  },

  // Sine Wave Carpet
  sineWaveCarpet: (u, v) => {
    u = (u - 0.5) * 8
    v = (v - 0.5) * 8
    
    const x = u
    const y = Math.sin(u) * Math.cos(v) * 2
    const z = v
    
    return [x * 0.3, y * 0.3, z * 0.3]
  },

  // Ripple Surface
  rippleSurface: (u, v) => {
    u = (u - 0.5) * 8
    v = (v - 0.5) * 8
    
    const r = Math.sqrt(u * u + v * v)
    const x = u
    const y = Math.sin(r * 2) * Math.exp(-r * 0.3) * 2
    const z = v
    
    return [x * 0.3, y * 0.5, z * 0.3]
  },

  // Helicoid
  helicoid: (u, v) => {
    u = (u - 0.5) * 4
    v = v * 2 * Math.PI
    
    const x = u * Math.cos(v)
    const y = u * Math.sin(v)
    const z = v * 0.5
    
    return [x * 0.5, z * 0.3, y * 0.5]
  },

  // Catenoid
  catenoid: (u, v) => {
    u = (u - 0.5) * 4
    v = v * 2 * Math.PI
    
    const c = 1
    const x = c * Math.cosh(u / c) * Math.cos(v)
    const y = c * Math.cosh(u / c) * Math.sin(v)
    const z = u
    
    return [x * 0.2, z * 0.3, y * 0.2]
  },

  // Monkey Saddle
  monkeySaddle: (u, v) => {
    u = (u - 0.5) * 4
    v = (v - 0.5) * 4
    
    const x = u
    const y = v
    const z = u * u * u - 3 * u * v * v
    
    return [x * 0.5, z * 0.1, y * 0.5]
  },

  // Dini's Surface
  diniSurface: (u, v) => {
    u = u * 4 * Math.PI
    v = (v - 0.5) * 2
    
    const a = 1, b = 0.2
    const x = a * Math.cos(u) * Math.sin(v)
    const y = a * Math.sin(u) * Math.sin(v)
    const z = a * (Math.cos(v) + Math.log(Math.tan(v / 2))) + b * u
    
    return [x * 0.3, z * 0.1, y * 0.3]
  },

  // Boys Surface (approximation)
  boysSurface: (u, v) => {
    u = u * Math.PI
    v = v * Math.PI
    
    const x = Math.cos(u) * Math.sin(v)
    const y = Math.sin(u) * Math.sin(v)
    const z = Math.cos(v)
    
    // Boys surface transformation (simplified)
    const r = Math.sqrt(x * x + y * y + z * z)
    return [x / r * 2, y / r * 2, z / r * 2]
  },

  // Torus Knot
  torusKnot: (u, v) => {
    u = u * 2 * Math.PI
    // v parameter affects the torus thickness variation
    const vScale = 0.5 + v * 0.5
    
    const p = 3, q = 2
    const R = 2, r = 0.5 * vScale
    
    const x = (R + r * Math.cos(q * u)) * Math.cos(p * u)
    const y = (R + r * Math.cos(q * u)) * Math.sin(p * u)
    const z = r * Math.sin(q * u)
    
    return [x * 0.3, y * 0.3, z * 0.3]
  },

  // Wave Interference Pattern
  waveInterference: (u, v) => {
    u = (u - 0.5) * 10
    v = (v - 0.5) * 10
    
    const r1 = Math.sqrt((u - 2) * (u - 2) + v * v)
    const r2 = Math.sqrt((u + 2) * (u + 2) + v * v)
    
    const x = u
    const y = Math.sin(r1 * 3) + Math.sin(r2 * 3)
    const z = v
    
    return [x * 0.2, y * 0.5, z * 0.2]
  },

  // Gaussian Function
  gaussian: (u, v) => {
    u = (u - 0.5) * 6
    v = (v - 0.5) * 6
    
    const x = u
    const y = Math.exp(-(u * u + v * v) / 4) * 3
    const z = v
    
    return [x * 0.3, y * 0.5, z * 0.3]
  },

  // Peaks Function (MATLAB classic)
  peaks: (u, v) => {
    u = (u - 0.5) * 6
    v = (v - 0.5) * 6
    
    const x = u
    const z = v
    const y = 3 * (1 - x) * (1 - x) * Math.exp(-(x * x) - (z + 1) * (z + 1)) -
            10 * (x / 5 - x * x * x - z * z * z * z * z) * Math.exp(-x * x - z * z) -
            1 / 3 * Math.exp(-(x + 1) * (x + 1) - z * z)
    
    return [x * 0.3, y * 0.2, z * 0.3]
  },

  // Mexican Hat (Sombrero)
  mexicanHat: (u, v) => {
    u = (u - 0.5) * 8
    v = (v - 0.5) * 8
    
    const r = Math.sqrt(u * u + v * v)
    const x = u
    const y = Math.sin(r) / r * 2
    const z = v
    
    return [x * 0.3, y * 0.5, z * 0.3]
  },

  // Mandelbrot Surface
  mandelbrotSurface: (u, v) => {
    u = (u - 0.5) * 4
    v = (v - 0.5) * 4
    
    const c_real = u
    const c_imag = v
    let z_real = 0
    let z_imag = 0
    let iterations = 0
    const maxIterations = 20
    
    while (z_real * z_real + z_imag * z_imag < 4 && iterations < maxIterations) {
      const temp = z_real * z_real - z_imag * z_imag + c_real
      z_imag = 2 * z_real * z_imag + c_imag
      z_real = temp
      iterations++
    }
    
    const x = u
    const y = iterations / maxIterations * 2
    const z = v
    
    return [x * 0.5, y * 0.5, z * 0.5]
  },

  // Heart Surface
  heartSurface: (u, v) => {
    u = u * 2 * Math.PI
    v = (v - 0.5) * Math.PI
    
    const x = Math.cos(u) * (4 * Math.sqrt(1 - v * v * Math.sin(Math.abs(v)))) 
    const y = Math.sin(u) * (4 * Math.sqrt(1 - v * v * Math.sin(Math.abs(v))))
    const z = v
    
    return [x * 0.1, y * 0.1, z * 0.3]
  },

  // Seashell (Conchoid)
  seashell: (u, v) => {
    u = u * 2 * Math.PI
    v = v * 2 * Math.PI
    
    const a = 0.2
    const b = 1
    const c = 0.1
    const n = 2
    
    const x = a * (1 + Math.cos(n * u)) * Math.cos(u) * (1 + Math.cos(v))
    const y = a * (1 + Math.cos(n * u)) * Math.sin(u) * (1 + Math.cos(v))
    const z = b * Math.sin(v) + c * u
    
    return [x * 2, y * 2, z * 0.5]
  },

  // Rose Surface
  roseSurface: (u, v) => {
    u = u * 2 * Math.PI
    v = v * Math.PI
    
    const k = 3 // number of petals
    const r = Math.sin(k * u)
    
    const x = r * Math.cos(u) * Math.sin(v)
    const y = r * Math.sin(u) * Math.sin(v)
    const z = Math.cos(v) * 0.5
    
    return [x * 2, y * 2, z * 2]
  },

  // Twisted Torus
  twistedTorus: (u, v) => {
    u = u * 2 * Math.PI
    v = v * 2 * Math.PI
    
    const R = 2
    const r = 0.5
    const twist = 3
    
    const x = (R + r * Math.cos(v + twist * u)) * Math.cos(u)
    const y = (R + r * Math.cos(v + twist * u)) * Math.sin(u)
    const z = r * Math.sin(v + twist * u)
    
    return [x * 0.3, y * 0.3, z * 0.3]
  },

  // Lissajous Surface
  lissajousSurface: (u, v) => {
    u = u * 2 * Math.PI
    v = v * 2 * Math.PI
    
    const a = 3, b = 2, c = 1
    const delta = Math.PI / 4
    
    const x = Math.sin(a * u + delta)
    const y = Math.sin(b * v)
    const z = Math.sin(c * (u + v))
    
    return [x * 2, y * 2, z * 2]
  },

  // Egg Surface
  eggSurface: (u, v) => {
    u = u * 2 * Math.PI
    v = v * Math.PI
    
    const a = 1, b = 0.7
    
    const x = a * Math.cos(u) * Math.sin(v)
    const y = b * Math.sin(u) * Math.sin(v)
    const z = Math.cos(v) * (1 + 0.3 * Math.cos(v))
    
    return [x * 1.5, y * 1.5, z * 1.5]
  },

  // Hyperboloid
  hyperboloid: (u, v) => {
    u = (u - 0.5) * 4
    v = v * 2 * Math.PI
    
    const a = 1, b = 1, c = 1
    
    const x = a * Math.sqrt(1 + u * u) * Math.cos(v)
    const y = b * Math.sqrt(1 + u * u) * Math.sin(v)
    const z = c * u
    
    return [x * 0.4, y * 0.4, z * 0.4]
  }
}
