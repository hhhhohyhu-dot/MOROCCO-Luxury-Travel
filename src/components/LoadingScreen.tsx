import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 800); // match CSS fade-out transition
          }, 300);
          return 100;
        }
        // Random incremental steps for organic progress feel
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`preloader ${fadeOut ? 'fade-out' : ''}`}>
      <div className="flex flex-col items-center text-center animate-blur-reveal" style={{ maxWidth: '400px', width: '90%' }}>
        {/* Luxury Logo Emblem */}
        <div style={{
          width: '80px',
          height: '80px',
          border: '2px solid #C5A059',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '24px',
          boxShadow: '0 0 20px rgba(197, 160, 89, 0.2)',
          position: 'relative'
        }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            color: '#C5A059',
            fontSize: '2rem',
            fontWeight: 'bold',
            letterSpacing: '2px'
          }}>M</span>
          <div style={{
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            right: '-4px',
            bottom: '-4px',
            border: '1px dashed rgba(197, 160, 89, 0.4)',
            borderRadius: '50%',
            animation: 'spin 12s linear infinite'
          }} />
        </div>
        
        <h1 style={{
          color: '#FAF7F0',
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.8rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}>
          MOROCCO
        </h1>
        <p style={{
          color: 'rgba(250, 247, 240, 0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontSize: '0.75rem',
          marginBottom: '40px'
        }}>
          Morocco Premium Tourism
        </p>

        {/* Cinematic Progress Bar */}
        <div style={{
          width: '100%',
          height: '2px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#C5A059',
            boxShadow: '0 0 8px #C5A059',
            transition: 'width 0.15s ease-out'
          }} />
        </div>
        
        <div style={{
          marginTop: '12px',
          color: 'rgba(197, 160, 89, 0.8)',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          fontFamily: 'monospace'
        }}>
          {Math.min(progress, 100)}%
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
