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
    
    const login=(idtoken)=>{
        console.log(idtoken)
        setToken(token);
        setLogin(true);
    }
    const logout=()=>{
        setToken(null);
        setLogin(false);
    }
    
    const authValue={
        token:token,
        isLoggedIn:loggedin,
        login:login,
        logout:logout
    }

    return (
        <AuthContext.Provider value={authValue}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;