import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index.js';

const app = express();

app.use(cors("*"));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://user1:WoYq5maTL0DHanxS@cluster0.cytaack.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

app.use(router);

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});