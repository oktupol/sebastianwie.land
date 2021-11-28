import { createReducer, on } from '@ngrx/store';
import { reset, storeInputs } from '../actions/contact-form.actions';

export const FEATURE = 'contactForm';

export interface State {
  subject: string | null;
  fromName: string | null;
  fromEmail: string | null;
  message: string | null;
}

const initialState: State = {
  subject: null,
  fromName: null,
  fromEmail: null,
  message: null,
};

export const reducer = createReducer(
  initialState,
  on(storeInputs, (state, { subject, fromName, fromEmail, message }) => ({ ...state, subject, fromName, fromEmail, message })),
  on(reset, (state) => ({ ...state, ...initialState })),
);
