import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Blobvectors from './components/Blobvestors'
import Controls from './components/Controls'
import FPSCounter from './components/FPSCounter'
import ParticleTrails from './components/ParticleTrails'
import AudioReactive from './components/AudioReactive'
import './App.css'

function App() {
  // Audio data state
  const [audioData, setAudioData] = useState(null)
  // Default settings for the blobvectors effect
  const [settings, setSettings] = useState({
    shape: 'sphere',
    formation: 'circle',
    ballCount: 37,
    ballSize: 0.5,
    radius: 5,
    wave: {
      amplitude: 2,
      frequency: 0.8,
      speed: 1
    },
    rotationSpeed: 2,
    material: {
      metalness: 0.5,
      roughness: 0.3
    },
    // New visual effects settings
    effects: {
      bloom: false,
      trails: false,
      chromatic: false,
      crt: false,
      plasma: false
    }
  })

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch(event.code) {
        case 'Space':
          event.preventDefault();
          // Toggle pause/resume (we'll implement this)
          break;
        case 'KeyB':
          // Toggle bloom effect
          setSettings(prev => ({
            ...prev,
            effects: { ...prev.effects, bloom: !prev.effects.bloom }
          }));
          break;
        case 'KeyC':
          // Toggle chromatic aberration
          setSettings(prev => ({
            ...prev,
            effects: { ...prev.effects, chromatic: !prev.effects.chromatic }
          }));
          break;
        case 'KeyT':
          // Toggle trails
          setSettings(prev => ({
            ...prev,
            effects: { ...prev.effects, trails: !prev.effects.trails }
          }));
          break;
        case 'KeyP':
          // Toggle plasma background
          setSettings(prev => ({
            ...prev,
            effects: { ...prev.effects, plasma: !prev.effects.plasma }
          }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Camera settings
  const [cameraSettings, setCameraSettings] = useState({
    position: { x: 0, y: 0, z: 10 },
    fov: 60,
    autoRotate: false
  })

  return (
    <div className={`App ${settings.effects.crt ? 'crt-effect' : ''}`}>
      {/* Plasma background effect */}
      {settings.effects.plasma && <div className="plasma-bg" />}
      
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a2e 50%, #16213e 100%)'
      }}>
        <Canvas
          camera={{ 
            position: [cameraSettings.position.x, cameraSettings.position.y, cameraSettings.position.z], 
            fov: cameraSettings.fov 
          }}
          frameloop="always"
          shadows
        >
          {/* Background stars for that demoscene atmosphere */}
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade={true}
          />
          
          {/* Our main blobvectors effect */}
          <Blobvectors settings={settings} cameraSettings={cameraSettings} audioData={audioData} />
          
          {/* Particle trails effect */}
          <ParticleTrails enabled={settings.effects.trails} />
          
          {/* Optional orbit controls for user interaction */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={false}
            autoRotateSpeed={0.5}
            minDistance={2}
            maxDistance={50}
          />
        </Canvas>
        
        {/* Demoscene-style overlay text */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: '#fff',
          fontFamily: 'monospace',
          fontSize: '14px',
          textShadow: '0 0 10px #00ffff',
          pointerEvents: 'none',
          zIndex: 100
        }}>
          <div className={`${settings.effects.bloom ? 'bloom-effect' : ''} ${settings.effects.chromatic ? 'chromatic-aberration' : ''} neon-glow`}>
            BLOBVECTORS
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            Amiga Demoscene Effect - React + Three.js
          </div>
          <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '10px' }}>
            Keys: B=Bloom | C=Chromatic | T=Trails | P=Plasma | Space=Pause
          </div>
        </div>

        {/* Controls Panel */}
        <Controls 
          settings={settings}
          onSettingsChange={setSettings}
          cameraSettings={cameraSettings}
          onCameraChange={setCameraSettings}
        />

        {/* FPS Counter */}
        <FPSCounter />

        {/* Audio Reactive Controls */}
        <AudioReactive onAudioData={setAudioData} />

        {/* Copyright */}
        <div className="copyright">
          © mangobanaani 2025
        </div>
      </div>
    </div>
  )
}

export default App
