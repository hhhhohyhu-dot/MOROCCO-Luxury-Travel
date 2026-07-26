import React, { useState, useEffect } from 'react';
import { type Language } from '../data/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Helicopter, Car, ShieldCheck } from 'lucide-react';

interface ArchitectProps {
  language: Language;
  currency: string;
  onBookCustomRoute: (route: CityNode[], transport: TransportOption) => void;
}

interface CityNode {
  id: string;
  name: { en: string; fr: string; ar: string };
  x: number;
  y: number;
}

interface TransportOption {
  id: string;
  name: { en: string; fr: string; ar: string };
  multiplier: number;
  icon: any;
}

const CITIES: CityNode[] = [
  { id: 'tng', name: { en: "Tangier", fr: "Tanger", ar: "طنجة" }, x: 400, y: 80 },
  { id: 'chf', name: { en: "Chefchaouen", fr: "Chefchaouen", ar: "شفشاون" }, x: 460, y: 120 },
  { id: 'rba', name: { en: "Rabat", fr: "Rabat", ar: "الرباط" }, x: 350, y: 220 },
  { id: 'cmn', name: { en: "Casablanca", fr: "Casablanca", ar: "الدار البيضاء" }, x: 310, y: 280 },
  { id: 'mek', name: { en: "Meknes", fr: "Meknès", ar: "مكناس" }, x: 450, y: 250 },
  { id: 'fes', name: { en: "Fes", fr: "Fès", ar: "فاس" }, x: 500, y: 230 },
  { id: 'rak', name: { en: "Marrakech", fr: "Marrakech", ar: "مراكش" }, x: 330, y: 450 },
  { id: 'esu', name: { en: "Essaouira", fr: "Essaouira", ar: "الصويرة" }, x: 230, y: 470 },
  { id: 'aga', name: { en: "Agadir", fr: "Agadir", ar: "أكادير" }, x: 250, y: 580 },
  { id: 'our', name: { en: "Ouarzazate", fr: "Ouarzazate", ar: "ورزازات" }, x: 440, y: 480 },
  { id: 'mer', name: { en: "Merzouga", fr: "Merzouga", ar: "مرزوقة" }, x: 620, y: 430 }
];

const TRANSPORTS: TransportOption[] = [
  { id: 'vclass', name: { en: "Mercedes V-Class Chauffeur", fr: "Chauffeur Mercedes Classe V", ar: "سائق مرسيدس فئة V" }, multiplier: 2.5, icon: Car },
  { id: 'heli', name: { en: "Private Helicopter VIP", fr: "Hélicoptère Privé VIP", ar: "هليكوبتر خاصة VIP" }, multiplier: 15, icon: Helicopter }
];

export const RoyalItineraryArchitect: React.FC<ArchitectProps> = ({ language, onBookCustomRoute }) => {
  const [route, setRoute] = useState<CityNode[]>([CITIES[3], CITIES[6]]); // Default: Casa -> Marrakech
  const [transport, setTransport] = useState<TransportOption>(TRANSPORTS[0]);
  const [distance, setDistance] = useState(0);

  const isRTL = language === 'ar';

  // Calculate rough distance based on coordinate math (1 SVG unit approx = 1.2 km)
  useEffect(() => {
    let dist = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const dx = route[i + 1].x - route[i].x;
      const dy = route[i + 1].y - route[i].y;
      dist += Math.sqrt(dx * dx + dy * dy) * 1.2;
    }
    setDistance(Math.round(dist));
  }, [route]);

  const addCity = (cityId: string) => {
    const city = CITIES.find(c => c.id === cityId);
    if (city && !route.find(c => c.id === cityId)) {
      setRoute([...route, city]);
    }
  };

  const removeCity = (index: number) => {
    const newRoute = [...route];
    newRoute.splice(index, 1);
    setRoute(newRoute);
  };

  const getEstimatedPrice = () => {
    // Base cost $500 per stop + distance * transport multiplier
    const base = route.length * 500;
    const travelCost = distance * transport.multiplier;
    return base + travelCost;
  };

  const availableCities = CITIES.filter(c => !route.find(rc => rc.id === c.id));

  return (
    <section id="itinerary-architect" className="section-padding" style={{ backgroundColor: '#030806', position: 'relative' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ color: 'var(--gold-royal)', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>
          {language === 'ar' ? 'تصميم الرحلات الملكية' : language === 'fr' ? 'Concepteur d\'Itinéraire Royal' : 'The Royal Itinerary Architect'}
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#FFFFFF', lineHeight: '1.2' }}>
          {language === 'ar' ? 'ارسم مسار رحلتك الخاصة' : language === 'fr' ? 'Dessinez Votre Voyage Sur Mesure' : 'Design Your Bespoke Journey'}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '24px auto 0', width: '200px' }}>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, var(--gold-royal))' }} />
          <span style={{ color: 'var(--gold-royal)', fontSize: '0.75rem' }}>✦</span>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, var(--gold-royal))' }} />
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px'
      }} className="architect-grid">

        {/* Left Side: Interactive SVG Map */}
        <div style={{
          backgroundColor: 'rgba(5, 14, 10, 0.8)',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 60px rgba(11, 58, 36, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '600px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Topographic Map Lines Overlay (Aesthetic) */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" stitchTiles="stitch"/></filter>
              <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5"/>
            </svg>
          </div>

          <svg viewBox="0 0 800 800" style={{ width: '100%', height: '100%', maxWidth: '600px', position: 'relative', zIndex: 2 }}>
            
            {/* Draw Path between route nodes */}
            {route.length > 1 && (
              <path
                className="route-line"
                d={`M ${route.map(c => `${c.x},${c.y}`).join(' L ')}`}
                fill="none"
                stroke="var(--gold-royal)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(197, 160, 89, 0.6))'
                }}
              />
            )}

            {/* Draw All Background Cities */}
            {CITIES.map(city => (
              <circle
                key={`bg-${city.id}`}
                cx={city.x}
                cy={city.y}
                r="4"
                fill="rgba(255,255,255,0.1)"
              />
            ))}

            {/* Draw Active Route Nodes */}
            <AnimatePresence>
              {route.map((city, idx) => (
                <motion.g
                  key={city.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  {/* Pulse effect for start/end nodes */}
                  {(idx === 0 || idx === route.length - 1) && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="12"
                      fill="none"
                      stroke="var(--gold-royal)"
                      strokeWidth="2"
                      className="map-node-pulse"
                    />
                  )}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="6"
                    fill="var(--gold-royal)"
                    style={{ filter: 'drop-shadow(0 0 10px var(--gold-glow))' }}
                  />
                  <text
                    x={city.x + (isRTL ? -15 : 15)}
                    y={city.y + 4}
                    fill="#FFFFFF"
                    fontSize="14"
                    fontWeight="600"
                    fontFamily="var(--font-sans)"
                    textAnchor={isRTL ? "end" : "start"}
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }}
                  >
                    {city.name[language]}
                  </text>
                  
                  {/* Order Number Badge */}
                  <circle cx={city.x - (isRTL ? -12 : 12)} cy={city.y - 12} r="8" fill="var(--emerald-deep)" />
                  <text x={city.x - (isRTL ? -12 : 12)} y={city.y - 8} fill="#FFF" fontSize="10" textAnchor="middle" fontWeight="bold">
                    {idx + 1}
                  </text>
                </motion.g>
              ))}
            </AnimatePresence>
          </svg>
        </div>

        {/* Right Side: Itinerary Builder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Builder Panel */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius-md)',
            padding: '30px',
            textAlign: isRTL ? 'right' : 'left'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: '#FFF', marginBottom: '20px' }}>
              {language === 'ar' ? 'مسار الرحلة' : language === 'fr' ? 'Itinéraire de Voyage' : 'Journey Path'}
            </h3>

            {/* Selected Cities Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <AnimatePresence>
                {route.map((city, idx) => (
                  <motion.div
                    key={city.id}
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'rgba(197, 160, 89, 0.1)',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--gold-royal)', color: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {idx + 1}
                      </div>
                      <span style={{ fontSize: '1.05rem', color: '#FFF', fontWeight: '500' }}>{city.name[language]}</span>
                    </div>
                    
                    <button
                      onClick={() => removeCity(idx)}
                      disabled={route.length <= 1}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: route.length <= 1 ? 'rgba(255,255,255,0.2)' : '#EF4444',
                        cursor: route.length <= 1 ? 'not-allowed' : 'pointer',
                        padding: '4px'
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add City Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                {language === 'ar' ? 'إضافة وجهة' : language === 'fr' ? 'Ajouter une destination' : 'Add Destination'}
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
                {availableCities.map(city => (
                  <button
                    key={city.id}
                    onClick={() => addCity(city.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.8)',
                      padding: '8px 14px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#FFF'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                  >
                    <Plus size={14} />
                    {city.name[language]}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Transport & Stats Panel */}
          <div style={{
            backgroundColor: 'rgba(11, 58, 36, 0.4)',
            border: '1px solid var(--emerald-light)',
            borderRadius: 'var(--radius-md)',
            padding: '30px',
            textAlign: isRTL ? 'right' : 'left'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--gold-royal)', marginBottom: '20px' }}>
              {language === 'ar' ? 'الخدمات اللوجستية الفاخرة' : language === 'fr' ? 'Logistique de Luxe' : 'Luxury VIP Logistics'}
            </h3>

            {/* Transport Options */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {TRANSPORTS.map(opt => {
                const Icon = opt.icon;
                const isSelected = transport.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setTransport(opt)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      backgroundColor: isSelected ? 'rgba(197, 160, 89, 0.2)' : 'rgba(0,0,0,0.3)',
                      border: isSelected ? '1px solid var(--gold-royal)' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: isSelected ? '#FFF' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    <Icon size={28} style={{ color: isSelected ? 'var(--gold-royal)' : 'inherit' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: '500', textAlign: 'center' }}>{opt.name[language]}</span>
                  </button>
                );
              })}
            </div>

            {/* Stats Summary */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  {language === 'ar' ? 'المسافة الإجمالية' : language === 'fr' ? 'Distance Totale' : 'Total Distance'}
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#FFF', fontFamily: 'monospace' }}>
                  {distance} <span style={{ fontSize: '0.9rem', color: 'var(--gold-royal)' }}>KM</span>
                </div>
              </div>
              
              <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  {language === 'ar' ? 'التكلفة التقديرية' : language === 'fr' ? 'Coût Estimé' : 'Est. Investment'}
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#FFF', fontFamily: 'monospace' }}>
                  $ {getEstimatedPrice().toLocaleString()}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onBookCustomRoute(route, transport)}
              disabled={route.length < 2}
              style={{
                width: '100%',
                marginTop: '24px',
                padding: '16px',
                backgroundColor: route.length >= 2 ? 'var(--gold-royal)' : 'rgba(255,255,255,0.1)',
                color: route.length >= 2 ? '#000' : 'rgba(255,255,255,0.3)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: route.length >= 2 ? 'pointer' : 'not-allowed',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s',
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}
              className={route.length >= 2 ? 'btn-gold' : ''}
            >
              <ShieldCheck size={18} />
              {language === 'ar' ? 'طلب الحجز الملكي' : language === 'fr' ? 'Demander la Réservation Royale' : 'Request Royal Booking'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
              {language === 'ar' ? 'مستشار السفر الخاص بك سيتواصل معك لتأكيد المسار' : language === 'fr' ? 'Votre concierge vous contactera pour confirmer.' : 'Your private concierge will contact you to confirm details.'}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .architect-grid {
            grid-template-columns: 1.2fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
