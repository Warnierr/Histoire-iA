// DONNÉES MOCK ÉTENDUES - 150+ religions avec hiérarchie complète
// Basé sur le diagramme Mermaid complet fourni

export interface MockReligion {
  id: string;
  name: string;
  slug: string;
  category: string;
  family: string | null;
  foundedYear: number | null;
  foundedPlace: string | null;
  followers: number | null;
  color: string;
  parentId: string | null;
  status: string;
  description: string;
}

export const mockReligions: MockReligion[] = [
  // =============== HINDOUISME & BRANCHES DHARMIQUES ===============
  {
    id: 'hinduism',
    name: 'Hindouisme',
    slug: 'hindouisme',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: -1500,
    foundedPlace: 'Vallée de l\'Indus',
    followers: 1200000000,
    color: '#FF6347',
    parentId: null,
    status: 'ACTIVE',
    description: 'Une des plus anciennes religions du monde'
  },
  
  // Vaishnavisme
  {
    id: 'vaishnavism',
    name: 'Vaishnavisme',
    slug: 'vaishnavisme',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: -500,
    foundedPlace: 'Inde',
    followers: 640000000,
    color: '#FF7F50',
    parentId: 'hinduism',
    status: 'ACTIVE',
    description: 'Tradition centrée sur le culte de Vishnu'
  },
  {
    id: 'iskcon',
    name: 'ISKCON (Hare Krishna)',
    slug: 'iskcon',
    category: 'MODERNE',
    family: 'dharmique',
    foundedYear: 1966,
    foundedPlace: 'New York',
    followers: 1000000,
    color: '#FF8C69',
    parentId: 'vaishnavism',
    status: 'ACTIVE',
    description: 'Mouvement Hare Krishna fondé par Prabhupada'
  },
  {
    id: 'swaminarayan',
    name: 'Swaminarayan',
    slug: 'swaminarayan',
    category: 'MODERNE',
    family: 'dharmique',
    foundedYear: 1781,
    foundedPlace: 'Gujarat',
    followers: 5000000,
    color: '#FFA07A',
    parentId: 'vaishnavism',
    status: 'ACTIVE',
    description: 'Tradition vaishnavite fondée par Swaminarayan'
  },

  // Shivaïsme
  {
    id: 'shaivism',
    name: 'Shivaïsme',
    slug: 'shivaisme',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: -500,
    foundedPlace: 'Inde',
    followers: 260000000,
    color: '#DC143C',
    parentId: 'hinduism',
    status: 'ACTIVE',
    description: 'Tradition centrée sur le culte de Shiva'
  },
  {
    id: 'kashmir-shaivism',
    name: 'Kashmir Shaivisme',
    slug: 'kashmir-shaivisme',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 800,
    foundedPlace: 'Cachemire',
    followers: 1000000,
    color: '#CD5C5C',
    parentId: 'shaivism',
    status: 'ACTIVE',
    description: 'École tantrique shivaïte du Cachemire'
  },
  {
    id: 'lingayatism',
    name: 'Lingayatisme',
    slug: 'lingayatisme',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 1150,
    foundedPlace: 'Karnataka',
    followers: 15000000,
    color: '#B22222',
    parentId: 'shaivism',
    status: 'ACTIVE',
    description: 'Tradition shivaïte réformiste'
  },

  // Shaktisme
  {
    id: 'shaktism',
    name: 'Shaktisme',
    slug: 'shaktisme',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: -500,
    foundedPlace: 'Inde',
    followers: 180000000,
    color: '#8B008B',
    parentId: 'hinduism',
    status: 'ACTIVE',
    description: 'Tradition centrée sur la Déesse'
  },
  {
    id: 'tantrism',
    name: 'Tantrisme',
    slug: 'tantrisme',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 500,
    foundedPlace: 'Inde',
    followers: 50000000,
    color: '#9932CC',
    parentId: 'shaktism',
    status: 'ACTIVE',
    description: 'Pratiques ésotériques tantriques'
  },

  // BOUDDHISME
  {
    id: 'buddhism',
    name: 'Bouddhisme',
    slug: 'bouddhisme',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: -500,
    foundedPlace: 'Inde',
    followers: 520000000,
    color: '#FF8C00',
    parentId: 'hinduism',
    status: 'ACTIVE',
    description: 'Enseignements de Siddhartha Gautama'
  },

  // Theravada
  {
    id: 'theravada',
    name: 'Theravada',
    slug: 'theravada',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: -250,
    foundedPlace: 'Sri Lanka',
    followers: 150000000,
    color: '#FFA500',
    parentId: 'buddhism',
    status: 'ACTIVE',
    description: 'École ancienne du bouddhisme'
  },
  {
    id: 'thai-theravada',
    name: 'Tradition Thaï',
    slug: 'tradition-thai',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 1200,
    foundedPlace: 'Thaïlande',
    followers: 60000000,
    color: '#FFB84D',
    parentId: 'theravada',
    status: 'ACTIVE',
    description: 'Bouddhisme theravada thaïlandais'
  },
  {
    id: 'burmese-theravada',
    name: 'Tradition Birmane',
    slug: 'tradition-birmane',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 1000,
    foundedPlace: 'Birmanie',
    followers: 40000000,
    color: '#FFCC66',
    parentId: 'theravada',
    status: 'ACTIVE',
    description: 'Bouddhisme theravada birman'
  },
  {
    id: 'vipassana',
    name: 'Vipassana Moderne',
    slug: 'vipassana-moderne',
    category: 'MODERNE',
    family: 'dharmique',
    foundedYear: 1950,
    foundedPlace: 'Birmanie',
    followers: 5000000,
    color: '#FFE6B3',
    parentId: 'theravada',
    status: 'ACTIVE',
    description: 'Mouvement de méditation vipassana'
  },

  // Mahayana
  {
    id: 'mahayana',
    name: 'Mahayana',
    slug: 'mahayana',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 100,
    foundedPlace: 'Asie',
    followers: 360000000,
    color: '#FF7F00',
    parentId: 'buddhism',
    status: 'ACTIVE',
    description: 'Grand Véhicule du bouddhisme'
  },

  // Zen/Chan
  {
    id: 'zen-chan',
    name: 'Zen / Chan',
    slug: 'zen-chan',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 500,
    foundedPlace: 'Chine',
    followers: 20000000,
    color: '#CD8500',
    parentId: 'mahayana',
    status: 'ACTIVE',
    description: 'École de méditation zen'
  },
  {
    id: 'soto-zen',
    name: 'Sōtō Zen',
    slug: 'soto-zen',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 1227,
    foundedPlace: 'Japon',
    followers: 14000000,
    color: '#B87333',
    parentId: 'zen-chan',
    status: 'ACTIVE',
    description: 'École zen fondée par Dōgen'
  },
  {
    id: 'rinzai-zen',
    name: 'Rinzai Zen',
    slug: 'rinzai-zen',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 1191,
    foundedPlace: 'Japon',
    followers: 6000000,
    color: '#A0522D',
    parentId: 'zen-chan',
    status: 'ACTIVE',
    description: 'École zen avec pratique des kōans'
  },

  // Terre Pure
  {
    id: 'pure-land',
    name: 'Terre Pure',
    slug: 'terre-pure',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 400,
    foundedPlace: 'Chine',
    followers: 300000000,
    color: '#DAA520',
    parentId: 'mahayana',
    status: 'ACTIVE',
    description: 'Bouddhisme de la Terre Pure'
  },
  {
    id: 'jodo-shu',
    name: 'Jōdo-shū',
    slug: 'jodo-shu',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 1175,
    foundedPlace: 'Japon',
    followers: 5000000,
    color: '#FFD700',
    parentId: 'pure-land',
    status: 'ACTIVE',
    description: 'École de la Terre Pure japonaise'
  },

  // Nichiren
  {
    id: 'nichiren',
    name: 'Nichiren',
    slug: 'nichiren',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 1253,
    foundedPlace: 'Japon',
    followers: 40000000,
    color: '#FF6B35',
    parentId: 'mahayana',
    status: 'ACTIVE',
    description: 'École basée sur le Sutra du Lotus'
  },
  {
    id: 'soka-gakkai',
    name: 'Soka Gakkai',
    slug: 'soka-gakkai',
    category: 'MODERNE',
    family: 'dharmique',
    foundedYear: 1930,
    foundedPlace: 'Japon',
    followers: 12000000,
    color: '#FF8C42',
    parentId: 'nichiren',
    status: 'ACTIVE',
    description: 'Mouvement bouddhiste laïc moderne'
  },

  // Vajrayana
  {
    id: 'vajrayana',
    name: 'Vajrayana (Bouddhisme tibétain)',
    slug: 'vajrayana',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 700,
    foundedPlace: 'Tibet',
    followers: 20000000,
    color: '#CD853F',
    parentId: 'buddhism',
    status: 'ACTIVE',
    description: 'Bouddhisme tantrique tibétain'
  },
  {
    id: 'gelug',
    name: 'Gelug (Dalai Lama)',
    slug: 'gelug',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 1409,
    foundedPlace: 'Tibet',
    followers: 10000000,
    color: '#DEB887',
    parentId: 'vajrayana',
    status: 'ACTIVE',
    description: 'École des bonnets jaunes'
  },
  {
    id: 'kagyu',
    name: 'Kagyu',
    slug: 'kagyu',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 1050,
    foundedPlace: 'Tibet',
    followers: 3000000,
    color: '#D2691E',
    parentId: 'vajrayana',
    status: 'ACTIVE',
    description: 'Lignée de transmission orale'
  },
  {
    id: 'nyingma',
    name: 'Nyingma',
    slug: 'nyingma',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 800,
    foundedPlace: 'Tibet',
    followers: 4000000,
    color: '#B8860B',
    parentId: 'vajrayana',
    status: 'ACTIVE',
    description: 'École des anciens'
  },

  // Jaïnisme
  {
    id: 'jainism',
    name: 'Jaïnisme',
    slug: 'jainisme',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: -500,
    foundedPlace: 'Inde',
    followers: 5000000,
    color: '#DC143C',
    parentId: 'hinduism',
    status: 'ACTIVE',
    description: 'Tradition basée sur l\'ahimsa'
  },
  {
    id: 'digambara',
    name: 'Digambara',
    slug: 'digambara',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: -300,
    foundedPlace: 'Inde',
    followers: 2000000,
    color: '#C71585',
    parentId: 'jainism',
    status: 'ACTIVE',
    description: 'Moines vêtus de ciel'
  },
  {
    id: 'svetambara',
    name: 'Svetambara',
    slug: 'svetambara',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: -300,
    foundedPlace: 'Inde',
    followers: 3000000,
    color: '#FF1493',
    parentId: 'jainism',
    status: 'ACTIVE',
    description: 'Moines vêtus de blanc'
  },

  // Sikhisme
  {
    id: 'sikhism',
    name: 'Sikhisme',
    slug: 'sikhisme',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 1500,
    foundedPlace: 'Pendjab',
    followers: 30000000,
    color: '#FFD700',
    parentId: 'hinduism',
    status: 'ACTIVE',
    description: 'Religion fondée par Guru Nanak'
  },
  {
    id: 'khalsa',
    name: 'Khalsa Orthodoxe',
    slug: 'khalsa-orthodoxe',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 1699,
    foundedPlace: 'Pendjab',
    followers: 20000000,
    color: '#FFB300',
    parentId: 'sikhism',
    status: 'ACTIVE',
    description: 'Communauté des initiés sikhs'
  },
  {
    id: 'namdharis',
    name: 'Namdharis',
    slug: 'namdharis',
    category: 'DHARMIC',
    family: 'dharmique',
    foundedYear: 1857,
    foundedPlace: 'Pendjab',
    followers: 300000,
    color: '#DAA520',
    parentId: 'sikhism',
    status: 'ACTIVE',
    description: 'Mouvement réformiste sikh'
  },

  // =============== TRADITIONS ABRAHAMIQUES ===============

  // JUDAÏSME
  {
    id: 'judaism',
    name: 'Judaïsme',
    slug: 'judaisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: -2000,
    foundedPlace: 'Moyen-Orient',
    followers: 15000000,
    color: '#4682B4',
    parentId: null,
    status: 'ACTIVE',
    description: 'Religion monothéiste fondée sur la Torah'
  },
  {
    id: 'orthodox-judaism',
    name: 'Judaïsme Orthodoxe',
    slug: 'judaisme-orthodoxe',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1800,
    foundedPlace: 'Europe',
    followers: 6000000,
    color: '#4169E1',
    parentId: 'judaism',
    status: 'ACTIVE',
    description: 'Courant traditionnel du judaïsme'
  },
  {
    id: 'haredi',
    name: 'Ultra-Orthodoxe (Haredi)',
    slug: 'haredi',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1800,
    foundedPlace: 'Europe',
    followers: 2000000,
    color: '#191970',
    parentId: 'orthodox-judaism',
    status: 'ACTIVE',
    description: 'Judaïsme ultra-orthodoxe'
  },
  {
    id: 'hasidism',
    name: 'Hassidisme',
    slug: 'hassidisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1750,
    foundedPlace: 'Ukraine',
    followers: 1000000,
    color: '#000080',
    parentId: 'haredi',
    status: 'ACTIVE',
    description: 'Mouvement mystique juif'
  },
  {
    id: 'chabad',
    name: 'Loubavitch (Chabad)',
    slug: 'chabad',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1775,
    foundedPlace: 'Biélorussie',
    followers: 200000,
    color: '#0000CD',
    parentId: 'hasidism',
    status: 'ACTIVE',
    description: 'Mouvement hassidique Loubavitch'
  },
  {
    id: 'reform-judaism',
    name: 'Judaïsme Réformé',
    slug: 'judaisme-reforme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1810,
    foundedPlace: 'Allemagne',
    followers: 3500000,
    color: '#6495ED',
    parentId: 'judaism',
    status: 'ACTIVE',
    description: 'Courant libéral du judaïsme'
  },
  {
    id: 'conservative-judaism',
    name: 'Judaïsme Conservateur',
    slug: 'judaisme-conservateur',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1850,
    foundedPlace: 'USA',
    followers: 1800000,
    color: '#4682B4',
    parentId: 'judaism',
    status: 'ACTIVE',
    description: 'Courant traditionnel modéré'
  },
  {
    id: 'kabbalah',
    name: 'Kabbale (Mystique)',
    slug: 'kabbale',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1200,
    foundedPlace: 'Espagne/Provence',
    followers: 100000,
    color: '#9370DB',
    parentId: 'judaism',
    status: 'ACTIVE',
    description: 'Tradition mystique juive'
  },

  // CHRISTIANISME
  {
    id: 'christianity',
    name: 'Christianisme',
    slug: 'christianisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 30,
    foundedPlace: 'Judée',
    followers: 2400000000,
    color: '#DC143C',
    parentId: 'judaism',
    status: 'ACTIVE',
    description: 'Religion basée sur Jésus-Christ'
  },

  // Catholicisme
  {
    id: 'catholicism',
    name: 'Catholicisme Romain',
    slug: 'catholicisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 30,
    foundedPlace: 'Rome',
    followers: 1300000000,
    color: '#B22222',
    parentId: 'christianity',
    status: 'ACTIVE',
    description: 'Église catholique romaine'
  },
  {
    id: 'jesuits',
    name: 'Jésuites',
    slug: 'jesuites',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1540,
    foundedPlace: 'Paris',
    followers: 16000,
    color: '#8B0000',
    parentId: 'catholicism',
    status: 'ACTIVE',
    description: 'Compagnie de Jésus'
  },
  {
    id: 'franciscans',
    name: 'Franciscains',
    slug: 'franciscains',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1209,
    foundedPlace: 'Italie',
    followers: 13000,
    color: '#A52A2A',
    parentId: 'catholicism',
    status: 'ACTIVE',
    description: 'Ordre de Saint François d\'Assise'
  },
  {
    id: 'opus-dei',
    name: 'Opus Dei',
    slug: 'opus-dei',
    category: 'MODERNE',
    family: 'abrahamique',
    foundedYear: 1928,
    foundedPlace: 'Espagne',
    followers: 90000,
    color: '#800000',
    parentId: 'catholicism',
    status: 'ACTIVE',
    description: 'Prélature personnelle catholique'
  },

  // Orthodoxie
  {
    id: 'orthodoxy',
    name: 'Orthodoxie',
    slug: 'orthodoxie',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1054,
    foundedPlace: 'Constantinople',
    followers: 220000000,
    color: '#8B4513',
    parentId: 'christianity',
    status: 'ACTIVE',
    description: 'Églises orthodoxes orientales'
  },
  {
    id: 'russian-orthodox',
    name: 'Église Orthodoxe Russe',
    slug: 'orthodoxe-russe',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 988,
    foundedPlace: 'Russie',
    followers: 110000000,
    color: '#A0522D',
    parentId: 'orthodoxy',
    status: 'ACTIVE',
    description: 'Patriarcat de Moscou'
  },
  {
    id: 'greek-orthodox',
    name: 'Église Orthodoxe Grecque',
    slug: 'orthodoxe-grecque',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1054,
    foundedPlace: 'Constantinople',
    followers: 30000000,
    color: '#D2691E',
    parentId: 'orthodoxy',
    status: 'ACTIVE',
    description: 'Patriarcat de Constantinople'
  },
  {
    id: 'coptic-orthodox',
    name: 'Église Copte',
    slug: 'copte',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 50,
    foundedPlace: 'Égypte',
    followers: 20000000,
    color: '#CD853F',
    parentId: 'orthodoxy',
    status: 'ACTIVE',
    description: 'Église copte d\'Égypte'
  },

  // Protestantisme
  {
    id: 'protestantism',
    name: 'Protestantisme',
    slug: 'protestantisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1517,
    foundedPlace: 'Allemagne',
    followers: 900000000,
    color: '#FF6347',
    parentId: 'christianity',
    status: 'ACTIVE',
    description: 'Mouvement de la Réforme'
  },
  {
    id: 'lutheranism',
    name: 'Luthéranisme',
    slug: 'lutheranisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1517,
    foundedPlace: 'Allemagne',
    followers: 80000000,
    color: '#FF7F50',
    parentId: 'protestantism',
    status: 'ACTIVE',
    description: 'Église fondée par Martin Luther'
  },
  {
    id: 'calvinism',
    name: 'Calvinisme',
    slug: 'calvinisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1536,
    foundedPlace: 'Suisse',
    followers: 75000000,
    color: '#FA8072',
    parentId: 'protestantism',
    status: 'ACTIVE',
    description: 'Tradition réformée de Calvin'
  },
  {
    id: 'presbyterianism',
    name: 'Presbytérianisme',
    slug: 'presbyterianisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1560,
    foundedPlace: 'Écosse',
    followers: 50000000,
    color: '#E9967A',
    parentId: 'calvinism',
    status: 'ACTIVE',
    description: 'Église réformée presbytérienne'
  },
  {
    id: 'anglicanism',
    name: 'Anglicanisme',
    slug: 'anglicanisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1534,
    foundedPlace: 'Angleterre',
    followers: 85000000,
    color: '#F08080',
    parentId: 'protestantism',
    status: 'ACTIVE',
    description: 'Église d\'Angleterre'
  },
  {
    id: 'baptists',
    name: 'Baptistes',
    slug: 'baptistes',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1609,
    foundedPlace: 'Pays-Bas',
    followers: 100000000,
    color: '#CD5C5C',
    parentId: 'protestantism',
    status: 'ACTIVE',
    description: 'Églises baptistes'
  },
  {
    id: 'methodism',
    name: 'Méthodisme',
    slug: 'methodisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1739,
    foundedPlace: 'Angleterre',
    followers: 80000000,
    color: '#DC143C',
    parentId: 'protestantism',
    status: 'ACTIVE',
    description: 'Mouvement wesleyen'
  },
  {
    id: 'pentecostalism',
    name: 'Pentecôtisme',
    slug: 'pentecotisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1906,
    foundedPlace: 'USA',
    followers: 280000000,
    color: '#FF4500',
    parentId: 'protestantism',
    status: 'ACTIVE',
    description: 'Mouvement charismatique'
  },
  {
    id: 'assemblies-of-god',
    name: 'Assemblées de Dieu',
    slug: 'assemblees-de-dieu',
    category: 'MODERNE',
    family: 'abrahamique',
    foundedYear: 1914,
    foundedPlace: 'USA',
    followers: 69000000,
    color: '#FF6347',
    parentId: 'pentecostalism',
    status: 'ACTIVE',
    description: 'Plus grande dénomination pentecôtiste'
  },
  {
    id: 'adventism',
    name: 'Adventisme',
    slug: 'adventisme',
    category: 'MODERNE',
    family: 'abrahamique',
    foundedYear: 1863,
    foundedPlace: 'USA',
    followers: 22000000,
    color: '#B22222',
    parentId: 'protestantism',
    status: 'ACTIVE',
    description: 'Adventistes du 7e Jour'
  },

  // ISLAM
  {
    id: 'islam',
    name: 'Islam',
    slug: 'islam',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 622,
    foundedPlace: 'Arabie',
    followers: 1900000000,
    color: '#228B22',
    parentId: 'judaism',
    status: 'ACTIVE',
    description: 'Religion révélée à Muhammad'
  },

  // Sunnisme
  {
    id: 'sunnism',
    name: 'Sunnisme',
    slug: 'sunnisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 632,
    foundedPlace: 'Arabie',
    followers: 1600000000,
    color: '#2E8B57',
    parentId: 'islam',
    status: 'ACTIVE',
    description: 'Branche majoritaire (85-90%)'
  },
  {
    id: 'hanafi',
    name: 'Hanafisme',
    slug: 'hanafisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 767,
    foundedPlace: 'Irak',
    followers: 700000000,
    color: '#3CB371',
    parentId: 'sunnism',
    status: 'ACTIVE',
    description: 'École juridique hanafite'
  },
  {
    id: 'maliki',
    name: 'Malikisme',
    slug: 'malikisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 795,
    foundedPlace: 'Médine',
    followers: 300000000,
    color: '#66CDAA',
    parentId: 'sunnism',
    status: 'ACTIVE',
    description: 'École juridique malikite'
  },
  {
    id: 'shafii',
    name: 'Shafiisme',
    slug: 'shafiisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 820,
    foundedPlace: 'Égypte',
    followers: 400000000,
    color: '#90EE90',
    parentId: 'sunnism',
    status: 'ACTIVE',
    description: 'École juridique chafiite'
  },
  {
    id: 'hanbali',
    name: 'Hanbalisme',
    slug: 'hanbalisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 855,
    foundedPlace: 'Bagdad',
    followers: 40000000,
    color: '#20B2AA',
    parentId: 'sunnism',
    status: 'ACTIVE',
    description: 'École juridique hanbalite'
  },
  {
    id: 'wahhabism',
    name: 'Wahhabisme',
    slug: 'wahhabisme',
    category: 'MODERNE',
    family: 'abrahamique',
    foundedYear: 1744,
    foundedPlace: 'Arabie',
    followers: 4000000,
    color: '#008B8B',
    parentId: 'hanbali',
    status: 'ACTIVE',
    description: 'Mouvement salafiste rigoriste'
  },
  {
    id: 'salafism',
    name: 'Salafisme',
    slug: 'salafisme',
    category: 'MODERNE',
    family: 'abrahamique',
    foundedYear: 1900,
    foundedPlace: 'Égypte',
    followers: 50000000,
    color: '#006400',
    parentId: 'hanbali',
    status: 'ACTIVE',
    description: 'Mouvement fondamentaliste'
  },

  // Chiisme
  {
    id: 'shiism',
    name: 'Chiisme',
    slug: 'chiisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 632,
    foundedPlace: 'Arabie',
    followers: 250000000,
    color: '#006400',
    parentId: 'islam',
    status: 'ACTIVE',
    description: 'Branche minoritaire (10-15%)'
  },
  {
    id: 'twelver',
    name: 'Duodécimains',
    slug: 'duodecimains',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 874,
    foundedPlace: 'Irak',
    followers: 200000000,
    color: '#228B22',
    parentId: 'shiism',
    status: 'ACTIVE',
    description: 'Chiisme duodécimain (majorité)'
  },
  {
    id: 'ismaili',
    name: 'Ismaéliens',
    slug: 'ismaeliens',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 765,
    foundedPlace: 'Irak',
    followers: 20000000,
    color: '#32CD32',
    parentId: 'shiism',
    status: 'ACTIVE',
    description: 'Chiisme ismaélien'
  },
  {
    id: 'nizari',
    name: 'Nizari (Aga Khan)',
    slug: 'nizari',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1094,
    foundedPlace: 'Iran',
    followers: 15000000,
    color: '#00FF00',
    parentId: 'ismaili',
    status: 'ACTIVE',
    description: 'Ismaéliens nizarites'
  },
  {
    id: 'alawites',
    name: 'Alaouites',
    slug: 'alaouites',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 850,
    foundedPlace: 'Syrie',
    followers: 3000000,
    color: '#3CB371',
    parentId: 'shiism',
    status: 'ACTIVE',
    description: 'Branche ésotérique du chiisme'
  },
  {
    id: 'druze',
    name: 'Druzes',
    slug: 'druzes',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1017,
    foundedPlace: 'Liban',
    followers: 1000000,
    color: '#66CDAA',
    parentId: 'ismaili',
    status: 'ACTIVE',
    description: 'Religion ésotérique issue de l\'islam'
  },

  // Soufisme
  {
    id: 'sufism',
    name: 'Soufisme (Mystique)',
    slug: 'soufisme',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 800,
    foundedPlace: 'Basra',
    followers: 70000000,
    color: '#9370DB',
    parentId: 'islam',
    status: 'ACTIVE',
    description: 'Courant mystique de l\'islam'
  },
  {
    id: 'qadiriyya',
    name: 'Qadiriyya',
    slug: 'qadiriyya',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1166,
    foundedPlace: 'Bagdad',
    followers: 20000000,
    color: '#8A2BE2',
    parentId: 'sufism',
    status: 'ACTIVE',
    description: 'Ordre soufi qadiri'
  },
  {
    id: 'naqshbandi',
    name: 'Naqshbandiyya',
    slug: 'naqshbandiyya',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1389,
    foundedPlace: 'Boukhara',
    followers: 15000000,
    color: '#9932CC',
    parentId: 'sufism',
    status: 'ACTIVE',
    description: 'Ordre soufi naqshbandi'
  },
  {
    id: 'mevlevi',
    name: 'Mevlevi (Derviches tourneurs)',
    slug: 'mevlevi',
    category: 'ABRAHAMIQUE',
    family: 'abrahamique',
    foundedYear: 1273,
    foundedPlace: 'Turquie',
    followers: 1000000,
    color: '#BA55D3',
    parentId: 'sufism',
    status: 'ACTIVE',
    description: 'Ordre de Rumi'
  },

  // Bahaïsme
  {
    id: 'bahaism',
    name: 'Bahaïsme',
    slug: 'bahaisme',
    category: 'MODERNE',
    family: 'abrahamique',
    foundedYear: 1844,
    foundedPlace: 'Perse',
    followers: 8000000,
    color: '#9370DB',
    parentId: 'islam',
    status: 'ACTIVE',
    description: 'Religion abrahamique moderne'
  },

  // =============== TRADITIONS TAOÏQUES ===============

  {
    id: 'taoism',
    name: 'Taoïsme',
    slug: 'taoisme',
    category: 'TAOIC',
    family: 'taoique',
    foundedYear: -400,
    foundedPlace: 'Chine',
    followers: 12000000,
    color: '#32CD32',
    parentId: null,
    status: 'ACTIVE',
    description: 'Philosophie et religion chinoise'
  },
  {
    id: 'philosophical-taoism',
    name: 'Taoïsme Philosophique',
    slug: 'taoisme-philosophique',
    category: 'TAOIC',
    family: 'taoique',
    foundedYear: -400,
    foundedPlace: 'Chine',
    followers: 5000000,
    color: '#3CB371',
    parentId: 'taoism',
    status: 'ACTIVE',
    description: 'Taoïsme basé sur Laozi et Zhuangzi'
  },
  {
    id: 'religious-taoism',
    name: 'Taoïsme Religieux',
    slug: 'taoisme-religieux',
    category: 'TAOIC',
    family: 'taoique',
    foundedYear: 142,
    foundedPlace: 'Chine',
    followers: 7000000,
    color: '#2E8B57',
    parentId: 'taoism',
    status: 'ACTIVE',
    description: 'Taoïsme rituel et institutionnel'
  },

  {
    id: 'confucianism',
    name: 'Confucianisme',
    slug: 'confucianisme',
    category: 'TAOIC',
    family: 'taoique',
    foundedYear: -500,
    foundedPlace: 'Chine',
    followers: 6000000,
    color: '#228B22',
    parentId: null,
    status: 'ACTIVE',
    description: 'Enseignements de Confucius'
  },
  {
    id: 'neo-confucianism',
    name: 'Néo-Confucianisme',
    slug: 'neo-confucianisme',
    category: 'TAOIC',
    family: 'taoique',
    foundedYear: 1000,
    foundedPlace: 'Chine',
    followers: 3000000,
    color: '#006400',
    parentId: 'confucianism',
    status: 'ACTIVE',
    description: 'Renaissance confucéenne Song'
  },

  {
    id: 'shinto',
    name: 'Shintoïsme',
    slug: 'shintoisme',
    category: 'TAOIC',
    family: 'taoique',
    foundedYear: null,
    foundedPlace: 'Japon',
    followers: 4000000,
    color: '#FF69B4',
    parentId: null,
    status: 'ACTIVE',
    description: 'Religion traditionnelle japonaise'
  },
  {
    id: 'shrine-shinto',
    name: 'Shinto des Sanctuaires',
    slug: 'shinto-sanctuaires',
    category: 'TAOIC',
    family: 'taoique',
    foundedYear: null,
    foundedPlace: 'Japon',
    followers: 3000000,
    color: '#FF1493',
    parentId: 'shinto',
    status: 'ACTIVE',
    description: 'Shinto traditionnel des sanctuaires'
  },
  {
    id: 'tenrikyo',
    name: 'Tenrikyo',
    slug: 'tenrikyo',
    category: 'MODERNE',
    family: 'taoique',
    foundedYear: 1838,
    foundedPlace: 'Japon',
    followers: 1200000,
    color: '#FF6EB4',
    parentId: 'shinto',
    status: 'ACTIVE',
    description: 'Nouveau mouvement religieux shinto'
  },

  // =============== MOUVEMENTS MODERNES ===============

  {
    id: 'mormonism',
    name: 'Mormonisme',
    slug: 'mormonisme',
    category: 'MODERNE',
    family: null,
    foundedYear: 1830,
    foundedPlace: 'USA',
    followers: 17000000,
    color: '#DB2777',
    parentId: 'christianity',
    status: 'ACTIVE',
    description: 'Église LDS'
  },
  {
    id: 'lds-church',
    name: 'Église LDS',
    slug: 'eglise-lds',
    category: 'MODERNE',
    family: null,
    foundedYear: 1830,
    foundedPlace: 'USA',
    followers: 16800000,
    color: '#C71585',
    parentId: 'mormonism',
    status: 'ACTIVE',
    description: 'Église principale mormone'
  },

  {
    id: 'jehovahs-witnesses',
    name: 'Témoins de Jéhovah',
    slug: 'temoins-jehovah',
    category: 'MODERNE',
    family: null,
    foundedYear: 1870,
    foundedPlace: 'USA',
    followers: 8700000,
    color: '#4169E1',
    parentId: 'christianity',
    status: 'ACTIVE',
    description: 'Mouvement millénariste chrétien'
  },

  {
    id: 'rastafari',
    name: 'Rastafarisme',
    slug: 'rastafarisme',
    category: 'MODERNE',
    family: null,
    foundedYear: 1930,
    foundedPlace: 'Jamaïque',
    followers: 1000000,
    color: '#FFD700',
    parentId: null,
    status: 'ACTIVE',
    description: 'Mouvement afro-jamaïcain'
  },

  {
    id: 'wicca',
    name: 'Wicca (Néopaganisme)',
    slug: 'wicca',
    category: 'MODERNE',
    family: null,
    foundedYear: 1954,
    foundedPlace: 'Angleterre',
    followers: 1000000,
    color: '#9370DB',
    parentId: null,
    status: 'ACTIVE',
    description: 'Religion néopaïenne moderne'
  },

  {
    id: 'scientology',
    name: 'Scientologie',
    slug: 'scientologie',
    category: 'MODERNE',
    family: null,
    foundedYear: 1954,
    foundedPlace: 'USA',
    followers: 100000,
    color: '#FF4500',
    parentId: null,
    status: 'ACTIVE',
    description: 'Organisation controversée'
  },

  // =============== RELIGIONS AFRO-DIASPORIQUES ===============

  {
    id: 'vodou',
    name: 'Vaudou',
    slug: 'vaudou',
    category: 'SYNCHRETIQUE',
    family: 'afro-diasporique',
    foundedYear: 1500,
    foundedPlace: 'Haïti',
    followers: 5000000,
    color: '#8B008B',
    parentId: null,
    status: 'ACTIVE',
    description: 'Religion syncrétique haïtienne'
  },
  {
    id: 'haitian-vodou',
    name: 'Vaudou Haïtien',
    slug: 'vaudou-haitien',
    category: 'SYNCHRETIQUE',
    family: 'afro-diasporique',
    foundedYear: 1500,
    foundedPlace: 'Haïti',
    followers: 4000000,
    color: '#9932CC',
    parentId: 'vodou',
    status: 'ACTIVE',
    description: 'Vaudou traditionnel d\'Haïti'
  },

  {
    id: 'santeria',
    name: 'Santeria',
    slug: 'santeria',
    category: 'SYNCHRETIQUE',
    family: 'afro-diasporique',
    foundedYear: 1800,
    foundedPlace: 'Cuba',
    followers: 5000000,
    color: '#FF6347',
    parentId: null,
    status: 'ACTIVE',
    description: 'Religion yoruba-catholique cubaine'
  },

  {
    id: 'candomble',
    name: 'Candomblé',
    slug: 'candomble',
    category: 'SYNCHRETIQUE',
    family: 'afro-diasporique',
    foundedYear: 1800,
    foundedPlace: 'Brésil',
    followers: 2000000,
    color: '#FF8C00',
    parentId: null,
    status: 'ACTIVE',
    description: 'Religion afro-brésilienne'
  },
];

// Fonctions utilitaires
export function getChildren(parentId: string): MockReligion[] {
  return mockReligions.filter(r => r.parentId === parentId);
}

export function getAllDescendants(religionId: string): MockReligion[] {
  const children = getChildren(religionId);
  const descendants = [...children];
  
  children.forEach(child => {
    descendants.push(...getAllDescendants(child.id));
  });
  
  return descendants;
}

export function getRootReligions(): MockReligion[] {
  return mockReligions.filter(r => r.parentId === null);
}

export const mockStats = {
  religions: mockReligions.length,
  influences: mockReligions.filter(r => r.parentId !== null).length,
  sources: 5,
};
