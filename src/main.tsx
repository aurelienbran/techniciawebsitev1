import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import LoadingScreen from './components/LoadingScreen';
import './i18n';
import './index.css';
import './styles/animations.css';
import './styles/loading.css';

// Wait for translations to load before rendering
import i18next from 'i18next';

i18next.loadNamespaces(['common', 'home', 'solution', 'about', 'demo', 'contact']).then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Suspense fallback={<LoadingScreen />}>
        <App />
      </Suspense>
    </StrictMode>
  );
});