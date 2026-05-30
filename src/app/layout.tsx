import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "@fontsource-variable/inter";
import { StarBackground } from "@/components/StarBackground";
import { navButtons, navGroups, socialLinks } from "@/content/jaops";
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
                    <span className="nav-menu-item" key={item.label}>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {navButtons.map((item) => (
              <span className="nav-button" key={item}>
                {item}
              </span>
            ))}
          </nav>

          <div className="header-actions">
            <Link className="contact-link" href="#contact">
              Contact
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </header>
        {children}
        <footer className="site-footer" id="contact">
          <div className="footer-grid">
            <div className="footer-brand">
              <Image src="/jaops-logo-white.png" alt="JAOPS" width={167} height={40} />
              <p>Mission operations design, tools, training, and support for aerospace teams.</p>
              <div className="footer-brand-contact">
                <a href="mailto:info@jaops.com">info@jaops.com</a>
                <address>
                  3-3-13 Nishi-Shinjuku, Shinjuku-ku, Tokyo Nishi-Shinjuku Mizuma Building 6th floor,
                  Tokyo 160-0023, Japan
                </address>
              </div>
            </div>

            {navGroups.map((group) => (
              <div className="footer-column" key={group.title}>
                <h2>{group.title}</h2>
                {group.items.map((item) => (
                  <span key={item.label}>{item.label}</span>
                ))}
              </div>
            ))}

            <div className="footer-column">
              <h2>Connect</h2>
              {socialLinks.map((link) => (
                <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                  {link.label}
                </a>
              ))}
            </div>

          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} JAOPS</span>
            <span>Never fly alone.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
