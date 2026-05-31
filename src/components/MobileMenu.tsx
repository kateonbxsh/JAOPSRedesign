"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Globe2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { navButtons, navGroups } from "@/content/jaops";
import { assetPath } from "@/lib/assets";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<(typeof navGroups)[number] | null>(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    setActiveGroup(null);
    setLanguageOpen(false);
  }

  return (
    <>
      <button className="mobile-menu-toggle" type="button" aria-label="Open navigation" onClick={() => setOpen(true)}>
        <Menu size={30} strokeWidth={1.6} />
      </button>

      {mounted
        ? createPortal(
            <div className={`mobile-menu-overlay ${open ? "mobile-menu-open" : ""}`} aria-hidden={!open}>
              <div className="mobile-menu-header">
                <Link href="/" aria-label="JAOPS home" onClick={closeMenu}>
                  <Image src={assetPath("/jaops-logo-white.png")} alt="JAOPS" width={167} height={40} />
                </Link>
                <button type="button" aria-label="Close navigation" onClick={closeMenu}>
                  <X size={32} strokeWidth={1.5} />
                </button>
              </div>

              {activeGroup ? (
                <nav
                  className="mobile-menu-content mobile-menu-submenu"
                  aria-label={`${activeGroup.title} navigation`}
                  key={activeGroup.title}
                >
                  <button className="mobile-menu-back" type="button" onClick={() => setActiveGroup(null)}>
                    <ArrowLeft size={20} strokeWidth={1.4} />
                    Back
                  </button>
                  {activeGroup.items.map((item) => (
                    <Link href={item.href} key={item.label} onClick={closeMenu}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              ) : (
                <nav className="mobile-menu-content" aria-label="Mobile navigation" key="main">
                  {navGroups.map((group) => (
                    <button
                      className="mobile-menu-entry"
                      type="button"
                      key={group.title}
                      onClick={() => setActiveGroup(group)}
                    >
                      {group.title}
                      <ChevronRight size={22} strokeWidth={1.4} />
                    </button>
                  ))}
                  {navButtons.map((item) => (
                    <button className="mobile-menu-entry" type="button" key={item}>
                      {item}
                    </button>
                  ))}
                  <Link className="mobile-menu-entry" href="#contact" onClick={closeMenu}>
                    Contact
                  </Link>
                  <button className="mobile-language" type="button" onClick={() => setLanguageOpen((value) => !value)}>
                    <Globe2 size={22} strokeWidth={1.5} />
                    English
                    <ChevronRight size={20} strokeWidth={1.4} />
                  </button>
                  {languageOpen ? (
                    <div className="mobile-language-options">
                      <button type="button">English</button>
                      <button type="button">Japanese</button>
                      <button type="button">French</button>
                    </div>
                  ) : null}
                </nav>
              )}
            </div>,
            document.body
          )
        : null}
    </>
  );
}
