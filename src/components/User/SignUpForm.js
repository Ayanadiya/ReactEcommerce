import { Form, Button } from "react-bootstrap";
import { useState } from "react";


const SignUpForm=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const emailChangeHandler=e=>setEmail(e.target.value);
    const passwordChangeHandler=e=>setPassword(e.target.value);

    const formSubmitHandler= async (event)=>{
        event.preventDefault();
        const user={
            email,
            password
        }
       try {
        const response=await fetch("http://127.0.0.1:3000/myshop/user/signUp",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user),
        });
        if(response.status===404)
        {
            const data=await response.json();
            alert(data.message);
        }
       } catch (error) {
        console.log(error);
       }
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={emailChangeHandler} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={passwordChangeHandler} />
                </Form.Group>
                <Button type="submit" onClick={formSubmitHandler}>Submit</Button>
            </Form>
        </div>
    )
}

export default SignUpForm;