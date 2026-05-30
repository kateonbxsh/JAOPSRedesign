"use client";

import { useState } from "react";
import { ExpandableLinkList } from "@/components/ExpandableLinkList";

export function DirectoryAccordionGroup({
  groups
}: {
  groups: {
    label: string;
    items: { label: string; href: string }[];
  }[];
}) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  return (
    <>
      {groups.map((group) => (
        <ExpandableLinkList
          label={group.label}
          items={group.items}
          key={group.label}
          open={openLabel === group.label}
          onToggle={() => setOpenLabel((current) => (current === group.label ? null : group.label))}
        />
      ))}
    </>
  );
}
