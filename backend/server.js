// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');
const imageRoutes = require('./Routes/imageRoutes');
require('dotenv').config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./Routes/authRoutes'));
app.use('/api/users', require('./Routes/userRoutes'));
app.use('/api/products', require('./Routes/productRoutes'));
app.use('/api/payment', require('./Routes/paymentRoutes'));
app.use('/api/cart', require('./Routes/cartRoutes'));
app.use('/api/orders', require('./Routes/orderRoutes'));
app.use('/api/images', imageRoutes);

// Root route
app.get('/', (req, res) => {
    res.send(' Server is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});