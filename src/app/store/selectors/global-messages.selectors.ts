import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE, State } from '../reducers/global-messages.reducer';

export const getGlobalMessagesState = createFeatureSelector<State>(FEATURE);
export const getMessages = createSelector(getGlobalMessagesState, (state) => state.messages);
