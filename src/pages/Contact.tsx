import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Mail,
  Phone,
  MapPin,
  Headset,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Send
} from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation('contact');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    message: '',
    newsletter: false
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = t('form.errors.fullName');
    }
    
    if (!formData.email.trim()) {
      errors.email = t('form.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('form.errors.emailInvalid');
    }
    
    if (!formData.company.trim()) {
      errors.company = t('form.errors.company');
    }
    
    if (!formData.industry) {
      errors.industry = t('form.errors.industry');
    }
    
    if (!formData.message.trim()) {
      errors.message = t('form.errors.message');
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      fullName: '',
      email: '',
      company: '',
      phone: '',
      industry: '',
      message: '',
      newsletter: false
    });
    setFormErrors({});
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-primary)] via-[var(--background-secondary)] to-[var(--background-primary)]"></div>
        
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <p className="text-[var(--text-secondary)]">
            {t('hero.response')}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-[var(--background-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('form.title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                    {t('form.fields.name.label')} *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg bg-[var(--background-primary)] border ${
                      formErrors.fullName ? 'border-red-500' : 'border-[var(--text-secondary)]/20'
                    } focus:outline-none focus:border-[var(--accent-primary)]`}
                    placeholder={t('form.fields.name.placeholder')}
                  />
                  {formErrors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {t('form.fields.email.label')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg bg-[var(--background-primary)] border ${
                      formErrors.email ? 'border-red-500' : 'border-[var(--text-secondary)]/20'
                    } focus:outline-none focus:border-[var(--accent-primary)]`}
                    placeholder={t('form.fields.email.placeholder')}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1">
                    {t('form.fields.company.label')} *
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg bg-[var(--background-primary)] border ${
                      formErrors.company ? 'border-red-500' : 'border-[var(--text-secondary)]/20'
                    } focus:outline-none focus:border-[var(--accent-primary)]`}
                    placeholder={t('form.fields.company.placeholder')}
                  />
                  {formErrors.company && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.company}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {t('form.fields.message.label')} *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg bg-[var(--background-primary)] border ${
                      formErrors.message ? 'border-red-500' : 'border-[var(--text-secondary)]/20'
                    } focus:outline-none focus:border-[var(--accent-primary)]`}
                    placeholder={t('form.fields.message.placeholder')}
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center ${
                    isSubmitting
                      ? 'bg-[var(--accent-primary)]/50 cursor-not-allowed'
                      : 'bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] transform hover:-translate-y-1'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : submitSuccess ? (
                    <span className="flex items-center">
                      {t('form.success')}
                      <CheckCircle2 className="ml-2 h-5 w-5" />
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {t('form.submit')}
                      <Send className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </button>
              </form>
            </div>

            <div>
              <div className="glass-card p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">{t('contact.title')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Mail className="h-6 w-6 text-[var(--accent-primary)] mr-2" />
                    <span>{t('contact.email')}</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-6 w-6 text-[var(--accent-primary)] mr-2" />
                    <span>{t('contact.phone')}</span>
                  </li>
                  <li className="flex items-center">
                    <MapPin className="h-6 w-6 text-[var(--accent-primary)] mr-2" />
                    <span>{t('contact.address')}</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-8">
                <div className="flex items-center mb-6">
                  <Calendar className="h-6 w-6 text-[var(--accent-primary)] mr-2" />
                  <h3 className="text-2xl font-bold">{t('schedule.title')}</h3>
                </div>
                <p className="text-[var(--text-secondary)] mb-6">
                  {t('schedule.description')}
                </p>
                <button className="btn-secondary w-full">
                  {t('schedule.button')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('faq.title')}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="glass-card overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <span className="font-semibold">{t(`faq.items.${index}.question`)}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-[var(--accent-primary)]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[var(--accent-primary)]" />
                  )}
                </button>
                <div
                  className={`px-6 transition-all duration-300 ${
                    expandedFAQ === index ? 'py-4' : 'h-0'
                  }`}
                >
                  {expandedFAQ === index && (
                    <p className="text-[var(--text-secondary)]">{t(`faq.items.${index}.answer`)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-primary)] to-[var(--background-secondary)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            {t('cta.subtitle')}
          </p>
          <button className="btn-primary flex items-center justify-center mx-auto group">
            {t('cta.button')}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>
    </div>
  );
}