import React from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import laptop from '../../images/laptop.png';
import ProductListItems from './ProductListItems';

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
    const { title, images, description } = product;

    return (
        <React.Fragment>
            <div className="col-md-7">
                {images && images.length ?
                    <Carousel showArrrows={true} autoPlay infiniteLoop>
                        {images && images.map((i) =>
                            <img src={i.url} key={i.public_id} />

                        )}
                    </Carousel> : (
                        <Card cover={<img src={laptop} className="mb-3 card-image" />}> </Card>
                    )}

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call us for more details on 123456
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
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

                    <ProductListItems product={product} />
                </Card>
            </div>
        </React.Fragment>
    )
}

export default SingleProduct;