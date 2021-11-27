import { createAction, props } from '@ngrx/store';
import { Position } from 'src/app/util/types';

export const TITLE_SET_POSITION = '[Title] Set Position';
export const TITLE_ACTIVATE = '[Title] Activate';
export const TITLE_ACTIVATE_SUCCESS = '[Title] Activate success'
export const TITLE_ACTIVATE_FAILURE = '[Title] Activate failure'

export const setPosition = createAction(
  TITLE_SET_POSITION,
  props<{position: Position}>()
);

export const activate = createAction(TITLE_ACTIVATE);
export const activateSuccess = createAction(TITLE_ACTIVATE_SUCCESS);
export const activateFailure = createAction(TITLE_ACTIVATE_FAILURE);
