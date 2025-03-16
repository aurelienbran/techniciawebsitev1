import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Mail, Phone, Globe, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[var(--background-secondary)] pt-16 pb-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold">
                Technic<span className="text-[var(--accent-primary)]">IA</span>
              </span>
            </div>
            <p className="text-[var(--text-secondary)] mb-6">
              {t('footer.tagline') || "L'IA au service de la maintenance industrielle. Notre mission est de simplifier le travail des techniciens grâce à l'intelligence artificielle."}
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="LinkedIn" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195c-.892-.957-2.163-1.556-3.59-1.556-2.724 0-4.927 2.204-4.927 4.927 0 .39.033.765.114 1.124-4.09-.205-7.723-2.165-10.145-5.14-.422.724-.668 1.567-.668 2.458 0 1.706.87 3.21 2.19 4.09-.807-.026-1.585-.256-2.25-.632v.06c0 2.39 1.7 4.385 3.952 4.84-.443.134-.89.176-1.354.176-.33 0-.652-.03-.963-.086.627 1.953 2.445 3.38 4.6 3.42-1.688 1.32-3.8 2.107-6.115 2.107-.4 0-.79-.023-1.178-.068 2.168 1.396 4.768 2.213 7.55 2.213 9.056 0 14.01-7.504 14.01-14.01 0-.213-.005-.426-.015-.637.96-.69 1.79-1.553 2.46-2.54l-.047-.02z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186c-.276-1.039-1.089-1.858-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.376.504c-1.033.278-1.846 1.097-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814c.276 1.039 1.089 1.858 2.122 2.136C4.495 20.454 12 20.454 12 20.454s7.505 0 9.376-.504c1.033-.278 1.846-1.097 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.links.title') || "Liens rapides"}</h3>
            <ul className="space-y-4">
              <li>
                <a href="#home" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  {t('footer.links.home') || "Accueil"}
                </a>
              </li>
              <li>
                <a href="#demo" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  {t('footer.links.demo') || "Démonstration"}
                </a>
              </li>
              <li>
                <a href="#about" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  {t('footer.links.about') || "À propos"}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  {t('footer.links.contact') || "Contact"}
                </a>
              </li>
              <li>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  {t('footer.links.blog') || "Blog"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.contact.title') || "Contact"}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                <span className="text-[var(--text-secondary)]">
                  {t('footer.contact.address') || "123 Rue de l'Innovation, 75000 Paris, France"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@technic-ia.com" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  contact@technic-ia.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                <a href="tel:+33123456789" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                <a href="https://technic-ia.com" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  technic-ia.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.newsletter.title') || "Newsletter"}</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              {t('footer.newsletter.description') || "Inscrivez-vous pour recevoir nos actualités et mises à jour."}
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder') || "Votre adresse email"}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] focus:border-[var(--accent-primary)] bg-white text-[var(--text-primary)] placeholder-[var(--text-light)]"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full rounded-lg flex items-center justify-center gap-2"
              >
                {t('footer.newsletter.button') || "S'inscrire"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[var(--border-color)] pt-8 mt-8 text-center text-[var(--text-secondary)] text-sm">
          <p>
            {t('footer.copyright', { year: currentYear }) || `© ${currentYear} TechnicIA. Tous droits réservés.`}
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-[var(--accent-primary)] transition-colors">
              {t('footer.privacyPolicy') || "Politique de confidentialité"}
            </a>
            <a href="#" className="hover:text-[var(--accent-primary)] transition-colors">
              {t('footer.termsOfService') || "Conditions d'utilisation"}
            </a>
            <a href="#" className="hover:text-[var(--accent-primary)] transition-colors">
              {t('footer.cookiePolicy') || "Politique des cookies"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;