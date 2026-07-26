import React, { useState, useEffect } from 'react';
import { translations, type Language } from '../data/translations';
import { Search, Calendar, Users, CloudSun, Wind, Droplets, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  language: Language;
  onSearch: (query: string) => void;
  setView: (view: any) => void;
}

const backgroundImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Bahia_Palace_large_court.jpg/1280px-Bahia_Palace_large_court.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Merzouga%2C_Morocco.jpg/1280px-Merzouga%2C_Morocco.jpg",
  "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Hassan_II_mosque%2C_Casablanca_2.jpg/1280px-Hassan_II_mosque%2C_Casablanca_2.jpg"
];

const slideLabels = {
  en: ["Bahia Palace, Marrakech", "Merzouga Dunes, Sahara", "Hassan II Mosque, Casablanca"],
  fr: ["Palais de la Bahia, Marrakech", "Dunes de Merzouga, Sahara", "Mosquée Hassan II, Casablanca"],
  ar: ["قصر الباهية، مراكش", "كثبان مرزوقة، الصحراء", "مسجد الحسن الثاني، الدار البيضاء"]
};

const rotatingSubtitles = {
  en: [
    "Discover the Imperial Heart of Morocco",
    "Private Chauffeur Journeys Across Meknes & Fes",
    "Sahara Desert Nights Under a Million Stars",
    "Bespoke Riad Stays in Ancient Medinas",
    "Culinary Masterclasses in Royal Palaces"
  ],
  fr: [
    "Découvrez le Cœur Impérial du Maroc",
    "Voyages Privés en Limousine à Meknès et Fès",
    "Nuits au Désert du Sahara Sous un Ciel Étoilé",
    "Séjours sur Mesure dans des Riads Ancestraux",
    "Ateliers Culinaires dans des Palais Royaux"
  ],
  ar: [
    "اكتشف قلب المغرب الإمبراطوري",
    "رحلات خاصة بسائق شخصي عبر مكناس وفاس",
    "ليالي صحراء تحت ملايين النجوم",
    "إقامات في رياضات المدن العتيقة",
    "دروس طهي ملكي في القصور الإمبراطورية"
  ]
};

// Generate stable particle positions
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: (i * 17.3 + 7) % 100,
  y: (i * 13.7 + 5) % 100,
  size: 1 + (i % 3),
  duration: 3 + (i % 5) * 0.8,
  delay: (i % 8) * 0.5,
  opacity: 0.15 + (i % 4) * 0.1
}));

export const Hero: React.FC<HeroProps> = ({ language, onSearch, setView }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [guests, setGuests] = useState("2");
  const [isTransitioningSubtitle, setIsTransitioningSubtitle] = useState(false);
  const t = translations[language];
  const isRTL = language === 'ar';

  const subtitles = rotatingSubtitles[language] || rotatingSubtitles.en;
  const labels = slideLabels[language] || slideLabels.en;

  // Weather simulation
  const [weatherData] = useState({
    temp: 34,
    condition: language === 'ar' ? 'مشمس' : language === 'fr' ? 'Ensoleillé' : 'Sunny',
    wind: '12 km/h',
    humidity: '28%',
    forecast: [
      { day: language === 'ar' ? 'السبت' : language === 'fr' ? 'Sam' : 'Sat', temp: 35 },
      { day: language === 'ar' ? 'الأحد' : language === 'fr' ? 'Dim' : 'Sun', temp: 36 },
      { day: language === 'ar' ? 'الاثنين' : language === 'fr' ? 'Lun' : 'Mon', temp: 34 }
    ]
  });

  // Slide auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Rotating subtitle
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioningSubtitle(true);
      setTimeout(() => {
        setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
        setIsTransitioningSubtitle(false);
      }, 350);
    }, 3500);
    return () => clearInterval(timer);
  }, [subtitles.length]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
    setView('destinations');
    const destSec = document.getElementById('destinations');
    if (destSec) {
      destSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickNavDest = (destId: string) => {
    setView('destinations');
    onSearch(destId);
    const destSec = document.getElementById('destinations');
    if (destSec) {
      destSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '750px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Slideshow with Framer Motion */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${backgroundImages[activeSlide]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1
          }}
        />
      </AnimatePresence>

      {/* Cinematic multi-layer gradient vignette */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(to bottom, rgba(5,14,10,0.55) 0%, rgba(5,14,10,0.3) 40%, rgba(5,14,10,0.85) 100%)',
        zIndex: 2
      }} />

      {/* Animated gold particle star-field overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="hero-particle"
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: 'var(--gold-royal)',
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* Top-right slide label badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute',
            top: '100px',
            right: isRTL ? 'auto' : '6%',
            left: isRTL ? '6%' : 'auto',
            zIndex: 10,
            background: 'rgba(5,14,10,0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(197,160,89,0.3)',
            borderRadius: '30px',
            padding: '8px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold-royal)', display: 'inline-block' }} />
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', fontWeight: '500', letterSpacing: '0.04em' }}>
            {labels[activeSlide]}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Slide Progress Dots + Bar */}
      <div style={{
        position: 'absolute',
        bottom: '90px',
        right: isRTL ? 'auto' : '6%',
        left: isRTL ? '6%' : 'auto',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isRTL ? 'flex-start' : 'flex-end',
        gap: '12px'
      }}>
        {backgroundImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexDirection: isRTL ? 'row-reverse' : 'row'
            }}
          >
            <motion.div
              animate={{
                width: activeSlide === i ? '28px' : '6px',
                backgroundColor: activeSlide === i ? '#C5A059' : 'rgba(255,255,255,0.35)'
              }}
              transition={{ duration: 0.4 }}
              style={{ height: '6px', borderRadius: '3px' }}
            />
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '88%',
          margin: '0 auto',
          paddingTop: '80px',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          alignItems: 'center'
        }}
        className="hero-grid-layout"
      >
        {/* Left Col - Headings & Search */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Gold eyebrow tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(197, 160, 89, 0.12)',
            border: '1px solid rgba(197,160,89,0.35)',
            borderRadius: '30px',
            padding: '6px 16px',
            marginBottom: '24px'
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--gold-royal)', display: 'inline-block' }} className="pulse-dot" />
            <span style={{
              color: 'var(--gold-royal)',
              textTransform: 'uppercase',
              fontSize: '0.8rem',
              fontWeight: '600',
              letterSpacing: '0.2em'
            }}>
              {t.tagline}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-serif)',
            lineHeight: '1.08',
            marginBottom: '20px',
            textShadow: '0 4px 20px rgba(0,0,0,0.4)',
            fontWeight: '700'
          }}>
            {t.heroTitle}
          </h1>

          {/* Animated rotating subtitle */}
          <div style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '600px',
            lineHeight: '1.6',
            marginBottom: '40px',
            fontWeight: '300',
            height: '2.5rem',
            overflow: 'hidden',
            position: 'relative',
            textAlign: isRTL ? 'right' : 'left'
          }}>
            <motion.span
              key={subtitleIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isTransitioningSubtitle ? 0 : 1, y: isTransitioningSubtitle ? -8 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'block' }}
            >
              {subtitles[subtitleIndex]}
            </motion.span>
          </div>

          {/* Luxury Search Engine */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              background: 'rgba(5, 14, 10, 0.45)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(197, 160, 89, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
              maxWidth: '850px'
            }}
            className="hero-search-form"
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '8px'
            }} className="hero-search-inputs">
              
              {/* Destination Search */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRight: '1px solid rgba(255,255,255,0.08)'
              }} className="search-field-wrapper">
                <Search size={18} style={{ color: 'var(--gold-royal)', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFF',
                    outline: 'none',
                    width: '100%',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem'
                  }}
                  className="hero-search-input-field"
                />
              </div>

              {/* Dates Select */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRight: '1px solid rgba(255,255,255,0.08)'
              }} className="search-field-wrapper">
                <Calendar size={18} style={{ color: 'var(--gold-royal)', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>
                    {t.checkIn}
                  </span>
                  <input
                    type="date"
                    defaultValue="2026-07-24"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FFF',
                      outline: 'none',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-sans)',
                      colorScheme: 'dark'
                    }}
                  />
                </div>
              </div>

              {/* Guests Select */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px'
              }} className="search-field-wrapper">
                <Users size={18} style={{ color: 'var(--gold-royal)', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>
                    {t.travelers}
                  </span>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FFF',
                      outline: 'none',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-sans)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="1" style={{ color: '#000' }}>1 Guest</option>
                    <option value="2" style={{ color: '#000' }}>2 Guests</option>
                    <option value="4" style={{ color: '#000' }}>4 Guests</option>
                    <option value="6" style={{ color: '#000' }}>6+ Guests</option>
                  </select>
                </div>
              </div>
            </div>

            {/* CTA search submit button */}
            <button
              type="submit"
              className="btn-gold"
              style={{
                padding: '16px 32px',
                borderRadius: 'var(--radius-sm)',
                justifyContent: 'center',
                fontSize: '0.9rem',
                letterSpacing: '0.08em'
              }}
            >
              {t.searchBtn}
            </button>
          </form>

          {/* Quick Floating Tags */}
          <div style={{
            marginTop: '28px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {language === 'ar' ? 'الأكثر شعبية:' : language === 'fr' ? 'Populaires:' : 'Popular:'}
            </span>
            {["Marrakech", "Sahara", "Chefchaouen", "Meknes", "Fes"].map((tag) => (
              <button key={tag} onClick={() => quickNavDest(tag)} className="quick-tag">
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right Col - Weather Widget */}
        <div style={{ display: 'none', flexDirection: 'column', gap: '24px', justifySelf: 'end' }} className="hero-right-column">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              background: 'rgba(5, 14, 10, 0.55)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(197,160,89,0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              width: '300px',
              color: '#FAF7F0',
              boxShadow: 'var(--shadow-lg)'
            }}
            className="animate-float"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-royal)' }}>
                {t.weatherTitle}
              </span>
              <CloudSun size={20} style={{ color: 'var(--gold-royal)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '3rem', fontWeight: '300', fontFamily: 'monospace' }}>{weatherData.temp}°C</span>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>{weatherData.condition}</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Wind size={12} />
                <span>{weatherData.wind}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Droplets size={12} />
                <span>{weatherData.humidity}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>
                {t.weatherForecast}
              </span>
              {weatherData.forecast.map((fc, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}>{fc.day}</span>
                  <span style={{ fontWeight: '500', fontFamily: 'monospace' }}>{fc.temp}°C</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'rgba(255,255,255,0.5)',
          transition: 'color 0.3s'
        }}
        whileHover={{ color: 'rgba(255,255,255,0.9)' }}
      >
        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          {language === 'ar' ? 'للأسفل' : language === 'fr' ? 'Défiler' : 'Scroll'}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      <style>{`
        .hero-particle {
          animation: heroParticleFloat var(--dur, 4s) ease-in-out infinite;
        }
        @keyframes heroParticleFloat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: var(--op, 0.2); }
          33%  { transform: translate(3px, -5px) scale(1.3); }
          66%  { transform: translate(-2px, 4px) scale(0.8); }
        }
        .pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(197,160,89,0.6); }
          50% { box-shadow: 0 0 0 5px rgba(197,160,89,0); }
        }
        .quick-tag {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.75);
          font-size: 0.78rem;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: var(--transition-smooth);
          font-family: var(--font-sans);
        }
        .quick-tag:hover {
          background: var(--gold-royal);
          color: #FFF;
          border-color: var(--gold-royal);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px var(--gold-glow);
        }
        @media(min-width: 768px) {
          .hero-search-inputs {
            grid-template-columns: 2fr 1fr 1fr !important;
          }
          .hero-search-form {
            flex-direction: row !important;
            align-items: center;
          }
        }
        @media(min-width: 1024px) {
          .hero-grid-layout {
            grid-template-columns: 3fr 1fr !important;
          }
          .hero-right-column {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
};
