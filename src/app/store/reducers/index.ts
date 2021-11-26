import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTitle from './title.reducer';
import * as fromNavigation from './navigation.reducer';

export interface State {
  [fromTitle.FEATURE]: fromTitle.State;
  [fromNavigation.FEATURE]: fromNavigation.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromTitle.FEATURE]: fromTitle.reducer,
  [fromNavigation.FEATURE]: fromNavigation.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
