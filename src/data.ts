import { Herb, GardenLog, LibraryItem } from './types';

export const INITIAL_HERBS: Herb[] = [
  {
    id: 'herb-1',
    name: "Lavender",
    latin: "Lavandula angustifolia",
    category: "Medicinal",
    status: "healthy",
    lastWatered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    waterFrequencyDays: 7,
    sunlight: "Full Sun",
    soilPreference: "Sandy, dry, well-draining, slightly alkaline",
    activeConstituents: ["Linalool", "Linalyl acetate", "Cineole"],
    uses: ["Promoting sleep & relaxation", "Heal burns & cuts", "Repelling troublesome insects", "Calming nervous anxiety"],
    description: "Lavender is a heavily aromatic evergreen shrub celebrated for its soothing scent and grey-green, needle-like leaves. Favored across antiquity, it has been used in lavender baths, salves, and teas for over two millennia.",
    history: "Used by the Romans to scent baths and disinfect clothes, its very name derives from the Latin 'lavare' (to wash). During the Great Plague of London, grave robbers washed in lavender to protect against infection.",
    temperatureRange: "15°C - 30°C",
    plantedDate: "2026-03-01"
  },
  {
    id: 'herb-2',
    name: "Peppermint",
    latin: "Mentha piperita",
    category: "Culinary",
    status: "thirst",
    lastWatered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    waterFrequencyDays: 3,
    sunlight: "Partial Shade / Bright Indirect",
    soilPreference: "Moist, rich, loamy, organic matter",
    activeConstituents: ["Menthol", "Menthone", "Menthyl acetate"],
    uses: ["Relieving digestive spasms & bloating", "Cooling muscle tension", "Improving mental focus & respiratory clarity"],
    description: "A vigorous, invasive hybrid herb crossing spearmint and watermint. It features deep square purple-tinged stems, dark green leaves, and a powerful, cooling fragrance that thrives in moist, cooler corners.",
    history: "Mentioned in the Ebers Papyrus (1550 BC) as a digestive aid, peppermint was also strewn across ancient temples to freshen smelling halls. It gained culinary fame as a classic British garden herb.",
    temperatureRange: "12°C - 24°C",
    plantedDate: "2026-03-15"
  },
  {
    id: 'herb-3',
    name: "Echinacea",
    latin: "Echinacea purpurea",
    category: "Medicinal",
    status: "healthy",
    lastWatered: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    waterFrequencyDays: 6,
    sunlight: "Full Sun",
    soilPreference: "Clay-loam, gravelly, highly drought-tolerant",
    activeConstituents: ["Alkylamides", "Cichoric acid", "Echinacoside", "Polysaccharides"],
    uses: ["Modulating & strengthening immune responses", "Soothe sore throat infections", "Reduce respiratory inflammation"],
    description: "Also known as Purple Coneflower, Echinacea represents a hardy North American perennial. Its vibrant, pink-purple petals surround a spiny, copper-coloured central cone, attracting butterflies and bees alike.",
    history: "Indigenous to the Great Plains, Native American tribes (including the Cheyenne and Lakota) used it for snakebites, fevers, and dental pain. Today it is standard in modern herbal medicine.",
    temperatureRange: "18°C - 32°C",
    plantedDate: "2026-04-02"
  },
  {
    id: 'herb-4',
    name: "Chamomile",
    latin: "Matricaria chamomilla",
    category: "Aromatic",
    status: "dormant",
    lastWatered: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    waterFrequencyDays: 5,
    sunlight: "Full Sun to Light Shade",
    soilPreference: "Lighter sandy, neutral to slightly acidic pH",
    activeConstituents: ["Chamazulene", "Bisabolol", "Apigenin"],
    uses: ["Inducing restorative sleep", "Easing dry colic & stomach discomforts", "Anti-inflammatory skin wash"],
    description: "Chamomile is a delicate annual herb producing small, cheerful daisy-like flowers with white ray petals and deep yellow golden centers. It releases a sweet apple-like fruit aroma when crushed.",
    history: "Dedicated to the Sun god Ra by the Egyptians due to its capacity to ease fevers. Pliny the Elder wrote of its soothing qualities, which is why it retains standard pharmacopeia status.",
    temperatureRange: "10°C - 22°C",
    plantedDate: "2026-02-10"
  },
  {
    id: 'herb-5',
    name: "Rosemary",
    latin: "Salvia rosmarinus",
    category: "Culinary",
    status: "healthy",
    lastWatered: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    waterFrequencyDays: 8,
    sunlight: "Full Sun",
    soilPreference: "Dry, sandy, rocky, high drainage",
    activeConstituents: ["Rosmarinic acid", "Carnic acid", "Cineole", "Camphor"],
    uses: ["Improving concentration & short-term memory", "Enhancing blood circulation", "Antioxidant preservation of culinary meats"],
    description: "A woody, perennial shrub native to the rocky Mediterranean hillsides, sporting needle-like leaves and highly fragrant blue flowers. It is exceptionally resilient and thrives on dryness.",
    history: "Known as the herb of remembrance. Ancient Greek scholars wore chaplets of rosemary on their foreheads during examinations to bolster memory. It is heavily associated with loyalty and grief.",
    temperatureRange: "15°C - 35°C",
    plantedDate: "2026-02-28"
  },
  {
    id: 'herb-6',
    name: "Lemon Balm",
    latin: "Melissa officinalis",
    category: "Aromatic",
    status: "thirst",
    lastWatered: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    waterFrequencyDays: 4,
    sunlight: "Partial Shade / Dappled Sunlight",
    soilPreference: "Rich, moist, well-draining garden soil",
    activeConstituents: ["Rosmarinic acid", "Citral", "Citronellal", "Geraniol"],
    uses: ["Lowering stressful cortisol & soothing nerves", "Antiviral actions for skin lesions", "Add citrus zest to culinary beverages"],
    description: "A mild lemon-scented woodland perennial in the mint family. Its soft, crinkly heart-shaped leaves emit an bright, uplifting citrus scent when brushed or steeped in tea.",
    history: "Named 'Melissa' from the Greek word for honeybee, as beekeepers rubbed lemon balm on hives to attract swarms. Paracelsus called it the 'elixir of life' for revitalizing weak constitutions.",
    temperatureRange: "12°C - 26°C",
    plantedDate: "2026-03-20"
  }
];

export const INITIAL_LOGS: GardenLog[] = [
  {
    id: 'log-1',
    herbId: 'herb-1',
    herbName: 'Lavender',
    type: 'Watering',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Gave a moderate watering. Surface soil allowed to fully dry beforehand.',
    intensity: 'moderate'
  },
  {
    id: 'log-2',
    herbId: 'herb-5',
    herbName: 'Rosemary',
    type: 'Pruning',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Harvested some soft top foliage for cooking. Trimmed woody lower wood to stimulate fresh foliage.',
    intensity: 'light'
  },
  {
    id: 'log-3',
    herbId: 'herb-2',
    herbName: 'Peppermint',
    type: 'Watering',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'watered heavily as soil was completely dry. Peppermint needs moist soil.',
    intensity: 'heavy'
  },
  {
    id: 'log-4',
    herbId: 'herb-4',
    herbName: 'Chamomile',
    type: 'Observation',
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Chamomile is entering a summer dormant phase. Moved further to partial shade.',
    intensity: 'standard'
  }
];

export const LIBRARY_DATABASE: LibraryItem[] = [
  {
    id: 'lib-lavender',
    name: "Lavender",
    latin: "Lavandula angustifolia",
    category: "Medicinal",
    sunlight: "Full Sun",
    waterFrequency: "Every 7-10 days",
    optimalSoil: "Sandy, gritty, poor soils of high pH",
    constituents: ["Linalool", "Linalyl acetate", "Limonene"],
    therapeuticActions: ["Anxiolytic", "Soporific", "Antimicrobial", "Analgesic"],
    description: "Highly valued for its floral perfume, lavender is widely used in aromatherapy. It stimulates soothing neurotransmitters in the brain, relaxing anxious minds and facilitating restorative sleep cycles.",
    contraindications: "Generally safe. Avoid excessive ingestion of essential oil.",
    bestCompanions: ["Rosemary", "Sage", "Thyme"]
  },
  {
    id: 'lib-peppermint',
    name: "Peppermint",
    latin: "Mentha piperita",
    category: "Culinary",
    sunlight: "Partial Sun to Shade",
    waterFrequency: "Every 3-4 days (Thrives on moisture)",
    optimalSoil: "Humus-rich, loamy, damp soil",
    constituents: ["Menthol", "Menthone", "Pulegone"],
    therapeuticActions: ["Antispasmodic", "Carminative", "Choleretic", "Rubefacient"],
    description: "Peppermint's potent menthol relaxes stomach muscles and supports bile flow, directly relieving painful cramping, gas, and digestive discomfort. Its cooling spray is exceptionally refreshing.",
    contraindications: "Should not be used in children experiencing severe reflux or hiatal hernias.",
    bestCompanions: ["Oregano", "Chives", "Basil"]
  },
  {
    id: 'lib-echinacea',
    name: "Echinacea",
    latin: "Echinacea purpurea",
    category: "Medicinal",
    sunlight: "Full Sun",
    waterFrequency: "Every 5-7 days",
    optimalSoil: "Well-drained sand, gravel, and light clay",
    constituents: ["Alkylamides", "Echinacoside", "Polysaccharides"],
    therapeuticActions: ["Immunostimulant", "Vulnerary", "Antifungal", "Lymphatic"],
    description: "A profound immune defense agent. Alkylamides bind to cannabinoid receptors in immune columns, triggering white blood cell phagocytosis to arrest winter pathogens rapidly.",
    contraindications: "Caution for auto-immune conditions like lupus or tuberculosis.",
    bestCompanions: ["Wild Indigo", "Yarrow", "Bee Balm"]
  },
  {
    id: 'lib-chamomile',
    name: "Chamomile",
    latin: "Matricaria chamomilla",
    category: "Aromatic",
    sunlight: "Full Sun to Light Shade",
    waterFrequency: "Every 5-6 days",
    optimalSoil: "Neutral-acid loams",
    constituents: ["Chamazulene", "Apigenin", "Matricin"],
    therapeuticActions: ["Sedative", "Anti-inflammatory", "Digestive Carminative"],
    description: "Prized for soothing physical tension. Apigenin binds directly to benzodiazepine receptors in the brain to introduce mental calmness, while chamazulene acts on tissue inflammatory pathways.",
    contraindications: "Avoid if highly allergic to daisy family plants (Asteraceae).",
    bestCompanions: ["Mint", "Lemon Verbena", "Calendula"]
  },
  {
    id: 'lib-rosemary',
    name: "Rosemary",
    latin: "Salvia rosmarinus",
    category: "Culinary",
    sunlight: "Full Sun",
    waterFrequency: "Every 8-10 days",
    optimalSoil: "Sandy, rocky, dry, well-aerated",
    constituents: ["Rosmarinic Acid", "Borneol", "Eucalyptol"],
    therapeuticActions: ["Circulatory stimulant", "Nootropic", "Antioxidant"],
    description: "A legendary cardiotonic and memory aid. Volatile constituents cross the blood-brain barrier to inhibit acetylcholinesterase, effectively leaving memory neurotransmitters active in synapses longer.",
    contraindications: "Do not apply full-strength oil on the face of infants.",
    bestCompanions: ["Lavender", "Sage", "Fennel"]
  },
  {
    id: 'lib-lemonbalm',
    name: "Lemon Balm",
    latin: "Melissa officinalis",
    category: "Aromatic",
    sunlight: "Partial Shade / Sun",
    waterFrequency: "Every 4 days",
    optimalSoil: "Damp, rich, cool loams",
    constituents: ["Rosmarinic acid", "Citronellal", "Caryophyllene"],
    therapeuticActions: ["Nervine sedative", "Antivirals", "Cognitive enhancer"],
    description: "Improves mood and mental clarity. By inhibiting the GABA transaminase enzyme, it maintains higher GABA, introducing profound calmness and lifting mood slumps.",
    contraindications: "May affect thyroid production in large medicinal amounts.",
    bestCompanions: ["Mints", "Angelica", "Geraniums"]
  },
  {
    id: 'lib-holybasil',
    name: "Holy Basil (Tulsi)",
    latin: "Ocimum tenuiflorum",
    category: "Medicinal",
    sunlight: "Full Sun",
    waterFrequency: "Every 3-5 days",
    optimalSoil: "Moist, fertile, sandy-loam with organic humus",
    constituents: ["Eugenol", "Ursolic acid", "Caryophyllene"],
    therapeuticActions: ["Adaptogen", "Antiviral", "Antioxidant", "Hypoglycemic"],
    description: "Known as the 'Incomparable One' in India. As a powerful adaptogen, it lowers physical stress responses, moderates blood sugar levels, and cleanses respiratory pathways.",
    contraindications: "May reduce blood glucose too fast when joined with medical insulins.",
    bestCompanions: ["Marigolds", "Peppers", "Ginger"]
  },
  {
    id: 'lib-thyme',
    name: "Thyme",
    latin: "Thymus vulgaris",
    category: "Culinary",
    sunlight: "Full Sun",
    waterFrequency: "Every 7-10 days",
    optimalSoil: "Poor, rocky, alkaline, fast-draining soil",
    constituents: ["Thymol", "Carvacrol", "Cymene"],
    therapeuticActions: ["Antimicrobial", "Expectorant", "Antispasmodic", "Antioxidant"],
    description: "Thyme is a potent culinary and respiratory champion. Thymol and carvacrol have immense antibacterial power, relaxing bronchial spasms which makes it perfect for stubborn dry coughs.",
    contraindications: "Safe at normal food intake heights. Pure essential oil is extremely spicy.",
    bestCompanions: ["Rosemary", "Oregano", "Cabbage"]
  },
  {
    id: 'lib-calendula',
    name: "Calendula (Marygold)",
    latin: "Calendula officinalis",
    category: "Medicinal",
    sunlight: "Full Sun to Light Shade",
    waterFrequency: "Every 5-6 days",
    optimalSoil: "Moderately rich, moist, drained soils",
    constituents: ["Faradiol", "Calenduladiol", "Carotenoids"],
    therapeuticActions: ["Anti-inflammatory", "Vulnerary", "Lymphatic", "Emollient"],
    description: "Celebrated for soothing inflamed skin conditions. The yellow carotenoids stimulate fresh granulation tissue, healing dry eczema, scars, bruises, and skin rashes rapidly.",
    contraindications: "Safe outwardly. Avoid consuming in early pregnancy.",
    bestCompanions: ["Tomatoes", "Asparagus", "Parsley"]
  }
];
