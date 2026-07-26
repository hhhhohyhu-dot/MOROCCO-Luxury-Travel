import React, { useState, useEffect } from 'react';
import { translations, type Language } from '../data/translations';
import { Sparkles, Calendar, Hotel, Car, CheckSquare, Square, Download } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface CustomPackageBuilderProps {
  language: Language;
  currency: string;
  onBookCustom: (customConfig: any) => void;
}

// Exchange rates (USD base)
const EXCHANGE_RATES: { [key: string]: number } = {
  USD: 1.0,
  EUR: 0.92,
  MAD: 10.0,
  GBP: 0.77
};

const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  MAD: "د.م.",
  GBP: "£"
};

const lodgings = [
  { id: 'riad', name: { en: "Historic Boutique Riad", fr: "Riad Historique de Charme", ar: "رياض تاريخي دافئ" }, price: 180 },
  { id: 'resort', name: { en: "5-Star Luxury Resort", fr: "Resort 5 Étoiles Luxe", ar: "منتجع فاخر 5 نجوم" }, price: 350 },
  { id: 'buyout', name: { en: "Private Palace Buyout", fr: "Privatisation Complète Palais", ar: "حجز القصر الملكي بالكامل" }, price: 800 }
];

const transports = [
  { id: 'sedan', name: { en: "Private Sedan Chauffeur", fr: "Berline Privée avec Chauffeur", ar: "سيارة سيدان مع سائق خاص" }, price: 80 },
  { id: 'minivan', name: { en: "Mercedes V-Class Minivan", fr: "Mercedes Classe V Chauffeur", ar: "مرسيدس الفئة V مع سائق" }, price: 150 },
  { id: 'armored', name: { en: "Armored Luxury SUV Chauffeur", fr: "SUV de Luxe Blindé avec Chauffeur", ar: "سيارة دفع رباعي مصفحة فاخرة" }, price: 400 }
];

const experiences = [
  { id: 'volubilis-tour', name: { en: "Private Volubilis Archeologist Walk", fr: "Volubilis avec un Archéologue", ar: "جولة أثري خاص في وليلي" }, price: 120 },
  { id: 'roslane-tasting', name: { en: "Chateau Roslane Sommelier Lunch", fr: "Déjeuner & Dégustation Roslane", ar: "غداء وتذوق في شاتو روزلان" }, price: 250 },
  { id: 'sufi-evening', name: { en: "Private Sufi Mysticism Music Circle", fr: "Veillée Privée de Chants Soufis", ar: "حلقة إنشاد صوفي روحي خاصة" }, price: 180 },
  { id: 'cooking-class', name: { en: "Palace Tagine Cooking Masterclass", fr: "Masterclass Cuisine Impériale", ar: "درس طهي الطاجين الملكي" }, price: 95 },
  { id: 'souk-tour', name: { en: "Guided Medina Artisans Walking Tour", fr: "Visite Guidée des Artisans de Médina", ar: "جولة مرشدة لحرفيي المدينة" }, price: 65 }
];

export const CustomPackageBuilder: React.FC<CustomPackageBuilderProps> = ({
  language,
  currency,
  onBookCustom
}) => {
  const t = translations[language];
  const [days, setDays] = useState(5);
  
  const [accommodation, setAccommodation] = useState<'riad' | 'resort' | 'buyout'>('riad');
  const [transport, setTransport] = useState<'sedan' | 'minivan' | 'armored'>('sedan');
  
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([
    'volubilis-tour',
    'souk-tour'
  ]);

  const [totalPriceUSD, setTotalPriceUSD] = useState(0);

  // Calculate pricing
  useEffect(() => {
    const selectedLodging = lodgings.find(l => l.id === accommodation)?.price || 0;
    const selectedTransport = transports.find(t => t.id === transport)?.price || 0;
    
    const experiencesCost = selectedExperiences.reduce((sum, expId) => {
      const exp = experiences.find(e => e.id === expId);
      return sum + (exp ? exp.price : 0);
    }, 0);

    const calculatedUSD = (selectedLodging * days) + (selectedTransport * days) + experiencesCost;
    setTotalPriceUSD(calculatedUSD);
  }, [days, accommodation, transport, selectedExperiences]);

  // Animated Counter Logic
  const count = useMotionValue(0);
  const rate = EXCHANGE_RATES[currency] || 1.0;
  const rounded = useTransform(count, (latest) => {
    const converted = latest * rate;
    return `${CURRENCY_SYMBOLS[currency]} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  });

  useEffect(() => {
    const controls = animate(count, totalPriceUSD, { duration: 0.8, ease: "easeOut" });
    return controls.stop;
  }, [totalPriceUSD, currency, count]);

  const toggleExperience = (expId: string) => {
    setSelectedExperiences((prev) =>
      prev.includes(expId)
        ? prev.filter((id) => id !== expId)
        : [...prev, expId]
    );
  };

  const convertPrice = (usdAmount: number) => {
    const rate = EXCHANGE_RATES[currency] || 1.0;
    const converted = usdAmount * rate;
    return `${CURRENCY_SYMBOLS[currency]} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const handleBookClick = () => {
    const activeLodging = lodgings.find(l => l.id === accommodation);
    const activeTransport = transports.find(t => t.id === transport);
    const activeExps = experiences.filter(e => selectedExperiences.includes(e.id));

    const config = {
      id: "custom-itinerary",
      name: {
        en: `Bespoke ${days}-Day Custom Itinerary`,
        fr: `Itinéraire Sur Mesure de ${days} Jours`,
        ar: `رحلة مخصصة لـ ${days} أيام`
      },
      durationDays: days,
      priceUSD: totalPriceUSD,
      accommodationName: activeLodging?.name[language],
      transportationName: activeTransport?.name[language],
      experiencesList: activeExps.map(e => e.name[language])
    };

    onBookCustom(config);
  };

  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        padding: '40px 6%',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px'
      }}
      className="custom-builder-grid"
    >
      {/* Settings Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Slider input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{t.durationDays}</span>
            <span style={{ color: 'var(--gold-royal)', fontWeight: '600', fontFamily: 'monospace' }}>{days} Days</span>
          </label>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Calendar size={18} style={{ color: 'var(--gold-royal)' }} />
            <input
              type="range"
              min="2"
              max="14"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--gold-royal)',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>

        {/* Accommodation select input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="form-label">{t.accommodation}</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }} className="selector-grid">
            {lodgings.map((lodg) => (
              <button
                key={lodg.id}
                type="button"
                onClick={() => setAccommodation(lodg.id as any)}
                style={{
                  padding: '16px',
                  border: '1px solid',
                  borderColor: accommodation === lodg.id ? 'var(--gold-royal)' : 'var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: accommodation === lodg.id ? 'var(--bg-primary)' : 'transparent',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Hotel size={18} style={{ color: accommodation === lodg.id ? 'var(--gold-royal)' : 'var(--text-secondary)' }} />
                  <span style={{ fontWeight: accommodation === lodg.id ? '600' : '400' }}>{lodg.name[language]}</span>
                </div>
                <span style={{ color: 'var(--gold-royal)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  {convertPrice(lodg.price)}/day
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Transport select input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="form-label">{t.transport}</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }} className="selector-grid">
            {transports.map((trans) => (
              <button
                key={trans.id}
                type="button"
                onClick={() => setTransport(trans.id as any)}
                style={{
                  padding: '16px',
                  border: '1px solid',
                  borderColor: transport === trans.id ? 'var(--gold-royal)' : 'var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: transport === trans.id ? 'var(--bg-primary)' : 'transparent',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Car size={18} style={{ color: transport === trans.id ? 'var(--gold-royal)' : 'var(--text-secondary)' }} />
                  <span style={{ fontWeight: transport === trans.id ? '600' : '400' }}>{trans.name[language]}</span>
                </div>
                <span style={{ color: 'var(--gold-royal)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  {convertPrice(trans.price)}/day
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column: Experience Checkbox options & Live Calculator Quote Card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {/* Curated experiences multiselect */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label className="form-label">{t.activities}</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {experiences.map((exp) => {
              const selected = selectedExperiences.includes(exp.id);
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => toggleExperience(exp.id)}
                  style={{
                    padding: '14px 18px',
                    border: '1px solid',
                    borderColor: selected ? 'var(--gold-royal)' : 'var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: selected ? 'var(--bg-primary)' : 'transparent',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {selected ? (
                      <CheckSquare size={18} style={{ color: 'var(--gold-royal)' }} />
                    ) : (
                      <Square size={18} style={{ color: 'var(--text-secondary)' }} />
                    )}
                    <span style={{ fontSize: '0.9rem', fontWeight: selected ? '500' : '400' }}>
                      {exp.name[language]}
                    </span>
                  </div>
                  <span style={{ color: 'var(--gold-royal)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                    +{convertPrice(exp.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live dynamic invoice summary card */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          <div>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              color: 'var(--gold-royal)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '16px'
            }}>
              <Sparkles size={14} />
              {t.customBuilderTitle}
            </span>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.durationDays} ({days} days)</span>
              <span style={{ fontWeight: '500' }}>
                {accommodation === 'riad' ? 'Boutique Riad' : accommodation === 'resort' ? '5-Star Resort' : 'Palace Buyout'}
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Transport</span>
              <span style={{ fontWeight: '500' }}>
                {transport === 'sedan' ? 'Chauffeur Sedan' : transport === 'minivan' ? 'Mercedes V-Class' : 'Armored SUV'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.activities}</span>
              <span style={{ fontWeight: '500' }}>{selectedExperiences.length} Selected</span>
            </div>
          </div>

          <div style={{ borderTop: '2px solid var(--gold-royal)', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>{t.estTotal}</span>
              <div style={{ textAlign: 'right' }}>
                <motion.span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                  {rounded}
                </motion.span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t.perPerson}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleBookClick}
                className="btn-gold"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '16px'
                }}
              >
                Book Custom Journey
              </button>
              <button
                onClick={() => alert("Your luxury bespoke itinerary has been downloaded as a PDF.")}
                className="btn-outline"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Download size={16} /> Download Quote PDF
              </button>
            </div>
          </div>
        </div>

      </div>
      
      <style>{`
        @media(min-width: 1024px) {
          .custom-builder-grid {
            grid-template-columns: 1.1fr 1fr !important;
            gap: 60px !important;
          }
        }
        @media(min-width: 640px) {
          .selector-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  );
};
