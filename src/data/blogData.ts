import type { LocalizedText } from './destinationsData';

export interface BlogPost {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  content: LocalizedText;
  date: string;
  readTime: LocalizedText;
  image: string;
  category: 'dining' | 'history' | 'culture' | 'shopping' | 'safety' | 'logistics';
}

export const blogData: BlogPost[] = [
  {
    id: "gourmet-secrets-morocco",
    title: {
      en: "Culinary Secrets of Morocco: The Imperial Tagine",
      fr: "Secrets Culinaires du Maroc : Le Tajine Impérial",
      ar: "أسرار الطهي المغربي: الطاجين الإمبراطورية العريق"
    },
    summary: {
      en: "Discover the ancestral palace recipes, wild saffron pairings, and secret spice ratios that define Morocco's culinary crown jewel.",
      fr: "Découvrez les recettes de palais ancestrales, le safran sauvage et les épices secrètes de la cuisine marocaine.",
      ar: "اكتشف وصفات القصور العريقة، وتناغمات الزعفران الحر، ونسب التوابل السرية التي تميز فن الطهي المغربي."
    },
    content: {
      en: "Moroccan gastronomy is celebrated worldwide, but within the Kingdom, the slow-cooked Tagine is whispered about by connoisseurs as the ultimate expression of flavor. The dish, named after the conical earthenware vessel in which it is prepared, relies on sweet-and-savory combinations featuring wild honey, orange blossom water, soft cinnamon, and pure saffron harvested from the surrounding Atlas hills.\n\nSavour the legendary Lamb Tagine - a masterpiece that slowly cooks a tender cut of lamb shoulder over hot embers for six to eight hours, layered with caramelized plums, toasted almonds, and fresh sesame seeds. When dining inside a candle-lit riad courtyard, this slow-cooking style allows the spices to infuse deeply into the meat bone. To experience this authentically, private reservation-only riads are recommended over public tourist restaurants.",
      fr: "La gastronomie marocaine est célèbre dans le monde entier, mais au Maroc, le Tajine mijoté est reconnu par les connaisseurs comme l'expression ultime des saveurs. Ce plat, cuit dans un plat en terre cuite conique, utilise des accords sucrés-salés raffinés avec du miel sauvage, de l'eau de fleur d'oranger, de la cannelle douce et du safran pur récolté dans les collines de l'Atlas.\n\nSavourez le légendaire Tajine d'Agneau - un chef-d'œuvre qui cuit lentement une épaule d'agneau sur de la braise pendant six à huit heures, garnie de prunes caramélisées, d'amandes grillées et de graines de sésame. Pour vivre cette expérience, nous vous conseillons de réserver une table privée en riad.",
      ar: "تحظى فنون الطهي المغربية بشهرة عالمية، ولكن داخل المملكة، يعتبر الطاجين المطهو ببطء التعبير الأسمى عن النكهة الأصلية. يعتمد هذا الطبق، الذي سمي على اسم الوعاء الفخاري المخروطي الذي يطهى فيه، على توليفات تجمع بين الحلو والمالح مستعينة بالعسل البري، وماء زهر البرتقال، والقرفة الناعمة، والزعفران الحر النقي.\n\nتذوق طاجين لحم الغنم الأسطوري - وهو تحفة فنية تطهى فيها قطع لحم الكتف الطرية ببطء فوق الجمر المشتعل لمدة تتراوح بين ست وثماني ساعات، مع طبقات من البرقوق المعسل، واللوز المحمص، والسمسم الطازج. يتيح هذا الأسلوب من الطهي البطيء داخل أفنية الرياضات المضاءة بالشموع للتوابل أن تتغلغل بعمق."
    },
    date: "2026-07-15",
    readTime: { en: "5 min read", fr: "5 min de lecture", ar: "5 دقائق قراءة" },
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80",
    category: "dining"
  },
  {
    id: "fes-medina-architecture",
    title: {
      en: "Walking with Dynasties: Fes Medina Architectural Guide",
      fr: "Marcher avec les Dynasties : Guide d'Architecture de Fès",
      ar: "السير مع السلالات: دليل عمارة مدينة فاس العتيقة"
    },
    summary: {
      en: "An expert walkthrough of Fes' finest zellij mosaic details, cedar carvings, and the geometry of historical madrasas.",
      fr: "Un guide d'expert des plus belles mosaïques de Fès, de ses sculptures en bois de cèdre et de la géométrie des médersas.",
      ar: "جولة خبير عبر أدق تفاصيل فسيفساء الزليج، ونقوش خشب الأرز، وهندسة المدارس العريقة بفاس."
    },
    content: {
      en: "Standing inside the courtyard of Bou Inania Madrasa in Fes, one is surrounded by geometric patterns that tell stories of spiritual focus. Built in 1350 AD by Abu Inan Faris, the madrasa is the only one in Fes that also served as a congregational mosque. It showcases the absolute peak of Marinid design, integrating marble columns, stucco panels, and detailed cedarwood friezes.\n\nThe geometry of Fes architecture operates under strict mathematical proportions. Zellij tiling uses hand-cut terracotta tiles glazed in primary colors, assembled into complex stars and polygons. The plasterwork (stucco) was carved in-situ while still damp, showing beautiful Arabic calligraphy praising the founders. To fully understand these monuments, hiring an architectural guide is essential to decode the cultural symbols and structural engineering.",
      fr: "Au cœur de la médersa Bou Inania à Fès, on est entouré de motifs géométriques qui racontent l'histoire de la dévotion spirituelle. Construite en 1350 par Abu Inan Faris, la médersa est la seule de Fès qui servait également de mosquée. Elle témoigne de l'apogée du design mérinide, alliant colonnes de marbre, stucs sculptés et frises en bois de cèdre.\n\nLa géométrie de l'architecture fassie obéit à des proportions mathématiques strictes. Les carreaux de zellige sont taillés à la main puis assemblés en étoiles et polygones complexes. Les plâtres sculptés in situ révèlent des calligraphies arabes raffinées.",
      ar: "عند الوقوف داخل فناء مدرسة البوعنانية في فاس، تحيط بك الأشكال الهندسية التي تحكي قصصاً من التركيز الروحي والتقديس. شيدت هذه المدرسة عام 1350 ميلادية في عهد أبي عنان فارس، وهي الوحيدة في فاس التي كانت تؤدي دور مسجد جامع أيضاً. وتظهر قمة التصميم المريني من خلال دمج الأعمدة الرخامية، ألواح الجبس، وإفريز خشب الأرز الدقيق.\n\nتعتمد هندسة العمارة الفاسية على نسب رياضية صارمة. وتستخدم بلاطات الزليج الطينية المقطوعة يدوياً والمصقولة بالألوان الأساسية لتجمع في نجوم ومضلعات معقدة. وقد نحت الجبس في مكانه وهو لا يزال رطباً، مظهراً خطوطاً عربية جميلة تثني على المؤسسين."
    },
    date: "2026-06-28",
    readTime: { en: "7 min read", fr: "7 min de lecture", ar: "7 دقائق قراءة" },
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    category: "history"
  },
  {
    id: "marrakech-souk-secrets",
    title: {
      en: "Medina Souks: Insider Rug and Spice Acquisition",
      fr: "Les Souks de la Médina : Guide de l'Acheteur de Tapis",
      ar: "أسواق المدينة العتيقة: دليل الخبراء لشراء السجاد والتوابل"
    },
    summary: {
      en: "Meet the master weavers and spice merchants of Marrakech, with rules on identifying authentic hand-knotted wool rugs.",
      fr: "Rencontrez les maîtres tisserands et marchands d'épices de Marrakech, avec des conseils pour identifier les tapis authentiques.",
      ar: "التقِ بالمنسجين المهرة وتجار التوابل في مراكش، وتعرف على قواعد تمييز السجاد الصوفي الأصيل المغزول يدوياً."
    },
    content: {
      en: "The souks of Marrakech are a sensory storm of colors, sounds, and scents. From the ironwork in Souk Haddadine to the rows of copper lanterns in Souk Seffarine, the market corridors have organized local trade for centuries. For many travelers, acquiring a hand-woven Berber rug is the peak of their visit.\n\nUnderstanding what you are buying is essential. Authentic Berber rugs are hand-knotted by women in rural Atlas villages, using pure local sheep wool. They feature irregular geometric designs that reflect personal stories and family protection symbols. When checking a rug, look at the back: hand-knotted rugs have slight inconsistencies in knot sizes and spacing, unlike machine-made imitations. Real wool rugs are also flame-resistant and feel heavy. Always take your time, drink the offered mint tea, and negotiate politely with a smile.",
      fr: "Les souks de Marrakech sont un festival sensoriel de couleurs, de sons et de senteurs. Du travail du fer au souk Haddadine aux lanternes de cuivre du souk Seffarine, ces marchés organisent le commerce local depuis des siècles. Pour de nombreux voyageurs, l'achat d'un authentique tapis berbère est le point culminant de leur séjour.\n\nSavoir ce que vous achetez est essentiel. Les tapis berbères authentiques sont noués à la main par des femmes des villages de l'Atlas, à partir de laine de mouton pure. Leurs motifs géométriques irréguliers racontent des histoires personnelles. Pour vérifier l'authenticité d'un tapis, regardez l'envers : les nœuds faits main présentent de légères irrégularités.",
      ar: "تعتبر أسواق مراكش عاصفة حسية من الألوان والأصوات والروائح. من أعمال الحديد في سوق الحدادين إلى صفوف الفوانيس النحاسية في سوق الصفارين، نظمت ممرات الأسواق التجارة المحلية لقرون. وبالنسبة للعديد من المسافرين، يعد اقتناء سجادة بربرية منسوجة يدوياً قمة زيارتهم.\n\nفهم ما تشتريه أمر ضروري للغاية. السجاد البربري الأصيل ينسج يدوياً بواسطة النساء في قرى الأطلس الريفية باستخدام صوف الأغنام المحلي النقي. وهي تتميز بتصاميم هندسية غير منتظمة تعكس قصصاً شخصية ورموزاً عائلية. عند فحص السجادة، انظر إلى ظهرها: السجاد المنسوج يدوياً يحتوي على تفاوتات طفيفة في أحجام العقد وتباعدها."
    },
    date: "2026-07-01",
    readTime: { en: "6 min read", fr: "6 min de lecture", ar: "6 دقائق قراءة" },
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=80",
    category: "shopping"
  },
  {
    id: "sahara-caravans-etiquette",
    title: {
      en: "Sahara Caravans: Desert Codes and Nomadic Etiquette",
      fr: "Caravanes du Sahara : Codes du Désert & Étiquette Nomade",
      ar: "قوافل الصحراء: قوانين الصحراء وآداب البدو الرحل"
    },
    summary: {
      en: "An operational guide to desert traversal, private camel caravans, and showing respect inside nomadic camps.",
      fr: "Un guide opérationnel pour la traversée du désert, les caravanes privées et le respect dans les campements nomades.",
      ar: "دليل عملي لاجتياز الصحراء، وقوافل الجمال الخاصة، وإبداء الاحترام والتقدير داخل مخيمات البدو."
    },
    content: {
      en: "The Sahara Desert is a space governed by strict rules of hospitality and survival. For centuries, Berber and Tuareg nomads have navigated the sand dunes of Erg Chebbi, relying on camel caravans to transport dates, salt, and gold across North Africa.\n\nWhen visiting a nomadic camp, showing respect for local customs is vital. Always accept the offered glass of mint tea - it is a traditional symbol of welcome and refusal is considered impolite. The tea is poured from a height to create a frothy crown, representing hospitality. Keep your voice calm and avoid photographing people, especially women and children, without asking for explicit permission first. By treating the quiet desert sands and its people with respect, you will experience an authentic side of Morocco's ancestral desert heritage.",
      fr: "Le désert du Sahara est un espace régi par des règles strictes d'hospitalité et de survie. Depuis des siècles, les nomades berbères et touaregs parcourent les dunes de l'Erg Chebbi, s'appuyant sur des caravanes de chameaux pour transporter leurs marchandises.\n\nLors de la visite d'un campement nomade, le respect des coutumes est essentiel. Acceptez toujours le verre de thé à la menthe offert - c'est le symbole traditionnel de bienvenue. Le thé est versé de haut pour créer une mousse. Parlez doucement et ne photographiez pas les nomades sans leur permission.",
      ar: "الصحراء الكبرى هي فضاء تحكمه قوانين صارمة للضيافة والبقاء على قيد الحياة. لقرون، أبحر البدو الأمازيغ والطوارق عبر كثبان رمال عرق الشبي، معتمدين على قوافل الجمال لنقل التمور والملح والذهب عبر شمال إفريقيا.\n\nعند زيارة مخيم للبدو، فإن احترام العادات المحلية أمر بالغ الأهمية. اقبل دائماً كوب الشاي بالنعناع المقدم لك - فهو رمز ترحيبي تقليدي ورفضه يعتبر غير لائق. يسكب الشاي من الأعلى لإنشاء رغوة غنية ترمز لإكرام الضيف. حافظ على هدوء صوتك وتجنب تصوير الأشخاص دون إذنهم الصريح."
    },
    date: "2026-05-12",
    readTime: { en: "5 min read", fr: "5 min de lecture", ar: "5 دقائق قراءة" },
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80",
    category: "culture"
  },
  {
    id: "safety-insider-guide-morocco",
    title: {
      en: "Travel Safety in Morocco: Private Advisor Insights",
      fr: "Sécurité au Maroc : Conseils d'un Conseiller Privé",
      ar: "سلامة السفر في المغرب: إرشادات وتوجيهات مستشار خاص"
    },
    summary: {
      en: "Essential tips on navigating Medina alleys safely, avoiding common scams, and respectful cultural etiquette.",
      fr: "Conseils essentiels pour parcourir la médina en sécurité, éviter les pièges et respecter l'étiquette culturelle.",
      ar: "نصائح أساسية للتجول في أزقة المدينة القديمة بأمان، وتجنب المضايقات، والتعرف على الآداب الثقافية المحترمة."
    },
    content: {
      en: "Morocco is widely recognized as one of North Africa's safest and most welcoming destinations. Locals are famous for their hospitality and warmth. However, navigating a medieval Medina still requires common sense and awareness of cultural norms.\n\nFirst, ignore unofficial guides who approach you near historical sites offering to show you 'secret terraces' or 'closed monuments'. These are usually scams designed to lead you to high-commission shops. If you want a guide, always request a licensed official guide from your travel agency or the tourism office. Second, dress conservatively to respect local Islamic culture: shoulders and knees should be covered, especially when visiting mosques and mausoleums. Finally, keep your bags close in crowded souks. Pickpocketing is rare but can happen in busy market corridors. By maintaining a friendly, polite attitude and saying 'La, Shukran' (No, thank you) with a smile, you will enjoy a serene and peaceful experience.",
      fr: "Le Maroc est reconnu comme l'une des destinations les plus sûres et accueillantes d'Afrique du Nord. Les habitants sont célèbres pour leur hospitalité. Cependant, parcourir une médina médiévale demande toujours du bon sens.\n\nTout d'abord, ignorez les faux guides près des sites historiques qui proposent des 'terrasses secrètes' ou des 'monuments fermés'. Si vous souhaitez un guide, passez toujours par un guide officiel certifié. Deuxièmement, habillez-vous de manière respectueuse (épaules et genoux couverts). Enfin, gardez vos effets personnels près de vous dans les souks animés. Les pickpockets sont rares mais peuvent sévir dans la foule. En restant poli et en disant 'La, Shukran' (Non, merci) avec le sourire, votre voyage se déroulera dans la plus grande sérénité.",
      ar: "يعتبر المغرب على نطاق واسع واحداً من أكثر الوجهات أماناً وترحاباً في شمال إفريقيا، حيث يشتهر أهله بحسن الضيافة والكرم البديع. ومع ذلك، فإن التجول في مدن تعود للعصور الوسطى يتطلب دائماً بعض الحذر والوعي بالتقاليد المحلية.\n\nأولاً، تجاهل المرشدين غير الرسميين الذين يقتربون منك بالقرب من المواقع الأثرية لعرض 'شرفات سرية' أو 'معالم مغلقة'. هذه محاولات لجرك إلى المحلات لشراء السلع بعمولة مرتفعة. إذا كنت ترغب في مرشد، فاطلب دائماً مرشداً رسمياً مرخصاً من وكالة سفرك. ثانياً، احرص على ارتداء ملابس محتشمة احتراماً للثقافة المحلية، خاصة عند زيارة المساجد والأضرحة. بالتعامل بلطف وقول 'لا، شكراً' مع ابتسامة، ستحظى بتجربة هادئة ورائعة."
    },
    date: "2026-07-10",
    readTime: { en: "4 min read", fr: "4 min de lecture", ar: "4 دقائق قراءة" },
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=80",
    category: "safety"
  },
  {
    id: "morocco-travel-logistics",
    title: {
      en: "Morocco Logistics: Airports, High-Speed Trains, and Chauffeurs",
      fr: "Logistique au Maroc : Aéroports, TGV et Chauffeurs",
      ar: "لوجستيات السفر: المطارات، القطار السريع، والسيارات الخاصة"
    },
    summary: {
      en: "An operational guide on how to travel around Morocco, covering Casablanca CMN hub, the Al Boraq high-speed train, and luxury car hire.",
      fr: "Un guide opérationnel pour voyager au Maroc : aéroport de Casablanca, TGV Al Boraq et voitures de luxe.",
      ar: "دليل عملي حول كيفية التنقل في المغرب، ويشمل مطار محمد الخامس، قطار البراق فائق السرعة، والسيارات الفاخرة."
    },
    content: {
      en: "Planning your arrival to Morocco is straightforward, given its advanced transport network. Casablanca Mohammed V Airport (CMN) is Morocco's primary international hub, linking to major cities worldwide. Marrakesh-Menara Airport (RAK) is also a popular arrival point, famous for its modern architecture.\n\nFor transportation between major cities, the ONCF train system is clean and efficient. The Al Boraq high-speed train connects Tangier to Casablanca via Rabat, reducing travel time to just two hours. However, for a luxury traveler, private chauffeur-driven vehicles are highly recommended. A private Mercedes V-Class allows you to travel directly from Fes or Rabat to your Medina riad comfortably, without carrying luggage between train terminals. Our private luxury packages include full VIP terminal pick-up and dedicated chauffeurs for all excursions.",
      fr: "Planifier votre arrivée au Maroc est très simple grâce à son réseau de transport moderne. L'aéroport Mohammed V de Casablanca (CMN) est la principale porte d'entrée internationale. L'aéroport de Marrakech-Ménara (RAK) est également très fréquenté et réputé pour son architecture contemporaine.\n\nLe réseau ferroviaire de l'ONCF est propre, ponctuel et efficace. Le TGV Al Boraq relie Tanger à Casablanca via Rabat en seulement deux heures. Néanmoins, pour les voyageurs de luxe, les voitures privées avec chauffeur restent recommandées. Une Mercedes Classe V privée vous déposera directement au seuil de votre riad.",
      ar: "يعد التخطيط لوصولك إلى المغرب أمراً سهلاً ومباشراً بفضل شبكة النقل المتقدمة. يعد مطار محمد الخامس بالدار البيضاء (CMN) المحور الدولي الرئيسي، ويرتبط بالمدن الكبرى في جميع أنحاء العالم. كما يعد مطار مراكش المنارة (RAK) نقطة وصول ممتازة تشتهر بعمارتها الحديثة.\n\nبالنسبة للتنقلات بين المدن الكبرى، تعتبر شبكة قطارات (ONCF) نظيفة وفعالة. يربط قطار 'البراق' فائق السرعة طنجة بالدار البيضاء عبر الرباط في غضون ساعتين فقط. ومع ذلك، بالنسبة للمسافرين الباحثين عن الفخامة، يوصى بشدة بالسيارات الخاصة المجهزة بسائق."
    },
    date: "2026-07-20",
    readTime: { en: "5 min read", fr: "5 min de lecture", ar: "5 دقائق قراءة" },
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    category: "logistics"
  }
];
