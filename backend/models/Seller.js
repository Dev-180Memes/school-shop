import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Seller = mongoose.models.Seller || mongoose.model('Seller', sellerSchema);

export default Seller;