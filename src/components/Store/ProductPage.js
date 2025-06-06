import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const ProductPage=()=>{
    const [product, setProduct]=useState({});
    const params=useParams();
    const productId=params.productId;
    console.log(productId);
    const fetchProduct= async(productId)=>{
         try {
            const response= await fetch(`http://127.0.0.1:3000/myshop/store/product/${productId}`);
            if(!response.ok)
            {
                throw new Error("Response was not OK")
            }
            const data=await response.json();
            console.log(data);
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchProduct(productId);
    },[productId]);

    return (
        <div>
            <h3>Product Page</h3>
            <h1>{product.title}</h1>
            <img src={product.imageUrl} alt="image"/>
            <p>{product.detail}</p>
            <p>{product.price}</p>
        </div>  
    )
}

export default ProductPage;