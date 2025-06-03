import React, {useReducer} from "react";
import CartContext from "./CartContext";

const cartDefault={
    cart:[],
}

const cartReducer=(state,action)=>{
    if(action.type==="add")
    {
      const existingItemIndex = state.cart.findIndex(item => item.title === action.item.title);
    let updatedCart;

    if (existingItemIndex !== -1) {
      const existingItem = state.cart[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity
      };

      updatedCart = [...state.cart];
      updatedCart[existingItemIndex] = updatedItem;
    } else {
      updatedCart = [...state.cart, action.item];
    }
      return {
        cart:updatedCart
      }
    }
    return state
}

const CartProvider=(props)=>{
    const [cartState, dispatchCart]=useReducer(cartReducer,cartDefault);
    const addItemToCartHandler=(product)=>{
        const item={
            title:product.title,
            price:product.price,
            imageUrl:product.imageUrl,
            quantity:1
        }
        dispatchCart({type:"add", item:item});
        
    }
    const cartContext={
        cart:cartState.cart,
        addToCart:addItemToCartHandler
    }
    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider;