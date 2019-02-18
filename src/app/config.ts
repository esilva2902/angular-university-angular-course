import { InjectionToken } from '@angular/core';
/**
 * This file will include our application global configuration object.
 * 
 * The final result will be of taking APP_CONFIG plain javascript object and
 * inject into the application.
 */

export interface AppConfig {
  apiUrl: string;
  courseCacheSize: number;
}

export const APP_CONFIG: AppConfig = {
  apiUrl: 'http://localhost:9000',
  courseCacheSize: 10
}

/**
 * As we did for classes we have to define a unique identifier for
 * this plain object creating an Injection Token:
 */
export const CONFIG_TOKEN = new InjectionToken<AppConfig>('CONFIG_TOKEN');