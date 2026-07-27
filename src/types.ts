export interface BirdCard {
  image: string;
  name: string;
  scientificName: string;
  habitat: string;
  description: string;
}

export interface Animal {
  image: string;
  name: string;
  scientificName: string;
  category: "Mammals" | "Birds" | "Reptiles" | "Amphibians" | "Fish";
  habitat: string;
  diet: string;
  lifespan: string;
  status: "Least Concern" | "Vulnerable" | "Near Threatened" | "Endangered" | "Critically Endangered";
  description: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  photographer: string;
  category: "Birds" | "Mammals" | "Forest" | "Ocean" | "Mountains";
}

export interface Photographer {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface AIIdentificationResult {
  speciesName: string;
  scientificName: string;
  confidenceScore: number;
  category: string;
  conservationStatus: string;
  habitat: string;
  diet: string;
  fieldTraits: string[];
  interestingFacts: string[];
  ethicalFieldAdvice: string;
}

export interface AIPhotoCritiqueResult {
  photoTitle: string;
  editorialCaption: string;
  suggestedCameraSettings: string;
  compositionAnalysis: string;
  conservationStory: string;
  tags: string[];
}

export interface AIFieldNotesResult {
  journalTitle: string;
  expeditionDate: string;
  weatherAndTerrain: string;
  behavioralObservation: string;
  acousticSignals: string;
  threatsAndConservation: string;
  proPhotographyTip: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export const FEATURED_BIRDS: BirdCard[] = [
  {
    image: "https://images.unsplash.com/photo-1608223652565-df93e4e94b29?auto=format&fit=crop&q=80&w=800",
    name: "Common Kingfisher",
    scientificName: "Alcedo atthis",
    habitat: "Rivers, Lakes, Wetlands",
    description: "Renowned for its striking electric blue and orange plumage, the kingfisher is a master fisher that dives at speeds up to 25 mph.",
  },
  {
    image: "https://images.unsplash.com/photo-1588693951525-4c01bf0e6f79?auto=format&fit=crop&q=80&w=800",
    name: "Scarlet Macaw",
    scientificName: "Ara macao",
    habitat: "Tropical Rainforest Canopy",
    description: "A large and vibrant Neotropical parrot with bright red, yellow, and blue feathers, known for its incredible intelligence and loud calls.",
  },
  {
    image: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&q=80&w=800",
    name: "Atlantic Puffin",
    scientificName: "Fratercula arctica",
    habitat: "Coastal Cliffs, Open Oceans",
    description: "Nicknamed the 'sea parrot' because of its colorful triangular beak, this seabird spends most of its life swimming on the open waves.",
  },
  {
    image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800",
    name: "Snowy Owl",
    scientificName: "Bubo scandiacus",
    habitat: "Arctic Tundra & Grasslands",
    description: "An elegant, heavy owl with brilliant white feathers that provide perfect camouflage against the polar snows of the north.",
  },
  {
    image: "https://images.unsplash.com/photo-1591821096433-12b9944ce7b8?auto=format&fit=crop&q=80&w=800",
    name: "Resplendent Quetzal",
    scientificName: "Pharomachrus mocinno",
    habitat: "Cloud Forests of Mesoamerica",
    description: "Considered sacred by ancient Mayans, this dazzling bird boasts a spectacular metallic green body and dual long tail streamers.",
  },
  {
    image: "https://images.unsplash.com/photo-1589998059334-de4008946115?auto=format&fit=crop&q=80&w=800",
    name: "Anna's Hummingbird",
    scientificName: "Calypte anna",
    habitat: "Coastal Woodlands & Gardens",
    description: "Known for the iridescent magenta throats of males, these tiny acrobats can hover in mid-air and fly backwards with absolute precision.",
  }
];

export const ANIMALS: Animal[] = [
  {
    name: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    category: "Mammals",
    habitat: "Dense forests, mangrove swamps, and grasslands",
    diet: "Carnivore (deer, wild boar, gaurs)",
    lifespan: "10-15 years",
    status: "Endangered",
    image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=800",
    description: "An iconic apex predator characterized by its fiery orange coat and distinct dark stripes. They are solitary and highly territorial hunters."
  },
  {
    name: "African Elephant",
    scientificName: "Loxodonta africana",
    category: "Mammals",
    habitat: "Savannas, forests, and deserts of Sub-Saharan Africa",
    diet: "Herbivore (roots, grasses, fruit, bark)",
    lifespan: "60-70 years",
    status: "Endangered",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=800",
    description: "The largest land mammal on Earth, recognizable by their massive ears and long tusks. They possess immense intelligence and deep social structures."
  },
  {
    name: "Giant Panda",
    scientificName: "Ailuropoda melanoleuca",
    category: "Mammals",
    habitat: "High-altitude bamboo forests of western China",
    diet: "Herbivore (almost exclusively bamboo)",
    lifespan: "15-20 years",
    status: "Vulnerable",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&q=80&w=800",
    description: "Loved worldwide for their distinct black-and-white markings and gentle demeanor. Giant pandas spend up to 12 hours a day munching bamboo."
  },
  {
    name: "Snow Leopard",
    scientificName: "Panthera uncia",
    category: "Mammals",
    habitat: "Rugged mountain ranges of Central Asia",
    diet: "Carnivore (blue sheep, ibex, rodents)",
    lifespan: "15-18 years",
    status: "Vulnerable",
    image: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?auto=format&fit=crop&q=80&w=800",
    description: "Often called the 'ghost of the mountains,' snow leopards are uniquely adapted to freeze-cold craggy environments with their thick gray spotted fur."
  },
  {
    name: "Polar Bear",
    scientificName: "Ursus maritimus",
    category: "Mammals",
    habitat: "Arctic sea ice and coastal shorelines",
    diet: "Carnivore (primarily seals)",
    lifespan: "25-30 years",
    status: "Vulnerable",
    image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&q=80&w=800",
    description: "The world's largest land predators. They spend much of their lives on Arctic ocean pack ice, perfectly insulated by thick fat and water-repellent fur."
  },
  {
    name: "Red Fox",
    scientificName: "Vulpes vulpes",
    category: "Mammals",
    habitat: "Forests, tundras, prairies, and suburban zones",
    diet: "Omnivore (rodents, fruits, birds, insects)",
    lifespan: "3-5 years",
    status: "Least Concern",
    image: "https://images.unsplash.com/photo-1516641396056-0ce60a35d1f8?auto=format&fit=crop&q=80&w=800",
    description: "Incredibly resourceful and agile, the red fox is known for its clever nature, dynamic pouncing hunting style, and beautiful bushy tail."
  },
  {
    name: "Koala",
    scientificName: "Phascolarctos cinereus",
    category: "Mammals",
    habitat: "Eucalyptus woodlands of eastern Australia",
    diet: "Herbivore (exclusively eucalyptus leaves)",
    lifespan: "13-18 years",
    status: "Vulnerable",
    image: "https://images.unsplash.com/photo-1540573133985-7813630f9a76?auto=format&fit=crop&q=80&w=800",
    description: "A beloved marsupial that is heavily adapted to life in eucalyptus trees. They lead a sedentary lifestyle, sleeping up to 20 hours daily."
  },
  {
    name: "Eastern Gorilla",
    scientificName: "Gorilla beringei",
    category: "Mammals",
    habitat: "Tropical rainforests and mountain clouds",
    diet: "Herbivore (foliage, shoots, vines, bark)",
    lifespan: "35-40 years",
    status: "Critically Endangered",
    image: "https://images.unsplash.com/photo-1541485114927-0df5735c037b?auto=format&fit=crop&q=80&w=800",
    description: "The largest living primate, possessing massive strength and sophisticated emotional intelligence. They live in tight, cooperative family troops."
  },
  {
    name: "Japanese Macaque",
    scientificName: "Macaca fuscata",
    category: "Mammals",
    habitat: "Snowy mountains and hot springs of Japan",
    diet: "Omnivore (seeds, roots, fruit, invertebrates)",
    lifespan: "20-25 years",
    status: "Least Concern",
    image: "https://images.unsplash.com/photo-1574063413132-355dbfd83e0c?auto=format&fit=crop&q=80&w=800",
    description: "Famous worldwide as the 'Snow Monkey' of Japan, renowned for bathing in natural geothermal hot springs surrounded by snowy alpine mountain slopes."
  },
  {
    name: "Gray Wolf",
    scientificName: "Canis lupus",
    category: "Mammals",
    habitat: "Tundras, forests, mountains, and plains",
    diet: "Carnivore (deer, elk, bison, rodents)",
    lifespan: "6-8 years",
    status: "Least Concern",
    image: "https://images.unsplash.com/photo-1590273466070-40c466b4432c?auto=format&fit=crop&q=80&w=800",
    description: "Highly social predators that live and hunt in highly organized packs. They communicate with haunting, soulful vocalizations."
  },
  {
    name: "Cheetah",
    scientificName: "Acinonyx jubatus",
    category: "Mammals",
    habitat: "Dry forests, shrublands, and open savannas",
    diet: "Carnivore (gazelles, impalas, hares)",
    lifespan: "10-12 years",
    status: "Vulnerable",
    image: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&q=80&w=800",
    description: "The absolute fastest land animal on the planet, capable of accelerating from 0 to 60 mph in under three seconds with specialized aerodynamic bodies."
  },
  {
    name: "Keel-billed Toucan",
    scientificName: "Ramphastos sulfuratus",
    category: "Birds",
    habitat: "Tropical Rainforest Canopy",
    diet: "Herbivore (fruits, berries, insects)",
    lifespan: "15-20 years",
    status: "Least Concern",
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80&w=800",
    description: "Famous for its huge rainbow-colored bill, this colorful bird is a playful social inhabitant of Central and South American rainforest canopies."
  },
  {
    name: "Bald Eagle",
    scientificName: "Haliaeetus leucocephalus",
    category: "Birds",
    habitat: "Rivers, Lakes, Coasts & Wetlands",
    diet: "Carnivore (fish, waterfowl, small mammals)",
    lifespan: "20-30 years",
    status: "Least Concern",
    image: "https://images.unsplash.com/photo-1611843426361-ec8f381c81cf?auto=format&fit=crop&q=80&w=800",
    description: "A majestic bird of prey recognizable by its snowy white head and dark brown body, possessing powerful talons and keen vision."
  },
  {
    name: "Galapagos Giant Tortoise",
    scientificName: "Chelonoidis niger",
    category: "Reptiles",
    habitat: "Arid lava soils and humid highlands",
    diet: "Herbivore (grass, leaves, cactus, fruit)",
    lifespan: "100-150 years",
    status: "Critically Endangered",
    image: "https://images.unsplash.com/photo-1548858850-e7b4a2e23a41?auto=format&fit=crop&q=80&w=800",
    description: "The largest living species of tortoise, capable of weighing up to 900 lbs. They are famous for their slow pace and contribution to evolutionary science."
  },
  {
    name: "Red-eyed Tree Frog",
    scientificName: "Agalychnis callidryas",
    category: "Amphibians",
    habitat: "Tropical lowland rainforests near rivers",
    diet: "Insectivore (crickets, moths, flies)",
    lifespan: "5-10 years",
    status: "Least Concern",
    image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&q=80&w=800",
    description: "Known for its vibrant lime green body, brilliant blue and yellow striped flanks, and bulging scarlet eyes that startle tropical predators."
  },
  {
    name: "Great White Shark",
    scientificName: "Carcharodon carcharias",
    category: "Fish",
    habitat: "Coastal and offshore temperate marine waters",
    diet: "Carnivore (seals, sea lions, dolphins, fish)",
    lifespan: "70+ years",
    status: "Vulnerable",
    image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&q=80&w=800",
    description: "The world's largest known predatory fish. Equipped with hundreds of serrated teeth, they possess incredibly advanced electrical senses."
  },
  {
    name: "Green Sea Turtle",
    scientificName: "Chelonia mydas",
    category: "Reptiles",
    habitat: "Tropical and subtropical coastal waters, seagrass meadows",
    diet: "Herbivore (seagrass and algae)",
    lifespan: "70-80 years",
    status: "Endangered",
    image: "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&q=80&w=800",
    description: "An ancient wanderer of the oceans, known for its long migrations between feeding grounds and nesting beaches. They are named for the green color of their subdermal fat."
  },
  {
    name: "Panther Chameleon",
    scientificName: "Furcifer pardalis",
    category: "Reptiles",
    habitat: "Tropical forest floors and shrublands of Madagascar",
    diet: "Insectivore (crickets, grasshoppers, roaches)",
    lifespan: "5-7 years",
    status: "Least Concern",
    image: "https://images.unsplash.com/photo-1512428813824-f713cfcfc51d?auto=format&fit=crop&q=80&w=800",
    description: "Renowned for its brilliantly colorful and highly variable color patterns. They have independently moving eyes and a super-fast projectile tongue."
  },
  {
    name: "Golden Poison Frog",
    scientificName: "Phyllobates terribilis",
    category: "Amphibians",
    habitat: "Humid lowland rainforests of Colombia",
    diet: "Insectivore (specialized ants, beetles, termites)",
    lifespan: "10-15 years",
    status: "Endangered",
    image: "https://images.unsplash.com/photo-1550952047-97594bf7b40d?auto=format&fit=crop&q=80&w=800",
    description: "One of the most toxic animals on earth. A single tiny frog contains enough batrachotoxin to kill ten grown men, used historically on native blowdarts."
  },
  {
    name: "Axolotl",
    scientificName: "Ambystoma mexicanum",
    category: "Amphibians",
    habitat: "High-altitude lake complex of Xochimilco, Mexico",
    diet: "Carnivore (worms, insect larvae, small fish)",
    lifespan: "10-15 years",
    status: "Critically Endangered",
    image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&q=80&w=800",
    description: "An extraordinary neotenic salamander that never undergoes metamorphosis, remaining aquatic and keeping its frilly external gills for life. Famous for regenerating entire limbs."
  },
  {
    name: "Ocellaris Clownfish",
    scientificName: "Amphiprion ocellaris",
    category: "Fish",
    habitat: "Coral reefs of the Indo-Pacific",
    diet: "Omnivore (algae, zooplankton, copepods)",
    lifespan: "6-10 years",
    status: "Least Concern",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a02?auto=format&fit=crop&q=80&w=800",
    description: "Instantly recognizable by its bright orange body and bold white bands. They live in a symbiotic relationship with sea anemones, which protect them from predators."
  },
  {
    name: "Reef Manta Ray",
    scientificName: "Mobula alfredi",
    category: "Fish",
    habitat: "Tropical and subtropical coastal waters and reefs",
    diet: "Planktivore (microscopic zooplankton)",
    lifespan: "40-50 years",
    status: "Vulnerable",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
    description: "An elegant, massive ray that seems to fly through the water using wing-like pectoral fins. They possess the largest brain-to-body weight ratio of any cold-blooded fish."
  },
  {
    name: "Whale Shark",
    scientificName: "Rhincodon typus",
    category: "Fish",
    habitat: "Open warm oceans and tropical coastlines",
    diet: "Filter feeder (plankton, krill, small fish)",
    lifespan: "80-130 years",
    status: "Endangered",
    image: "https://images.unsplash.com/photo-1598977123418-45f04b614133?auto=format&fit=crop&q=80&w=800",
    description: "The largest known fish species currently alive. Despite their monumental size, they are gentle giants of the sea, filter-feeding on microscopic organisms."
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    image: "https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=800",
    title: "Sovereign Flight",
    photographer: "Elena Rostova",
    category: "Birds",
  },
  {
    id: "gal-2",
    image: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&q=80&w=800",
    title: "Morning Mist Sentinel",
    photographer: "Marcus Vance",
    category: "Mammals",
  },
  {
    id: "gal-3",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
    title: "Emerald Cathedral",
    photographer: "Sarah Jenkins",
    category: "Forest",
  },
  {
    id: "gal-4",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    title: "Golden Shorelines",
    photographer: "Marcus Vance",
    category: "Ocean",
  },
  {
    id: "gal-5",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    title: "Crown of the Continent",
    photographer: "Sarah Jenkins",
    category: "Mountains",
  },
  {
    id: "gal-6",
    image: "https://images.unsplash.com/photo-1510414842594-fc6302f51990?auto=format&fit=crop&q=80&w=800",
    title: "Blushing Lagoon",
    photographer: "Elena Rostova",
    category: "Birds",
  },
  {
    id: "gal-7",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800",
    title: "Queen of the Kopje",
    photographer: "Marcus Vance",
    category: "Mammals",
  },
  {
    id: "gal-8",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    title: "Abyssal Glow",
    photographer: "Sarah Jenkins",
    category: "Ocean",
  },
  {
    id: "gal-9",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=800",
    title: "Alabaster Spire",
    photographer: "Elena Rostova",
    category: "Mountains",
  },
  {
    id: "gal-10",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800",
    title: "Whisper of the Woods",
    photographer: "Sarah Jenkins",
    category: "Forest",
  },
  {
    id: "gal-11",
    image: "https://images.unsplash.com/photo-1522921193457-27ddd547da50?auto=format&fit=crop&q=80&w=800",
    title: "Canopy Spectacle",
    photographer: "Elena Rostova",
    category: "Birds",
  },
  {
    id: "gal-12",
    image: "https://images.unsplash.com/photo-1480044965905-02098d419e96?auto=format&fit=crop&q=80&w=800",
    title: "Majestic Apex",
    photographer: "Elena Rostova",
    category: "Birds",
  },
  {
    id: "gal-13",
    image: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?auto=format&fit=crop&q=80&w=800",
    title: "Autumn Acrobat",
    photographer: "Marcus Vance",
    category: "Mammals",
  },
  {
    id: "gal-14",
    image: "https://images.unsplash.com/photo-1581347647264-90f7729f3d9d?auto=format&fit=crop&q=80&w=800",
    title: "Tundra Howler",
    photographer: "Marcus Vance",
    category: "Mammals",
  },
  {
    id: "gal-15",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=800",
    title: "Foliage Forager",
    photographer: "Marcus Vance",
    category: "Mammals",
  },
  {
    id: "gal-16",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800",
    title: "Golden Pine Cathedral",
    photographer: "Sarah Jenkins",
    category: "Forest",
  },
  {
    id: "gal-17",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800",
    title: "Silent Grove Runnel",
    photographer: "Sarah Jenkins",
    category: "Forest",
  },
  {
    id: "gal-18",
    image: "https://images.unsplash.com/photo-1570481662006-a3a13746fe4e?auto=format&fit=crop&q=80&w=800",
    title: "Oceanic Titan",
    photographer: "Sarah Jenkins",
    category: "Ocean",
  },
  {
    id: "gal-19",
    image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=800",
    title: "Anemone Shelter",
    photographer: "Sarah Jenkins",
    category: "Ocean",
  },
  {
    id: "gal-20",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&q=80&w=800",
    title: "Gliding Wanderer",
    photographer: "Sarah Jenkins",
    category: "Ocean",
  },
  {
    id: "gal-21",
    image: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?auto=format&fit=crop&q=80&w=800",
    title: "Glacial Citadel",
    photographer: "Elena Rostova",
    category: "Mountains",
  },
  {
    id: "gal-22",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=800",
    title: "Alpine Daredevil",
    photographer: "Marcus Vance",
    category: "Mountains",
  },
  {
    id: "gal-23",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=800",
    title: "Pacific Depths",
    photographer: "Sarah Jenkins",
    category: "Ocean",
  },
  {
    id: "gal-24",
    image: "https://images.unsplash.com/photo-1533682805518-48d1f5b8cd3a?auto=format&fit=crop&q=80&w=800",
    title: "Prismatic Plumage",
    photographer: "Elena Rostova",
    category: "Birds",
  },
  {
    id: "gal-25",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=800",
    title: "Coiled Velocity",
    photographer: "Marcus Vance",
    category: "Mammals",
  },
  {
    id: "gal-26",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800",
    title: "Dappled Sanctuary",
    photographer: "Sarah Jenkins",
    category: "Forest",
  },
  {
    id: "gal-27",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
    title: "High-Altitude Solitude",
    photographer: "Marcus Vance",
    category: "Mountains",
  },
  {
    id: "gal-28",
    image: "https://images.unsplash.com/photo-1550853024-fae8cd4be47f?auto=format&fit=crop&q=80&w=800",
    title: "Tropical Wingspan",
    photographer: "Elena Rostova",
    category: "Birds",
  },
  {
    id: "gal-29",
    image: "https://images.unsplash.com/photo-1551085254-e96b210db58a?auto=format&fit=crop&q=80&w=800",
    title: "Seabird Solitude",
    photographer: "Elena Rostova",
    category: "Birds",
  },
  {
    id: "gal-30",
    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=800",
    title: "Savanna Monarch",
    photographer: "Marcus Vance",
    category: "Mammals",
  },
  {
    id: "gal-31",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800",
    title: "Sylvan Serenity",
    photographer: "Sarah Jenkins",
    category: "Forest",
  },
  {
    id: "gal-32",
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800",
    title: "Arctic Silent Gaze",
    photographer: "Elena Rostova",
    category: "Birds",
  },
  {
    id: "gal-33",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&q=80&w=800",
    title: "Sacred Mount Fuji (Japan)",
    photographer: "Marcus Vance",
    category: "Mountains",
  }
];

export const PHOTOGRAPHERS: Photographer[] = [
  {
    name: "Elena Rostova",
    role: "Ornithologist & Lead Photographer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    bio: "With a PhD in Ornithology, Elena has spent 12 years capturing rare bird species across the Amazon Basin and Cloud Forests of Central America.",
  },
  {
    name: "Marcus Vance",
    role: "Apex Hunter Specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    bio: "Marcus specializes in photographing big cats and high-altitude predators. His work has been featured twice in National Geographic.",
  },
  {
    name: "Sarah Jenkins",
    role: "Landscape & Conservation Photojournalist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    bio: "Sarah focuses on documenting changing biomes and ecosystem connections. She coordinates local citizen-science visual drives.",
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: "2015",
    title: "The Genesis",
    description: "NatureLens is founded as a collaborative of three wildlife photographers dedicated to authentic field documentation.",
  },
  {
    year: "2018",
    title: "Conservation Partnership",
    description: "Partnered with the Global Wildlife Alliance, donating 15% of all gallery print proceeds directly to habitat protection.",
  },
  {
    year: "2021",
    title: "Rare Species Documentation",
    description: "Successfully captured the first high-definition nesting shots of the Critically Endangered Spoon-billed Sandpiper.",
  },
  {
    year: "2025",
    title: "NatureLens Global Canopy",
    description: "Launched an international training program empowering local trackers in high-biodiversity areas with visual equipment.",
  }
];
