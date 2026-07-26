import React, { useEffect, useState } from 'react';
import { translations, type Language } from '../data/translations';

interface CookieConsentProps {
  language: Language;
  onOpenPrivacy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ language, onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const consent = localStorage.getItem('meknes_luxury_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('meknes_luxury_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          margin: 0,
          lineHeight: '1.5'
        }}>
          {t.cookieText}
        </p>
      </div>
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        marginTop: '12px',
        width: '100%',
        justifyContent: 'flex-end'
      }}>
        <button
          onClick={onOpenPrivacy}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--gold-royal)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            textDecoration: 'underline',
            fontFamily: 'var(--font-sans)',
            padding: '4px 8px'
          }}
        >
          {t.privacyBtn}
        </button>
        <button
          onClick={handleAccept}
          className="btn-gold"
          style={{
            padding: '8px 16px',
            fontSize: '0.8rem',
            letterSpacing: '0.05em',
            borderRadius: '4px'
          }}
        >
          {t.cookieAccept}
        </button>
      </div>
    </div>
  );
};
