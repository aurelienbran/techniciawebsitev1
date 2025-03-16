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
    icon: <Gauge className="h-6 w-6" />,
    title: 'Reduced Downtime',
    description: 'Faster diagnostics and repairs mean less equipment downtime'
  },
  {
    icon: <BanknoteIcon className="h-6 w-6" />,
    title: 'Cost Efficiency',
    description: 'Optimize maintenance operations and reduce unnecessary part replacements'
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Enhanced Safety',
    description: 'Proper procedure guidance reduces workplace accidents'
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Knowledge Retention',
    description: 'Preserve expertise even as experienced technicians retire'
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: 'Consistent Quality',
    description: 'Standardized maintenance procedures across all shifts'
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Continuous Improvement',
    description: 'System learns and adapts from each interaction'
  }
];

export default function Solution() {
  const { t } = useTranslation('solution');
  const [activeIndustry, setActiveIndustry] = useState(industries[0].id);
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-primary)] to-[var(--background-secondary)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="animate-bounce mt-12">
              <ChevronDown className="h-8 w-8 mx-auto text-[var(--accent-primary)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('overview.title')}</h2>
              <p className="text-[var(--text-secondary)] mb-6">
                {t('overview.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-[var(--accent-primary)] mr-2 flex-shrink-0" />
                  <span>{t('overview.features.realtime')}</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-[var(--accent-primary)] mr-2 flex-shrink-0" />
                  <span>{t('overview.features.processing')}</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-[var(--accent-primary)] mr-2 flex-shrink-0" />
                  <span>{t('overview.features.learning')}</span>
                </li>
              </ul>
              <button className="btn-secondary mt-8">{t('overview.learnMore')}</button>
            </div>
            <div className="relative">
              <div className="glass-card p-8">
                <div className="flex items-center justify-center">
                  <Brain className="h-16 w-16 text-[var(--accent-primary)] animate-pulse" />
                </div>
                <div className="mt-8 space-y-4">
                  <div className="h-2 bg-[var(--accent-primary)]/20 rounded animate-pulse"></div>
                  <div className="h-2 bg-[var(--accent-primary)]/20 rounded animate-pulse"></div>
                  <div className="h-2 bg-[var(--accent-primary)]/20 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[var(--background-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="glass-card p-6 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-12 w-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(`benefits.${benefit.title}.title`)}</h3>
                <p className="text-[var(--text-secondary)]">{t(`benefits.${benefit.title}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Adaptability */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('industries.title')}</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              {t('industries.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className={`glass-card p-6 cursor-pointer transition-all duration-300 ${
                  expandedIndustry === industry.id ? 'scale-105' : ''
                }`}
                onClick={() => setExpandedIndustry(
                  expandedIndustry === industry.id ? null : industry.id
                )}
              >
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center mr-4">
                    {industry.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{t(`industries.${industry.id}.title`)}</h3>
                </div>
                <p className="text-[var(--text-secondary)] mb-4">{t(`industries.${industry.id}.description`)}</p>
                {expandedIndustry === industry.id && (
                  <ul className="space-y-2 mt-4 text-[var(--text-secondary)]">
                    {industry.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-[var(--accent-primary)] mr-2" />
                        {t(`industries.${industry.id}.benefits.${index}`)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 bg-[var(--background-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('process.title')}</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--accent-primary)]/20"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="glass-card p-6 relative fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2
                                h-8 w-8 rounded-full bg-[var(--accent-primary)] 
                                flex items-center justify-center text-white font-bold">
                    {step.id}
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">{t(`process.steps.${step.id}.title`)}</h3>
                    <p className="text-[var(--text-secondary)]">{t(`process.steps.${step.id}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
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
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button className="btn-primary">{t('cta.demo')}</button>
            <button className="btn-secondary">{t('cta.consultation')}</button>
          </div>
          <blockquote className="mt-8 text-[var(--text-secondary)] max-w-2xl mx-auto italic">
            {t('cta.testimonial')}
          </blockquote>
        </div>
      </section>
    </div>
  );
}