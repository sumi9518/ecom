import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


const { Meta } = Card;

const SingleProduct = ({ product }) => {
    const { title, description, images, slug } = product;
    return (
        <React.Fragment>
            <div className="col-md-7">
                <Carousel showArrrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) =>
                        <img src={i.url} key={i.public_id} />

                    )}
                </Carousel>
            </div>

            <div className="col-md-5">
                <Card
                    actions={[
                        <React.Fragment>
                            <ShoppingCartOutlined className="text-success" /> <br />
                            Add to Cart
                        </React.Fragment>,

                        <Link to="/">
                            <HeartOutlined className="text-danger" /> <br />
                            Add to Wishlist</Link>
                    ]}>
                    <Meta title={title} description={description} />
                    <p>Price/category/subs</p>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default SingleProduct;