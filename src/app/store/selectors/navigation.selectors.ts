import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNavigation from '../reducers/navigation.reducer';

export const getNavigationState = createFeatureSelector<fromNavigation.State>(fromNavigation.FEATURE);
export const isOpen = createSelector(getNavigationState, (state) => state.open);
