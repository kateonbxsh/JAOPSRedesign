"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function ExpandableLinkList({
  label,
  items,
  open,
  onToggle
}: {
  label: string;
  items: { label: string; href: string }[];
  open?: boolean;
  onToggle?: () => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const toggle = onToggle ?? (() => setInternalOpen((value) => !value));

  return (
    <div className="expandable-list">
      <button className="reflective-button" type="button" onClick={toggle} aria-expanded={isOpen}>
        {label}
        <ChevronDown className={isOpen ? "chevron-open" : ""} size={18} />
      </button>
      <div className={`expandable-panel ${isOpen ? "panel-open" : ""}`} aria-hidden={!isOpen}>
        <div className="expandable-panel-inner">
          {items.map((item, index) => (
            <motion.span
              key={item.label}
              initial={false}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -8 }}
              transition={{
                duration: isOpen ? 0.22 : 0.14,
                delay: isOpen ? index * 0.035 : 0,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Sparkles size={15} />
              {item.label}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
