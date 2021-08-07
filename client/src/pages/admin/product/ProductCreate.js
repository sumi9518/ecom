import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/Product';
import ProductCreateForm from '../../../components/nav/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/nav/forms/FileUpload';

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
    const [subOptions, setSubOptions] = useState([]);
    const [showSubs, setShowSubs] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();
    }, [])


    const loadCategories = () => getCategories().then((c) => setValues({ ...values, categories: c.data }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then((res) => {
                console.log(res);
                window.alert(`${res.data.title} is created`);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 400) toast.error(err.response.data.err);
            })
    }


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        //console.log(e.target.name, "-->", e.target.value);


    }

    //The below func is called on change of parent (select) passes e value, which is set in values, 
    //and passed to another func from func folder which makes api call to BE and give res as subs

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("clicked category", e.target.value);
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value)
            .then(res => {
                console.log("Subs options", res);
                setSubOptions(res.data);
            });
        setShowSubs(true);
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
                    {JSON.stringify(values.images)}


                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>


                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        subOptions={subOptions}
                        showSubs={showSubs}
                    />
                </div>
            </div>

        </div>
    );
};
export default ProductCreate;