import React, { useState } from 'react';
import { translations, type Language } from '../data/translations';
import { Star, Check, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

interface ReviewsProps {
  language: Language;
}

interface ReviewItem {
  id: string;
  name: string;
  country: { en: string; fr: string; ar: string };
  rating: number;
  date: string;
  text: { en: string; fr: string; ar: string };
  avatar: string;
}

export const Reviews: React.FC<ReviewsProps> = ({ language }) => {
  const t = translations[language];
  const [activeIndex, setActiveIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form fields
  const [revName, setRevName] = useState("");
  const [revCountry, setRevCountry] = useState("");
  const [revRating, setRevRating] = useState(5);
  const [revText, setRevText] = useState("");

  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([
    {
      id: "rev1",
      name: "Sir Alistair Cunningham",
      country: { en: "United Kingdom", fr: "Royaume-Uni", ar: "المملكة المتحدة" },
      rating: 5,
      date: "2026-07-02",
      text: {
        en: "Our custom vineyard experience and private villa buyout exceeded all standards. The Mercedes V-Class chauffeur was impeccably polite, and the direct VIP tarmac airport pickup made arrival effortless. Meknes is Morocco's best-kept secret.",
        fr: "Notre séjour sur mesure dans les vignobles et la privatisation du riad ont dépassé toutes nos attentes. Le chauffeur en Mercedes Classe V était d'une politesse impeccable et l'accueil VIP à l'aéroport a facilité notre arrivée.",
        ar: "تجاوزت تجربتنا الخاصة لكروم الأعناب وحجز الرياض الفاخر كل المعايير. كان السائق بسيارة مرسيدس في غاية الأدب والمهنية، كما أن الاستقبال السريع عند مدرج الطائرة جعل وصولنا سلساً للغاية. مكناس هي سر المغرب الدفين."
      },
      avatar: "https://ui-avatars.com/api/?name=Jean-Pierre+L&background=C5A059&color=0B1912"
    },
    {
      id: "rev2",
      name: "Hélène Dubois",
      country: { en: "France", fr: "France", ar: "فرنسا" },
      rating: 5,
      date: "2026-06-18",
      text: {
        en: "Walking through Volubilis with a university lecturer was a deeply emotional journey. The detail of the mosaics and the silence of the Roman ruins at sunset are memories I will carry forever. Absolute 5-star service.",
        fr: "Parcourir Volubilis avec un professeur d'université a été un moment fort en émotions. La beauté des mosaïques et le silence des ruines romaines au coucher du soleil sont des souvenirs gravés à jamais.",
        ar: "كان التجول في أطلال وليلي برفقة أستاذ محاضر رحلة وجدانية عميقة. تفاصيل لوحات الفسيفساء وصمت الآثار الرومانية وقت الغروب هي ذكريات سأحملها معي للأبد. خدمة ممتازة من فئة 5 نجوم."
      },
      avatar: "https://ui-avatars.com/api/?name=Amelia+W&background=C5A059&color=0B1912"
    },
    {
      id: "rev3",
      name: "Fahad Al-Mansoori",
      country: { en: "United Arab Emirates", fr: "Émirats Arabes Unis", ar: "الإمارات العربية المتحدة" },
      rating: 5,
      date: "2026-07-12",
      text: {
        en: "Exceptional security, absolute privacy, and stellar Michelin-tier dining inside our private riad. The children loved the horse carriage tours and clay molding workshops. We are already booking our winter return.",
        fr: "Sécurité exceptionnelle, discrétion absolue et repas gastronomiques étoilés servis dans notre riad privé. Les enfants ont adoré les balades en calèche et l'atelier poterie. Nous préparons déjà notre retour cet hiver.",
        ar: "حراسة استثنائية، خصوصية مطلقة، وطعام من فئة ميشلان العالمية داخل رياضنا الخاص. أحب الأطفال جولات العربة التي تجرها الخيول وورشة تشكيل الفخار. نحن بصدد حجز رحلتنا القادمة في الشتاء."
      },
      avatar: "https://ui-avatars.com/api/?name=Dr+Tariq+M&background=C5A059&color=0B1912"
    }
  ]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName || !revCountry || !revText) return;

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: revName,
      country: { en: revCountry, fr: revCountry, ar: revCountry },
      rating: revRating,
      date: new Date().toISOString().split('T')[0],
      text: { en: revText, fr: revText, ar: revText },
      avatar: "https://ui-avatars.com/api/?name=Visitor&background=C5A059&color=0B1912" // standard avatar
    };

    setReviewsList([newReview, ...reviewsList]);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowReviewForm(false);
      setRevName("");
      setRevCountry("");
      setRevRating(5);
      setRevText("");
      setActiveIndex(0); // show the new review
    }, 2500);
  };

  return (
    <section id="reviews" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
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
          {t.reviewsTitle}
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: 'var(--text-primary)',
          lineHeight: '1.2'
        }}>
          {t.reviewsSubtitle}
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

      {/* Testimonials Slider Wrapper */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        padding: '0 40px'
      }}>
        
        {/* Testimonial Card */}
        <div
          className="glass-card animate-fade-up"
          style={{
            padding: '48px 6%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            backgroundColor: 'var(--bg-primary)'
          }}
        >
          {/* Rating stars */}
          <div style={{ display: 'flex', gap: '4px', color: 'var(--gold-royal)' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < reviewsList[activeIndex].rating ? 'var(--gold-royal)' : 'none'}
              />
            ))}
          </div>

          {/* Testimonial body text */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            lineHeight: '1.8',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            "{reviewsList[activeIndex].text[language]}"
          </p>

          {/* Guest profile metadata */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
            <img
              src={reviewsList[activeIndex].avatar}
              alt={reviewsList[activeIndex].name}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--gold-royal)'
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-sans)', fontWeight: '600', margin: 0 }}>
                {reviewsList[activeIndex].name}
              </h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {reviewsList[activeIndex].country[language]} &bull; {reviewsList[activeIndex].date}
              </span>
            </div>
          </div>

          {/* Verified traveler badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--emerald-light)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            fontWeight: '600',
            letterSpacing: '0.05em'
          }}>
            <ShieldCheck size={14} />
            <span>Verified Luxury Traveler</span>
          </div>

        </div>

        {/* Carousel controls */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '-10px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--text-primary)',
            zIndex: 10
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '-10px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--text-primary)',
            zIndex: 10
          }}
        >
          <ChevronRight size={20} />
        </button>

      </div>

      {/* Button to toggle form */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="btn-outline"
        >
          {showReviewForm ? 'Cancel review submission' : t.reviewsFormTitle}
        </button>
      </div>

      {/* Review Submission Form container */}
      {showReviewForm && (
        <div style={{
          maxWidth: '550px',
          margin: '30px auto 0',
          padding: '30px',
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {formSubmitted ? (
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
                backgroundColor: 'var(--emerald-deep)',
                color: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Check size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)' }}>Review Submitted</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Thank you for contributing your genuine review to Meknes Chronicles.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">{t.nameLabel}</label>
                <input
                  type="text"
                  required
                  value={revName}
                  onChange={(e) => setRevName(e.target.value)}
                  placeholder="Alistair Cunningham"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Country of Residence</label>
                <input
                  type="text"
                  required
                  value={revCountry}
                  onChange={(e) => setRevCountry(e.target.value)}
                  placeholder="United Kingdom"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">{t.rating}</label>
                <select
                  value={revRating}
                  onChange={(e) => setRevRating(parseInt(e.target.value))}
                  className="form-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="5">5 Stars (Excellent)</option>
                  <option value="4">4 Stars (Very Good)</option>
                  <option value="3">3 Stars (Average)</option>
                  <option value="2">2 Stars (Poor)</option>
                  <option value="1">1 Star (Very Poor)</option>
                </select>
              </div>

              <div>
                <label className="form-label">Review Comments</label>
                <textarea
                  rows={4}
                  required
                  value={revText}
                  onChange={(e) => setRevText(e.target.value)}
                  placeholder="Describe your bespoke journey experiences"
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
                {t.submitReview}
              </button>
            </form>
          )}
        </div>
      )}

    </section>
  );
};
