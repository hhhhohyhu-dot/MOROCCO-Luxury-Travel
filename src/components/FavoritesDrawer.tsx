import React from 'react';
import { destinationsData } from '../data/destinationsData';
import { packagesData } from '../data/packagesData';
import { translations, type Language } from '../data/translations';
import { X, Heart, Trash2 } from 'lucide-react';

interface FavoritesDrawerProps {
  language: Language;
  currency: string;
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onBook: (item: any) => void;
}

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

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  language,
  currency,
  isOpen,
  onClose,
  favorites,
  toggleFavorite,
  onBook
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  // Retrieve favorited packages and destinations
  const savedDestinations = destinationsData.filter(d => favorites.includes(d.id));
  const savedPackages = packagesData.filter(p => favorites.includes(p.id));
  const totalCount = savedDestinations.length + savedPackages.length;

  const convertPrice = (usdAmount: number) => {
    const rate = EXCHANGE_RATES[currency] || 1.0;
    const converted = usdAmount * rate;
    return `${CURRENCY_SYMBOLS[currency]} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 14, 10, 0.4)',
      backdropFilter: 'blur(8px)',
      zIndex: 1050,
      display: 'flex',
      justifyContent: 'flex-end', // slides from right
      animation: 'fadeIn 0.3s ease-out'
    }}>
      {/* Drawer Overlay Dismiss */}
      <div onClick={onClose} style={{ flex: 1 }} />

      {/* Drawer Container Panel */}
      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          backgroundColor: 'var(--bg-secondary)',
          height: '100vh',
          boxShadow: 'var(--shadow-lg)',
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 30px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={18} fill="var(--gold-royal)" style={{ color: 'var(--gold-royal)' }} />
            {t.favoritesTitle}
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>({totalCount})</span>
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable List Container */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          {totalCount === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <Heart size={44} style={{ color: 'var(--border-color)' }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                {t.noFavorites}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Render Saved Packages */}
              {savedPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '16px'
                  }}
                >
                  <img
                    src={pkg.image}
                    alt={pkg.name[language]}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '600', margin: '0 0 4px 0' }}>{pkg.name[language]}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold-royal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {pkg.durationDays} Days Package &bull; {convertPrice(pkg.priceUSD)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <button
                        onClick={() => onBook(pkg)}
                        className="btn-gold"
                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      >
                        Book Now
                      </button>
                      <button
                        onClick={() => toggleFavorite(pkg.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '4px'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Render Saved Destinations */}
              {savedDestinations.map((dest) => (
                <div
                  key={dest.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '16px'
                  }}
                >
                  <img
                    src={dest.image}
                    alt={dest.name[language]}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '600', margin: '0 0 4px 0' }}>{dest.name[language]}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                        {dest.category} &bull; Destination
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <button
                        onClick={() => onBook(dest)}
                        className="btn-gold"
                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      >
                        Book Experience
                      </button>
                      <button
                        onClick={() => toggleFavorite(dest.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '4px'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>

      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
