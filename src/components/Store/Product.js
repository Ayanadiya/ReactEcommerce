import React, {useContext} from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import CartContext from "../../store/CartContext";
import classes from "./Product.module.css"
const products= [
{title: 'Colors',
price: 100,
imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
},
{
title: 'Black and white Colors',
price: 50,
imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
},
{
title: 'Yellow and Black Colors',
price: 70,
imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
},
{
title: 'Blue Color',
price: 100,
imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
}
]

const Product=(props)=>{
    const cartctx=useContext(CartContext)
    return (
        <Container>
            <div>
                <h2>Music</h2>
            </div>
                <Row className="d-flex align-items-center ">
                    {products.map((product,index)=>{
                       return (<Col key={index} md={6}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Img src={product.imageUrl} className={classes.zoomimage} />
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <Card.Text>${product.price}</Card.Text>
                                <Button onClick={()=>cartctx.addToCart(product)}>Add To Cart</Button>
                            </div>
                        </Card>
                       </Col>)
                    })}
                </Row>
                <div>
                    <Button variant="secondary" onClick={props.onClick}>See the Cart</Button>
                </div>
        </Container>
        
    )
}

export default Product;
