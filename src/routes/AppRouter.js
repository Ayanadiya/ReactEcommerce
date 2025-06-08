import React, { useState} from 'react';
import { Route, Switch} from 'react-router-dom';
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
import Profile from '../components/Profile/Profile';


function AppRouter() {
  
  
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => setShowCart(prev => !prev);
  const islogged=localStorage.getItem('token')

 
  return (
    <>
      {!islogged ? <LoginHeader /> : <Header onClick={showCartHandler} />}

      <Switch>
       { islogged &&<Route exact path="/">
          <Home />
        </Route>}
        <Route path="/signUp">
          <SignUpForm />
        </Route>
        <Route path="/login">
        <SignUpForm />
        </Route>
        {islogged &&<Route path="/store">
          <HeaderBody />
          <Product onClick={showCartHandler} />
          {showCart && <Cart showCart={showCart} onClick={showCartHandler} />}
        </Route>}
        {islogged &&<Route path="/about">
          <HeaderBody />
          <About />
        </Route>}
        {islogged &&<Route path="/contact">
          <Contact />
        </Route>}
        {islogged &&<Route path="/product/:productId">
          <ProductPage />
        </Route>}
        {islogged &&<Route path="/profile">
          <Profile />
        </Route>}
      </Switch>

      <Footer />
    </>
  );
}

export default AppRouter;
