import React, { useState } from 'react';
import { packagesData, type Package } from '../data/packagesData';
import { translations, type Language } from '../data/translations';
import { CustomPackageBuilder } from './CustomPackageBuilder';
import { Heart, Calendar, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PackagesProps {
  language: Language;
  currency: string;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onBook: (item: any) => void;
}

// Rates for calculations
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

export const Packages: React.FC<PackagesProps> = ({
  language,
  currency,
  favorites,
  toggleFavorite,
  onBook
}) => {
  const t = translations[language];
  const [activeItineraryPackage, setActiveItineraryPackage] = useState<Package | null>(null);
  const [sortBy, setSortBy] = useState<string>('recommended');

  const convertPrice = (usdAmount: number) => {
    const rate = EXCHANGE_RATES[currency] || 1.0;
    const converted = usdAmount * rate;
    return `${CURRENCY_SYMBOLS[currency]} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <section id="packages" className="section-padding" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span style={{
          color: 'var(--gold-royal)',
          textTransform: 'uppercase',
          fontSize: '0.85rem',
          fontWeight: '600',
          letterSpacing: '0.2em',
          display: 'block',
          marginBottom: '12px'
        }}>
          {t.packagesTitle}
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: 'var(--text-primary)',
          lineHeight: '1.2'
        }}>
          {t.packagesSubtitle}
        </h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          margin: '24px auto 0',
          width: '200px'
        }}>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, var(--gold-royal))' }} />
          <span style={{ color: 'var(--gold-royal)', fontSize: '0.75rem' }}>✦</span>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, var(--gold-royal))' }} />
        </div>
      </div>

      {/* Sorting Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px', paddingRight: '8%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--bg-secondary)', padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sort By:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              fontWeight: '500',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="duration-short">Duration: Short to Long</option>
            <option value="duration-long">Duration: Long to Short</option>
          </select>
        </div>
      </div>

      {/* Grid of Packages */}
      <motion.div 
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px',
          marginBottom: '80px',
          padding: '0 8%'
        }}
      >
        <AnimatePresence>
          {[...packagesData].sort((a, b) => {
            if (sortBy === 'price-low') return a.priceUSD - b.priceUSD;
            if (sortBy === 'price-high') return b.priceUSD - a.priceUSD;
            if (sortBy === 'duration-short') return a.durationDays - b.durationDays;
            if (sortBy === 'duration-long') return b.durationDays - a.durationDays;
            return 0;
          }).map((pkg, index) => {
            const isLiked = favorites.includes(pkg.id);
            return (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={pkg.id}
                className="glass-card"
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                {/* Image Banner */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={pkg.image}
                  alt={pkg.name[language]}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s ease'
                  }}
                  className="package-card-image"
                />

                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)'
                }} />

                {/* Favorite Heart toggle */}
                <button
                  onClick={() => toggleFavorite(pkg.id)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(5, 14, 10, 0.4)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: isLiked ? 'var(--gold-royal)' : '#FFFFFF',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <Heart size={18} fill={isLiked ? 'var(--gold-royal)' : 'none'} />
                </button>

                {/* Duration Label */}
                <span style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'var(--emerald-deep)',
                  color: '#FAF7F0',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Calendar size={12} />
                  {pkg.durationDays} {pkg.durationDays > 1 ? 'Days' : 'Day'}
                </span>
              </div>

              {/* Text content area */}
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--text-primary)',
                    marginBottom: '8px'
                  }}>
                    {pkg.name[language]}
                  </h3>
                  <p style={{
                    color: 'var(--gold-royal)',
                    fontSize: '0.85rem',
                    fontStyle: 'italic',
                    marginBottom: '16px'
                  }}>
                    {pkg.tagline[language]}
                  </p>

                  <div style={{
                    borderTop: '1px solid var(--border-color)',
                    borderBottom: '1px solid var(--border-color)',
                    padding: '12px 0',
                    margin: '16px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <div>
                      <strong>Transport:</strong> {pkg.transportation[language]}
                    </div>
                    <div>
                      <strong>Dining:</strong> {pkg.meals[language]}
                    </div>
                  </div>

                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 24px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}>
                    {pkg.highlights[language].slice(0, 3).map((hl, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={14} style={{ color: 'var(--gold-royal)', flexShrink: 0 }} />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Pricing and Booking triggers */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '20px'
                  }}>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                      Total Price
                    </span>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                        {convertPrice(pkg.priceUSD)}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>per person</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      onClick={() => setActiveItineraryPackage(pkg)}
                      className="btn-outline"
                      style={{
                        padding: '10px',
                        fontSize: '0.8rem',
                        justifyContent: 'center'
                      }}
                    >
                      {t.itinerary}
                    </button>
                    <button
                      onClick={() => onBook(pkg)}
                      className="btn-gold"
                      style={{
                        padding: '10px',
                        fontSize: '0.8rem',
                        justifyContent: 'center'
                      }}
                    >
                      {t.bookNow}
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Bespoke Constructor Title Header */}
      <div style={{ textAlign: 'center', margin: '80px 0 40px 0' }}>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          fontFamily: 'var(--font-serif)',
          color: 'var(--text-primary)',
          marginBottom: '8px'
        }}>
          {t.customBuilderTitle}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
          {t.customBuilderSubtitle}
        </p>
      </div>

      {/* Embed Dynamic Custom Calculator */}
      <CustomPackageBuilder
        language={language}
        currency={currency}
        onBookCustom={onBook}
      />

      {/* Itinerary Timeline Lightbox Modal */}
      {activeItineraryPackage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(5, 14, 10, 0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 1100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              width: '100%',
              maxWidth: '750px',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              padding: '40px'
            }}
          >
            {/* Close */}
            <button
              onClick={() => setActiveItineraryPackage(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(5, 14, 10, 0.05)',
                border: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            {/* Header info */}
            <span style={{ fontSize: '0.8rem', color: 'var(--gold-royal)', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
              Full Travel Itinerary
            </span>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '32px' }}>
              {activeItineraryPackage.name[language]}
            </h2>

            {/* Timeline display */}
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {/* Timeline Center Line */}
              <div style={{
                position: 'absolute',
                top: '12px',
                bottom: '12px',
                left: '20px',
                width: '2px',
                backgroundColor: 'var(--border-color)',
                zIndex: 1
              }} />

              {activeItineraryPackage.itinerary.map((dayItem) => (
                <div
                  key={dayItem.day}
                  style={{
                    display: 'flex',
                    gap: '24px',
                    marginBottom: '32px',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {/* Day circle marker */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--emerald-deep)',
                    color: '#FAF7F0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-sm)',
                    border: '2px solid var(--bg-secondary)'
                  }}>
                    {dayItem.day}
                  </div>

                  {/* Day description box */}
                  <div style={{ padding: '4px 0' }}>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--text-primary)',
                      marginBottom: '8px'
                    }}>
                      {dayItem.title[language]}
                    </h4>
                    <p style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      lineHeight: '1.6'
                    }}>
                      {dayItem.description[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '24px',
              marginTop: '24px'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Estimated Price</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                  {convertPrice(activeItineraryPackage.priceUSD)}
                </span>
              </div>
              <button
                onClick={() => {
                  onBook(activeItineraryPackage);
                  setActiveItineraryPackage(null);
                }}
                className="btn-gold"
              >
                Secure Reservation
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .glass-card:hover .package-card-image {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
};
