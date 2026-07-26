import React, { useState } from 'react';
import { translations, type Language } from '../data/translations';
import { X, FileText, Calendar, ShieldCheck, Printer } from 'lucide-react';

interface BookingModalProps {
  language: Language;
  currency: string;
  item: any; // Destination or Package or Custom Configuration
  onClose: () => void;
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

export const BookingModal: React.FC<BookingModalProps> = ({
  language,
  currency,
  item,
  onClose
}) => {
  const t = translations[language];
  const [step, setStep] = useState(1);
  
  // Client details
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [travelDate, setTravelDate] = useState("2026-09-10");
  const [guestsCount, setGuestsCount] = useState("2");
  
  // Custom VIP Add-ons
  const [butlerService, setButlerService] = useState(false);
  const [fastTrackAirport, setFastTrackAirport] = useState(false);
  const [privateSpaHammam, setPrivateSpaHammam] = useState(false);
  
  // Unique Booking Code Reference
  const [bookingRefCode] = useState(() => `MKLX-${Math.floor(1000 + Math.random() * 9000)}-RE`);

  // Pricing
  const basePriceUSD = item.priceUSD || (item.category ? 250 : 1500); // fallback for simple destinations or packages
  
  const calculateTotalUSD = () => {
    let price = basePriceUSD * parseInt(guestsCount);
    if (butlerService) price += 250 * (item.durationDays || 5);
    if (fastTrackAirport) price += 150 * parseInt(guestsCount);
    if (privateSpaHammam) price += 180 * parseInt(guestsCount);
    return price;
  };

  const convertPrice = (usdAmount: number) => {
    const rate = EXCHANGE_RATES[currency] || 1.0;
    const converted = usdAmount * rate;
    return `${CURRENCY_SYMBOLS[currency]} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 14, 10, 0.85)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      zIndex: 1200,
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
          maxWidth: '650px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          padding: '40px 6%'
        }}
        className="booking-modal-box"
      >
        {/* Close Button */}
        {step < 3 && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            <X size={20} />
          </button>
        )}

        {/* Step Indicator */}
        {step < 3 && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', justifyContent: 'center' }}>
            <div style={{
              height: '4px',
              width: '60px',
              backgroundColor: step >= 1 ? 'var(--gold-royal)' : 'var(--border-color)',
              borderRadius: '2px',
              transition: 'var(--transition-smooth)'
            }} />
            <div style={{
              height: '4px',
              width: '60px',
              backgroundColor: step >= 2 ? 'var(--gold-royal)' : 'var(--border-color)',
              borderRadius: '2px',
              transition: 'var(--transition-smooth)'
            }} />
            <div style={{
              height: '4px',
              width: '60px',
              backgroundColor: step >= 3 ? 'var(--gold-royal)' : 'var(--border-color)',
              borderRadius: '2px',
              transition: 'var(--transition-smooth)'
            }} />
          </div>
        )}

        {step === 1 && (
          /* Step 1: Passenger / Client Contact Details */
          <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-royal)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
                Secure Checkout &bull; Step 1 of 3
              </span>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                {item.name[language]}
              </h3>
            </div>

            <div>
              <label className="form-label">{t.nameLabel} *</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Lord Alistair Cunningham"
                className="form-input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="modal-form-row">
              <div>
                <label className="form-label">{t.emailLabel} *</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="concierge@travel.com"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">{t.phoneLabel}</label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+44 20 7946 0958"
                  className="form-input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="modal-form-row">
              <div>
                <label className="form-label">{t.checkIn}</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '44px' }}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">{t.travelers}</label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  className="form-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="6">6+ Guests</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold"
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '10px'
              }}
            >
              Continue to VIP Options
            </button>
          </form>
        )}

        {step === 2 && (
          /* Step 2: Luxury Add-ons */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-royal)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
                Secure Checkout &bull; Step 2 of 3
              </span>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                Bespoke Traveler Options
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                Tailor your imperial sanctuary with dedicated private support layers.
              </p>
            </div>

            {/* Checkbox Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <button
                type="button"
                onClick={() => setButlerService(!butlerService)}
                style={{
                  padding: '16px',
                  border: '1px solid',
                  borderColor: butlerService ? 'var(--gold-royal)' : 'var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: butlerService ? 'var(--bg-primary)' : 'transparent',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', textAlign: 'left' }}>
                  <input type="checkbox" checked={butlerService} readOnly style={{ accentColor: 'var(--gold-royal)' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>Dedicated 24/7 Butler Service</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>A certified concierge at your disposal round the clock.</span>
                  </div>
                </div>
                <span style={{ color: 'var(--gold-royal)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  +{convertPrice(250)}/day
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFastTrackAirport(!fastTrackAirport)}
                style={{
                  padding: '16px',
                  border: '1px solid',
                  borderColor: fastTrackAirport ? 'var(--gold-royal)' : 'var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: fastTrackAirport ? 'var(--bg-primary)' : 'transparent',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', textAlign: 'left' }}>
                  <input type="checkbox" checked={fastTrackAirport} readOnly style={{ accentColor: 'var(--gold-royal)' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>Fast-Track Terminal Access</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Skip border control lines with fast terminal clearance.</span>
                  </div>
                </div>
                <span style={{ color: 'var(--gold-royal)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  +{convertPrice(150)}/guest
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPrivateSpaHammam(!privateSpaHammam)}
                style={{
                  padding: '16px',
                  border: '1px solid',
                  borderColor: privateSpaHammam ? 'var(--gold-royal)' : 'var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: privateSpaHammam ? 'var(--bg-primary)' : 'transparent',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', textAlign: 'left' }}>
                  <input type="checkbox" checked={privateSpaHammam} readOnly style={{ accentColor: 'var(--gold-royal)' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>Private Spa & Hammam Package</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Couples oil massage and royal hot bath therapies.</span>
                  </div>
                </div>
                <span style={{ color: 'var(--gold-royal)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  +{convertPrice(180)}/guest
                </span>
              </button>
            </div>

            {/* Total invoice block */}
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius-sm)',
              padding: '20px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px'
            }}>
              <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Estimated Booking Invoice:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--emerald-light)', fontFamily: 'monospace' }}>
                {convertPrice(calculateTotalUSD())}
              </span>
            </div>

            {/* Navigation buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn-outline"
                style={{ justifyContent: 'center' }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-gold"
                style={{ justifyContent: 'center' }}
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          /* Step 3: Final confirmation receipt */
          <div style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            animation: 'scaleIn 0.5s ease-out'
          }}>
            {/* Confirmation indicator */}
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: 'var(--emerald-deep)',
              color: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 'var(--shadow-md)'
            }}>
              <ShieldCheck size={36} />
            </div>

            <div>
              <span style={{ color: 'var(--gold-royal)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em' }}>
                Transaction Secure & Verified
              </span>
              <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginTop: '4px', marginBottom: '8px' }}>
                {t.bookingConfirmTitle}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                A confirmation email containing travel briefs has been sent to your private coordinates.
              </p>
            </div>

            {/* Printable luxury boarding ticket / receipt design */}
            <div
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                textAlign: 'left',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
              className="printable-ticket"
            >
              {/* Gold ribbon header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Booking Reference</span>
                  <span style={{ display: 'block', fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--gold-royal)', fontFamily: 'monospace' }}>
                    {bookingRefCode}
                  </span>
                </div>
                <FileText size={24} style={{ color: 'var(--gold-royal)' }} />
              </div>

              {/* Itinerary lines */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Traveler Name:</span>
                  <strong>{clientName || 'Alistair Cunningham'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Selected Schedule:</span>
                  <strong>{travelDate} &bull; {guestsCount} Guests</strong>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Journey Option:</span>
                <strong>{item.name[language]}</strong>
              </div>

              {/* Addons summary tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                <span className="addon-tag">{item.durationDays || 5} Days Trip</span>
                {butlerService && <span className="addon-tag">VIP Butler Escort</span>}
                {fastTrackAirport && <span className="addon-tag">Terminal Fast-Track</span>}
                {privateSpaHammam && <span className="addon-tag">Royal Hammam package</span>}
              </div>

              {/* Price footer */}
              <div style={{
                borderTop: '1px dashed var(--border-color)',
                paddingTop: '12px',
                marginTop: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Total Invoice Charged</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                  {convertPrice(calculateTotalUSD())}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
              <button
                onClick={() => window.print()}
                className="btn-outline"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Printer size={16} />
                Print Invoice
              </button>
              
              <button
                onClick={onClose}
                className="btn-gold"
                style={{
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                Close Reservation
              </button>
            </div>

          </div>
        )}

      </div>
      
      <style>{`
        .addon-tag {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background-color: var(--emerald-deep);
          color: #FAF7F0;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 500;
        }
        @media(max-width: 640px) {
          .modal-form-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
