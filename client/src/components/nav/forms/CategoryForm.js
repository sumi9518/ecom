import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName }) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Category Name</label>
            <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                placeholder="Type Parent Category name here.."
                required
            />
            <br />
            <button className="btn btn-outline-primary">Save</button>
        </div>
    </form>
)

export default CategoryForm;