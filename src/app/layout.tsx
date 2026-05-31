import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";
import "@fontsource-variable/inter";
import { MobileMenu } from "@/components/MobileMenu";
import { StarBackground } from "@/components/StarBackground";
import { navButtons, navGroups, socialLinks } from "@/content/jaops";
import { assetPath } from "@/lib/assets";
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
            <Image src={assetPath("/jaops-logo-white.png")} alt="JAOPS" width={167} height={40} priority />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navGroups.map((group) => (
              <div className="nav-group" key={group.title}>
                <button type="button">{group.title}</button>
                <div className="nav-menu">
                  {group.items.map((item) => (
                    <button className="nav-menu-item" type="button" key={item.label}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {navButtons.map((item) => (
              <button className="nav-button" type="button" key={item}>
                {item}
              </button>
            ))}
            <details className="nav-language">
              <summary className="nav-button">
              <Globe2 size={15} />
              English
              </summary>
              <div className="nav-language-menu">
                <button type="button">English</button>
                <button type="button">Japanese</button>
                <button type="button">French</button>
              </div>
            </details>
          </nav>

          <div className="header-actions">
            <Link className="contact-link" href="#contact">
              Contact
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <MobileMenu />
        </header>
        {children}
        <footer className="site-footer" id="contact">
          <div className="footer-grid">
            <div className="footer-brand">
              <Image src={assetPath("/jaops-logo-white.png")} alt="JAOPS" width={167} height={40} />
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
            <span>&copy; {new Date().getFullYear()} JAOPS</span>
            <span>Never fly alone.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
