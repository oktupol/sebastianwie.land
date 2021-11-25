import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromTitle from '../reducers/title.reducer';

export const getTitleState = createFeatureSelector<fromTitle.State>(fromTitle.FEATURE);
export const getPosition = createSelector(getTitleState, (titleState) => titleState.position);
