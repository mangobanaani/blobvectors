import { useState, useEffect, useRef } from 'react';

const FPSCounter = () => {
  const [fps, setFps] = useState(0);
  const [rafInterval, setRafInterval] = useState(0);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const lastRafTimeRef = useRef(performance.now());

  useEffect(() => {
    let animationId;

    const updateFPS = () => {
      const now = performance.now();
      frameCountRef.current++;

      // Calculate RAF interval
      const rafDelta = now - lastRafTimeRef.current;
      setRafInterval(Math.round(rafDelta * 10) / 10);
      lastRafTimeRef.current = now;

      if (now >= lastTimeRef.current + 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current)));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animationId = requestAnimationFrame(updateFPS);
    };

    animationId = requestAnimationFrame(updateFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="fps-counter">
      FPS: {fps} | RAF: {rafInterval}ms
    </div>
  );
};

export default FPSCounter;
