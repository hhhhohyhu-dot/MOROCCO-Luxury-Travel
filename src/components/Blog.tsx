import React, { useState } from 'react';
import { blogData, type BlogPost } from '../data/blogData';
import { translations, type Language } from '../data/translations';
import { Search, Clock, Calendar, X, ArrowLeft, BookOpen } from 'lucide-react';

interface BlogProps {
  language: Language;
}

export const Blog: React.FC<BlogProps> = ({ language }) => {
  const t = translations[language];
  const [searchVal, setSearchVal] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', label: t.all },
    { id: 'dining', label: t.dining },
    { id: 'history', label: t.history },
    { id: 'culture', label: t.culture },
    { id: 'shopping', label: language === 'ar' ? 'التسوق' : language === 'fr' ? 'Shopping' : 'Shopping' },
    { id: 'safety', label: language === 'ar' ? 'الأمان' : language === 'fr' ? 'Sécurité' : 'Safety' },
    { id: 'logistics', label: language === 'ar' ? 'الخدمات اللوجستية' : language === 'fr' ? 'Logistique' : 'Logistics' }
  ];

  // Filtering
  const filteredArticles = blogData.filter((post) => {
    const matchesSearch =
      post.title[language].toLowerCase().includes(searchVal.toLowerCase()) ||
      post.summary[language].toLowerCase().includes(searchVal.toLowerCase()) ||
      post.content[language].toLowerCase().includes(searchVal.toLowerCase());
    
    const matchesCat = selectedCat === 'all' || post.category === selectedCat;

    return matchesSearch && matchesCat;
  });

  return (
    <section id="blog" className="section-padding" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
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
          {t.blogTitle}
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: 'var(--text-primary)',
          lineHeight: '1.2'
        }}>
          {t.blogSubtitle}
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

      {/* Filter and Search controls */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
        marginBottom: '48px'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
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
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '48px', borderRadius: '30px' }}
          />
          {searchVal && (
            <button
              onClick={() => setSearchVal('')}
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

        {/* Categories */}
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center'
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
      </div>

      {/* Grid of Articles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '30px'
      }}>
        {filteredArticles.map((post) => (
          <article
            key={post.id}
            className="glass-card animate-scale-in"
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            {/* Image Box */}
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={post.image}
                alt={post.title[language]}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                className="blog-card-image"
              />
              <span style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'var(--emerald-deep)',
                color: '#FFF',
                fontSize: '0.7rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                padding: '5px 12px',
                borderRadius: '4px'
              }}>
                {post.category}
              </span>
            </div>

            {/* Texts */}
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {post.readTime[language]}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  lineHeight: '1.3'
                }}>
                  {post.title[language]}
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
                  {post.summary[language]}
                </p>
              </div>

              <button
                onClick={() => setActiveArticle(post)}
                className="btn-outline"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '0.8rem',
                  justifyContent: 'center'
                }}
              >
                <BookOpen size={14} />
                {t.readMore}
              </button>
            </div>

          </article>
        ))}
      </div>

      {/* Slide-out Full Article Reader Drawer */}
      {activeArticle && (
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
          justifyContent: 'flex-end', // slide-out from right effect
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border-color)',
              width: '100%',
              maxWidth: '650px',
              height: '100vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Header Close triggers */}
            <div style={{
              padding: '20px 6%',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--bg-secondary)',
              position: 'sticky',
              top: 0,
              zIndex: 10
            }}>
              <button
                onClick={() => setActiveArticle(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  fontWeight: '600'
                }}
              >
                <ArrowLeft size={16} />
                Back to Blog
              </button>
              
              <button
                onClick={() => setActiveArticle(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Banner photo */}
            <div style={{ height: '280px', flexShrink: 0 }}>
              <img
                src={activeArticle.image}
                alt={activeArticle.title[language]}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Document contents */}
            <div style={{ padding: '40px 6%', flex: 1 }}>
              <span style={{
                backgroundColor: 'var(--gold-royal)',
                color: '#FFF',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                fontWeight: '600',
                padding: '6px 14px',
                borderRadius: '4px',
                display: 'inline-block',
                marginBottom: '16px'
              }}>
                {activeArticle.category}
              </span>

              <h2 style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-primary)',
                lineHeight: '1.2',
                marginBottom: '16px'
              }}>
                {activeArticle.title[language]}
              </h2>

              <div style={{ display: 'flex', gap: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)', marginBottom: '32px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} />
                  {activeArticle.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} />
                  {activeArticle.readTime[language]}
                </span>
              </div>

              {/* Formatted body paragraphs */}
              <div style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                whiteSpace: 'pre-wrap'
              }} className="article-body-p">
                {activeArticle.content[language]}
              </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .glass-card:hover .blog-card-image {
          transform: scale(1.06);
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};
