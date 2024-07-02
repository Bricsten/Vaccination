const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4000;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/vaccination-monitoring-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.json());

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'Registration successful', user: user });
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
    res.json({ message: 'Login successful', user: user });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
});


const Patient = mongoose.model('Patient', {
  sn: String, // Serial Number
  name: String,
  dateVaccinated: Date,
  dosesLeft: Number,
  region: String, // New field for the region
});

// CRUD routes
app.get('/api/patients', async (req, res) => {
  try {
    const { search, region } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search };
    }
    if (region) {
      query.region = region;
    }

    const patients = await Patient.find(query);
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/patients', async (req, res) => {
  const patient = new Patient(req.body);
  try {
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/patients', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Invalid request. Please provide an array of patient IDs.' });
    }

    const deletedPatients = await Patient.deleteMany({ _id: { $in: ids } });
    if (deletedPatients.deletedCount === 0) {
      return res.status(404).json({ message: 'No patients found with the provided IDs.' });
    }

    res.json({ message: `${deletedPatients.deletedCount} patients deleted.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});