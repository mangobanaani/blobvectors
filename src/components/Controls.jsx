import { useState } from 'react'
import './Controls.css'

const Controls = ({ 
  settings, 
  onSettingsChange, 
  onCameraChange,
  cameraSettings 
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSettingChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  const handleCameraChange = (key, value) => {
    onCameraChange({ ...cameraSettings, [key]: value })
  }

  const handleNestedChange = (parentKey, childKey, value) => {
    const newSettings = {
      ...settings,
      [parentKey]: {
        ...settings[parentKey],
        [childKey]: value
      }
    }
    onSettingsChange(newSettings)
  }

  return (
    <div className={`controls-panel ${isOpen ? 'open' : 'closed'}`}>
      <button 
        className="toggle-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '⚙️'} Controls
      </button>
      
      {isOpen && (
        <div className="controls-content">
          <h3>Blobvectors Controls</h3>
          
          {/* Shape Selection */}
          <div className="control-group">
            <label>Shape:</label>
            <select 
              value={settings.shape} 
              onChange={(e) => handleSettingChange('shape', e.target.value)}
            >
              <optgroup label="Basic Shapes">
                <option value="icosahedron">Icosahedron (Classic)</option>
                <option value="sphere">Sphere</option>
                <option value="cube">Cube</option>
                <option value="octahedron">Octahedron</option>
                <option value="dodecahedron">Dodecahedron</option>
                <option value="torus">Torus (Donut)</option>
                <option value="cone">Cone</option>
                <option value="cylinder">Cylinder</option>
              </optgroup>
              <optgroup label="Mathematical Surfaces">
                <option value="kleinBottle">Klein Bottle</option>
                <option value="mobiusStrip">Möbius Strip</option>
                <option value="trefoilKnot">Trefoil Knot</option>
                <option value="hyperbolicParaboloid">Hyperbolic Paraboloid (Saddle)</option>
                <option value="sineWaveCarpet">Sine Wave Carpet</option>
                <option value="rippleSurface">Ripple Surface</option>
                <option value="helicoid">Helicoid</option>
                <option value="catenoid">Catenoid</option>
                <option value="monkeySaddle">Monkey Saddle</option>
                <option value="diniSurface">Dini's Surface</option>
                <option value="boysSurface">Boys Surface</option>
                <option value="torusKnot">Torus Knot</option>
                <option value="waveInterference">Wave Interference</option>
                <option value="gaussian">Gaussian Function</option>
                <option value="peaks">MATLAB Peaks</option>
                <option value="mexicanHat">Mexican Hat (Sombrero)</option>
                <option value="mandelbrotSurface">Mandelbrot Surface</option>
                <option value="heartSurface">Heart Surface</option>
                <option value="seashell">Seashell (Conchoid)</option>
                <option value="roseSurface">Rose Surface</option>
                <option value="twistedTorus">Twisted Torus</option>
                <option value="lissajousSurface">Lissajous Surface</option>
                <option value="eggSurface">Egg Surface</option>
                <option value="hyperboloid">Hyperboloid</option>
              </optgroup>
            </select>
          </div>

          {/* Formation Pattern */}
          <div className="control-group">
            <label>Formation:</label>
            <select 
              value={settings.formation} 
              onChange={(e) => handleSettingChange('formation', e.target.value)}
            >
              <optgroup label="Basic Patterns">
                <option value="circle">Circle</option>
                <option value="spiral">Spiral</option>
                <option value="grid">Grid</option>
                <option value="helix">Helix</option>
                <option value="random">Random</option>
              </optgroup>
              <optgroup label="Advanced Mathematical Patterns">
                <option value="doubleHelix">Double Helix (DNA)</option>
                <option value="fibonacci">Fibonacci Spiral</option>
                <option value="lissajous">Lissajous Curves</option>
                <option value="rose">Rose Curve</option>
                <option value="trefoil">Trefoil Knot Path</option>
                <option value="torus">Torus Surface</option>
                <option value="spherical">Spherical Distribution</option>
                <option value="mandelbrot">Mandelbrot Set</option>
                <option value="butterfly">Butterfly Curve</option>
                <option value="heart">Heart Curve</option>
                <option value="klein">Klein Bottle Path</option>
                <option value="mobius">Möbius Strip Path</option>
                <option value="hypercube">Hypercube Projection</option>
                <option value="fractalTree">Fractal Tree</option>
              </optgroup>
            </select>
          </div>

          {/* Ball Settings */}
          <div className="control-group">
            <label>Ball Count: {settings.ballCount}</label>
            <input 
              type="range" 
              min="3" 
              max="50" 
              value={settings.ballCount}
              onChange={(e) => handleSettingChange('ballCount', parseInt(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Ball Size: {settings.ballSize.toFixed(2)}</label>
            <input 
              type="range" 
              min="0.1" 
              max="1.0" 
              step="0.05"
              value={settings.ballSize}
              onChange={(e) => handleSettingChange('ballSize', parseFloat(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Formation Radius: {settings.radius.toFixed(1)}</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="0.5"
              value={settings.radius}
              onChange={(e) => handleSettingChange('radius', parseFloat(e.target.value))}
            />
          </div>

          {/* Wave Parameters */}
          <div className="control-group">
            <label>Wave Amplitude: {settings.wave.amplitude.toFixed(1)}</label>
            <input 
              type="range" 
              min="0" 
              max="5" 
              step="0.1"
              value={settings.wave.amplitude}
              onChange={(e) => handleNestedChange('wave', 'amplitude', parseFloat(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Wave Frequency: {settings.wave.frequency.toFixed(1)}</label>
            <input 
              type="range" 
              min="0.1" 
              max="3" 
              step="0.1"
              value={settings.wave.frequency}
              onChange={(e) => handleNestedChange('wave', 'frequency', parseFloat(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Wave Speed: {settings.wave.speed.toFixed(1)}</label>
            <input 
              type="range" 
              min="0.1" 
              max="3" 
              step="0.1"
              value={settings.wave.speed}
              onChange={(e) => handleNestedChange('wave', 'speed', parseFloat(e.target.value))}
            />
          </div>

          {/* Rotation Settings */}
          <div className="control-group">
            <label>Rotation Speed: {settings.rotationSpeed.toFixed(1)}</label>
            <input 
              type="range" 
              min="0" 
              max="3" 
              step="0.1"
              value={settings.rotationSpeed}
              onChange={(e) => handleSettingChange('rotationSpeed', parseFloat(e.target.value))}
            />
          </div>

          {/* Material Settings */}
          <div className="control-group">
            <label>Metalness: {settings.material.metalness.toFixed(2)}</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05"
              value={settings.material.metalness}
              onChange={(e) => handleNestedChange('material', 'metalness', parseFloat(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Roughness: {settings.material.roughness.toFixed(2)}</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05"
              value={settings.material.roughness}
              onChange={(e) => handleNestedChange('material', 'roughness', parseFloat(e.target.value))}
            />
          </div>

          {/* Visual Effects */}
          <h4>Visual Effects</h4>
          
          <div className="control-group">
            <label>
              <input 
                type="checkbox" 
                checked={settings.effects?.bloom || false}
                onChange={(e) => handleNestedChange('effects', 'bloom', e.target.checked)}
              />
              Bloom Effect
            </label>
          </div>
          
          <div className="control-group">
            <label>
              <input 
                type="checkbox" 
                checked={settings.effects?.chromatic || false}
                onChange={(e) => handleNestedChange('effects', 'chromatic', e.target.checked)}
              />
              Chromatic Aberration
            </label>
          </div>
          
          <div className="control-group">
            <label>
              <input 
                type="checkbox" 
                checked={settings.effects?.trails || false}
                onChange={(e) => handleNestedChange('effects', 'trails', e.target.checked)}
              />
              Particle Trails
            </label>
          </div>
          
          <div className="control-group">
            <label>
              <input 
                type="checkbox" 
                checked={settings.effects?.crt || false}
                onChange={(e) => handleNestedChange('effects', 'crt', e.target.checked)}
              />
              CRT Scanlines
            </label>
          </div>
          
          <div className="control-group">
            <label>
              <input 
                type="checkbox" 
                checked={settings.effects?.plasma || false}
                onChange={(e) => handleNestedChange('effects', 'plasma', e.target.checked)}
              />
              Plasma Background
            </label>
          </div>

          {/* Camera Controls */}
          <h4>Camera</h4>
          
          <div className="control-group">
            <label>Camera X: {cameraSettings.position.x.toFixed(1)}</label>
            <input 
              type="range" 
              min="-20" 
              max="20" 
              step="0.5"
              value={cameraSettings.position.x}
              onChange={(e) => handleCameraChange('position', {
                ...cameraSettings.position,
                x: parseFloat(e.target.value)
              })}
            />
          </div>

          <div className="control-group">
            <label>Camera Y: {cameraSettings.position.y.toFixed(1)}</label>
            <input 
              type="range" 
              min="-20" 
              max="20" 
              step="0.5"
              value={cameraSettings.position.y}
              onChange={(e) => handleCameraChange('position', {
                ...cameraSettings.position,
                y: parseFloat(e.target.value)
              })}
            />
          </div>

          <div className="control-group">
            <label>Camera Z: {cameraSettings.position.z.toFixed(1)}</label>
            <input 
              type="range" 
              min="-20" 
              max="20" 
              step="0.5"
              value={cameraSettings.position.z}
              onChange={(e) => handleCameraChange('position', {
                ...cameraSettings.position,
                z: parseFloat(e.target.value)
              })}
            />
          </div>

          <div className="control-group">
            <label>FOV: {cameraSettings.fov}°</label>
            <input 
              type="range" 
              min="20" 
              max="120" 
              value={cameraSettings.fov}
              onChange={(e) => handleCameraChange('fov', parseInt(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>
              <input 
                type="checkbox" 
                checked={cameraSettings.autoRotate}
                onChange={(e) => handleCameraChange('autoRotate', e.target.checked)}
              />
              Auto Rotate Camera
            </label>
          </div>

          {/* Preset Buttons */}
          <div className="control-group">
            <h4>Presets</h4>
            <button onClick={() => onSettingsChange({
              shape: 'icosahedron',
              formation: 'circle',
              ballCount: 20,
              ballSize: 0.25,
              radius: 5,
              wave: { amplitude: 2, frequency: 0.8, speed: 1 },
              rotationSpeed: 1,
              material: { metalness: 0.9, roughness: 0.1 }
            })}>Classic</button>
            
            <button onClick={() => onSettingsChange({
              shape: 'torus',
              formation: 'spiral',
              ballCount: 30,
              ballSize: 0.15,
              radius: 4,
              wave: { amplitude: 3, frequency: 1.5, speed: 2 },
              rotationSpeed: 2,
              material: { metalness: 0.8, roughness: 0.3 }
            })}>Spiral Donuts</button>
            
            <button onClick={() => onSettingsChange({
              shape: 'cube',
              formation: 'grid',
              ballCount: 25,
              ballSize: 0.3,
              radius: 6,
              wave: { amplitude: 1, frequency: 0.5, speed: 0.5 },
              rotationSpeed: 0.5,
              material: { metalness: 1.0, roughness: 0.0 }
            })}>Cubic Grid</button>

            <button onClick={() => onSettingsChange({
              shape: 'kleinBottle',
              formation: 'circle',
              ballCount: 8,
              ballSize: 0.8,
              radius: 3,
              wave: { amplitude: 1, frequency: 0.3, speed: 0.8 },
              rotationSpeed: 0.8,
              material: { metalness: 0.95, roughness: 0.05 }
            })}>Klein Bottles</button>

            <button onClick={() => onSettingsChange({
              shape: 'mobiusStrip',
              formation: 'helix',
              ballCount: 12,
              ballSize: 0.6,
              radius: 4,
              wave: { amplitude: 2, frequency: 1.0, speed: 1.2 },
              rotationSpeed: 1.5,
              material: { metalness: 0.7, roughness: 0.2 }
            })}>Möbius Helix</button>

            <button onClick={() => onSettingsChange({
              shape: 'sineWaveCarpet',
              formation: 'grid',
              ballCount: 16,
              ballSize: 0.4,
              radius: 5,
              wave: { amplitude: 2.5, frequency: 2.0, speed: 1.5 },
              rotationSpeed: 1.0,
              material: { metalness: 0.8, roughness: 0.15 }
            })}>Wave Carpets</button>

            <button onClick={() => onSettingsChange({
              shape: 'peaks',
              formation: 'random',
              ballCount: 15,
              ballSize: 0.5,
              radius: 6,
              wave: { amplitude: 1.5, frequency: 0.6, speed: 0.7 },
              rotationSpeed: 0.6,
              material: { metalness: 0.9, roughness: 0.1 }
            })}>MATLAB Peaks</button>

            <button onClick={() => onSettingsChange({
              shape: 'mandelbrotSurface',
              formation: 'spiral',
              ballCount: 20,
              ballSize: 0.3,
              radius: 4,
              wave: { amplitude: 1.8, frequency: 1.2, speed: 1.0 },
              rotationSpeed: 1.2,
              material: { metalness: 0.85, roughness: 0.25 }
            })}>Fractal Surface</button>

            <button onClick={() => onSettingsChange({
              shape: 'heartSurface',
              formation: 'circle',
              ballCount: 10,
              ballSize: 0.4,
              radius: 6,
              wave: { amplitude: 1.2, frequency: 0.8, speed: 0.6 },
              rotationSpeed: 0.8,
              material: { metalness: 0.7, roughness: 0.3 }
            })}>Floating Hearts</button>

            <button onClick={() => onSettingsChange({
              shape: 'seashell',
              formation: 'spiral',
              ballCount: 15,
              ballSize: 0.35,
              radius: 5,
              wave: { amplitude: 2.0, frequency: 1.5, speed: 1.3 },
              rotationSpeed: 1.1,
              material: { metalness: 0.8, roughness: 0.2 }
            })}>Seashell Spiral</button>

            <button onClick={() => onSettingsChange({
              shape: 'roseSurface',
              formation: 'grid',
              ballCount: 12,
              ballSize: 0.5,
              radius: 4,
              wave: { amplitude: 1.5, frequency: 1.8, speed: 1.4 },
              rotationSpeed: 1.3,
              material: { metalness: 0.6, roughness: 0.4 }
            })}>Rose Garden</button>

            <button onClick={() => onSettingsChange({
              shape: 'twistedTorus',
              formation: 'helix',
              ballCount: 18,
              ballSize: 0.3,
              radius: 5,
              wave: { amplitude: 2.2, frequency: 2.0, speed: 1.8 },
              rotationSpeed: 2.0,
              material: { metalness: 0.95, roughness: 0.05 }
            })}>Twisted Helix</button>

            <button onClick={() => onSettingsChange({
              shape: 'lissajousSurface',
              formation: 'random',
              ballCount: 25,
              ballSize: 0.25,
              radius: 7,
              wave: { amplitude: 3.0, frequency: 2.5, speed: 2.2 },
              rotationSpeed: 1.8,
              material: { metalness: 0.9, roughness: 0.1 }
            })}>Lissajous Chaos</button>

            <button onClick={() => onSettingsChange({
              shape: 'icosahedron',
              formation: 'fibonacci',
              ballCount: 34,
              ballSize: 0.2,
              radius: 6,
              wave: { amplitude: 1.6, frequency: 1.618, speed: 1.0 },
              rotationSpeed: 1.0,
              material: { metalness: 0.85, roughness: 0.15 }
            })}>Golden Fibonacci</button>

            <button onClick={() => onSettingsChange({
              shape: 'heartSurface',
              formation: 'heart',
              ballCount: 20,
              ballSize: 0.3,
              radius: 5,
              wave: { amplitude: 2.0, frequency: 0.5, speed: 0.8 },
              rotationSpeed: 0.7,
              material: { metalness: 0.6, roughness: 0.4 }
            })}>Love Algorithm</button>

            <button onClick={() => onSettingsChange({
              shape: 'kleinBottle',
              formation: 'klein',
              ballCount: 15,
              ballSize: 0.4,
              radius: 4,
              wave: { amplitude: 1.8, frequency: 1.2, speed: 1.5 },
              rotationSpeed: 1.2,
              material: { metalness: 0.95, roughness: 0.05 }
            })}>Klein Inception</button>

            <button onClick={() => onSettingsChange({
              shape: 'torus',
              formation: 'doubleHelix',
              ballCount: 28,
              ballSize: 0.25,
              radius: 5,
              wave: { amplitude: 2.5, frequency: 1.8, speed: 1.6 },
              rotationSpeed: 1.4,
              material: { metalness: 0.8, roughness: 0.2 }
            })}>DNA Structure</button>

            <button onClick={() => onSettingsChange({
              shape: 'roseSurface',
              formation: 'rose',
              ballCount: 25,
              ballSize: 0.3,
              radius: 6,
              wave: { amplitude: 2.2, frequency: 2.0, speed: 1.3 },
              rotationSpeed: 1.1,
              material: { metalness: 0.7, roughness: 0.3 }
            })}>Mathematical Garden</button>

            <button onClick={() => onSettingsChange({
              shape: 'mandelbrotSurface',
              formation: 'mandelbrot',
              ballCount: 30,
              ballSize: 0.2,
              radius: 4,
              wave: { amplitude: 1.5, frequency: 2.5, speed: 2.0 },
              rotationSpeed: 1.8,
              material: { metalness: 0.9, roughness: 0.1 }
            })}>Fractal Universe</button>

            <button onClick={() => onSettingsChange({
              shape: 'butterfly',
              formation: 'butterfly',
              ballCount: 22,
              ballSize: 0.35,
              radius: 5,
              wave: { amplitude: 2.8, frequency: 1.4, speed: 1.2 },
              rotationSpeed: 0.9,
              material: { metalness: 0.75, roughness: 0.25 }
            })}>Butterfly Effect</button>

            <button onClick={() => onSettingsChange({
              shape: 'hyperboloid',
              formation: 'hypercube',
              ballCount: 16,
              ballSize: 0.4,
              radius: 4,
              wave: { amplitude: 1.0, frequency: 3.0, speed: 2.5 },
              rotationSpeed: 2.0,
              material: { metalness: 1.0, roughness: 0.0 }
            })}>4D Projection</button>

            <button onClick={() => onSettingsChange({
              shape: 'trefoilKnot',
              formation: 'trefoil',
              ballCount: 18,
              ballSize: 0.35,
              radius: 3,
              wave: { amplitude: 1.2, frequency: 1.6, speed: 1.4 },
              rotationSpeed: 1.3,
              material: { metalness: 0.88, roughness: 0.12 }
            })}>Knot Theory</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Controls
