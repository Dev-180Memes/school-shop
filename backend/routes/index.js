import express from 'express';
const router = express.Router();

import { sellerSignUp, sellerSignIn, getSeller, changeSellerPassword } from '../controllers/sellerController.js';
import { getLatestProducts, getProducts, getSellerProducts, addProduct, deleteProduct } from '../controllers/productController.js';

router.post('/seller/signup', sellerSignUp);
router.post('/seller/signin', sellerSignIn);
router.get('/seller/:id', getSeller);
router.patch('/seller/:id', changeSellerPassword);

router.get('/products', getProducts);
router.get('/products/latest', getLatestProducts);
router.get('/products/seller/:id', getSellerProducts);
router.post('/addproducts', addProduct);
router.delete('/products/:id', deleteProduct);

export default router;