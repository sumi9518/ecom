import React, { useEffect, useState } from 'react';
import { getProduct, productStar } from '../functions/Product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import { getRelatedProducts } from '../functions/Product';
import ProductCard from '../components/cards/ProductCard';

const Product = ({ match }) => {
    const [product, setProduct] = useState([]);
    const [star, setStar] = useState(0);
    const [related, setRelated] = useState([]);
    const { slug } = match.params;

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    useEffect(() => {
        // console.log("OUT-->product.ratings", product.ratings, "user", user);
        if (product.ratings && user) {
            console.log("IN-> product.ratings", product.ratings, "user._id", user.uid);
            let existingRatingObject = product.ratings.find(
                (ele) => ele.postedBy.toString() === user.uid.toString()
            );
            console.log("ex", existingRatingObject);
            existingRatingObject && setStar(existingRatingObject.star); // current user's star
        }
    });


    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data);

            getRelatedProducts(res.data._id).then(res => setRelated(res.data))

        });
    };



    const onStarClick = (newRating, name) => {
        // console.log(newRating);
        setStar(newRating);
        productStar(name, newRating, user.token)
            .then((res) => {
                // console.log('rating clicked', res.data);
                loadSingleProduct();
            });
    }




    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct
                    product={product}
                    onStarClick={onStarClick}
                    star={star}
                />
            </div>

            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    {/* {JSON.stringify(related)} */}
                    <hr />
                </div>
            </div>

            <div className="row pb-5">
                {related.length ? (
                    related.map((r) => (
                        <div key={r._id} className="col-md-4">
                            <ProductCard product={r} />
                        </div>
                    ))
                ) : (
                    <div className="text-center col"> 'No Products Found'</div>
                )}

            </div>
        </div >
    );
};

export default Product;
