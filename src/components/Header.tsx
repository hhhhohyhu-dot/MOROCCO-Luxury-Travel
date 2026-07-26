import React, { useState, useEffect } from 'react';
import { translations, type Language } from '../data/translations';
import { Heart, Sun, Moon, Menu, X, Globe, Coins } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setView: (view: any) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  favoritesCount: number;
  onToggleFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setView,
  language,
  setLanguage,
  currency,
  setCurrency,
  theme,
  setTheme,
  favoritesCount,
  onToggleFavorites
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[language];

  // Detect scroll to add active styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'destinations', label: t.navDestinations },
    { id: 'packages', label: t.navPackages },
    { id: 'services', label: t.navServices },
    { id: 'gallery', label: t.navGallery },
    { id: 'blog', label: t.navBlog },
    { id: 'faq', label: t.navFaq },
    { id: 'contact', label: t.navContact }
  ];

  const handleNavClick = (viewId: string) => {
    setView(viewId);
    setMobileMenuOpen(false);
    
    // Smooth scroll support if navigating to sections on the homepage
    if (viewId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(viewId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className="glass-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '12px 6%' : '20px 6%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'var(--transition-smooth)'
      }}
    >
      {/* Brand Logo */}
      <div
        onClick={() => handleNavClick('home')}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <div style={{
          width: '36px',
          height: '36px',
          border: '1.5px solid var(--gold-royal)',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 0 10px var(--gold-glow)'
        }}>
          <span style={{
            fontFamily: "var(--font-serif)",
            color: 'var(--gold-royal)',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}>M</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{
            fontFamily: "var(--font-serif)",
            fontSize: '1.15rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)'
          }}>
            {t.brand}
          </span>
        </div>
      </div>

      {/* Desktop Navigation Link Directory */}
      <nav style={{ display: 'none' }} className="lg-flex-nav">
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '24px',
          margin: 0,
          padding: 0
        }}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentView === item.id ? 'var(--gold-royal)' : 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: currentView === item.id ? '600' : '400',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  padding: '8px 0',
                  position: 'relative',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {item.label}
                {currentView === item.id && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--gold-royal)',
                    borderRadius: '2px'
                  }} />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* System Configurations Controls (Theme, Currency, Language, Heart Drawer) */}
      <div style={{ display: 'none', gap: '16px', alignItems: 'center' }} className="lg-flex-nav">
        {/* Language selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
          <Globe size={16} style={{ color: 'var(--text-secondary)' }} />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: '500',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="en" style={{ color: '#000' }}>EN</option>
            <option value="fr" style={{ color: '#000' }}>FR</option>
            <option value="ar" style={{ color: '#000' }}>AR</option>
          </select>
        </div>

        {/* Currency selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Coins size={16} style={{ color: 'var(--text-secondary)' }} />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: '500',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="USD" style={{ color: '#000' }}>USD ($)</option>
            <option value="EUR" style={{ color: '#000' }}>EUR (€)</option>
            <option value="MAD" style={{ color: '#000' }}>MAD (د.م.)</option>
            <option value="GBP" style={{ color: '#000' }}>GBP (£)</option>
          </select>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Favorites button */}
        <button
          onClick={onToggleFavorites}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <Heart size={18} fill={favoritesCount > 0 ? 'var(--gold-royal)' : 'none'} style={{ color: favoritesCount > 0 ? 'var(--gold-royal)' : 'currentColor' }} />
          {favoritesCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-6px',
              backgroundColor: 'var(--gold-royal)',
              color: '#FFF',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {favoritesCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile control toggle bar (Visible on mobile/tablets) */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="mobile-only-header-controls">
        {/* Favorites shortcut */}
        <button
          onClick={onToggleFavorites}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <Heart size={20} fill={favoritesCount > 0 ? 'var(--gold-royal)' : 'none'} style={{ color: favoritesCount > 0 ? 'var(--gold-royal)' : 'currentColor' }} />
          {favoritesCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-6px',
              backgroundColor: 'var(--gold-royal)',
              color: '#FFF',
              fontSize: '0.65rem',
              borderRadius: '50%',
              width: '15px',
              height: '15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {favoritesCount}
            </span>
          )}
        </button>

        {/* Menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation side drawer overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--bg-secondary)',
          zIndex: 999,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: 0
          }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentView === item.id ? 'var(--gold-royal)' : 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.1rem',
                    fontWeight: currentView === item.id ? '600' : '400',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Settings in Mobile view */}
          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={18} />
                <span>{t.languageLabel}</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  outline: 'none'
                }}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Coins size={18} />
                <span>{t.currencyLabel}</span>
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  outline: 'none'
                }}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="MAD">MAD (د.م.)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Theme</span>
              <button
                onClick={toggleTheme}
                className="btn-outline"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                <span>{theme === 'light' ? t.darkTheme : t.lightTheme}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for basic global layout checks */}
      <style>{`
        @media(min-width: 1024px) {
          .lg-flex-nav {
            display: flex !important;
          }
          .mobile-only-header-controls {
            display: none !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};
