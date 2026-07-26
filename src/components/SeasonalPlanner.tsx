import React, { useState } from 'react';
import { type Language } from '../data/translations';
import { packagesData, type Package } from '../data/packagesData';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, Compass, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface SeasonalPlannerProps {
  language: Language;
  currency: string;
  onBook: (item: any) => void;
}

interface RegionClimate {
  name: { en: string; fr: string; ar: string };
  tempC: number;
  comfort: 'perfect' | 'good' | 'average' | 'hot' | 'chilly';
  desc: { en: string; fr: string; ar: string };
}

interface MonthData {
  id: number;
  name: { en: string; fr: string; ar: string };
  festival: {
    title: { en: string; fr: string; ar: string };
    desc: { en: string; fr: string; ar: string };
    location: { en: string; fr: string; ar: string };
  };
  climates: RegionClimate[];
  bestPackageId: string;
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

const comfortLabels = {
  perfect: { en: "Perfect Comfort", fr: "Confort Idéal", ar: "راحة مثالية" },
  good: { en: "Good Conditions", fr: "Bonnes Conditions", ar: "أجواء جيدة" },
  average: { en: "Acceptable", fr: "Acceptable", ar: "مقبول" },
  hot: { en: "Extreme Heat", fr: "Chaleur Extrême", ar: "حرارة شديدة" },
  chilly: { en: "Cool Weather", fr: "Climat Frais", ar: "طقس بارد" }
};

const comfortColors = {
  perfect: { bg: 'rgba(197, 160, 89, 0.15)', border: 'var(--gold-royal)', text: 'var(--gold-royal)' },
  good: { bg: 'rgba(11, 58, 36, 0.15)', border: 'var(--emerald-light)', text: 'var(--emerald-light)' },
  average: { bg: 'rgba(74, 90, 81, 0.1)', border: 'var(--text-secondary)', text: 'var(--text-secondary)' },
  hot: { bg: 'rgba(239, 68, 68, 0.1)', border: '#EF4444', text: '#EF4444' },
  chilly: { bg: 'rgba(59, 130, 246, 0.1)', border: '#3B82F6', text: '#3B82F6' }
};

const monthsData: MonthData[] = [
  {
    id: 1,
    name: { en: "January", fr: "Janvier", ar: "يناير" },
    bestPackageId: "royal-sanctuary",
    festival: {
      title: { en: "Yennayer (Amazigh New Year)", fr: "Yennayer (Nouvel An Amazigh)", ar: "إيض يناير (رأس السنة الأمازيغية)" },
      desc: {
        en: "Celebrate the traditional harvest and Amazigh new year with local organic feasts, traditional folk rhythms, and colorful Berber dances.",
        fr: "Célébrez la récolte traditionnelle et le nouvel an amazigh avec des festins bio locaux, des chants traditionnels et des danses berbères colorées.",
        ar: "الاحتفال برأس السنة الأمازيغية والخصوبة الفلاحية من خلال إعداد الأطباق التقليدية ورقصات أحيدوس التراثية العريقة."
      },
      location: { en: "Atlas Valleys & Agadir", fr: "Vallées de l'Atlas & Agadir", ar: "وديان الأطلس وأكادير" }
    },
    climates: [
      { name: { en: "Imperial Cities", fr: "Villes Impériales", ar: "المدن الإمبراطورية" }, tempC: 16, comfort: "chilly", desc: { en: "Cool days, cold nights. Beautiful for museum visits.", fr: "Journées fraîches, nuits froides. Parfait pour les musées.", ar: "أجواء باردة ليلاً ومعتدلة نهاراً، ممتازة لزيارة المتاحف والآثار." } },
      { name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" }, tempC: 18, comfort: "good", desc: { en: "Pleasant sunny days, but freezing desert nights. Pack warm.", fr: "Journées agréables, nuits glaciales dans le désert. Habillez-vous chaudement.", ar: "شمس دافئة نهاراً وبرودة شديدة تصل للتجمد ليلاً. يتطلب ملابس دافئة." } },
      { name: { en: "Atlas Mountains", fr: "Montagnes de l'Atlas", ar: "جبال الأطلس" }, tempC: 8, comfort: "chilly", desc: { en: "Snowy peaks. Best for skiing at Oukaïmeden or cozy fireplace riads.", fr: "Sommets enneigés. Idéal pour le ski ou les riads avec cheminée.", ar: "ثلوج تكسو القمم. رائعة للتزلج في أوكايمدن والاسترخاء بجانب المدفأة." } },
      { name: { en: "Atlantic Coast", fr: "Côte Atlantique", ar: "الساحل الأطلسي" }, tempC: 19, comfort: "good", desc: { en: "Mild ocean winds, sunny walks on Essaouira ramparts.", fr: "Brise océanique douce, balades ensoleillées sur les remparts d'Essaouira.", ar: "رياح أطلسية معتدلة، وجولات مشمسة على أسوار الصويرة." } }
    ]
  },
  {
    id: 2,
    name: { en: "February", fr: "Février", ar: "فبراير" },
    bestPackageId: "royal-sanctuary",
    festival: {
      title: { en: "Almond Blossom Festival", fr: "Festival des Amandiers en Fleurs", ar: "مهرجان لوز تافراوت" },
      desc: {
        en: "Witness Tafraoute's valleys blanketed in pink and white almond blossoms. Enjoy live folk music, markets, and regional organic honey.",
        fr: "Admirez les vallées de Tafraout couvertes de fleurs d'amandiers roses et blanches. Profitez de musique folklorique et de miel local.",
        ar: "مشاهدة وديان تافراوت المغطاة بزهور اللوز الوردية والبيضاء، مع حفلات موسيقية ومعارض للمنتجات الطبيعية."
      },
      location: { en: "Tafraoute (Anti-Atlas)", fr: "Tafraout (Anti-Atlas)", ar: "تافراوت (الأطلس الصغير)" }
    },
    climates: [
      { name: { en: "Imperial Cities", fr: "Villes Impériales", ar: "المدن الإمبراطورية" }, tempC: 18, comfort: "good", desc: { en: "Warm winter sunlight. Perfect for walking tours in Fes.", fr: "Soleil d'hiver chaleureux. Idéal pour les visites guidées à Fès.", ar: "أشعة شمس شتوية لطيفة، ممتازة للجولات المشي في فاس." } },
      { name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" }, tempC: 21, comfort: "perfect", desc: { en: "Perfect desert weather. Ideal for dunes photography.", fr: "Climat saharien idéal. Parfait pour la photographie des dunes.", ar: "طقس صحراوي مثالي للتصوير والتجول فوق الكثبان الرملية." } },
      { name: { en: "Atlas Mountains", fr: "Montagnes de l'Atlas", ar: "جبال الأطلس" }, tempC: 10, comfort: "chilly", desc: { en: "Crisp mountain air. Stunning panoramic views.", fr: "Air pur de montagne. Vues panoramiques spectaculaires.", ar: "هواء جبلي نقي بارد، وإطلالات بانورامية ساحرة على القمم." } },
      { name: { en: "Atlantic Coast", fr: "Côte Atlantique", ar: "الساحل الأطلسي" }, tempC: 20, comfort: "good", desc: { en: "Pleasant coastal climate. Great surfing at Taghazout.", fr: "Climat côtier agréable. Idéal pour le surf à Taghazout.", ar: "أجواء ساحلية ممتعة، وموسم رائع لممارسة ركوب الأمواج." } }
    ]
  },
  {
    id: 3,
    name: { en: "March", fr: "Mars", ar: "مارس" },
    bestPackageId: "sahara-expedition",
    festival: {
      title: { en: "International Nomads Festival", fr: "Festival International des Nomades", ar: "المهرجان الدولي للرحل" },
      desc: {
        en: "An open-air celebration of desert culture, featuring Saharan rhythms, camel races, ancient nomadic crafts, and stargazing.",
        fr: "Une célébration en plein air de la culture du désert avec musiques sahariennes, courses de dromadaires et artisanat nomade.",
        ar: "احتفال مفتوح بثقافة الصحراء، يضم موسيقى الرحل الكبرى، وسباقات الهجن، والمعارض التراثية تحت النجوم."
      },
      location: { en: "M'hamid El Ghizlane", fr: "M'hamid El Ghizlane", ar: "محاميد الغزلان" }
    },
    climates: [
      { name: { en: "Imperial Cities", fr: "Villes Impériales", ar: "المدن الإمبراطورية" }, tempC: 22, comfort: "perfect", desc: { en: "Spring arrives. Gardens in Marrakech are in full bloom.", fr: "Le printemps arrive. Les jardins de Marrakech sont fleuris.", ar: "بداية الربيع البديع. حدائق مراكش تزهر وتكتسي بالورود." } },
      { name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" }, tempC: 25, comfort: "perfect", desc: { en: "Warm days and cool nights. Best time for desert trekking.", fr: "Journées chaudes et nuits fraîches. Idéal pour les treks.", ar: "نهار دافئ مع ليل منعش. أفضل وقت للرحلات الصحراوية الطويلة." } },
      { name: { en: "Atlas Mountains", fr: "Montagnes de l'Atlas", ar: "جبال الأطلس" }, tempC: 15, comfort: "good", desc: { en: "Wildflowers begin blooming in green valleys.", fr: "Les fleurs sauvages commencent à éclore dans les vallées.", ar: "بدء تفتح الأزهار البرية في الوديان الخضراء الخصبة." } },
      { name: { en: "Atlantic Coast", fr: "Côte Atlantique", ar: "الساحل الأطلسي" }, tempC: 21, comfort: "good", desc: { en: "Sunny sea breeze, perfect for Casablanca tours.", fr: "Brise de mer ensoleillée, parfait pour visiter Casablanca.", ar: "نسيم بحري مشمس ومنعش، ممتاز للقيام بجولات الدار البيضاء." } }
    ]
  },
  {
    id: 4,
    name: { en: "April", fr: "Avril", ar: "أبريل" },
    bestPackageId: "imperial-odyssey",
    festival: {
      title: { en: "Fes Festival of Sufi Culture", fr: "Festival de la Culture Soufie de Fès", ar: "مهرجان فاس للثقافة الصوفية" },
      desc: {
        en: "Immerse in spiritual Sufi music, chanting, and poetry sessions inside historic riads and dynastic palaces.",
        fr: "Plongez dans la musique spirituelle soufie, les chants et la poésie au cœur des riads et palais historiques.",
        ar: "الاستماع للأناشيد الصوفية، والقصائد والندوات الروحية العميقة داخل رياضات وقصور المدينة العتيقة لفاس."
      },
      location: { en: "Fes Medina", fr: "Médina de Fès", ar: "فاس البالي" }
    },
    climates: [
      { name: { en: "Imperial Cities", fr: "Villes Impériales", ar: "المدن الإمبراطورية" }, tempC: 24, comfort: "perfect", desc: { en: "Stunning climate. Walk Bab Mansour gate in Meknes comfortably.", fr: "Climat splendide. Visitez la porte Bab Mansour confortablement.", ar: "طقس رائع للغاية. تجول عند باب المنصور التاريخي في مكناس بكل أريحية." } },
      { name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" }, tempC: 28, comfort: "perfect", desc: { en: "Warm golden sands. Enjoy stargazing under clear skies.", fr: "Sables dorés. Idéal pour observer les étoiles sous un ciel pur.", ar: "رمال ذهبية دافئة. سماء صافية ومثالية لرصد النجوم والمجرات." } },
      { name: { en: "Atlas Mountains", fr: "Montagnes de l'Atlas", ar: "جبال الأطلس" }, tempC: 18, comfort: "perfect", desc: { en: "Excellent hiking weather in the Toubkal national park.", fr: "Conditions parfaites pour la randonnée au parc du Toubkal.", ar: "أفضل أجواء لممارسة رياضة المشي الجبلي واستكشاف قمم توبقال." } },
      { name: { en: "Atlantic Coast", fr: "Côte Atlantique", ar: "الساحل الأطلسي" }, tempC: 22, comfort: "perfect", desc: { en: "Superb temperature. Clear views across Tangier coast.", fr: "Température superbe. Vue dégagée sur la côte de Tanger.", ar: "حرارة معتدلة وممتازة، وإطلالة ساحرة على مضيق جبل طارق في طنجة." } }
    ]
  },
  {
    id: 5,
    name: { en: "May", fr: "Mai", ar: "مايو" },
    bestPackageId: "imperial-odyssey",
    festival: {
      title: { en: "Kelaat M'gouna Rose Festival", fr: "Festival des Roses de Kelaat M'gouna", ar: "مهرجان الورود قلعة مكونة" },
      desc: {
        en: "Celebrate the rose harvest in the Valley of Roses. Streets are showered in pink petals, with traditional Berber music and rosewater parades.",
        fr: "Célébrez la récolte des roses dans la Vallée des Roses. Parades de chars, pétales de roses et chants traditionnels.",
        ar: "الاحتفال بموسم قطف الورود العطرة في وادي دادس، حيث تغطى الشوارع ببتلات الورد مع عروض فولكلورية وأهازيج شعبية."
      },
      location: { en: "Kelaat M'gouna (Dades)", fr: "Kelaat M'gouna (Dadès)", ar: "قلعة مكونة (دادس)" }
    },
    climates: [
      { name: { en: "Imperial Cities", fr: "Villes Impériales", ar: "المدن الإمبراطورية" }, tempC: 27, comfort: "perfect", desc: { en: "Warm and bright. Palace gardens are green and luxurious.", fr: "Chaud et ensoleillé. Les palais sont verdoyants et luxuriants.", ar: "دافئ ومشمس. حدائق القصور العتيقة تكتسي بالخضرة والجمال." } },
      { name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" }, tempC: 33, comfort: "good", desc: { en: "Hot afternoons, but pleasant sunset camel rides.", fr: "Après-midis chauds, mais balades à dromadaire divines au coucher du soleil.", ar: "بعد الظهيرة حار، لكن جولات الجمال عند الغروب ممتعة ومنعشة." } },
      { name: { en: "Atlas Mountains", fr: "Montagnes de l'Atlas", ar: "جبال الأطلس" }, tempC: 22, comfort: "perfect", desc: { en: "Amazing valleys. Excellent for canyoning and waterfalls tours.", fr: "Vallées sublimes. Idéal pour le canyoning et les cascades d'Ouzoud.", ar: "وديان خصبة وينابيع جارية. طقس رائع لزيارة شلالات أوزود." } },
      { name: { en: "Atlantic Coast", fr: "Côte Atlantique", ar: "الساحل الأطلسي" }, tempC: 24, comfort: "perfect", desc: { en: "Beautiful warm ocean breeze in Essaouira and El Jadida.", fr: "Brise océanique chaude magnifique à Essaouira et El Jadida.", ar: "نسيم بحري دافئ في الصويرة والجديدة، مثالي للاسترخاء." } }
    ]
  },
  {
    id: 6,
    name: { en: "June", fr: "Juin", ar: "يونيو" },
    bestPackageId: "northern-coast",
    festival: {
      title: { en: "Fes Festival of World Sacred Music", fr: "Festival des Musiques Sacrées du Monde", ar: "مهرجان فاس للموسيقى العالمية العريقة" },
      desc: {
        en: "A legendary cultural gathering hosting Sufi singers, temple chanters, and international artists under giant centuries-old trees.",
        fr: "Un grand rassemblement de chants sacrés, derviches tourneurs et artistes internationaux sous les chênes centenaires.",
        ar: "حدث عالمي يجمع منشدين من مختلف الأديان، وحلقات صوفية وعروض موسيقية في فضاءات فاس التاريخية."
      },
      location: { en: "Bab Al Makina, Fes", fr: "Bab Al Makina, Fès", ar: "باب المكينة، فاس" }
    },
    climates: [
      { name: { en: "Imperial Cities", fr: "Villes Impériales", ar: "المدن الإمبراطورية" }, tempC: 31, comfort: "good", desc: { en: "Summer begins. Evenings are perfect for outdoor dining.", fr: "L'été commence. Les soirées sont parfaites en terrasse.", ar: "بداية الصيف. أمسيات رائعة لتناول العشاء في الهواء الطلق بالفناء." } },
      { name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" }, tempC: 38, comfort: "average", desc: { en: "Very hot. Spend afternoons in luxury pool camps.", fr: "Très chaud. Passez l'après-midi dans les piscines de camps de luxe.", ar: "حار جداً. نقترح قضاء وقت الظهيرة في مسابح المخيمات الفاخرة." } },
      { name: { en: "Atlas Mountains", fr: "Montagnes de l'Atlas", ar: "جبال الأطلس" }, tempC: 25, comfort: "perfect", desc: { en: "Cool sanctuary. Retreat here to escape the city heat.", fr: "Sanctuaire de fraîcheur. Idéal pour fuir la chaleur de la ville.", ar: "ملاذ بارد ومنعش. يهرب إليه السياح من حرارة المدن الكبرى." } },
      { name: { en: "Atlantic Coast", fr: "Côte Atlantique", ar: "الساحل الأطلسي" }, tempC: 26, comfort: "perfect", desc: { en: "Excellent coastal comfort. Gnaoua Music Festival in Essaouira.", fr: "Confort côtier idéal. Profitez du Festival Gnaoua d'Essaouira.", ar: "أجواء ساحلية رائعة، وتزامن مع مهرجان كناوة بالصويرة." } }
    ]
  },
  {
    id: 7,
    name: { en: "July", fr: "Juillet", ar: "يوليو" },
    bestPackageId: "northern-coast",
    festival: {
      title: { en: "National Festival of Popular Arts", fr: "Festival National des Arts Populaires", ar: "المهرجان الوطني للفنون الشعبية" },
      desc: {
        en: "Morocco's oldest cultural festival. Performers, acrobats, and dancers from every region perform inside the ruins of El Badi Palace.",
        fr: "Le plus ancien festival du Maroc. Danseurs et acrobates se produisent dans les ruines du Palais El Badi.",
        ar: "أقدم مهرجان بالمغرب. عروض فنية وفرق فولكلورية من شتى أرجاء المملكة داخل قصر البديع الأثري."
      },
      location: { en: "El Badi Palace, Marrakech", fr: "Palais El Badi, Marrakech", ar: "قصر البديع، مراكش" }
    },
    climates: [
      { name: { en: "Imperial Cities", fr: "Villes Impériales", ar: "المدن الإمبراطورية" }, tempC: 36, comfort: "average", desc: { en: "Hot midday. Walk in riads and shade. Enjoy night vibes.", fr: "Midi très chaud. Privilégiez les visites nocturnes et l'ombre.", ar: "أجواء حارة ظهراً. نقترح التجول في الصباح الباكر أو الأمسيات اللطيفة." } },
      { name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" }, tempC: 43, comfort: "hot", desc: { en: "Extreme summer heat. Sahara trips involve high AC and night camps.", fr: "Chaleur intense. Climatisation forte et nuits en camp requises.", ar: "حرارة قاسية نهاراً. الرحلة تتطلب سيارات مكيفة بالكامل ومخيمات مبردة." } },
      { name: { en: "Atlas Mountains", fr: "Montagnes de l'Atlas", ar: "جبال الأطلس" }, tempC: 27, comfort: "good", desc: { en: "Pleasant highlands. Perfect altitude escape.", fr: "Moyenne montagne agréable. Parfait pour prendre de l'altitude.", ar: "أجواء جبلية لطيفة، وارتفاع يضمن درجات حرارة مقبولة." } },
      { name: { en: "Atlantic Coast", fr: "Côte Atlantique", ar: "الساحل الأطلسي" }, tempC: 27, comfort: "perfect", desc: { en: "Fabulous beach weather. Tangier and Chefchaouen are optimal.", fr: "Météo de plage fabuleuse. Tanger et Chefchaouen sont idéales.", ar: "طقس شاطئي رائع، طنجة وشفشاون الجبلية هما الخيار الأمثل." } }
    ]
  },
  {
    id: 8,
    name: { en: "August", fr: "Août", ar: "أغسطس" },
    bestPackageId: "northern-coast",
    festival: {
      title: { en: "Asilah Cultural Moussem", fr: "Moussem Culturel d'Asilah", ar: "موسم أصيلة الثقافي الدولي" },
      desc: {
        en: "Famous artists paint spectacular murals on the sea-facing walls of the white-washed Asilah medina.",
        fr: "Des artistes peignent de grandes fresques sur les remparts blancs de la médina d'Assilah face à la mer.",
        ar: "فنانون تشكيليون يزينون جدران مدينة أصيلة البيضاء المطلة على المحيط بلوحات فنية رائعة."
      },
      location: { en: "Asilah Medina", fr: "Médina d'Asilah", ar: "أصيلة" }
    },
    climates: [
      { name: { en: "Imperial Cities", fr: "Villes Impériales", ar: "المدن الإمبراطورية" }, tempC: 35, comfort: "average", desc: { en: "Warm summer days. Best for late afternoon walks or coastal escapes.", fr: "Journées d'été chaudes. Idéal en fin d'après-midi.", ar: "أيام صيفية حارة، يفضل استكشاف المعالم بعد العصر." } },
      { name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" }, tempC: 42, comfort: "hot", desc: { en: "Very hot. Suggest coastal riads instead during this peak summer.", fr: "Chaleur torride. Nous vous conseillons de rester sur la côte.", ar: "أجواء حارة جداً. ننصح بتفضيل السواحل والرياضات التاريخية المبردة." } },
      { name: { en: "Atlas Mountains", fr: "Montagnes de l'Atlas", ar: "جبال الأطلس" }, tempC: 28, comfort: "good", desc: { en: "Cooler than cities. Excellent hikes in valleys.", fr: "Plus frais qu'en ville. Excellentes randonnées dans les vallées.", ar: "أبرد بكثير من المدن، وفرصة للاستمتاع بالطبيعة والينابيع الجبلية." } },
      { name: { en: "Atlantic Coast", fr: "Côte Atlantique", ar: "الساحل الأطلسي" }, tempC: 28, comfort: "perfect", desc: { en: "Peak sea resorts season. Beautiful sunny coastal climate.", fr: "Saison balnéaire idéale. Météo côtière très ensoleillée.", ar: "ذروة الموسم الشاطئي، أجواء ممتازة ونسيم عليل قبالة البحر." } }
    ]
  },
  {
    id: 9,
    name: { en: "September", fr: "Septembre", ar: "سبتمبر" },
    bestPackageId: "imperial-odyssey",
    festival: {
      title: { en: "Imilchil Marriage Festival", fr: "Moussem des Fiancailles d'Imilchil", ar: "موسم خطوبة إملشيل" },
      desc: {
        en: "A legendary tribal gathering in the high Atlas mountains where Berber couples get engaged amid music, trade markets, and dances.",
        fr: "Un rassemblement légendaire dans le Haut-Atlas où les couples berbères se fiancent au son des danses traditionnelles.",
        ar: "تجمع قبلي عريق في أعالي جبال الأطلس الكبير، حيث يتم الاحتفال بعقود القران الجماعية وأهازيج البربر."
      },
      location: { en: "Imilchil (High Atlas)", fr: "Imilchil (Haut-Atlas)", ar: "إملشيل (الأطلس الكبير)" }
    },
    climates: [
      { name: { en: "Imperial Cities", fr: "Villes Impériales", ar: "المدن الإمبراطورية" }, tempC: 29, comfort: "good", desc: { en: "Autumn arrives. Temperatures cool down beautifully.", fr: "L'automne arrive. Les températures baissent agréablement.", ar: "بداية الخريف اللطيف، حيث تبدأ درجات الحرارة بالانخفاض المريح." } },
      { name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" }, tempC: 34, comfort: "good", desc: { en: "Temperatures become comfortable for Sahara camping again.", fr: "Le climat devient à nouveau confortable pour camper au Sahara.", ar: "الطقس يعود للاعتدال ومناسب للمبيت في المخيمات الصحراوية." } },
      { name: { en: "Atlas Mountains", fr: "Montagnes de l'Atlas", ar: "جبال الأطلس" }, tempC: 22, comfort: "perfect", desc: { en: "Stunning climate. Apple and nut harvests in valleys.", fr: "Climat superbe. Récoltes de pommes et noix dans les vallées.", ar: "طقس بديع وموسم جني التفاح والمكسرات في القرى الجبلية." } },
      { name: { en: "Atlantic Coast", fr: "Côte Atlantique", ar: "الساحل الأطلسي" }, tempC: 25, comfort: "perfect", desc: { en: "Fabulous conditions. Mild ocean breeze and clear skies.", fr: "Conditions fabuleuses. Brise douce et ciel dégagé.", ar: "أجواء ساحرة وهادئة بعد انقضاء ذروة زحام الصيف." } }
    ]
  },
  {
    id: 10,
    name: { en: "October", fr: "Octobre", ar: "أكتوبر" },
    bestPackageId: "sahara-expedition",
    festival: {
      title: { en: "Erfoud Date Festival", fr: "Fête des Dattes d'Erfoud", ar: "مهرجان التمور بأرفود" },
      desc: {
        en: "Celebrate the date harvest in the desert oasis. Features camel parades, folklore bands, and dates tasting.",
        fr: "Célébrez la récolte des dattes dans l'oasis saharienne. Parades de dromadaires, danses folkloriques et dégustations.",
        ar: "الاحتفال بموسم جني التمور في واحات تافيلالت، مع سباقات الهجن وأهازيج صحراوية متميزة."
      },
      location: { en: "Erfoud (Sahara gateway)", fr: "Erfoud (Porte du Sahara)", ar: "أرفود (بوابة الصحراء)" }
    },
    climates: [
      { name: { en: "Imperial Cities", fr: "Villes Impériales", ar: "المدن الإمبراطورية" }, tempC: 25, comfort: "perfect", desc: { en: "Golden autumn sunshine. Perfect to photograph Volubilis mosaics.", fr: "Soleil d'automne doré. Parfait pour les mosaïques de Volubilis.", ar: "شمس خريفية ذهبية، مثالية لالتقاط الصور لفسيفساء وليلي الأثرية." } },
      { name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" }, tempC: 29, comfort: "perfect", desc: { en: "Stunning desert weather. Cool night bonfires, warm days.", fr: "Météo saharienne superbe. Soirées au coin du feu et journées douces.", ar: "أجواء صحراوية مثيرة، دافئة نهاراً ولطيفة ليلاً ومناسبة للسهر حول النار." } },
      { name: { en: "Atlas Mountains", fr: "Montagnes de l'Atlas", ar: "جبال الأطلس" }, tempC: 17, comfort: "perfect", desc: { en: "Excellent hiking comfort. Clear skies and fresh air.", fr: "Conditions de randonnée idéales. Ciel pur et air frais.", ar: "أفضل فترة للمشي الجبلي والاستمتاع بهدوء وجمال القرى الأطلسية." } },
      { name: { en: "Atlantic Coast", fr: "Côte Atlantique", ar: "الساحل الأطلسي" }, tempC: 23, comfort: "perfect", desc: { en: "Highly pleasant. Beautiful coastal cities strolls.", fr: "Très agréable. Superbe pour flâner dans les villes côtières.", ar: "طقس لطيف ومنعش، ممتاز للتجول في أزقة الصويرة وطنجة القديمة." } }
    ]
  },
  {
    id: 11,
    name: { en: "November", fr: "Novembre", ar: "نوفمبر" },
    bestPackageId: "imperial-odyssey",
    festival: {
      title: { en: "Marrakech International Film Festival", fr: "Festival International du Film de Marrakech", ar: "المهرجان الدولي للفيلم بمراكش" },
      desc: {
        en: "Morocco's most prestigious cultural event, bringing together global stars for masterclasses and screenings at Jemaa el-Fnaa.",
        fr: "L'événement culturel le plus prestigieux du Maroc, réunissant les stars mondiales du cinéma à Marrakech.",
        ar: "أرقى حدث ثقافي سينمائي بالمغرب، يجمع نجوم الفن السابع من مختلف أنحاء العالم لتقديم العروض الكبرى."
      },
      location: { en: "Palais des Congres, Marrakech", fr: "Palais des Congrès, Marrakech", ar: "قصر المؤتمرات، مراكش" }
    },
    climates: [
      { name: { en: "Imperial Cities", fr: "Villes Impériales", ar: "المدن الإمبراطورية" }, tempC: 20, comfort: "good", desc: { en: "Mild days, chilly nights. Great for palace explorations.", fr: "Journées douces, nuits fraîches. Idéal pour explorer les palais.", ar: "نهار معتدل وليل بارد. رائع لاستكشاف القصور والمناطق التاريخية." } },
      { name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" }, tempC: 23, comfort: "perfect", desc: { en: "Very clear skies. Best visibility for Milky Way stargazing.", fr: "Ciel extrêmement pur. Idéal pour observer la Voie Lactée.", ar: "سماء صافية جداً. أفضل موسم لرصد وتصوير مجرة درب التبانة." } },
      { name: { en: "Atlas Mountains", fr: "Montagnes de l'Atlas", ar: "جبال الأطلس" }, tempC: 12, comfort: "chilly", desc: { en: "Fresh air, first autumn rains. Beautiful waterfalls.", fr: "Air frais, premières pluies d'automne. Magnifiques cascades.", ar: "طقس بارد نهاراً، مع تساقط أمطار الخريف وجريان الشلالات." } },
      { name: { en: "Atlantic Coast", fr: "Côte Atlantique", ar: "الساحل الأطلسي" }, tempC: 20, comfort: "good", desc: { en: "Mild weather, perfect to visit Hassan II mosque in Casablanca.", fr: "Temps doux, idéal pour la mosquée Hassan II à Casablanca.", ar: "أجواء معتدلة، مناسبة لزيارة مسجد الحسن الثاني بالبيضاء." } }
    ]
  },
  {
    id: 12,
    name: { en: "December", fr: "Décembre", ar: "ديسمبر" },
    bestPackageId: "royal-sanctuary",
    festival: {
      title: { en: "Winter Solstice Nomads Gathering", fr: "Rassemblement des Nomades au Solstice d'Hiver", ar: "تجمع الرحل في الانقلاب الشتوي" },
      desc: {
        en: "Experience authentic desert storytelling, traditional Saharan drumming, and Fantasia horse spectacles under the starry winter sky.",
        fr: "Vivez les contes authentiques du désert, les percussions sahariennes et la fantasia sous le ciel étoilé d'hiver.",
        ar: "عش تجربة الاستماع لقصص الصحراء القديمة حول النار، ودقات الطبول الصحراوية، واستعراضات الفانتازيا."
      },
      location: { en: "M'hamid Dunes", fr: "Dunes de M'hamid", ar: "كثبان محاميد الغزلان" }
    },
    climates: [
      { name: { en: "Imperial Cities", fr: "Villes Impériales", ar: "المدن الإمبراطورية" }, tempC: 17, comfort: "chilly", desc: { en: "Chilly winter atmosphere. Cozy fire-lit riads are magnificent.", fr: "Ambiance hivernale fraîche. Les riads chauffés au feu de bois sont magiques.", ar: "أجواء شتوية باردة. قضاء الأمسيات أمام مواقد النار بالرياض تجربة ساحرة." } },
      { name: { en: "Sahara Desert", fr: "Désert du Sahara", ar: "الصحراء الكبرى" }, tempC: 19, comfort: "good", desc: { en: "Bright winter sun, but freezing nights. Cozy warm luxury camps.", fr: "Soleil d'hiver éclatant, nuits glaciales. Camps de luxe chauffés indispensables.", ar: "نهار مشمس بارد وليل شديد البرودة. مخيماتنا الصحراوية مجهزة بالتدفئة." } },
      { name: { en: "Atlas Mountains", fr: "Montagnes de l'Atlas", ar: "جبال الأطلس" }, tempC: 9, comfort: "chilly", desc: { en: "Snowy Atlas peaks. Breathtaking white panorama.", fr: "Sommets enneigés de l'Atlas. Panorama blanc époustouflant.", ar: "الثلوج تغطي الجبال بالكامل وتصنع لوحة فنية بيضاء آسرة." } },
      { name: { en: "Atlantic Coast", fr: "Côte Atlantique", ar: "الساحل الأطلسي" }, tempC: 18, comfort: "good", desc: { en: "Crisp ocean air. Excellent seafood dining in Agadir marina.", fr: "Air océanique frais. Dîner de poissons frais sur le port d'Agadir.", ar: "هواء بحري بارد ولطيف، ومثالي لتناول المأكولات البحرية الطازجة." } }
    ]
  }
];

export const SeasonalPlanner: React.FC<SeasonalPlannerProps> = ({
  language,
  currency,
  onBook
}) => {
  const [selectedMonthId, setSelectedMonthId] = useState(4); // Default to April
  const isRTL = language === 'ar';

  const activeMonthData = monthsData.find(m => m.id === selectedMonthId) || monthsData[3];
  
  // Find recommended package in database
  const recPackage = packagesData.find(p => p.id === activeMonthData.bestPackageId) || packagesData[0];

  const handleBook = (pkg: Package) => {
    onBook(pkg);
  };

  const getMonthLabel = (m: MonthData) => {
    return m.name[language];
  };

  const getComfortDetails = (rating: 'perfect' | 'good' | 'average' | 'hot' | 'chilly') => {
    const label = comfortLabels[rating][language];
    const style = comfortColors[rating];
    return { label, style };
  };

  const convertPrice = (usdAmount: number) => {
    const rate = EXCHANGE_RATES[currency] || 1.0;
    const converted = usdAmount * rate;
    return `${CURRENCY_SYMBOLS[currency]} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <section id="seasonal-planner" className="section-padding" style={{ backgroundColor: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Visual background details */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: isRTL ? 'auto' : '-50px',
        right: isRTL ? '-50px' : 'auto',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        backgroundColor: 'rgba(197, 160, 89, 0.03)',
        pointerEvents: 'none'
      }} />

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
          {language === 'ar' ? 'مستشار الفصول الفاخر' : language === 'fr' ? 'Conseiller de Voyage Saisonnier' : 'Bespoke Seasonal Guide'}
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: 'var(--text-primary)',
          lineHeight: '1.2'
        }}>
          {language === 'ar' ? 'اختر التوقيت المثالي لرحلتك' : language === 'fr' ? 'Planifiez selon les Saisons & Festivals' : 'Bespoke Seasonal Travel Planner'}
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

      {/* Interactive Horizontal Months Timeline Selector */}
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto 50px auto', 
        padding: '0 10px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          padding: '10px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '40px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          maxWidth: '100%'
        }} className="no-scrollbar">
          {monthsData.map((m) => {
            const isActive = m.id === selectedMonthId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMonthId(m.id)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '30px',
                  border: isActive ? '1px solid var(--gold-royal)' : '1px solid transparent',
                  backgroundColor: isActive ? 'var(--emerald-deep)' : 'transparent',
                  color: isActive ? '#FAF7F0' : 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? '600' : '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                {getMonthLabel(m)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px',
        padding: '0 10px'
      }} className="planner-layout-grid">
        
        {/* Left Side: Regional weather cards & cultural spotlight */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Climates grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            <AnimatePresence mode="wait">
              {activeMonthData.climates.map((c, idx) => {
                const comf = getComfortDetails(c.comfort);
                return (
                  <motion.div
                    key={`${selectedMonthId}-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)',
                      textAlign: isRTL ? 'right' : 'left'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                          {c.name[language]}
                        </span>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--gold-royal)'
                        }}>
                          <Thermometer size={16} />
                          <span style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{c.tempC}°C</span>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                        {c.desc[language]}
                      </p>
                    </div>

                    <div style={{
                      display: 'inline-flex',
                      alignSelf: isRTL ? 'flex-end' : 'flex-start',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: comf.style.bg,
                      border: `1px solid ${comf.style.border}`,
                      color: comf.style.text
                    }}>
                      {comf.label}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Cultural spotlight festival section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`fest-${selectedMonthId}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--emerald-deep) 0%, #11261C 100%)',
                color: '#FAF7F0',
                borderRadius: 'var(--radius-md)',
                padding: '30px 40px',
                border: '1px solid var(--gold-royal)',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                overflow: 'hidden',
                textAlign: isRTL ? 'right' : 'left'
              }}
            >
              {/* Background geometric overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: isRTL ? 'auto' : 0,
                left: isRTL ? 0 : 'auto',
                bottom: 0,
                opacity: 0.08,
                pointerEvents: 'none'
              }}>
                <Compass size={180} style={{ transform: 'translate(40px, 40px)' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--gold-royal)', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <Sparkles size={18} />
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {language === 'ar' ? 'الحدث الثقافي الأبرز لهذا الشهر' : language === 'fr' ? 'Événement Culturel Majeur' : 'Active Cultural Festival'}
                </span>
              </div>

              <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '12px', color: 'var(--gold-royal)' }}>
                {activeMonthData.festival.title[language]}
              </h4>

              <p style={{ fontSize: '0.95rem', color: 'rgba(250,247,240,0.8)', lineHeight: '1.6', marginBottom: '20px', maxWidth: '800px' }}>
                {activeMonthData.festival.desc[language]}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'rgba(250,247,240,0.6)', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <MapPin size={14} style={{ color: 'var(--gold-royal)' }} />
                <span>{activeMonthData.festival.location[language]}</span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Right Side: Recomended travel package card details */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`pkg-${selectedMonthId}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
              transition={{ duration: 0.4 }}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={recPackage.image}
                    alt={recPackage.name[language]}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(5,14,10,0.1) 0%, rgba(5,14,10,0.4) 100%)'
                  }} />
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    left: isRTL ? 'auto' : '16px',
                    right: isRTL ? '16px' : 'auto',
                    backgroundColor: 'var(--gold-royal)',
                    color: '#050E0A',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {language === 'ar' ? 'الباقة الموصى بها' : language === 'fr' ? 'Formule Recommandée' : 'Recommended Package'}
                  </span>
                </div>

                <div style={{ padding: '28px', textAlign: isRTL ? 'right' : 'left' }}>
                  <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {recPackage.name[language]}
                  </h3>
                  <p style={{ color: 'var(--gold-royal)', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '16px' }}>
                    {recPackage.tagline[language]}
                  </p>
                  
                  {/* Package properties list */}
                  <div style={{
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <div>
                      <strong>{language === 'ar' ? 'المدة:' : language === 'fr' ? 'Durée:' : 'Duration:'}</strong> {recPackage.durationDays} {recPackage.durationDays > 1 ? (language === 'ar' ? 'أيام' : 'Days') : (language === 'ar' ? 'يوم' : 'Day')}
                    </div>
                    <div>
                      <strong>{language === 'ar' ? 'وسيلة التنقل:' : language === 'fr' ? 'Transport:' : 'Transport:'}</strong> {recPackage.transportation[language]}
                    </div>
                    <div>
                      <strong>{language === 'ar' ? 'الخدمات المضمنة:' : language === 'fr' ? 'Services inclus:' : 'Inclusions:'}</strong>
                      <ul style={{ listStyle: 'none', padding: 0, marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {recPackage.highlights[language].slice(0, 2).map((item, keyIdx) => (
                          <li key={keyIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                            <span style={{ color: 'var(--gold-royal)' }}>✦</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                padding: '24px 28px',
                borderTop: '1px solid var(--border-color)',
                backgroundColor: 'rgba(11, 58, 36, 0.03)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block' }}>
                    {language === 'ar' ? 'السعر التقديري' : language === 'fr' ? 'Prix estimé' : 'Estimated Price'}
                  </span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                    {convertPrice(recPackage.priceUSD)}
                  </span>
                </div>

                <button
                  onClick={() => handleBook(recPackage)}
                  style={{
                    padding: '10px 20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--gold-royal)',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px var(--gold-glow)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }}
                  className="btn-gold"
                >
                  <span>{language === 'ar' ? 'حجز الرحلة' : language === 'fr' ? 'Réserver' : 'Secure Booking'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 900px) {
          .planner-layout-grid {
            grid-template-columns: 2fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
