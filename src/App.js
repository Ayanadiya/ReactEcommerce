import React, {useState} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
  const [showCart, setShowCart]=useState(false);

   const showCartHandler=()=>{
    setShowCart(prev=>!prev);
  }

  const router= createBrowserRouter([
    {path:"/", element:(
      <>
      <Header onClick={showCartHandler} />
      <Home />
      <Footer/>
      </>
    )},
    {path:"/store", element:(
      <>
      <Header onClick={showCartHandler} />
      <HeaderBody />
      <Product onClick={showCartHandler}/>
      {showCart && <Cart showCart={showCart} onClick={showCartHandler} />}
      <Footer/>
      </>
    )},
    {path:"/about", element:(
      <>
      <Header onClick={showCartHandler} />
      <HeaderBody/>
      <About/>
      <Footer/>
      </>
    ) },
  ])

  return (
    <div className="App">
      <CartProvider>
      <RouterProvider router={router}/>
      </CartProvider>
    </div>
  );
}

export default App;
