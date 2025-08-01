// Dark Souls inspired theme for "Git Gud or Die"
export const theme = {
  colors: {
    // Primary colors
    primary: '#0a0a0a',        // Darkest background
    primaryDark: '#1a1a1a',    // Dark background
    primaryLight: '#2a2a2a',   // Lighter dark background
    
    // Secondary colors
    secondary: '#ff0000',      // Red - danger/death
    secondaryLight: '#ff6b35', // Orange - warning
    secondaryDark: '#cc0000',  // Darker red
    
    // Accent colors
    accent: '#ffd700',         // Gold - success/achievement
    accentLight: '#ffe066',    // Light gold
    accentDark: '#ccac00',     // Dark gold
    
    // Text colors
    text: '#e0e0e0',           // Light text
    textDim: '#888888',        // Dimmed text
    textDark: '#666666',       // Darker text
    
    // Status colors
    success: '#00ff00',        // Green - completed tasks
    warning: '#ffaa00',        // Yellow - approaching deadline
    error: '#ff0000',          // Red - missed deadline/death
    
    // UI colors
    border: '#333333',         // Border color
    overlay: 'rgba(0, 0, 0, 0.8)', // Overlay for modals
    shadow: 'rgba(0, 0, 0, 0.5)',  // Shadow color
  },
  
  typography: {
    fontFamily: {
      terminal: 'Courier New',
      gaming: 'Arial',
      system: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  // Common style combinations
  styles: {
    container: {
      flex: 1,
      backgroundColor: '#1a1a1a',
    },
    card: {
      backgroundColor: '#2a2a2a',
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: '#333333',
    },
    button: {
      primary: {
        backgroundColor: '#ff0000',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      secondary: {
        backgroundColor: '#2a2a2a',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ff0000',
      },
    },
    text: {
      title: {
        color: '#e0e0e0',
        fontSize: 24,
        fontWeight: '700',
      },
      subtitle: {
        color: '#888888',
        fontSize: 16,
        fontWeight: '500',
      },
      body: {
        color: '#e0e0e0',
        fontSize: 16,
        fontWeight: '400',
      },
      caption: {
        color: '#888888',
        fontSize: 14,
        fontWeight: '400',
      },
    },
  },
} as const;

// Type for theme
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeTypography = typeof theme.typography; 