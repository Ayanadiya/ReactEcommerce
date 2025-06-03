import React from "react";
import { Card, Button } from "react-bootstrap";

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
    return (
        <div>
            <div>
                <h2>Music</h2>
            </div>
            <div>
                <ul>
                    {products.map((product,index)=>{
                       return (<div key={index}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Img src={product.imageUrl} />
                            <div>
                                <Card.Text>{product.price}</Card.Text>
                                <Button>Add To Cart</Button>
                            </div>
                        </Card>
                       </div>)
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Product;
