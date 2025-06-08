import { set } from "mongoose";
import React, {useState} from "react";

const AuthContext= React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
})

export const AuthProvider=(props)=>{
    const [token,setToken]=useState(null);
    const [loggedin, setLogin]=useState(false);
    
    const loginhandler=(idtoken)=>{
        console.log(idtoken)
        setToken(idtoken);
        setLogin(true);
    }
    const logout=()=>{
        setToken(null);
        setLogin(false);
    }
    
    const authValue={
        token:token,
        isLoggedIn:loggedin,
        login:loginhandler,
        logout:logout
    }

    return (
        <AuthContext.Provider value={authValue}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;