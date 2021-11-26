import { createAction } from '@ngrx/store';

export const NAVIGATION_OPEN = '[Navigation] Open';
export const NAVIGATION_CLOSE = '[Navigation] Close';
export const NAVIGATION_TOGGLE = '[Navigation] Toggle';

export const open = createAction(NAVIGATION_OPEN);
export const close = createAction(NAVIGATION_CLOSE);
export const toggle = createAction(NAVIGATION_TOGGLE);
