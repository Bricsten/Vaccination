const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// User schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const user = new User({ firstName, lastName, username, email, password });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.username) {
      res.status(400).json({ message: 'Username already exists' });
    } else if (err.code === 11000 && err.keyPattern.email) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Error registering user' });
    }
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});