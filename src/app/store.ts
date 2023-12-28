import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

const languageReducer = (state = 'en', action: { type: string; payload: string }) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  language: languageReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
