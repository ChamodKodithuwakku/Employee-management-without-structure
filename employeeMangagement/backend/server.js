const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Replace with your actual MongoDB connection string
mongoose.connect('mongodb+srv://ckodi2000:87piWUC5qWfM9xyY@cluster0.1lbaweh.mongodb.net/driverDispatcherDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const formDataSchema = new mongoose.Schema({
  fullName: String,
  phoneNo: String,
  licenseNumber: { type: String, unique: true },
  department: String,
  availabilityStatus: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

// POST route to submit form data
app.post('/api/submitFormData', async (req, res) => {
  try {
    const newFormData = new FormData(req.body);
    await newFormData.save();
    res.status(201).json(newFormData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to fetch all form data
app.get('/api/getFormData', async (req, res) => {
  try {
    const formDatas = await FormData.find();
    res.status(200).json(formDatas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE route to delete form data by ID
app.delete('/api/deleteFormData/:id', async (req, res) => {
  try {
    const result = await FormData.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(204).send();  // No content to send back
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to fetch form data by ID
app.get('/api/getFormData/:id', async (req, res) => {
  try {
    const data = await FormData.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT route to update form data by ID
app.put('/api/updateFormData/:id', async (req, res) => {
  try {
    const updatedData = await FormData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to fetch employee report data
app.get('/api/employeeReportData', async (req, res) => {
  try {
    const totalEmployees = await FormData.countDocuments();
    const activeEmployees = await FormData.countDocuments({ availabilityStatus: "available" });
    const onLeaveEmployees = await FormData.countDocuments({ availabilityStatus: "onLeave" });
    const systemDeptCount = await FormData.countDocuments({ department: "systemManagement" });
    const financialDeptCount = await FormData.countDocuments({ department: "financialManagement" });
    const vetDeptCount = await FormData.countDocuments({ department: "veterinarian" });

    res.status(200).json({
      totalEmployees,
      activeEmployees,
      onLeaveEmployees,
      systemDeptCount,
      financialDeptCount,
      vetDeptCount
    });
  } catch (err) {
    console.error('Failed to fetch employee report data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
