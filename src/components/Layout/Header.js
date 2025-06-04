import React, {useContext} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import classes from "./Header.module.css";
import CartContext from "../../store/CartContext";

const Header=(props)=>{
    const cartctx=useContext(CartContext)
    const total=cartctx.cart.reduce((total,item)=>total+item.quantity,0);
    const location=useLocation();
    const isStorePage=location.pathname==="/store";
    return (
        <header className={classes.header}>
           <NavLink to="/">HOME</NavLink>
           <NavLink to="/store">STORE</NavLink>
           <NavLink to="/about">ABOUT</NavLink>
            {isStorePage && <Button onClick={props.onClick}>Cart:{total}</Button>}
        </header>
    )
}

export default Header;