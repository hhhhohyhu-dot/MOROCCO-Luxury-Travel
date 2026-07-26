import React, { useEffect, useRef, useState } from 'react';
import { type Language } from '../data/translations';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { TrendingUp, Globe2, Star, Clock, Award, Shield } from 'lucide-react';

interface LuxuryStatsProps {
  language: Language;
}

const statsContent = {
  en: {
    eyebrow: "In Numbers",
    title: "Crafted by Excellence",
    subtitle: "Decades of curating unforgettable Moroccan journeys for the world's most discerning travelers.",
    stats: [
      { value: 4800, suffix: "+", label: "Delighted Guests", desc: "VIP travelers served since 2004", icon: "star" },
      { value: 98, suffix: "%", label: "Satisfaction Rate", desc: "Based on verified reviews", icon: "shield" },
      { value: 32, suffix: "", label: "Imperial Destinations", desc: "Handpicked exclusive heritage sites", icon: "globe" },
      { value: 20, suffix: "+", label: "Years of Excellence", desc: "Pioneering Moroccan luxury travel", icon: "award" },
      { value: 14, suffix: "", label: "Languages Spoken", desc: "Our multilingual concierge team", icon: "clock" },
      { value: 3200, suffix: "+", label: "Custom Itineraries", desc: "Bespoke journeys designed to perfection", icon: "trending" },
    ],
    awards: [
      { title: "Best Moroccan Luxury Agency", year: "2025", body: "World Travel Awards" },
      { title: "Traveler's Choice Elite", year: "2025", body: "TripAdvisor" },
      { title: "Heritage Tourism Leader", year: "2024", body: "UNESCO Tourism Partner" }
    ],
    bars: [
      { label: "Guest Return Rate", value: 76 },
      { label: "5-Star Ratings", value: 94 },
      { label: "On-Time Concierge", value: 99 },
    ]
  },
  fr: {
    eyebrow: "En Chiffres",
    title: "Façonné par l'Excellence",
    subtitle: "Des décennies à créer des voyages marocains inoubliables pour les voyageurs les plus exigeants du monde.",
    stats: [
      { value: 4800, suffix: "+", label: "Clients Ravis", desc: "Voyageurs VIP servis depuis 2004", icon: "star" },
      { value: 98, suffix: "%", label: "Taux de Satisfaction", desc: "Basé sur des avis vérifiés", icon: "shield" },
      { value: 32, suffix: "", label: "Destinations Impériales", desc: "Sites patrimoniaux soigneusement sélectionnés", icon: "globe" },
      { value: 20, suffix: "+", label: "Années d'Excellence", desc: "Pionniers du tourisme de luxe au Maroc", icon: "award" },
      { value: 14, suffix: "", label: "Langues Parlées", desc: "Notre équipe conciergerie multilingue", icon: "clock" },
      { value: 3200, suffix: "+", label: "Itinéraires Sur Mesure", desc: "Voyages conçus à la perfection", icon: "trending" },
    ],
    awards: [
      { title: "Meilleure Agence de Luxe au Maroc", year: "2025", body: "World Travel Awards" },
      { title: "Choix des Voyageurs Élite", year: "2025", body: "TripAdvisor" },
      { title: "Leader du Tourisme Patrimonial", year: "2024", body: "Partenaire UNESCO" }
    ],
    bars: [
      { label: "Taux de Retour des Clients", value: 76 },
      { label: "Évaluations 5 Étoiles", value: 94 },
      { label: "Conciergerie à l'Heure", value: 99 },
    ]
  },
  ar: {
    eyebrow: "بالأرقام",
    title: "صُنع بالتميز",
    subtitle: "عقود من الإبداع في تصميم رحلات مغربية لا تُنسى لأكثر المسافرين تمييزاً في العالم.",
    stats: [
      { value: 4800, suffix: "+", label: "ضيف سعيد", desc: "مسافرون من فئة VIP منذ 2004", icon: "star" },
      { value: 98, suffix: "%", label: "نسبة الرضا", desc: "استناداً إلى تقييمات موثقة", icon: "shield" },
      { value: 32, suffix: "", label: "وجهة إمبراطورية", desc: "مواقع تراثية مختارة بعناية", icon: "globe" },
      { value: 20, suffix: "+", label: "عاماً من التميز", desc: "رواد في السياحة الفاخرة بالمغرب", icon: "award" },
      { value: 14, suffix: "", label: "لغة معتمدة", desc: "فريقنا متعدد اللغات في خدمتكم", icon: "clock" },
      { value: 3200, suffix: "+", label: "برنامج سفر مخصص", desc: "رحلات مصممة بإتقان شخصي", icon: "trending" },
    ],
    awards: [
      { title: "أفضل وكالة فاخرة في المغرب", year: "2025", body: "World Travel Awards" },
      { title: "اختيار المسافرين النخبة", year: "2025", body: "TripAdvisor" },
      { title: "ريادة السياحة التراثية", year: "2024", body: "شريك اليونسكو" }
    ],
    bars: [
      { label: "نسبة عودة الضيوف", value: 76 },
      { label: "تقييمات 5 نجوم", value: 94 },
      { label: "الالتزام بالمواعيد", value: 99 },
    ]
  }
};

const iconMap: Record<string, React.ReactNode> = {
  star: <Star size={22} />,
  shield: <Shield size={22} />,
  globe: <Globe2 size={22} />,
  award: <Award size={22} />,
  clock: <Clock size={22} />,
  trending: <TrendingUp size={22} />
};

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const count = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 2.2,
      ease: 'easeOut',
      onUpdate(latest) {
        setDisplayValue(Math.floor(latest).toLocaleString());
      }
    });
    return controls.stop;
  }, [inView, target, count]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

function AnimatedBar({ value, label, delay }: { value: number; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{label}</span>
        <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--gold-royal)', fontFamily: 'monospace' }}>{value}%</span>
      </div>
      <div style={{
        height: '6px',
        borderRadius: '3px',
        backgroundColor: 'var(--border-color)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={inView ? { width: `${value}%` } : { width: '0%' }}
          transition={{ duration: 1.8, delay, ease: 'easeOut' }}
          style={{
            height: '100%',
            borderRadius: '3px',
            background: 'linear-gradient(90deg, var(--gold-royal) 0%, #E8C87A 100%)',
            boxShadow: '0 0 10px var(--gold-glow)',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            right: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#E8C87A',
            boxShadow: '0 0 6px rgba(232, 200, 122, 0.8)'
          }} />
        </motion.div>
      </div>
    </div>
  );
}

export const LuxuryStats: React.FC<LuxuryStatsProps> = ({ language }) => {
  const content = statsContent[language] || statsContent.en;
  const sectionRef = useRef<HTMLElement>(null);
  const isRTL = language === 'ar';

  return (
    <section
      ref={sectionRef}
      className="luxury-stats-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)',
        padding: '120px 8%'
      }}
    >
      {/* Decorative SVG Morocco silhouette background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        opacity: 0.03
      }}>
        <svg viewBox="0 0 600 600" width="700" height="700" fill="currentColor" style={{ color: 'var(--gold-royal)', transform: 'translateX(100px)' }}>
          {/* Abstract decorative Islamic geometric pattern */}
          <polygon points="300,50 550,200 550,450 300,580 50,450 50,200" strokeWidth="2" stroke="currentColor" fill="none" />
          <polygon points="300,100 500,210 500,420 300,530 100,420 100,210" strokeWidth="1.5" stroke="currentColor" fill="none" />
          <circle cx="300" cy="300" r="120" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="300" y1="50" x2="300" y2="580" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="300" x2="550" y2="300" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="120" x2="500" y2="480" stroke="currentColor" strokeWidth="0.5" />
          <line x1="500" y1="120" x2="100" y2="480" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Scattered gold particle dots */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="stats-particle"
            style={{
              position: 'absolute',
              width: i % 3 === 0 ? '3px' : '2px',
              height: i % 3 === 0 ? '3px' : '2px',
              borderRadius: '50%',
              backgroundColor: 'var(--gold-royal)',
              top: `${5 + (i * 4.1) % 90}%`,
              left: `${3 + (i * 6.7) % 94}%`,
              opacity: 0.25 + (i % 4) * 0.1,
              animationDelay: `${i * 0.4}s`
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <span style={{
            color: 'var(--gold-royal)',
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '0.25em',
            display: 'block',
            marginBottom: '16px'
          }}>
            {content.eyebrow}
          </span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-serif)',
            marginBottom: '20px',
            lineHeight: '1.15'
          }}>
            {content.title}
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            {content.subtitle}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '24px', width: '200px', margin: '24px auto 0' }}>
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, var(--gold-royal))' }} />
            <span style={{ color: 'var(--gold-royal)', fontSize: '0.75rem' }}>✦</span>
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, var(--gold-royal))' }} />
          </div>
        </motion.div>

        {/* Main 3-col layout: stats grid + divider + bars & awards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '80px',
          alignItems: 'start'
        }} className="stats-main-grid">

          {/* Stats 2×3 grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '24px'
          }}>
            {content.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ translateY: -6, boxShadow: '0 20px 40px var(--gold-glow), var(--shadow-md)' }}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '32px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  textAlign: isRTL ? 'right' : 'left',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Gold corner accent */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  [isRTL ? 'right' : 'left']: 0,
                  width: '3px',
                  height: '100%',
                  background: 'linear-gradient(to bottom, var(--gold-royal) 0%, transparent 100%)'
                }} />

                {/* Icon */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(197, 160, 89, 0.1)',
                  border: '1px solid rgba(197, 160, 89, 0.2)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--gold-royal)',
                  marginBottom: '20px',
                  marginLeft: isRTL ? 'auto' : 0
                }}>
                  {iconMap[stat.icon]}
                </div>

                {/* Animated number */}
                <div style={{
                  fontSize: '2.8rem',
                  fontWeight: '700',
                  fontFamily: 'monospace',
                  color: 'var(--text-primary)',
                  lineHeight: '1',
                  marginBottom: '8px',
                  letterSpacing: '-0.02em'
                }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>

                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '6px',
                  fontFamily: 'var(--font-serif)'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4'
                }}>
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right column: Progress Bars + Awards */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '48px'
            }}
            className="stats-right-col"
          >
            {/* Progress bars */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '40px'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-primary)',
                marginBottom: '32px',
                textAlign: isRTL ? 'right' : 'left'
              }}>
                {language === 'ar' ? 'مؤشرات الأداء' : language === 'fr' ? 'Indicateurs de Performance' : 'Performance Indicators'}
              </h3>
              {content.bars.map((bar, i) => (
                <AnimatedBar key={i} value={bar.value} label={bar.label} delay={i * 0.2} />
              ))}
            </div>

            {/* Awards & recognition */}
            <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-primary)',
                marginBottom: '24px'
              }}>
                {language === 'ar' ? 'جوائز وتكريمات' : language === 'fr' ? 'Prix & Reconnaissances' : 'Awards & Recognition'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {content.awards.map((award, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px 20px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}
                  >
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--gold-royal) 0%, #A58039 100%)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px var(--gold-glow)'
                    }}>
                      <Award size={18} style={{ color: '#FFFFFF' }} />
                    </div>
                    <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>
                        {award.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {award.body} · {award.year}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .stats-particle {
          animation: statsParticlePulse 4s ease-in-out infinite;
        }
        @keyframes statsParticlePulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        @media (min-width: 1024px) {
          .stats-main-grid {
            grid-template-columns: 3fr 2fr !important;
          }
          .stats-right-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
