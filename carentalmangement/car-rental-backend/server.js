require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL ||'*'
}));
app.use(express.json());

// MongoDB Atlas URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB Atlas connection error:', err));

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
