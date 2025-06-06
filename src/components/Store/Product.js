import React, {useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import CartContext from "../../store/CartContext";
import classes from "./Product.module.css"

const Product=(props)=>{
    const cartctx=useContext(CartContext)
    const [products, setProduct]=useState([]);

    const fetchProduct= async()=>{
         try {
            const response= await fetch("http://127.0.0.1:3000/myshop/store/products");
            if(!response.ok)
            {
                throw new Error("Response was not OK")
            }
            const data=await response.json();
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{  
        fetchProduct();
    },[])
    
    return (
        <Container>
            <div>
                <h2>Products</h2>
            </div>
                <Row className="d-flex align-items-center ">
                    {products.map((product)=>{
                       return (<Col key={product._id} md={6}>
                        <Link to={`/product/${product._id}`} >
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Img src={product.imageUrl} className={classes.zoomimage} />
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <Card.Text>${product.price}</Card.Text>
                                <Button onClick={()=>cartctx.addToCart(product)}>Add To Cart</Button>
                            </div>
                        </Card>
                        </Link>
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
