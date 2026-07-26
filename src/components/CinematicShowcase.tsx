import React, { useRef, useState, useEffect } from 'react';
import { type Language } from '../data/translations';
import { packagesData } from '../data/packagesData';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CinematicShowcaseProps {
  language: Language;
  currency: string;
  onBook: (item: any) => void;
}

// ─── Scene Data ─────────────────────────────────────────────────────────────
const SCENES_DATA = [
  {
    id: 'sahara',
    packageId: 'sahara-expedition',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Merzouga%2C_Morocco.jpg/1280px-Merzouga%2C_Morocco.jpg',
    number: '01',
    category: { en: 'The Desert Odyssey', fr: "L'Odyssée du Désert", ar: 'أوديسا الصحراء' },
    headline: { en: 'Sleep Under a Million Stars', fr: "Dormir Sous Un Million d'Étoiles", ar: 'النوم تحت مليون نجم' },
    stat: { value: '3', unit: { en: 'Nights in the Dunes', fr: 'Nuits dans les Dunes', ar: 'ليالٍ في الكثبان' } },
    desc: {
      en: 'Camel treks to your private luxury glamping tent. The Sahara\'s golden silence wraps you like a royal robe.',
      fr: "Trek à dromadaire jusqu'à votre tente glamping privée. Le silence doré du Sahara vous enveloppe comme un manteau royal.",
      ar: 'رحلة بالجمال إلى خيمتك الفاخرة الخاصة. صمت الصحراء الذهبي يلفك كعباءة ملكية.'
    },
    gradientFrom: 'rgba(18, 8, 2, 0.92)',
    gradientTo: 'rgba(18, 8, 2, 0.2)'
  },
  {
    id: 'marrakech',
    packageId: 'royal-sanctuary',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Bahia_Palace_large_court.jpg/1280px-Bahia_Palace_large_court.jpg',
    number: '02',
    category: { en: 'Imperial Grandeur', fr: 'Grandeur Impériale', ar: 'الرونق الإمبراطوري' },
    headline: { en: 'Rule Like Ancient Kings', fr: 'Régner Comme les Rois Anciens', ar: 'عش حياة الملوك القدماء' },
    stat: { value: '7', unit: { en: 'Centuries of Splendour', fr: "Siècles de Splendeur", ar: 'قرون من الأبهة' } },
    desc: {
      en: 'Walk through the same gardens where dynasties once held court. Your private riad is surrounded by a thousand roses.',
      fr: 'Parcourez les mêmes jardins où les dynasties tenaient cour. Votre riad privé est entouré de mille roses.',
      ar: 'تجول في نفس الحدائق التي كانت مسرحاً للسلالات الملكية. رياضك الخاص محاط بألف وردة.'
    },
    gradientFrom: 'rgba(2, 10, 5, 0.92)',
    gradientTo: 'rgba(2, 10, 5, 0.15)'
  },
  {
    id: 'chefchaouen',
    packageId: 'northern-coast',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Hassan_II_mosque%2C_Casablanca_2.jpg/1280px-Hassan_II_mosque%2C_Casablanca_2.jpg',
    number: '03',
    category: { en: 'Sacred Architecture', fr: 'Architecture Sacrée', ar: 'العمارة المقدسة' },
    headline: { en: 'Where Heaven Meets Earth', fr: 'Là Où le Ciel Rencontre la Terre', ar: 'حيث يلتقي السماء بالأرض' },
    stat: { value: '210', unit: { en: 'Metres of Minaret', fr: 'Mètres de Minaret', ar: 'متراً من المئذنة' } },
    desc: {
      en: 'Hassan II Mosque rises over the Atlantic Ocean. Inside, 25,000 worshippers gather beneath a retractable roof open to the sky.',
      fr: 'La Mosquée Hassan II s\'élève au-dessus de l\'Atlantique. Un toit amovible s\'ouvre vers le ciel.',
      ar: 'مسجد الحسن الثاني يرتفع فوق المحيط الأطلسي. سقف قابل للطي يفتح على السماء.'
    },
    gradientFrom: 'rgba(2, 5, 15, 0.9)',
    gradientTo: 'rgba(2, 5, 15, 0.15)'
  },
  {
    id: 'atlas',
    packageId: 'imperial-odyssey',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Merzouga%2C_Morocco.jpg/1280px-Merzouga%2C_Morocco.jpg',
    number: '04',
    category: { en: "The Atlas Ascent", fr: "L'Ascension de l'Atlas", ar: 'صعود الأطلس' },
    headline: { en: 'Touch the African Sky', fr: 'Toucher le Ciel Africain', ar: 'الامتداد نحو سماء أفريقيا' },
    stat: { value: '4,167', unit: { en: 'Metres Above Sea Level', fr: "Mètres d'Altitude", ar: 'متراً فوق البحر' } },
    desc: {
      en: "Summit Jebel Toubkal with your private mountain guide. The entire Kingdom of Morocco stretches beneath your feet.",
      fr: "Gravissez le Jebel Toubkal avec votre guide privé. Tout le Maroc s'étend sous vos pieds.",
      ar: 'تسلق جبل توبقال مع مرشدك الخاص. كل المغرب يمتد تحت قدميك في مشهد لا ينسى.'
    },
    gradientFrom: 'rgba(3, 8, 18, 0.9)',
    gradientTo: 'rgba(3, 8, 18, 0.15)'
  },
  {
    id: 'fes',
    packageId: 'imperial-odyssey',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Bahia_Palace_large_court.jpg/1280px-Bahia_Palace_large_court.jpg',
    number: '05',
    category: { en: 'The Living Museum', fr: 'Le Musée Vivant', ar: 'المتحف الحي' },
    headline: { en: 'Walk Into the 12th Century', fr: 'Entrer dans le XIIe Siècle', ar: 'الخوض في القرن الثاني عشر' },
    stat: { value: '9,400', unit: { en: 'Lanes in the Medina', fr: 'Ruelles dans la Médina', ar: 'زقاق في المدينة القديمة' } },
    desc: {
      en: "The world's oldest university. Leather tanneries unchanged for 1,000 years. Private access to places no tourist has ever seen.",
      fr: "La plus ancienne université du monde. Des tanneries inchangées depuis 1000 ans. Accès à des lieux hors des sentiers battus.",
      ar: 'أقدم جامعة في العالم. مدابغ لم تتغير منذ ألف عام. وصول خاص لأماكن لم تطأها أقدام السياح.'
    },
    gradientFrom: 'rgba(10, 5, 2, 0.92)',
    gradientTo: 'rgba(10, 5, 2, 0.15)'
  }
];

// ─── Single Scene Component (Respects React Hook Rules) ───────────────────────
interface SceneProps {
  scene: typeof SCENES_DATA[0];
  scrollYProgress: any;
  sceneIndex: number;
  totalScenes: number;
  language: Language;
  isRTL: boolean;
  isActive: boolean;
  onBook: (item: any) => void;
}

const CinematicScene: React.FC<SceneProps> = ({
  scene, scrollYProgress, sceneIndex, totalScenes, language, isRTL, isActive, onBook
}) => {
  const sceneSize = 1 / totalScenes;
  const start = sceneIndex * sceneSize;
  const end = start + sceneSize;
  const buffer = sceneSize * 0.12;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + buffer, end - buffer, end],
    [0, 1, 1, 0]
  );
  const bgScale = useTransform(scrollYProgress, [start, end], [1.0, 1.1]);
  const textY = useTransform(scrollYProgress, [start, end], ['20px', '-20px']);

  const pkg = packagesData.find(p => p.id === scene.packageId) || packagesData[0];

  return (
    <motion.div
      style={{
        opacity,
        position: 'absolute',
        inset: 0,
        pointerEvents: isActive ? 'auto' : 'none'
      }}
    >
      {/* Ken Burns parallax background */}
      <motion.div
        style={{
          scale: bgScale,
          position: 'absolute',
          top: '-6%',
          left: '-6%',
          right: '-6%',
          bottom: '-6%',
          backgroundImage: `url(${scene.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Cinematic gradient vignette — stronger on content side */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isRTL
            ? `linear-gradient(to left, ${scene.gradientFrom} 0%, ${scene.gradientFrom} 40%, ${scene.gradientTo} 100%)`
            : `linear-gradient(to right, ${scene.gradientFrom} 0%, ${scene.gradientFrom} 40%, ${scene.gradientTo} 100%)`
        }}
      />
      {/* Bottom vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)'
      }} />

      {/* ── Scene Content ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '0 8%'
      }}>
        <motion.div
          style={{ y: textY, maxWidth: '640px', textAlign: isRTL ? 'right' : 'left' }}
        >
          {/* Category Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            <div style={{ width: '36px', height: '1px', backgroundColor: 'var(--gold-royal)' }} />
            <span style={{
              color: 'var(--gold-royal)',
              textTransform: 'uppercase',
              fontSize: '0.78rem',
              letterSpacing: '0.25em',
              fontWeight: '600',
              fontFamily: 'var(--font-sans)'
            }}>
              {scene.category[language]}
            </span>
          </div>

          {/* Large Headline */}
          <h2 style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 5.5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-serif)',
            lineHeight: 1.03,
            marginBottom: '28px',
            textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            fontWeight: '700'
          }}>
            {scene.headline[language]}
          </h2>

          {/* Gold Stat */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '10px',
            marginBottom: '22px',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            <span style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
              fontWeight: '800',
              color: 'var(--gold-royal)',
              fontFamily: 'monospace',
              letterSpacing: '-0.02em',
              textShadow: '0 0 30px var(--gold-glow)'
            }}>
              {scene.stat.value}
            </span>
            <span style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', fontWeight: '300' }}>
              {scene.stat.unit[language]}
            </span>
          </div>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: 'rgba(255,255,255,0.72)',
            lineHeight: '1.7',
            marginBottom: '44px',
            maxWidth: '520px',
            fontWeight: '300'
          }}>
            {scene.desc[language]}
          </p>

          {/* CTA Button */}
          <button
            onClick={() => onBook(pkg)}
            className="btn-gold"
            style={{
              padding: '16px 36px',
              fontSize: '0.88rem',
              letterSpacing: '0.08em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              flexDirection: isRTL ? 'row-reverse' : 'row'
            }}
          >
            {language === 'ar' ? 'احجز هذه التجربة' : language === 'fr' ? 'Réserver cette expérience' : 'Book This Experience'}
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>

      {/* Giant ghost scene number watermark */}
      <div style={{
        position: 'absolute',
        bottom: '-20px',
        right: isRTL ? 'auto' : '5%',
        left: isRTL ? '5%' : 'auto',
        fontSize: 'clamp(8rem, 18vw, 18rem)',
        fontWeight: '900',
        color: 'rgba(255,255,255,0.035)',
        lineHeight: 1,
        fontFamily: 'var(--font-serif)',
        userSelect: 'none',
        pointerEvents: 'none',
        letterSpacing: '-0.05em'
      }}>
        {scene.number}
      </div>
    </motion.div>
  );
};


// ─── Main Export ─────────────────────────────────────────────────────────────
export const CinematicShowcase: React.FC<CinematicShowcaseProps> = ({ language, onBook }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isRTL = language === 'ar';
  const [activeScene, setActiveScene] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // Track which scene is currently dominant
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v: number) => {
      const idx = Math.min(SCENES_DATA.length - 1, Math.floor(v * SCENES_DATA.length));
      setActiveScene(idx);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      id="cinematic-showcase"
      style={{ height: `${SCENES_DATA.length * 100}vh`, position: 'relative' }}
    >
      {/* ── Sticky Viewport Container ── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Dark base (avoids white flash between scenes) */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#030806' }} />

        {/* Render all scenes; opacity controlled by scroll */}
        {SCENES_DATA.map((scene, idx) => (
          <CinematicScene
            key={scene.id}
            scene={scene}
            scrollYProgress={scrollYProgress}
            sceneIndex={idx}
            totalScenes={SCENES_DATA.length}
            language={language}
            isRTL={isRTL}
            isActive={idx === activeScene}
            onBook={onBook}
          />
        ))}

        {/* ── Right-side vertical progress bar ── */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: isRTL ? 'auto' : '36px',
          left: isRTL ? '36px' : 'auto',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          zIndex: 20
        }}>
          {SCENES_DATA.map((scene, idx) => (
            <div key={scene.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <motion.div
                animate={{
                  height: idx === activeScene ? '32px' : '6px',
                  backgroundColor: idx === activeScene ? 'var(--gold-royal)' : 'rgba(255,255,255,0.25)',
                  boxShadow: idx === activeScene ? '0 0 10px var(--gold-glow)' : 'none'
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '3px', borderRadius: '2px' }}
              />
            </div>
          ))}
        </div>

        {/* ── Bottom bar: scene counter + label ── */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: isRTL ? 'auto' : '8%',
          right: isRTL ? '8%' : 'auto',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={activeScene}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              style={{
                color: 'var(--gold-royal)',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.08em'
              }}
            >
              {String(activeScene + 1).padStart(2, '0')} / {String(SCENES_DATA.length).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>

          <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

          <AnimatePresence mode="wait">
            <motion.span
              key={activeScene + '-label'}
              initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
              transition={{ duration: 0.35 }}
              style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}
            >
              {SCENES_DATA[activeScene]?.category[language]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ── Top-right: "scroll to explore" cue (only on first scene) ── */}
        <AnimatePresence>
          {activeScene === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                bottom: '36px',
                right: isRTL ? 'auto' : '8%',
                left: isRTL ? '8%' : 'auto',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: isRTL ? 'flex-start' : 'flex-end',
                gap: '6px'
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                {language === 'ar' ? 'مرر للاستكشاف' : language === 'fr' ? 'Défiler pour explorer' : 'Scroll to Explore'}
              </span>
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '1px', height: '40px', backgroundColor: 'var(--gold-royal)', alignSelf: 'center', boxShadow: '0 0 6px var(--gold-glow)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Top header bar ── */}
        <div style={{
          position: 'absolute',
          top: '80px',
          left: isRTL ? 'auto' : '8%',
          right: isRTL ? '8%' : 'auto',
          zIndex: 20
        }}>
          <span style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em'
          }}>
            {language === 'ar' ? 'مكناس — تجارب حصرية' : language === 'fr' ? 'Meknes Luxury Travel — Expériences Exclusives' : 'Meknes Luxury Travel — Exclusive Experiences'}
          </span>
        </div>

      </div>
    </section>
  );
};
