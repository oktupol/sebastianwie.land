import { createAction, props } from '@ngrx/store';

export const OPENPGP_LOAD_PUBLIC_KEY = '[OpenPGP] Load Public Key';
export const OPENPGP_LOAD_PUBLIC_KEY_SUCCESS = '[OpenPGP] Load Public Key Success';
export const OPENPGP_LOAD_PUBLIC_KEY_FAILURE = '[OpenPGP] Load Public Key Failure';

export const loadPublicKey = createAction(OPENPGP_LOAD_PUBLIC_KEY);
export const loadPublicKeySuccess = createAction(
  OPENPGP_LOAD_PUBLIC_KEY_SUCCESS,
  props<{ publicKey: string }>()
);
export const loadPublicKeyFailure = createAction(
  OPENPGP_LOAD_PUBLIC_KEY_FAILURE,
  props<{ error: any }>()
);
