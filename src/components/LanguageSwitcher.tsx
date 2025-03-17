import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('en')}
        className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
          language === 'en' ? 'border-[#D4AF37] scale-110' : 'border-transparent hover:border-gray-300'
        }`}
        title="English"
      >
        <img
          src="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/gb.svg"
          alt="English"
          className="w-full h-full object-cover"
        />
      </button>
      <button
        onClick={() => setLanguage('el')}
        className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
          language === 'el' ? 'border-[#D4AF37] scale-110' : 'border-transparent hover:border-gray-300'
        }`}
        title="Ελληνικά"
      >
        <img
          src="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/gr.svg"
          alt="Ελληνικά"
          className="w-full h-full object-cover"
        />
      </button>
      <button
        onClick={() => setLanguage('tr')}
        className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
          language === 'tr' ? 'border-[#D4AF37] scale-110' : 'border-transparent hover:border-gray-300'
        }`}
        title="Türkçe"
      >
        <img
          src="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/tr.svg"
          alt="Türkçe"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};

export default LanguageSwitcher; 