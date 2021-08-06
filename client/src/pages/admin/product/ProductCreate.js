import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/Product';

const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    categories: [],
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    color: "",
    brand: "",
}

const ProductCreate = () => {

    const [values, setValues] = useState(initialState);
    const { user } = useSelector((state) => ({ ...state }));

    //Destructure
    const { tittle, description, price, category, subs, shipping, quantity, images, colors, brands, color, brand } = values;
    //instead of value.title we can directly use title bcz of above destructure 


    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then(res => {
                console.log(res);
                window.alert(`${res.data.title} is created`);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 400) toast.error(err.response.data);
            })
    }


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        //console.log(e.target.name, "-->", e.target.value);


    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <h4>Product Create</h4>
                    <hr />
                    {/* {JSON.stringify(values)} */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-goup">
                            <br />
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={tittle}
                                onChange={handleChange}
                                placeholder="Enter product tittle here"
                            />
                            <br />
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                className="form-control"
                                value={description}
                                onChange={handleChange}
                                placeholder="Enter product description here"
                            />
                            <br />
                            <label>Price</label>
                            <input
                                type="text"
                                name="price"
                                className="form-control"
                                value={price}
                                onChange={handleChange}
                                placeholder="Enter product price here"
                            />
                            <br />
                            <label>Shipping</label>
                            <select
                                name="shipping"
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option>Please Select</option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                            <br />
                            <label>Quantity</label>
                            <input
                                type="text"
                                name="quantity"
                                className="form-control"
                                value={quantity}
                                onChange={handleChange}
                                placeholder="Enter Product quantity here"
                            />
                            <br />
                            <label>Color</label>
                            <select
                                name="color"
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option>Please Select</option>
                                {colors.map((c) => <option key={c} value={c} > {c}</option>)}
                            </select>
                            <br />
                            <label>Brand</label>
                            <select
                                name="brand"
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option>Please Select</option>
                                {brands.map((b) => <option key={b} value={b} > {b}</option>)}
                            </select>
                        </div>
                        <br />
                        <button className="btn btn-outline-info">Save</button>
                    </form>
                </div>
            </div>

        </div>
    );
};
export default ProductCreate;