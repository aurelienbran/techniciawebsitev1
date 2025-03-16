import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    supportedLngs: ['fr', 'en', 'de', 'it'],
    defaultNS: 'common',
    ns: ['common', 'home', 'solution', 'about', 'demo', 'contact', 'intro', 'benefits'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added',
    },
    load: 'languageOnly',
    preload: ['fr', 'en', 'de', 'it'],
  });

export default i18n;