import { createReducer, on } from '@ngrx/store';
import * as navigationActions from '../actions/navigation.actions';

export const FEATURE = 'navigation';

export interface State {
  open: boolean;
}

export const initialState: State = {
  open: false,
};

export const reducer = createReducer(
  initialState,
  on(navigationActions.open, (state) => ({ ...state, open: true })),
  on(navigationActions.close, (state) => ({ ...state, open: false })),
  on(navigationActions.toggle, (state) => ({...state, open: !state.open})),
)
