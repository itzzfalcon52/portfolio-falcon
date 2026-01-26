"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

 function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"       // adds class="dark" on <html>
      defaultTheme="system"   // system light/dark by default
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

export default ThemeProvider;