import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Routes from './routes';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>           
        <Routes />          
      </BrowserRouter> 
    </Provider>        
  );
}

export default App;
