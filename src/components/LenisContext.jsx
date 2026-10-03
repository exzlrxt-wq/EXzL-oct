"use client";

import { createContext, useContext } from "react";

/** Shared Lenis instance context — avoids prop-drilling scroll control */
export const LenisContext = createContext(null);

/** @returns {import('lenis').default | null} */
export function useLenis() {
  return useContext(LenisContext);
}
