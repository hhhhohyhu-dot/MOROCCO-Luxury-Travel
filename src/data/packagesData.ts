import type { LocalizedText, LocalizedArray } from './destinationsData';

export interface ItineraryDay {
  day: number;
  title: LocalizedText;
  description: LocalizedText;
}

export interface Package {
  id: string;
  name: LocalizedText;
  tagline: LocalizedText;
  priceUSD: number;
  durationDays: number;
  image: string;
  includedKeys: string[];
  highlights: LocalizedArray;
  itinerary: ItineraryDay[];
  transportation: LocalizedText;
  meals: LocalizedText;
}

export const packagesData: Package[] = [
  {
    id: "imperial-odyssey",
    name: {
      en: "Imperial Cities Grand Odyssey",
      fr: "Grande Odyssée des Villes Impériales",
      ar: "ملحمة العواصم الإمبراطورية الكبرى"
    },
    tagline: {
      en: "The definitive luxury historical path through Casablanca, Rabat, Meknes, Fes, and Marrakech",
      fr: "Le voyage historique de luxe ultime à travers Rabat, Meknès, Fès et Marrakech",
      ar: "مسار السفر التاريخي الفاخر عبر الرباط ومكناس وفاس ومراكش"
    },
    priceUSD: 3800,
    durationDays: 7,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Bahia_Palace_large_court.jpg/1280px-Bahia_Palace_large_court.jpg",
    includedKeys: ["airportPick", "guidedTour", "luxuryHotel", "mealsIncl", "vipLounge"],
    highlights: {
      en: [
        "Private suite in Fes and Marrakech luxury Riads",
        "Expert guide briefings on Islamic architecture and history",
        "Fine dining inside candle-lit palace courtyards"
      ],
      fr: [
        "Hébergement en suite dans des riads de prestige à Fès et Marrakech",
        "Conférences privées d'experts sur l'architecture islamique",
        "Dîners raffinés dans des patios de palais éclairés aux chandelles"
      ],
      ar: [
        "إقامة في أجنحة خاصة برياضات فاس ومراكش الفاخرة",
        "شروحات من خبراء ومؤرخين حول العمارة الإسلامية",
        "عشاء راقٍ داخل أفنية القصور التاريخية على ضوء الشموع"
      ]
    },
    transportation: {
      en: "Private Mercedes V-Class chauffeur",
      fr: "Chauffeur privé en Mercedes Classe V",
      ar: "سائق خاص مع سيارة مرسيدس فئة V"
    },
    meals: {
      en: "Gourmet breakfasts, luxury riad dining, and sommelier vineyard lunch",
      fr: "Petits déjeuners fins, dîners en riads et déjeuner dégustation au vignoble",
      ar: "فطور فاخر، عشاء في رياضات فخمة، وغداء خاص في الكروم"
    },
    itinerary: [
      {
        day: 1,
        title: { en: "Arrival & Casablanca Coastal Tour", fr: "Arrivée & Visite de Casablanca", ar: "الوصول وجولة الدار البيضاء الساحلية" },
        description: {
          en: "Fast-track airport terminal clearance. Chauffeur transfer to view the monumental Hassan II Mosque, followed by welcome dinner.",
          fr: "Accueil prioritaire à l'aéroport. Transfert pour visiter la Mosquée Hassan II puis dîner de bienvenue.",
          ar: "تخليص سريع للإجراءات في المطار وتوصيل خاص لزيارة مسجد الحسن الثاني، تليها وجبة العشاء الترحيبية."
        }
      },
      {
        day: 2,
        title: { en: "Rabat Capital & Ancient Udayas Kasbah", fr: "Rabat Capitale & Kasbah des Oudaïas", ar: "العاصمة الرباط وقصبة الأوداية الأثرية" },
        description: {
          en: "Morning drive to Rabat. Explore the Hassan Tower walls and walk the beautiful blue-and-white Kasbah pathways.",
          fr: "Route matinale vers Rabat. Visite de la Tour Hassan et balade dans la Kasbah des Oudaïas.",
          ar: "التنقل صباحاً إلى الرباط واستكشاف أسوار صومعة حسان وممرات قصبة الأوداية الزرقاء والبيضاء."
        }
      },
      {
        day: 3,
        title: { en: "Volubilis Roman Columns & Meknes Gate", fr: "Volubilis Romain & Bab Mansour de Meknès", ar: "أعمدة وليلي الرومانية وباب المنصور بمكناس" },
        description: {
          en: "Guided walk of Volubilis ruins. Stop at Meknes to admire the grand Bab Mansour Gate and Sijan Qara subterranean vaults.",
          fr: "Visite guidée de Volubilis. Halte à Meknès pour admirer la porte Bab Mansour et les souterrains de Qara.",
          ar: "جولة برفقة مرشد في أطلال وليلي وتوقف في مكناس لمشاهدة باب المنصور وسجن قارة الأثري تحت الأرض."
        }
      },
      {
        day: 4,
        title: { en: "The Labyrinth of Fes el-Bali", fr: "Le Labyrinthe de Fès el-Bali", ar: "متاهات فاس البالي العريقة" },
        description: {
          en: "Full day private tour of Fes Medina, featuring Bou Inania Madrasa, Al-Qarawiyyin, and Chouara Tannery.",
          fr: "Journée de visite privée de la médina de Fès : médersa Bou Inania, Al-Qarawiyyin et tannerie Chouara.",
          ar: "يوم كامل لاستكشاف مدينة فاس القديمة، ويشمل مدرسة البوعنانية، القرويين، ودباغة الشوارة."
        }
      },
      {
        day: 5,
        title: { en: "Scenic Middle Atlas Drive to Marrakech", fr: "Route du Moyen Atlas vers Marrakech", ar: "عبور الأطلس المتوسط نحو مراكش" },
        description: {
          en: "Travel south through cedar forests and Berber mountain towns, arriving at your Marrakech luxury boutique riad.",
          fr: "Voyage vers le sud à travers les forêts de cèdres et montagnes du Moyen Atlas, arrivée au riad à Marrakech.",
          ar: "السفر جنوباً عبر غابات الأرز وبلدات الأطلس الجبلية، والوصول إلى رياضك الفاخر في مراكش."
        }
      },
      {
        day: 6,
        title: { en: "Marrakech Palaces & Medina Souks", fr: "Palais de Marrakech & Souks", ar: "قصور مراكش وأسواق المدينة القديمة" },
        description: {
          en: "Visit Bahia Palace stained glass rooms. Afternoon guided search for rugs and spices in Jemaa el-Fnaa souks.",
          fr: "Visite du Palais de la Bahia. Recherche guidée d'artisanat dans les souks de la place Jemaa el-Fnaa.",
          ar: "زيارة قصر الباهية الغني بالزجاج الملون، وجولة تسوق بعد الظهر للتوابل والسجاد في أسواق ساحة جامع الفنا."
        }
      },
      {
        day: 7,
        title: { en: "Farewell Organic Breakfast & Departure", fr: "Petit-déjeuner d'Adieu & Départ", ar: "فطور الوداع العضوي والمغادرة" },
        description: {
          en: "Organic rooftop breakfast, souvenir shopping assistance, and private transfer back to Casablanca/Marrakech airport.",
          fr: "Petit-déjeuner bio sur le toit, aide pour vos achats et transfert VIP vers l'aéroport.",
          ar: "فطور عضوي على السطح، مساعدة في شراء الهدايا التذكارية، وتوصيل خاص إلى مطار الدار البيضاء أو مراكش."
        }
      }
    ]
  },
  {
    id: "sahara-expedition",
    name: {
      en: "Sahara Oasis & Desert Expedition",
      fr: "Expédition Oasis & Désert du Sahara",
      ar: "رحلة الصحراء والواحات الكبرى"
    },
    tagline: {
      en: "An unforgettable adventure through the Atlas Mountains, Ait Ben Haddou Kasbah, and Erg Chebbi dunes",
      fr: "Une aventure inoubliable : Moyen Atlas, Ksar d'Aït-Ben-Haddou et dunes de Merzouga",
      ar: "مغامرة لا تُنسى تعبر جبال الأطلس، قصر آيت بن حدو، وكثبان عرق الشبي الذهبية"
    },
    priceUSD: 2900,
    durationDays: 5,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Merzouga%2C_Morocco.jpg/1280px-Merzouga%2C_Morocco.jpg",
    includedKeys: ["airportPick", "guidedTour", "luxuryHotel", "mealsIncl"],
    highlights: {
      en: [
        "Private luxury glamping tent in Erg Chebbi desert",
        "Riding camels at golden hour sunrise",
        "Sunset view of the majestic Ait Ben Haddou earthen towers"
      ],
      fr: [
        "Bivouac dans une tente berbère de luxe à l'Erg Chebbi",
        "Randonnée à chameau au lever du soleil doré",
        "Coucher de soleil sur les tours d'argile d'Aït-Ben-Haddou"
      ],
      ar: [
        "إقامة في خيمة صحراوية فاخرة وخاصة في عرق الشبي",
        "ركوب الجمال وقت شروق الشمس الذهبي",
        "مشاهدة الغروب فوق أبراج قصر آيت بن حدو الطينية المهيبة"
      ]
    },
    transportation: {
      en: "Premium 4x4 Land Cruiser vehicle",
      fr: "4x4 Land Cruiser haut de gamme avec chauffeur",
      ar: "سيارة دفع رباعي فاخرة من طراز لاند كروزر"
    },
    meals: {
      en: "Traditional campfire stews, mountain picnic lunch, and organic tagines",
      fr: "Tajines et ragoûts cuits au feu de camp, pique-nique en montagne",
      ar: "وجبات مطهوة على نار المخيم، نزهة غداء جبلية، وطواجن عضوية"
    },
    itinerary: [
      {
        day: 1,
        title: { en: "Atlas Crossing & Berber Valleys", fr: "Traversée de l'Atlas & Vallées Berbères", ar: "عبور الأطلس والوديان الأمازيغية" },
        description: {
          en: "Chauffeur pick up from Marrakech. Ascend through High Atlas curves, visiting traditional stone-and-clay villages.",
          fr: "Départ de Marrakech. Ascension des cols du Haut Atlas et visite de villages berbères traditionnels.",
          ar: "الاستقبال بسيارة الدفع الرباعي من مراكش، الصعود عبر منعرجات الأطلس الكبير وزيارة قرى حجرية تقليدية."
        }
      },
      {
        day: 2,
        title: { en: "Ait Ben Haddou & Cinematic History", fr: "Aït-Ben-Haddou & Histoire Cinématographique", ar: "قصر آيت بن حدو والتاريخ السينمائي" },
        description: {
          en: "Explore Ait Ben Haddou Kasbah. Learn about Gladiator filming sets and climb to the ancient granary.",
          fr: "Visite du ksar d'Aït-Ben-Haddou. Découverte des décors de cinéma de Gladiator et montée au grenier.",
          ar: "استكشاف قصر آيت بن حدو الأثري، والتعرف على مواقع تصوير فيلم غلادييتر والصعود إلى مخزن الحبوب القديم."
        }
      },
      {
        day: 3,
        title: { en: "Dades Valley to Sahara Gold Dunes", fr: "De la Vallée du Dadès aux Dunes du Sahara", ar: "من وادي دادس إلى كثبان الصحراء الذهبية" },
        description: {
          en: "Drive past Dades gorges. Arrive at Merzouga Sahara to mount camels and ride into Erg Chebbi dunes for sunset glamping.",
          fr: "Route à travers les gorges du Dadès. Arrivée à Merzouga pour une balade à chameau vers le camp de luxe.",
          ar: "المرور بوادي دادس والوصول إلى صحراء مرزوكة لركوب الجمال والتوجه لكثبان عرق الشبي للتخييم الفاخر."
        }
      },
      {
        day: 4,
        title: { en: "Sahara Sunrise & Nomadic Tents Tea", fr: "Lever de Soleil & Thé sous la Tente Nomade", ar: "شروق الصحراء والشاي في خيمة البدو" },
        description: {
          en: "Capture 5:30 AM dunes sunrise. Drive to meet local nomads and share mint tea under goat-hair shelters.",
          fr: "Lever de soleil sur les dunes à 05h30. Rencontre avec des nomades locaux pour partager un thé sous la tente.",
          ar: "التقاط شروق شمس الصحراء عند 5:30 صباحاً، وزيارة عائلات البدو الرحل لتناول الشاي بالنعناع في خيامهم."
        }
      },
      {
        day: 5,
        title: { en: "Draas Oasis Route back to Marrakech", fr: "Retour vers Marrakech par l'Oasis du Draa", ar: "العودة لمراكش عبر واحة درعة" },
        description: {
          en: "Return drive via Draa palm groves, crossing back over Atlas mountains to drop off in Marrakech.",
          fr: "Route retour par la palmeraie du Draa et traversée de l'Atlas, dépôt à votre hôtel à Marrakech.",
          ar: "طريق العودة عبر واحات النخيل بوادي درعة، عبور جبال الأطلس مجدداً والتوصيل إلى مراكش."
        }
      }
    ]
  },
  {
    id: "northern-coast",
    name: {
      en: "Northern Blue & Coast Retreat",
      fr: "Retraite Côtière & Cités Bleues du Nord",
      ar: "رحلة الساحل الشمالي والمدن الزرقاء"
    },
    tagline: {
      en: "Breezy historical journeys through Tangier, Tetouan, Chefchaouen, and Asilah",
      fr: "Escapade marine et historique à Tanger, Tétouan, Chefchaouen et Asilah",
      ar: "رحلة ساحلية وتاريخية هادئة عبر طنجة وتطوان وشفشاون وأصيلة"
    },
    priceUSD: 2400,
    durationDays: 6,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Chefchaouen_%2852189357475%29.jpg/1280px-Chefchaouen_%2852189357475%29.jpg",
    includedKeys: ["airportPick", "guidedTour", "luxuryHotel", "mealsIncl"],
    highlights: {
      en: [
        "Private walking tour of Chefchaouen blue pathways",
        "Explore Tangier Medina and Hercules Caves cliff views",
        "Art galleries and sea wall sunset strolls in Asilah"
      ],
      fr: [
        "Visite privée des ruelles bleues de Chefchaouen",
        "Exploration de la médina de Tanger et des Grottes d'Hercule",
        "Galeries d'art et promenade sur les remparts d'Asilah"
      ],
      ar: [
        "جولة خاصة في أزقة وممرات شفشاون الزرقاء الحالمة",
        "استكشاف المدينة القديمة في طنجة وإطلالة مغارة هرقل",
        "معارض الفنون والتمشي على الأسوار البحرية في أصيلة"
      ]
    },
    transportation: {
      en: "Luxury Executive Sedan",
      fr: "Berline de luxe avec chauffeur",
      ar: "سيارة سيدان فاخرة خاصة مع سائق"
    },
    meals: {
      en: "Fresh Mediterranean seafood, northern tagines, and mint tea pastries",
      fr: "Poissons et fruits de mer de la Méditerranée, tajines du nord",
      ar: "مأكولات بحرية متوسطية طازجة، طواجن شمالية، وشاي بالنعناع"
    },
    itinerary: [
      {
        day: 1,
        title: { en: "Tangier Gate & Hercules Caves", fr: "Tanger & les Grottes d'Hercule", ar: "بوابة طنجة ومغارة هرقل" },
        description: {
          en: "Pick up from Tangier port/airport. Tour the legendary Hercules Caves ocean opening and Cap Spartel lighthouse.",
          fr: "Accueil à Tanger. Visite des célèbres Grottes d'Hercule et du phare du Cap Spartel.",
          ar: "الاستقبال في طنجة وزيارة مغارة هرقل المطلة على المحيط ومنارة كاب سبارتيل."
        }
      },
      {
        day: 2,
        title: { en: "Tetouan White Medina & Artisans", fr: "Tétouan la Médina Blanche & Artisans", ar: "تطوان المدينة البيضاء والحرفيون" },
        description: {
          en: "Visit Tetouan's UNESCO-listed Andalusian white medina. View leather tanneries and wood carving guilds.",
          fr: "Visite de la médina blanche andalouse de Tétouan. Découverte des ateliers de cuir et bois.",
          ar: "زيارة مدينة تطوان البيضاء ذات الطابع الأندلسي واستكشاف ورش الجلد والخشب التقليدية."
        }
      },
      {
        day: 3,
        title: { en: "Chefchaouen Dreamy Blue Steps", fr: "Les Ruelles Bleues Féeriques de Chefchaouen", ar: "ممرات شفشاون الزرقاء الحالمة" },
        description: {
          en: "Guided crawl of Chefchaouen blue pathways, capturing colorful steps and flower pots. Sunset at Spanish Mosque.",
          fr: "Balade guidée dans les ruelles bleues de Chefchaouen. Coucher de soleil au-dessus du village.",
          ar: "جولة برفقة مرشد في أزقة شفشاون الزرقاء والتقاط صور السلالم الملونة، والغروب عند المسجد الإسباني."
        }
      },
      {
        day: 4,
        title: { en: "Rif Mountain Springs Hikes", fr: "Randonnée dans les Montagnes du Rif", ar: "المشي الجبلي في ينابيع الريف" },
        description: {
          en: "Day hike to the waterfalls of Akchour. Picnic lunch next to clear rock pools and natural stone bridge arches.",
          fr: "Randonnée aux cascades d'Akchour. Déjeuner pique-nique au bord de piscines naturelles.",
          ar: "رحلة مشي جبلية إلى شلالات أقشور وتناول غداء نزهة بجانب المياه الصافية وجسر الله الطبيعي."
        }
      },
      {
        day: 5,
        title: { en: "Asilah Art Murals & Sea Walls", fr: "Asilah Fresques d'Art & Remparts sur l'Océan", ar: "أصيلة الجداريات الفنية والأسوار البحرية" },
        description: {
          en: "Travel to Asilah coast. Walk the historic sea walls, explore colorful murals painted by international artists.",
          fr: "Route vers Asilah. Promenade sur les remparts fortifiés et découverte des fresques murales d'artistes.",
          ar: "التنقل إلى بلدة أصيلة الساحلية والتمشي على الأسوار التاريخية ومشاهدة الجداريات الفنية البديعة."
        }
      },
      {
        day: 6,
        title: { en: "Coastal Departure via Tangier", fr: "Départ de la Côte via Tanger", ar: "مغادرة الساحل عبر طنجة" },
        description: {
          en: "Final coastal breakfast, return drive to Tangier for airport/ferry terminal drop off.",
          fr: "Petit-déjeuner face à la mer, transfert retour vers l'aéroport ou le port de Tanger.",
          ar: "تناول الفطور الأخير على البحر، والتوصيل إلى مطار طنجة أو ميناء طنجة المتوسط للمغادرة."
        }
      }
    ]
  },
  {
    id: "royal-sanctuary",
    name: {
      en: "VIP Royal Moroccan Sanctuary",
      fr: "Sanctuaire Royal Marocain VIP",
      ar: "الملاذ المغربي الملكي الفاخر"
    },
    tagline: {
      en: "Ultimate all-Morocco luxury privacy, exclusive Riads, and private butler services",
      fr: "Confidentialité et prestige ultime à travers le Maroc, riads exclusifs et majordomes",
      ar: "قمة الخصوصية والفخامة عبر المغرب، رياضات حصرية بالكامل وخدمة خادم شخصي"
    },
    priceUSD: 8200,
    durationDays: 10,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Plateau_Yagour%2C_Agdal%2C_Morocco.jpg/1280px-Plateau_Yagour%2C_Agdal%2C_Morocco.jpg",
    includedKeys: ["airportPick", "guidedTour", "luxuryHotel", "mealsIncl", "vipLounge"],
    highlights: {
      en: [
        "Exclusive complete buyouts of luxury boutique Riads",
        "Personal security details and armored transport options",
        "Private Michelin chefs and private helicopter links"
      ],
      fr: [
        "Privatisation totale de riads et palais de prestige",
        "Transports sécurisés haut de gamme et véhicules blindés",
        "Chefs étoilés privés et liaisons en hélicoptère"
      ],
      ar: [
        "حجز كامل وحصري لرياضات وقصور تاريخية فخمة",
        "خيارات سيارات مصفحة وحراسة أمنية خاصة عند الطلب",
        "طهاة عالميون خاصون ورحلات طيران هليكوبتر حصرية"
      ]
    },
    transportation: {
      en: "Armored luxury SUVs and private helicopter charter links",
      fr: "Vans blindés de prestige et liaisons en hélicoptère privé",
      ar: "سيارات دفع رباعي فاخرة مصفحة ورحلات هليكوبتر خاصة"
    },
    meals: {
      en: "Personalized menus crafted daily by award-winning private chefs",
      fr: "Menus sur mesure préparés chaque jour par des chefs primés",
      ar: "قائمة طعام مخصصة يومياً من إعداد طهاة حائزين على جوائز عالمية"
    },
    itinerary: [
      {
        day: 1,
        title: { en: "Private Jet Welcome Casablanca", fr: "Accueil Jet Privé à Casablanca", ar: "الاستقبال الخاص بالطائرة الخاصة في الدار البيضاء" },
        description: {
          en: "Tarmac pickup by luxury Mercedes, fast track clearance, and immediate transit to your private riad.",
          fr: "Accueil directement sur le tarmac, passage VIP ultra-rapide et transfert vers votre riad privé.",
          ar: "استقبال من مدرج الطائرات بسيارات مرسيدس الفاخرة، وتوصيل فوري إلى الرياض الخاص بك."
        }
      },
      {
        day: 2,
        title: { en: "Rabat Capital After-Hours Tour", fr: "Rabat Visite Privée Hors-Horaires", ar: "جولة الرباط الخاصة خارج أوقات العمل" },
        description: {
          en: "After-hours private walkthrough of historic ruins and Hassan Tower, followed by private lute recital.",
          fr: "Visite privée nocturne de la Tour Hassan et récital de luth privé.",
          ar: "جولة خاصة مغلقة وخارج أوقات العمل الرسمية لصومعة حسان، تليها معزوفة عود خاصة."
        }
      },
      {
        day: 3,
        title: { en: "Habs Qara Dungeon & Volubilis Walk", fr: "Souterrains de Qara & Volubilis Privatisé", ar: "سجن قارة وجولة وليلي الخاصة" },
        description: {
          en: "Private tour of Habs Qara underground arcs in Meknes. Walk Volubilis ruins with archaeological curators.",
          fr: "Visite privée de Habs Qara à Meknès et découverte de Volubilis avec les conservateurs du site.",
          ar: "جولة خاصة في سجن قارة الأثري بمكناس، وجولة بوليلي الرومانية برفقة محافظي الموقع."
        }
      },
      {
        day: 4,
        title: { en: "Fes Medina Royal Palace Secrets", fr: "Fès Palais Royal & Tannerie Privatisée", ar: "أسرار قصور فاس ودباغة الشوارة المغلقة" },
        description: {
          en: "Private access to palace chambers not open to the public, overlooking the Chouara tannery from private terraces.",
          fr: "Accès privé à des salles de palais fermées au public et vue sur les tanneries depuis une terrasse privée.",
          ar: "ولوج خاص لغرف قصور تاريخية مغلقة للعموم، وإطلالة على دباغة الشوارة من شرفة خاصة."
        }
      },
      {
        day: 5,
        title: { en: "Helicopter Transfer to Chefchaouen Blue Alley", fr: "Hélicoptère vers la Ville Bleue Chefchaouen", ar: "رحلة هليكوبتر لشفشاون المدينة الزرقاء" },
        description: {
          en: "Direct flight to Chefchaouen. Guided walk through blue pathways. Returns by nightfall to Riad.",
          fr: "Vol direct vers Chefchaouen. Visite guidée des ruelles bleues et retour au riad en fin de journée.",
          ar: "طيران مروحية مباشر لشفشاون وجولة في ممراتها الزرقاء، والعودة للرياض عند المساء."
        }
      },
      {
        day: 6,
        title: { en: "Private Flight to Sahara dunes camp", fr: "Vol Privé vers le Campement du Sahara", ar: "رحلة طيران خاصة لمخيم الصحراء" },
        description: {
          en: "Private helicopter link to Erg Chebbi camp. Camel trek to sunset dunes, dinner by a campfire.",
          fr: "Liaison hélicoptère privée vers l'Erg Chebbi. Balade à chameau et dîner gastronomique au feu de camp.",
          ar: "طيران مروحية خاص إلى مخيم عرق الشبي، وجولة الجمال وقت الغروب وعشاء فاخر حول الموقد."
        }
      },
      {
        day: 7,
        title: { en: "Atlas Valleys Private Kasbah Retreat", fr: "Retraite dans un Palais de l'Atlas", ar: "ملاذ قصر الأطلس الخاص" },
        description: {
          en: "Travel to High Atlas. Check-in to a luxury castle estate (Kasbah) nestled among terraced valleys.",
          fr: "Voyage vers le Haut Atlas. Installation dans une kasbah-château de luxe au cœur des vallées.",
          ar: "الانتقال للأطلس الكبير والإقامة في قصر كاسل فاخر وسط الوديان المدرجة البديعة."
        }
      },
      {
        day: 8,
        title: { en: "Marrakech Medina After-Hours Palace tour", fr: "Marrakech Palais Privatisé après fermeture", ar: "جولة قصور مراكش الخاصة ليلاً" },
        description: {
          en: "Exclusive night access to Bahia Palace. Candle-light dinner prepared in the central marble courtyard.",
          fr: "Accès nocturne exclusif au Palais de la Bahia. Dîner aux chandelles dans la cour en marbre.",
          ar: "دخول ليلي حصري لقصر الباهية وعشاء على ضوء الشموع في باحة الرخام المركزية."
        }
      },
      {
        day: 9,
        title: { en: "Private Art & Antique Acquisition showcase", fr: "Acquisitions Privées d'Art & Antiquités", ar: "معرض اقتناء التحف الفنية والأثريات" },
        description: {
          en: "Private showcase of museum-grade silver damascene and ancient carpets for exclusive purchase.",
          fr: "Présentation privée de tapis anciens certifiés et de pièces de collection pour achat exclusif.",
          ar: "عرض خاص ومغلق للسجاد الأثري المعتمد والقطع الدمشقية النادرة لاقتنائها بخصوصية."
        }
      },
      {
        day: 10,
        title: { en: "Royal Tarmac Departure Casablanca", fr: "Départ Royal et Transfert Jet à Casablanca", ar: "الوداع الملكي والتوصيل للطائرة بالدار البيضاء" },
        description: {
          en: "Assistance with luggage packing, gifts of organic saffron, and private Mercedes tarmac transfer.",
          fr: "Service de bagages par votre majordome, cadeaux de safran pur et transfert direct tarmac en Mercedes.",
          ar: "مساعدة في توضيب الحقائب، إهداء الزعفران العضوي الحر، وتوصيل خاص لمدرج الطائرة بالمرسيدس."
        }
      }
    ]
  }
];
