import { MD3DarkTheme } from 'react-native-paper';

const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3498db',      // Your primary color
    secondary: '#e74c3c',    // Your secondary color
    background: '#333333',   // Background color for dark mode
    text: '#ffffff',         // Text color for dark mode
    accent: '#f39c12',       // Your accent color
    success: '#27ae60',      // Success color
    error: '#c0392b',        // Error color
    warning: '#f1c40f',      // Warning color
    info: '#3498db',         // Information color
    disabled: '#bdc3c7',     // Disabled color
    customColor1: '#ff5733', // Custom color 1
    customColor2: '#9b59b6', // Custom color 2
    customColor3: '#34495e', // Custom color 3
    customColor4: '#2ecc71', // Custom color 4
    customColor5: '#d35400', // Custom color 5
  },
};

export default CustomDarkTheme;
