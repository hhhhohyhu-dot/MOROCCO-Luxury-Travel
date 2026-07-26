import React, { useState } from 'react';
import { faqData } from '../data/faqData';
import { translations, type Language } from '../data/translations';
import { Search, ChevronDown, HelpCircle, X } from 'lucide-react';

interface FaqProps {
  language: Language;
}

export const Faq: React.FC<FaqProps> = ({ language }) => {
  const t = translations[language];
  const [searchVal, setSearchVal] = useState("");
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("all");

  const groups = [
    { id: 'all', label: t.all },
    { id: 'logistics', label: language === 'ar' ? 'الخدمات اللوجستية والوصول' : language === 'fr' ? 'Accès & Logistique' : 'Logistics & Entry' },
    { id: 'culture', label: language === 'ar' ? 'العادات والتقاليد' : language === 'fr' ? 'Culture & Protocoles' : 'Culture & Rules' },
    { id: 'packages', label: language === 'ar' ? 'الحجوزات والعروض' : language === 'fr' ? 'Formules & Réservations' : 'Packages & Booking' },
    { id: 'health', label: language === 'ar' ? 'الصحة والسلامة' : language === 'fr' ? 'Santé & Sécurité' : 'Health & Safety' }
  ];

  // Filtering
  const filteredFaqs = faqData.filter((item) => {
    const matchesSearch =
      item.question[language].toLowerCase().includes(searchVal.toLowerCase()) ||
      item.answer[language].toLowerCase().includes(searchVal.toLowerCase());
    
    const matchesGroup = selectedGroup === 'all' || item.category === selectedGroup;

    return matchesSearch && matchesGroup;
  });

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
          {t.faqTitle}
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: 'var(--text-primary)',
          lineHeight: '1.2'
        }}>
          {t.faqSubtitle}
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

      {/* Filters & Search Inputs */}
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
            placeholder={language === 'ar' ? 'ابحث في الأسئلة الشائعة...' : language === 'fr' ? 'Rechercher des questions...' : 'Search FAQs...'}
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

        {/* Categories Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              style={{
                padding: '10px 20px',
                border: '1px solid',
                borderColor: selectedGroup === group.id ? 'var(--gold-royal)' : 'var(--border-color)',
                borderRadius: '30px',
                background: selectedGroup === group.id ? 'var(--gold-royal)' : 'var(--bg-secondary)',
                color: selectedGroup === group.id ? '#FFF' : 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: selectedGroup === group.id ? '600' : '400',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
            >
              {group.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordions Stack */}
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {filteredFaqs.map((item) => {
          const isOpen = activeFaqId === item.id;
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                transition: 'var(--transition-smooth)'
              }}
              className="faq-accordion-item"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFaq(item.id)}
                style={{
                  width: '100%',
                  padding: '24px',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  fontWeight: '500',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <HelpCircle size={18} style={{ color: 'var(--gold-royal)', flexShrink: 0 }} />
                  <span style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>{item.question[language]}</span>
                </div>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    color: 'var(--text-secondary)',
                    flexShrink: 0
                  }}
                />
              </button>

              {/* Answer Content Panel */}
              <div style={{
                maxHeight: isOpen ? '250px' : '0',
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                padding: isOpen ? '0 24px 24px 54px' : '0 24px 0 54px',
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: '1.6'
              }}>
                <p style={{ margin: 0, textAlign: language === 'ar' ? 'right' : 'left' }}>
                  {item.answer[language]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
