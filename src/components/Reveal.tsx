"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  className,
  id,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
