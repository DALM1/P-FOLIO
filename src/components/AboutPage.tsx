import { useCallback, useEffect, useRef, useState } from 'react'
import KeybladeCanvas from './KeybladeCanvas'
import { useBackOnLeftArrow } from '../hooks/useBackOnLeftArrow'
import { useGitHub } from '../hooks/useGitHub'
import { playMenuOpen } from '../utils/audio'

interface AboutPageProps {
  onBack?: () => void
}

const TIMELINE = [
  {
    year: 'International',
    title: 'Saint Martin-Saint Denis Val de Loire International School',
    body: 'Environnement scolaire international, ouverture multiculturelle et méthodologies anglophones.',
    accent: '#60a5fa',
  },
  {
    year: 'Armée de Terre',
    title: 'Soldat d’infanterie de marine',
    body: 'Formation militaire française : discipline, travail d’équipe, gestion de la pression et environnement opérationnel structuré.',
    accent: '#ef4444',
  },
  {
    year: 'Reconversion',
    title: 'La Passerelle — Formation Web',
    body: 'Premiers pas en développement web : intégration, HTML/CSS/JS, bases du stack front.',
    accent: '#34d399',
  },
  {
    year: 'CS50 · Harvard',
    title: 'Fondamentaux en informatique',
    body: 'Algorithmes, structures de données, mémoire, paradigmes. Consolidation théorique et algorithmique.',
    accent: '#a78bfa',
  },
  {
    year: 'Le Réacteur',
    title: 'Développement web moderne',
    body: 'Apprentissage intensif React, Node.js, workflows agiles, projets full stack aboutis.',
    accent: '#22d3ee',
  },
  {
    year: 'Le Wagon · Paris',
    title: 'Web & Mobile — Projets logiciels',
    body: 'Approfondissement Ruby on Rails, JavaScript, apps cross-platform. Basculer vers des problématiques d’architecture.',
    accent: '#f97316',
  },
  {
    year: 'EPITECH · Paris',
    title: 'MSc Architecte SI · IA / Systèmes distribués',
    body: 'Architectures de données, systèmes distribués, AI Engineering. Fine-tuning de LLM en Python, systèmes complexes.',
    accent: '#f0c77a',
  },
  {
    year: 'DALM AGENCY',
    title: 'Auto-entreprise · Services IT',
    body: 'Lancement d’une première activité autour du développement et des services informatiques. Direction produit, infra, opérations, aspects économiques.',
    accent: '#f472b6',
  },
  {
    year: 'FDJ UNITED',
    title: 'QA Engineering · International',
    body: 'Qualité logiciel & terminaux à l’international : tests fonctionnels/exploratoires/non-régression. Automatisation API + E2E (Playwright, Selenium, Shell, GitLab CI).',
    accent: '#fb7185',
  },
  {
    year: 'New Venture',
    title: 'Services IT · Import-export hardware Shenzhen ↔ FR',
    body: 'Second projet entrepreneurial : services informatiques + import-export matériel hardware Shenzhen / France.',
    accent: '#c084fc',
  },
  {
    year: 'Evolutek',
    title: 'Club robotique français',
    body: 'Croisement logiciel + hardware : robotique, IoT, capteurs, communications LoRa, drones autonomes.',
    accent: '#f59e0b',
  },
  {
    year: 'DALM AGENCY',
    title: 'Software Engineer · Solutions sur mesure',
    body: 'Apps web & mobile, GraphQL, gRPC, microservices, temps réel, systèmes distribués et backends conçus pour la charge.',
    accent: '#2dd4bf',
  },
] as const

const KEY_INTERESTS = [
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
] as const

export default function AboutPage({ onBack }: AboutPageProps) {
  const [travelling, setTravelling] = useState(true)
  const firedRef = useRef(false)
  const { user } = useGitHub()

  const handleBack = useCallback(() => {
    onBack?.()
  }, [onBack])

  useBackOnLeftArrow(onBack)

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true
    playMenuOpen()
    const t = window.setTimeout(() => setTravelling(false), 520)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 md:py-14">
      {onBack && (
        <button
          type="button"
          onClick={handleBack}
          className="pointer-events-auto absolute right-6 top-10 z-30 font-khmenu text-xs uppercase tracking-[0.3em] text-primary/90 transition-opacity hover:text-primary md:right-8 md:top-14"
        >
          ← Back to menu
        </button>
      )}

      <header className="relative grid grid-cols-1 items-start gap-6 md:grid-cols-[auto_1fr] md:gap-8">
        <div className="flex flex-col items-center gap-4 md:items-start kh-fade-in">
          <div
            className="relative overflow-hidden rounded-md border-2 backdrop-blur-sm"
            style={{
              borderColor: '#f0c77a',
              boxShadow: '0 0 24px rgba(240,199,122,0.35)',
              width: 180,
              height: 180,
            }}
          >
            <img
              src="/assets-kh/pdp-portfolio.jpeg"
              alt="Dimitri Almon portrait"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  'linear-gradient(160deg, rgba(240,199,122,0.18) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)',
              }}
              aria-hidden="true"
            />
          </div>

          <div className="relative -mt-2 kh-travel" style={{ width: 180, height: 180 }}>
            <KeybladeCanvas
              className="h-full w-full"
              pose={{
                travel: travelling,
                fov: travelling ? 52 : 40,
                position: travelling ? [0.6, -0.4, 4.2] : [0, 0, 5.2],
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 md:gap-5 kh-fade-in">
          <div className="flex flex-col items-start gap-2">
            <span className="font-khmenu text-[11px] uppercase tracking-[0.35em] text-primary/85">
              About · Profile & Journey
            </span>
            <h1 className="kh-title text-4xl md:text-5xl">About</h1>
            <p className="max-w-[68ch] text-base leading-relaxed text-foreground/90 md:text-[16px]">
              Je suis <span className="font-bold text-primary">Dimitri Almon (玄一Xuán Yī)</span>, Software Engineer spécialisé
              dans la conception de <span className="text-white">systèmes distribués</span>, les{' '}
              <span className="text-white">architectures backend</span> et l’
              <span className="text-white">IA</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {user?.avatar_url && (
              <img
                src={user.avatar_url}
                alt={`${user.login} GitHub avatar`}
                className="h-10 w-10 rounded-full border-2"
                style={{ borderColor: '#f0c77a', boxShadow: '0 0 12px rgba(240,199,122,0.45)' }}
              />
            )}
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-khmenu text-sm font-bold uppercase tracking-[0.22em] text-primary">
                {user?.name ?? 'Dimitri Almon'} · {user?.login ?? 'DALM1'}
              </span>
              <span className="text-[13px] text-foreground/80">
                {user?.public_repos ?? '—'} repos · {user?.followers ?? '—'} followers ·{' '}
                {user?.following ?? '—'} following
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {KEY_INTERESTS.map((t) => (
              <span key={t} className="kh-hud-tag" style={{ opacity: 0.92 }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] pt-2">
        <article className="kh-hud-card kh-fade-in flex flex-col gap-4">
          <header className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-sm border font-khmenu text-primary"
              style={{
                borderColor: 'rgba(240,199,122,0.7)',
                background: 'rgba(240,199,122,0.1)',
                boxShadow: '0 0 10px rgba(240,199,122,0.25)',
              }}
              aria-hidden="true"
            >
              ✦
            </span>
            <h2 className="font-khmenu text-lg font-bold uppercase tracking-[0.24em] text-white">
              Parcours
            </h2>
          </header>

          <div className="flex flex-col gap-4 text-[14.5px] leading-[1.85] text-foreground/92">
            <p>
              Mon parcours est assez atypique et s’est construit progressivement, à travers des expériences
              dans des environnements très différents.
            </p>

            <p>
              J’ai d’abord étudié au <span className="text-white font-semibold">
                Saint Martin-Saint Denis Val de Loire International School
              </span>
              , dans un environnement international. J’ai ensuite suivi une <span className="text-white font-semibold">
                formation militaire au sein de l’Armée de Terre française
              </span>
              , en tant que <span className="text-primary font-semibold">soldat d’infanterie de marine</span>,
              avant de réorienter mon parcours vers l’informatique.
            </p>

            <p>
              Ma reconversion dans la tech a commencé avec une formation en développement web à{' '}
              <span className="text-white font-semibold">La Passerelle</span>, suivie de{' '}
              <span className="text-white font-semibold">Le Réacteur</span> et du{' '}
              <span className="text-white font-semibold">CS50 de Harvard</span>, afin de consolider mes
              fondamentaux en informatique et en programmation.
            </p>

            <p>
              J’ai ensuite intégré <span className="text-white font-semibold">Le Wagon Paris</span>, où j’ai
              approfondi mes compétences en développement web et mobile et travaillé sur différents projets
              logiciels. Cette expérience m’a progressivement orienté vers des problématiques plus complexes
              de conception et d’architecture.
            </p>

            <p>
              J’ai poursuivi cette évolution avec un <span className="text-primary font-semibold">
                MSc Architecte des Systèmes d’Information
              </span>{' '}
              à <span className="text-white font-semibold">EPITECH Paris</span>, avec une spécialisation en
              intelligence artificielle, systèmes distribués et architectures de données. J’y travaille
              notamment sur l’adaptation et le fine-tuning de LLM en Python, ainsi que sur la conception de
              systèmes complexes.
            </p>

            <p className="pt-2 font-khmenu text-base uppercase tracking-[0.22em] text-primary">
              Engineering &amp; Entrepreneurship
            </p>

            <p>
              Avant de rejoindre <span className="text-white font-semibold">FDJ UNITED</span>, j’ai lancé ma
              propre <span className="text-white font-semibold">auto-entreprise</span>, initialement autour
              de mes activités de développement et de services informatiques. Je continue aujourd’hui à
              développer cette activité en parallèle de mon parcours professionnel.
            </p>

            <p>
              Chez <span className="text-white font-semibold">FDJ UNITED</span>, j’ai travaillé en{' '}
              <span className="text-white font-semibold">QA Engineering</span> sur des logiciels et des
              terminaux utilisés dans un contexte international. Mon travail couvre notamment les tests
              fonctionnels, exploratoires et de non-régression, ainsi que l’automatisation des tests API et
              E2E avec Playwright, Selenium, Shell et GitLab CI.
            </p>

            <p>
              En parallèle, je développe également un <span className="text-primary font-semibold">
                second projet entrepreneurial
              </span>
              , avec pour objectif de créer une entreprise spécialisée dans le développement de services
              informatiques ainsi que dans l’<span className="text-white font-semibold">
                import-export de matériel hardware entre Shenzhen et la France
              </span>
              .
            </p>

            <p>
              Cette dimension entrepreneuriale complète mon profil d’ingénieur : elle m’amène à ne pas
              seulement réfléchir à la conception technique d’un produit, mais également à son développement,
              son infrastructure, ses contraintes opérationnelles et son environnement économique.
            </p>

            <p className="pt-2 font-khmenu text-base uppercase tracking-[0.22em] text-primary">
              Robotics &amp; Systems
            </p>

            <p>
              En parallèle de mon parcours académique et professionnel, je fais partie d’
              <span className="text-white font-semibold">Evolutek</span>, un club français de robotique. J’y
              explore des problématiques à la croisée du logiciel et du hardware, notamment autour de la
              robotique, de l’IoT, des communications LoRa et des drones.
            </p>

            <p>
              En tant que <span className="text-primary font-semibold">Software Engineer / Freelance</span>,
              j’ai également conçu et développé différentes solutions web et mobiles, notamment autour de
              GraphQL, gRPC, architectures microservices, systèmes temps réel et applications distribuées.
            </p>

            <p className="pt-1">
              Aujourd’hui, mon profil se situe à l’intersection du Software Engineering, de l’architecture
              système, de l’IA, de la robotique et de l’entrepreneuriat.
            </p>

            <p>
              J’aime comprendre un problème dans sa globalité, concevoir une architecture adaptée, puis
              aller jusqu’à son implémentation et sa validation.
            </p>

            <p>
              Je m’intéresse particulièrement aux systèmes distribués, aux applications temps réel, à la
              scalabilité, à l’AI Engineering, aux systèmes connectés et à la création de produits
              technologiques.
            </p>

            <p className="pt-2 font-khmenu text-base uppercase tracking-[0.22em] text-primary">
              Build. Architect. Automate.
            </p>
          </div>
        </article>

        <aside className="flex flex-col gap-6">
          <article className="kh-hud-card kh-fade-in flex flex-col gap-4" style={{ animationDelay: '80ms' }}>
            <header className="flex items-center gap-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-sm border font-khmenu text-primary"
                style={{
                  borderColor: 'rgba(240,199,122,0.7)',
                  background: 'rgba(240,199,122,0.1)',
                  boxShadow: '0 0 10px rgba(240,199,122,0.25)',
                }}
                aria-hidden="true"
              >
                ◈
              </span>
              <h2 className="font-khmenu text-lg font-bold uppercase tracking-[0.24em] text-white">
                Timeline
              </h2>
            </header>

            <ol className="relative flex flex-col gap-4 border-l pl-5" style={{ borderColor: 'rgba(240,199,122,0.35)' }}>
              {TIMELINE.map((e, i) => (
                <li key={e.title} className="relative flex flex-col items-start gap-1 kh-fade-in" style={{ animationDelay: `${i * 35}ms` }}>
                  <span
                    className="absolute -left-[29px] top-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: e.accent,
                      background: e.accent,
                      boxShadow: `0 0 10px ${e.accent}`,
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-khmenu text-[10px] uppercase tracking-[0.28em]"
                    style={{ color: e.accent, textShadow: `0 0 6px ${e.accent}66` }}
                  >
                    {e.year}
                  </span>
                  <h3 className="font-khmenu text-[15px] font-bold uppercase tracking-[0.18em] text-white">
                    {e.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-foreground/88">{e.body}</p>
                </li>
              ))}
            </ol>
          </article>

          <article
            className="kh-hud-card kh-fade-in flex flex-col gap-3"
            style={{ animationDelay: '140ms' }}
          >
            <header className="flex items-center gap-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-sm border font-khmenu text-primary"
                style={{
                  borderColor: 'rgba(240,199,122,0.7)',
                  background: 'rgba(240,199,122,0.1)',
                  boxShadow: '0 0 10px rgba(240,199,122,0.25)',
                }}
                aria-hidden="true"
              >
                ✧
              </span>
              <h2 className="font-khmenu text-lg font-bold uppercase tracking-[0.24em] text-white">
                Philosophie
              </h2>
            </header>
            <p className="text-[14px] leading-relaxed text-foreground/90">
              Comprendre globalement → concevoir l’architecture → implémenter → valider.
              Priorité à la robustesse, la scalabilité et la clarté du design systémique.
            </p>
            <ul className="flex flex-wrap items-center gap-2 pt-1">
              {['Robustesse', 'Clarté', 'Performance', 'Automatisation'].map((t) => (
                <li key={t} className="kh-hud-tag" style={{ opacity: 0.9 }}>
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </section>
    </div>
  )
}
