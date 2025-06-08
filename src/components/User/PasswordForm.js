import React,{useState, useContext} from "react";
import {Form, Button, Container} from 'react-bootstrap';
import AuthContext from "../../store/AuthContext";

const PasswordForm=()=>{
    const authctx=useContext(AuthContext);
    const [password, setPassword]=useState('');

    const passwordChangeHandler=e=>setPassword(e.target.value);

    const formSubmitHandler= async()=>{
        try {
            const response= await fetch("http://127.0.0.1:4000/myshop/user/update/password",{
                method:"Post",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${authctx.token}`
                },
                body:JSON.stringify({password:password})
            });
            if(!response.ok)
            {
                throw new Error('Response was not ok');
            }
            const data=await response.json();
            alert(data.message);
            authctx.login(data.token);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Form className="p-4 border rounded shadow-sm bg-white"
                style={{minwidth:'300px', maxWidth:'400px', width:'100%'}}>
                    <h3 className="text-center mb-4">Change Password</h3>
                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={passwordChangeHandler} />
                    </Form.Group>
                    <Button className="w-100" type="submit" onClick={formSubmitHandler}>Update</Button>
            </Form>
        </Container>
    )
}

export default PasswordForm;