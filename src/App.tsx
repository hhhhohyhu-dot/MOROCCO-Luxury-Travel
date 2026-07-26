import React, { useState, useEffect } from 'react';
import { translations, type Language } from './data/translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutMeknes } from './components/AboutMeknes';
import { LuxuryStats } from './components/LuxuryStats';
import { CinematicShowcase } from './components/CinematicShowcase';
import { SeasonalPlanner } from './components/SeasonalPlanner';
import { RoyalItineraryArchitect } from './components/RoyalItineraryArchitect';
import { SoundscapePlayer } from './components/SoundscapePlayer';
import { Destinations } from './components/Destinations';
import { TravelExplorerMap } from './components/TravelExplorerMap';
import { Packages } from './components/Packages';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Blog } from './components/Blog';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { LoadingScreen } from './components/LoadingScreen';
import { NotFound } from './components/NotFound';
import { AIConcierge } from './components/AIConcierge';
import './App.css';

export const App: React.FC = () => {
  // Global configurations
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<string>('USD');
  const [currentView, setView] = useState<string>('home');

  // Interactive configurations
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [activeBookingItem, setActiveBookingItem] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const t = translations[language];

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  // Initialize theme & favorites from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('meknes_luxury_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    const savedLanguage = localStorage.getItem('meknes_luxury_lang') as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const savedCurrency = localStorage.getItem('meknes_luxury_curr');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }

    const savedFavs = localStorage.getItem('meknes_luxury_favs');
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync state mutations to local storage
  const handleSetTheme = (nextTheme: 'light' | 'dark') => {
    setTheme(nextTheme);
    localStorage.setItem('meknes_luxury_theme', nextTheme);
  };

  const handleSetLanguage = (nextLang: Language) => {
    setLanguage(nextLang);
    localStorage.setItem('meknes_luxury_lang', nextLang);
  };

  const handleSetCurrency = (nextCurr: string) => {
    setCurrency(nextCurr);
    localStorage.setItem('meknes_luxury_curr', nextCurr);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id];
      localStorage.setItem('meknes_luxury_favs', JSON.stringify(updated));
      return updated;
    });
  };

  const handleOpenBooking = (item: any) => {
    setActiveBookingItem(item);
  };

  const handleBookCustomRoute = (route: any[], transport: any) => {
    const customPackage = {
      id: 'custom-royal-route',
      name: {
        en: 'Bespoke Royal Itinerary',
        fr: 'Itinéraire Royal Sur Mesure',
        ar: 'مسار ملكي خاص'
      },
      tagline: {
        en: 'Your custom designed journey across Morocco.',
        fr: 'Votre voyage sur mesure à travers le Maroc.',
        ar: 'رحلتك المصممة خصيصاً عبر المغرب.'
      },
      priceUSD: route.length * 500 + transport.multiplier * route.length * 100, // rough dummy mapping for the form
      durationDays: route.length * 2,
      transportation: transport.name,
      highlights: {
        en: route.map(c => `Visit ${c.name.en}`),
        fr: route.map(c => `Visite de ${c.name.fr}`),
        ar: route.map(c => `زيارة ${c.name.ar}`)
      },
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Marrakech_-_Jemaa_el-Fna_-_5790.jpg/1280px-Marrakech_-_Jemaa_el-Fna_-_5790.jpg"
    };
    setActiveBookingItem(customPackage);
  };

  const handleCloseBooking = () => {
    setActiveBookingItem(null);
  };

  // Scroll progress bar
  useEffect(() => {
    const handleScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  // Adjust text direction based on Arabic lang selection
  const isRTL = language === 'ar';

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  if (currentView === '404') {
    return <NotFound language={language} onReturnHome={() => setView('home')} />;
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      <SoundscapePlayer language={language} />

      {/* Live scroll progress bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Dynamic Header */}
      <Header
        currentView={currentView}
        setView={setView}
        language={language}
        setLanguage={handleSetLanguage}
        currency={currency}
        setCurrency={handleSetCurrency}
        theme={theme}
        setTheme={handleSetTheme}
        favoritesCount={favorites.length}
        onToggleFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentView === 'home' && (
          <>
            <Hero language={language} onSearch={setSearchQuery} setView={setView} />
            <CinematicShowcase language={language} currency={currency} onBook={handleOpenBooking} />
            <AboutMeknes language={language} />
            <LuxuryStats language={language} />
            <TravelExplorerMap
              language={language}
              currency={currency}
              onBookDestination={handleOpenBooking}
            />
            <SeasonalPlanner 
              language={language} 
              currency={currency} 
              onBook={handleOpenBooking} 
            />
            <RoyalItineraryArchitect 
              language={language}
              currency={currency}
              onBookCustomRoute={handleBookCustomRoute}
            />
            <Destinations
              language={language}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onBook={handleOpenBooking}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              previewMode={true}
              onViewAll={() => setView('destinations')}
            />
            <Packages
              language={language}
              currency={currency}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onBook={handleOpenBooking}
            />
            <Services language={language} />
            <Gallery language={language} />
            <Reviews language={language} />
            <Blog language={language} />
            <Faq language={language} />
            <Contact language={language} />
          </>
        )}

        {/* Individual virtual sub-pages */}
        {currentView === 'about' && (
          <div style={{ paddingTop: '80px' }}>
            <div style={{
              backgroundImage: 'linear-gradient(to right, var(--emerald-deep), #11261C)',
              color: '#FAF7F0',
              padding: '60px 8%',
              textAlign: 'center'
            }}>
              <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>{t.navAbout}</h1>
              <p style={{ fontSize: '1rem', color: 'rgba(250,247,240,0.6)', margin: 0 }}>{t.aboutSubtitle}</p>
            </div>
            <AboutMeknes language={language} />
          </div>
        )}

        {currentView === 'destinations' && (
          <div style={{ paddingTop: '80px' }}>
            <Destinations
              language={language}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onBook={handleOpenBooking}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}

        {currentView === 'packages' && (
          <div style={{ paddingTop: '80px' }}>
            <Packages
              language={language}
              currency={currency}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onBook={handleOpenBooking}
            />
          </div>
        )}

        {currentView === 'services' && (
          <div style={{ paddingTop: '80px' }}>
            <div style={{
              backgroundImage: 'linear-gradient(to right, var(--emerald-deep), #11261C)',
              color: '#FAF7F0',
              padding: '60px 8%',
              textAlign: 'center'
            }}>
              <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>{t.navServices}</h1>
              <p style={{ fontSize: '1rem', color: 'rgba(250,247,240,0.6)', margin: 0 }}>{t.servicesSubtitle}</p>
            </div>
            <Services language={language} />
          </div>
        )}

        {currentView === 'gallery' && (
          <div style={{ paddingTop: '80px' }}>
            <Gallery language={language} />
          </div>
        )}

        {currentView === 'blog' && (
          <div style={{ paddingTop: '80px' }}>
            <Blog language={language} />
          </div>
        )}

        {currentView === 'faq' && (
          <div style={{ paddingTop: '80px' }}>
            <Faq language={language} />
          </div>
        )}

        {currentView === 'contact' && (
          <div style={{ paddingTop: '80px' }}>
            <Contact language={language} />
          </div>
        )}

        {/* Custom detailed HTML page layouts for Privacy Policy */}
        {currentView === 'privacy' && (
          <div style={{ paddingTop: '100px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto', width: '88%' }} className="animate-fade-up">
            <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '24px', borderBottom: '2px solid var(--gold-royal)', paddingBottom: '16px' }}>
              Privacy Policy
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Last updated: July 24, 2026.
            </p>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', marginBottom: '12px', marginTop: '30px' }}>1. Scope of Privacy Commitment</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Meknes Luxury Travel operates under elite standards of confidentiality and client safety. This policy governs the nature of personal data collected during custom booking reservations, digital newsletter subscriptions, and private consulting inquiry logs.
            </p>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', marginBottom: '12px', marginTop: '30px' }}>2. Data Collection Protocols</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              We collect name, email address, telephone contact, and specialized travel details (e.g. accommodations selections, health indicators for hammam therapies, flight details) only when voluntarily supplied through our secure booking wizard interfaces.
            </p>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', marginBottom: '12px', marginTop: '30px' }}>3. Data Sovereignty & Protection</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Your private travel files are locked under high-grade security systems. We never sell, transfer, or rent database records to third-party advertising companies. Data shares are exclusively limited to verified local providers (e.g., private chauffeurs, Riad suites desks, historical tour curators) to fulfill your custom itineraries.
            </p>
          </div>
        )}

        {/* Custom detailed HTML page layouts for Terms and Conditions */}
        {currentView === 'terms' && (
          <div style={{ paddingTop: '100px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto', width: '88%' }} className="animate-fade-up">
            <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '24px', borderBottom: '2px solid var(--gold-royal)', paddingBottom: '16px' }}>
              Terms & Conditions
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Last updated: July 24, 2026.
            </p>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', marginBottom: '12px', marginTop: '30px' }}>1. Booking Reservations Agreements</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              By submitting a secure booking request through our digital portal and receiving a unique reservation reference code, you establish a preliminary booking request. Our private travel advisors will review transport capacity and suite availability before issuing final invoices.
            </p>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', marginBottom: '12px', marginTop: '30px' }}>2. Cancellation & Amendment Policies</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Bespoke travel configurations are subject to free cancellation up to 30 days prior to travel dates. Within 30 days, cancellations incur fees dictated by local providers contracts. Traveler insurance coverage must be acquired independently by client coordinates.
            </p>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', marginBottom: '12px', marginTop: '30px' }}>3. Limitation of Liability</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Meknes Luxury Travel operates as a curated travel agent, linking travelers to certified local operations. We are not responsible for delays, damage, or changes to flight and rail services, though our 24/7 concierge office will actively coordinate recovery protocols.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer language={language} setView={setView} />

      {/* Saved Favorites Drawer Sheet */}
      <FavoritesDrawer
        language={language}
        currency={currency}
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onBook={handleOpenBooking}
      />

      {/* Booking Flow Checkout Wizard */}
      {activeBookingItem && (
        <BookingModal
          language={language}
          currency={currency}
          item={activeBookingItem}
          onClose={handleCloseBooking}
        />
      )}

      {/* Cookie Consent banner */}
      <CookieConsent language={language} onOpenPrivacy={() => setView('privacy')} />

      {/* Luxury AI travel concierge */}
      <AIConcierge
        language={language}
        currency={currency}
        onBook={handleOpenBooking}
        setView={setView}
      />

    </div>
  );
};
export default App;
