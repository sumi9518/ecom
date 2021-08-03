import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../../../functions/category';
import { createSub, getSub, removeSub, getSubs } from '../../../functions/sub';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/nav/forms/CategoryForm';
import LocalSearch from '../../../components/nav/forms/LocalSearch';

const SubCreate = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");         //Step 1 for search
    const [subs, setSubs] = useState([]);
    const [keyword, setKeyword] = useState("");


    useEffect(() => {
        loadCategories();
        loadSubs();
    }, [])

    const loadCategories = () => getCategories().then((c) => setCategories(c.data));

    const loadSubs = () => getSubs().then((s) => setSubs(s.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                console.log(res.data.name);
                setLoading(false);
                setName("");
                toast.success(`Sub Category "${res.data.name}" is created`);
                loadSubs();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });

    };


    const handleRemove = async (slug) => {
        // let answer = window.confirm("Delete ?");
        //console.log(answer, slug);
        if (window.confirm("Delete ?")) {
            setLoading(true);
            // console.log(slug, user.token)
            removeSub(slug, user.token)
                .then(res => {
                    setLoading(false);
                    toast.error(`${res.data.name} Deleted`);
                    loadSubs();
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data);
                });
        };

    };



    //Step 4 for search
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading..</h4>) : (<h4>Create Sub Category Page</h4>)}

                    <div className="form-group">
                        <label>Select Parent Category</label>
                        <select name="category" className="form-control" onChange={(e) => setCategory(e.target.value)}>
                            <option>Please select</option>
                            {categories.length > 0 &&
                                categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />

                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                    {/* //Step 2 &3  for search */}
                    <hr />
                    {subs.filter(searched(keyword)).map((s) => (
                        <div className="alert alert-secondary" key={s._id}>
                            {s.name}
                            <span onClick={() => handleRemove(s.slug)} className="btn btn-sm float-right">
                                <DeleteOutlined className="text-danger" />
                            </span>{" "}
                            <Link to={`/admin/sub/${s.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SubCreate;