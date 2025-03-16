import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Wrench,
  Monitor,
  Network,
  Brain,
  BrainCog,
  Laptop,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import TimelineCard from '../components/TimelineCard';
import TechnologyStack from '../components/TechnologyStack';
import FutureRoadmap from '../components/FutureRoadmap';

const timelineEvents = [
  {
    icon: <Wrench className="h-6 w-6 text-white" />,
    id: 'traditional',
    year: "Pre-2000s"
  },
  {
    icon: <Monitor className="h-6 w-6 text-white" />,
    id: 'digital',
    year: "2000s"
  },
  {
    icon: <Network className="h-6 w-6 text-white" />,
    id: 'iot',
    year: "2010s"
  },
  {
    icon: <Brain className="h-6 w-6 text-white" />,
    id: 'early_ai',
    year: "2015-2020"
  },
  {
    icon: <BrainCog className="h-6 w-6 text-white" />,
    id: 'advanced_ai',
    year: "2020-2024"
  },
  {
    icon: <Laptop className="h-6 w-6 text-white" />,
    id: 'future',
    year: "2025+"
  }
];

export default function About() {
  const { t } = useTranslation('about');
  const [activeTimelineEvent, setActiveTimelineEvent] = useState(4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
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
          <div className="animate-bounce mt-12">
            <ChevronDown className="h-8 w-8 mx-auto text-[var(--accent-primary)]" />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('timeline.title')}</h2>
          <div className="grid gap-8">
            {timelineEvents.map((event, index) => (
              <TimelineCard
                key={index}
                icon={event.icon}
                title={t(`timeline.events.${event.id}.title`)}
                description={t(`timeline.events.${event.id}.description`)}
                year={event.year}
                isActive={index === activeTimelineEvent}
                onClick={() => setActiveTimelineEvent(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-[var(--background-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('technology.title')}</h2>
          <p className="text-center text-[var(--text-secondary)] mb-12">{t('technology.subtitle')}</p>
          <TechnologyStack />
        </div>
      </section>

      {/* Future Roadmap Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">{t('future.title')}</h2>
          <p className="text-[var(--text-secondary)] text-center max-w-2xl mx-auto mb-12">
            {t('future.subtitle')}
          </p>
          <FutureRoadmap />
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