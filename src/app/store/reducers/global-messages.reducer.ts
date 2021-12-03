import { createReducer, on } from '@ngrx/store';
import { GlobalMessage } from 'src/app/shared/interfaces/global-message';
import { add, remove } from '../actions/global-messages.actions';

export const FEATURE = 'globalMessages';

export interface State {
  messages: GlobalMessage[];
}

export const initialState: State = {
  messages: [],
};

export const reducer = createReducer(
  initialState,

  on(add, (state, { message }) => {
    const messages = [...state.messages];
    messages.push(message);
    return { ...state, messages };
  }),

  on(remove, (state, { index }) => {
    const messages = [...state.messages];
    messages.splice(index, 1);
    return { ...state, messages };
  }),
);
