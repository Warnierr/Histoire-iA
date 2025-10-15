import { PrismaClient } from '@prisma/client';
import sourcesData from '../src/data/seed/sources.json';
import religionsData from '../src/data/seed/religions.json';
import influencesData from '../src/data/seed/influences.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // ============================================
  // 1. SOURCES
  // ============================================
  console.log('📚 Creating sources...');
  
  for (const source of sourcesData) {
    await prisma.source.upsert({
      where: { id: source.id },
      update: {},
      create: {
        id: source.id,
        title: source.title,
        type: source.type as any,
        url: source.url || null,
        isbn: source.isbn || null,
        doi: source.doi || null,
        authors: source.authors || [],
        publisher: source.publisher || null,
        publishedYear: source.publishedYear || null,
        reliability: source.reliability,
        peerReviewed: source.peerReviewed || false,
        license: source.license || null,
      },
    });
  }
  
  console.log(`✅ Created ${sourcesData.length} sources\n`);

  // ============================================
  // 2. RELIGIONS
  // ============================================
  console.log('🕉️  Creating religions...');

  // Première passe : créer toutes les religions sans parent
  for (const religion of religionsData) {
    await prisma.religion.upsert({
      where: { id: religion.id },
      update: {},
      create: {
        id: religion.id,
        name: religion.name,
        slug: religion.slug,
        shortName: religion.shortName || null,
        autonym: religion.autonym || null,
        foundedYear: religion.foundedYear || null,
        foundedYearEnd: null,
        foundedCentury: null,
        foundedPlace: religion.foundedPlace || null,
        foundedPlaceId: null,
        followers: religion.followers ? BigInt(religion.followers) : null,
        followersYear: religion.followersYear || null,
        category: religion.category as any,
        family: religion.family || null,
        status: (religion.status as any) || 'ACTIVE',
        iconUrl: null,
        color: religion.color,
        wikidataId: religion.wikidataId || null,
        parentId: null, // On l'ajoute après
      },
    });
  }

  // Deuxième passe : mettre à jour les relations parent-enfant
  for (const religion of religionsData) {
    if (religion.parentId) {
      await prisma.religion.update({
        where: { id: religion.id },
        data: {
          parentId: religion.parentId,
        },
      });
    }
  }

  console.log(`✅ Created ${religionsData.length} religions\n`);

  // ============================================
  // 3. TEXT CHUNKS (exemples pour RAG)
  // ============================================
  console.log('📝 Creating text chunks for RAG...');

  const exampleChunks = [
    {
      religionId: 'rel-christianisme',
      content:
        "Le christianisme est une religion abrahamique fondée sur l'enseignement, la personne et la vie de Jésus de Nazareth. Les chrétiens croient que Jésus est le Messie (Christ) et le Fils de Dieu, mort et ressuscité pour le salut de l'humanité. La Bible chrétienne comprend l'Ancien Testament (hérité du judaïsme) et le Nouveau Testament.",
      section: 'OVERVIEW',
      order: 1,
      sourceId: 'source-1',
    },
    {
      religionId: 'rel-christianisme',
      content:
        "Le christianisme naît en Judée au Ier siècle de notre ère, dans le contexte du judaïsme du Second Temple. Jésus de Nazareth prêche vers l'an 30, avant d'être crucifié par les autorités romaines. Ses disciples proclament sa résurrection et fondent les premières communautés chrétiennes. Le christianisme se répand rapidement dans l'Empire romain malgré les persécutions.",
      section: 'HISTORY',
      order: 1,
      sourceId: 'source-3',
    },
    {
      religionId: 'rel-islam',
      content:
        "L'islam est une religion abrahamique apparue au VIIe siècle en Arabie. Fondé sur la révélation reçue par le prophète Mahomet, l'islam repose sur le Coran, considéré comme la parole de Dieu (Allah). Les musulmans pratiquent les Cinq Piliers : profession de foi (chahada), prière (salat), aumône (zakat), jeûne du ramadan (sawm), et pèlerinage à La Mecque (hajj).",
      section: 'OVERVIEW',
      order: 1,
      sourceId: 'source-1',
    },
    {
      religionId: 'rel-islam',
      content:
        "Mahomet reçoit la révélation coranique vers 610 à La Mecque. Face à l'opposition des Mecquois, il émigre à Médine en 622 (l'Hégire, année zéro du calendrier musulman). Il unifie les tribus arabes et établit le premier État islamique. Après sa mort en 632, l'islam se répand rapidement au Moyen-Orient, en Afrique du Nord et en Asie.",
      section: 'HISTORY',
      order: 1,
      sourceId: 'source-2',
    },
    {
      religionId: 'rel-bouddhisme',
      content:
        "Le bouddhisme est une religion et philosophie fondée sur les enseignements de Siddhartha Gautama, le Bouddha ('l'Éveillé'). Le bouddhisme enseigne les Quatre Nobles Vérités : la souffrance existe, elle a une cause (le désir), elle peut cesser, et il existe un chemin (l'Octuple Sentier) pour y parvenir. Le but ultime est l'Éveil (nirvana).",
      section: 'OVERVIEW',
      order: 1,
      sourceId: 'source-4',
    },
    {
      religionId: 'rel-bouddhisme',
      content:
        "Le bouddhisme naît au VIe siècle avant notre ère en Inde. Siddhartha Gautama, prince du clan Shakya, renonce au luxe pour chercher la vérité. Après des années d'ascèse, il atteint l'Éveil sous l'arbre de la Bodhi. Il prêche ensuite pendant 45 ans et fonde la Sangha (communauté monastique). Le bouddhisme se répand en Asie via les routes commerciales.",
      section: 'HISTORY',
      order: 1,
      sourceId: 'source-4',
    },
    {
      religionId: 'rel-hindouisme',
      content:
        "L'hindouisme est l'une des plus anciennes religions du monde, sans fondateur unique. Il repose sur les Védas (textes sacrés anciens) et les concepts de dharma (devoir), karma (action et conséquence), samsara (cycle de réincarnation) et moksha (libération). L'hindouisme est polythéiste avec une trinité principale : Brahmā (créateur), Vishnou (conservateur), Shiva (destructeur).",
      section: 'OVERVIEW',
      order: 1,
      sourceId: 'source-4',
    },
    {
      religionId: 'rel-judaisme',
      content:
        "Le judaïsme est la religion du peuple juif, fondée sur l'Alliance entre Dieu et Abraham. Les juifs croient en un Dieu unique et transcendant. La Torah (Pentateuque) contient la Loi révélée à Moïse sur le mont Sinaï. Le judaïsme met l'accent sur l'étude, les commandements (mitzvot) et l'attente du Messie.",
      section: 'OVERVIEW',
      order: 1,
      sourceId: 'source-1',
    },
  ];

  for (const chunk of exampleChunks) {
    await prisma.textChunk.create({
      data: {
        ...chunk,
        language: 'fr',
        wordCount: chunk.content.split(' ').length,
      },
    });
  }

  console.log(`✅ Created ${exampleChunks.length} text chunks\n`);

  // ============================================
  // 4. INFLUENCES
  // ============================================
  console.log('🔗 Creating influences...');

  for (const influence of influencesData) {
    await prisma.influence.create({
      data: {
        fromId: influence.fromId,
        toId: influence.toId,
        type: influence.type as any,
        strength: influence.strength,
        bidirectional: influence.bidirectional || false,
        periodStart: influence.periodStart || null,
        periodEnd: influence.periodEnd || null,
        description: influence.description || null,
        sourceId: influence.sourceId || null,
      },
    });
  }

  console.log(`✅ Created ${influencesData.length} influences\n`);

  // ============================================
  // 5. STATISTIQUES
  // ============================================
  console.log('📊 Database statistics:');
  const stats = {
    sources: await prisma.source.count(),
    religions: await prisma.religion.count(),
    chunks: await prisma.textChunk.count(),
    influences: await prisma.influence.count(),
  };

  console.log(`   - Sources: ${stats.sources}`);
  console.log(`   - Religions: ${stats.religions}`);
  console.log(`   - Text Chunks: ${stats.chunks}`);
  console.log(`   - Influences: ${stats.influences}\n`);

  console.log('✅ Seed completed successfully! 🎉');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

