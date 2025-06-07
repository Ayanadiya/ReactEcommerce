import React, { useState, useContext } from 'react';
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
import AuthContext from '../store/AuthContext';


function AppRouter() {
  const authctx=useContext(AuthContext)
  //const location = useLocation();
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => setShowCart(prev => !prev);
  const islogged=authctx.isLoggedIn

  // const isInitialPage = location.pathname === '/' || location.pathname === '/signUp' || location.pathname==='/login';

  return (
    <>
      {!islogged ? <LoginHeader /> : <Header onClick={showCartHandler} />}

      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/signUp">
          <SignUpForm />
        </Route>
        <Route path="/login">
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
