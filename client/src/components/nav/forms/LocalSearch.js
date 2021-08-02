import React from 'react';

const LocalSearch = ({ keyword, setKeyword }) => {

    //Step 3 for search
    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };

    return (
        <div className="container pt-4 pb-4">
            {/*Step 2 for search */}
            <input
                type="search"
                placeholder="Search"
                value={keyword}
                onChange={handleSearchChange}
                className="form-control mb-4"
            />
        </div>
    )
}

export default LocalSearch;