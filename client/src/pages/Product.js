import React, { useEffect, useState } from 'react';
import { getProduct, productStar } from '../functions/Product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';

const Product = ({ match }) => {
    const [product, setProduct] = useState([]);
    const [star, setStar] = useState(0);

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
        getProduct(slug).then((res) => setProduct(res.data));
    }


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
                    <hr />
                </div>
            </div>
        </div >
    );
};

export default Product;
