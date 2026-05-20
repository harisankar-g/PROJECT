

const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./Config/db');
const productRoutes = require('./Routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

connectDB();

app.use(express.json()); 
app.use(cors());

// Routes
app.use('/api/users', require('./Routes/userRoutes'));
app.use('/api/products', require('./Routes/productRoutes'));
app.use('/api/payments', require('./Routes/paymentRoutes'));
app.use('/api/cart',require('./Routes/cartRoutes'));
app.use('/api/auth', require('./Routes/authRoutes'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
