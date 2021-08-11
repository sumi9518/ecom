import React, { useEffect, useState } from 'react';
import { getProduct } from '../functions/Product';


const Product = ({ match }) => {

    const [product, setProduct] = useState({})
    const { slug } = match.params;


    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    const loadSingleProduct = () => {
        getProduct(slug)
            .then((p) => {
                setProduct(p.data);
            })
    }

    return (
        <div>
            {JSON.stringify(product)}
        </div>

    )

}

export default Product;