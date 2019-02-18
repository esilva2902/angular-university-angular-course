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
 * this plain object creating an Injection Token. Thus the plain object
 * become injectable:
 */
export const CONFIG_TOKEN = new InjectionToken<AppConfig>('CONFIG_TOKEN');

/**
 * ===> IMPORTANT:
 * 
 * If we want to make our plain object Tree-Shakeable we can do the following:
 * 
 *    export const CONFIG_TOKEN = new InjectionToken<AppConfig>('CONFIG_TOKEN', {
 *      providedIn: 'root',
 *      factory: () => APP_CONFIG
 *    });
 * 
 * It means that we have to specify that our plain object is going to be provided 
 * in application root.
 * 
 * Tree-Shakeable configuration makes our plain object not to be added to the final
 * bundle if there is not any reference to it in any of the application components. 
 */

