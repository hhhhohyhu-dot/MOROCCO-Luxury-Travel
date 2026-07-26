import React, { useState } from 'react';
import { translations, type Language } from '../data/translations';
import { BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

interface AboutMeknesProps {
  language: Language;
}

export const AboutMeknes: React.FC<AboutMeknesProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'culture' | 'logistics'>('history');
  const t = translations[language];

  // Detailed paragraphs for local copy
  const contentMap = {
    history: {
      en: [
        {
          title: "Imperial Dynasties Heritage",
          text: "Morocco's history is written in the stone of its four imperial capitals: Marrakech, Fes, Meknes, and Rabat. From the medieval Idrisid founders in Fes to the grand Alawite expansions, each dynasty left architectural monuments, colossal city walls, and grand palaces."
        },
        {
          title: "UNESCO World Heritage Horizon",
          text: "Morocco possesses nine UNESCO World Heritage sites, including the ancient Medina of Fes, the historic core of Marrakech, the archaeological ruins of Roman Volubilis, and the monumental capital gates of Meknes and Rabat."
        },
        {
          title: "Ancient Roman Antiquity",
          text: "Long before the Alawite kings, North Africa was Rome's primary grain basket. Volubilis stands as the finest Roman outpost in the region, featuring majestic triumphal arches, thermal baths, and gorgeous mosaic floors preserving Greek and Roman mythological scenes."
        }
      ],
      fr: [
        {
          title: "Héritage des Dynasties Impériales",
          text: "L'histoire du Maroc est gravée dans la pierre de ses quatre capitales impériales : Marrakech, Fès, Meknès et Rabat. Des fondateurs Idrissides médiévaux de Fès aux extensions de la dynastie Alaouite, chaque règne a laissé des remparts colossaux et des palais somptueux."
        },
        {
          title: "Patrimoine Mondial de l'UNESCO",
          text: "Le Maroc compte neuf sites classés au patrimoine mondial de l'UNESCO, dont la médina historique de Fès, le cœur vibrant de Marrakech, les ruines romaines de Volubilis et les portes monumentales de Meknès et Rabat."
        },
        {
          title: "Antiquité Romaine",
          text: "Bien avant les rois alaouites, l'Afrique du Nord était le grenier à blé de Rome. Volubilis témoigne de cette grandeur antique, abritant des arcs de triomphe, des basiliques et des mosaïques représentant des mythes romains et grecs."
        }
      ],
      ar: [
        {
          title: "إرث السلالات الإمبراطورية",
          text: "يُكتب تاريخ المغرب في أسوار عواصمه الإمبراطورية الأربع: مراكش، فاس، مكناس، والرباط. من المؤسسين الأدارسة في فاس إلى التوسعات العلوية الكبرى، تركت كل سلالة آثاراً معمارية وقصوراً مهيبة وقلاعاً شامخة."
        },
        {
          title: "أفق التراث العالمي لليونسكو",
          text: "يمتلك المغرب تسعة مواقع مدرجة ضمن التراث العالمي لليونسكو، بما في ذلك المدينة العتيقة لفاس، القلب التاريخي لمراكش، الآثار الرومانية في وليلي، والبوابات الملكية الكبرى في مكناس والرباط."
        },
        {
          title: "العصور الرومانية القديمة",
          text: "قبل قرون من قيام الدول الإمبراطورية الإسلامية، كانت شمال إفريقيا سلة الغذاء الرئيسية لروما. وتقف وليلي كأفضل موقع أثري روماني في المنطقة يضم أقواس النصر واللوحات الفسيفسائية الأسطورية."
        }
      ]
    },
    culture: {
      en: [
        {
          title: "Imperial Gastronomy & Spices",
          text: "Moroccan cooking is celebrated worldwide for its balance of sweet-and-savory spices. Slow-cooked earthenware tagines infused with wild saffron, sweet caramelized plums, toasted almonds, and hand-rolled couscous are regional culinary treasures."
        },
        {
          title: "Sufi Mysticism & Harmonies",
          text: "Morocco possesses a deep spiritual footprint as the capital of North African Sufism. The historical courtyards of Fes and Meknes host annual Sufi music festivals, where participants gather to recite mystical poetry accompanied by lutes, flutes, and hand drums."
        },
        {
          title: "Medina Crafts & Guilds",
          text: "Artisans in Medina souks preserve unique ancestral guilds. From Marrakech's leather tanners and carpet weavers to Meknes' rare silver damascene metalworkers, every region has distinct craft traditions passed down through generations."
        }
      ],
      fr: [
        {
          title: "Gastronomie Impériale & Épices",
          text: "La cuisine marocaine est renommée mondialement pour son équilibre subtil entre sucré et salé. Les tajines cuits lentement agrémentés de miel sauvage, de pruneaux caramélisés et de safran pur sont de véritables trésors gastronomiques."
        },
        {
          title: "Mysticisme Soufi & Harmonies",
          text: "Le Maroc possède une empreinte spirituelle forte en tant que berceau du soufisme maghrébin. Les palais historiques accueillent chaque année des veillées de chants mystiques, alliant poésie sacrée, luths et flûtes ney."
        },
        {
          title: "Artisanat & Corporations des Médinas",
          text: "Les artisans des souks perpétuent des corporations ancestrales. Du tannage du cuir à Marrakech au tissage de tapis dans le Moyen Atlas, en passant par la damasquinerie de Meknès, chaque région possède ses traditions uniques."
        }
      ],
      ar: [
        {
          title: "المطبخ الإمبراطوري والتوابل الأصيلة",
          text: "يشتهر المطبخ المغربي عالمياً بتوازنه الفريد بين المذاق الحلو والمالح. وتعتبر طواجن الفخار المطهوة ببطء والممزوجة بالزعفران الحر، البرقوق المعسل، واللوز المحمص من الكنوز الغذائية للبلاد."
        },
        {
          title: "التصوف والألحان الروحية",
          text: "يحتضن المغرب إرثاً روحياً عميقاً كأحد مراكز التصوف في شمال إفريقيا. وتستضيف القصور التاريخية في فاس ومكناس مواسم سنوية للموسيقى الصوفية، حيث يجتمع المُنشدون لترتيل قصائد العشق الإلهي."
        },
        {
          title: "حرف وصناعات المدينة القديمة",
          text: "يحافظ حرفيو المدينة على نقابات وصناعات عتيقة. من دباغة الجلود في مراكش ونساجي السجاد بالأطلس إلى صناعة الدمشقية بمكناس، تمتلك كل منطقة تقاليد حرفية فريدة متوارثة عبر الأجيال."
        }
      ]
    },
    logistics: {
      en: [
        {
          title: "Premium Ground Connections",
          text: "Morocco possesses advanced travel corridors, including the Al Boraq high-speed train connecting Tangier, Rabat, and Casablanca. Chauffeur transfers in Mercedes V-Class vehicles are available for seamless travel between imperial cities and remote desert dunes."
        },
        {
          title: "Safety, Security & Welcome",
          text: "Morocco is highly stable and safe for international tourists. While Medinas are busy and colorful, a friendly 'La, Shukran' (No, thank you) is all it takes to browse peacefully. Official licensed guides are recommended for city historical tours."
        },
        {
          title: "Practical Escapes Details",
          text: "The currency is the Moroccan Dirham (MAD). While luxury riads accept credit cards, cash is preferred for local souk stalls. Languages spoken are Moroccan Arabic (Darija), Berber dialects, and French. English is spoken by all luxury hotel staffs."
        }
      ],
      fr: [
        {
          title: "Connexions Terrestres de Prestige",
          text: "Le Maroc dispose d'un réseau ferroviaire moderne avec le TGV Al Boraq reliant Tanger, Rabat et Casablanca. Nos transferts en Mercedes Classe V vous conduisent confortablement des grandes cités aux dunes sahariennes."
        },
        {
          title: "Sécurité & Accueil Chaleureux",
          text: "Le Maroc est un pays stable et sûr pour les voyageurs. Bien que les médinas soient animées, un simple 'La, Shukran' (Non, merci) poli vous permettra de flâner tranquillement. Des guides officiels sont recommandés."
        },
        {
          title: "Détails Pratiques pour l'Escapade",
          text: "La monnaie est le Dirham (MAD). L'argent liquide est à privilégier dans les souks, la carte dans les hôtels. On y parle la Darija, le berbère et le français. L'anglais est parlé dans tous les établissements haut de gamme."
        }
      ],
      ar: [
        {
          title: "التنقلات والاتصال البري الممتاز",
          text: "يمتلك المغرب مسارات تنقل متطورة، بما في ذلك قطار 'البراق' فائق السرعة الذي يربط طنجة والرباط والدار البيضاء، بالإضافة إلى توفر سيارات مرسيدس الفاخرة مع سائق خاص للتنقل بسلاسة بين المدن والصحراء."
        },
        {
          title: "الأمان، السلامة، والترحاب المغربي",
          text: "يعتبر المغرب بلداً مستقراً وآمناً للغاية للسياح. ورغم حيوية وازدحام الأسواق، يكفي قول 'لا، شكراً' بلطف لتصفح المحلات بهدوء. ويوصى بالاستعانة بمرشدين مرخصين ومحليين لمعرفة أسرار المدن التاريخية."
        },
        {
          title: "تفاصيل السفر العملية والمعلومات",
          text: "العملة المحلية هي الدرهم المغربي (MAD). يفضل الدفع نقداً في الأسواق، بينما تقبل البطاقات في الفنادق الفاخرة. اللغات المستخدمة هي الدارجة المغربية، الأمازيغية، والفرنسية، وتتحدث طواقم الخدمة بالفنادق الإنجليزية بطلاقة."
        }
      ]
    }
  };

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Title block */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }} className="animate-fade-up">
        <span style={{
          color: 'var(--gold-royal)',
          textTransform: 'uppercase',
          fontSize: '0.85rem',
          fontWeight: '600',
          letterSpacing: '0.2em',
          display: 'block',
          marginBottom: '12px'
        }}>
          {t.aboutTitle}
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: 'var(--text-primary)',
          lineHeight: '1.2'
        }}>
          {t.aboutSubtitle}
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
        gap: '48px',
        alignItems: 'center'
      }} className="about-grid-container">
        
        {/* Left Column: Image Mosaic */}
        <div className="about-image-column animate-scale-in" style={{ position: 'relative' }}>
          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '8px solid var(--bg-primary)',
            position: 'relative',
            zIndex: 2
          }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Bahia_Palace_large_court.jpg/1280px-Bahia_Palace_large_court.jpg"
              alt="Morocco Imperial Mosaic Detail"
              style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
            />
          </div>
          
          {/* Floating Luxury Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '-20px',
              zIndex: 3,
              background: 'var(--emerald-deep)',
              color: '#FAF7F0',
              padding: '16px 28px',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            className="floating-about-tag"
          >
            <Sparkles size={20} style={{ color: 'var(--gold-royal)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)' }}>UNESCO Status</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', fontFamily: 'var(--font-serif)' }}>Heritage Protected</span>
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Magazine Narrative */}
        <div className="about-text-column animate-fade-up">
          {/* Tab buttons */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '32px',
            gap: '16px'
          }}>
            <button
              onClick={() => setActiveTab('history')}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 16px 12px 0',
                color: activeTab === 'history' ? 'var(--gold-royal)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontWeight: activeTab === 'history' ? '600' : '400',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                borderBottom: activeTab === 'history' ? '2px solid var(--gold-royal)' : '2px solid transparent',
                transition: 'var(--transition-smooth)'
              }}
            >
              <BookOpen size={14} style={{ marginRight: '6px', display: 'inline' }} />
              {language === 'ar' ? 'التاريخ والتراث' : language === 'fr' ? 'Histoire & Patrimoine' : 'History & Heritage'}
            </button>
            
            <button
              onClick={() => setActiveTab('culture')}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 16px',
                color: activeTab === 'culture' ? 'var(--gold-royal)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontWeight: activeTab === 'culture' ? '600' : '400',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                borderBottom: activeTab === 'culture' ? '2px solid var(--gold-royal)' : '2px solid transparent',
                transition: 'var(--transition-smooth)'
              }}
            >
              <Sparkles size={14} style={{ marginRight: '6px', display: 'inline' }} />
              {language === 'ar' ? 'الثقافة والطهي' : language === 'fr' ? 'Culture & Gastronomie' : 'Culture & Dining'}
            </button>

            <button
              onClick={() => setActiveTab('logistics')}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 16px',
                color: activeTab === 'logistics' ? 'var(--gold-royal)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontWeight: activeTab === 'logistics' ? '600' : '400',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                borderBottom: activeTab === 'logistics' ? '2px solid var(--gold-royal)' : '2px solid transparent',
                transition: 'var(--transition-smooth)'
              }}
            >
              <ShieldCheck size={14} style={{ marginRight: '6px', display: 'inline' }} />
              {language === 'ar' ? 'إرشادات عملية' : language === 'fr' ? 'Pratiques & Logistique' : 'Travel Logistics'}
            </button>
          </div>

          {/* Active Tab Narrative Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {contentMap[activeTab][language].map((paragraph, index) => (
              <div key={index} style={{
                paddingLeft: language === 'ar' ? '0' : '20px',
                paddingRight: language === 'ar' ? '20px' : '0',
                borderLeft: language === 'ar' ? 'none' : '3px solid var(--gold-royal)',
                borderRight: language === 'ar' ? '3px solid var(--gold-royal)' : 'none',
                transition: 'var(--transition-smooth)'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-serif)'
                }}>
                  {paragraph.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  {paragraph.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media(min-width: 1024px) {
          .about-grid-container {
            grid-template-columns: 1.1fr 1.3fr !important;
            gap: 72px !important;
          }
        }
        @media(max-width: 768px) {
          .floating-about-tag {
            left: 10px !important;
            bottom: 10px !important;
            padding: 10px 18px !important;
          }
        }
      `}</style>
    </section>
  );
};
