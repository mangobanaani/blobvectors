# Blobvectors

React + Three.js implementation of classic Amiga demoscene blobvectors effect with real-time audio reactivity and parametric mathematical formations.

## Technical Overview

**Core Stack:**
- React 18 + Vite (development/build)
- Three.js + React Three Fiber (3D rendering)
- WebAudio API (real-time frequency analysis)
- CSS3 (post-processing effects)

**Rendering Engine:**
- 37 default objects in configurable formations
- Real-time parametric surface generation (25+ mathematical shapes)
- Audio-reactive scaling and HSL color shifts
- Particle system (1000+ particles with additive blending)
- Post-processing: bloom, chromatic aberration, CRT scanlines, plasma backgrounds

**Audio System:**
- Microphone input → FFT analysis → 256-bin frequency data
- Bass (0-10 bins), Mid (10-40 bins), Treble (40-80 bins) extraction
- Fallback synthetic audio using sine wave generation
- Real-time sphere scaling: `scale = baseScale * (1 + volume * 0.5)`
- Dynamic color mapping: `HSL((bass + treble) * 0.5, 0.8, 0.6)`

## Mathematical Formations

**Parametric Surfaces (25+ shapes):**
```
sphere, cube, torus, cone, cylinder, icosahedron, octahedron, 
dodecahedron, tetrahedron, kleinBottle, mobiusStrip, romanSurface, 
boysSurface, crossCap, steinerSurface, heart, seashell, horn, 
spring, trefoilKnot, figure8Knot, hopfFibration, dupin, catenoid, helicoid
```

**Formation Patterns (18+ arrangements):**
```javascript
// Geometric
circle, spiral, sphere, helix, torus, cube

// Mathematical 
fibonacci, lissajous, mandelbrot, julia, lorenz, clifford

// Biological
dnaHelix, flower, tree, galaxy

// Topological
trefoilKnot, kleinBottle
```

**Audio Reactivity:**
- Live microphone input with FFT analysis (256 bins)
- Frequency separation: Bass (0-10), Mid (10-40), Treble (40-80)
- Volume-based sphere scaling: `1 + (volume * 0.5)`
- Color mapping: `HSL((bass + treble) * 0.5, saturation, lightness)`
- Synthetic fallback when microphone unavailable

**Visual Effects:**
- Bloom post-processing (CSS filter: blur + brightness)
- Chromatic aberration simulation
- CRT scanlines with CSS animations
- Plasma background (CSS gradients + animations)
- Particle trails (1000+ BufferGeometry points, additive blending)

**Controls:**
- Keyboard: B=Bloom, C=Chromatic, T=Trails, P=Plasma, Space=Pause
- Real-time parameter adjustment via control panel
- Camera controls: pan, zoom, rotate (Three.js OrbitControls)

## Setup

```bash
git clone https://github.com/yourusername/blobvectors.git
cd blobvestors
npm install
npm run dev
```

Open http://localhost:5174

**Audio Setup:**
1. Click "START" in audio panel (top-left)
2. Allow microphone access when prompted
3. Play music or make noise - spheres react to audio
4. Uses synthetic audio if microphone denied

**Docker:**
```bash
docker-compose up --build    # Full development
docker build -t blobvectors . && docker run -p 3000:80 blobvectors
```

## Implementation Details

**File Structure:**
```
src/
├── components/
│   ├── Blobvestors.jsx      # Main 3D component with Blob forwardRef
│   ├── AudioReactive.jsx    # WebAudio API + frequency analysis
│   ├── ParticleTrails.jsx   # 1000+ particle BufferGeometry system
│   ├── Controls.jsx         # Real-time parameter controls
│   └── FPSCounter.jsx       # Performance monitoring
├── utils/
│   └── mathFunctions.js     # 25+ parametric surface generators
└── App.jsx                  # Main app with keyboard handlers
```

**Core Components:**

```javascript
// Blob with audio reactivity
const Blob = forwardRef(function Blob({ position, scale, audioData }, ref) {
  const audioScale = audioData ? (1 + audioData.volume * 0.5) : 1
  const audioColor = audioData ? 
    new THREE.Color().setHSL((audioData.bass + audioData.treble) * 0.5, 0.8, 0.6) : 
    defaultColor
  // ...
})

// Formation generator
function ConfigurableBlobFormation({ settings, audioData }) {
  const positions = mathFunctions[settings.formation](
    settings.ballCount, 
    settings.radius, 
    settings.wave
  )
  // ...
}
```

**Audio Processing:**
```javascript
// FFT Analysis
analyser.fftSize = 256
const bufferLength = analyser.frequencyBinCount  // 128
const dataArray = new Uint8Array(bufferLength)

// Frequency separation
const bass = dataArray.slice(0, 10).reduce((a, b) => a + b) / 10
const mid = dataArray.slice(10, 40).reduce((a, b) => a + b) / 30  
const treble = dataArray.slice(40, 80).reduce((a, b) => a + b) / 40
```

**Build System:**
- Vite 5.x (ES modules, fast HMR)
- Multi-stage Docker build (Node.js builder → nginx server)
- GitHub Actions CI/CD pipeline
- ESLint configuration

## Development

**Scripts:**
```bash
npm run dev          # Vite dev server (localhost:5174)
npm run build        # Production build → dist/
npm run preview      # Preview production build
npm run lint         # ESLint validation
```

**Dependencies:**
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1", 
  "@react-three/fiber": "^8.17.10",
  "@react-three/drei": "^9.117.3",
  "three": "^0.169.0"
}
```

**Performance:**
- 60 FPS target with FPS counter monitoring
- Configurable sphere count (37 default, scales to 100+)
- Efficient BufferGeometry for particles
- RAF-based animation loops

## License

MIT - © mangobanaani 2025

