import React, { useEffect, useState } from 'react';
import { getProductsByCount } from '../functions/Product';
import ProductCard from '../components/cards/ProductCard';
import Jumbotron from "../components/cards/Jumbotron";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        getProductsByCount(3).then((res) => {
            setProducts(res.data);
            setLoading(false);
        })
    }


    return (
        <div>
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron
                    text={["Latest Products", "New Arrivals", "Best Sellers"]}
                />
            </div>
            <div className="container">
                <div className="row">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-4">
                            <ProductCard
                                product={product}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};
export default Home;