import React from "react";
import { Button } from "react-bootstrap";
import classes from "./Header.module.css"

const Header=(props)=>{
    const {isHome,isStore, isAbout}=props
    return (
        <header className={classes.header}>
            <h1>HOME</h1>
            <h1>STORE</h1>
            <h1>ABOUT</h1>
            {isStore && <Button>Cart:0</Button>}
        </header>
    )
}

export default Header;