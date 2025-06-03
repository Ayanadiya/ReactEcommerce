import React from "react";
import {Modal, Button, Container, Row, Col, Image, Form} from "react-bootstrap";

const cartElements = [
    {
        title: 'Colors',
        price: 100,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
        quantity: 2,
    },  
    {
        title: 'Black and white Colors',
        price: 50,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
        quantity: 3,
    },
    {   
        title: 'Yellow and Black Colors',
        price: 70,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
        quantity: 1,
    }
]

const Cart=(props)=>{
    const {showCart, onClick}=props;
    const total=cartElements.reduce((total,item)=>total+(item.price*item.quantity),0);

    return (
        <Modal show={showCart} onHide={onClick} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title centered>Cart</Modal.Title>
            </Modal.Header> 
            <Modal.Body>
                <Container>
                    <Row className="d-flex align-items-center">
                        <Col>Item</Col>
                        <Col>Price</Col>
                        <Col>Quantity</Col>
                    </Row>
                    {cartElements.map((item,index)=>{
                        return(
                            <Row key={index} className="d-flex align-items-center">
                                <Col className="d-flex align-items-center">
                                <Image src={item.imageUrl} width={60} height={60} />
                                <p>{item.title}</p>
                                </Col>
                                <Col>${item.price}</Col>
                                <Col className="d-flex align-items-center">
                                <Form.Control
                                 type="number"
                                 value={item.quantity}
                                 min="1"
                                 />
                                <Button variant="danger">Remove</Button>
                                </Col>
                            </Row>
                        )
                    })}
                    <Row>
                        <Col>Total ${total}</Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button>Purchase</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Cart