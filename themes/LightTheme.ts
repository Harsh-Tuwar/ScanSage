import { MD3LightTheme } from 'react-native-paper';

const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db',      // Your primary color
    secondary: '#e74c3c',    // Your secondary color
    background: '#f2f2f2',   // Your background color
    text: '#333333',         // Text color
    accent: '#f39c12',       // Your accent color
    success: '#27ae60',      // Success color
    error: '#c0392b',        // Error color
    warning: '#f1c40f',      // Warning color
    info: '#3498db',         // Information color
    disabled: '#bdc3c7',     // Disabled color
  },
};

export default CustomLightTheme;
