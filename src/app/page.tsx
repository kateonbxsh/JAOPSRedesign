import Link from "next/link";
import dynamic from "next/dynamic";
import { Rocket } from "lucide-react";
import {
  CapabilityGridSection,
  DirectorySection,
  FutureSection,
  PartnerLogoRail,
  SplitTextSection
} from "@/components/PageSections";
import { Reveal } from "@/components/Reveal";
import {
  homeAssets,
  homeSections,
  metrics,
  partners,
  pillars,
  products,
  services
} from "@/content/jaops";

const GlobeScene = dynamic(() => import("@/components/GlobeScene").then((module) => module.GlobeScene), {
  ssr: false
});

function getYouTubeEmbedUrl(url: string) {
  const parsedUrl = new URL(url);
  const videoId = parsedUrl.hostname.includes("youtu.be")
    ? parsedUrl.pathname.slice(1)
    : parsedUrl.pathname.startsWith("/shorts/")
      ? parsedUrl.pathname.split("/")[2]
      : parsedUrl.pathname.startsWith("/embed/")
        ? parsedUrl.pathname.split("/")[2]
        : parsedUrl.searchParams.get("v");

  return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
}

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <Reveal className="hero-copy">
          <h1>Never Fly Alone</h1>
          <p className="hero-title">One-stop Shop for Mission Operations Design, Tools, Training and Support for Mission Success</p>
          <div className="hero-actions">
            <Link className="reflective-button" href="#products-services">
              <Rocket size={18} />
              Explore Capabilities
            </Link>
          </div>
        </Reveal>

        <Reveal className="hero-visual" delay={0.12}>
          <GlobeScene />
        </Reveal>
      </section>

      <FutureSection />

      <CapabilityGridSection title="Our services" items={pillars} showImagePlaceholder />

      <SplitTextSection className="discipline-section" title={homeSections[1].title}>
          <p>{homeSections[1].body}</p>
          <p>
            JAOPS addresses these challenges with tools, certification, data processing, mission planning, context
            evaluation, anomaly resolution, and real-time mission control and monitoring.
          </p>
          <div className="video-placeholder-grid">
            {homeAssets.videos.map((video) => (
              <div
                className="video-placeholder"
                key={video.title}
              >
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={getYouTubeEmbedUrl(video.href)}
                  title={video.title}
                />
                <span>{video.title}</span>
              </div>
            ))}
          </div>
      </SplitTextSection>

      <SplitTextSection className="future-ready-section" eyebrow="Let us be part of your future" title="Reduce your time to flight readiness">
          <p>{homeSections[2].body}</p>
          <p>
            Designers should not spend time on simulation environment development or operational product preparation.
            JAOPS has the infrastructure and people required so engineering teams can focus on business-critical systems.
          </p>
          <div className="metric-grid inline-metrics">
            {metrics.map((metric) => (
              <div className="metric-card" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
      </SplitTextSection>

      <PartnerLogoRail partners={partners} />

      <DirectorySection
        title="Transforming Spacecraft Operations & Services for Mission Success"
        body="JAOPS delivers the required tools, processes, and training to ensure mission success in the most demanding environments. We are passionate about operations and continuously searching for the best tools and the best people for our team."
        groups={[
          { label: "Products", items: products.map((item) => ({ label: item.title, href: item.href })) },
          { label: "Services", items: services.map((item) => ({ label: item.title, href: item.href })) }
        ]}
      />
    </main>
  );
}
