import React, { useState } from 'react';
import { translations, type Language } from '../data/translations';
import { Mail, Phone, MapPin, MessageSquare, Send, Check, Sparkles } from 'lucide-react';

interface ContactProps {
  language: Language;
}

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = translations[language];
  
  // States
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newsSubmitted, setNewsSubmitted] = useState(false);
  const [activeMapPin, setActiveMapPin] = useState<string>("marrakech");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [newsEmail, setNewsEmail] = useState("");

  const mapPins = [
    { id: "casablanca",    name: { en: "Casablanca",          fr: "Casablanca",          ar: "الدار البيضاء"    }, desc: "Hassan II Mosque on the Atlantic coast.",       x: 130, y: 160 },
    { id: "rabat",        name: { en: "Rabat (Capital)",     fr: "Rabat (Capitale)",   ar: "الرباط (العاصمة)" }, desc: "Hassan Tower & Kasbah des Oudaïas.",          x: 165, y: 115 },
    { id: "fes",          name: { en: "Fes Medina",          fr: "Médina de Fès",       ar: "فاس العتيقة"      }, desc: "Largest car-free medieval city on Earth.",      x: 390, y: 105 },
    { id: "meknes",       name: { en: "Meknes",              fr: "Meknès",             ar: "مكناس"            }, desc: "Imperial gates, Volubilis & Habs Qara.",        x: 330, y: 130 },
    { id: "chefchaouen", name: { en: "Chefchaouen",         fr: "Chefchaouen",        ar: "شفشاون"           }, desc: "The famous blue-washed mountain town.",        x: 265, y: 68  },
    { id: "marrakech",   name: { en: "Marrakech",           fr: "Marrakech",          ar: "مراكش"            }, desc: "Bahia Palace, Jemaa el-Fnaa & luxury Riads.",  x: 280, y: 295 },
    { id: "sahara",      name: { en: "Sahara (Merzouga)",   fr: "Sahara (Merzouga)",  ar: "صحراء مرزوكة"    }, desc: "Erg Chebbi golden dunes & camel caravans.",   x: 565, y: 340 },
    { id: "essaouira",   name: { en: "Essaouira",           fr: "Essaouira",          ar: "الصويرة"          }, desc: "Seaside fortress & the Port of Mogador.",     x: 145, y: 295 },
    { id: "tangier",      name: { en: "Tangier",             fr: "Tanger",             ar: "طنجة"            }, desc: "Cap Spartel gateway & historic Medina.",        x: 230, y: 30  },
    { id: "tetouan",      name: { en: "Tetouan",             fr: "Tétouan",            ar: "تطوان"           }, desc: "Andalusian white city medina.",                 x: 310, y: 50  },
    { id: "asilah",       name: { en: "Asilah",              fr: "Asilah",             ar: "أصيلة"           }, desc: "Portuguese sea ramparts & art murals.",        x: 190, y: 60  },
    { id: "al-hoceima",   name: { en: "Al Hoceima",          fr: "Al Hoceima",         ar: "الحسيمة"         }, desc: "Quemado beach and Mediterranean cliffs.",     x: 400, y: 45  },
    { id: "ifrane",       name: { en: "Ifrane",              fr: "Ifrane",             ar: "إفران"           }, desc: "Stone Lion and alpine snowy landscapes.",       x: 360, y: 180 },
    { id: "agadir",       name: { en: "Agadir",              fr: "Agadir",             ar: "أكادير"          }, desc: "Golden beach crescent & Oufella Kasbah ruins.",  x: 170, y: 370 },
    { id: "legzira",      name: { en: "Legzira",             fr: "Legzira",            ar: "الكزيرة"         }, desc: "Colossal red sandstone natural arches.",       x: 130, y: 430 },
    { id: "dakhla",       name: { en: "Dakhla",              fr: "Dakhla",             ar: "الداخلة"         }, desc: "Turquoise lagoon meeting Sahara dunes.",       x: 60,  y: 480 },
    { id: "ouarzazate",   name: { en: "Ouarzazate",           fr: "Ouarzazate",         ar: "ورزازات"         }, desc: "Hollywood of Morocco & Kasbah Taourirt.",      x: 370, y: 320 },
    { id: "todra",        name: { en: "Todra Gorge",         fr: "Gorges du Todra",    ar: "مضايق تودغى"      }, desc: "Vertical limestone cliff canyon walls.",       x: 450, y: 310 },
    { id: "dades",        name: { en: "Dades Valley",        fr: "Vallée du Dadès",    ar: "وادي دادس"       }, desc: "Tisdrine winding curves & monkey fingers.",    x: 410, y: 305 },
    { id: "ouzoud",       name: { en: "Ouzoud Waterfalls",   fr: "Cascades d'Ouzoud",  ar: "شلالات أوزود"     }, desc: "North Africa's highest water cascades.",       x: 310, y: 240 },
    { id: "paradise",     name: { en: "Paradise Valley",     fr: "Paradise Valley",    ar: "وادي الجنة"      }, desc: "Palm oasis and clear turquoise rock pools.",     x: 190, y: 350 }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setName("");
      setEmail("");
      setPhone("");
      setMsg("");
    }, 3000);
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;

    setNewsSubmitted(true);
    setTimeout(() => {
      setNewsSubmitted(false);
      setNewsEmail("");
    }, 3000);
  };

  const activePinInfo = mapPins.find(p => p.id === activeMapPin) || mapPins[5];

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
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
          {t.contactTitle}
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: 'var(--text-primary)',
          lineHeight: '1.2'
        }}>
          {t.contactSubtitle}
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

      {/* Grid Content Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '60px',
        alignItems: 'start'
      }} className="contact-grid-layout">
        
        {/* Left Col - Booking Form and Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }} className="contact-info-column">
          {/* Booking Inquiry Card */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              backgroundColor: 'var(--bg-primary)'
            }}
          >
            {formSubmitted ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--emerald-deep)',
                  color: '#FFF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Check size={28} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)' }}>Inquiry Registered</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Your private travel consultant has logged your requests and will connect shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {t.bookingFormTitle}
                </h3>
                
                <div>
                  <label className="form-label">{t.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">{t.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">{t.phoneLabel}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone (+1 555-0000)"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">{t.messageLabel}</label>
                  <textarea
                    rows={4}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Provide details about dates, party size, custom requests..."
                    className="form-input"
                    style={{ resize: 'none' }}
                  />
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
                  <Send size={16} />
                  Submit Request
                </button>
              </form>
            )}
          </div>

          {/* Quick contact and social handles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }} className="contact-details-grid">
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ color: 'var(--gold-royal)', flexShrink: 0 }}><Phone size={20} /></div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block' }}>Call us</span>
                <a href="tel:+212535000000" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>+212 535-000-000</a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ color: 'var(--gold-royal)', flexShrink: 0 }}><Mail size={20} /></div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block' }}>Email</span>
                <a href="mailto:concierge@moroccoluxurytravel.com" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>concierge@moroccoluxurytravel.com</a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ color: 'var(--gold-royal)', flexShrink: 0 }}><MessageSquare size={20} /></div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block' }}>WhatsApp Concierge</span>
                <a
                  href="https://wa.me/212600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    marginTop: '6px'
                  }}
                >
                  {t.whatsappBtn}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col - Interactive SVG Map and Newsletter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }} className="contact-map-column">
          
          {/* Interactive Vector Map Card */}
          <div className="map-container">
            <svg
              viewBox="0 0 800 500"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--bg-tertiary)',
                backgroundImage: 'radial-gradient(var(--border-color) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            >
              {/* Cartography Compass Emblem */}
              <g transform="translate(70, 430)" style={{ opacity: 0.2 }}>
                <circle cx="0" cy="0" r="40" fill="none" stroke="var(--text-primary)" strokeWidth="1" />
                <path d="M-40,0 L40,0 M0,-40 L0,40" stroke="var(--text-primary)" strokeWidth="0.5" />
                <polygon points="0,-35 6,0 0,6" fill="var(--text-primary)" />
                <polygon points="0,35 -6,0 0,-6" fill="var(--text-primary)" />
                <text x="-5" y="-45" style={{ fontSize: '10px', fontWeight: 'bold' }}>N</text>
              </g>

              {/* Connecting Map Grid Trails */}
              <path
                d="M 60 480 L 130 430 L 170 370 L 190 350 L 145 295 L 280 295 L 370 320 L 410 305 L 450 310 L 565 340 L 360 180 L 330 130 L 390 105 L 400 45 L 310 50 L 230 30 L 190 60 L 165 115 L 130 160 Z"
                fill="none"
                stroke="var(--gold-royal)"
                strokeWidth="1.5"
                strokeDasharray="6,4"
                style={{ opacity: 0.6 }}
              />

              {/* Map Coordinates Pins */}
              {mapPins.map((pin) => (
                <g
                  key={pin.id}
                  onClick={() => setActiveMapPin(pin.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer animated halo ring */}
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={activeMapPin === pin.id ? 14 : 0}
                    fill="none"
                    stroke="var(--gold-royal)"
                    strokeWidth="1.5"
                    style={{
                      transition: 'r 0.3s ease',
                      opacity: activeMapPin === pin.id ? 0.8 : 0
                    }}
                  />
                  
                  {/* Pin core dot */}
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={activeMapPin === pin.id ? 7 : 5}
                    fill={activeMapPin === pin.id ? "var(--gold-royal)" : "var(--emerald-deep)"}
                    stroke="#FFF"
                    strokeWidth="1.5"
                    style={{ transition: 'all 0.3s ease' }}
                  />

                  {/* Pin Title labels */}
                  <text
                    x={pin.x + 12}
                    y={pin.y + 4}
                    style={{
                      fontSize: activeMapPin === pin.id ? '11px' : '9px',
                      fontWeight: activeMapPin === pin.id ? 'bold' : '500',
                      fill: activeMapPin === pin.id ? 'var(--gold-royal)' : 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      textShadow: '0 0 5px rgba(255,255,255,0.8)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {pin.name[language]}
                  </text>
                </g>
              ))}
            </svg>

            {/* Float Card displaying active pins info */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              backgroundColor: 'var(--glass-bg)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow-md)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <MapPin size={22} style={{ color: 'var(--gold-royal)', flexShrink: 0 }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600' }}>
                  {activePinInfo.name[language]}
                </h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {activePinInfo.desc}
                </p>
              </div>
            </div>

          </div>

          {/* Premium Newsletter Box */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              background: 'linear-gradient(135deg, var(--emerald-deep) 0%, #0A2617 100%)',
              color: '#FAF7F0',
              border: 'none',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {newsSubmitted ? (
              <div style={{
                textAlign: 'center',
                padding: '20px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--gold-royal)',
                  color: '#FFF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Check size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--gold-royal)' }}>Subscription Confirmed</h3>
                <p style={{ color: 'rgba(250,247,240,0.7)', fontSize: '0.85rem' }}>
                  You are now enrolled in the private Morocco Luxury Chronicles letter list.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'var(--gold-royal)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Sparkles size={14} />
                  Private Circular
                </span>
                
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: '#FAF7F0', margin: 0 }}>
                  {t.newsletterTitle}
                </h3>
                
                <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,240,0.7)', lineHeight: '1.5', margin: 0 }}>
                  {t.newsletterSubtitle}
                </p>

                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <input
                    type="email"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="form-input"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#FFF'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {t.subscribeBtn}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>

      <style>{`
        @media(min-width: 1024px) {
          .contact-grid-layout {
            grid-template-columns: 1.1fr 1fr !important;
            gap: 72px !important;
          }
        }
        @media(min-width: 640px) {
          .contact-details-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};
