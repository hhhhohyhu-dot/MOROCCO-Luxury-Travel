import React, { useState } from 'react';
import { type Language } from '../data/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, X, ChevronUp } from 'lucide-react';

interface SoundscapePlayerProps {
  language: Language;
}

const tracks = [
  { id: 'sahara', name: { en: "Sahara Night Breeze", fr: "Brise Nocturne du Sahara", ar: "نسيم الصحراء ليلاً" } },
  { id: 'fes', name: { en: "Fes Medina Morning", fr: "Matinée dans la Médina de Fès", ar: "صباح المدينة القديمة بفاس" } },
  { id: 'andalusian', name: { en: "Andalusian Fountain", fr: "Fontaine Andalouse", ar: "نافورة أندلسية" } }
];

export const SoundscapePlayer: React.FC<SoundscapePlayerProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState(tracks[0].id);
  const isRTL = language === 'ar';

  const activeTrack = tracks.find(t => t.id === activeTrackId) || tracks[0];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, you would interact with an HTML5 Audio element here:
    // if (!isPlaying) audioRef.current.play(); else audioRef.current.pause();
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      left: isRTL ? '30px' : 'auto',
      right: isRTL ? 'auto' : '30px',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: isRTL ? 'flex-start' : 'flex-end',
      gap: '12px'
    }}>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: 'rgba(5, 14, 10, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(197, 160, 89, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              width: '280px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              textAlign: isRTL ? 'right' : 'left'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Music size={16} style={{ color: 'var(--gold-royal)' }} />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {language === 'ar' ? 'أجواء صوتية' : language === 'fr' ? 'Ambiance Sonore' : 'Soundscapes'}
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {/* Track Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {tracks.map(track => (
                <button
                  key={track.id}
                  onClick={() => { setActiveTrackId(track.id); setIsPlaying(true); }}
                  style={{
                    backgroundColor: activeTrackId === track.id ? 'rgba(197, 160, 89, 0.15)' : 'transparent',
                    border: activeTrackId === track.id ? '1px solid var(--gold-royal)' : '1px solid transparent',
                    color: activeTrackId === track.id ? 'var(--gold-royal)' : 'var(--text-secondary)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    textAlign: isRTL ? 'right' : 'left',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }}
                >
                  <span>{track.name[language]}</span>
                  {activeTrackId === track.id && isPlaying && (
                    <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px' }}>
                      <div className="equalizer-bar" style={{ height: '8px', width: '3px' }} />
                      <div className="equalizer-bar" style={{ height: '12px', width: '3px' }} />
                      <div className="equalizer-bar" style={{ height: '6px', width: '3px' }} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={togglePlay}
                  style={{
                    width: '36px', height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--gold-royal)',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#000',
                    cursor: 'pointer',
                    boxShadow: '0 0 12px rgba(197, 160, 89, 0.4)'
                  }}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                </button>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    {isPlaying ? (language === 'ar' ? 'جارٍ التشغيل' : language === 'fr' ? 'Lecture en cours' : 'Now Playing') : (language === 'ar' ? 'متوقف' : language === 'fr' ? 'En pause' : 'Paused')}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--gold-royal)' }}>{activeTrack.name[language]}</span>
                </div>
              </div>
              <Volume2 size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          style={{
            backgroundColor: 'rgba(5, 14, 10, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--gold-royal)',
            borderRadius: '30px',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}
        >
          <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px', opacity: isPlaying ? 1 : 0.4 }}>
            <div className="equalizer-bar" style={{ height: '6px', width: '2px', animationPlayState: isPlaying ? 'running' : 'paused' }} />
            <div className="equalizer-bar" style={{ height: '12px', width: '2px', animationPlayState: isPlaying ? 'running' : 'paused' }} />
            <div className="equalizer-bar" style={{ height: '4px', width: '2px', animationPlayState: isPlaying ? 'running' : 'paused' }} />
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: '500', fontFamily: 'var(--font-sans)', letterSpacing: '0.05em' }}>
            {activeTrack.name[language]}
          </span>
          <ChevronUp size={16} style={{ color: 'var(--gold-royal)' }} />
        </motion.button>
      )}

    </div>
  );
};
