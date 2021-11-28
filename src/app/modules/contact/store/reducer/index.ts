import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../../../store/reducers/index';
import * as fromOpenPgp from './openpgp.reducer';

export const FEATURE_MODULE = 'contact';

export interface ContactState {
  [fromOpenPgp.FEATURE]: fromOpenPgp.State
};

export interface State extends fromRoot.State {
  [FEATURE_MODULE]: ContactState
}

export const reducers: ActionReducerMap<ContactState> = {
  [fromOpenPgp.FEATURE]: fromOpenPgp.reducer,
}
