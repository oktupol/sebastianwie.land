import { createReducer, on } from '@ngrx/store';
import * as openPgpActions from '../actions/openpgp.actions';

export const FEATURE = 'openpgp';

export interface State {
  loading: boolean,
  publicKey: string | null;
  error: any | null;
};

export const initialState: State = {
  loading: false,
  publicKey: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(openPgpActions.loadPublicKey, (state) => ({ ...state, loading: true, error: initialState.error })),
  on(openPgpActions.loadPublicKeySuccess, (state, { publicKey }) => ({ ...state, loading: false, publicKey, error: initialState.error })),
  on(openPgpActions.loadPublicKeyFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
