import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import CartProvider from './store/CartProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className="App">
      <CartProvider>
      <Router>
      <AppRouter/>
      </Router>
      </CartProvider>
    </div>
  );
}

export default App;
