import { Form, Button, Container } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import AuthContext from "../../store/AuthContext";



const SignUpForm=()=>{
    const authctx=useContext(AuthContext);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    const location=useLocation();
    const isLogin= location.pathname==='/login';
    const title=isLogin?'Login': 'Sign Up';
    const endpoint=isLogin?"http://127.0.0.1:4000/myshop/user/login":"http://127.0.0.1:4000/myshop/user/signUp";
    const path= isLogin?"/signUp":"/login";
    const linkName= isLogin?"Get Signup": "Login";

    const emailChangeHandler=e=>setEmail(e.target.value);
    const passwordChangeHandler=e=>setPassword(e.target.value);

    const formSubmitHandler= async (event)=>{
        event.preventDefault();
        const user={
            email,
            password
        }
       try {
        const response=await fetch(endpoint,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user),
        });
        const data=await response.json();
        alert(data.message);
        localStorage.setItem("token",data.token);
        if(response.status===200)
        {
            authctx.login(data.token);
            window.location='/home';
        }
       } catch (error) {
        console.log(error);
       }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Form
            className="p-4 border rounded shadow-sm bg-white"
                style={{minwidth:'300px', maxWidth:'400px', width:'100%'}}
            >
                <h3 className="text-center mb-4">{title}</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={emailChangeHandler} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="mb-4">Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={passwordChangeHandler} />
                </Form.Group>
                <Button className="w-100" type="submit" onClick={formSubmitHandler}>Submit</Button>
                <NavLink to={path} >{linkName}</NavLink>
            </Form>
        </Container>    
    )
}

export default SignUpForm;