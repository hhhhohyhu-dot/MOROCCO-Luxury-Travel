import type { LocalizedText } from './destinationsData';

export interface FaqItem {
  id: string;
  category: 'culture' | 'logistics' | 'packages' | 'health';
  question: LocalizedText;
  answer: LocalizedText;
}

export const faqData: FaqItem[] = [
  {
    id: "q1",
    category: "culture",
    question: {
      en: "Is there a dress code for tourists in Meknes?",
      fr: "Y a-t-il un code vestimentaire pour les touristes à Meknès ?",
      ar: "هل هناك لباس معين يجب الالتزام به للسياح في مكناس؟"
    },
    answer: {
      en: "Yes, out of respect for the local culture, both men and women should dress conservatively. We recommend covering shoulders and knees. This is particularly important when entering sacred spots like the Mausoleum of Moulay Ismail.",
      fr: "Oui, par respect pour la culture locale, les hommes et les femmes doivent s'habiller de manière pudique. Nous conseillons de couvrir épaules et genoux, surtout pour visiter les lieux sacrés comme le Mausolée.",
      ar: "نعم، احتراماً للثقافة المحلية، يجب على الرجال والنساء ارتداء ملابس محتشمة. نوصي بتغطية الأكتاف والركب، وهو أمر بالغ الأهمية عند زيارة الأماكن المقدسة مثل ضريح المولى إسماعيل."
    }
  },
  {
    id: "q2",
    category: "logistics",
    question: {
      en: "What is the nearest airport to Meknes?",
      fr: "Quel est l'aéroport le plus proche de Meknès ?",
      ar: "ما هو أقرب مطار لمدينة مكناس؟"
    },
    answer: {
      en: "Fez-Saïss Airport (FEZ) is the closest, located about 50 km (40 minutes by private car) east of Meknes. Casablanca Airport (CMN) is Morocco's largest hub and is 270 km away (approx. 2.5 hours by highway drive or train).",
      fr: "L'aéroport de Fès-Saïss (FEZ) est le plus proche, à environ 50 km (40 minutes en voiture). L'aéroport Mohammed V de Casablanca (CMN) est le plus grand, situé à 270 km (2h30 en voiture ou train).",
      ar: "مطار فاس سايس (FEZ) هو الأقرب، ويقع على بعد حوالي 50 كم (40 دقيقة بالسيارة الخاصة). ويعد مطار الدار البيضاء (CMN) المحور الأكبر في المغرب ويقع على بعد 270 كم (حوالي ساعتين ونصف بالسيارة أو القطار)."
    }
  },
  {
    id: "q3",
    category: "culture",
    question: {
      en: "Can non-Muslims enter holy sights and mosques in Meknes?",
      fr: "Les non-musulmans peuvent-ils entrer dans les mosquées à Meknès ?",
      ar: "هل يُسمح لغير المسلمين بدخول المساجد والأماكن المقدسة في مكناس؟"
    },
    answer: {
      en: "Generally, active mosques in Morocco are closed to non-Muslims. However, the Mausoleum of Moulay Ismail is a rare exception where non-Muslims are permitted to enter the main courtyards and the tomb's entrance chamber to view the architecture.",
      fr: "En règle générale, les mosquées actives au Maroc sont fermées aux non-musulmans. Cependant, le Mausolée de Moulay Ismail est une exception : les non-musulmans peuvent y entrer pour admirer l'architecture.",
      ar: "بشكل عام، المساجد النشطة في المغرب مغلقة أمام غير المسلمين. ومع ذلك، يعد ضريح المولى إسماعيل استثناءً نادراً حيث يُسمح لغير المسلمين بدخول الباحات الرئيسية وقاعة الانتظار لمشاهدة الهندسة المعمارية."
    }
  },
  {
    id: "q4",
    category: "logistics",
    question: {
      en: "What is the official currency in Morocco, and is cash preferred?",
      fr: "Quelle est la monnaie officielle et le liquide est-il préférable ?",
      ar: "ما هي العملة الرسمية في المغرب، وهل يفضل الدفع نقداً؟"
    },
    answer: {
      en: "The currency is the Moroccan Dirham (MAD). While luxury riads, fine restaurants, and wineries accept international credit cards, small shops in the souks, cafes, and taxi drivers deal exclusively in cash. We advise carrying local banknotes.",
      fr: "La devise est le Dirham Marocain (MAD). Les cartes bancaires sont acceptées dans les riads de luxe et grands restaurants, mais les commerces des souks, cafés et taxis n'acceptent que le liquide.",
      ar: "العملة الرسمية هي الدرهم المغربي (MAD). بينما تقبل الرياضات الفاخرة والمطاعم ومزارع الكروم بطاقات الائتمان الدولية، فإن المحلات الصغيرة في الأسواق والمقاهي وسائقي التاكسي يتعاملون بالنقود فقط. نوصي بحمل أوراق مالية محلية."
    }
  },
  {
    id: "q5",
    category: "packages",
    question: {
      en: "Can I customize the pre-arranged travel packages?",
      fr: "Puis-je personnaliser les formules de voyage proposées ?",
      ar: "هل يمكنني تعديل عروض السفر الجاهزة المقترحة؟"
    },
    answer: {
      en: "Absolutely. Every pre-arranged itinerary serves as a curated base. You can work with our private advisors to add days, upgrade transport options, change suites, or integrate activities using our Bespoke Package Constructor.",
      fr: "Absolument. Chaque itinéraire sert de base personnalisable. Vous pouvez contacter nos conseillers pour ajouter des jours, changer de catégorie de transport ou intégrer des activités via notre constructeur sur mesure.",
      ar: "بالتأكيد. كل مسار رحلة مقترح يعد قاعدة قابلة للتعديل. يمكنك التواصل مع مستشاري السفر لدينا لإضافة أيام، ترقية خيارات النقل، تغيير الأجنحة، أو إضافة أنشطة عبر مصمم الرحلات المخصص."
    }
  },
  {
    id: "q6",
    category: "health",
    question: {
      en: "Is tap water safe to drink in Meknes?",
      fr: "L'eau du robinet est-elle potable à Meknès ?",
      ar: "هل مياه الصنبور صالحة للشرب في مكناس؟"
    },
    answer: {
      en: "We strongly advise tourists to drink only bottled mineral water. High-end riads provide bottled water in guest rooms daily. Avoid ice cubes in small street cafes to prevent stomach upsets.",
      fr: "Nous recommandons fortement de ne boire que de l'eau minérale en bouteille. Les riads de luxe en fournissent quotidiennement. Évitez les glaçons dans les petits cafés de rue.",
      ar: "ننصح السياح بشدة بشرب المياه المعدنية المعبأة فقط. توفر الرياضات الفاخرة مياه معبأة في غرف النزلاء يومياً. تجنب قطع الثلج في المقاهي الشعبية الصغيرة لتفادي أي مشاكل معوية."
    }
  },
  {
    id: "q7",
    category: "logistics",
    question: {
      en: "When is the best season to visit Meknes?",
      fr: "Quelle est la meilleure saison pour visiter Meknès ?",
      ar: "ما هي أفضل الفصول لزيارة مكناس؟"
    },
    answer: {
      en: "Spring (March to May) and Autumn (September to November) are the best times. Temperatures are mild, and surrounding nature is either lush and green or in harvest. Summer can exceed 40 degrees, and winters are chilly.",
      fr: "Le printemps (mars à mai) et l'automne (septembre à novembre) sont idéaux. Les températures sont douces et la nature est magnifique. L'été peut dépasser 40°C et l'hiver est frais.",
      ar: "فصلا الربيع (من مارس إلى مايو) والخريف (من سبتمبر إلى نوفمبر) هما أفضل الأوقات. درجات الحرارة تكون معتدلة، وتكون الطبيعة المحيطة خضراء مورقة أو في موسم الحصاد. قد تتجاوز درجات الحرارة في الصيف 40 درجة مئوية، والشتاء يكون بارداً."
    }
  },
  {
    id: "q8",
    category: "culture",
    question: {
      en: "Is alcohol served in Meknes hotels and restaurants?",
      fr: "Sert-on de l'alcool dans les hôtels et restaurants à Meknès ?",
      ar: "هل تقدم المشروبات الكحولية في فنادق ومطاعم مكناس؟"
    },
    answer: {
      en: "Yes. While small local eateries do not serve alcohol, high-end tourist restaurants, international hotels, and vineyards (Chateau Roslane) serve a wide selection of premium local Moroccan and imported drinks.",
      fr: "Oui. Les petits restaurants locaux n'en servent pas, mais les riads de luxe, grands hôtels et domaines viticoles proposent une large sélection de vins locaux et de boissons importées.",
      ar: "نعم. في حين أن المطاعم الشعبية الصغيرة لا تقدمها، فإن الفنادق الفاخرة والمطاعم السياحية ومزارع الكروم (مثل شاتو روزلان) تقدم تشكيلة واسعة من المشروبات الفاخرة المغربية والمستوردة."
    }
  },
  {
    id: "q9",
    category: "logistics",
    question: {
      en: "What languages are spoken in Meknes?",
      fr: "Quelles langues parle-t-on à Meknès ?",
      ar: "ما هي اللغات المتداولة في مكناس؟"
    },
    answer: {
      en: "Moroccan Arabic (Darija) and Berber are the native languages. French is widely spoken in business, hotels, and restaurants. English is spoken by young professionals, merchants in the souks, and all official guides.",
      fr: "L'arabe marocain (Darija) et le berbère sont les langues maternelles. Le français est très utilisé dans le commerce et l'hôtellerie. L'anglais est parlé par les professionnels du tourisme et les marchands.",
      ar: "اللغة العربية المغربية (الدارجة) والأمازيغية هي اللغات الأصلية. وتستخدم اللغة الفرنسية بشكل واسع في الأعمال، الفنادق، والمطاعم. كما يتحدث الإنجليزية بعض المهنيين والتجار في الأسواق وجميع المرشدين الرسميين."
    }
  },
  {
    id: "q10",
    category: "health",
    question: {
      en: "Is it safe to walk around the Medina alleys at night?",
      fr: "Est-il sûr de se promener dans la médina la nuit ?",
      ar: "هل من الآمن التجول في أزقة المدينة القديمة ليلاً؟"
    },
    answer: {
      en: "The main streets of the Medina are generally safe. However, narrow residential alleys are poorly lit and can be confusing. We advise returning to your Riad by 22:00 or utilizing our private chauffeur escorts for night outings.",
      fr: "Les rues principales sont sûres. Néanmoins, les ruelles résidentielles étroites sont peu éclairées et déroutantes. Nous conseillons de rentrer au riad vers 22h00 ou d'utiliser notre chauffeur privé.",
      ar: "الشوارع الرئيسية في المدينة القديمة آمنة بشكل عام. ومع ذلك، فإن الأزقة السكنية الضيقة تكون ضعيفة الإضاءة ومربكة. ننصح بالعودة إلى الرياض بحلول الساعة 10:00 مساءً أو الاستعانة بسائقنا الخاص للخروج ليلاً."
    }
  },
  {
    id: "q11",
    category: "packages",
    question: {
      en: "Do your packages include flights to Morocco?",
      fr: "Vos formules incluent-elles les vols vers le Maroc ?",
      ar: "هل تشمل عروضكم رحلات الطيران إلى المغرب؟"
    },
    answer: {
      en: "No, our luxury packages cover ground services, hotels, guided tours, local transfers, and internal flights if needed. You must book your international flights independently, though our advisors can assist with booking logistics.",
      fr: "Non, nos tarifs couvrent l'hébergement, les transferts, les guides et visites privées. Les vols internationaux restent à votre charge, bien que nos conseillers puissent vous aider à planifier vos vols.",
      ar: "لا، تغطي عروضنا الفاخرة الخدمات الأرضية، الفنادق، الجولات السياحية، التنقلات المحلية، والرحلات الداخلية إذا لزم الأمر. يجب حجز الطيران الدولي بشكل مستقل، ومستشارونا مستعدون للمساعدة في تنسيق ذلك."
    }
  },
  {
    id: "q12",
    category: "culture",
    question: {
      en: "How should I ask permission to take photos of locals?",
      fr: "Comment demander l'autorisation de photographier les habitants ?",
      ar: "كيف يجب أن أطلب الإذن لالتقاط صور للمواطنين المحليين؟"
    },
    answer: {
      en: "Always ask before taking close-up portraits. A polite smile and asking 'Excuse me, may I?' or in French 'S'il vous plaît, puis-je prendre une photo?' works wonders. Respect their answer if they decline.",
      fr: "Demandez toujours l'autorisation pour les portraits. Un sourire poli et la phrase 'S'il vous plaît, puis-je prendre une photo ?' suffisent. Respectez leur choix s'ils refusent.",
      ar: "يرجى دائماً الاستئذان قبل التقاط صور مقربة للأشخاص. تكفي ابتسامة لطيفة وسؤالهم بالفرنسية أو الإنجليزية أو بالدارجة 'ممكن صورة؟'. ويجب احترام رغبتهم تماماً في حال الرفض."
    }
  },
  {
    id: "q13",
    category: "logistics",
    question: {
      en: "Is tipping expected in Meknes, and how much?",
      fr: "Le pourboire est-il attendu à Meknès et de combien ?",
      ar: "هل تقديم البقشيش متوقع في مكناس، وكم قيمته؟"
    },
    answer: {
      en: "Tipping is part of Moroccan culture. In restaurants, 10% is standard for good service. For private drivers, 100-200 MAD per day is appropriate, and 150-250 MAD per day for official guides.",
      fr: "Le pourboire est ancré dans la culture marocaine. Dans les restaurants, 10% est la norme. Pour les chauffeurs privés, prévoyez 100 à 200 MAD par jour, et 150 à 250 MAD par jour pour les guides.",
      ar: "يعد البقشيش جزءاً من الثقافة المغربية. في المطاعم، تعتبر 10٪ هي النسبة المعتادة للخدمة الجيدة. بالنسبة للسائقين الخاصين، فإن 100-200 درهم في اليوم أمر مناسب، و 150-250 درهم في اليوم للمرشدين الرسميين."
    }
  },
  {
    id: "q14",
    category: "health",
    question: {
      en: "What should I do in case of a medical emergency?",
      fr: "Que dois-je faire en cas d'urgence médicale ?",
      ar: "ماذا يجب أن أفعل في حالة حدوث حالة طبية طارئة؟"
    },
    answer: {
      en: "Meknes has high-quality private clinics with modern medical equipment. If you book with us, our 24/7 travel concierge will immediately coordinate medical services, translate, and arrange visits to top English-speaking doctors.",
      fr: "Meknès dispose de cliniques privées modernes de qualité. Si vous voyagez avec nous, notre conciergerie 24h/24 coordonnera immédiatement l'assistance médicale et les médecins francophones.",
      ar: "تتوفر في مكناس مصحات خاصة عالية الجودة ومجهزة بمعدات طبية حديثة. إذا قمت بالحجز معنا، فإن خدمة الكونسيرج المتاحة على مدار الساعة ستتولى التنسيق الفوري للرعاية الطبية وترتيب زيارة أفضل الأطباء."
    }
  },
  {
    id: "q15",
    category: "packages",
    question: {
      en: "What is your cancellation policy for custom bookings?",
      fr: "Quelle est votre politique d'annulation pour les voyages ?",
      ar: "ما هي سياسة إلغاء الحجز للرحلات المخصصة؟"
    },
    answer: {
      en: "We offer free cancellations up to 30 days before arrival for most bookings. Within 30 days, fees depend on the specific riads and private transport contracts. We strongly recommend purchasing comprehensive travel insurance.",
      fr: "Nous offrons l'annulation gratuite jusqu'à 30 jours avant le séjour. À moins de 30 jours, les frais dépendent des riads et transports réservés. Nous conseillons de souscrire une assurance voyage.",
      ar: "نحن نقدم إلغاء مجانياً حتى 30 يوماً قبل موعد الوصول لمعظم الحجوزات. خلال الـ 30 يوماً الأخيرة، تعتمد الرسوم على سياسات الرياض وشركات النقل المتعاقد معها. ننصح بشدة بشراء تأمين سفر شامل."
    }
  },
  {
    id: "q16",
    category: "culture",
    question: {
      en: "Is bargaining necessary in the traditional souks?",
      fr: "Faut-il marchander dans les souks traditionnels ?",
      ar: "هل المساومة ضرورية في الأسواق التقليدية؟"
    },
    answer: {
      en: "Bargaining is expected in the souks. The initial price is usually inflated. Always negotiate politely with a smile, aiming for around 60-70% of the initial quote. Avoid showing too much eagerness.",
      fr: "Le marchandage est de mise dans les souks. Le prix initial est souvent élevé. Négociez avec le sourire et visez environ 60 à 70% du prix initial. Ne montrez pas trop d'intérêt.",
      ar: "المساومة متوقعة في الأسواق، حيث يكون السعر الأولي المعروض مرتفعاً عادة. تفاوض دائماً بلطف وابتسامة، بهدف الوصول لحوالي 60-70٪ من السعر المعروض. وتجنب إظهار رغبة شديدة في الشراء."
    }
  },
  {
    id: "q17",
    category: "logistics",
    question: {
      en: "How can I travel between Meknes and Volubilis?",
      fr: "Comment se rendre de Meknès à Volubilis ?",
      ar: "كيف يمكنني التنقل بين مكناس ووليلي؟"
    },
    answer: {
      en: "There are no trains to Volubilis. The options are taking a grand taxi from Meknes, renting a car, or using our luxury private transport service, which includes chauffeur waiting times while you explore.",
      fr: "Il n'y a pas de train pour Volubilis. Vous pouvez prendre un grand taxi, louer une voiture ou utiliser notre service de chauffeur privé qui vous attend sur place pendant votre visite.",
      ar: "لا توجد قطارات إلى وليلي. الخيارات المتاحة هي استقلال سيارة أجرة كبيرة من مكناس، أو استئجار سيارة، أو استخدام خدمة النقل الخاصة الفاخرة لدينا والتي تشمل انتظار السائق لك أثناء جولة الاستكشاف."
    }
  },
  {
    id: "q18",
    category: "health",
    question: {
      en: "What vaccinations are required for entering Morocco?",
      fr: "Quels vaccins sont obligatoires pour entrer au Maroc ?",
      ar: "ما هي اللقاحات المطلوبة لدخول المغرب؟"
    },
    answer: {
      en: "No specific vaccinations are legally required for entry, unless traveling from a yellow fever zone. Standard routine vaccines (Hepatitis A, B, and Tetanus) are recommended. Check with your doctor before travel.",
      fr: "Aucun vaccin n'est légalement requis pour l'entrée, sauf si vous venez d'une zone touchée par la fièvre jaune. Les vaccins habituels (Hépatite A, B et Tétanos) sont conseillés.",
      ar: "لا توجد لقاحات معينة مطلوبة قانوناً للدخول، ما لم تكن مسافراً من منطقة موبوءة بالحمى الصفراء. يوصى باللقاحات الروتينية القياسية (التهاب الكبد A و B والكزاز). استشر طبيبك قبل السفر."
    }
  },
  {
    id: "q19",
    category: "packages",
    question: {
      en: "Do you cater to vegetarian and vegan diets?",
      fr: "Proposez-vous des menus végétariens ou végétaliens ?",
      ar: "هل تلبي عروضكم الأنظمة الغذائية النباتية والخضرية؟"
    },
    answer: {
      en: "Yes. High-end Moroccan cuisine is rich in fresh vegetables, salads, couscous, and tagines. We coordinate with all riad kitchens and restaurants beforehand to ensure gourmet vegetarian and vegan dishes are provided.",
      fr: "Oui. La cuisine marocaine regorge de salades fraîches, de couscous et de tajines de légumes. Nous prévenons les riads et restaurants à l'avance pour vous garantir des plats adaptés de haute qualité.",
      ar: "نعم. المطبخ المغربي غني بالسلطات الطازجة والكسكس وطواجن الخضار. نقوم بالتنسيق مع جميع الرياضات والمطاعم مسبقاً لضمان توفير وجبات نباتية فاخرة."
    }
  },
  {
    id: "q20",
    category: "culture",
    question: {
      en: "Can I take pictures inside Volubilis?",
      fr: "Peut-on prendre des photos à Volubilis ?",
      ar: "هل يمكنني التقاط صور داخل موقع وليلي؟"
    },
    answer: {
      en: "Yes, photography for personal use is fully permitted at Volubilis without extra charges. Commercial photography or drone usage requires special prior authorization from the Moroccan Ministry of Culture.",
      fr: "Oui, la photographie pour usage personnel est autorisée sans frais à Volubilis. Les prises de vue commerciales et l'usage de drones nécessitent une autorisation écrite du Ministère de la Culture.",
      ar: "نعم، التقاط الصور للاستخدام الشخصي مسموح به تماماً في وليلي دون أي رسوم إضافية. أما التصوير التجاري أو استخدام الطائرات بدون طيار (الدرون) فيتطلب تصريحاً خاصاً مسبقاً من وزارة الثقافة المغربية."
    }
  },
  {
    id: "q21",
    category: "logistics",
    question: {
      en: "Are credit cards widely accepted in restaurants?",
      fr: "Les cartes de crédit sont-elles acceptées dans les restaurants ?",
      ar: "هل بطاقات الائتمان مقبولة على نطاق واسع في المطاعم؟"
    },
    answer: {
      en: "Fine dining spots, luxury hotels, and modern wine estates accept Visa and Mastercard. Small local bistros and street stalls do not accept cards. Carrying local currency is always a safe backup.",
      fr: "Les grands restaurants, les hôtels et les domaines acceptent Visa et Mastercard. Les petits bistrots locaux et stands de rue ne les acceptent pas. Prévoyez toujours du liquide.",
      ar: "تقبل المطاعم الراقية والفنادق الفاخرة ومزارع الكروم بطاقات فيزا وماستركارد. بينما لا تقبلها المطاعم الشعبية البسيطة وعربات الأكل في الشارع. حمل العملة المحلية أمر ضروري دائماً."
    }
  },
  {
    id: "q22",
    category: "health",
    question: {
      en: "Is the sun very strong in Meknes, and how can I prepare?",
      fr: "Le soleil est-il fort à Meknès et comment se protéger ?",
      ar: "هل أشعة الشمس قوية جداً في مكناس، وكيف أستعد لها؟"
    },
    answer: {
      en: "Yes, especially between June and September. Bring high SPF sunscreen, sunglasses, and a wide-brimmed hat. Keep hydrated by carrying bottled mineral water during all outdoor excursions.",
      fr: "Oui, particulièrement de juin à septembre. Apportez de l'écran solaire, des lunettes de soleil et un chapeau. Hydratez-vous en buvant de l'eau minérale en bouteille tout au long de la journée.",
      ar: "نعم، خاصة بين شهري يونيو وسبتمبر. أحضر واقياً شمسياً بعامل حماية مرتفع، نظارات شمسية، وقبعة واسعة. حافظ على رطوبة جسمك بحمل مياه معدنية معبأة طوال الجولات الخارجية."
    }
  },
  {
    id: "q23",
    category: "packages",
    question: {
      en: "Do your packages include travel insurance?",
      fr: "Vos formules incluent-elles une assurance voyage ?",
      ar: "هل تشمل عروضكم تأميناً على السفر؟"
    },
    answer: {
      en: "No, our prices do not cover international travel insurance. We strongly advise purchasing a comprehensive plan in your home country covering trip cancellations, medical emergencies, and luggage loss.",
      fr: "Non, nos tarifs ne comprennent pas l'assurance voyage internationale. Nous vous conseillons de souscrire une assurance complète couvrant l'annulation, les frais médicaux et la perte de bagages.",
      ar: "لا، أسعارنا لا تشمل التأمين الصحي الدولي على السفر. ننصح بشدة بشراء خطة تأمين شاملة من بلدك الأصلي تغطي إلغاء الرحلات، الحالات الطارئة، وفقدان الأمتعة."
    }
  },
  {
    id: "q24",
    category: "culture",
    question: {
      en: "Are the museums closed on specific days of the week?",
      fr: "Les musées sont-ils fermés certains jours de la semaine ?",
      ar: "هل تغلق المتاحف في أيام معينة من الأسبوع؟"
    },
    answer: {
      en: "Yes, Dar Jamai Museum is closed on Tuesdays. Many public buildings and souks are also quiet or closed on Friday afternoons for prayers. Keep this in mind when planning your shopping walks.",
      fr: "Oui, le Musée Dar Jamai est fermé le mardi. De nombreux édifices publics et souks ferment ou ralentissent le vendredi après-midi en raison de la grande prière.",
      ar: "نعم، يغلق متحف دار الجامعي أبوابه أيام الثلاثاء. كما تكون العديد من المعالم والأسواق هادئة أو مغلقة بعد ظهر يوم الجمعة لأداء الصلاة. يرجى وضع ذلك في الحسبان عند التخطيط للتسوق."
    }
  },
  {
    id: "q25",
    category: "logistics",
    question: {
      en: "How can I travel to Meknes from Casablanca via train?",
      fr: "Comment aller de Casablanca à Meknès en train ?",
      ar: "كيف يمكنني السفر إلى مكناس من الدار البيضاء بالقطار؟"
    },
    answer: {
      en: "You can take a train from Casablanca Voyageurs station directly to Meknes Ville station. The journey takes around 3 hours and is very scenic. First-class tickets are recommended and are very affordable.",
      fr: "Vous pouvez prendre un train depuis la gare de Casablanca Voyageurs vers la gare de Meknès Ville. Le trajet dure environ 3 heures. Les billets en première classe sont très abordables.",
      ar: "يمكنك ركوب القطار من محطة 'الدار البيضاء المسافرين' مباشرة إلى محطة 'مكناس المدينة'. تستغرق الرحلة حوالي 3 ساعات وتمتاز بمشاهد طبيعية جميلة. نوصي بحجز تذاكر الدرجة الأولى وهي ميسورة التكلفة."
    }
  }
];
