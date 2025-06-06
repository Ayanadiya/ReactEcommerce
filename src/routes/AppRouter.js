import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../components/Layout/Header';
import HeaderBody from '../components/Layout/HeaderBody';
import Product from '../components/Store/Product';
import Footer from '../components/Layout/Footer';
import Cart from '../components/Cart/Cart';
import Home from '../components/Home/Home';
import About from '../components/About/About';
import Contact from '../components/Contact/Contact';
import ProductPage from '../components/Store/ProductPage';
import LoginHeader from '../components/Layout/LoginHeader';
import SignUpForm from '../components/User/SignUpForm';

function AppRouter() {
  const location = useLocation();
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => setShowCart(prev => !prev);

  const isInitialPage = location.pathname === '/' || location.pathname === '/signUp';

  return (
    <>
      {isInitialPage ? <LoginHeader /> : <Header onClick={showCartHandler} />}

      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/signUp">
          <SignUpForm />
        </Route>
        <Route path="/store">
          <HeaderBody />
          <Product onClick={showCartHandler} />
          {showCart && <Cart showCart={showCart} onClick={showCartHandler} />}
        </Route>
        <Route path="/about">
          <HeaderBody />
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/product/:productId">
          <ProductPage />
        </Route>
      </Switch>

      <Footer />
    </>
  );
}

export default AppRouter;
