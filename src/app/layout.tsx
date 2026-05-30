import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import { StarBackground } from "@/components/StarBackground";
import { navGroups } from "@/content/jaops";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAOPS Redesign",
  description: "Static Next.js redesign scaffold for JAOPS aerospace operations."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StarBackground />
        <header className="site-header">
          <Link href="/" className="brand" aria-label="JAOPS home">
            <Image src="/jaops-logo-white.png" alt="JAOPS" width={167} height={40} priority />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navGroups.map((group) => (
              <div className="nav-group" key={group.title}>
                <span>{group.title}</span>
                <div className="nav-menu">
                  {group.items.map((item) => (
                    <Link href={item.href} key={item.label}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="header-actions">
            <Link className="contact-link" href="/templates/#contact">
              Contact
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
