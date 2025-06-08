import React, {useContext} from "react";
import { useLocation,NavLink} from 'react-router-dom'
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
           <NavLink to="/home" className={classes.link} activeClassName={classes.active}>HOME</NavLink>
           <NavLink to="/store" className={classes.link} activeClassName={classes.active}>STORE</NavLink>
           <NavLink to="/about" className={classes.link} activeClassName={classes.active}>ABOUT</NavLink>
            <NavLink to="/profile" className={classes.link} activeClassName={classes.active}>PROFILE</NavLink>
           <NavLink to="/contact" className={classes.link} activeClassName={classes.active}>Contact</NavLink>
            {isStorePage && <Button onClick={props.onClick}>Cart:{total}</Button>}
        </header>
    )
}

export default Header;