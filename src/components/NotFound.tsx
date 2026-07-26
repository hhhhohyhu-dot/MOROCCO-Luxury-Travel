import React from 'react';
import { translations, type Language } from '../data/translations';
import { Compass, ArrowRight } from 'lucide-react';

interface NotFoundProps {
  language: Language;
  onReturnHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ language, onReturnHome }) => {
  const t = translations[language];

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        backgroundColor: '#050E0A', // luxury dark background
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FAF7F0',
        padding: '24px',
        textAlign: 'center'
      }}
    >
      <div className="animate-blur-reveal" style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        
        {/* Animated Compass Emblem */}
        <div style={{
          width: '90px',
          height: '90px',
          border: '2px solid var(--gold-royal)',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'spinSlow 20s linear infinite',
          boxShadow: '0 0 30px rgba(197,160,89,0.2)'
        }}>
          <Compass size={40} style={{ color: 'var(--gold-royal)' }} />
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontFamily: 'var(--font-serif)',
          margin: 0,
          color: '#FAF7F0'
        }}>
          404
        </h1>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-sans)',
          fontWeight: '500',
          letterSpacing: '0.05em',
          color: 'var(--gold-royal)',
          textTransform: 'uppercase',
          margin: 0
        }}>
          {t.error404}
        </h3>

        <p style={{
          fontSize: '0.95rem',
          color: 'rgba(250,247,240,0.6)',
          lineHeight: '1.6',
          margin: '0 0 16px 0'
        }}>
          {t.error404Text}
        </p>

        <button
          onClick={onReturnHome}
          className="btn-gold"
          style={{
            padding: '14px 32px',
            borderRadius: '4px',
            fontSize: '0.85rem'
          }}
        >
          {t.backHome}
          <ArrowRight size={16} />
        </button>

      </div>

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
