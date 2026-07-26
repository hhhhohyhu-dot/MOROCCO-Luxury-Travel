import React, { useState } from 'react';
import { translations, type Language } from '../data/translations';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryProps {
  language: Language;
}

interface GalleryImage {
  id: string;
  url: string;
  category: 'medina' | 'architecture' | 'nature' | 'dining';
  title: { en: string; fr: string; ar: string };
  desc: { en: string; fr: string; ar: string };
}

export const Gallery: React.FC<GalleryProps> = ({ language }) => {
  const t = translations[language];
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images: GalleryImage[] = [
    {
      id: "img1",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Medina%2C_Meknes%2C_Morocco_-_panoramio.jpg/1280px-Medina%2C_Meknes%2C_Morocco_-_panoramio.jpg",
      category: "architecture",
      title: { en: "Bab Mansour Gates", fr: "Porte Bab Mansour", ar: "تفاصيل باب المنصور" },
      desc: { en: "Intricate green and gold Alawite zellij mosaic details.", fr: "Mosaïques de zellige or et vert de l'art alaouite.", ar: "تفاصيل الفسيفساء الذهبية والخضراء للبوابة التاريخية." }
    },
    {
      id: "img2",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Volubilis_Longshot_II.jpg/1280px-Volubilis_Longshot_II.jpg",
      category: "architecture",
      title: { en: "Volubilis Columns", fr: "Colonnes Romaines de Volubilis", ar: "أعمدة وليلي الرومانية" },
      desc: { en: "Ancient Roman ruins stretching over scenic Atlas hills.", fr: "Colonnes romaines s'élevant sur fond de collines de l'Atlas.", ar: "الأعمدة الرومانية الأثرية ترتفع في سماء جبال الأطلس." }
    },
    {
      id: "img3",
      url: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&w=1200&q=80",
      category: "medina",
      title: { en: "Medina Secret Alleys", fr: "Ruelles Secrètes de la Médina", ar: "أزقة المدينة القديمة" },
      desc: { en: "Centuries-old quiet residential corridors framed by heavy wooden doors.", fr: "Ruelles pavées centenaires encadrées de portes massives en cèdre.", ar: "ممرات سكنية عريقة وهادئة مؤطرة بأبواب خشبية أثرية." }
    },
    {
      id: "img4",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
      category: "architecture",
      title: { en: "Sahan Basin arches", fr: "Bassins des Écuries Royales", ar: "أقواس صهريج السواني" },
      desc: { en: "Ruined arches of Sultan Moulay Ismail's monumental stable projects.", fr: "Arches colossales des anciennes écuries impériales du sultan.", ar: "الأقواس والأسوار التاريخية لمشروع صهريج السواني." }
    },
    {
      id: "img5",
      url: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?auto=format&fit=crop&w=1200&q=80",
      category: "nature",
      title: { en: "Atlas Vineyard Foothills", fr: "Vignobles de l'Atlas", ar: "سفوح مزارع الكروم" },
      desc: { en: "Lush green grape terraces growing in volcanic fertile soils.", fr: "Coteaux verdoyants cultivés sur des sols volcaniques fertiles.", ar: "مدرجات الأعناب الخضراء التي تنمو في التربة البركانية الخصبة." }
    },
    {
      id: "img6",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Plateau_Yagour%2C_Agdal%2C_Morocco.jpg/1280px-Plateau_Yagour%2C_Agdal%2C_Morocco.jpg",
      category: "nature",
      title: { en: "Cedar Forest wilderness", fr: "Forêt de Cèdres Sauvage", ar: "غابات الأرز البرية" },
      desc: { en: "Gigantic old Atlas cedars home to wild Barbary macaques.", fr: "Cèdres de l'Atlas géants abritant les macaques berbères.", ar: "أشجار الأرز الضخمة في جبال الأطلس المتوسط موطن القردة البرية." }
    },
    {
      id: "img7",
      url: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80",
      category: "dining",
      title: { en: "Palace Tagine Banquets", fr: "Banquets de Gastronomie Riad", ar: "مأدبة الطاجين الملكي" },
      desc: { en: "Gourmet slow-stewed tagines presented in historic riad courts.", fr: "Tajines impériaux mijotés présentés dans un patio éclairé.", ar: "طواجن فاخرة مطهوة ببطء تقدم في أفنية الرياض الأثرية." }
    },
    {
      id: "img8",
      url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
      category: "dining",
      title: { en: "Bespoke Mint Tea Ceremonies", fr: "Cérémonie du Thé en Riad", ar: "طقوس تقديم الشاي المغربي" },
      desc: { en: "Fresh spearmint leaves poured high from traditional silver teapots.", fr: "Thé infusé à la menthe fraîche servi dans des théières ciselées.", ar: "صب شاي النعناع الساخن من الأباريق الفضية التقليدية." }
    },
    {
      id: "img9",
      url: "https://upload.wikimedia.org/wikipedia/commons/3/36/Cascades_d%27Ouzoud.jpg",
      category: "nature",
      title: { en: "Ouzoud Waterfalls", fr: "Cascades d'Ouzoud", ar: "شلالات أوزود" },
      desc: { en: "Breathtaking North Africa's highest water cascades tumbling down cliffs.", fr: "Les plus hautes cascades d'Afrique du Nord tombant des falaises.", ar: "شلالات أوزود الشاهقة تنحدر في منظر طبيعي مهيب." }
    },
    {
      id: "img10",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Playa_de_Lagzira_en_Sidi_Ifni_%28Marruecos%29.jpg/1280px-Playa_de_Lagzira_en_Sidi_Ifni_%28Marruecos%29.jpg",
      category: "nature",
      title: { en: "Legzira Beach Arch", fr: "Arche de Legzira", ar: "أقواس الكزيرة" },
      desc: { en: "Colossal red sandstone natural arches carved by ocean waves.", fr: "Arches colossales de grès rouge sculptées par les vagues de l'océan.", ar: "أقواس حجرية طبيعية حمراء مذهلة على شاطئ الكزيرة الأطلسي." }
    },
    {
      id: "img11",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Paradise_Valley_palmiers.jpg/1280px-Paradise_Valley_palmiers.jpg",
      category: "nature",
      title: { en: "Paradise Valley Oasis", fr: "Oasis de Paradise Valley", ar: "واحة وادي الجنة" },
      desc: { en: "Quiet palm-lined gorges and turquoise natural pools near Agadir.", fr: "Gorges bordées de palmiers et bassins turquoise près d'Agadir.", ar: "وادي الجنة الغني بأشجار النخيل والبرك المائية الفيروزية الصافية." }
    },
    {
      id: "img12",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Dakhla%2C_Western_Sahara_%2811%29.jpg/1280px-Dakhla%2C_Western_Sahara_%2811%29.jpg",
      category: "nature",
      title: { en: "Dakhla Coastal Lagoon", fr: "Lagune de Dakhla", ar: "شواطئ مدينة الداخلة" },
      desc: { en: "Pristine white sand dunes meeting the turquoise Atlantic waters.", fr: "Dunes de sable blanc immaculées rejoignant l'océan turquoise.", ar: "تلاقي كثبان الرمال البيضاء بمياه المحيط الأطلسي الفيروزية." }
    },
    {
      id: "img13",
      url: "https://upload.wikimedia.org/wikipedia/commons/7/71/Neige_ifrane.jpg",
      category: "nature",
      title: { en: "Ifrane Winter Snow", fr: "Neige Hivernale à Ifrane", ar: "ثلوج مدينة إفران" },
      desc: { en: "Sloped roofs and streets covered in clean mountain snow.", fr: "Toits pointus et rues recouverts de neige fraîche en hiver.", ar: "الشوارع والأسقف الأوروبية مغطاة بثلوج الشتاء بمدينة إفران." }
    },
    {
      id: "img14",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Al_Hoceima_Quemado.jpg/1280px-Al_Hoceima_Quemado.jpg",
      category: "nature",
      title: { en: "Al Hoceima Mediterranean Bay", fr: "Baie d'Al Hoceima", ar: "خليج الحسيمة" },
      desc: { en: "Scenic turquoise waters of Quemado beach under rocky cliffs.", fr: "Eaux turquoise de la plage de Quemado sous des falaises rocheuses.", ar: "مياه شاطئ كيمادو الفيروزية تحت الجروف الصخرية." }
    }
  ];

  const filteredImages = selectedCat === 'all'
    ? images
    : images.filter(img => img.category === selectedCat);

  const categories = [
    { id: 'all', label: t.all },
    { id: 'medina', label: language === 'ar' ? 'المدينة القديمة' : language === 'fr' ? 'Médina' : 'Medina' },
    { id: 'architecture', label: t.architecture },
    { id: 'nature', label: t.nature },
    { id: 'dining', label: t.dining }
  ];

  const openLightbox = (index: number) => {
    // Find index in the filtered list
    setLightboxIndex(index);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
          {t.galleryTitle}
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: 'var(--text-primary)',
          lineHeight: '1.2'
        }}>
          {t.gallerySubtitle}
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

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            style={{
              padding: '10px 20px',
              border: '1px solid',
              borderColor: selectedCat === cat.id ? 'var(--gold-royal)' : 'var(--border-color)',
              borderRadius: '30px',
              background: selectedCat === cat.id ? 'var(--gold-royal)' : 'var(--bg-secondary)',
              color: selectedCat === cat.id ? '#FFF' : 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: selectedCat === cat.id ? '600' : '400',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry-Style Grid */}
      <motion.div 
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="masonry-grid"
      >
        <AnimatePresence>
          {filteredImages.map((img, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={img.id}
              onClick={() => openLightbox(index)}
              className="glass-card"
              style={{
                cursor: 'pointer',
                position: 'relative',
                height: '320px',
                overflow: 'hidden'
              }}
            >
              <img
                src={img.url}
                alt={img.title[language]}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.8s ease' }}
                className="gallery-item-image"
              />
              
              {/* Dark overlay with info displayed on hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(5,14,10,0.85) 100%)',
                opacity: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '24px',
                transition: 'opacity 0.4s ease'
              }} className="gallery-overlay">
                <span style={{ color: 'var(--gold-royal)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                  {img.category}
                </span>
                <h3 style={{ color: '#FFF', fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '4px' }}>
                  {img.title[language]}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', margin: 0 }}>
                  {img.desc[language]}
                </p>
                <Maximize2 size={16} style={{ position: 'absolute', top: '20px', right: '20px', color: '#FAF7F0' }} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(5, 14, 10, 0.95)',
            zIndex: 1200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#FFF',
              zIndex: 10
            }}
          >
            <X size={20} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '24px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#FFF',
              zIndex: 10
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '85%',
              maxHeight: '75vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <img
              src={filteredImages[lightboxIndex].url}
              alt={filteredImages[lightboxIndex].title[language]}
              style={{
                maxWidth: '100%',
                maxHeight: '65vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}
            />
            
            <div style={{ textAlign: 'center', color: '#FAF7F0', maxWidth: '600px' }}>
              <span style={{ color: 'var(--gold-royal)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {filteredImages[lightboxIndex].category}
              </span>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginTop: '4px', marginBottom: '8px' }}>
                {filteredImages[lightboxIndex].title[language]}
              </h3>
              <p style={{ color: 'rgba(250,247,240,0.6)', fontSize: '0.9rem', margin: 0 }}>
                {filteredImages[lightboxIndex].desc[language]}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '24px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#FFF',
              zIndex: 10
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <style>{`
        .glass-card:hover .gallery-overlay {
          opacity: 1 !important;
        }
        .glass-card:hover .gallery-item-image {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
};
