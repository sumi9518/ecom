import { SELECTION_INVERT } from 'antd/lib/table/hooks/useSelection';
import axios from 'axios';


export const createProduct = async (product, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken,
        }
    });

export const getProductsByCount = async (count) =>
    await axios.get(`${process.env.REACT_APP_API}/products/${count}`);


export const removeProduct = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authtoken,
        }
    });

export const getProduct = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
        headers: {
            authtoken,
        },
    });

//based on sort & orderby
export const getproducts = async (sort, order, page) =>
    await axios.post(`${process.env.REACT_APP_API}/products`, {
        sort,
        order,
        page,
    });

export const getProductsCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}/products/abc`);


export const productStar = async (product_id, star, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/product/star/${product_id}`,
        { star },
        {
            headers: {
                authtoken,
            },
        });


export const getRelatedProducts = async (productId) =>
    await axios.get(`${process.env.REACT_APP_API}/products/related/${productId}`);