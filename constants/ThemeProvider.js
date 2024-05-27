import React, { createContext, useState, useContext } from 'react';

// Define your themes
const lightTheme = {
  textColor: 'black',
  header: {
    icon: 'black',
    title: 'black'
  },
  button: {
    text: 'black',
  },
  poster: 'black',
  inputLabel: 'black',
  loading: 'black',
  error: 'red'
};

const darkTheme = {
  backgroundColor: 'black',
  textColor: 'white',
  header: {
    icon: 'white',
    title: 'white'
  },
  button: {
    text: 'white',
  },
  poster: 'white',
  inputLabel: 'white',
  loading: 'white',
  error: 'red'
};



// Create the theme context
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// Create a theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Select the current theme based on isDarkMode
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};