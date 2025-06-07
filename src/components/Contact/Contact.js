import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";

const Contact=(props)=>{
    const [name,setName]=useState("");
    const [email, setEmail]=useState("");
    const [phone, setPhone]=useState("");
    
    const nameChangeHandler= event =>setName(event.target.value);
    const emailChangeHandler= event =>setEmail(event.target.value);
    const phoneChangeHandler= event =>setPhone(event.target.value);

    const formSubmitHandler= async (event)=>{
        event.preventDefault();
        const contact={
            name,
            email,
            phone
        }
        try {
             const response= await fetch("http://127.0.0.1:4000/myshop/contact/request", {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(contact)
            })
            if(!response.ok)
            {
               throw new Error("Network response was not Ok")
            }
            else
            {
                alert("Thank you for your submission. We will reach you soon.")
            }
        } catch (error) {
            console.log(error);
        } 
    }
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={nameChangeHandler}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={emailChangeHandler}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" value={phone} onChange={phoneChangeHandler}/>
            </Form.Group>
            <Button variant="primary" onClick={formSubmitHandler}>Submit</Button>
        </Form>
    )
}

export default Contact;