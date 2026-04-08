import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(join(__dirname, 'frontend')));

// In-memory storage
const store = {
  labels: []
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'frontend', 'index.html'));
});

app.get('/api/labels', (req, res) => {
  res.json({ success: true, labels: store.labels });
});

app.post('/api/labels', (req, res) => {
  const { name, text, bgColor, textColor, position } = req.body;
  const label = {
    id: crypto.randomUUID(),
    name, text, bgColor, textColor, position,
    createdAt: new Date().toISOString()
  };
  store.labels.push(label);
  res.json({ success: true, label });
});

app.put('/api/labels/:id', (req, res) => {
  const { id } = req.params;
  const idx = store.labels.findIndex(l => l.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  
  Object.assign(store.labels[idx], req.body);
  res.json({ success: true, label: store.labels[idx] });
});

app.delete('/api/labels/:id', (req, res) => {
  const { id } = req.params;
  const idx = store.labels.findIndex(l => l.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  
  const deleted = store.labels.splice(idx, 1)[0];
  res.json({ success: true, label: deleted });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✅ Label Manager running on port ${PORT}`);
});
