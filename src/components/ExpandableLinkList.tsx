"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function ExpandableLinkList({
  label,
  items
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="expandable-list">
      <button className="reflective-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        {label}
        <ChevronDown className={open ? "chevron-open" : ""} size={18} />
      </button>
      <div className={open ? "expandable-panel panel-open" : "expandable-panel"}>
        {items.map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
