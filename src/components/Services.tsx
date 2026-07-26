import React, { useState } from 'react';
import { translations, type Language } from '../data/translations';
import { PlaneTakeoff, ShieldAlert, Award, FileText, Gift, HelpCircle, Check, X, Send, Sparkles } from 'lucide-react';

interface ServicesProps {
  language: Language;
}

interface ServiceItem {
  id: string;
  title: { en: string; fr: string; ar: string };
  desc: { en: string; fr: string; ar: string };
  icon: any;
}

export const Services: React.FC<ServicesProps> = ({ language }) => {
  const t = translations[language];
  const [inquireService, setInquireService] = useState<ServiceItem | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientMessage, setClientMessage] = useState("");

  const servicesList: ServiceItem[] = [
    {
      id: "airport-pick",
      title: { en: "Airport Pickup & Fast-Track", fr: "Accueil Aéroport & VIP Fast-Track", ar: "الاستقبال بالمطار والممر السريع" },
      desc: { en: "Skip terminal queues with fast-track border clearance and luxury terminal greeting services.", fr: "Évitez les files d'attente à l'aéroport avec l'assistance douane prioritaire et un accueil personnalisé.", ar: "تجاوز طوابير المطار من خلال التخليص السريع للمعاملات واستقبال فاخر عند صالة الوصول." },
      icon: PlaneTakeoff
    },
    {
      id: "private-driver",
      title: { en: "Private Chauffeur Escort", fr: "Chauffeur Privé Dédié", ar: "سائق خاص ومرافق" },
      desc: { en: "Travel throughout Morocco in high-end Mercedes vehicles managed by certified, bilingual chauffeurs.", fr: "Voyagez à travers le Maroc à bord de véhicules Mercedes haut de gamme avec chauffeurs certifiés bilingues.", ar: "التنقل في جميع أنحاء المغرب بسيارات مرسيدس الفاخرة التي يقودها سائقون محترفون ثنائيو اللغة." },
      icon: Award
    },
    {
      id: "guided-excursions",
      title: { en: "Bespoke Guided Excursions", fr: "Guides Conférenciers Privés", ar: "رحلات إرشادية خاصة" },
      desc: { en: "Unlock history with certified university-level guides specializing in archaeology and imperial culture.", fr: "Découvrez l'histoire locale avec des guides officiels diplômés en archéologie et histoire impériale.", ar: "استكشف التاريخ المحلي برفقة مرشدين رسميين حاصلين على شهادات جامعية في علم الآثار والتاريخ." },
      icon: FileText
    },
    {
      id: "hotel-booking",
      title: { en: "Boutique Hotel & Palace Bookings", fr: "Réservation Riads & Hôtels d'exception", ar: "حجز الفنادق الفاخرة والقصور" },
      desc: { en: "Gain exclusive access to closed-door private Riads, contemporary wine estates, and luxury wellness suites.", fr: "Accédez à des riads privatifs secrets, des domaines viticoles et des suites bien-être de prestige.", ar: "احصل على حجز حصري في الرياضات المغلقة والسرية، ومزارع الكروم المعاصرة، وأجنحة الاستشفاء الفاخرة." },
      icon: Gift
    },
    {
      id: "visa-assistance",
      title: { en: "Consular & Visa Assistance", fr: "Assistance Visa & Affaires Consulaires", ar: "المساعدة في التأشيرات والقنصليات" },
      desc: { en: "Streamline entry formalities and international paperwork through our dedicated legal liaisons.", fr: "Facilitez vos formalités d'entrée et vos documents internationaux grâce à nos liaisons consulaires.", ar: "تسهيل إجراءات الدخول والمعاملات الورقية الدولية من خلال مستشارينا المخصصين." },
      icon: FileText
    },
    {
      id: "travel-insurance",
      title: { en: "Comprehensive Private Insurance", fr: "Assurance Voyage Premium", ar: "تأمين السفر الشامل الفاخر" },
      desc: { en: "Stay secure with elite global health coverages and custom emergency medical coordinates.", fr: "Voyagez serein avec une couverture médicale globale d'élite et une assistance d'urgence sur mesure.", ar: "تمتع بالأمان مع تغطيات صحية عالمية متميزة وتنسيق طبي مخصص للحالات الطارئة." },
      icon: ShieldAlert
    },
    {
      id: "private-events",
      title: { en: "Curated Celebrations & Gala Events", fr: "Célébrations & Événements Privés", ar: "تنظيم الاحتفالات والمناسبات الخاصة" },
      desc: { en: "Plan candle-lit banquets in the Royal Stables ruins, private lute recitals, or anniversary galas.", fr: "Planifiez des banquets aux chandelles dans les ruines impériales, concerts de luth ou galas.", ar: "تخطيط الولائم الفاخرة على ضوء الشموع في أطلال الإسطبلات الملكية، أو حفلات العود الخاصة." },
      icon: Sparkles
    },
    {
      id: "customized-itineraries",
      title: { en: "Tailored Travel Itineraries", fr: "Création d'Itinéraires sur Mesure", ar: "تصميم مسارات سفر مخصصة بالكامل" },
      desc: { en: "Build custom botanical walks, photography circuits, and Sufi studies schedules suited to your style.", fr: "Concevez des parcours botaniques, des expéditions photo ou d'études spirituelles selon vos envies.", ar: "صمم مسارات للمشي بين الطبيعة، أو جولات للتصوير، أو دراسات صوفية تناسب أسلوبك." },
      icon: HelpCircle
    }
  ];

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    
    // Simulate API save
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setInquireService(null);
      setClientName("");
      setClientEmail("");
      setClientMessage("");
    }, 3000);
  };

  return (
    <section id="services" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          color: 'var(--gold-royal)',
          textTransform: 'uppercase',
          fontSize: '0.85rem',
          fontWeight: '600',
          letterSpacing: '0.2em',
          display: 'block',
          marginBottom: '12px'
        }}>
          {t.servicesTitle}
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: 'var(--text-primary)',
          lineHeight: '1.2'
        }}>
          {t.servicesSubtitle}
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

      {/* Grid List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px'
      }}>
        {servicesList.map((service) => {
          const IconComponent = service.icon;
          return (
            <article
              key={service.id}
              className="glass-card"
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-primary)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--gold-royal)',
                  marginBottom: '20px',
                  border: '1px solid var(--border-color)'
                }}>
                  <IconComponent size={24} />
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--text-primary)',
                  marginBottom: '12px'
                }}>
                  {service.title[language]}
                </h3>
                
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  marginBottom: '24px'
                }}>
                  {service.desc[language]}
                </p>
              </div>

              <button
                onClick={() => setInquireService(service)}
                className="btn-outline"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '0.8rem',
                  justifyContent: 'center'
                }}
              >
                Inquire Service
              </button>
            </article>
          );
        })}
      </div>

      {/* Service inquiry popup drawer */}
      {inquireService && (
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
              maxWidth: '500px',
              padding: '36px',
              position: 'relative',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setInquireService(null)}
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
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)' }}>Inquiry Submitted</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  A private concierge advisor will contact you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gold-royal)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
                    Service Request Inquiry
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                    {inquireService.title[language]}
                  </h3>
                </div>

                <div>
                  <label className="form-label">{t.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter your name"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">{t.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">{t.messageLabel}</label>
                  <textarea
                    rows={4}
                    value={clientMessage}
                    onChange={(e) => setClientMessage(e.target.value)}
                    placeholder="Add requests or parameters"
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
                  Send Inquiry
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
