import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTitle from './title.reducer';

export interface State {
  [fromTitle.FEATURE]: fromTitle.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromTitle.FEATURE]: fromTitle.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
