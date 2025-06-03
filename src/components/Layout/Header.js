import React from "react";
import { Button } from "react-bootstrap";
import classes from "./Header.module.css"

const Header=(props)=>{
    const {isStore}=props
    return (
        <header className={classes.header}>
           <nav onClick={props.getHome}>HOME</nav>
           <nav onClick={props.getStore}>STORE</nav>
           <nav onClick={props.getAbout}>ABOUT</nav>
            {isStore && <Button onClick={props.onClick}>Cart:0</Button>}
        </header>
    )
}

export default Header;