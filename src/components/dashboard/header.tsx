"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useLang } from "./lang-context";
import { t } from "@/lib/i18n";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang } = useLang();

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-7">
      <div>
        <h1 className="text-2xl font-bold text-primary">Ferdi — Zafra 2025</h1>
        <p className="text-sm text-muted-foreground">{t(lang, "subtitle")}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-4 w-4 mr-1" /> : <Moon className="h-4 w-4 mr-1" />}
          {theme === "dark" ? t(lang, "lightMode") : t(lang, "darkMode")}
        </Button>
        <Button variant="outline" size="sm" onClick={toggleLang}>
          {lang === "es" ? "EN" : "ES"}
        </Button>
      </div>
    </div>
  );
}
