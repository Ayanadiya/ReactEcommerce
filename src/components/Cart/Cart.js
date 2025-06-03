import React, {useContext} from "react";
import CartContext from "../../store/CartContext";
import {Modal, Button, Container, Row, Col, Image, Form} from "react-bootstrap";

const Cart=(props)=>{
    const cartctx=useContext(CartContext);
    const {showCart, onClick}=props;
    const total=cartctx.cart.reduce((total,item)=>total+(item.price*item.quantity),0);

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
                    {cartctx.cart.map((item,index)=>{
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