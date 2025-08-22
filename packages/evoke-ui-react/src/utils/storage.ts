import type { StoredThemePreference } from '../types';

/**
 * Storage Utilities
 * Safe localStorage operations with error handling for theme preferences
 * Handles private/incognito mode gracefully
 */

/**
 * Default storage key for theme preferences
 */
export const DEFAULT_STORAGE_KEY = 'evoke-ui-theme';

/**
 * Check if localStorage is available
 * @returns True if localStorage is available and functional
 */
export function isStorageAvailable(): boolean {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return false;
  }

  try {
    const testKey = '__evoke_ui_storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get stored theme preference
 * @param key - Storage key (optional, uses default if not provided)
 * @returns Stored theme preference or null if not found/error
 */
export function getStoredTheme(key: string = DEFAULT_STORAGE_KEY): StoredThemePreference | null {
  if (!isStorageAvailable()) {
    return null;
  }

  try {
    const stored = localStorage.getItem(key);
    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as StoredThemePreference;
    
    // Validate the stored data structure
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof parsed.theme === 'string' &&
      typeof parsed.timestamp === 'number'
    ) {
      return parsed;
    }
    
    // Invalid data, clean it up
    localStorage.removeItem(key);
    return null;
  } catch (error) {
    console.warn('Failed to retrieve stored theme preference:', error);
    return null;
  }
}

/**
 * Store theme preference
 * @param theme - Theme name to store
 * @param key - Storage key (optional, uses default if not provided)
 * @param systemPreference - Current system preference (optional)
 * @returns True if successfully stored
 */
export function setStoredTheme(
  theme: string,
  key: string = DEFAULT_STORAGE_KEY,
  systemPreference?: 'light' | 'dark'
): boolean {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    const preference: StoredThemePreference = {
      theme,
      timestamp: Date.now(),
      systemPreference,
    };

    localStorage.setItem(key, JSON.stringify(preference));
    return true;
  } catch (error) {
    console.warn('Failed to store theme preference:', error);
    return false;
  }
}

/**
 * Clear stored theme preference
 * @param key - Storage key (optional, uses default if not provided)
 * @returns True if successfully cleared or didn't exist
 */
export function clearStoredTheme(key: string = DEFAULT_STORAGE_KEY): boolean {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn('Failed to clear stored theme preference:', error);
    return false;
  }
}

/**
 * Get the age of the stored theme preference in milliseconds
 * @param key - Storage key (optional, uses default if not provided)
 * @returns Age in milliseconds or null if not found
 */
export function getStoredThemeAge(key: string = DEFAULT_STORAGE_KEY): number | null {
  const stored = getStoredTheme(key);
  if (!stored) {
    return null;
  }

  return Date.now() - stored.timestamp;
}

/**
 * Check if stored theme preference is stale
 * @param key - Storage key (optional, uses default if not provided)
 * @param maxAge - Maximum age in milliseconds (default: 30 days)
 * @returns True if preference is stale or doesn't exist
 */
export function isStoredThemeStale(
  key: string = DEFAULT_STORAGE_KEY,
  maxAge: number = 30 * 24 * 60 * 60 * 1000 // 30 days
): boolean {
  const age = getStoredThemeAge(key);
  if (age === null) {
    return true;
  }

  return age > maxAge;
}

/**
 * Migrate old theme storage format if needed
 * @param key - Storage key (optional, uses default if not provided)
 * @returns True if migration was performed or not needed
 */
export function migrateStoredTheme(key: string = DEFAULT_STORAGE_KEY): boolean {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    const stored = localStorage.getItem(key);
    if (!stored) {
      return true; // No migration needed
    }

    // If it's just a string (old format), migrate it
    if (typeof stored === 'string' && !stored.startsWith('{')) {
      const theme = stored;
      const preference: StoredThemePreference = {
        theme,
        timestamp: Date.now(),
      };
      
      localStorage.setItem(key, JSON.stringify(preference));
      return true;
    }

    // Already in new format or will be handled by getStoredTheme validation
    return true;
  } catch (error) {
    console.warn('Failed to migrate stored theme preference:', error);
    return false;
  }
}

/**
 * Get available storage space (if possible)
 * @returns Approximate available storage in bytes or null if unknown
 */
export function getStorageQuota(): number | null {
  if (typeof navigator === 'undefined' || !navigator.storage?.estimate) {
    return null;
  }

  // This is async in real implementation, but we'll keep it simple for now
  // In production, you might want to cache this value
  return null;
}

/**
 * Clean up old theme preferences
 * @param maxAge - Maximum age to keep (default: 90 days)
 * @param keyPattern - Pattern to match storage keys (default: matches evoke-ui keys)
 */
export function cleanupOldThemePreferences(
  maxAge: number = 90 * 24 * 60 * 60 * 1000, // 90 days
  keyPattern: RegExp = /^evoke-ui-theme/
): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    const keysToRemove: string[] = [];
    
    // Iterate through localStorage keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !keyPattern.test(key)) {
        continue;
      }

      if (isStoredThemeStale(key, maxAge)) {
        keysToRemove.push(key);
      }
    }

    // Remove stale keys
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });

    if (keysToRemove.length > 0) {
      // eslint-disable-next-line no-console
      console.log(`Cleaned up ${keysToRemove.length} stale theme preferences`);
    }
  } catch (error) {
    console.warn('Failed to clean up old theme preferences:', error);
  }
}