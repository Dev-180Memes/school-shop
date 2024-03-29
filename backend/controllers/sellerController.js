import Seller from "../models/Seller.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "school-shop-project"

export const sellerSignUp = async (req, res) => {
    const { username, email, phone, password } = req.body;
    try {
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: "Seller already exists!" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await Seller.create({ username, email, phoneNo: phone, password: hashedPassword });
        const token = jwt.sign({ email: result.email, id: result._id }, JWT_SECRET, { expiresIn: "24h" });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
}

export const sellerSignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingSeller = await Seller.findOne({ email });
        if (!existingSeller) {
            return res.status(404).json({ message: "Seller does not exist!" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingSeller.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }
        const token = jwt.sign({ email: existingSeller.email, id: existingSeller._id }, JWT_SECRET, { expiresIn: "24h" });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
}

export const getSeller = async (req, res) => {
    const { id } = req.params;
    try {
        const seller = await Seller.findById(id);
        res.status(200).json(seller);
    } catch (error) {
        res.status(404).json({ message: "Seller not found!" });
    }
}

export const changeSellerPassword = async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
        const seller = await Seller.findById(id);
        const isPasswordCorrect = await bcrypt.compare(oldPassword, seller.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        await Seller.findByIdAndUpdate(id, { password: hashedNewPassword });
        res.status(200).json({ message: "Password changed successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
}