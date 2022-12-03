import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HMSRoomProvider } from '@100mslive/react-sdk';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import cartReducer from './components/reducers/cartReducers';

const store = createStore(cartReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HMSRoomProvider>
    <Provider store={store}>
      <App />
      </Provider>
    </HMSRoomProvider>
  </React.StrictMode>
);