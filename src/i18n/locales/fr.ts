export const fr = {
  common: {
    backToMenu: '← Retour au menu',
    connectingHearts: 'Connecting hearts together',
    portfolio: 'Portfolio Kingdom Hearts',
  },
  landing: {
    pressStart: 'Press Start',
    beginHint: 'Appuyez sur une touche pour commencer',
  },
  menu: {
    home: 'Accueil',
    projects: 'Projets',
    skills: 'Compétences',
    about: 'À propos',
    contact: 'Contact',
  },
  home: {
    cta: 'Appuyez sur une touche',
  },
  projects: {
    subtitle: (n: number) => `Dépôts publics · ${n}`,
    loadingUser: 'Chargement des dépôts…',
    title: 'Projets',
    intro:
      'Projets publics récents provenant de ',
    introSuffix: '. Les forks sont masqués.',
    followers: (n: number) => `Abonnés ${n}`,
    following: (n: number) => `Abonnements ${n}`,
    loading: 'Chargement des dépôts depuis GitHub…',
    error: 'Impossible de charger les dépôts',
    empty: "Aucun dépôt public (hors forks) pour l'instant.",
    pushed: (t: string) => `Poussé il y a ${t}`,
    archived: 'Archivé',
    homepage: 'Page d’accueil',
  },
  skills: {
    subtitle: (n: number) => `Matrice de compétences · ${n} compétences`,
    title: 'Compétences',
    intro:
      'Matrice de compétences par paliers — classée S (Maîtrise) → C (Connaissances). La distribution des langages provient des dépôts GitHub publics.',
    tierLegend: {
      SMaster: 'Maîtrise / Expert',
      SDesc: 'Production-ready sur plusieurs projets.',
      tierS: 'Palier S — MAÎTRE',
      tierA: 'Palier A — EXPERT',
      tierB: 'Palier B — COMPÉTENT',
      tierC: 'Palier C — CONNAISSANCES',
    },
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile & Desktop',
      ops: 'DevOps & Cloud',
      ai: 'IA & Sécurité',
      tools: 'Outils & Méthodes',
    },
    count: (n: number) => `${n} compétences`,
  },
  about: {
    subtitle: 'À propos · Parcours & Profil',
    title: 'À propos',
    intro:
      'Je suis ',
    role: 'Software Engineer spécialisé dans la conception de systèmes distribués, les architectures backend et l’IA.',
    stats: (r: string | number, f: string | number, fl: string | number) =>
      `${r} dépôts · ${f} abonnés · ${fl} abonnements`,
    interests: [
      'Systèmes distribués',
      'Applications temps réel',
      'Scalabilité',
      'AI Engineering',
      'Systèmes connectés',
      'Robotique · IoT · LoRa',
      'Entrepreneuriat tech',
      'Import-export hardware',
      'Automatisation & CI/CD',
      'Fine-tuning LLM',
      'Création de produits technologiques',
    ],
    sections: {
      parcours: 'Parcours',
      engEntrepreneurship: 'Engineering & Entrepreneuriat',
      roboticsSystems: 'Robotique & Systèmes',
      buildArchitectAutomate: 'Build. Architect. Automate.',
    },
    timeline: [
      {
        year: 'International',
        title: 'Saint Martin-Saint Denis Val de Loire International School',
        body: 'Environnement scolaire international, ouverture multiculturelle et méthodologies anglophones.',
      },
      {
        year: 'Armée de Terre',
        title: 'Soldat d’infanterie de marine',
        body: 'Formation militaire française : discipline, travail d’équipe, gestion de la pression et environnement opérationnel structuré.',
      },
      {
        year: 'Reconversion',
        title: 'La Passerelle — Formation Web',
        body: 'Premiers pas en développement web : intégration, HTML/CSS/JS, bases du stack front.',
      },
      {
        year: 'CS50 · Harvard',
        title: 'Fondamentaux en informatique',
        body: 'Algorithmes, structures de données, mémoire, paradigmes. Consolidation théorique et algorithmique.',
      },
      {
        year: 'Le Réacteur',
        title: 'Développement web moderne',
        body: 'Apprentissage intensif React, Node.js, workflows agiles, projets full stack aboutis.',
      },
      {
        year: 'Le Wagon · Paris',
        title: 'Web & Mobile — Projets logiciels',
        body: 'Approfondissement Ruby on Rails, JavaScript, apps cross-platform. Basculer vers des problématiques d’architecture. Titre professionnel Concepteur·rice développeur·se d’applications — RNCP 37625 (Web & Mobile). Niveau 6 CEC (Bac+3/4), certificateur France Compétences / Ministère du Travail.',
      },
      {
        year: 'EPITECH · Paris',
        title: 'MSc Architecte SI · IA / Systèmes distribués',
        body: 'Architectures de données, systèmes distribués, AI Engineering. Fine-tuning de LLM en Python, systèmes complexes.',
      },
      {
        year: 'DALM AGENCY',
        title: 'Auto-entreprise · Services IT',
        body: 'Lancement d’une première activité autour du développement et des services informatiques. Direction produit, infra, opérations, aspects économiques.',
      },
      {
        year: 'FDJ UNITED',
        title: 'QA Engineering · International',
        body: 'Qualité logiciel & terminaux à l’international : tests fonctionnels/exploratoires/non-régression. Automatisation API + E2E (Playwright, Selenium, Shell, GitLab CI).',
      },
      {
        year: 'New Venture',
        title: 'Services IT · Import-export hardware Shenzhen / FR',
        body: 'Second projet entrepreneurial : services informatiques + import-export matériel hardware Shenzhen / France.',
      },
      {
        year: 'Evolutek',
        title: 'Club robotique français',
        body: 'Croisement logiciel + hardware : robotique, IoT, capteurs, communications LoRa, drones autonomes.',
      },
      {
        year: 'DALM AGENCY',
        title: 'Software Engineer · Solutions sur mesure',
        body: 'Apps web & mobile, GraphQL, gRPC, microservices, temps réel, systèmes distribués et backends conçus pour la charge.',
      },
    ],
    bio: [
      {
        heading: null,
        paragraphs: [
          'Mon parcours est assez atypique et s’est construit progressivement, à travers des expériences dans des environnements très différents.',
          null,
        ],
      },
    ],
    bioParagraphs: [
      {
        content:
          'J’ai d’abord étudié à Saint Martin-Saint Denis Val de Loire International School, dans un environnement international. J’ai ensuite suivi une formation militaire au sein de l’Armée de Terre française, en tant que soldat d’infanterie de marine, avant de réorienter mon parcours vers l’informatique.',
      },
      {
        content:
          'Ma reconversion dans la tech a commencé avec une formation en développement web à La Passerelle Paris, suivie de Le Réacteur et du CS50 de Harvard, afin de consolider mes fondamentaux en informatique et en programmation.',
      },
      {
        content:
          'J’ai ensuite intégré Le Wagon Paris, où j’ai approfondi mes compétences en développement web et mobile et travaillé sur différents projets logiciels. Cette expérience m’a progressivement orienté vers des problématiques plus complexes de conception et d’architecture.',
      },
      {
        content:
          'J’ai poursuivi cette évolution avec un Master of Science Architecte des Systèmes d’Information à EPITECH Paris, avec une spécialisation en intelligence artificielle, systèmes distribués et architectures de données. Je travaille notamment sur l’adaptation et le fine-tuning de LLM en Python, ainsi que sur la conception de systèmes complexes.',
      },
    ],
    engEntrepreneurship: [
      {
        content:
          'Avant de rejoindre FDJ UNITED, j’ai lancé ma propre auto-entreprise, initialement autour de mes activités de développement et de services informatiques. Je continue aujourd’hui à développer cette activité en parallèle de mon parcours professionnel.',
      },
      {
        content:
          "Chez FDJ UNITED, j’ai travaillé en QA Engineering sur des logiciels et des terminaux utilisés dans un contexte international. Mon travail couvre notamment les tests fonctionnels, exploratoires et de non-régression, ainsi que l’automatisation des tests API et E2E avec Playwright, Selenium, Shell et GitLab CI.",
      },
      {
        content:
          "En parallèle, je développe également un second projet entrepreneurial, avec pour objectif de créer une entreprise spécialisée dans le développement de services informatiques ainsi que dans l’import-export de matériel hardware entre Shenzhen et la France.",
      },
      {
        content:
          'Cette dimension entrepreneuriale complète mon profil d’ingénieur : elle m’amène à ne pas seulement réfléchir à la conception technique d’un produit, mais également à son développement, son infrastructure, ses contraintes opérationnelles et son environnement économique.',
      },
    ],
    roboticsSystems: [
      {
        content:
          "En parallèle de mon parcours académique et professionnel, je fais partie d’Evolutek, un club français de robotique. J’y explore des problématiques à la croisée du logiciel et du hardware, notamment autour de la robotique, de l’IoT, des communications LoRa et des drones.",
      },
      {
        content:
          'En tant que Software Engineer / Freelance, j’ai également conçu et développé différentes solutions web et mobiles, notamment autour de GraphQL, gRPC, architectures microservices, systèmes temps réel et applications distribuées.',
      },
    ],
    bioFooter: [
      "Aujourd’hui, mon profil se situe à l’intersection du Software Engineering, de l’architecture système, de l’IA, de la robotique et de l’entrepreneuriat.",
      'J’aime comprendre un problème dans sa globalité, concevoir une architecture adaptée, puis aller jusqu’à son implémentation et sa validation.',
      'Je m’intéresse particulièrement aux systèmes distribués, aux applications temps réel, à la scalabilité, à l’AI Engineering, aux systèmes connectés et à la création de produits technologiques.',
    ],
    philosophy: {
      title: 'Philosophie',
      body:
        'Comprendre globalement → concevoir l’architecture → implémenter → valider. Priorité à la robustesse, la scalabilité et la clarté du design systémique.',
      tags: ['Robustesse', 'Clarté', 'Performance', 'Automatisation'],
    },
  },
  contact: {
    subtitle: (n: number) => `Me contacter · ${n} canaux`,
    title: 'Contact',
    intro:
      'Choisissez un canal — les cartes s’ouvrent directement quand c’est possible. L’ID WeChat se copie dans le presse-papiers au clic.',
    userTitle: 'Dimitri Almon · DALM1',
    userRole: 'Full Stack Engineer — Malware Analysis — AI Specialization',
    statWhatsapp: 'WhatsApp · FR',
    statWechat: 'WeChat · DALM101',
    viewProfile: 'Voir le profil',
    message: 'Message',
    copyId: 'Copier l’ID',
    copied: 'Copié',
    kindClipboard: 'Presse-papiers',
    kindWhatsapp: 'WhatsApp',
    kindExternal: 'Externe',
  },
} as const

export type FrTranslations = typeof fr
