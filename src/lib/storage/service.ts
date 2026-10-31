export interface StorageService {
  getItem<T>(key: string, defaultValue: T): T;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
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
      console.warn("[StorageService] Could not persist to localStorage:", e);
    }
  }

  removeItem(key: string): void {
    if (!this.isAvailable()) return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn("[StorageService] Could not remove key from localStorage:", e);
    }
  }

  clear(): void {
    if (!this.isAvailable()) return;
    try {
      window.localStorage.clear();
    } catch (e) {
      console.warn("[StorageService] Could not clear localStorage:", e);
    }
  }
}

export const storageService = new LocalStorageService();
