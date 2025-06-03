import React, {useState} from 'react';
import './App.css';
import Header from './components/Layout/Header';
import HeaderBody from './components/Layout/HeaderBody';
import Product from './components/Store/Product';
import Footer from './components/Layout/Footer';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import About from './components/About/About';
import CartProvider from './store/CartProvider';

function App() {
  const [home, setHome]=useState(false);
  const [store, setStore]=useState(true);
  const [about, setAbout]=useState(false);
  const [showCart, setShowCart]=useState(false)

  const showHomeHandler=()=>{
    setHome(true);
    setStore(false);
    setAbout(false)
  }

   const showStoreHandler=()=>{
    setHome(false);
    setStore(true);
    setAbout(false)
  }

   const showAboutHandler=()=>{
    setHome(false);
    setStore(false);
    setAbout(true)
  }

  const showCartHandler=()=>{
    setShowCart(prev=>!prev);
  }
  return (
    <div className="App">
      <CartProvider>
      <Header 
      isStore={store} 
      onClick={showCartHandler} 
      getHome={showHomeHandler} 
      getStore={showStoreHandler}
      getAbout={showAboutHandler}
      />
      {!home && <HeaderBody/>}
      {store && <Product onClick={showCartHandler}/>}
      {showCart && <Cart showCart={showCart} onClick={showCartHandler} />}
      {home && <Home/>}
      {about && <About/>}
      <Footer/>
      </CartProvider>
    </div>
  );
}

export default App;
