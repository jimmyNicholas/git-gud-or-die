// App constants
export const APP_NAME = 'Git Gud or Die';

// Game constants
export const CHARACTER_STATS = {
  MAX_HEALTH: 100,
  STARTING_LEVEL: 1,
} as const;

// UI constants
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Time constants (in milliseconds)
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
} as const; 