import React, { useState, useEffect } from 'react';
import { getCategories } from '../../functions/category';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard';

const CategoryHome = ({ match }) => {
    return (
        <div>
            {match.params.slug}
        </div>
    )
}

export default CategoryHome
