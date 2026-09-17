import type { TranslationsShape } from '../index'

export const en: TranslationsShape = {
  common: {
    backToMenu: '← Back to menu',
    connectingHearts: 'Connecting hearts together',
    portfolio: 'Kingdom Hearts Portfolio',
  },
  landing: {
    pressStart: 'Press Start',
    beginHint: 'Click anywhere or press Enter to begin',
  },
  menu: {
    home: 'Home',
    projects: 'Projects',
    skills: 'Skills',
    about: 'About',
    contact: 'Contact',
  },
  home: {
    cta: 'Click anywhere · press any key',
  },
  projects: {
    subtitle: (n) => `Public Repositories · ${n}`,
    loadingUser: 'Loading repositories…',
    title: 'Projects',
    intro: 'Recent public projects from ',
    introSuffix: '. Forks are hidden.',
    followers: (n) => `Followers ${n}`,
    following: (n) => `Following ${n}`,
    loading: 'Loading repositories from GitHub…',
    error: 'Could not load repositories',
    empty: 'No public non-fork repositories yet.',
    pushed: (t) => `Pushed ${t} ago`,
    archived: 'Archived',
    homepage: 'Homepage ↗',
  },
  skills: {
    subtitle: (n) => `Skill Matrix · ${n} skills`,
    title: 'Skills',
    intro:
      'Tiered competency matrix — ranked S (Master) → C (Familiar). Public repo language distribution is factored in from GitHub.',
    tierLegend: {
      SMaster: 'Master / Expert',
      SDesc: 'Production ready across multiple projects.',
      tierS: 'Tier S — MASTER',
      tierA: 'Tier A — EXPERT',
      tierB: 'Tier B — PROFICIENT',
      tierC: 'Tier C — FAMILIAR',
    },
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile & Desktop',
      ops: 'DevOps & Cloud',
      ai: 'AI & Security',
      tools: 'Tools & Methods',
    },
    count: (n) => `${n} skills`,
  },
  about: {
    subtitle: 'About · Profile & Journey',
    title: 'About',
    intro: 'I am ',
    role: 'a Software Engineer specialized in distributed systems, backend architectures and AI.',
    stats: (r, f, fl) => `${r} repos · ${f} followers · ${fl} following`,
    interests: [
      'Distributed systems',
      'Real-time applications',
      'Scalability',
      'AI Engineering',
      'Connected systems',
      'Robotics · IoT · LoRa',
      'Tech entrepreneurship',
      'Hardware import-export',
      'Automation & CI/CD',
      'LLM fine-tuning',
      'Building tech products',
    ],
    sections: {
      parcours: 'Journey',
      engEntrepreneurship: 'Engineering & Entrepreneurship',
      roboticsSystems: 'Robotics & Systems',
      buildArchitectAutomate: 'Build. Architect. Automate.',
    },
    timeline: [
      {
        year: 'International',
        title: 'Saint Martin-Saint Denis Val de Loire International School',
        body: 'International school environment, multicultural exposure and English-language methodologies.',
      },
      {
        year: 'French Army',
        title: 'Marine Infantry Soldier',
        body: 'French military training : discipline, teamwork, pressure management and structured operational environment.',
      },
      {
        year: 'Career shift',
        title: 'La Passerelle — Web Bootcamp',
        body: 'First steps in web development : integration, HTML/CSS/JS, front stack fundamentals.',
      },
      {
        year: 'CS50 · Harvard',
        title: 'Computer Science fundamentals',
        body: 'Algorithms, data structures, memory, paradigms. Theoretical and algorithmic consolidation.',
      },
      {
        year: 'Le Réacteur',
        title: 'Modern web development',
        body: 'Intensive React, Node.js, agile workflows, full-stack projects.',
      },
      {
        year: 'Le Wagon · Paris',
        title: 'Web & Mobile — Software projects',
        body: 'Deep-dive into Ruby on Rails, JavaScript, cross-platform apps. Moved toward architecture concerns.',
      },
      {
        year: 'EPITECH · Paris',
        title: 'MSc IS Architect · AI / Distributed systems',
        body: 'Data architectures, distributed systems, AI Engineering. LLM fine-tuning in Python, complex systems.',
      },
      {
        year: 'DALM AGENCY',
        title: 'Self-employed · IT services',
        body: 'First venture around development and IT services. Product direction, infra, ops, economics.',
      },
      {
        year: 'FDJ UNITED',
        title: 'QA Engineering · International',
        body: 'Software quality & terminals at scale : functional/exploratory/regression testing. API + E2E automation (Playwright, Selenium, Shell, GitLab CI).',
      },
      {
        year: 'New Venture',
        title: 'IT services · Hardware import-export Shenzhen ↔ FR',
        body: 'Second entrepreneurial project : IT services + hardware import-export Shenzhen / France.',
      },
      {
        year: 'Evolutek',
        title: 'French robotics club',
        body: 'Software + hardware crossover : robotics, IoT, sensors, LoRa comms, autonomous drones.',
      },
      {
        year: 'DALM AGENCY',
        title: 'Software Engineer · Custom solutions',
        body: 'Web & mobile apps, GraphQL, gRPC, microservices, real-time, distributed systems and backends designed for load.',
      },
    ],
    bio: [{ heading: null, paragraphs: ['', null] }],
    bioParagraphs: [
      {
        content:
          'I first studied at Saint Martin-Saint Denis Val de Loire International School, in an international environment. I then completed a military training in the French Army, as a marine infantry soldier, before switching my career toward computer science.',
      },
      {
        content:
          'My transition into tech started with a web development bootcamp at La Passerelle, followed by Le Réacteur and Harvard CS50, to solidify my computer science and programming fundamentals.',
      },
      {
        content:
          'I then joined Le Wagon Paris, where I deepened my web and mobile development skills and worked on various software projects. This experience progressively pushed me toward more complex design and architecture problems.',
      },
      {
        content:
          'I continued this path with an MSc in Information Systems Architecture at EPITECH Paris, specializing in artificial intelligence, distributed systems and data architectures. I work specifically on LLM adaptation and fine-tuning in Python, as well as on designing complex systems.',
      },
    ],
    engEntrepreneurship: [
      {
        content:
          'Before joining FDJ UNITED, I launched my own self-employed business, initially around my development and IT service activities. I still keep developing this venture alongside my professional career today.',
      },
      {
        content:
          'At FDJ UNITED, I worked in QA Engineering on software and terminals deployed internationally. My work covers functional, exploratory and regression testing, as well as API and E2E test automation with Playwright, Selenium, Shell and GitLab CI.',
      },
      {
        content:
          'In parallel, I am also building a second entrepreneurial project, with the goal of creating a company specialized in IT service development as well as hardware import-export between Shenzhen and France.',
      },
      {
        content:
          'This entrepreneurial dimension completes my engineer profile : it forces me to think not only about the technical design of a product, but also its go-to-market, its infrastructure, operational constraints and economic environment.',
      },
    ],
    roboticsSystems: [
      {
        content:
          'Alongside my academic and professional path, I am part of Evolutek, a French robotics club. I explore problems at the crossroads of software and hardware, especially around robotics, IoT, LoRa communications and drones.',
      },
      {
        content:
          'As a Software Engineer / Freelance, I also designed and shipped various web and mobile solutions, especially around GraphQL, gRPC, microservice architectures, real-time systems and distributed applications.',
      },
    ],
    bioFooter: [
      'Today, my profile sits at the intersection of Software Engineering, system architecture, AI, robotics and entrepreneurship.',
      'I like to understand a problem holistically, design a suitable architecture, then follow through to implementation and validation.',
      'I am particularly interested in distributed systems, real-time applications, scalability, AI Engineering, connected systems and building tech products.',
    ],
    philosophy: {
      title: 'Philosophy',
      body:
        'Understand globally → design architecture → implement → validate. Priority on robustness, scalability and clean systemic design.',
      tags: ['Robustness', 'Clarity', 'Performance', 'Automation'],
    },
  },
  contact: {
    subtitle: (n) => `Reach Out · ${n} channels`,
    title: 'Contact',
    intro:
      'Pick a channel — cards open directly when possible. WeChat ID copies to clipboard on click.',
    userTitle: 'Dimitri Almon · DALM1',
    userRole: 'Full Stack Engineer — Malware Analysis — AI Specialization',
    statWhatsapp: 'WhatsApp · FR',
    statWechat: 'WeChat · DALM101',
    viewProfile: 'View profile ↗',
    message: 'Message ↗',
    copyId: 'Copy ID',
    copied: '✓ Copied!',
    kindClipboard: 'Clipboard',
    kindWhatsapp: 'WhatsApp',
    kindExternal: 'External',
  },
} as const
