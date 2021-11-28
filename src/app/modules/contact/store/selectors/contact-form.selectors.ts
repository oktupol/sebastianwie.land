import { createSelector } from '@ngrx/store';
import { getContactState } from '.';

export const getContactFormState = createSelector(getContactState, (state) => state.contactForm);

export const getContactFormInputs = createSelector(getContactFormState, ({ subject, fromName, fromEmail, message }) => ({ subject, fromName, fromEmail, message }));
