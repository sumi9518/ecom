import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategory } from '../../functions/category';

const CategoryList = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategory()
            .then(c => {
                setCategory(c.data);
                setLoading(false);
            });
    }, []);

    const showCategory = () =>
        category.map((c) => (
            <div key={c._id} className="col btn btn-outline-primary btn-lg btn-block btn-raised m-3">
                <Link to={`/category/${c.slug}`}>  {c.name}</Link>
            </div>
        ))


    return (
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center">Loading..</h4>) : showCategory()}
            </div>

        </div>
    )
};

export default CategoryList;