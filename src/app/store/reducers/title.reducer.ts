import { createReducer, on, Action } from '@ngrx/store';

import { Position } from 'src/app/util/types';
import * as titleActions from '../actions/title.actions';

export const FEATURE = 'title';

export interface State {
  position: Position;
  active: boolean;
}

export const initialState: State = {
  position: 'up',
  active: false,
};

export const reducer = createReducer(
  initialState,
  on(titleActions.setPosition, (state, {position}) => ({ ...state, position })),
  on(titleActions.activate, (state) => ({ ...state, active: true })),
  on(titleActions.activateSuccess, (state) => ({ ...state, active: false })),
  on(titleActions.activateFailure, (state) => ({ ...state, active: false })),
);

