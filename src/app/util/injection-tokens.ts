import { InjectionToken } from '@angular/core';

/**
 * The browser window, or null when running outside a browser (e.g. while
 * prerendering). Consumers must handle the null case.
 */
export const WINDOW = new InjectionToken<Window | null>('Window');
