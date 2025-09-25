'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContent {
    en: string;
    vi: string;
}

interface LanguageContextType {
    currentLanguage: 'en' | 'vi';
    setLanguage: (lang: 'en' | 'vi') => void;
    t: (content: LanguageContent) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<'en' | 'vi'>('en');

    const setLanguage = (lang: 'en' | 'vi') => {
        setCurrentLanguage(lang);
    };

    const t = (content: LanguageContent): string => {
        return content[currentLanguage] || content.en || '';
    };

    return (
        <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}