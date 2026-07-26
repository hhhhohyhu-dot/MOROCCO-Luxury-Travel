import React from 'react';
import { translations, type Language } from '../data/translations';
import { MessageSquare, ArrowUp, Clock, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  language: Language;
  setView: (view: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, setView }) => {
  const t = translations[language];
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleLinkClick = (viewId: string) => {
    setView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'rgba(5, 14, 10, 0.95)',
        color: '#FAF7F0',
        padding: '80px 8% 30px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative'
      }}
    >
      {/* Scroll to Top Circle Button */}
      <button
        onClick={handleScrollTop}
        style={{
          position: 'absolute',
          top: '-24px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'var(--gold-royal)',
          border: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFF',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-md)',
          transition: 'var(--transition-smooth)'
        }}
        title={t.backToTop}
      >
        <ArrowUp size={20} />
      </button>

      {/* Newsletter Premium Banner */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        marginBottom: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px'
      }}>
        <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', color: '#FFF' }}>
          Join The Inner Circle
        </h3>
        <p style={{ color: 'rgba(250, 247, 240, 0.6)', maxWidth: '500px', fontSize: '0.95rem' }}>
          Subscribe to receive exclusive invitations, unlisted itineraries, and curated stories from the heart of Meknes.
        </p>
        <form onSubmit={handleNewsletter} style={{ display: 'flex', width: '100%', maxWidth: '400px', gap: '8px', marginTop: '10px' }}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              color: '#FFF',
              outline: 'none',
              fontFamily: 'var(--font-sans)'
            }}
            required
          />
          <button 
            type="submit"
            className="btn-gold"
            style={{ padding: '12px 20px', borderRadius: 'var(--radius-sm)' }}
            disabled={isSubscribed}
          >
            {isSubscribed ? <CheckCircle2 size={18} /> : <Send size={18} />}
          </button>
        </form>
      </div>

      {/* Main Grid content */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}
        className="footer-grid"
      >
        {/* Left Column: Brand Emblem and summary info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '1.5px solid var(--gold-royal)',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-royal)', fontWeight: 'bold' }}>M</span>
            </div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', letterSpacing: '0.08em', fontWeight: 'bold', textTransform: 'uppercase' }}>
              {t.brand}
            </span>
          </div>
          <p style={{ color: 'rgba(250, 247, 240, 0.5)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '24px' }}>
            Curating high-end bespoke journeys through the ancient royal capital and heritage horizons of Meknes, Morocco.
          </p>
          
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><MessageSquare size={16} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>

        {/* Mid Column 1: Navigation Links Directory */}
        <div>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-royal)', marginBottom: '24px' }}>
            Explorations
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
            <li><button onClick={() => handleLinkClick('home')} className="footer-nav-btn">{t.navHome}</button></li>
            <li><button onClick={() => handleLinkClick('about')} className="footer-nav-btn">{t.navAbout}</button></li>
            <li><button onClick={() => handleLinkClick('destinations')} className="footer-nav-btn">{t.navDestinations}</button></li>
            <li><button onClick={() => handleLinkClick('packages')} className="footer-nav-btn">{t.navPackages}</button></li>
          </ul>
        </div>

        {/* Mid Column 2: Document links */}
        <div>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-royal)', marginBottom: '24px' }}>
            Bespoke Portals
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
            <li><button onClick={() => handleLinkClick('services')} className="footer-nav-btn">{t.navServices}</button></li>
            <li><button onClick={() => handleLinkClick('gallery')} className="footer-nav-btn">{t.navGallery}</button></li>
            <li><button onClick={() => handleLinkClick('blog')} className="footer-nav-btn">{t.navBlog}</button></li>
            <li><button onClick={() => handleLinkClick('faq')} className="footer-nav-btn">{t.navFaq}</button></li>
          </ul>
        </div>

        {/* Right Column: Address and operational values */}
        <div>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-royal)', marginBottom: '24px' }}>
            Imperial Offices
          </h4>
          <p style={{ color: 'rgba(250, 247, 240, 0.5)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '16px' }}>
            Palais Jamai Mansions, Suite 4B,<br />
            El Hedim Square, Medina,<br />
            Meknes, Morocco
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(250, 247, 240, 0.5)', fontSize: '0.8rem' }}>
            <Clock size={14} style={{ color: 'var(--gold-royal)' }} />
            <span>09:00 - 20:00 Daily</span>
          </div>
        </div>

      </div>

      {/* Bottom Copyright and Legal Terms bar */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        fontSize: '0.8rem',
        color: 'rgba(250, 247, 240, 0.4)'
      }} className="footer-bottom">
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <button onClick={() => handleLinkClick('privacy')} className="footer-nav-btn">{t.privacyBtn}</button>
          <button onClick={() => handleLinkClick('terms')} className="footer-nav-btn">{t.termsBtn}</button>
        </div>

        <div>
          &copy; {new Date().getFullYear()} {t.brand}. Developed to Elite Agency Standards. All Rights Reserved.
        </div>

      </div>

      <style>{`
        .footer-social-icon {
          display: flex;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #FAF7F0;
          justify-content: center;
          align-items: center;
          transition: var(--transition-smooth);
        }
        .footer-social-icon:hover {
          background-color: var(--gold-royal);
          border-color: var(--gold-royal);
          transform: translateY(-2px);
        }
        .footer-nav-btn {
          background: none;
          border: none;
          color: rgba(250, 247, 240, 0.5);
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          padding: 0;
          transition: var(--transition-smooth);
          text-align: left;
        }
        .footer-nav-btn:hover {
          color: var(--gold-royal);
          transform: translateX(4px);
        }
        @media(min-width: 768px) {
          .footer-bottom {
            flex-direction: row-reverse !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
        }
      `}</style>
    </footer>
  );
};
