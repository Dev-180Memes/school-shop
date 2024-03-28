import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSellerProducts = async (req, res) => {
    const { id } = req.params;
    try {
        const products = await Product.find({ seller: id });
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getLatestProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addProduct = async (req, res) => {
    const { name, price, description, category, imageUrl, seller } = req.body;

    const newProduct = new Product({ name, price, description, category, imageUrl, seller });

    try {
        const result = await newProduct.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}