import React from 'react';
import {store} from './src/store/store.ts';
import {Provider} from 'react-redux';
import Router from './src/routes/Router';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
