/**
 * @file service.ts
 * @description Client-isolated storage service providing zero-PII LocalStorage persistence
 * with SSR safety checks and defensive error recovery.
 */

import { StorageError } from "@/lib/errors";

/**
 * Storage contract for persisting client state.
 */
export interface StorageService {
  /**
   * Retrieves an item from storage or returns the default value if absent or invalid.
   *
   * @param key - Storage key string
   * @param defaultValue - Fallback value if key is not found
   * @returns Deserialized object or defaultValue
   */
  getItem<T>(key: string, defaultValue: T): T;

  /**
   * Serializes and writes an item to storage.
   *
   * @param key - Storage key string
   * @param value - Value to serialize and persist
   */
  setItem<T>(key: string, value: T): void;

  /**
   * Removes a specific item from storage.
   *
   * @param key - Storage key string
   */
  removeItem(key: string): void;

  /**
   * Clears all storage keys managed by the application.
   */
  clear(): void;
}

class LocalStorageService implements StorageService {
  private isAvailable(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  }

  getItem<T>(key: string, defaultValue: T): T {
    if (!this.isAvailable()) return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return defaultValue;
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (!this.isAvailable()) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      const storageErr = new StorageError("Could not persist to localStorage", e);
      console.warn(`[StorageService] ${storageErr.message}:`, e);
    }
  }

  removeItem(key: string): void {
    if (!this.isAvailable()) return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      const storageErr = new StorageError("Could not remove key from localStorage", e);
      console.warn(`[StorageService] ${storageErr.message}:`, e);
    }
  }

  clear(): void {
    if (!this.isAvailable()) return;
    try {
      window.localStorage.clear();
    } catch (e) {
      const storageErr = new StorageError("Could not clear localStorage", e);
      console.warn(`[StorageService] ${storageErr.message}:`, e);
    }
  }
}

export const storageService: StorageService = new LocalStorageService();
