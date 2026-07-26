import React, { useState, useEffect } from 'react';
import { destinationsData, type Destination } from '../data/destinationsData';
import { translations, type Language } from '../data/translations';
import { Wind, Droplets, Compass, ArrowRight, Sun } from 'lucide-react';

interface TravelExplorerMapProps {
  language: Language;
  currency: string;
  onBookDestination: (item: Destination) => void;
}

interface CityData {
  id: string;
  name: { en: string; fr: string; ar: string };
  desc: { en: string; fr: string; ar: string };
  x: number;
  y: number;
  weather: {
    temp: number;
    condition: { en: string; fr: string; ar: string };
    wind: string;
    humidity: string;
    forecast: { day: { en: string; fr: string; ar: string }; temp: number }[];
  };
  estPriceUSD: number;
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

export const TravelExplorerMap: React.FC<TravelExplorerMapProps> = ({
  language,
  currency,
  onBookDestination
}) => {
  const t = translations[language];
  const [activeCity, setActiveCity] = useState<string>('marrakech');
  const [isTracing, setIsTracing] = useState<boolean>(false);

  // Trigger brief tracing animation on city switch
  useEffect(() => {
    setIsTracing(true);
    const timer = setTimeout(() => setIsTracing(false), 850);
    return () => clearTimeout(timer);
  }, [activeCity]);

  const cities: CityData[] = [
    {
      id: "chefchaouen",
      name: { en: "Chefchaouen", fr: "Chefchaouen", ar: "شفشاون" },
      desc: {
        en: "The iconic blue-washed mountain town nestled in the Rif Mountains, famous for its dreamlike azure alleys and quiet steps.",
        fr: "La célèbre ville bleue nichée dans les montagnes du Rif, réputée pour ses ruelles azurées et son atmosphère paisible.",
        ar: "المدينة الجبلية الزرقاء الساحرة الواقعة في جبال الريف، الشهيرة بأزقتها الملونة باللون الأزرق السماوي."
      },
      x: 360,
      y: 75,
      weather: {
        temp: 30,
        condition: { en: "Breezy/Clear", fr: "Venté/Clair", ar: "منعش/صافي" },
        wind: "18 km/h",
        humidity: "42%",
        forecast: [
          { day: { en: "Sat", fr: "Sam", ar: "السبت" }, temp: 31 },
          { day: { en: "Sun", fr: "Dim", ar: "الأحد" }, temp: 32 },
          { day: { en: "Mon", fr: "Lun", ar: "الاثنين" }, temp: 30 }
        ]
      },
      estPriceUSD: 850
    },
    {
      id: "rabat",
      name: { en: "Rabat", fr: "Rabat", ar: "الرباط" },
      desc: {
        en: "The peaceful imperial capital, blending UNESCO world heritage landmarks, scenic ocean walls, and modern royal gardens.",
        fr: "La capitale impériale paisible, mêlant monuments du patrimoine mondial de l'UNESCO, remparts face à l'océan et jardins royaux.",
        ar: "العاصمة الإمبراطورية الهادئة، التي تمزج بين معالم التراث العالمي لليونسكو، والأسوار المطلة على المحيط، والحدائق الملكية."
      },
      x: 290,
      y: 110,
      weather: {
        temp: 27,
        condition: { en: "Coastal Breeze", fr: "Brise côtière", ar: "رياح ساحلية" },
        wind: "14 km/h",
        humidity: "65%",
        forecast: [
          { day: { en: "Sat", fr: "Sam", ar: "السبت" }, temp: 28 },
          { day: { en: "Sun", fr: "Dim", ar: "الأحد" }, temp: 27 },
          { day: { en: "Mon", fr: "Lun", ar: "الاثنين" }, temp: 26 }
        ]
      },
      estPriceUSD: 950
    },
    {
      id: "casablanca",
      name: { en: "Casablanca", fr: "Casablanca", ar: "الدار البيضاء" },
      desc: {
        en: "Morocco's vibrant economic capital, home to the colossal Hassan II Mosque built directly over the crashing Atlantic waves.",
        fr: "La capitale économique dynamique du Maroc, qui abrite la colossale mosquée Hassan II construite directement sur l'océan.",
        ar: "العاصمة الاقتصادية النابضة بالحياة، موطن مسجد الحسن الثاني الشاهق الذي بُني مباشرة فوق مياه المحيط الأطلسي."
      },
      x: 265,
      y: 135,
      weather: {
        temp: 29,
        condition: { en: "Sunny/Humid", fr: "Ensoleillé/Humide", ar: "مشمس/رطب" },
        wind: "11 km/h",
        humidity: "70%",
        forecast: [
          { day: { en: "Sat", fr: "Sam", ar: "السبت" }, temp: 29 },
          { day: { en: "Sun", fr: "Dim", ar: "الأحد" }, temp: 30 },
          { day: { en: "Mon", fr: "Lun", ar: "الاثنين" }, temp: 28 }
        ]
      },
      estPriceUSD: 700
    },
    {
      id: "essaouira",
      name: { en: "Essaouira", fr: "Essaouira", ar: "الصويرة" },
      desc: {
        en: "A scenic coastal fortress town, famous for its historic white ramparts, ancient fishing port, and strong Atlantic trade winds.",
        fr: "Une forteresse côtière historique, célèbre pour ses remparts blancs, son port de pêche traditionnel et ses alizés de l'Atlantique.",
        ar: "مدينة الحصن الساحلية التاريخية، الشهيرة بأسوارها الأثرية، وميناء الصيد التقليدي، ورياح الأطلسي القوية."
      },
      x: 200,
      y: 220,
      weather: {
        temp: 24,
        condition: { en: "Windy/Cool", fr: "Venteux/Frais", ar: "عاصف/بارد" },
        wind: "26 km/h",
        humidity: "75%",
        forecast: [
          { day: { en: "Sat", fr: "Sam", ar: "السبت" }, temp: 25 },
          { day: { en: "Sun", fr: "Dim", ar: "الأحد" }, temp: 24 },
          { day: { en: "Mon", fr: "Lun", ar: "الاثنين" }, temp: 23 }
        ]
      },
      estPriceUSD: 1100
    },
    {
      id: "marrakech",
      name: { en: "Marrakech", fr: "Marrakech", ar: "مراكش" },
      desc: {
        en: "The vibrant southern capital, featuring bustling spice souks, lush palace courtyards, and the majestic snow-capped Atlas backdrop.",
        fr: "La capitale vibrante du Sud, avec ses souks d'épices animés, ses patios de palais luxueux et le mont Atlas enneigé en arrière-plan.",
        ar: "عاصمة الجنوب النابضة بالحياة، التي تتميز بأسواق التوابل المزدحمة، وأفنية القصور الفاخرة، وخلفية جبال الأطلس المهيبة."
      },
      x: 250,
      y: 205,
      weather: {
        temp: 38,
        condition: { en: "Sunny/Hot", fr: "Ensoleillé/Chaud", ar: "مشمس/حار" },
        wind: "12 km/h",
        humidity: "22%",
        forecast: [
          { day: { en: "Sat", fr: "Sam", ar: "السبت" }, temp: 39 },
          { day: { en: "Sun", fr: "Dim", ar: "الأحد" }, temp: 40 },
          { day: { en: "Mon", fr: "Lun", ar: "الاثنين" }, temp: 37 }
        ]
      },
      estPriceUSD: 1500
    },
    {
      id: "meknes",
      name: { en: "Meknes", fr: "Meknès", ar: "مكناس" },
      desc: {
        en: "The monumental capital of Sultan Moulay Ismail, featuring colossal gates, underground prisons, and nearby ancient Roman Volubilis.",
        fr: "La capitale monumentale du sultan Moulay Ismaïl, avec ses portes colossales, ses prisons souterraines et les ruines romaines voisines.",
        ar: "العاصمة الأثرية للسلطان مولاي إسماعيل، المتميزة بالبوابات الضخمة، والأسطبلات الملكية، والآثار الرومانية القريبة."
      },
      x: 325,
      y: 125,
      weather: {
        temp: 34,
        condition: { en: "Sunny", fr: "Ensoleillé", ar: "مشمس" },
        wind: "10 km/h",
        humidity: "32%",
        forecast: [
          { day: { en: "Sat", fr: "Sam", ar: "السبت" }, temp: 35 },
          { day: { en: "Sun", fr: "Dim", ar: "الأحد" }, temp: 36 },
          { day: { en: "Mon", fr: "Lun", ar: "الاثنين" }, temp: 33 }
        ]
      },
      estPriceUSD: 800
    },
    {
      id: "fes",
      name: { en: "Fes", fr: "Fès", ar: "فاس" },
      desc: {
        en: "Morocco's cultural and spiritual heart, housing the oldest continuously operating university in the world inside a giant medieval maze.",
        fr: "Le cœur culturel et spirituel du Maroc, abritant la plus ancienne université au monde dans un labyrinthe médiéval géant.",
        ar: "القلب الثقافي والروحي للمغرب، وموطن أقدم جامعة مستمرة في العمل في العالم (جامعة القرويين)."
      },
      x: 350,
      y: 125,
      weather: {
        temp: 35,
        condition: { en: "Clear/Hot", fr: "Clair/Chaud", ar: "صافي/حار" },
        wind: "9 km/h",
        humidity: "28%",
        forecast: [
          { day: { en: "Sat", fr: "Sam", ar: "السبت" }, temp: 36 },
          { day: { en: "Sun", fr: "Dim", ar: "الأحد" }, temp: 37 },
          { day: { en: "Mon", fr: "Lun", ar: "الاثنين" }, temp: 34 }
        ]
      },
      estPriceUSD: 1200
    },
    {
      id: "sahara",
      name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" },
      desc: {
        en: "The gateway to the golden sand dunes of Erg Chebbi, offering luxury camp accommodation, camel trekking, and brilliant night skies.",
        fr: "La porte d'entrée des dunes dorées d'Erg Chebbi, avec tentes de prestige, méharées et ciels nocturnes étincelants.",
        ar: "مدخل الصحراء الكبرى، حيث تلتقي الكثبان الرملية الذهبية لعرق الشبي بليالي الصحراء المرصعة بالنجوم."
      },
      x: 395,
      y: 200,
      weather: {
        temp: 42,
        condition: { en: "Desert Sun", fr: "Soleil de Plomb", ar: "شمس الصحراء الحارقة" },
        wind: "15 km/h",
        humidity: "15%",
        forecast: [
          { day: { en: "Sat", fr: "Sam", ar: "السبت" }, temp: 43 },
          { day: { en: "Sun", fr: "Dim", ar: "الأحد" }, temp: 41 },
          { day: { en: "Mon", fr: "Lun", ar: "الاثنين" }, temp: 40 }
        ]
      },
      estPriceUSD: 1800
    },
    {
      id: "dakhla",
      name: { en: "Dakhla Oasis", fr: "Oasis de Dakhla", ar: "شواطئ الداخلة" },
      desc: {
        en: "A spectacular southern lagoon where colossal white sand dunes meet the turquoise Atlantic waters, perfect for luxury watersports.",
        fr: "Une lagune sauvage du sud où les dunes de sable blanc rencontrent l'océan turquoise, idéale pour les sports nautiques d'exception.",
        ar: "واحة برية في أقصى الجنوب، حيث تلتقي كثبان الرمال البيضاء بمياه المحيط الأطلسي الفيروزية الساحرة."
      },
      x: 75,
      y: 440,
      weather: {
        temp: 23,
        condition: { en: "Ocean Mist", fr: "Brume d'Océan", ar: "ضباب المحيط" },
        wind: "22 km/h",
        humidity: "80%",
        forecast: [
          { day: { en: "Sat", fr: "Sam", ar: "السبت" }, temp: 24 },
          { day: { en: "Sun", fr: "Dim", ar: "الأحد" }, temp: 23 },
          { day: { en: "Mon", fr: "Lun", ar: "الاثنين" }, temp: 22 }
        ]
      },
      estPriceUSD: 2400
    }
  ];

  const activeCityInfo = cities.find(c => c.id === activeCity) || cities[4];

  // Filtering destinations matching the active city
  const cityDestinations = destinationsData.filter(d => {
    if (activeCity === 'marrakech') return d.id.includes('marrakech') || d.id.includes('bahia');
    if (activeCity === 'fes') return d.id.includes('fes') || d.id.includes('bouinania');
    if (activeCity === 'meknes') return d.id.includes('meknes') || d.id.includes('volubilis') || d.id.includes('habs');
    if (activeCity === 'sahara') return d.id.includes('merzouga') || d.id.includes('ait-ben-haddou') || d.id.includes('sahara');
    if (activeCity === 'chefchaouen') return d.id.includes('chefchaouen');
    if (activeCity === 'rabat') return d.id.includes('rabat');
    if (activeCity === 'casablanca') return d.id.includes('casablanca');
    if (activeCity === 'essaouira') return d.id.includes('essaouira');
    if (activeCity === 'dakhla') return d.id.includes('dakhla');
    return false;
  });

  const convertPrice = (usdAmount: number) => {
    const rate = EXCHANGE_RATES[currency] || 1.0;
    const converted = usdAmount * rate;
    return `${CURRENCY_SYMBOLS[currency]} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const isRTL = language === 'ar';

  return (
    <section id="travel-map-explorer" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
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
          {t.mapExploreTitle}
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: 'var(--text-primary)',
          lineHeight: '1.2',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {t.mapExploreSubtitle}
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

      {/* Exploration Dashboard layout */}
      <div className="map-explorer-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Interactive Cartography Map */}
        <div className="glass-card" style={{
          position: 'relative',
          padding: '20px',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}>
          
          {/* Animated Flight Path Line */}
          <svg
            viewBox="0 0 500 500"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '520px',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            {/* Map Grid dotted details */}
            <defs>
              <pattern id="dot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="var(--border-color)" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)" />

            {/* Styled outline representation of Morocco */}
            <path
              d="M 230 40 
                 C 250 40, 270 45, 290 55 
                 C 310 65, 335 90, 355 100 
                 C 375 110, 400 105, 430 110 
                 C 440 120, 420 150, 410 170 
                 C 400 190, 430 210, 440 230 
                 C 450 250, 410 270, 390 290 
                 C 370 310, 360 340, 330 370 
                 C 300 400, 240 430, 180 450 
                 C 120 470, 60 480, 20 485 
                 L 5 485 L 5 470 
                 C 15 440, 35 390, 55 340 
                 C 75 290, 95 240, 115 190 
                 C 135 140, 155 105, 195 85 
                 Z"
              fill="rgba(11, 58, 36, 0.05)"
              stroke="var(--gold-royal)"
              strokeWidth="2"
              style={{
                transition: 'all 0.5s ease',
                filter: 'drop-shadow(0 4px 10px rgba(197, 160, 89, 0.15))'
              }}
            />

            {/* Tracing animated flight path from Casablanca (CMN) to Active City */}
            {activeCity !== 'casablanca' && (
              <g>
                <path
                  d={`M 265 135 Q ${(265 + activeCityInfo.x) / 2} ${(135 + activeCityInfo.y) / 2 - 30} ${activeCityInfo.x} ${activeCityInfo.y}`}
                  fill="none"
                  stroke="var(--gold-royal)"
                  strokeWidth="2"
                  strokeDasharray="5,4"
                  className={isTracing ? "path-tracing-anim" : ""}
                  style={{
                    opacity: 0.8
                  }}
                />
                
                {/* Chauffeur indicators */}
                <circle cx="265" cy="135" r="3.5" fill="var(--gold-royal)" />
                <circle cx={activeCityInfo.x} cy={activeCityInfo.y} r="3.5" fill="var(--gold-royal)" />
              </g>
            )}

            {/* Map city interactive coordinate anchors */}
            {cities.map((city) => (
              <g
                key={city.id}
                onClick={() => setActiveCity(city.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Active halo ring glow */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={activeCity === city.id ? 14 : 0}
                  fill="none"
                  stroke="var(--gold-royal)"
                  strokeWidth="1.5"
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: activeCity === city.id ? 0.7 : 0
                  }}
                  className="pulsate-ring"
                />
                
                {/* Core dot anchor */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={activeCity === city.id ? 7 : 5}
                  fill={activeCity === city.id ? "var(--gold-royal)" : "var(--emerald-deep)"}
                  stroke="#FFF"
                  strokeWidth="1.5"
                  style={{
                    transition: 'all 0.3s ease',
                    filter: activeCity === city.id ? 'drop-shadow(0 0 8px var(--gold-royal))' : 'none'
                  }}
                />

                {/* City name text label */}
                <text
                  x={isRTL ? city.x - 12 : city.x + 12}
                  y={city.y + 4}
                  style={{
                    fontSize: activeCity === city.id ? '11px' : '9px',
                    fontWeight: activeCity === city.id ? 'bold' : '600',
                    fill: activeCity === city.id ? 'var(--gold-royal)' : 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '0.02em',
                    textShadow: '1px 1px 3px rgba(250, 247, 240, 0.9), -1px -1px 3px rgba(250, 247, 240, 0.9)',
                    transition: 'all 0.3s ease',
                    textAnchor: isRTL ? 'end' : 'start'
                  }}
                >
                  {city.name[language]}
                </text>
              </g>
            ))}
          </svg>

          {/* Map Helper overlay badge */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: 'var(--emerald-deep)',
            color: '#FFF',
            padding: '8px 14px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Compass size={14} className="spin-slow" />
            <span>Interactive Map Coordinates</span>
          </div>

        </div>

        {/* Right Column: Explored City Info & Weather Widget Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Main Info Card */}
          <div className="glass-card" style={{
            padding: '36px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            position: 'relative'
          }}>
            
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold-royal)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Explore Morocco
                </span>
                <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginTop: '4px' }}>
                  {activeCityInfo.name[language]}
                </h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>
                  Est. Luxury Tour
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--gold-royal)', fontFamily: 'monospace' }}>
                  {convertPrice(activeCityInfo.estPriceUSD)}
                </span>
              </div>
            </div>

            {/* City Description Text */}
            <p style={{
              fontSize: '0.98rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              marginBottom: '28px'
            }}>
              {activeCityInfo.desc[language]}
            </p>

            {/* Live City Weather Forecasting Widget Panel */}
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '20px 24px',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '20px',
              marginBottom: '32px'
            }} className="weather-forecast-widget">
              
              {/* Primary weather stats */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--gold-royal)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                    {t.localWeather}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: '300', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                      {activeCityInfo.weather.temp}°C
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                      {activeCityInfo.weather.condition[language]}
                    </span>
                  </div>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--gold-royal)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <Sun size={24} className="weather-sun-icon" />
                </div>
              </div>

              {/* Climate auxiliary details */}
              <div style={{
                display: 'flex',
                gap: '24px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                borderTop: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)',
                padding: '12px 0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Wind size={14} style={{ color: 'var(--gold-royal)' }} />
                  <span>Wind: {activeCityInfo.weather.wind}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Droplets size={14} style={{ color: 'var(--gold-royal)' }} />
                  <span>Humidity: {activeCityInfo.weather.humidity}</span>
                </div>
              </div>

              {/* Forecast 3-days */}
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                  3-Day Outlook
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  {activeCityInfo.weather.forecast.map((fc, idx) => (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        padding: '10px',
                        textAlign: 'center'
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                        {fc.day[language]}
                      </span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                        {fc.temp}°C
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Destinations list header */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-royal)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
                {t.destinationsIn} {activeCityInfo.name[language]} ({cityDestinations.length})
              </span>
              
              {cityDestinations.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cityDestinations.map((dest) => (
                    <div
                      key={dest.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 18px',
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'var(--transition-smooth)'
                      }}
                      className="destination-map-row"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={dest.image}
                          alt={dest.name[language]}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                        />
                        <div>
                          <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                            {dest.name[language]}
                          </h5>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                            {dest.category}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onBookDestination(dest)}
                        className="btn-gold"
                        style={{
                          padding: '8px 16px',
                          fontSize: '0.75rem',
                          borderRadius: '4px',
                          gap: '4px'
                        }}
                      >
                        Book Now
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)', fontStyle: 'italic', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  No standalone destinations listed. Custom itineraries are available through our trip builder below.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .pulsate-ring {
          animation: ring-glow-pulse 2s infinite ease-in-out;
        }
        .weather-sun-icon {
          animation: spin-weather 24s linear infinite;
        }
        .path-tracing-anim {
          stroke-dasharray: 8, 6;
          animation: trace-route 0.8s linear forwards;
        }
        .destination-map-row:hover {
          border-color: var(--gold-royal) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        @keyframes ring-glow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes spin-weather {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes trace-route {
          from { stroke-dashoffset: 40; }
          to { stroke-dashoffset: 0; }
        }
        @media(min-width: 1024px) {
          .map-explorer-grid {
            grid-template-columns: 1.1fr 1fr !important;
            gap: 50px !important;
          }
        }
      `}</style>
    </section>
  );
};
