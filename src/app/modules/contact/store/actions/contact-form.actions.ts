import { createAction, props } from '@ngrx/store';
import { StoreMessage } from '../../interfaces/message';

export const CONTACT_FORM_STORE_INPUTS = '[Contact Form] Store Inputs';
export const CONTACT_FORM_RESET = '[Contact Form] Reset';
export const CONTACT_FORM_SEND = '[Contact Form] Send';
export const CONTACT_FORM_SEND_SUCCESS = '[Contact Form] Send Success';
export const CONTACT_FORM_SEND_FAILURE = '[Contact Form] Send Failure';

export const storeInputs = createAction(
  CONTACT_FORM_STORE_INPUTS,
  props<StoreMessage>()
);
export const reset = createAction(CONTACT_FORM_RESET);
export const send = createAction(CONTACT_FORM_SEND, props<{ encryptedMsg: string, messageId: string }>());
export const sendSuccess = createAction(CONTACT_FORM_SEND_SUCCESS);
export const sendFailure = createAction(CONTACT_FORM_SEND_FAILURE, props<{ error: any }>());
