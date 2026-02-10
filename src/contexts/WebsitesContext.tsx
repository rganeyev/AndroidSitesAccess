import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Website {
  url: string;
  icon: string;
}

interface WebsitesContextProps {
  websites: Website[];
  addWebsite: (newUrl: string, selectedIcon: string) => void;
  removeWebsite: (idToRemove: string) => void;
}

const initialWebsites: Website[] = [
  { url: 'https://rganeyev.github.io/kids-finance/', icon: 'finance' },
  { url: 'https://chehmet.github.io/EminGames/', icon: 'game' },
];

const WebsitesContext = createContext<WebsitesContextProps>({
  websites: initialWebsites,
  addWebsite: () => {},
  removeWebsite: () => {},
});

const saveWebsites = async (newWebsites: Website[]) => {
  try {
    const jsonValue = JSON.stringify(newWebsites);
    await AsyncStorage.setItem('websites', jsonValue);
  } catch (error) {
    console.error('Error saving websites:', error);
  }
};

export const WebsitesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [websites, setWebsites] = useState<Website[]>(initialWebsites);

  const loadWebsites = async () => {
    try {
      const savedWebsites = await AsyncStorage.getItem('websites');
      if (savedWebsites === null) {
        setWebsites(initialWebsites);
        await saveWebsites(initialWebsites);
      } else {
        setWebsites(JSON.parse(savedWebsites));
      }
    } catch (error) {
      console.error('Error loading websites:', error);
    }
  };

  useEffect(() => {
    loadWebsites();
  }, []);

  const addWebsite = (newUrl: string, selectedIcon: string) => {
    let urlToAdd = newUrl.trim().toLowerCase();
    if (urlToAdd === '') {
      Alert.alert('Oops!', 'Please enter a website address.');
      return;
    }
    if (!urlToAdd.startsWith('http')) {
      urlToAdd = 'https://' + urlToAdd;
    }
    const isFile = urlToAdd.split('/').pop()?.includes('.') || false;
    if (!isFile && !urlToAdd.endsWith('/')) {
      urlToAdd += '/';
    }

    const newWebsite: Website = {
      url: urlToAdd,
      icon: selectedIcon,
    };
    const updatedWebsites = [...websites, newWebsite];
    setWebsites(updatedWebsites);
    saveWebsites(updatedWebsites);
  };

  const removeWebsite = (url: string) => {
    const updatedWebsites = websites.filter((site) => site.url !== url);
    setWebsites(updatedWebsites);
    saveWebsites(updatedWebsites);
  };

  return (
    <WebsitesContext.Provider value={{ websites, addWebsite, removeWebsite }}>
      {children}
    </WebsitesContext.Provider>
  );
};

export const useWebsites = (): WebsitesContextProps => {
  const context = useContext(WebsitesContext);
  if (!context) {
    throw new Error('useWebsites must be used within a WebsitesProvider');
  }
  return context;
};
