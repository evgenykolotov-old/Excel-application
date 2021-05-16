import { ActionTypes } from './types';
import { State } from '../shared/State';
import { Action } from './actions';

export type RootReducer = (state: State, action: Action) => State;

export const rootReducer: RootReducer = function(state, action) {
  switch (action.type) {
    case ActionTypes.TABLE_RESIZE: {
      const field = action.data.type === 'col' ? 'colState' : 'rowState';
      return { ...state, [field]: value(state, field, action) };
    }

    case ActionTypes.CHANGE_TEXT: {
      const field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action)
      };
    }

    case ActionTypes.CHANGE_STYLES: {
      return { ...state, currentStyles: action.data };
    }

    case ActionTypes.APPLY_STYLE: {
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

    case ActionTypes.CHANGE_TITLE:
      return {...state, title: action.data };

    case ActionTypes.UPDATE_DATE:
      return { ...state, openedDate: new Date().toJSON() };

    default: return state;
  }
}

function value(state: State, field: string, action: Action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
