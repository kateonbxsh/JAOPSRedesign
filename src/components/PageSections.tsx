import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CircleDot } from "lucide-react";
import { DirectoryAccordionGroup } from "@/components/DirectoryAccordionGroup";
import { Reveal } from "@/components/Reveal";
import { homeAssets } from "@/content/jaops";
import type { PartnerLogo, ServiceCard } from "@/content/jaops";

export function FutureSection() {
  return (
    <section className="future-section">
      <Reveal className="figure-placeholder">
        <Image src={homeAssets.futureIllustration} alt="" fill sizes="(max-width: 1080px) 100vw, 34vw" />
      </Reveal>
      <Reveal className="future-copy">
        <span className="section-kicker">Unlocking the Future</span>
        <h2 className="section-title">Revolutionizing Space Operations with JAOPS</h2>
        <div className="future-columns">
          <p className="section-description">
            Discover the fast-evolving Newspace sector that is shaping our world. From Earth observation to space
            exploration, industries demand real-time monitoring. Setting up a Mission Control Center can be daunting,
            and outdated Oldspace methods lead to high costs and long lead times.
          </p>
          <p className="section-description">
            JAOPS offers modern solutions while leveraging lessons learned for mission success. Our expertise in MCC
            development, needs, products, and logistics can accelerate implementation and deliver a ready-to-use,
            flight-proven facility in record time.
          </p>
        </div>
        <Link className="reflective-button section-cta" href="#products-services">
          Learn More
          <ArrowRight size={16} />
        </Link>
      </Reveal>
    </section>
  );
}

export function CapabilityGridSection({
  id,
  eyebrow,
  title,
  items,
  showImagePlaceholder = false
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  items: ServiceCard[];
  showImagePlaceholder?: boolean;
}) {
  return (
    <section className="section help-section" id={id}>
      <Reveal className="section-heading">
        {eyebrow ? <span className="section-kicker">{eyebrow}</span> : null}
        <h2 className="section-title">{title}</h2>
      </Reveal>
      <div className="card-grid">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal delay={index * 0.06} key={item.title}>
              <article className="feature-card">
                {showImagePlaceholder ? (
                  <div className="card-image-placeholder">
                    {item.image ? (
                      <Image src={item.image} alt="" fill sizes="(max-width: 1080px) 100vw, 30vw" />
                    ) : (
                      <Icon size={26} />
                    )}
                  </div>
                ) : (
                  <span className="card-icon">
                    <Icon size={22} />
                  </span>
                )}
                <h3>{item.title}</h3>
                <p className="section-description">{item.description}</p>
                <Link className="card-learn-more" href={item.href}>
                  Learn more
                  <ArrowRight size={15} />
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function SplitTextSection({
  className,
  eyebrow,
  title,
  children
}: {
  className: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={className}>
      <Reveal>
        {eyebrow ? <span className="section-kicker">{eyebrow}</span> : null}
        <h2 className="section-title">{title}</h2>
      </Reveal>
      <Reveal delay={0.08}>{children}</Reveal>
    </section>
  );
}

export function MetricBand({
  id,
  className,
  eyebrow,
  title,
  body,
  checks,
  metrics
}: {
  id?: string;
  className?: string;
  eyebrow?: string;
  title: string;
  body: string;
  checks: string[];
  metrics: { value: string; label: string }[];
}) {
  return (
    <section className={className ? `proof-section ${className}` : "proof-section"} id={id}>
      <Reveal className="proof-copy">
        {eyebrow ? <span className="section-kicker">{eyebrow}</span> : null}
        <h2 className="section-title">{title}</h2>
        <p className="section-description">{body}</p>
        <div className="check-list">
          {checks.map((item) => (
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
  );
}

export function ProofListSection({
  id,
  eyebrow,
  title,
  body,
  lists
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  body: string;
  lists: {
    title: string;
    icon?: LucideIcon;
    items: string[];
  }[];
}) {
  return (
    <section className="heritage-section" id={id}>
      <Reveal>
        {eyebrow ? <span className="section-kicker">{eyebrow}</span> : null}
        <h2 className="section-title">{title}</h2>
        <p className="section-description">{body}</p>
      </Reveal>
      <div className="heritage-lists">
        {lists.map((list, index) => {
          const Icon = list.icon;
          return (
            <Reveal delay={index * 0.08} key={list.title}>
              <div>
                <h3>
                  {Icon ? <Icon size={18} /> : null}
                  {list.title}
                </h3>
                {list.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function DirectorySection({
  title,
  body,
  groups
}: {
  title: string;
  body: string;
  groups: {
    label: string;
    items: { label: string; href: string }[];
  }[];
}) {
  return (
    <section className="directory-section" id="products-services">
      <Reveal className="directory-copy">
        <h2 className="section-title">{title}</h2>
        <p className="section-description">{body}</p>
      </Reveal>
      <Reveal className="directory-accordions" delay={0.08}>
        <DirectoryAccordionGroup groups={groups} />
      </Reveal>
    </section>
  );
}

export function PartnerLogoRail({ partners }: { partners: PartnerLogo[] }) {
  const logos = [...partners, ...partners];

  return (
    <section className="partners-section">
      <Reveal className="section-heading">
        <h2 className="section-title">Our partners</h2>
      </Reveal>
      <Reveal className="partner-rail-wrap" delay={0.08}>
        <div className="partner-rail">
          {logos.map((partner, index) => (
            <div className="partner-logo" key={`${partner.name}-${index}`}>
              <span className="partner-logo-mark">
                <Image src={partner.logo} alt={partner.name} fill sizes="190px" />
              </span>
              <span className="partner-logo-label">{partner.name}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
