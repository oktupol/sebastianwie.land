import { createAction, props } from '@ngrx/store';
import { GlobalMessage } from 'src/app/shared/interfaces/global-message';

export const GLOBAL_MESSAGES_ADD = '[Global Messages] Add';
export const GLOBAL_MESSAGES_REMOVE = '[Global Messages] Remove';

export const add = createAction(
  GLOBAL_MESSAGES_ADD,
  props<{ message: GlobalMessage }>()
);
export const remove = createAction(
  GLOBAL_MESSAGES_REMOVE,
  props<{ index: number }>()
);
