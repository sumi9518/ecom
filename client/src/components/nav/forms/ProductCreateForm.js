import React from 'react';
import { getCategories } from '../../../functions/category';
import { Select } from 'antd';

const { Option } = Select;

const ProductCreateForm = ({ handleSubmit, handleChange, values, handleCategoryChange, subOptions, showSubs, setValues }) => {

    //Destructure

    const {
        tittle,
        description,
        price,
        category,
        categories,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand
    } = values;

    //instead of value.title we can directly use title bcz of above destructure 




    return (
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
            <label>Category</label>
            <select
                name="category"
                className="form-control"
                onChange={handleCategoryChange}>
                <option>Please select</option>
                {categories.length > 0 && categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <br />

            {showSubs && (<div >
                <label>Sub Category</label>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please Select"
                    value={subs}
                    onChange={(value) => setValues({ ...values, subs: value })}
                >
                    {subOptions.length && subOptions.map((s) => <Option key={s._id} value={s._id}>{s.name}</Option>)}
                </Select>
            </div>
            )}



            <br />
            <button className="btn btn-outline-info">Save</button>
        </form>
    )
}
export default ProductCreateForm;