import React, { useEffect, useState } from 'react';
import { getProduct } from '../functions/Product';
import SingleProduct from '../components/cards/SingleProduct';

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

        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct product={product} />
            </div>
            <div className="row">
                <div>Related products</div>
            </div>

        </div>

    )

}

export default Product;