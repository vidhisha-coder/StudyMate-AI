// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 1. Theme Mode (light / dark)
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'light';
  });

  // 2. Theme Color (indigo, emerald, blue, rose)
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('themeColor') || 'indigo';
  });

  // 3. Font Size (small, medium, large)
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || 'medium';
  });

  // Apply Dark Mode Class to HTML Tag
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Apply Theme Accent Colors via CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', themeColor);
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  // Apply Font Size Class/Attribute
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-font-size', fontSize);
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        themeColor,
        setThemeColor,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);