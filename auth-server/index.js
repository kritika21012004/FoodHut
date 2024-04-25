const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const imageRoute = require('./routes/image');
const userRoute = require('./routes/user');
const foodRoute=require('./routes/food');
const orderRoute=require('./routes/order');

const app = express();

const cors = require('cors')
// app.use(express.json({ limit: '3mb' }));
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 8008;

// Parse incoming JSON requests

// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello world");
});

// Connect database
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
});

mongoose.connection.on("connected", () => {
    console.log("connected");
});

// Define routes
app.use('/api/v1/all', imageRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/food', foodRoute);
app.use('/api/v1/order', orderRoute);

//app.use(express.json({ limit: '2mb' }));
// Start the server
app.listen(port, () => {
    connect();
    console.log(`Listening on port ${port}`);
});




//npm run start-dev


