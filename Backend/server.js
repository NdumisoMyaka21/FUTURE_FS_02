const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let leads = []; // In-memory storage (no MongoDB)

// Demo Admin Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'future2026') {
    return res.json({ success: true, message: 'Login successful' });
  }
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Get all leads
app.get('/api/leads', (req, res) => {
  res.json(leads);
});

// Create new lead
app.post('/api/leads', (req, res) => {
  const lead = { 
    _id: Date.now().toString(),
    ...req.body,
    status: req.body.status || 'New',
    notes: [],
    createdAt: new Date()
  };
  leads.unshift(lead);
  res.json(lead);
});

// Update lead (status or add note)
app.put('/api/leads/:id', (req, res) => {
  const { status, note } = req.body;
  const lead = leads.find(l => l._id === req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });

  if (status) lead.status = status;
  if (note) lead.notes.push({ text: note, date: new Date() });

  res.json(lead);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('✅ Mini CRM is ready (in-memory mode)');
});