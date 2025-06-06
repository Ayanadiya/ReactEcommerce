import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/Header';
import HeaderBody from './components/Layout/HeaderBody';
import Product from './components/Store/Product';
import Footer from './components/Layout/Footer';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import About from './components/About/About';
import CartProvider from './store/CartProvider';
import Contact from './components/Contact/Contact';
import ProductPage from './components/Store/ProductPage';

function App() {
  const [showCart, setShowCart]=useState(false);

   const showCartHandler=()=>{
    setShowCart(prev=>!prev);
  }


  return (
    <div className="App">
      <CartProvider>
      <Router>
      <Header onClick={showCartHandler} />
      <Switch>
      <Route exact path="/">
      <Home/>
      </Route>
      <Route path="/store">
      <HeaderBody />
      <Product onClick={showCartHandler}/>
      {showCart && <Cart showCart={showCart} onClick={showCartHandler} />}
      </Route>
      <Route path="/about">
      <HeaderBody/>
      <About/>
      </Route>
      <Route path="/contact">
      <Contact/>
      </Route>
      <Route path="product/:productId">
      <ProductPage/>
      </Route>
       </Switch>
      <Footer />
      </Router>
      </CartProvider>
    </div>
  );
}

export default App;
