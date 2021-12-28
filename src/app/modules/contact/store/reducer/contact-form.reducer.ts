import { createReducer, on } from '@ngrx/store';
import { StoreMessage } from '../../interfaces/message';
import { reset, send, sendFailure, sendSuccess, storeInputs } from '../actions/contact-form.actions';

export const FEATURE = 'contactForm';

export interface State {
  subject: string | null;
  fromName: string | null;
  fromEmail: string | null;
  message: string | null;
  requestEncryptedReply: boolean;
  encryptionPassphrase: string | null;

  sending: boolean;
  sendError: any | null;
}

const initialState: State = {
  subject: null,
  fromName: null,
  fromEmail: null,
  message: null,
  requestEncryptedReply: false,
  encryptionPassphrase: null,

  sending: false,
  sendError: null
};

export const reducer = createReducer(
  initialState,
  on(storeInputs, (state, message: StoreMessage) => ({ ...state, ...message })),
  on(reset, (state) => ({ ...state, ...initialState })),
  on(send, (state) => ({ ...state, sending: true, sendError: null })),
  on(sendSuccess, (state) => ({ ...state, sending: false, sendError: null })),
  on(sendFailure, (state, {error}) => ({ ...state, sending: false, sendError: error })),
);
