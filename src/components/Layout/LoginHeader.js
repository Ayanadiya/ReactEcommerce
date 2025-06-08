import { NavLink } from "react-router-dom";
import classes from "./Header.module.css"

const LoginHeader=()=>{
    return(
        <header className={classes.header}>
            <NavLink to="/login" className={classes.link} activeClassName={classes.active}>Login</NavLink>
        </header>
    )
}

export default LoginHeader;