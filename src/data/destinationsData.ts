export interface LocalizedText {
  en: string;
  fr: string;
  ar: string;
}

export interface LocalizedArray {
  en: string[];
  fr: string[];
  ar: string[];
}

export interface Destination {
  id: string;
  name: LocalizedText;
  category: 'architecture' | 'history' | 'culture' | 'nature' | 'dining';
  image: string;
  description: LocalizedText;
  highlights: LocalizedArray;
  visitingHours: LocalizedText;
  duration: LocalizedText;
  bestSeason: LocalizedText;
  travelTips: LocalizedText;
  gallery: string[];
  coords: {
    lat: number;
    lng: number;
  };
}

export const destinationsData: Destination[] = [
  {
    id: "marrakech-bahia",
    name: {
      en: "Marrakech & Bahia Palace",
      fr: "Marrakech & Palais de la Bahia",
      ar: "مراكش وقصر الباهية"
    },
    category: "architecture",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Bahia_Palace_large_court.jpg/1280px-Bahia_Palace_large_court.jpg",
    description: {
      en: "The historic heart of Marrakech, famous for Jemaa el-Fnaa square and the Bahia Palace. Built in the late 19th century, the palace is a masterpiece of Moroccan-Andalusian architecture featuring exquisite tiled courtyards and carved cedarwood.",
      fr: "Le cœur historique de Marrakech, célèbre pour la place Jemaa el-Fnaa et le Palais de la Bahia. Construit à la fin du XIXe siècle, c'est un chef-d'œuvre de l'architecture maroco-andalouse.",
      ar: "القلب التاريخي لمدينة مراكش، الشهير بساحة جامع الفنا وقصر الباهية. شيد القصر في أواخر القرن التاسع عشر، ويعد تحفة معمارية مغربية أندلسية فريدة."
    },
    highlights: {
      en: ["Vibrant Jemaa el-Fnaa square performers", "Stunning mosaic courtyards of Bahia Palace", "Scenic views of the historic Koutoubia Minaret"],
      fr: ["Spectacles vivants de la place Jemaa el-Fnaa", "Magnifiques cours en mosaïque du Palais de la Bahia", "Vue spectaculaire sur le minaret de la Koutoubia"],
      ar: ["عروض ساحة جامع الفنا الحيوية", "باحات قصر الباهية الفسيفسائية الساحرة", "إطلالات منارة الكتبية التاريخية المهيبة"]
    },
    visitingHours: {
      en: "09:00 - 17:00 daily (Palace interior)",
      fr: "09h00 - 17h00 tous les jours (Palais)",
      ar: "من 9:00 صباحاً إلى 5:00 مساءً يومياً (داخل القصر)"
    },
    duration: {
      en: "3 hours",
      fr: "3 heures",
      ar: "3 ساعات"
    },
    bestSeason: {
      en: "October to April (mild temperatures)",
      fr: "D'octobre à avril (températures douces)",
      ar: "من أكتوبر إلى أبريل (طقس معتدل وجميل)"
    },
    travelTips: {
      en: "Visit the Bahia Palace early at 9:00 AM to photograph the sunlight filtering through stained glass windows before the crowd arrives.",
      fr: "Visitez le Palais de la Bahia tôt à 09h00 pour photographier les jeux de lumière à travers les vitraux sans la foule.",
      ar: "قم بزيارة قصر الباهية باكراً عند الساعة 9:00 صباحاً لالتقاط أشعة الشمس المتسللة عبر النوافذ الملونة قبل ازدحام المكان."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Bahia_Palace_large_court.jpg/640px-Bahia_Palace_large_court.jpg"
    ],
    coords: {
      lat: 31.6258,
      lng: -7.9892
    }
  },
  {
    id: "fes-medina",
    name: {
      en: "Fes el-Bali Medina",
      fr: "Médina de Fès el-Bali",
      ar: "فاس البالي المدينة العتيقة"
    },
    category: "history",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Fes_Bab_Bou_Jeloud_2011.jpg/1280px-Fes_Bab_Bou_Jeloud_2011.jpg",
    description: {
      en: "The world's largest contiguous car-free urban area. Founded in the 9th century, it hosts the historic Chouara Tannery, Bou Inania Madrasa, and the ancient University of Al-Qarawiyyin, the oldest continuously operating university in the world.",
      fr: "La plus grande zone urbaine piétonne au monde. Fondée au IXe siècle, elle abrite les tanneries Chouara, la médersa Bou Inania et l'université Al-Qarawiyyin.",
      ar: "أكبر منطقة حضرية خالية من السيارات في العالم. تأسست في القرن التاسع، وتضم دار دباغة الشوارة التاريخية، ومدرسة البوعنانية، وجامعة القرويين العريقة."
    },
    highlights: {
      en: ["The famous historic Chouara leather tanneries", "Beautiful tiles of Bou Inania Madrasa", "Wandering through 9,000 medieval alleyways"],
      fr: ["Les célèbres tanneries de cuir Chouara", "Les décors de la médersa Bou Inania", "L'exploration des 9 000 ruelles médiévales"],
      ar: ["دار دباغة الجلود الشوارة الشهيرة", "فسيفساء وزخارف مدرسة البوعنانية", "التجول عبر 9000 زقاق يعود للعصور الوسطى"]
    },
    visitingHours: {
      en: "Medina open 24/7. Historical monuments open 09:00 - 18:00.",
      fr: "Médina ouverte 24h/24. Monuments ouverts de 09h00 à 18h00.",
      ar: "المدينة مفتوحة دائماً. المعالم التاريخية تفتح من 9:00 صباحاً إلى 6:00 مساءً."
    },
    duration: {
      en: "Full Day",
      fr: "Journée Complète",
      ar: "يوم كامل"
    },
    bestSeason: {
      en: "Spring and Autumn",
      fr: "Printemps et Automne",
      ar: "الربيع والخريف"
    },
    travelTips: {
      en: "Hire a certified local guide. The Medina is a massive historic maze where GPS maps often fail.",
      fr: "Faites appel aux services d'un guide officiel. La médina est un labyrinthe où le GPS ne fonctionne pas.",
      ar: "استأجر مرشداً محلياً معتمداً، فالمدينة العتيقة عبارة عن متاهة ضخمة يصعب تصفحها بالخرائط الإلكترونية."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Fes_Bab_Bou_Jeloud_2011.jpg/640px-Fes_Bab_Bou_Jeloud_2011.jpg"
    ],
    coords: {
      lat: 34.0650,
      lng: -4.9740
    }
  },
  {
    id: "casablanca-mosque",
    name: {
      en: "Hassan II Mosque",
      fr: "Mosquée Hassan II",
      ar: "مسجد الحسن الثاني"
    },
    category: "architecture",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Hassan_II_mosque%2C_Casablanca_2.jpg/1280px-Hassan_II_mosque%2C_Casablanca_2.jpg",
    description: {
      en: "One of the largest mosques in the world, dramatically perched on an ocean cliffside. It features a spectacular 210-meter minaret and showcases the absolute height of Moroccan craftsmanship with hand-carved stone, wood, and zellij tiles.",
      fr: "L'une des plus grandes mosquées au monde, bâtie sur l'océan. Elle dispose d'un minaret spectaculaire de 210 mètres et représente le summum de l'artisanat marocain.",
      ar: "واحد من أكبر المساجد في العالم، يقع بشكل درامي على حافة المحيط الأطلسي. يتميز بمنارة مذهلة بارتفاع 210 أمتار ويظهر قمة الإبداع الحرفي المغربي."
    },
    highlights: {
      en: ["The ocean-facing giant prayer hall", "Glass floor revealing the Atlantic waves", "The towering 210m minaret structure"],
      fr: ["La salle de prière géante face à l'océan", "Le sol en verre révélant les vagues", "Le minaret majestueux de 210 mètres"],
      ar: ["قاعة الصلاة العملاقة المطلة على البحر", "أرضية زجاجية تكشف أمواج الأطلسي", "هيكل المنارة الشامخة بارتفاع 210 أمتار"]
    },
    visitingHours: {
      en: "Open for guided tours outside prayer times (09:00, 10:00, 11:00, 12:00, 15:00)",
      fr: "Visites guidées hors heures de prière (09h00, 10h00, 11h00, 12h00, 15h00)",
      ar: "مفتوح للجولات السياحية خارج أوقات الصلاة (9:00، 10:00، 11:00، 12:00، 3:00)"
    },
    duration: {
      en: "1.5 hours",
      fr: "1.5 heures",
      ar: "ساعة ونصف"
    },
    bestSeason: {
      en: "Year-round (gorgeous at sunset)",
      fr: "Toute l'année (magnifique au coucher du soleil)",
      ar: "طوال العام (ساحر وقت الغروب)"
    },
    travelTips: {
      en: "Take a sunset walk along the Casablanca Corniche next to the mosque. The reflection of the minaret on the water is breathtaking.",
      fr: "Promenez-vous sur la Corniche au coucher du soleil. Le reflet du minaret sur l'eau est sublime.",
      ar: "قم بنزهة وقت الغروب على كورنيش الدار البيضاء المحاذي للمسجد، حيث ينعكس خيال المئذنة على الماء بشكل ساحر."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Hassan_II_mosque%2C_Casablanca_2.jpg/640px-Hassan_II_mosque%2C_Casablanca_2.jpg"
    ],
    coords: {
      lat: 33.6083,
      lng: -7.6325
    }
  },
  {
    id: "rabat-udayas",
    name: {
      en: "Rabat Kasbah & Udayas",
      fr: "Kasbah des Oudaïas de Rabat",
      ar: "قصبة الأوداية في الرباط"
    },
    category: "history",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Morocco_-_Rabat_%2831387775324%29.jpg/1280px-Morocco_-_Rabat_%2831387775324%29.jpg",
    description: {
      en: "Rabat's UNESCO-protected ancient fortress. Perched above the Bou Regreg river, the Kasbah is famous for its peaceful blue-and-white residential alleys, Andalusian gardens, and the unfinished monumental Hassan Tower.",
      fr: "L'ancienne forteresse de Rabat, classée par l'UNESCO. Surplombant le fleuve Bou Regreg, la Kasbah est réputée pour ses ruelles bleues et blanches et la Tour Hassan.",
      ar: "القلعة الأثرية المدرجة ضمن اليونسكو في الرباط. تقع فوق نهر أبي رقراق، وتشتهر القصبة بأزقتها السكنية ذات اللونين الأزرق والأبيض، وحدائقها الأندلسية، وصومعة حسان التاريخية."
    },
    highlights: {
      en: ["The massive red clay walls of Hassan Tower", "Quiet blue-and-white Kasbah pathways", "The peaceful Andalusian Palace gardens"],
      fr: ["Les remparts d'argile de la Tour Hassan", "Les ruelles bleues et blanches de la Kasbah", "Les paisibles jardins du palais andalou"],
      ar: ["صومعة حسان وجدرانها الطينية الحمراء", "ممرات قصبة الأوداية الزرقاء والبيضاء الهادئة", "حدائق القصر الأندلسي الوادعة"]
    },
    visitingHours: {
      en: "Kasbah open 24/7. Hassan Tower gardens open 08:30 - 18:30.",
      fr: "Kasbah ouverte 24h/24. Tour Hassan ouverte de 08h30 à 18h30.",
      ar: "القصبة مفتوحة دائماً. حدائق صومعة حسان تفتح من 8:30 صباحاً إلى 6:30 مساءً."
    },
    duration: {
      en: "2 hours",
      fr: "2 heures",
      ar: "ساعتان"
    },
    bestSeason: {
      en: "Year-round",
      fr: "Toute l'année",
      ar: "طوال العام"
    },
    travelTips: {
      en: "Stop at the Café Maure inside the Kasbah for traditional mint tea and almond ghriba cookies overlooking the river mouth.",
      fr: "Arrêtez-vous au Café Maure pour déguster un thé à la menthe et des cornes de gazelle face au fleuve.",
      ar: "توقف عند 'المقهى الموري' داخل القصبة لتناول الشاي بالنعناع وحلويات الغريبة المطلة على مصب النهر."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Morocco_-_Rabat_%2831387775324%29.jpg/640px-Morocco_-_Rabat_%2831387775324%29.jpg"
    ],
    coords: {
      lat: 34.0322,
      lng: -6.8361
    }
  },
  {
    id: "chefchaouen-blue",
    name: {
      en: "Chefchaouen Blue City",
      fr: "Chefchaouen la Ville Bleue",
      ar: "شفشاون المدينة الزرقاء"
    },
    category: "culture",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Chefchaouen_%2852189357475%29.jpg/1280px-Chefchaouen_%2852189357475%29.jpg",
    description: {
      en: "Morocco's famous blue-washed mountain town in the Rif Mountains. Founded in 1471, the town is celebrated for its dreamy steps, colorful flower pots, and relaxed, slow-paced mountain atmosphere.",
      fr: "La célèbre ville montagneuse marocaine peinte en bleu, dans le Rif. Fondée en 1471, elle est réputée pour ses ruelles colorées et son atmosphère paisible.",
      ar: "البلدة الجبلية الشهيرة بلونها الأزرق في جبال الريف المغربية. تأسست عام 1471، وتشتهر بممراتها الزرقاء الحالمة، وأواني الزهور الملونة، وأجوائها الهادئة."
    },
    highlights: {
      en: ["Dreamy cobalt-blue painted stairways", "Spanish Mosque sunset viewing spot", "Relaxed local wool weaving shops"],
      fr: ["Les escaliers bleus cobalt féeriques", "Le coucher de soleil à la mosquée espagnole", "Les boutiques de tissage de laine"],
      ar: ["السلالم والممرات الزرقاء الحالمة", "نقطة مشاهدة الغروب عند المسجد الإسباني", "محلات نسيج الصوف التقليدية الهادئة"]
    },
    visitingHours: {
      en: "Public town access (24/7)",
      fr: "Accès public libre (24h/24)",
      ar: "مفتوحة دائماً للعموم (24 ساعة)"
    },
    duration: {
      en: "Half Day",
      fr: "Demi-journée",
      ar: "نصف يوم"
    },
    bestSeason: {
      en: "Spring and Autumn (ideal mountain hiking conditions)",
      fr: "Printemps et Automne (idéal pour la randonnée)",
      ar: "الربيع والخريف (ظروف مثالية للمشي الجبلي)"
    },
    travelTips: {
      en: "Walk to the Spanish Mosque just before sunset. The view of the blue town draped over the Rif mountains is unforgettable.",
      fr: "Marchez jusqu'à la mosquée espagnole avant le coucher du soleil pour une vue inoubliable.",
      ar: "امشِ نحو المسجد الإسباني قبيل الغروب مباشرة، فإن إطلالة البلدة الزرقاء المنسكبة على الجبال لا تُنسى."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Chefchaouen_%2852189357475%29.jpg/640px-Chefchaouen_%2852189357475%29.jpg"
    ],
    coords: {
      lat: 35.1689,
      lng: -5.2636
    }
  },
  {
    id: "sahara-merzouga",
    name: {
      en: "Sahara Desert (Merzouga)",
      fr: "Désert du Sahara (Merzouga)",
      ar: "صحراء مرزوكة (عرق الشبي)"
    },
    category: "nature",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Merzouga%2C_Morocco.jpg/1280px-Merzouga%2C_Morocco.jpg",
    description: {
      en: "The spectacular golden dunes of Erg Chebbi in Merzouga. Rising up to 150 meters, this vast desert wilderness offers camel treks, private luxury glamping under the stars, and breathtaking sunrise vistas.",
      fr: "Les dunes dorées spectaculaires de l'Erg Chebbi à Merzouga. S'élevant jusqu'à 150 mètres, ce grand désert propose des balades à chameau et du bivouac de luxe.",
      ar: "كثبان عرق الشبي الذهبية المذهلة في مرزوكة. ترتفع الكثبان حتى 150 متراً، وتوفر هذه البرية الصحراوية الشاسعة رحلات الجمال وتخييماً فاخراً تحت النجوم."
    },
    highlights: {
      en: ["Riding camels across Erg Chebbi dunes", "Luxury desert campfires and drums music", "Stargazing in the crystal clear night sky"],
      fr: ["Randonnées à chameau sur les dunes", "Bivouacs de luxe avec feux et tambours", "Observation des étoiles sous un ciel pur"],
      ar: ["ركوب الجمال عبر كثبان عرق الشبي", "مخيمات فاخرة حول مواقد النار وموسيقى الطبول", "رصد النجوم في سماء الصحراء الصافية ليلاً"]
    },
    visitingHours: {
      en: "Guided excursions booked in advance (24/7 access)",
      fr: "Excursions guidées sur réservation (24h/24)",
      ar: "جولات برفقة مرشدين بالتنسيق المسبق (متاحة دائماً)"
    },
    duration: {
      en: "Overnight",
      fr: "Nuitée / Séjour",
      ar: "إقامة ليلة كاملة"
    },
    bestSeason: {
      en: "October to April (avoiding extreme summer heat)",
      fr: "D'octobre à avril (évitez les chaleurs d'été)",
      ar: "من أكتوبر إلى أبريل (لتجنب حرارة الصيف الشديدة)"
    },
    travelTips: {
      en: "Wake up early for the 5:30 AM sunrise. The shifting colors of the sand from cold violet to warm gold are magical.",
      fr: "Levez-vous tôt pour le lever du soleil à 05h30. Les couleurs changeantes du sable sont magiques.",
      ar: "استيقظ باكراً لمشاهدة الشروق عند 5:30 صباحاً، لتشهد تغير ألوان الرمال البديع من البنفسجي البارد إلى الذهبي الدافئ."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Merzouga%2C_Morocco.jpg/640px-Merzouga%2C_Morocco.jpg"
    ],
    coords: {
      lat: 31.0981,
      lng: -4.0033
    }
  },
  {
    id: "essaouira-coast",
    name: {
      en: "Essaouira Seaside Citadel",
      fr: "Essaouira la Citadelle Marine",
      ar: "الصويرة موكادور البحرية"
    },
    category: "culture",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/%22Ein_bemerkenswertes_historisches_Denkmal%22._16.jpg/1280px-%22Ein_bemerkenswertes_historisches_Denkmal%22._16.jpg",
    description: {
      en: "Morocco's historic wind-swept coastal town, formerly known as Mogador. Celebrated for its 18th-century stone ramparts, busy fishing port, blue wooden boats, and relaxed, artistic Medina vibe.",
      fr: "La ville côtière fortifiée du Maroc, autrefois Mogador. Réputée pour ses remparts du XVIIIe siècle, son port de pêche actif et ses barques bleues.",
      ar: "بلدة الصويرة الساحلية التاريخية، والمعروفة سابقاً باسم موكادور. تشتهر بأسوارها الحجرية التي تعود للقرن الثامن عشر، ومينائها النشط، وقواربها الخشبية الزرقاء."
    },
    highlights: {
      en: ["The dramatic oceanfront stone ramparts", "Fresh grilled seafood directly at the port", "Exploring local thuya wood artisan shops"],
      fr: ["Les remparts en pierre face à la mer", "Poissons grillés frais dégustés sur le port", "Ateliers d'artisanat en bois de thuya"],
      ar: ["الأسوار الحجرية المهيبة المطلة على المحيط", "ثمار البحر الطازجة المشوية في الميناء مباشرة", "استكشاف ورش نجارة خشب العرعر الفنية"]
    },
    visitingHours: {
      en: "Citadel open 24/7. Port active from early morning.",
      fr: "Citadelle ouverte 24h/24. Port actif dès le matin.",
      ar: "القلعة مفتوحة دائماً، وينشط الميناء منذ الصباح الباكر."
    },
    duration: {
      en: "Half Day",
      fr: "Demi-journée",
      ar: "نصف يوم"
    },
    bestSeason: {
      en: "Year-round (breezy and cooler than inland cities in summer)",
      fr: "Toute l'année (plus frais que l'intérieur des terres en été)",
      ar: "طوال العام (تتمتع بنسيم عليل وأكثر برودة من المدن الداخلية صيفاً)"
    },
    travelTips: {
      en: "Visit the port in the afternoon when fishing boats return. You can buy fresh fish and have it grilled immediately at adjacent stalls.",
      fr: "Visitez le port l'après-midi au retour des pêcheurs. Achetez du poisson frais et faites-le griller sur place.",
      ar: "زر الميناء بعد الظهر عند عودة قوارب الصيد، حيث يمكنك شراء السمك الطازج وشيه فوراً في الأكشاك المجاورة."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/%22Ein_bemerkenswertes_historisches_Denkmal%22._16.jpg/640px-%22Ein_bemerkenswertes_historisches_Denkmal%22._16.jpg"
    ],
    coords: {
      lat: 31.5125,
      lng: -9.7700
    }
  },
  {
    id: "meknes-mansour",
    name: {
      en: "Bab Mansour Gate",
      fr: "Porte Bab Mansour",
      ar: "بوابة باب المنصور لعلج"
    },
    category: "architecture",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Medina%2C_Meknes%2C_Morocco_-_panoramio.jpg/1280px-Medina%2C_Meknes%2C_Morocco_-_panoramio.jpg",
    description: {
      en: "Completed in 1732 under Moulay Abdallah, Bab Mansour is the grandest of all imperial Moroccan gates. It incorporates massive marble columns looted from Roman Volubilis and serves as the entry to the ancient palace complex.",
      fr: "Achevée en 1732 par Moulay Abdallah, Bab Mansour est la plus imposante des portes impériales du Maroc, ornée de colonnes romaines de Volubilis.",
      ar: "اكتمل بناؤها عام 1732 في عهد المولى عبد الله، وتعد باب المنصور أعظم البوابات الإمبراطورية في المغرب. تتضمن أعمدة رخامية ضخمة تم جلبها من موقع وليلي الأثري الروماني."
    },
    highlights: {
      en: ["Gigantic marble columns from Volubilis", "Ornate green-and-blue zellij mosaics", "Engraved Arabic calligraphy friezes"],
      fr: ["Colonnes géantes en marbre de Volubilis", "Mosaïques de zellige vert et bleu complexes", "Frises de calligraphie arabe gravées"],
      ar: ["أعمدة رخامية عملاقة من وليلي", "فسيفساء زليج معقدة باللونين الأخضر والأزرق", "نقوش خطية عربية بديعة"]
    },
    visitingHours: {
      en: "Best viewed externally (open 24/7)",
      fr: "Idéal pour une vue extérieure (24h/24)",
      ar: "أفضل مشاهدة خارجية (مفتوح 24 ساعة)"
    },
    duration: {
      en: "45 minutes",
      fr: "45 minutes",
      ar: "45 دقيقة"
    },
    bestSeason: {
      en: "Year-round (stunning at sunset)",
      fr: "Toute l'année (magnifique au coucher du soleil)",
      ar: "طوال العام (مذهل وقت الغروب)"
    },
    travelTips: {
      en: "Visit during the golden hour just before sunset. The gold and green zellij tiles glow beautifully, creating a perfect photographic opportunity.",
      fr: "Visitez pendant l'heure dorée juste avant le coucher du soleil. Les carreaux de zellige dorés et verts brillent magnifiquement.",
      ar: "قم بزيارتها خلال الساعة الذهبية قبيل الغروب مباشرة، حيث تتوهج بلاطات الزليج الذهبية والخضراء بشكل ساحر."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Medina%2C_Meknes%2C_Morocco_-_panoramio.jpg/640px-Medina%2C_Meknes%2C_Morocco_-_panoramio.jpg"
    ],
    coords: {
      lat: 33.8931,
      lng: -5.5653
    }
  },
  {
    id: "volubilis-ruins",
    name: {
      en: "Volubilis Roman Ruins",
      fr: "Site Archéologique de Volubilis",
      ar: "وليلي الأثرية الرومانية"
    },
    category: "history",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Volubilis_Longshot_II.jpg/1280px-Volubilis_Longshot_II.jpg",
    description: {
      en: "Located near Meknes, Volubilis is Morocco's best-preserved Roman archaeological site and a UNESCO World Heritage site. Walk through ancient basilicas, triumphal arches, and marvel at incredibly well-preserved floor mosaics.",
      fr: "Situé près de Meknès, Volubilis est le site romain le mieux préservé du Maroc et classé à l'UNESCO, célèbre pour ses mosaïques au sol.",
      ar: "تقع بالقرب من مكناس، وهي أفضل المواقع الأثرية الرومانية المحفوظة في المغرب وموقع تراث عالمي لليونسكو. تجول في البازيليك العتيقة وتأمل لوحات الفسيفساء الأرضية."
    },
    highlights: {
      en: ["In-situ mosaics of Hercules and Diana", "The Arch of Caracalla standing in dramatic scenery", "Rolling hills covered with wildflowers in spring"],
      fr: ["Mosaïques in-situ d'Hercule et Diane", "L'Arc de Caracalla dominant le paysage", "Collines verdoyantes couvertes de fleurs au printemps"],
      ar: ["لوحات فسيفساء أثرية لأعمال هرقل واستحمام ديانا", "قوس قره كلا الشامخ في طبيعة برية ساحرة", "تلال خضراء خلابة مغطاة بالزهور في الربيع"]
    },
    visitingHours: {
      en: "08:30 - 18:30 (Closes at sunset)",
      fr: "08h30 - 18h30 (Ferme au coucher du soleil)",
      ar: "من 8:30 صباحاً إلى 6:30 مساءً (يغلق عند الغروب)"
    },
    duration: {
      en: "2.5 hours",
      fr: "2.5 heures",
      ar: "ساعتان ونصف"
    },
    bestSeason: {
      en: "February to May (abundant green fields)",
      fr: "De février à mai (champs verdoyants)",
      ar: "من فبراير إلى مايو (حيث الحقول الخضراء والطقس المعتدل)"
    },
    travelTips: {
      en: "There is little shade at Volubilis. Bring a wide-brimmed hat, sunscreen, and plenty of water.",
      fr: "Il y a très peu d'ombre sur le site. Apportez un chapeau, de la crème solaire et de l'eau.",
      ar: "الموقع مكشوف تماماً لأشعة الشمس، لذا أحضر قبعة واقية، كريم حماية من الشمس، وماء كافٍ."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Volubilis_Longshot_II.jpg/640px-Volubilis_Longshot_II.jpg"
    ],
    coords: {
      lat: 34.0733,
      lng: -5.5544
    }
  },
  {
    id: "prison-qara",
    name: {
      en: "Habs Qara Subterranean Prison",
      fr: "Prison Souterraine de Qara",
      ar: "سجن قارة الأرضي التاريخي"
    },
    category: "history",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Medina%2C_Meknes%2C_Morocco_-_panoramio.jpg/1280px-Medina%2C_Meknes%2C_Morocco_-_panoramio.jpg",
    description: {
      en: "Built in the early 18th century by Sultan Moulay Ismail, Habs Qara is a colossal subterranean prison underneath the imperial city of Meknes. This massive maze of vaulted stone arches once held thousands of captives and remains a mysterious sight.",
      fr: "Construite au début du XVIIIe siècle par le sultan Moulay Ismail, Habs Qara est une prison souterraine colossale située sous la cité impériale de Meknès.",
      ar: "شيد سجن قارة تحت الأرض في أوائل القرن الثامن عشر في عهد السلطان المولى إسماعيل، وهو سجن أثري ضخم يمتد أسفل المدينة الإمبراطورية بمكناس."
    },
    highlights: {
      en: ["Colossal subterranean stone vaulted halls", "Portuguese architect historical legends", "Mysterious dark arches and echoes"],
      fr: ["Salles voûtées en pierre colossales", "Légendes historiques de l'architecte", "Arches sombres et mystérieuses"],
      ar: ["قاعات حجرية مقوسة ضخمة تحت الأرض", "الأساطير التاريخية للمصمم البرتغالي", "أقواس ممرات غامضة ومظلمة"]
    },
    visitingHours: {
      en: "09:00 - 18:00 daily.",
      fr: "09h00 - 18h00 tous les jours.",
      ar: "من 9:00 صباحاً إلى 6:00 مساءً يومياً."
    },
    duration: {
      en: "45 minutes",
      fr: "45 minutes",
      ar: "45 دقيقة"
    },
    bestSeason: {
      en: "Year-round (cool refuge during hot summer months)",
      fr: "Toute l'année (refuge frais en été)",
      ar: "طوال العام (ملاذ بارد ممتاز صيفاً)"
    },
    travelTips: {
      en: "Bring a small flashlight or use your phone light. The prison is dimly lit to maintain its historic and mysterious atmosphere. Hire a guide at the entrance to tell you the local legends.",
      fr: "Apportez une petite lampe de poche. La prison est peu éclairée pour préserver son atmosphère mystérieuse.",
      ar: "يرجى إحضار كشاف صغير أو استخدام كشاف الهاتف. السجن مضاء بشكل خافت للحفاظ على أجوائه الغامضة. استأجر مرشداً عند المدخل."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Medina%2C_Meknes%2C_Morocco_-_panoramio.jpg/640px-Medina%2C_Meknes%2C_Morocco_-_panoramio.jpg"
    ],
    coords: {
      lat: 33.8906,
      lng: -5.5651
    }
  },
  {
    id: "ait-ben-haddou",
    name: {
      en: "Aït Ben Haddou Kasbah",
      fr: "Ksar d'Aït-Ben-Haddou",
      ar: "قصر آيت بن حدو"
    },
    category: "history",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Ksar_A%C3%AFt_Benhaddou%2C_Marocco_%28%D8%A3%D9%8A%D8%AA_%D8%A8%D9%86_%D8%AD%D8%AF%D9%88%D8%8C_%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8%2C_%E2%B4%B0%E2%B5%A2%E2%B5%9C_%E2%B5%83%E2%B4%B0%E2%B4%B7%E2%B4%B7%E2%B5%93%29.jpg/1280px-Ksar_A%C3%AFt_Benhaddou%2C_Marocco_%28%D8%A3%D9%8A%D8%AA_%D8%A8%D9%86_%D8%AD%D8%AF%D9%88%D8%8C_%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8%2C_%E2%B4%B0%E2%B5%A2%E2%B5%9C_%E2%B5%83%E2%B4%B0%E2%B4%B7%E2%B4%B7%E2%B5%93%29.jpg",
    description: {
      en: "Morocco's most famous earthen Kasbah village (ksar), located along the former caravan route between the Sahara and Marrakech. A UNESCO World Heritage site and a legendary filming location for many Hollywood movies.",
      fr: "Le ksar en terre le plus célèbre du Maroc, situé sur l'ancienne route des caravanes entre le Sahara et Marrakech, classé par l'UNESCO.",
      ar: "أشهر قرية قصبة طينية (قصر) في المغرب، تقع على طول طريق القوافل السابق بين الصحراء ومراكش. موقع تراث عالمي لليونسكو وموقع تصوير سينمائي شهير."
    },
    highlights: {
      en: ["The beautiful earthen clay tower architecture", "Climbing to the granary for panoramic desert valley views", "Filming spots for Gladiator and Game of Thrones"],
      fr: ["L'architecture en terre et argile des tours", "La montée au grenier pour une vue panoramique", "Les lieux de tournage de Gladiator et Game of Thrones"],
      ar: ["عمارة الأبراج الطينية والترابية الفريدة", "الصعود للمخزن القديم لمشاهدة إطلالة الوادي الصحراوي", "مواقع تصوير أفلام غلادييتر وصراع العروش"]
    },
    visitingHours: {
      en: "Open 24/7 (Local guides available 09:00 - 18:00)",
      fr: "Ouvert 24h/24 (Guides disponibles de 09h00 à 18h00)",
      ar: "مفتوح دائماً (المرشدون متاحون من 9:00 صباحاً إلى 6:00 مساءً)"
    },
    duration: {
      en: "2 hours",
      fr: "2 heures",
      ar: "ساعتان"
    },
    bestSeason: {
      en: "Autumn and Spring",
      fr: "Automne et Printemps",
      ar: "الخريف والربيع"
    },
    travelTips: {
      en: "Cross the river using the stepping stones for a great photography perspective of the Kasbah reflecting on the shallow water flow.",
      fr: "Traversez la rivière sur les pierres de gué pour obtenir un superbe point de vue photographique.",
      ar: "اعبر النهر باستخدام حجارة العبور للحصول على لقطة تصويرية ممتازة لانعكاس القصبة على المياه الضحلة."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Ksar_A%C3%AFt_Benhaddou%2C_Marocco_%28%D8%A3%D9%8A%D8%AA_%D8%A8%D9%86_%D8%AD%D8%AF%D9%88%D8%8C_%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8%2C_%E2%B4%B0%E2%B5%A2%E2%B5%9C_%E2%B5%83%E2%B4%B0%D8%A3%D9%8A%D8%AA_%D8%A8%D9%86_%D8%AD%D8%AF%D9%88%29.jpg/640px-Ksar_A%C3%AFt_Benhaddou%2C_Marocco_%28%D8%A3%D9%8A%D8%AA_%D8%A8%D9%86_%D8%AD%D8%AF%D9%88%29.jpg"
    ],
    coords: {
      lat: 31.0500,
      lng: -7.1333
    }
  },
  {
    id: "atlas-mountains",
    name: {
      en: "High Atlas Valleys",
      fr: "Vallées du Haut Atlas",
      ar: "وديان الأطلس الكبير"
    },
    category: "nature",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Plateau_Yagour%2C_Agdal%2C_Morocco.jpg/1280px-Plateau_Yagour%2C_Agdal%2C_Morocco.jpg",
    description: {
      en: "The spectacular High Atlas mountain range, featuring lush valleys, terraced crop fields, and traditional Berber stone villages. Home to Mount Toubkal, North Africa's highest peak, it offers a dramatic alpine retreat.",
      fr: "La chaîne de montagnes spectaculaire du Haut Atlas, avec ses vallées verdoyantes, ses cultures en terrasses et ses villages berbères.",
      ar: "سلسلة جبال الأطلس الكبير المذهلة، وتتميز بوديانها الخصبة، وحقولها المدرجة، وقرى الأمازيغ الحجرية التقليدية."
    },
    highlights: {
      en: ["Scenic terraced crop fields and rivers", "Traditional stone-and-clay Berber villages", "Beautiful snowy peaks in winter and spring"],
      fr: ["Les cultures en terrasses et les rivières", "Les villages berbères en pierre et argile", "Les sommets enneigés en hiver et au printemps"],
      ar: ["الحقول المدرجة الخلابة وجداول المياه", "قرى الأمازيغ الحجرية والطينية التقليدية", "القمم الثلجية الساحرة في الشتاء والربيع"]
    },
    visitingHours: {
      en: "Accessible 24/7 (Excursions require local guide coordination)",
      fr: "Accessible 24h/24 (Excursions avec guide conseillées)",
      ar: "مفتوح دائماً (تتطلب الرحلات تنسيقاً مع مرشد محلي)"
    },
    duration: {
      en: "Full Day / Multi-day",
      fr: "Journée / Plusieurs jours",
      ar: "يوم كامل أو عدة أيام"
    },
    bestSeason: {
      en: "Spring (wildflowers) and Autumn",
      fr: "Printemps (fleurs sauvages) et Automne",
      ar: "الربيع (حيث الزهور البرية) والخريف"
    },
    travelTips: {
      en: "Hire a local Berber guide to visit the terraced villages of Ourika or Imlil. Tipping guides and support mule drivers is highly valued.",
      fr: "Faites appel à un guide berbère pour visiter Ourika ou Imlil. Le pourboire aux guides et muletiers est apprécié.",
      ar: "استعن بمرشد أمازيغي محلي لزيارة القرى المدرجة في أوريكا أو إمليل. إكرام المرشدين ومرافقي البغال يحظى بتقدير كبير."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Plateau_Yagour%2C_Agdal%2C_Morocco.jpg/640px-Plateau_Yagour%2C_Agdal%2C_Morocco.jpg"
    ],
    coords: {
      lat: 31.1353,
      lng: -7.9204
    }
  },
  {
    id: "tangier-medina",
    name: {
      en: "Tangier & Cap Spartel",
      fr: "Tanger & Cap Spartel",
      ar: "طنجة ورأس سبارتيل"
    },
    category: "culture",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Tanger_cor.jpg",
    description: {
      en: "Tangier is a gateway city connecting Africa and Europe. Cap Spartel stands as the northwestern point of mainland Africa, where the Atlantic Ocean meets the Mediterranean Sea. The historic Medina features colorful alleys and the old Kasbah.",
      fr: "Tanger est une ville passerelle reliant l'Afrique et l'Europe. Le Cap Spartel se dresse à la pointe nord-ouest de l'Afrique, là où l'océan Atlantique rencontre la mer Méditerranée.",
      ar: "تعتبر طنجة بوابة أفريقيا إلى أوروبا. يقف رأس سبارتيل في أقصى الشمال الغربي لأفريقيا حيث يلتقي المحيط الأطلسي بالبحر الأبيض المتوسط."
    },
    highlights: {
      en: ["Historic Cap Spartel lighthouse", "Meeting point of Atlantic and Mediterranean", "Exploring the vibrant Tangier Medina"],
      fr: ["Phare historique du Cap Spartel", "Point de rencontre de l'Atlantique et de la Méditerranée", "Exploration de la médina animée de Tanger"],
      ar: ["منارة رأس سبارتيل التاريخية", "نقطة التقاء الأطلسي والمتوسط", "استكشاف المدينة العتيقة الحيوية في طنجة"]
    },
    visitingHours: {
      en: "Cap Spartel accessible 24/7. Medina active 09:00 - 22:00.",
      fr: "Cap Spartel accessible 24h/24. Médina active de 09h00 à 22h00.",
      ar: "رأس سبارتيل مفتوح دائماً. تنشط المدينة من 9:00 صباحاً إلى 10:00 مساءً."
    },
    duration: {
      en: "Half Day",
      fr: "Demi-journée",
      ar: "نصف يوم"
    },
    bestSeason: {
      en: "Year-round",
      fr: "Toute l'année",
      ar: "طوال العام"
    },
    travelTips: {
      en: "Visit Cap Spartel at sunset to see the contrast between the oceans and enjoy tea at the panoramic cafe.",
      fr: "Visitez le Cap Spartel au coucher du soleil pour voir le contraste entre les océans et déguster un thé.",
      ar: "قم بزيارة رأس سبارتيل عند الغروب لتشهد تباين الألوان الخلاب وتناول الشاي في المقهى البانورامي."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Tanger_cor.jpg"
    ],
    coords: {
      lat: 35.7922,
      lng: -5.9289
    }
  },
  {
    id: "agadir-beach",
    name: {
      en: "Agadir & Oufella Kasbah",
      fr: "Agadir & Kasbah d'Agadir Oufella",
      ar: "أكادير وقصبة أكادير أوفلا"
    },
    category: "nature",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/South_view_sea_side_from_Kasbah_of_Agadir_Oufella.jpg/1280px-South_view_sea_side_from_Kasbah_of_Agadir_Oufella.jpg",
    description: {
      en: "Agadir is Morocco's premier beach resort destination, famous for its golden sandy crescent bay. The ruins of the historic Agadir Oufella Kasbah look down from the hill, offering spectacular panoramic vistas of the marina and city.",
      fr: "Agadir est la principale station balnéaire du Maroc, célèbre pour sa baie en croissant de sable doré. Les ruines d'Agadir Oufella dominent la ville.",
      ar: "تعد أكادير الوجهة الشاطئية الأولى في المغرب، وتشتهر بخليجها الرملي الذهبي على شكل هلال. تطل أطلال قصبة أكادير أوفلا التاريخية من أعلى التلة."
    },
    highlights: {
      en: ["Vast sandy crescent Agadir beach", "Panoramic bay views from Agadir Oufella ruins", "Modern marina and promenade strolls"],
      fr: ["Grande plage d'Agadir en croissant de sable", "Vue panoramique sur la baie depuis Agadir Oufella", "Balade sur la marina moderne et la promenade"],
      ar: ["شاطئ أكادير الرملي الشاسع", "إطلالة بانورامية ساحرة من قصبة أكادير أوفلا", "التمشي في المارينا الحديثة والكورنيش"]
    },
    visitingHours: {
      en: "Beach access 24/7. Kasbah ruins open 08:00 - 20:00.",
      fr: "Plage ouverte 24h/24. Kasbah ouverte de 08h00 à 20h00.",
      ar: "الشاطئ مفتوح دائماً. القصبة تفتح من 8:00 صباحاً إلى 8:00 مساءً."
    },
    duration: {
      en: "1 Day",
      fr: "1 Journée",
      ar: "يوم واحد"
    },
    bestSeason: {
      en: "Year-round (over 300 days of sunshine)",
      fr: "Toute l'année (plus de 300 jours de soleil)",
      ar: "طوال العام (أكثر من 300 يوم مشمس)"
    },
    travelTips: {
      en: "Take a taxi or cable car up to the Agadir Oufella Kasbah at twilight for breathtaking night views of the lit city coastline.",
      fr: "Montez à la Kasbah en téléphérique au crépuscule pour une vue imprenable sur la côte illuminée.",
      ar: "اصعد إلى قصبة أكادير أوفلا عبر التلفريك وقت الغسق للاستمتاع بإإطلالات ليلية خلابة للساحل المضاء."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/South_view_sea_side_from_Kasbah_of_Agadir_Oufella.jpg/1280px-South_view_sea_side_from_Kasbah_of_Agadir_Oufella.jpg"
    ],
    coords: {
      lat: 30.4222,
      lng: -9.6203
    }
  },
  {
    id: "ouarzazate-kasbah",
    name: {
      en: "Ouarzazate Kasbah Taourirt",
      fr: "Ouarzazate & Kasbah de Taourirt",
      ar: "ورزازات وقصبة تاوريرت"
    },
    category: "history",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Kasbah_Taourirt_in_Ouarzazate_2011.jpg/1280px-Kasbah_Taourirt_in_Ouarzazate_2011.jpg",
    description: {
      en: "Known as the Gateway to the Sahara and Morocco's Hollywood. The monumental Kasbah Taourirt is an outstanding 19th-century straw-and-clay palace, alongside world-famous cinema studios.",
      fr: "Surnommée la Porte du Désert et le Hollywood marocain. La Kasbah Taourirt est un palais colossal du XIXe siècle en terre et paille.",
      ar: "تلقب ببوابة الصحراء وهوليوود المغرب. تعتبر قصبة تاوريرت التاريخية قصرًا طينيًا فريدًا من القرن التاسع عشر بجانب استوديوهات السينما العالمية."
    },
    highlights: {
      en: ["The grand maze rooms of Kasbah Taourirt", "Atlas Cinema Studios movie tour", "Vast desert gateway landscapes"],
      fr: ["Le dédale de pièces de la Kasbah Taourirt", "Visite des studios de cinéma Atlas Studios", "Paysages impressionnants de la porte du désert"],
      ar: ["متاهات الغرف الأثرية بقصبة تاوريرت", "جولات استوديوهات أطلس السينمائية العالمية", "طبيعة خلابة عند مشارف الصحراء الكبرى"]
    },
    visitingHours: {
      en: "08:30 - 18:30 daily.",
      fr: "08h30 - 18h30 tous les jours.",
      ar: "من 8:30 صباحاً إلى 6:30 مساءً يومياً."
    },
    duration: {
      en: "3 hours",
      fr: "3 heures",
      ar: "3 ساعات"
    },
    bestSeason: {
      en: "Spring and Autumn",
      fr: "Printemps et Automne",
      ar: "الربيع والخريف"
    },
    travelTips: {
      en: "Combine your tour of Kasbah Taourirt with a trip to the nearby Cinema Museum just across the street.",
      fr: "Associez votre visite de la Kasbah à celle du Musée du Cinéma juste en face.",
      ar: "اجمع بين زيارتك لقصبة تاوريرت ومتحف السينما الواقع في الجهة المقابلة للشارع."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Kasbah_Taourirt_in_Ouarzazate_2011.jpg/1280px-Kasbah_Taourirt_in_Ouarzazate_2011.jpg"
    ],
    coords: {
      lat: 30.9189,
      lng: -6.8928
    }
  },
  {
    id: "dakhla-lagoon",
    name: {
      en: "Dakhla Lagoon",
      fr: "Lagune de Dakhla",
      ar: "داخلة لاغون البحرية"
    },
    category: "nature",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Dakhla%2C_Western_Sahara_%2811%29.jpg/1280px-Dakhla%2C_Western_Sahara_%2811%29.jpg",
    description: {
      en: "Where the pristine Sahara desert dunes meet the turquoise waters of the Atlantic Ocean. Dakhla is a world-class kitesurfing haven, famous for its rich marine wildlife, pink flamingos, and fresh oyster farms.",
      fr: "Là où les dunes du désert rencontrent les eaux turquoise de l'océan. Dakhla est un paradis mondial du kitesurf et de la vie marine.",
      ar: "حيرة الداخلة الساحرة هي حيث تلتقي الكثبان الرملية للصحراء الكبرى بمياه المحيط الأطلسي الفيروزية. تعد الداخلة ملاذاً عالمياً لعشاق الكايت سورف وتشتهر بطيور الفلامينغو ومزارع المحار."
    },
    highlights: {
      en: ["Spectacular turquoise lagoon and sand dunes", "World-class kitesurfing conditions", "Fresh local oyster tastings at seaside farms"],
      fr: ["Lagune turquoise spectaculaire et dunes de sable", "Conditions exceptionnelles pour le kitesurf", "Dégustation d'huîtres fraîches dans les parcs locaux"],
      ar: ["اللاغون الفيروزي الساحر والكثبان الرملية", "ظروف مثالية لرياضة ركوب الأمواج (الكايت سورف)", "تذوق المحار الطازج في المزارع الساحلية المباشرة"]
    },
    visitingHours: {
      en: "Accessible 24/7. Oyster farms open for lunch.",
      fr: "Accessible 24h/24. Parcs à huîtres ouverts pour le midi.",
      ar: "متاح دائماً. مزارع المحار تفتح لوجبة الغداء."
    },
    duration: {
      en: "Multi-day",
      fr: "Plusieurs jours",
      ar: "عدة أيام"
    },
    bestSeason: {
      en: "Year-round (consistent wind for kitesurfing)",
      fr: "Toute l'année (vent régulier pour le kitesurf)",
      ar: "طوال العام (رياح مستمرة مثالية للركوب)"
    },
    travelTips: {
      en: "Visit the 'Dune Blanche' (White Dune), a majestic white sand dune rising in the middle of the lagoon that is surrounded by water at high tide.",
      fr: "Visitez la Dune Blanche, une colline de sable blanc entourée d'eau à marée haute au milieu de la lagune.",
      ar: "زر 'الكثيب الأبيض'، وهو كثيب رملي أبيض يرتفع وسط البحيرة وتحيط به المياه بالكامل أثناء المد العالي."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Dakhla%2C_Western_Sahara_%2811%29.jpg/1280px-Dakhla%2C_Western_Sahara_%2811%29.jpg"
    ],
    coords: {
      lat: 23.6848,
      lng: -15.9579
    }
  },
  {
    id: "ifrane-lion",
    name: {
      en: "Ifrane Alpine Town",
      fr: "Ifrane la Cité Alpine",
      ar: "إفران مدينة الأرز الثلجية"
    },
    category: "nature",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Neige_ifrane.jpg",
    description: {
      en: "Known as Morocco's Little Switzerland, nestled high in the Middle Atlas. Featuring clean alpine architecture, snowy slopes in winter, leafy parks, and the famous stone lion sculpture carved during WWII.",
      fr: "Surnommée la Petite Suisse du Maroc, nichée dans le Moyen Atlas. Caractérisée par une architecture de style alpin et des pistes enneigées.",
      ar: "الملقبة بسويسرا المغرب الصغيرة، تقع في مرتفعات الأطلس المتوسط. تتميز بعمارتها الأوروبية وتتساقط فيها الثلوج شتاء وتضم تمثال الأسد الحجري الشهير."
    },
    highlights: {
      en: ["The famous stone lion landmark sculpture", "Alpine sloped-roof chalet architecture", "Surrounding Atlas cedar forest hikes"],
      fr: ["La sculpture du célèbre lion de pierre", "Architecture de style chalet alpin", "Randonnées dans la forêt de cèdres de l'Atlas"],
      ar: ["تمثال الأسد الحجري الشهير", "العمارة الجبلية ذات الأسقف المائلة", "المشي الرياضي في غابات الأرز المحيطة بالأطلس"]
    },
    visitingHours: {
      en: "Public city access (24/7)",
      fr: "Accès public libre (24h/24)",
      ar: "مفتوحة دائماً للعموم (24 ساعة)"
    },
    duration: {
      en: "Half Day",
      fr: "Demi-journée",
      ar: "نصف يوم"
    },
    bestSeason: {
      en: "December to February (for snow) or July (cool mountain air)",
      fr: "Décembre à février (neige) ou juillet (air frais)",
      ar: "من ديسمبر إلى فبراير (للثلوج) أو يوليو (لهواء الجبل العليل)"
    },
    travelTips: {
      en: "Take a picture with the Stone Lion early in the morning before tourist buses arrive, and explore the nearby Al Akhawayn University campus architecture.",
      fr: "Prenez votre photo avec le lion de pierre tôt le matin avant l'arrivée des bus.",
      ar: "التقط صورة مع الأسد الحجري في الصباح الباكر قبل وصول الحافلات السياحية، واستكشف عمارة جامعة الأخوين المجاورة."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/7/71/Neige_ifrane.jpg"
    ],
    coords: {
      lat: 33.5267,
      lng: -5.1094
    }
  },
  {
    id: "al-hoceima-beach",
    name: {
      en: "Al Hoceima Mediterranean Coast",
      fr: "Al Hoceima Côte Méditerranéenne",
      ar: "الحسيمة جوهرة المتوسط الساحلية"
    },
    category: "nature",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Al_Hoceima_Quemado.jpg/1280px-Al_Hoceima_Quemado.jpg",
    description: {
      en: "Nestled in the Rif region along the Mediterranean coast, Al Hoceima features stunning cliff landscapes framing clear turquoise bays like Quemado Beach. It offers a relaxed coastal getaway with rich Andalusian cultural influences.",
      fr: "Niché dans le Rif sur la côte méditerranéenne, Al Hoceima dévoile des falaises encadrant des baies turquoise comme la plage de Quemado.",
      ar: "تقع في منطقة الريف على طول ساحل البحر الأبيض المتوسط، وتتميز بجرودها الصخرية وخليجها الفيروزي مثل شاطئ كيمادو الساحر."
    },
    highlights: {
      en: ["The famous Quemado beach turquoise waters", "Dramatic cliff walks overlooking the Mediterranean", "Scenic viewpoints of active fishing harbors"],
      fr: ["Les eaux turquoise de la plage de Quemado", "Promenade sur les falaises face à la Méditerranée", "Points de vue sur les ports de pêche actifs"],
      ar: ["شاطئ كيمادو بمياهه الفيروزية الصافية", "التمشي الجبلي على الجروف المطلة على المتوسط", "نقاط مشاهدة رائعة لميناء الصيد النشط"]
    },
    visitingHours: {
      en: "Beach access 24/7.",
      fr: "Accès plage libre 24h/24.",
      ar: "الشاطئ مفتوح دائماً."
    },
    duration: {
      en: "1 Day",
      fr: "1 Journée",
      ar: "يوم واحد"
    },
    bestSeason: {
      en: "June to September (ideal swimming weather)",
      fr: "De juin à septembre (idéal pour la baignade)",
      ar: "من يونيو إلى سبتمبر (مثالي للسباحة والاستجمام)"
    },
    travelTips: {
      en: "Try the local grilled Mediterranean sardines at the harbor eateries for lunch. They are caught fresh daily by traditional methods.",
      fr: "Dégustez des sardines grillées fraîches sur le port pour le déjeuner.",
      ar: "تذوق السردين المتوسطي المشوي الطازج في مطاعم الميناء، والذي يتم صيده يومياً بالطرق التقليدية."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Al_Hoceima_Quemado.jpg/1280px-Al_Hoceima_Quemado.jpg"
    ],
    coords: {
      lat: 35.2472,
      lng: -3.9322
    }
  },
  {
    id: "tetouan-medina",
    name: {
      en: "Tetouan Andalusian Medina",
      fr: "Médina Andalouse de Tétouan",
      ar: "تطوان الحمامة البيضاء العريقة"
    },
    category: "history",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/View_of_Moulay_el_Mehdi_-_panoramio.jpg/1280px-View_of_Moulay_el_Mehdi_-_panoramio.jpg",
    description: {
      en: "A UNESCO World Heritage site, Tetouan's Medina is a masterpiece of Spanish-Moorish heritage. The whitewashed buildings stand against the green slopes of the Rif Mountains, retaining active artisan craft guilds.",
      fr: "Inscrite à l'UNESCO, la médina de Tétouan témoigne de l'héritage hispano-mauresque, avec ses façades blanches au pied du Rif.",
      ar: "مدرجة ضمن تراث اليونسكو، وتعد مدينة تطوان العتيقة تحفة فنية تجسد الطابع الأندلسي المغربي بمبانيها البيضاء عند سفوح الريف."
    },
    highlights: {
      en: ["The Andalusian whitewashed Medina paths", "Historic royal palace exterior square (Feddan)", "Exploring the traditional leather and carpet weavers"],
      fr: ["Les ruelles blanches andalouses de la médina", "La place extérieure du palais royal (Feddan)", "Découverte des artisans tanneurs et tisserands"],
      ar: ["الممرات الأندلسية للمدينة ذات الطلاء الأبيض", "ساحة الفدان التاريخية أمام القصر الملكي", "استكشاف الحرف التقليدية كالنسيج والدباغة"]
    },
    visitingHours: {
      en: "Medina accessible 24/7. Artisan shops open 09:00 - 18:30.",
      fr: "Médina ouverte 24h/24. Ateliers ouverts de 09h00 à 18h30.",
      ar: "المدينة مفتوحة دائماً. المحلات الحرفية تفتح من 9:00 صباحاً إلى 6:30 مساءً."
    },
    duration: {
      en: "2.5 hours",
      fr: "2.5 heures",
      ar: "ساعتان ونصف"
    },
    bestSeason: {
      en: "Spring and Autumn",
      fr: "Printemps et Automne",
      ar: "الربيع والخريف"
    },
    travelTips: {
      en: "Visit the Tetouan Ethnographic Museum to understand the deep historic links and artistic heritage shared with Andalusia.",
      fr: "Visitez le Musée Ethnographique de Tétouan pour comprendre les liens historiques avec l'Andalousie.",
      ar: "زر المتحف الإثنوغرافي بتطوان لفهم الروابط التاريخية العميقة والتراث الفني المشترك مع الأندلس."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/View_of_Moulay_el_Mehdi_-_panoramio.jpg/1280px-View_of_Moulay_el_Mehdi_-_panoramio.jpg"
    ],
    coords: {
      lat: 35.5722,
      lng: -5.3683
    }
  },
  {
    id: "asilah-citadel",
    name: {
      en: "Asilah Ocean Walls & Murals",
      fr: "Asilah Remparts & Fresques Artistiques",
      ar: "أصيلة الجداريات الفنية والأسوار البحرية"
    },
    category: "culture",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Asilah_seafront.jpg/1280px-Asilah_seafront.jpg",
    description: {
      en: "A peaceful coastal town famous for its whitewashed stone ramparts dating to the 15th-century Portuguese era. The quiet streets of the Medina serve as a giant canvas for international street artists during the annual cultural festival.",
      fr: "Une petite ville côtière célèbre pour ses remparts du XVe siècle. La médina accueille chaque année des artistes peignant des fresques murales.",
      ar: "أصيلة بلدة ساحلية وادعة تشتهر بأسوارها الحجرية التي تعود للبرتغاليين في القرن الخامس عشر. تعتبر المدينة القديمة معرضاً مفتوحاً للجداريات الفنية."
    },
    highlights: {
      en: ["Intricate art murals painted on white walls", "Walking along historic Portuguese seafront ramparts", "Sunset views of Atlantic waves against stone bastions"],
      fr: ["Fresques murales artistiques sur les murs blancs", "Balade sur les remparts portugais face à la mer", "Coucher de soleil sur l'océan depuis les bastions"],
      ar: ["الجداريات الفنية الملونة المرسومة على الجدران البيضاء", "المشي على الأسوار البرتغالية التاريخية المطلة على البحر", "منظر غروب الشمس الرائع وارتطام الأمواج بالحصون"]
    },
    visitingHours: {
      en: "Citadel access 24/7.",
      fr: "Remparts accessibles 24h/24.",
      ar: "القلعة مفتوحة دائماً."
    },
    duration: {
      en: "2 hours",
      fr: "2 heures",
      ar: "ساعتان"
    },
    bestSeason: {
      en: "Spring and Summer (when art festival occurs)",
      fr: "Printemps et Été (période du festival artistique)",
      ar: "الربيع والصيف (فترة تنظيم المهرجان الثقافي والفني)"
    },
    travelTips: {
      en: "Explore the ramparts at the 'Krikia' viewpoint just before sunset. It offers a spectacular elevated look of the Atlantic horizon.",
      fr: "Rendez-vous au point de vue de la Krikia avant le coucher du soleil pour une vue imprenable.",
      ar: "توجه نحو برج 'الكريشية' قبيل الغروب للحصول على إطلالة مرتفعة مذهلة لأفق المحيط الأطلسي."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Asilah_seafront.jpg/1280px-Asilah_seafront.jpg"
    ],
    coords: {
      lat: 35.4667,
      lng: -6.0333
    }
  },
  {
    id: "ouzoud-waterfalls",
    name: {
      en: "Ouzoud Waterfalls",
      fr: "Cascades d'Ouzoud",
      ar: "شلالات أوزود الطبيعية"
    },
    category: "nature",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Cascades_d%27Ouzoud.jpg",
    description: {
      en: "The most spectacular waterfalls in North Africa, plunging over 110 meters into the El-Abid River gorge. Surrounded by ancient olive trees and limestone cliffs, it is home to playful wild Barbary macaque monkeys.",
      fr: "Les plus grandes cascades d'Afrique du Nord, plongeant de 110 mètres dans les gorges d'El-Abid. Elles abritent des singes macaques.",
      ar: "أعلى شلالات شمال أفريقيا، حيث تنحدر المياه من ارتفاع 110 أمتار نحو وادي نهر العبيد. تحيط بها أشجار الزيتون الأثرية وتعتبر موطناً لقردة المكاك."
    },
    highlights: {
      en: ["Spectacular 110-meter cascading waterfalls", "Interaction with wild Barbary macaque monkeys", "Scenic olive orchard walks and boat crossings"],
      fr: ["Cascades vertigineuses de 110 mètres", "Rencontre avec les singes macaques sauvages", "Balade au milieu des oliviers et traversées en barque"],
      ar: ["الشلالات المتدفقة بارتفاع 110 أمتار", "التقاط الصور مع قردة المكاك البرية الأليفة", "المشي عبر بساتين الزيتون العريقة وركوب القوارب"]
    },
    visitingHours: {
      en: "Accessible 24/7. Boat crossings active 08:30 - 18:30.",
      fr: "Accessible 24h/24. Barques actives de 08h30 à 18h30.",
      ar: "مفتوح دائماً. القوارب تعمل من 8:30 صباحاً إلى 6:30 مساءً."
    },
    duration: {
      en: "4 hours",
      fr: "4 heures",
      ar: "4 ساعات"
    },
    bestSeason: {
      en: "Spring (for maximum water flow from melting snow)",
      fr: "Printemps (débit maximal avec la fonte des neiges)",
      ar: "الربيع (حيث يكون تدفق المياه في أقصاه نتيجة ذوبان الثلوج)"
    },
    travelTips: {
      en: "Wear sturdy shoes with good grip. The stone paths leading down to the pool can be slippery from waterfall mist.",
      fr: "Portez des chaussures adhérentes, les chemins en pierre peuvent être glissants.",
      ar: "يرجى ارتداء أحذية متينة مانعة للانزلاق، فالممرات الحجرية المؤدية للقاع رطبة جداً بسبب رذاذ الماء."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Cascades_d%27Ouzoud.jpg"
    ],
    coords: {
      lat: 32.0153,
      lng: -6.7189
    }
  },
  {
    id: "paradise-valley",
    name: {
      en: "Paradise Valley Oasis",
      fr: "Paradise Valley",
      ar: "وادي الجنة أورير"
    },
    category: "nature",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Paradise_Valley_palmiers.jpg/1280px-Paradise_Valley_palmiers.jpg",
    description: {
      en: "A stunning palm-lined canyon oasis located in the High Atlas foothills near Agadir. Famous for its deep turquoise rock pools, small cascading streams, and peaceful hiking trails framing natural water chutes.",
      fr: "Une oasis verdoyante nichée au fond d'un canyon près d'Agadir, célèbre pour ses piscines naturelles turquoise et ses palmiers.",
      ar: "واحة خلابة محاطة بأشجار النخيل تقع في سفوح الأطلس بالقرب من أكادير. تشتهر ببركها المائية الصخرية ذات اللون الفيروزي."
    },
    highlights: {
      en: ["Stunning turquoise natural rock pools", "Scenic hikes through palm-fringed gorges", "Cooling off with natural cliff jumps"],
      fr: ["Piscines naturelles turquoise dans la roche", "Randonnées au cœur des gorges bordées de palmiers", "Sauts depuis les falaises dans l'eau fraîche"],
      ar: ["برك صخرية طبيعية فيروزية ساحرة", "مسارات المشي وسط الواحات وأشجار النخيل", "الاسترخاء والقفز الآمن من الجروف المائية"]
    },
    visitingHours: {
      en: "Accessible 24/7. Excursions best in daylight.",
      fr: "Accessible 24h/24. Idéal en journée.",
      ar: "مفتوح دائماً. يفضل الزيارة أثناء النهار."
    },
    duration: {
      en: "Half Day",
      fr: "Demi-journée",
      ar: "نصف يوم"
    },
    bestSeason: {
      en: "Late winter and Spring (when pools are full of river water)",
      fr: "Fin de l'hiver et Printemps (bassins remplis d'eau)",
      ar: "أواخر الشتاء والربيع (عندما تكون البرك ممتلئة بالماء الصافي)"
    },
    travelTips: {
      en: "Visit in spring after recent rains when pools are at their deepest. Stop at local honey and argan oil cooperatives along the honey route.",
      fr: "Visitez au printemps après les pluies pour profiter de bassins profonds.",
      ar: "قم بالزيارة في الربيع للاستمتاع ببرك عميقة. توقف عند تعاونيات العسل وأركان التقليدية المنتشرة في الطريق."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Paradise_Valley_palmiers.jpg/1280px-Paradise_Valley_palmiers.jpg"
    ],
    coords: {
      lat: 30.5833,
      lng: -9.5167
    }
  },
  {
    id: "todra-gorge",
    name: {
      en: "Todra Gorge Canyon",
      fr: "Gorges du Todra",
      ar: "مضايق تودغى الشامخة"
    },
    category: "nature",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Todra_Gorge_Morning_2011.jpg/1280px-Todra_Gorge_Morning_2011.jpg",
    description: {
      en: "A spectacular limestone canyon in the eastern High Atlas near Tinghir. The cliff walls rise vertically up to 400 meters, creating a dramatic, narrow rocky corridor with a shallow spring river flowing along the base.",
      fr: "Un canyon spectaculaire dans le Haut Atlas oriental. Les falaises s'élèvent verticalement jusqu'à 400 mètres.",
      ar: "ممر صخري كلسي مهيب يقع في شرق جبال الأطلس الكبير بالقرب من تنغير. ترتفع جدران الجرف عمودياً حتى 400 متر."
    },
    highlights: {
      en: ["Towering 400m high vertical limestone cliffs", "Walking along the cold shallow Todra river base", "World-class natural rock climbing spots"],
      fr: ["Falaises de calcaire verticales hautes de 400 mètres", "Marche le long du lit frais de la rivière Todra", "Sites réputés d'escalade naturelle sur roche"],
      ar: ["جروف كلسية شاهقة الارتفاع بارتفاع 400 متر", "المشي بجانب مياه نهر تودغى الباردة والضحلة", "مواقع تسلق صخور طبيعية ذات مستوى عالمي"]
    },
    visitingHours: {
      en: "Open 24/7.",
      fr: "Ouvert 24h/24.",
      ar: "مفتوح دائماً."
    },
    duration: {
      en: "2 hours",
      fr: "2 heures",
      ar: "ساعتان"
    },
    bestSeason: {
      en: "Spring and Autumn (cooler weather inside the canyon)",
      fr: "Printemps et Automne (températures agréables)",
      ar: "الربيع والخريف (طقس معتدل وجميل داخل المضيق)"
    },
    travelTips: {
      en: "Visit in the early morning when the sunlight hits the top of the red cliffs, causing them to glow with a brilliant golden hue.",
      fr: "Visitez tôt le matin pour voir le soleil illuminer le sommet des falaises rouges.",
      ar: "قم بالزيارة في الصباح الباكر لتشهد أشعة الشمس وهي تلامس قمم الجبال الحمراء لتتوهج بلون ذهبي بديع."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Todra_Gorge_Morning_2011.jpg/1280px-Todra_Gorge_Morning_2011.jpg"
    ],
    coords: {
      lat: 31.5519,
      lng: -5.5967
    }
  },
  {
    id: "dades-valley",
    name: {
      en: "Dades Valley Winding Road",
      fr: "Vallée du Dadès",
      ar: "وادي دادس ومنعرجاته الخلابة"
    },
    category: "nature",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Gorges_du_dades03.jpg",
    description: {
      en: "Carved by the Dades River, this spectacular valley features deep red rock canyons, strange geological formations known as 'monkey fingers', and the famous winding mountain road hairpin bends of Tisdrine.",
      fr: "Creusée par l'oued Dadès, cette vallée offre des canyons rouges, des formations rocheuses en 'doigts de singe' et les célèbres lacets de Tisdrine.",
      ar: "منحوت بفعل نهر دادس، ويتميز الوادي بجروفه الصخرية الحمراء، وتشكيلاته الجيولوجية العجيبة المسماة 'أصابع القردة'، ومنعرجات تيسدرين الالتوائية الشهيرة."
    },
    highlights: {
      en: ["The famous Tisdrine hairpin mountain curves", "Unique 'monkey fingers' red rock formations", "Scenic historic Kasbah structures nestled in oases"],
      fr: ["Les célèbres virages en épingle de Tisdrine", "Formations géologiques étranges en 'doigts de singe'", "Kasbahs historiques nichées au cœur d'oasis vertes"],
      ar: ["منعرجات تيسدرين الجبلية الملتوية الشهيرة", "تشكيلات صخرية حمراء مميزة تشبه أصابع القردة", "قصبات أثرية ساحرة تنتشر بين واحات النخيل"]
    },
    visitingHours: {
      en: "Open 24/7.",
      fr: "Ouvert 24h/24.",
      ar: "مفتوح دائماً."
    },
    duration: {
      en: "Half Day",
      fr: "Demi-journée",
      ar: "نصف يوم"
    },
    bestSeason: {
      en: "March to May and October to November",
      fr: "De mars à mai et d'octobre à novembre",
      ar: "من مارس إلى مايو ومن أكتوبر إلى نوفمبر"
    },
    travelTips: {
      en: "Drive up to the top panorama cafe at Tisdrine. It offers the best vantage point to photograph the winding serpentine road curves below.",
      fr: "Montez au café panoramique au sommet de Tisdrine pour photographier la route sinueuse.",
      ar: "اصعد إلى المقهى البانورامي المطل على تيسدرين لالتقاط الصورة الشهيرة للمنعرجات الأفعوانية بالأسفل."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/9/98/Gorges_du_dades03.jpg"
    ],
    coords: {
      lat: 31.4286,
      lng: -5.9928
    }
  },
  {
    id: "legzira-beach",
    name: {
      en: "Legzira Beach Red Arches",
      fr: "Plage de Legzira",
      ar: "شاطئ الكزيرة وأقواسه الصخرية"
    },
    category: "nature",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Playa_de_Lagzira_en_Sidi_Ifni_%28Marruecos%29.jpg/1280px-Playa_de_Lagzira_en_Sidi_Ifni_%28Marruecos%29.jpg",
    description: {
      en: "One of Morocco's most unique beach destinations, famous for its colossal natural red sandstone arches carved by ocean erosion. The beach faces the wild Atlantic, offering a dramatic and windswept shoreline landscape.",
      fr: "L'une des plages les plus emblématiques du Maroc, célèbre pour ses arches colossales en grès rouge sculptées par l'érosion marine.",
      ar: "شاطئ الكزيرة يعتبر واحدة من أكثر الشواطئ فرادة في المغرب، وتشتهر بأقواسه الطبيعية العملاقة من الحجر الرملي الأحمر التي نحتتها عوامل تعرية أمواج المحيط."
    },
    highlights: {
      en: ["The monumental natural red sandstone ocean arches", "Wild windswept Atlantic shoreline sands", "Sunset views of Atlantic waves against stone bastions"],
      fr: ["Les arches marines monumentales en grès rouge", "Plage de sable de l'Atlantique sauvage et venteuse", "Promenade au coucher du soleil au bord de l'eau"],
      ar: ["الأقواس الصخرية البحرية الحمراء الضخمة", "رمال الشاطئ الأطلسي البري المفتوح", "التمشي الرومانسي وقت الغروب على حافة الأمواج"]
    },
    visitingHours: {
      en: "Open 24/7. Best visited at low tide.",
      fr: "Ouvert 24h/24. Recommandé à marée basse.",
      ar: "مفتوح دائماً. يفضل زيارته أثناء الجزر المنخفض."
    },
    duration: {
      en: "3 hours",
      fr: "3 heures",
      ar: "3 ساعات"
    },
    bestSeason: {
      en: "Year-round (cooler sea breeze in summer)",
      fr: "Toute l'année (brise marine fraîche en été)",
      ar: "طوال العام (نسيم البحر العليل يلطف الجو صيفاً)"
    },
    travelTips: {
      en: "Always check the local tide charts before walking under the arches. The arches are only safely accessible on foot during low tide.",
      fr: "Consultez la table des marées avant de marcher sous les arches.",
      ar: "يرجى دائماً التحقق من جدول المد والجزر قبل التوجه للأقواس، حيث لا يمكن المرور تحتها بأمان إلا أثناء الجزر."
    },
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Playa_de_Lagzira_en_Sidi_Ifni_%28Marruecos%29.jpg/1280px-Playa_de_Lagzira_en_Sidi_Ifni_%28Marruecos%29.jpg"
    ],
    coords: {
      lat: 29.4444,
      lng: -10.1203
    }
  }
];
