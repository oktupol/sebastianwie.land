import { createFeatureSelector } from '@ngrx/store';
import { ContactState, FEATURE_MODULE } from '../reducer';

export const getContactState = createFeatureSelector<ContactState>(FEATURE_MODULE);
