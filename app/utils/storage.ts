import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys for our app
export const STORAGE_KEYS = {
  QUESTS: 'quests',
  CHARACTER: 'character',
  SETTINGS: 'settings',
} as const;

// Test function to verify AsyncStorage is working
export const testAsyncStorage = async (): Promise<boolean> => {
  try {
    const testKey = 'test_storage';
    const testValue = 'AsyncStorage is working!';

    // Test write
    await AsyncStorage.setItem(testKey, testValue);

    // Test read
    const retrievedValue = await AsyncStorage.getItem(testKey);

    // Test delete
    await AsyncStorage.removeItem(testKey);

    // Verify the value was correct
    return retrievedValue === testValue;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('AsyncStorage test failed:', error);
    return false;
  }
};

// Generic storage functions
export const storage = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error reading from storage (${key}):`, error);
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error writing to storage (${key}):`, error);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error removing from storage (${key}):`, error);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error clearing storage:', error);
    }
  },
};
