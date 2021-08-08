import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount } from '../../../functions/Product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { removeProduct } from '../../../functions/Product';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllProducts()
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }


    //receive slug from children component (Adminproductcard)
    const handleRemove = (slug) => {
        let answer = window.confirm("Are you sure you want to delete this Product");
        if (answer) {
            //console.log("Send delete Request", slug);
            removeProduct(slug, user.token)
                .then((res) => {
                    loadAllProducts();
                    toast.error(`${res.data.title} is deleted`);
                }).catch((err) => {
                    if (err.response.status === 400) toast.error(err.response.data);
                    console.log(err);
                })
        }
    };



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <br />
                    {loading ? (
                        <h4 className="text-danger">Loading ...</h4>
                    ) : (
                        <h4>All Products</h4>
                    )}
                    <br />
                    <div className="row">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-4 pb-3">
                                <AdminProductCard
                                    product={p}
                                    handleRemove={handleRemove}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts;