// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 5000; 
app.use(bodyParser.json())
app.use(cors())

// MongoDB connection
mongoose.connect('mongodb+srv://josephpeterjece2021:AJ9Hg6xTtQBUCoGr@cluster1.xaacunv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// User schema
const userSchema = new mongoose.Schema({
  publicKey: { type: String, required: true },
  privateKey: { type: String, required: true },
  role: { type: String, required: true },
});
const User = mongoose.model('BlockchainUsers', userSchema);

// Register route
app.post('/register', async (req, res) => {
  try {
    const { publicKey, privateKey, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ publicKey });
    

    const existing_pvtkey = await User.findOne({ privateKey });
    if (existingUser || existing_pvtkey) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ publicKey, privateKey, role });
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { publicKey, privateKey,role } = req.body;
    console.log(req.body.role)


    // Check if user exists
    const user = await User.findOne({ publicKey });
    const existingpkey = await User.findOne({ privateKey });
    console.log(user)
    if (!user || !existingpkey) {
      return res.status(404).json({ message: 'User not found',role:user.role });
    }
    

    // Create JWT token
    const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful',role:user.role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
