import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  Cpu,
  Globe2,
  GraduationCap,
  Handshake,
  ListChecks,
  MonitorCog,
  RadioTower,
  Rocket,
  Satellite,
  ShieldCheck,
  Workflow
} from "lucide-react";

export type NavGroup = {
  title: string;
  items: { label: string; href: string }[];
};

export type ServiceCard = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const navGroups: NavGroup[] = [
  {
    title: "Products",
    items: [
      { label: "Yamcs Gateway", href: "/templates/#yamcs-gateway" },
      { label: "Tools", href: "/templates/#tools" },
      { label: "Simulation Environments", href: "/templates/#simulation" }
    ]
  },
  {
    title: "Services",
    items: [
      { label: "Turnkey MCC", href: "/templates/#turnkey-mcc" },
      { label: "Operational Review", href: "/templates/#reviews" },
      { label: "Training & Certification", href: "/templates/#training" },
      { label: "Operations as a Service", href: "/templates/#oaas" }
    ]
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/templates/#about" },
      { label: "Missions", href: "/templates/#missions" },
      { label: "Partners", href: "/templates/#partners" },
      { label: "News & Events", href: "/templates/#events" },
      { label: "Contact", href: "/templates/#contact" }
    ]
  }
];

export const hero = {
  kicker: "Never fly alone",
  title: "Mission operations design, tools, training, and support for aerospace teams.",
  summary:
    "JAOPS helps teams build, test, rehearse, and operate mission control capabilities for Earth orbit, lunar surface, cislunar, astronaut support, and UAV programs.",
  primaryCta: "Explore services",
  secondaryCta: "View templates",
  image:
    "https://images.squarespace-cdn.com/content/v1/648a141a1d3e6d5a5f49b923/8fe1b677-f8bb-4628-934e-9c8b8d86cdab/JAOPS+Logo+White.png"
};

export const homeSections = [
  {
    title: "Unlocking the future of space operations",
    body:
      "Newspace teams need real-time monitoring, reliable mission control facilities, and practical operational knowledge without Oldspace lead times. JAOPS combines MCC development, tools, logistics, training, and operational experience to accelerate flight readiness."
  },
  {
    title: "Operations, the forgotten discipline",
    body:
      "Spacecraft operations are often overshadowed by hardware and software development. JAOPS reduces this gap with tools, certification, anomaly resolution, mission planning, data processing, real-time monitoring, and experienced operators."
  },
  {
    title: "Let JAOPS be part of your future",
    body:
      "JAOPS is building toward multi-mission control centers around the world, able to serve as prime or backup operations facilities around the clock while reducing night-shift burden."
  }
];

export const pillars: ServiceCard[] = [
  {
    title: "Operations",
    href: "/templates/#oaas",
    icon: Satellite,
    description:
      "Mission control, planning, monitoring, anomaly resolution, data processing, and live support from experienced operators."
  },
  {
    title: "Education",
    href: "/templates/#training",
    icon: GraduationCap,
    description:
      "Certification, real-life operations training, team coaching, STEM engagement, and mission-specific readiness programs."
  },
  {
    title: "Tools",
    href: "/templates/#tools",
    icon: MonitorCog,
    description:
      "Yamcs Gateway, mission control systems, planning tools, knowledge management, data analysis, alarms, shift planning, and VoIP."
  }
];

export const products: ServiceCard[] = [
  {
    title: "Yamcs Gateway",
    href: "/templates/#yamcs-gateway",
    icon: Workflow,
    description:
      "Extends Yamcs into development, test, simulation, and operational phases with telemetry and telecommand interfaces for subsystems."
  },
  {
    title: "Simulation Environments",
    href: "/templates/#simulation",
    icon: Rocket,
    description:
      "Accurate spacecraft and lunar rover simulators with sensor data, TM/TC interfaces, photorealistic rendering, physics, and rehearsal workflows."
  },
  {
    title: "Operations Tools",
    href: "/templates/#tools",
    icon: Cpu,
    description:
      "Mission control, planning, documentation, telemetry analysis, anomaly traceability, shift planning, and communications systems."
  }
];

export const services: ServiceCard[] = [
  {
    title: "Turnkey Mission Control Centers",
    href: "/templates/#turnkey-mcc",
    icon: Building2,
    description:
      "Ready-to-use MCC design and deployment covering layout, infrastructure, processes, and certification."
  },
  {
    title: "Operations as a Service",
    href: "/templates/#oaas",
    icon: RadioTower,
    description:
      "Mission operations support that reduces recruiting, ground software development, testing time, and operational risk."
  },
  {
    title: "Operational Review",
    href: "/templates/#reviews",
    icon: ListChecks,
    description:
      "External operational expertise for PDR, CDR, TRR, ORR, and early phase consulting."
  },
  {
    title: "Training & Certification",
    href: "/templates/#training",
    icon: BadgeCheck,
    description:
      "Flight, SPACOM, ground controller, systems, and customer certifications based on practical mission operations."
  }
];

export const metrics = [
  { value: "91%", label: "Potential infrastructure cost reduction" },
  { value: "83%", label: "Potential tools cost reduction" },
  { value: "44%", label: "Potential personnel cost reduction" },
  { value: "6 mo", label: "Short-lead-time MCC IT path" }
];

export const missionTypes = [
  "Lunar rover operations",
  "Spacecraft operations",
  "Astronaut support",
  "UAV operations",
  "Earth observation",
  "ISS payload activities"
];

export const missionExperience = [
  "PY-1 Yaoki",
  "ispace",
  "NASA Space Robotics Challenge",
  "B-USOC",
  "SOLAR",
  "VMU MKII",
  "ICECUBES",
  "METERON",
  "ISS Increments 17-50",
  "Synspective Strix missions"
];

export const partners = [
  "Moon Village Association",
  "Meridian Space Command",
  "Asteria ART",
  "3IPK",
  "Space Robotics Lab",
  "Dymon"
];

export const templateSections = [
  {
    id: "split-feature",
    title: "Split Feature",
    icon: Activity,
    description: "For product or service explanations with a strong image, key outcome, and two calls to action."
  },
  {
    id: "metric-band",
    title: "Metric Band",
    icon: ShieldCheck,
    description: "For quantified claims such as cost reduction, lead time, reliability, operational maturity, or certification paths."
  },
  {
    id: "card-grid",
    title: "Capability Grid",
    icon: Globe2,
    description: "For products, services, mission types, partners, or reusable proof-point collections."
  },
  {
    id: "process",
    title: "Process Timeline",
    icon: BookOpenCheck,
    description: "For MCC implementation, certification, testing campaigns, simulation rehearsals, and operations handover."
  },
  {
    id: "partner-list",
    title: "Partner / Mission List",
    icon: Handshake,
    description: "For compact lists of partner organizations, customer examples, mission heritage, and ecosystem proof."
  }
];
