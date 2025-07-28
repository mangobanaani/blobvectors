import { useState, useEffect, useRef } from 'react'

const AudioReactive = ({ onAudioData }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasAudio, setHasAudio] = useState(false)
  const analyserRef = useRef()
  const dataArrayRef = useRef()
  const animationRef = useRef()

  useEffect(() => {
    // Try to get microphone access for live audio reactivity
    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const source = audioContext.createMediaStreamSource(stream)
        const analyser = audioContext.createAnalyser()
        
        analyser.fftSize = 256
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        
        source.connect(analyser)
        analyserRef.current = analyser
        dataArrayRef.current = dataArray
        setHasAudio(true)
        
        // Start audio analysis loop
        const analyze = () => {
          if (analyserRef.current && dataArrayRef.current && isPlaying) {
            analyserRef.current.getByteFrequencyData(dataArrayRef.current)
            
            // Calculate audio metrics
            const bass = dataArrayRef.current.slice(0, 10).reduce((a, b) => a + b) / 10
            const mid = dataArrayRef.current.slice(10, 40).reduce((a, b) => a + b) / 30
            const treble = dataArrayRef.current.slice(40, 80).reduce((a, b) => a + b) / 40
            const volume = dataArrayRef.current.reduce((a, b) => a + b) / bufferLength
            
            // Send audio data to parent
            if (onAudioData) {
              onAudioData({
                bass: bass / 255,
                mid: mid / 255,
                treble: treble / 255,
                volume: volume / 255,
                frequency: dataArrayRef.current
              })
            }
          }
          animationRef.current = requestAnimationFrame(analyze)
        }
        
        if (isPlaying) {
          analyze()
        }
      } catch {
        console.log('Microphone access denied, using synthetic audio data')
        // Fallback to synthetic audio data
        const generateSyntheticAudio = () => {
          if (isPlaying && onAudioData) {
            const time = Date.now() * 0.001
            onAudioData({
              bass: (Math.sin(time * 2) + 1) * 0.5,
              mid: (Math.sin(time * 3) + 1) * 0.5,
              treble: (Math.sin(time * 5) + 1) * 0.5,
              volume: (Math.sin(time) + 1) * 0.5,
              frequency: new Array(128).fill(0).map((_, i) => 
                Math.sin(time + i * 0.1) * 127 + 128
              )
            })
          }
          animationRef.current = requestAnimationFrame(generateSyntheticAudio)
        }
        
        if (isPlaying) {
          generateSyntheticAudio()
        }
        setHasAudio(true)
      }
    }

    initAudio()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, onAudioData])

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div style={{
      position: 'fixed',
      top: '70px',
      left: '20px',
      zIndex: 1001,
      background: 'rgba(0, 0, 0, 0.7)',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #00ffff',
      color: '#00ffff',
      fontFamily: 'monospace',
      fontSize: '12px'
    }}>
      <div>Audio Reactive</div>
      <button
        onClick={toggleAudio}
        style={{
          background: isPlaying ? '#ff006e' : '#00ffff',
          color: 'black',
          border: 'none',
          padding: '5px 10px',
          marginTop: '5px',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '10px',
          fontFamily: 'monospace'
        }}
      >
        {isPlaying ? 'STOP' : 'START'}
      </button>
      <div style={{ fontSize: '10px', marginTop: '5px', opacity: 0.7 }}>
        {hasAudio ? (isPlaying ? 'LISTENING...' : 'READY') : 'LOADING...'}
      </div>
    </div>
  )
}

export default AudioReactive
