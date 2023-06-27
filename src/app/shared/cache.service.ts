import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor() { }

  /**
   * Request to save data in localStorage
   * @param key is the key of value to save
   * @param value is the value to save
   */
  saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * Request to retrieve data from localStorage
   * @param key is the key of value to retrieve
   */
  getData(key: string): string {
    return localStorage.getItem(key) ?? '';
  }
}
