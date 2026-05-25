const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./Config/db');
const imageRoutes = require('./Routes/imageRoutes');

connectDB();

app.use(express.json()); 
app.use(cors());

// Routes - REMOVED DUPLICATE
app.use('/api/users', require('./Routes/userRoutes'));
app.use('/api/products', require('./Routes/productRoutes'));
app.use('/api/payments', require('./Routes/paymentRoutes'));  // Only once!
app.use('/api/cart', require('./Routes/cartRoutes'));
app.use('/api/auth', require('./Routes/authRoutes'));
app.use('/api/images', imageRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});