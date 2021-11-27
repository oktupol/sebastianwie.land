import { createReducer, on, Action } from '@ngrx/store';

import { Position } from 'src/app/util/types';
import * as titleActions from '../actions/title.actions';

export const FEATURE = 'title';

export interface State {
  position: Position;
}

export const initialState: State = {
  position: 'up',
};

export const reducer = createReducer(
  initialState,
  on(titleActions.setPosition, (state, {position}) => ({ ...state, position })),
);

