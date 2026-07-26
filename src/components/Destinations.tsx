import React, { useState } from 'react';
import { destinationsData, type Destination } from '../data/destinationsData';
import { translations, type Language } from '../data/translations';
import { Heart, Search, Clock, Calendar, Sparkles, X, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DestinationsProps {
  language: Language;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onBook: (item: Destination) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  previewMode?: boolean;
  onViewAll?: () => void;
}

const EXTRA_DESTINATION_IMAGES: Record<string, string[]> = {
  "marrakech-bahia": [
    "https://images.unsplash.com/photo-1597212618440-806262de4fe6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80"
  ],
  "fes-medina": [
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1605701243072-27786b53f653?auto=format&fit=crop&w=1200&q=80"
  ],
  "casablanca-mosque": [
    "https://images.unsplash.com/photo-1553508778-50cf82bc038f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80"
  ],
  "rabat-udayas": [
    "https://images.unsplash.com/photo-1559586616-3db748a7354b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80"
  ],
  "chefchaouen-blue": [
    "https://images.unsplash.com/photo-1554072675-66da57dba247?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
  ],
  "sahara-merzouga": [
    "https://images.unsplash.com/photo-1542332213-9b5a5a3fda35?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80"
  ],
  "essaouira-coast": [
    "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
  ],
  "meknes-mansour": [
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80"
  ],
  "volubilis-ruins": [
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1608958416806-cd85e4bf51a2?auto=format&fit=crop&w=1200&q=80"
  ],
  "prison-qara": [
    "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?auto=format&fit=crop&w=1200&q=80"
  ],
  "ait-ben-haddou": [
    "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1489493887462-402b72644d55?auto=format&fit=crop&w=1200&q=80"
  ],
  "atlas-mountains": [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80"
  ],
  "tangier-medina": [
    "https://images.unsplash.com/photo-1568849676085-51415703900f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=1200&q=80"
  ],
  "agadir-beach": [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80"
  ],
  "ouarzazate-kasbah": [
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80"
  ],
  "dakhla-lagoon": [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
  ],
  "ifrane-lion": [
    "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80"
  ],
  "al-hoceima-beach": [
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1473116763269-25541079c6e3?auto=format&fit=crop&w=1200&q=80"
  ],
  "tetouan-medina": [
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?auto=format&fit=crop&w=1200&q=80"
  ],
  "asilah-citadel": [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"
  ],
  "ouzoud-waterfalls": [
    "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
  ],
  "paradise-valley": [
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80"
  ],
  "todra-gorge": [
    "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=1200&q=80"
  ],
  "dades-valley": [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80"
  ],
  "legzira-beach": [
    "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80"
  ]
};

export const Destinations: React.FC<DestinationsProps> = ({
  language,
  favorites,
  toggleFavorite,
  onBook,
  searchQuery,
  setSearchQuery,
  previewMode = false,
  onViewAll
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDetailDest, setActiveDetailDest] = useState<Destination | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const t = translations[language];

  // Filters destinations based on search query & selected category
  const filteredDestinations = destinationsData.filter((dest) => {
    const matchesSearch =
      dest.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description[language].toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: t.all },
    { id: 'architecture', label: t.architecture },
    { id: 'history', label: t.history },
    { id: 'culture', label: t.culture },
    { id: 'nature', label: t.nature },
    { id: 'dining', label: t.dining }
  ];

  return (
    <section id="destinations" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Headings */}
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
          {t.destinationsTitle}
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: 'var(--text-primary)',
          lineHeight: '1.2'
        }}>
          {t.destinationsSubtitle}
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

      {/* Filter Controls (Search bar & Category buttons) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
        marginBottom: '48px'
      }}>
        {/* Search Input bar */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '480px'
        }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)'
          }} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{
              paddingLeft: '48px',
              borderRadius: '30px'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category switcher pills */}
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '10px 20px',
                border: '1px solid',
                borderColor: selectedCategory === cat.id ? 'var(--gold-royal)' : 'var(--border-color)',
                borderRadius: '30px',
                background: selectedCategory === cat.id ? 'var(--gold-royal)' : 'var(--bg-secondary)',
                color: selectedCategory === cat.id ? '#FFF' : 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: selectedCategory === cat.id ? '600' : '400',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid Cards */}
      <motion.div 
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px'
        }}
      >
        <AnimatePresence>
          {(previewMode ? filteredDestinations.slice(0, 6) : filteredDestinations).map((dest, index) => {
            const isLiked = favorites.includes(dest.id);
            return (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={dest.id}
                className="glass-card"
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                {/* Image box */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={dest.image}
                  alt={dest.name[language]}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s ease'
                  }}
                  className="dest-card-image"
                />
                
                {/* Dark luxury gradient on thumbnail */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)'
                }} />

                {/* Favorite Heart trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(dest.id);
                  }}
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
                  className="heart-btn-hover"
                >
                  <Heart size={18} fill={isLiked ? 'var(--gold-royal)' : 'none'} />
                </button>

                {/* Category tag label */}
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
                  borderRadius: '4px'
                }}>
                  {dest.category}
                </span>
              </div>

              {/* Text content area */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{
                    fontSize: '1.35rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--text-primary)',
                    marginBottom: '10px'
                  }}>
                    {dest.name[language]}
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {dest.description[language]}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setActiveDetailDest(dest);
                      setCurrentImageIndex(0);
                    }}
                    className="btn-outline"
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      fontSize: '0.8rem',
                      justifyContent: 'center'
                    }}
                  >
                    {t.viewDetails}
                  </button>
                  <button
                    onClick={() => onBook(dest)}
                    className="btn-gold"
                    style={{
                      padding: '10px 16px',
                      fontSize: '0.8rem',
                      justifyContent: 'center'
                    }}
                  >
                    {t.bookNow}
                  </button>
                </div>
              </div>
            </motion.article>
          );
          })}
        </AnimatePresence>
      </motion.div>

      {/* "Discover More" CTA — shown only in preview mode */}
      {previewMode && (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          {/* Teaser count line */}
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            marginBottom: '28px',
            letterSpacing: '0.02em'
          }}>
            {language === 'ar'
              ? `يتوفر ${destinationsData.length} وجهة فريدة — نعرض 6 فقط`
              : language === 'fr'
              ? `${destinationsData.length} destinations uniques disponibles — 6 affichées seulement`
              : `${destinationsData.length} unique destinations available — showing 6 only`
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onViewAll}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '18px 52px',
              background: 'linear-gradient(135deg, var(--gold-royal), #a87d30)',
              color: '#000',
              border: 'none',
              borderRadius: '50px',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 8px 30px var(--gold-glow), 0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            <Compass size={20} />
            {language === 'ar' ? 'اكتشف المزيد' : language === 'fr' ? 'Découvrir Plus' : 'Explore All Destinations'}
          </motion.button>
        </div>
      )}

      {/* Destination Detailed Drawer/Modal */}
      {activeDetailDest && (
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
              maxWidth: '900px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative'
            }}
            className="detail-modal-box"
          >
            {/* Close trigger button */}
            <button
              onClick={() => {
                setActiveDetailDest(null);
                setCurrentImageIndex(0);
              }}
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
                zIndex: 10,
                transition: 'var(--transition-smooth)'
              }}
              className="close-modal-hover"
            >
              <X size={20} />
            </button>

            {/* Top Large Banner with Image Carousel */}
            {(() => {
              const allImages = Array.from(new Set([
                activeDetailDest.image,
                ...(activeDetailDest.gallery || []),
                ...(EXTRA_DESTINATION_IMAGES[activeDetailDest.id] || [])
              ])).filter(Boolean);

              const handlePrev = (e: React.MouseEvent) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
              };

              const handleNext = (e: React.MouseEvent) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
              };

              return (
                <div style={{ height: '380px', position: 'relative', backgroundColor: '#050e0a', overflow: 'hidden' }}>
                  {/* Image Slides */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={allImages[currentImageIndex]}
                      alt={`${activeDetailDest.name[language]} - view ${currentImageIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}
                    />
                  </AnimatePresence>

                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 100%)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }} />

                  {/* Left Navigation Chevron */}
                  {allImages.length > 1 && (
                    <button
                      onClick={handlePrev}
                      style={{
                        position: 'absolute',
                        left: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.45)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFF',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                        zIndex: 3
                      }}
                      className="carousel-btn"
                    >
                      <ChevronLeft size={22} />
                    </button>
                  )}

                  {/* Right Navigation Chevron */}
                  {allImages.length > 1 && (
                    <button
                      onClick={handleNext}
                      style={{
                        position: 'absolute',
                        right: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.45)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFF',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                        zIndex: 3
                      }}
                      className="carousel-btn"
                    >
                      <ChevronRight size={22} />
                    </button>
                  )}

                  {/* Carousel Indicators / Dots */}
                  {allImages.length > 1 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: '8px',
                      zIndex: 3,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      backdropFilter: 'blur(6px)'
                    }}>
                      {allImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(idx);
                          }}
                          style={{
                            width: idx === currentImageIndex ? '20px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            backgroundColor: idx === currentImageIndex ? 'var(--gold-royal)' : 'rgba(255,255,255,0.5)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Title and Category info overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '6%',
                    right: '6%',
                    zIndex: 3,
                    pointerEvents: 'none'
                  }}>
                    <span style={{
                      backgroundColor: 'var(--gold-royal)',
                      color: '#FFF',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      display: 'inline-block',
                      marginBottom: '12px'
                    }}>
                      {activeDetailDest.category}
                    </span>
                    <h2 style={{
                      color: '#FFF',
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      fontFamily: 'var(--font-serif)',
                      textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                      margin: 0
                    }}>
                      {activeDetailDest.name[language]}
                    </h2>
                  </div>
                </div>
              );
            })()}

            {/* Inner Content Grid */}
            <div style={{ padding: '40px 6%' }} className="detail-modal-body">
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '40px'
              }} className="detail-modal-cols">
                
                {/* Main description column */}
                <div>
                  <p style={{
                    fontSize: '1.05rem',
                    color: 'var(--text-primary)',
                    lineHeight: '1.7',
                    marginBottom: '32px'
                  }}>
                    {activeDetailDest.description[language]}
                  </p>

                  <h3 style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Sparkles size={18} style={{ color: 'var(--gold-royal)' }} />
                    {t.highlights}
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 32px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {activeDetailDest.highlights[language].map((hl, i) => (
                      <li key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.95rem',
                        color: 'var(--text-secondary)'
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold-royal)' }} />
                        {hl}
                      </li>
                    ))}
                  </ul>

                  {/* Private Insider Tip Box */}
                  <div style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px dashed var(--gold-royal)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--gold-royal)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {t.travelTips}
                    </span>
                    <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                      "{activeDetailDest.travelTips[language]}"
                    </p>
                  </div>
                </div>

                {/* Practical info cards column */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  backgroundColor: 'var(--bg-primary)',
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  height: 'fit-content'
                }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Clock size={20} style={{ color: 'var(--gold-royal)', flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{t.visitingHours}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{activeDetailDest.visitingHours[language]}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Clock size={20} style={{ color: 'var(--gold-royal)', flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{t.duration}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{activeDetailDest.duration[language]}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Calendar size={20} style={{ color: 'var(--gold-royal)', flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{t.bestSeason}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{activeDetailDest.bestSeason[language]}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Compass size={20} style={{ color: 'var(--gold-royal)', flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Location (Coordinates)</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: '500', fontFamily: 'monospace' }}>
                        Lat: {activeDetailDest.coords.lat}, Lng: {activeDetailDest.coords.lng}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onBook(activeDetailDest);
                      setActiveDetailDest(null);
                      setCurrentImageIndex(0);
                    }}
                    className="btn-gold"
                    style={{
                      width: '100%',
                      marginTop: '16px',
                      justifyContent: 'center'
                    }}
                  >
                    Book Experience Tour
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .glass-card:hover .dest-card-image {
          transform: scale(1.08);
        }
        .carousel-btn:hover {
          background-color: var(--gold-royal) !important;
          color: #000 !important;
          transform: translateY(-50%) scale(1.1) !important;
        }
        @media(min-width: 768px) {
          .detail-modal-cols {
            grid-template-columns: 1.6fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
