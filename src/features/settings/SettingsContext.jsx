import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext({});

export function SettingsProvider({ children }) {
  // Cleanup old tone setting if it exists
  useEffect(() => {
    localStorage.removeItem('appTone');
    document.documentElement.removeAttribute('data-tone');
  }, []);

  const [textSize, setTextSize] = useState(() => {
    try {
      const saved = localStorage.getItem('appTextSize');
      const valid = ['pequeno', 'mediano', 'normal', 'grande', 'muy-grande'];
      return valid.includes(saved) ? saved : 'normal';
    } catch { return 'normal'; }
  });

  const [motion, setMotion] = useState(() => {
    try {
      return localStorage.getItem('appMotion') || 'activadas';
    } catch { return 'activadas'; }
  });

  useEffect(() => {
    try {
      localStorage.setItem('appTextSize', textSize);
      document.documentElement.setAttribute('data-text-size', textSize);
    } catch (err) { console.error('Error saving text size', err); }
  }, [textSize]);

  useEffect(() => {
    try {
      localStorage.setItem('appMotion', motion);
      document.documentElement.setAttribute('data-motion', motion);
    } catch (err) { console.error('Error saving motion', err); }
  }, [motion]);

  return (
    <SettingsContext.Provider value={{ textSize, setTextSize, motion, setMotion }}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => useContext(SettingsContext);
