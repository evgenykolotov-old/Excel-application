import * as actions from './types';
import { State } from '../shared/State';
import { ActionData } from './actions';

export type RootReducer = (state: State, action: ActionData) => State;

export const rootReducer: RootReducer = function(state, action) {
  switch (action.type) {
    case actions.TABLE_RESIZE: {
      const field = action.data.type === 'col' ? 'colState' : 'rowState';
      return { ...state, [field]: value(state, field, action) };
    }

    case actions.CHANGE_TEXT: {
      const field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action)
      };
    }

    case actions.CHANGE_STYLES: {
      return { ...state, currentStyles: action.data };
    }

    case actions.APPLY_STYLE: {
      const field = 'stylesState';
      const val = state[field] || {};
      action.data.ids.forEach((id: string) => {
        val[id] = { ...val[id], ...action.data.value };
      });
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value }
      };
    }

    case actions.CHANGE_TITLE:
      return {...state, title: action.data };

    case actions.UPDATE_DATE:
      return { ...state, openedDate: new Date().toJSON() };

    default: return state;
  }
}

function value(state: State, field: string, action: ActionData) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
