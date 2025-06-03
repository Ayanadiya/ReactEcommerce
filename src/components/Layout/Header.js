import React, {useContext} from "react";
import { Button } from "react-bootstrap";
import classes from "./Header.module.css";
import CartContext from "../../store/CartContext";

const Header=(props)=>{
    const cartctx=useContext(CartContext)
    const total=cartctx.cart.reduce((total,item)=>total+item.quantity,0);
    const {isStore}=props
    return (
        <header className={classes.header}>
           <nav onClick={props.getHome}>HOME</nav>
           <nav onClick={props.getStore}>STORE</nav>
           <nav onClick={props.getAbout}>ABOUT</nav>
            {isStore && <Button onClick={props.onClick}>Cart:{total}</Button>}
        </header>
    )
}

export default Header;