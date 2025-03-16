import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Brain, 
  Gauge, 
  BanknoteIcon, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  TrendingUp,
  Factory,
  Zap,
  Stethoscope,
  Truck,
  Building2,
  Radio,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Industry {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

const industries: Industry[] = [
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    icon: <Factory className="h-6 w-6" />,
    description: 'Optimize production line maintenance and reduce costly downtime.',
    benefits: [
      'Predictive maintenance scheduling',
      'Real-time equipment diagnostics',
      'Automated maintenance logs'
    ]
  },
  {
    id: 'energy',
    title: 'Energy & Utilities',
    icon: <Zap className="h-6 w-6" />,
    description: 'Keep critical infrastructure running efficiently and safely.',
    benefits: [
      'Equipment performance monitoring',
      'Compliance documentation',
      'Safety protocol automation'
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare Equipment',
    icon: <Stethoscope className="h-6 w-6" />,
    description: 'Maintain medical equipment with precision and reliability.',
    benefits: [
      'Regulatory compliance tracking',
      'Sterilization procedure guidance',
      'Calibration management'
    ]
  },
  {
    id: 'logistics',
    title: 'Transportation & Logistics',
    icon: <Truck className="h-6 w-6" />,
    description: 'Keep your fleet and logistics equipment operating at peak efficiency.',
    benefits: [
      'Fleet maintenance optimization',
      'Preventive maintenance scheduling',
      'Parts inventory management'
    ]
  },
  {
    id: 'building',
    title: 'Building Management',
    icon: <Building2 className="h-6 w-6" />,
    description: 'Streamline facility maintenance and operations.',
    benefits: [
      'HVAC system optimization',
      'Emergency system maintenance',
      'Building automation integration'
    ]
  },
  {
    id: 'telecom',
    title: 'Telecommunications',
    icon: <Radio className="h-6 w-6" />,
    description: 'Maintain complex network infrastructure effectively.',
    benefits: [
      'Network equipment diagnostics',
      'Cable maintenance procedures',
      'Signal optimization guidance'
    ]
  }
];

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Initial Consultation',
    description: 'Understanding your specific maintenance challenges'
  },
  {
    id: 2,
    title: 'Needs Assessment',
    description: 'Detailed analysis of your technical environment'
  },
  {
    id: 3,
    title: 'Custom Development',
    description: 'Building your tailored TechnicIA solution'
  },
  {
    id: 4,
    title: 'Knowledge Integration',
    description: 'Incorporating your technical documentation'
  },
  {
    id: 5,
    title: 'Training & Deployment',
    description: 'Getting your team up to speed'
  },
  {
    id: 6,
    title: 'Ongoing Optimization',
    description: 'Continuous improvement based on usage patterns'
  }
];

const benefits = [
  {
    icon: <Gauge className="h-7 w-7 text-white" />,
    key: 'Reduced Downtime',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: <BanknoteIcon className="h-7 w-7 text-white" />,
    key: 'Cost Efficiency',
    color: 'from-green-400 to-green-600'
  },
  {
    icon: <ShieldCheck className="h-7 w-7 text-white" />,
    key: 'Enhanced Safety',
    color: 'from-red-400 to-red-600'
  },
  {
    icon: <BookOpen className="h-7 w-7 text-white" />,
    key: 'Knowledge Retention',
    color: 'from-purple-400 to-purple-600'
  },
  {
    icon: <CheckCircle2 className="h-7 w-7 text-white" />,
    key: 'Consistent Quality',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    icon: <TrendingUp className="h-7 w-7 text-white" />,
    key: 'Continuous Improvement',
    color: 'from-teal-400 to-teal-600'
  }
];

export default function Solution() {
  const { t } = useTranslation(['solution', 'benefits']);
  const [activeIndustry, setActiveIndustry] = useState(industries[0].id);
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-primary)] to-[var(--background-secondary)]"></div>
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-8 leading-tight">
              {t('hero.title', { ns: 'solution' })}
            </h1>
            <p className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-10 max-w-3xl mx-auto">
              {t('hero.subtitle', { ns: 'solution' })}
            </p>
            <div className="animate-bounce mt-16">
              <ChevronDown className="h-8 w-8 mx-auto text-[var(--accent-primary)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight">{t('overview.title', { ns: 'solution' })}</h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                {t('overview.description', { ns: 'solution' })}
              </p>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="mt-1 p-1 rounded-full bg-[var(--accent-primary)]/10 mr-4 flex-shrink-0">
                    <ArrowRight className="h-5 w-5 text-[var(--accent-primary)]" />
                  </div>
                  <span className="text-lg">{t('overview.features.realtime', { ns: 'solution' })}</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 p-1 rounded-full bg-[var(--accent-primary)]/10 mr-4 flex-shrink-0">
                    <ArrowRight className="h-5 w-5 text-[var(--accent-primary)]" />
                  </div>
                  <span className="text-lg">{t('overview.features.processing', { ns: 'solution' })}</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 p-1 rounded-full bg-[var(--accent-primary)]/10 mr-4 flex-shrink-0">
                    <ArrowRight className="h-5 w-5 text-[var(--accent-primary)]" />
                  </div>
                  <span className="text-lg">{t('overview.features.learning', { ns: 'solution' })}</span>
                </li>
              </ul>
              <button className="btn-secondary mt-10 px-8 py-3.5 rounded-lg font-medium">{t('overview.learnMore', { ns: 'solution' })}</button>
            </div>
            <div className="relative">
              <div className="glass-card p-10 rounded-xl shadow-xl border border-[var(--accent-primary)]/10">
                <div className="flex items-center justify-center mb-8">
                  <Brain className="h-24 w-24 text-[var(--accent-primary)] animate-pulse" />
                </div>
                <div className="space-y-6">
                  <div className="h-3 bg-[var(--accent-primary)]/20 rounded-full animate-pulse"></div>
                  <div className="h-3 bg-[var(--accent-primary)]/20 rounded-full animate-pulse w-4/5"></div>
                  <div className="h-3 bg-[var(--accent-primary)]/20 rounded-full animate-pulse w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-[var(--background-secondary)]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Key Benefits</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Discover how TechnicIA transforms maintenance operations across industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 rounded-xl shadow-lg border border-[var(--accent-primary)]/10 fade-in"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`h-16 w-16 rounded-lg bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-6 shadow-lg p-3.5`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  {t(`${benefit.key}.title`, { ns: 'benefits' })}
                </h3>
                <p className="text-[var(--text-secondary)] text-lg">
                  {t(`${benefit.key}.description`, { ns: 'benefits' })}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Adaptability */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t('industries.title', { ns: 'solution' })}</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              {t('industries.subtitle', { ns: 'solution' })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <motion.div
                key={industry.id}
                className={`glass-card p-8 rounded-xl cursor-pointer transition-all duration-300 border border-[var(--accent-primary)]/10 shadow-lg ${
                  expandedIndustry === industry.id ? 'shadow-xl scale-105 border-[var(--accent-primary)]/30' : ''
                }`}
                whileHover={{ y: -5 }}
                onClick={() => setExpandedIndustry(
                  expandedIndustry === industry.id ? null : industry.id
                )}
              >
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center mr-4">
                    {industry.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{t(`industries.${industry.id}.title`, { ns: 'solution' })}</h3>
                </div>
                <p className="text-[var(--text-secondary)] mb-6 text-lg">{t(`industries.${industry.id}.description`, { ns: 'solution' })}</p>
                {expandedIndustry === industry.id && (
                  <motion.ul 
                    className="space-y-3 mt-6 text-[var(--text-secondary)]"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {industry.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-[var(--accent-primary)] mr-3 flex-shrink-0" />
                        <span className="text-[var(--text-primary)]">
                          {t(`industries.${industry.id}.benefits.${index}`, { ns: 'solution' })}
                        </span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-24 bg-[var(--background-secondary)]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">{t('process.title', { ns: 'solution' })}</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--accent-primary)]/20"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="glass-card p-8 rounded-xl relative fade-in shadow-lg border border-[var(--accent-primary)]/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2
                                h-10 w-10 rounded-full bg-[var(--accent-primary)] 
                                flex items-center justify-center text-white font-bold shadow-lg">
                    {step.id}
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">{t(`process.steps.${step.id}.title`, { ns: 'solution' })}</h3>
                    <p className="text-[var(--text-secondary)] text-lg">{t(`process.steps.${step.id}.description`, { ns: 'solution' })}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-primary)] to-[var(--background-secondary)]"></div>
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
            {t('cta.title', { ns: 'solution' })}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-3xl mx-auto">
            Get started with TechnicIA today and transform your maintenance operations
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
            <button className="bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white font-medium py-4 px-8 rounded-lg transition-colors duration-300 text-lg shadow-lg hover:shadow-xl">
              {t('cta.demo', { ns: 'solution' })}
            </button>
            <button className="bg-transparent border-2 border-[var(--accent-primary)] text-[var(--text-primary)] font-medium py-4 px-8 rounded-lg hover:bg-[var(--accent-primary)]/10 transition-colors duration-300 text-lg">
              {t('cta.consultation', { ns: 'solution' })}
            </button>
          </div>
          <blockquote className="mt-16 text-[var(--text-secondary)] max-w-2xl mx-auto italic text-lg">
            "{t('cta.testimonial', { ns: 'solution' })}"
          </blockquote>
        </div>
      </section>
    </div>
  );
}