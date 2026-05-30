import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Boxes,
  CircleDot,
  Gauge,
  Radio,
  ShieldCheck,
  Sparkles,
  Waypoints
} from "lucide-react";
import { ExpandableLinkList } from "@/components/ExpandableLinkList";
import { Reveal } from "@/components/Reveal";
import {
  hero,
  homeSections,
  metrics,
  missionExperience,
  missionTypes,
  navGroups,
  pillars,
  products,
  services
} from "@/content/jaops";

const GlobeScene = dynamic(() => import("@/components/GlobeScene").then((module) => module.GlobeScene), {
  ssr: false
});

function CardGrid({
  eyebrow,
  title,
  items
}: {
  eyebrow: string;
  title: string;
  items: typeof pillars;
}) {
  return (
    <section className="section">
      <Reveal className="section-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </Reveal>
      <div className="card-grid">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal delay={index * 0.06} key={item.title}>
              <Link href={item.href} className="feature-card">
                <span className="card-icon">
                  <Icon size={22} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="card-link">
                  Open template <ArrowRight size={16} />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <Reveal className="hero-copy">
          <span className="eyebrow">{hero.kicker}</span>
          <h1>NEVER FLY ALONE</h1>
          <p className="hero-title">One-stop Shop for Mission Operations Design, Tools, Training and Support for Mission Success</p>
          <p className="hero-summary">{hero.summary}</p>
          <div className="hero-actions">
            <Link className="reflective-button" href="/templates/#services">
              <Radio size={18} />
              {hero.primaryCta}
            </Link>
            <Link className="ghost-button" href="/templates/">
              <Sparkles size={18} />
              {hero.secondaryCta}
            </Link>
          </div>
        </Reveal>

        <Reveal className="hero-visual" delay={0.12}>
          <GlobeScene />
        </Reveal>
      </section>

      <section className="quick-access">
        <Reveal>
          <h2>Explore JAOPS capabilities</h2>
        </Reveal>
        <Reveal className="quick-actions" delay={0.08}>
          <ExpandableLinkList label="Products" items={navGroups[0].items} />
          <ExpandableLinkList label="Services" items={navGroups[1].items} />
        </Reveal>
      </section>

      <section className="intro-band">
        {homeSections.map((section, index) => (
          <Reveal delay={index * 0.08} key={section.title}>
            <article>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <CardGrid eyebrow="How can we help" title="Operations, education, and tools under one roof." items={pillars} />

      <section className="proof-section">
        <Reveal className="proof-copy">
          <span className="eyebrow">Operations as a Service</span>
          <h2>Reduce the time, risk, and cost of reaching operational readiness.</h2>
          <p>
            JAOPS spreads infrastructure, people, and software costs across customer missions while applying
            flight-heritage tools and operators who have handled real anomalies across payloads and platforms.
          </p>
          <div className="check-list">
            {[
              "No lengthy recruiting process",
              "Reduced ground software development and testing",
              "Support during development and test campaigns",
              "Mission control from design through operations"
            ].map((item) => (
              <span key={item}>
                <CircleDot size={18} />
                {item}
              </span>
            ))}
          </div>
        </Reveal>
        <div className="metric-grid">
          {metrics.map((metric, index) => (
            <Reveal delay={index * 0.06} key={metric.label}>
              <div className="metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CardGrid eyebrow="Products" title="A connected toolkit for modern mission control." items={products} />
      <CardGrid eyebrow="Services" title="Deployment, review, training, and operations support." items={services} />

      <section className="heritage-section">
        <Reveal>
          <span className="eyebrow">Mission heritage</span>
          <h2>From ISS payloads to lunar rover operations.</h2>
          <p>
            The source site emphasizes two decades of space operations software, ground systems, simulation,
            deployed MCCs, shift operations, Earth observation, ISS activities, and lunar lander and rover missions.
          </p>
        </Reveal>
        <div className="heritage-lists">
          <Reveal>
            <div>
            <h3>
              <Waypoints size={18} />
              Mission types
            </h3>
            {missionTypes.map((item) => (
              <span key={item}>{item}</span>
            ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
            <h3>
              <ShieldCheck size={18} />
              Experience
            </h3>
            {missionExperience.map((item) => (
              <span key={item}>{item}</span>
            ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal className="cta-section">
        <Boxes size={28} />
        <h2>Build the redesign from reusable operational sections.</h2>
        <p>
          The next step can focus on refining the home page visual language while the templates page holds the reusable
          section system for products, services, company, missions, and events.
        </p>
        <Link className="reflective-button" href="/templates/">
          <Gauge size={18} />
          Open templates
        </Link>
      </Reveal>
    </main>
  );
}
