import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import oromoo from "./oromoo";
import english from "./english";

export type TranslationKey = keyof typeof oromoo;
type Language = "oromoo" | "english";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const translations: Record<Language, Record<TranslationKey, string>> = {
  oromoo: oromoo,
  english: english,
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored === "oromoo" || stored === "english") return stored;
    }
    return "oromoo"; // default language
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.setAttribute(
      "lang",
      language === "oromoo" ? "om" : "en",
    );
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
