import React, { useState, useEffect, useRef } from 'react';
import { type Language } from '../data/translations';
import { packagesData, type Package } from '../data/packagesData';
import { destinationsData, type Destination } from '../data/destinationsData';
import { Sparkles, X, Send, Compass, MessageSquare, ArrowRight, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIConciergeProps {
  language: Language;
  currency: string;
  onBook: (item: any) => void;
  setView: (view: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestedPackage?: Package;
  suggestedDestination?: Destination;
  isActionable?: boolean;
}

const EXCHANGE_RATES: { [key: string]: number } = {
  USD: 1.0,
  EUR: 0.92,
  MAD: 10.0,
  GBP: 0.77
};

const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  MAD: "د.م.",
  GBP: "£"
};

export const AIConcierge: React.FC<AIConciergeProps> = ({
  language,
  currency,
  onBook,
  setView
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isRTL = language === 'ar';

  // Dynamic localization dictionary for the AI Advisor
  const botTranslations = {
    en: {
      botName: "Al-Murshid AI",
      botTitle: "Moroccan Luxury Concierge",
      botStatus: "Online Advisor",
      inputPlaceholder: "Ask Al-Murshid about Morocco travel...",
      greeting: "Ahlan! I am Al-Murshid, your private Moroccan AI Concierge. I can help you design the perfect journey, suggest historical sites in Meknes, Fes or Marrakech, plan a Sahara desert trek, or book wellness retreats. How may I assist you today?",
      typing: "Al-Murshid is crafting a recommendation...",
      bookBtn: "Book Now",
      exploreBtn: "Explore",
      customBuilderChip: "Create Custom Package ✈️",
      quickChips: [
        "How to book a Sahara Tour? 🐪",
        "Tell me about Meknes & Volubilis history 🕌",
        "Recommend a wellness retreat 💆",
        "Traditional Moroccan cuisine 🍽️",
        "What are your top luxury services? ✨"
      ],
      notMatch: "I couldn't find a direct match in our pre-designed excursions for that keyword, but as your Moroccan Concierge, I highly recommend checking out our grand imperial tours or our custom builder! You can also search for cities like 'Meknes', 'Fes', 'Marrakech', or 'Sahara'."
    },
    fr: {
      botName: "Al-Murshid IA",
      botTitle: "Concierge de Prestige Marocain",
      botStatus: "Conseiller en ligne",
      inputPlaceholder: "Demandez à Al-Murshid pour un voyage au Maroc...",
      greeting: "Ahlan ! Je suis Al-Murshid, votre concierge privé marocain en IA. Je peux vous aider à concevoir le voyage parfait, vous suggérer des monuments historiques à Meknès, Fès ou Marrakech, organiser un trek au Sahara ou réserver une retraite de bien-être. Comment puis-je vous aider aujourd'hui ?",
      typing: "Al-Murshid rédige sa recommandation...",
      bookBtn: "Réserver",
      exploreBtn: "Explorer",
      customBuilderChip: "Créer un voyage sur mesure ✈️",
      quickChips: [
        "Comment réserver un séjour au Sahara ? 🐪",
        "Histoire de Meknès et Fès 🕌",
        "Recommander une retraite bien-être 💆",
        "Cuisine marocaine traditionnelle 🍽️",
        "Quels sont vos services de luxe ? ✨"
      ],
      notMatch: "Je n'ai pas trouvé de correspondance exacte dans nos excursions programmées pour ce mot-clé, mais en tant que votre concierge, je vous conseille vivement de découvrir nos circuits impériaux ou d'utiliser notre constructeur sur mesure ! Vous pouvez aussi rechercher des villes comme 'Meknès', 'Fès', 'Marrakech' ou 'Sahara'."
    },
    ar: {
      botName: "المرشد الذكي",
      botTitle: "المساعد السياحي المغربي الفاخر",
      botStatus: "مستشار متصل الآن",
      inputPlaceholder: "اسأل المرشد عن السفر للمغرب...",
      greeting: "أهلاً بك! أنا المرشد، مساعدك السياحي الشخصي في المغرب. يمكنني مساعدتك في تخطيط رحلتك الفاخرة، أو اقتراح معالم تاريخية في مكناس، فاس ومراكش، أو تنظيم رحلات سفاري في الصحراء، أو حجز منتجعات الاستجمام والرياضات. كيف يمكنني خدمتك اليوم؟",
      typing: "المرشد يكتب لك الآن...",
      bookBtn: "احجز الآن",
      exploreBtn: "استكشف",
      customBuilderChip: "صمم رحلتك المخصصة بنفسك ✈️",
      quickChips: [
        "كيف أحجز رحلة للصحراء؟ 🐪",
        "حدثني عن تاريخ مكناس ووليلي 🕌",
        "اقترح علي رحلة استجمام وعافية 💆",
        "المطبخ المغربي الأصيل 🍽️",
        "ما هي الخدمات الفاخرة المتوفرة؟ ✨"
      ],
      notMatch: "لم أجد نتيجة مطابقة تماماً في برامجنا الحالية لهذا المصطلح، ولكن بصفتي مرشدك الخاص، أنصحك بشدة بمشاهدة جولاتنا الإمبراطورية الكبرى أو استخدام مصمم الرحلات المخصصة! يمكنك أيضاً البحث عن مدن مثل 'مكناس'، 'فاس'، 'مراكش'، أو 'الصحراء'."
    }
  };

  const currentBotT = botTranslations[language] || botTranslations['en'];

  // Initialize greeting on mount
  useEffect(() => {
    setMessages([
      {
        id: 'initial-greeting',
        sender: 'bot',
        text: currentBotT.greeting,
        timestamp: new Date()
      }
    ]);
  }, [language]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setUnread(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const convertPrice = (usdAmount: number) => {
    const rate = EXCHANGE_RATES[currency] || 1.0;
    const converted = usdAmount * rate;
    return `${CURRENCY_SYMBOLS[currency]} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  // Keywords logic to respond dynamically
  const generateBotResponse = (userText: string) => {
    const textLower = userText.toLowerCase();
    
    // Default reply values
    let replyText = "";
    let suggestedPackage: Package | undefined = undefined;
    let suggestedDestination: Destination | undefined = undefined;

    // Search Database for matching destination or package
    const matchDest = destinationsData.find(d => {
      return d.name.en.toLowerCase().includes(textLower) ||
             d.name.fr.toLowerCase().includes(textLower) ||
             d.name.ar.includes(textLower) ||
             d.id.toLowerCase().includes(textLower);
    });

    const matchPkg = packagesData.find(p => {
      return p.name.en.toLowerCase().includes(textLower) ||
             p.name.fr.toLowerCase().includes(textLower) ||
             p.name.ar.includes(textLower) ||
             p.id.toLowerCase().includes(textLower);
    });

    if (matchPkg) {
      suggestedPackage = matchPkg;
    } else if (matchDest) {
      suggestedDestination = matchDest;
      // Try to find a matching package that goes with this destination
      if (matchDest.id.includes('sahara') || matchDest.id.includes('merzouga')) {
        suggestedPackage = packagesData.find(p => p.id === 'sahara-expedition');
      } else if (matchDest.id.includes('meknes') || matchDest.id.includes('fes') || matchDest.id.includes('volubilis')) {
        suggestedPackage = packagesData.find(p => p.id === 'imperial-odyssey');
      } else if (matchDest.id.includes('chefchaouen')) {
        suggestedPackage = packagesData.find(p => p.id === 'northern-coast');
      }
    }

    // Branching script response based on keywords
    if (textLower.includes('sahara') || textLower.includes('desert') || textLower.includes('merzouga') || textLower.includes('صحراء') || textLower.includes('رمال') || textLower.includes('dunes') || textLower.includes('chameau') || textLower.includes('camp') || textLower.includes('dune')) {
      replyText = language === 'ar' 
        ? "الصحراء الكبرى هي تجربة ساحرة لا تُنسى. تشمل رحلتنا الفاخرة للصحراء المبيت في خيام ملكية خاصة مجهزة بالكامل، وجولة على الجمال عند غروب الشمس، وحلقات موسيقى صوفية تحت النجوم."
        : language === 'fr'
        ? "Le désert du Sahara est une expérience magique inoubliable. Notre formule 'Expédition de Luxe au Désert du Sahara' comprend des tentes privées haut de gamme avec salles de bain attenantes, une randonnée à dos de chameau au coucher du soleil et des soirées d'astronomie soufie."
        : "The Sahara Desert is an unforgettable, magical experience. Our 'Sahara Desert Luxury Expedition' includes private luxury tents with en-suite baths, camel trekking at sunset, and traditional Sufi stargazing music circles.";
      
      if (!suggestedPackage) {
        suggestedPackage = packagesData.find(p => p.id === 'sahara-expedition');
      }
    } 
    else if (textLower.includes('meknes') || textLower.includes('volubilis') || textLower.includes('history') || textLower.includes('imperial') || textLower.includes('أثر') || textLower.includes('تاريخ') || textLower.includes('رومانية') || textLower.includes('مكناس') || textLower.includes('وليلي') || textLower.includes('impériales')) {
      replyText = language === 'ar' 
        ? "تاريخ المغرب غني وعريق للغاية. تأخذك رحلة 'ملحمة العواصم الإمبراطورية الكبرى' لاستكشاف أطلال وليلي الرومانية، وباب المنصور المهيب في مكناس، وأزقة فاس القديمة، وقصر الباهية بمراكش."
        : language === 'fr'
        ? "L'histoire du Maroc est incroyablement riche. Notre 'Grande Odyssée des Villes Impériales' vous emmène visiter les ruines romaines de Volubilis, la porte monumentale Bab Mansour à Meknès, les ruelles médiévales de Fès et le Palais de la Bahia à Marrakech."
        : "Morocco's history is incredibly rich. The 'Imperial Cities Grand Odyssey' covers Volubilis' historic Roman ruins, the grand Bab Mansour Gate in Meknes, the medieval alleyways of Fes, and Marrakech's Bahia Palace.";
      
      if (!suggestedPackage) {
        suggestedPackage = packagesData.find(p => p.id === 'imperial-odyssey');
      }
    } 
    else if (textLower.includes('fes') || textLower.includes('medina') || textLower.includes('tannery') || textLower.includes('chouara') || textLower.includes('فاس') || textLower.includes('دباغة')) {
      replyText = language === 'ar' 
        ? "فاس البالي هي أكبر منطقة حضرية خالية من السيارات في العالم، وتعود للقرن التاسع الميلادي. تشمل معالمها دار دباغة الشوارة، والمدرسة البوعنانية، وجامعة القرويين. يمكنك زيارتها عبر رحلة 'ملحمة العواصم الإمبراطورية الكبرى'."
        : language === 'fr'
        ? "Fès el-Bali est la plus grande zone piétonne au monde, datant du IXe siècle. Les points forts incluent la tannerie Chouara, la médersa Bou Inania et l'université Al-Qarawiyyin. Découvrez-les dans notre 'Grande Odyssée des Villes Impériales'."
        : "Fes el-Bali is the world's largest car-free urban area, dating back to the 9th century. Key highlights include the Chouara Tannery, Bou Inania Madrasa, and Al-Qarawiyyin University. Experience it via our 'Imperial Cities Grand Odyssey'.";
      
      if (!suggestedPackage) {
        suggestedPackage = packagesData.find(p => p.id === 'imperial-odyssey');
      }
    } 
    else if (textLower.includes('food') || textLower.includes('cook') || textLower.includes('dining') || textLower.includes('culinary') || textLower.includes('tagine') || textLower.includes('cuisine') || textLower.includes('déjeuner') || textLower.includes('dîner') || textLower.includes('طعام') || textLower.includes('طبخ') || textLower.includes('طاجين') || textLower.includes('غداء')) {
      replyText = language === 'ar' 
        ? "المطبخ المغربي مزيج رائع من التأثيرات الأمازيغية والعربية والمتوسطية. نقدم دروس طهي ملكية في القصور العتيقة وتذوق طعام خاص في شاتو روزلان. يمكنك إضافة هذه التجارب لبرنامجك المخصص!"
        : language === 'fr'
        ? "La cuisine marocaine mêle influences amazighes, arabes et méditerranéennes. Nous proposons des cours de cuisine impériale dans des palais et des dégustations au Château Roslane. Vous pouvez ajouter ces activités à votre voyage sur mesure !"
        : "Moroccan cuisine is a blend of Amazigh, Arab, and Mediterranean influences. We offer bespoke culinary classes in imperial palaces and sommelier wine tastings at Chateau Roslane. You can customize your itinerary to include these!";
      
      if (!suggestedPackage) {
        suggestedPackage = packagesData.find(p => p.id === 'imperial-odyssey');
      }
    } 
    else if (textLower.includes('hammam') || textLower.includes('spa') || textLower.includes('massage') || textLower.includes('wellness') || textLower.includes('relax') || textLower.includes('riad') || textLower.includes('حمام') || textLower.includes('استجمام') || textLower.includes('تدليك') || textLower.includes('صحة') || textLower.includes('عافية')) {
      replyText = language === 'ar' 
        ? "استعد نشاطك وعافيتك مع رحلة 'الرياضات الملكية والاستجمام'. استمتع بجلسات الحمام المغربي التقليدي بالطين، ومساج بزيت الأركان الدافئ، وجلسات يوغا هادئة في أفنية الرياض الهادئة."
        : language === 'fr'
        ? "Ressourcez-vous avec notre 'Retraite Bien-être & Riads Royaux'. Profitez de soins traditionnels au hammam, de massages à l'huile d'argan et de séances de yoga dans des patios paisibles."
        : "Rejuvenate with our 'Royal Riads & Wellness Retreat'. Enjoy private traditional hammam clay wrap therapies, hot argan oil massages, and calm yoga sessions in secluded courtyards.";
      
      if (!suggestedPackage) {
        suggestedPackage = packagesData.find(p => p.id === 'royal-sanctuary');
      }
    } 
    else if (textLower.includes('custom') || textLower.includes('builder') || textLower.includes('personalized') || textLower.includes('trip') || textLower.includes('itinerary') || textLower.includes('تصميم') || textLower.includes('تخصيص') || textLower.includes('برنامج') || textLower.includes('personnalisé') || textLower.includes('mesure')) {
      replyText = language === 'ar' 
        ? "برنامج تصميم الرحلات المخصصة يتيح لك اختيار عدد الأيام، فئة الإقامة، نوع المواصلات، والتجارب التي تفضلها. توجه إلى قسم باقات السفر لتصميم برنامجك الآن!"
        : language === 'fr'
        ? "Notre Constructeur de Voyage Sur Mesure vous permet de choisir votre nombre de jours, la catégorie d'hébergement, le transport et vos expériences. Faites défiler jusqu'à la section Formules pour concevoir le vôtre !"
        : "Our Bespoke Package Constructor allows you to dynamically choose your days, accommodation tier, transport, and hand-pick luxury experiences. Scroll down to the Packages page to build yours now!";
    } 
    else if (textLower.includes('price') || textLower.includes('cost') || textLower.includes('expensive') || textLower.includes('mad') || textLower.includes('usd') || textLower.includes('eur') || textLower.includes('سعر') || textLower.includes('تكلفة') || textLower.includes('ثمن') || textLower.includes('tarif')) {
      replyText = language === 'ar' 
        ? "أسعارنا ديناميكية وتعتمد على الموسم، مستوى الإقامة، والمواصلات المختارة. تبدأ الرحلات الفاخرة من 850 دولار وتصل إلى 4500+ دولار للشخص الواحد."
        : language === 'fr'
        ? "Nos tarifs sont dynamiques et dépendent de la saison, du type d'hébergement et des transports. Nos séjours premium commencent à partir de 850 $ jusqu'à plus de 4 500 $ par personne."
        : "Our pricing is dynamic and depends on the season, accommodation level, and selected transport. Premium packages start at $850 up to $4,500+ per person. Invoices are settled in MAD.";
    } 
    else if (textLower.includes('contact') || textLower.includes('help') || textLower.includes('agent') || textLower.includes('phone') || textLower.includes('whatsapp') || textLower.includes('اتصال') || textLower.includes('مساعدة') || textLower.includes('هاتف') || textLower.includes('واتساب') || textLower.includes('conseiller')) {
      replyText = language === 'ar' 
        ? "يمكنك التواصل مع مستشارينا الخاصين في أي وقت عبر قسم الاتصال في الأسفل، أو الضغط على زر واتساب في الأعلى للتحدث مع ممثل حي مباشرة. نحن متواجدون 24/7."
        : language === 'fr'
        ? "Vous pouvez contacter nos conseillers privés via la section Contact ci-dessous, ou en cliquant sur le bouton WhatsApp dans l'en-tête/pied de page. Nous sommes disponibles 24h/24, 7j/7."
        : "You can contact our private advisors anytime via the Contact section below, or click the WhatsApp button in the header/footer to chat with a live representative. We are available 24/7.";
    } 
    else if (textLower.includes('marrakech') || textLower.includes('bahia') || textLower.includes('koutoubia') || textLower.includes('مراكش') || textLower.includes('الباهية')) {
      replyText = language === 'ar' 
        ? "مراكش مدينة الأساطير. تجول في المدينة القديمة ذات الأسوار الحمراء، واستكشف قصر الباهية، وتأمل منارة الكتبية العريقة."
        : language === 'fr'
        ? "Marrakech est une ville légendaire. Promenez-vous dans la Médina aux remparts ocre, explorez le Palais de la Bahia et admirez le minaret de la Koutoubia."
        : "Marrakech is a city of legend. Walk the red-walled Medina, explore the Bahia Palace, and marvel at the Koutoubia minaret. We offer several tours visiting Marrakech.";
      
      if (!suggestedPackage) {
        suggestedPackage = packagesData.find(p => p.id === 'royal-sanctuary');
      }
    } 
    else if (matchPkg) {
      replyText = language === 'ar'
        ? `لقد وجدت رحلة '${matchPkg.name[language]}' المطابقة لطلبك. إليك تفاصيل الباقة الفاخرة:`
        : language === 'fr'
        ? `J'ai trouvé l'excursion '${matchPkg.name[language]}' correspondant à votre recherche. Voici les détails :`
        : `I found the package '${matchPkg.name[language]}' matching your request. Here are the details:`;
    } 
    else if (matchDest) {
      replyText = language === 'ar'
        ? `لقد وجدت وجهة '${matchDest.name[language]}' التاريخية. تقع في إحداثياتنا، وتتميز بـ: ${matchDest.description[language].slice(0, 100)}...`
        : language === 'fr'
        ? `J'ai trouvé la destination '${matchDest.name[language]}'. Elle se distingue par : ${matchDest.description[language].slice(0, 100)}...`
        : `I found the historical destination '${matchDest.name[language]}'. It features: ${matchDest.description[language].slice(0, 100)}...`;
    } 
    else {
      replyText = currentBotT.notMatch;
    }

    return {
      text: replyText,
      suggestedPackage,
      suggestedDestination
    };
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateBotResponse(textToSend);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date(),
        suggestedPackage: response.suggestedPackage,
        suggestedDestination: response.suggestedDestination
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickChipClick = (chipText: string) => {
    handleSend(chipText);
  };

  const handleActionClick = (item: any) => {
    onBook(item);
    // Auto minimize chat on booking trigger to clear screen
    setIsOpen(false);
  };

  const handleExploreAction = () => {
    setView('packages');
    setIsOpen(false);
    // Smooth scroll to packages section
    setTimeout(() => {
      const el = document.getElementById('packages');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div style={{ position: 'relative', zIndex: 1050 }}>
      {/* Floating Chat Button Launcher */}
      <motion.button
        onClick={handleOpenChat}
        className="animate-float"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: isRTL ? 'auto' : '30px',
          left: isRTL ? '30px' : 'auto',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gold-royal) 0%, #A58039 100%)',
          color: '#FFFFFF',
          border: '1.5px solid rgba(255, 255, 255, 0.25)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 32px var(--gold-glow)',
          zIndex: 1002,
          outline: 'none',
          transition: 'transform 0.3s ease'
        }}
        whileHover={{ scale: 1.1, boxShadow: '0 12px 40px var(--gold-glow)' }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare size={26} />
        
        {/* Glowing notification badge */}
        {unread && (
          <span style={{
            position: 'absolute',
            top: '0px',
            right: isRTL ? 'auto' : '0px',
            left: isRTL ? '0px' : 'auto',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: '#FF3B30',
            border: '2px solid #FFFFFF',
            boxShadow: '0 0 10px rgba(255, 59, 48, 0.8)'
          }} />
        )}
      </motion.button>

      {/* Chat Draw Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50, x: isRTL ? -20 : 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: isRTL ? 'auto' : '30px',
              left: isRTL ? '30px' : 'auto',
              width: '400px',
              maxWidth: 'calc(100vw - 40px)',
              height: '600px',
              maxHeight: 'calc(100vh - 140px)',
              backgroundColor: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--glass-border)',
              boxShadow: 'var(--shadow-lg), 0 10px 40px rgba(11, 58, 36, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 1003
            }}
          >
            {/* Header Banner */}
            <div style={{
              backgroundImage: 'linear-gradient(135deg, var(--emerald-deep) 0%, #11261C 100%)',
              color: '#FAF7F0',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--gold-royal)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid var(--gold-royal)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 0 8px var(--gold-glow)'
                }}>
                  <Compass size={20} className="animate-spin" style={{ color: 'var(--gold-royal)', animationDuration: '20s' }} />
                </div>
                <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  <h4 style={{ fontSize: '1.05rem', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--gold-royal)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {currentBotT.botName}
                    <Sparkles size={12} style={{ color: 'var(--gold-royal)' }} />
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(250, 247, 240, 0.65)', display: 'block' }}>
                    {currentBotT.botTitle}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleCloseChat}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FAF7F0',
                  cursor: 'pointer',
                  opacity: 0.8,
                  padding: '4px',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Status indicators */}
            <div style={{
              backgroundColor: 'rgba(11, 58, 36, 0.05)',
              padding: '6px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              borderBottom: '1px solid var(--border-color)',
              justifyContent: 'center'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#34C759',
                display: 'inline-block'
              }} />
              <span>{currentBotT.botStatus}</span>
            </div>

            {/* Message Area */}
            <div style={{
              flex: 1,
              padding: '20px 24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: 'rgba(250, 247, 240, 0.3)'
            }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: msg.sender === 'user'
                        ? '16px 16px 2px 16px'
                        : '16px 16px 16px 2px',
                      backgroundColor: msg.sender === 'user'
                        ? 'var(--emerald-deep)'
                        : 'var(--bg-secondary)',
                      color: msg.sender === 'user'
                        ? '#FFFFFF'
                        : 'var(--text-primary)',
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      boxShadow: 'var(--shadow-sm)',
                      border: msg.sender === 'bot' ? '1px solid var(--border-color)' : 'none',
                      textAlign: isRTL ? 'right' : 'left'
                    }}
                  >
                    {msg.text}
                  </div>

                  {/* Suggestion Card Content if present */}
                  {msg.sender === 'bot' && msg.suggestedPackage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: '12px',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--gold-royal)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-md)',
                        width: '100%'
                      }}
                    >
                      <img
                        src={msg.suggestedPackage.image}
                        alt={msg.suggestedPackage.name[language]}
                        style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '14px', textAlign: isRTL ? 'right' : 'left' }}>
                        <span style={{ fontSize: '0.65rem', color: 'var(--gold-royal)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Recommended Package
                        </span>
                        <h5 style={{ fontSize: '0.95rem', margin: '4px 0 6px 0', fontFamily: 'var(--font-serif)' }}>
                          {msg.suggestedPackage.name[language]}
                        </h5>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                            {convertPrice(msg.suggestedPackage.priceUSD)}
                          </span>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={handleExploreAction}
                              style={{
                                padding: '6px 12px',
                                fontSize: '0.72rem',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'transparent',
                                color: 'var(--text-primary)',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              {currentBotT.exploreBtn}
                            </button>
                            <button
                              onClick={() => handleActionClick(msg.suggestedPackage)}
                              style={{
                                padding: '6px 12px',
                                fontSize: '0.72rem',
                                border: 'none',
                                backgroundColor: 'var(--gold-royal)',
                                color: '#FFFFFF',
                                borderRadius: '4px',
                                fontWeight: '500',
                                cursor: 'pointer'
                              }}
                            >
                              {currentBotT.bookBtn}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Suggestion Destination Card */}
                  {msg.sender === 'bot' && msg.suggestedDestination && !msg.suggestedPackage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: '12px',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-md)',
                        width: '100%'
                      }}
                    >
                      <img
                        src={msg.suggestedDestination.image}
                        alt={msg.suggestedDestination.name[language]}
                        style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '14px', textAlign: isRTL ? 'right' : 'left' }}>
                        <span style={{ fontSize: '0.65rem', color: 'var(--emerald-light)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Heritage Site
                        </span>
                        <h5 style={{ fontSize: '0.95rem', margin: '4px 0 6px 0', fontFamily: 'var(--font-serif)' }}>
                          {msg.suggestedDestination.name[language]}
                        </h5>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                          <button
                            onClick={() => handleActionClick(msg.suggestedDestination)}
                            style={{
                              padding: '6px 14px',
                              fontSize: '0.72rem',
                              border: 'none',
                              backgroundColor: 'var(--emerald-deep)',
                              color: '#FFFFFF',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span>{currentBotT.bookBtn}</span>
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <span style={{
                    fontSize: '0.65rem',
                    color: 'var(--text-secondary)',
                    marginTop: '4px',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}>
                    {msg.timestamp.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {/* Typing Loader dots */}
              {isTyping && (
                <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'flex-start', maxWidth: '85%' }}>
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '16px 16px 16px 2px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold-royal)', display: 'inline-block' }} />
                    <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold-royal)', display: 'inline-block', animationDelay: '0.2s' }} />
                    <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold-royal)', display: 'inline-block', animationDelay: '0.4s' }} />
                  </div>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {currentBotT.typing}
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Selection Chips */}
            <div style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(250, 247, 240, 0.5)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '4px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }} className="no-scrollbar">
                {currentBotT.quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickChipClick(chip.slice(0, -3))} // strip emoji for search simplicity
                    style={{
                      whiteSpace: 'nowrap',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      border: '1.2px solid var(--border-color)',
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--gold-royal)';
                      e.currentTarget.style.color = 'var(--gold-royal)';
                      e.currentTarget.style.backgroundColor = 'rgba(197, 160, 89, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              style={{
                padding: '16px 20px',
                backgroundColor: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentBotT.inputPlaceholder}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.2px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold-royal)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: inputValue.trim() ? 'var(--emerald-deep)' : 'rgba(11, 58, 36, 0.1)',
                  color: inputValue.trim() ? '#FFFFFF' : 'var(--text-secondary)',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: inputValue.trim() ? 'pointer' : 'default',
                  transition: 'all 0.2s'
                }}
              >
                {isRTL ? <CornerDownLeft size={16} /> : <Send size={16} />}
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .typing-dot {
          animation: typingDelay 1.2s infinite ease-in-out;
        }
        @keyframes typingDelay {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};
