import { createAction, props } from '@ngrx/store';
import { Position } from 'src/app/util/types';

export const TITLE_SET_POSITION = '[Title] Set Position';

export const setPosition = createAction(
  TITLE_SET_POSITION,
  props<{position: Position}>()
);
