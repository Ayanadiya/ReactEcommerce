import React, {useState} from 'react';
import './App.css';
import Header from './components/Layout/Header';
import HeaderBody from './components/Layout/HeaderBody';
import Product from './components/Store/Product';

function App() {
  const [home, setHome]=useState(false);
  const [store, setStore]=useState(true);
  const [about, setAbout]=useState(false);
  return (
    <div className="App">
      <Header isStore={store} />
      {!home && <HeaderBody/>}
      {store && <Product/>}
    </div>
  );
}

export default App;
