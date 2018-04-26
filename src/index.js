import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as actions from './store/actions/index';
import photosReducer from './store/reducers/photos';
import authReducer from './store/reducers/auth';
import usersReducer from './store/reducers/users';

import registerServiceWorker from './registerServiceWorker';
import App from './App';

const rootReducer = combineReducers({
  photos: photosReducer,
  auth: authReducer,
  users: usersReducer
});

const store = createStore(
  rootReducer, 
  compose(applyMiddleware(thunk))
);

store.dispatch(actions.verifyAuth());

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

