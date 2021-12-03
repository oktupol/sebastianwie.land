import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTitle from './title.reducer';
import * as fromNavigation from './navigation.reducer';
import * as fromGlobalMessages from './global-messages.reducer';

export interface State {
  [fromTitle.FEATURE]: fromTitle.State;
  [fromNavigation.FEATURE]: fromNavigation.State;
  [fromGlobalMessages.FEATURE]: fromGlobalMessages.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromTitle.FEATURE]: fromTitle.reducer,
  [fromNavigation.FEATURE]: fromNavigation.reducer,
  [fromGlobalMessages.FEATURE]: fromGlobalMessages.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
