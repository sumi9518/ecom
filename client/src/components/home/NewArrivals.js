import React, { useEffect, useState } from 'react';
import { getproducts } from '../../functions/Product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';

const NewArrivals = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        setLoading(true);
        getproducts('createdAt', 'desc', 3).then((res) => {
            setProducts(res.data);
            setLoading(false);
        })
    }


    return (
        <div>
            <div className="container">
                {loading ? (<LoadingCard count={3} />) : (
                    <div className="row">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-4">
                                <ProductCard
                                    product={product}
                                />
                            </div>

                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};
export default NewArrivals;