import Link from "next/link";
import { ArrowRight, Check, ExternalLink, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  metrics,
  missionExperience,
  navGroups,
  partners,
  products,
  services,
  templateSections
} from "@/content/jaops";

export default function TemplatesPage() {
  return (
    <main>
      <Reveal className="template-hero">
        <span className="eyebrow">Reusable page system</span>
        <h1>JAOPS section templates</h1>
        <p>
          A unified library for the pages that come after the home redesign: products, services, company, partners,
          missions, events, and contact.
        </p>
      </Reveal>

      <section className="section" id="navigation">
        <Reveal className="section-heading">
          <span className="eyebrow">Navigation</span>
          <h2>Source-site map</h2>
        </Reveal>
        <div className="nav-template-grid">
          {navGroups.map((group, index) => (
            <Reveal delay={index * 0.06} key={group.title}>
              <article className="template-card">
                <h3>{group.title}</h3>
                {group.items.map((item) => (
                  <Link href={item.href} key={item.label}>
                    {item.label}
                    <ArrowRight size={15} />
                  </Link>
                ))}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal className="section-heading">
          <span className="eyebrow">Patterns</span>
          <h2>Section building blocks</h2>
        </Reveal>
        <div className="template-grid">
          {templateSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Reveal delay={index * 0.05} key={section.id}>
                <article className="template-card" id={section.id}>
                  <span className="card-icon">
                    <Icon size={22} />
                  </span>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                  <div className="button-row">
                    <button type="button" className="reflective-button">
                      <Check size={16} />
                      Primary
                    </button>
                    <button type="button" className="ghost-button">
                      <ExternalLink size={16} />
                      Secondary
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="proof-section template-proof" id="oaas">
        <Reveal className="proof-copy">
          <span className="eyebrow">Metric template</span>
          <h2>Operations as a Service proof band</h2>
          <p>
            This pattern supports quantified claims with a concise left-side narrative and compact stat cards on the
            right.
          </p>
        </Reveal>
        <div className="metric-grid">
          {metrics.map((metric, index) => (
            <Reveal delay={index * 0.05} key={metric.label}>
              <div className="metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="services">
        <Reveal className="section-heading">
          <span className="eyebrow">Card grid template</span>
          <h2>Services and products</h2>
        </Reveal>
        <div className="card-grid">
          {[...services, ...products].map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal delay={index * 0.04} key={item.title}>
                <article className="feature-card" id={item.href.split("#")[1]}>
                  <span className="card-icon">
                    <Icon size={22} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="process-section" id="turnkey-mcc">
        <Reveal className="section-heading">
          <span className="eyebrow">Process template</span>
          <h2>Turnkey MCC delivery flow</h2>
        </Reveal>
        <div className="process-list">
          {["Operational needs", "Tool selection", "Infrastructure", "Testing", "Training", "Simulation", "Operations"].map(
            (step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
                <p>
                  A reusable step block for implementation pages, certification pages, and mission rehearsal pages.
                </p>
              </article>
            )
          )}
        </div>
      </section>

      <section className="heritage-section" id="missions">
        <Reveal>
          <span className="eyebrow">List template</span>
          <h2>Mission and partner proof</h2>
          <p>
            Compact text lists keep dense source-site material scannable while preserving the full mission heritage for
            later detail pages.
          </p>
        </Reveal>
        <div className="heritage-lists">
          <div id="partners">
            <h3>Partners</h3>
            {partners.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div>
            <h3>Mission heritage</h3>
            {missionExperience.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <Reveal className="contact-template" id="contact">
        <div>
          <span className="eyebrow">Contact template</span>
          <h2>Tokyo operations presence</h2>
          <p>JAOPS Inc., 3-3-13 Nishi-Shinjuku, Shinjuku-ku, Tokyo Nishi-Shinjuku Mizuma Building 6th floor, 160-0023.</p>
        </div>
        <div className="contact-actions">
          <a className="reflective-button" href="mailto:info@jaops.com">
            <Mail size={18} />
            info@jaops.com
          </a>
          <button type="button" className="ghost-button">
            <MapPin size={18} />
            Tokyo
          </button>
        </div>
      </Reveal>
    </main>
  );
}
