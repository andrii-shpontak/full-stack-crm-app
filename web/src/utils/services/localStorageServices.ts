import { LocalStorageKeys } from '../enums';

export class LocalStorageService {
  public static setItem<T>(key: LocalStorageKeys, value: T): void {
    return localStorage.setItem(key, convertDataForSaveStorage(value));
  }

  public static getItem(key: LocalStorageKeys): string | null {
    return localStorage.getItem(key);
  }

  public static removeItem(key: LocalStorageKeys): void {
    localStorage.removeItem(key);
  }

  public static clear(): void {
    localStorage.clear();
  }
}

function convertDataForSaveStorage<T>(value: T): string {
  if (value === null && value === undefined) {
    return '';
  } else if (typeof value === 'string') {
    return value;
  } else {
    return JSON.stringify(value);
  }
}
