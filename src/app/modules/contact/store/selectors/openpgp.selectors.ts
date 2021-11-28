import { createSelector } from '@ngrx/store';
import { getContactState } from '.';

export const getOpenPgpState = createSelector(getContactState, (contactState) => contactState.openpgp);

export const isLoading = createSelector(getOpenPgpState, (state) => state.loading);
export const getPublicKey = createSelector(getOpenPgpState, (state) => state.publicKey);
export const getError = createSelector(getOpenPgpState, (state) => state.error);
