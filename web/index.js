import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'frontend')));

// In-memory database (replace with real DB later)
const labels = {};

// Routes
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'frontend', 'index.html'));
});

// API: Get all labels
app.get('/api/labels', (req, res) => {
  const allLabels = Object.values(labels).flat();
  res.json({ success: true, data: allLabels });
});

// API: Create label
app.post('/api/labels', (req, res) => {
  const { name, text, bgColor, textColor, position } = req.body;
  
  if (!name || !text || !bgColor || !textColor || !position) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = crypto.randomUUID();
  const label = { id, name, text, bgColor, textColor, position, createdAt: new Date() };
  
  if (!labels['default']) labels['default'] = [];
  labels['default'].push(label);
  
  res.json({ success: true, data: label });
});

// API: Update label
app.put('/api/labels/:id', (req, res) => {
  const { id } = req.params;
  const { name, text, bgColor, textColor, position } = req.body;
  
  for (let shop in labels) {
    const idx = labels[shop].findIndex(l => l.id === id);
    if (idx !== -1) {
      labels[shop][idx] = { ...labels[shop][idx], name, text, bgColor, textColor, position };
      return res.json({ success: true, data: labels[shop][idx] });
    }
  }
  
  res.status(404).json({ error: 'Label not found' });
});

// API: Delete label
app.delete('/api/labels/:id', (req, res) => {
  const { id } = req.params;
  
  for (let shop in labels) {
    const idx = labels[shop].findIndex(l => l.id === id);
    if (idx !== -1) {
      const deleted = labels[shop].splice(idx, 1);
      return res.json({ success: true, data: deleted[0] });
    }
  }
  
  res.status(404).json({ error: 'Label not found' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✅ Label Manager running on port ${PORT}`);
});

// Shopify Auth callback (simplified for testing)
app.get('/auth/callback', (req, res) => {
  // In production, verify the HMAC and exchange code for access token
  // For now, just confirm the callback works
  res.json({ message: 'Auth callback received' });
});

