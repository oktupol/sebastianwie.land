import { createAction, props } from '@ngrx/store';

export const CONTACT_FORM_STORE_INPUTS = '[Contact Form] Store Inputs';
export const CONTACT_FORM_RESET = '[Contact Form] Reset';

export const storeInputs = createAction(
  CONTACT_FORM_STORE_INPUTS,
  props<{ subject: string, fromName: string, fromEmail: string, message: string }>()
);

export const reset = createAction(CONTACT_FORM_RESET);
