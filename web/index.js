import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'frontend')));

// API Routes

// Get all labels
app.get('/api/labels', (req, res) => {
  res.json({
    success: true,
    message: 'Labels retrieved from browser localStorage',
    note: 'Client stores labels in browser localStorage'
  });
});

// Create a new label
app.post('/api/labels', (req, res) => {
  const { name, color, position, text } = req.body;

  if (!name || !color || !position || !text) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, color, position, text'
    });
  }

  res.json({
    success: true,
    message: 'Label created successfully',
    label: {
      id: Date.now(),
      name,
      color,
      position,
      text,
      createdAt: new Date().toISOString()
    },
    note: 'Label stored in browser localStorage'
  });
});

// Update a label
app.put('/api/labels/:id', (req, res) => {
  const { id } = req.params;
  const { name, color, position, text } = req.body;

  res.json({
    success: true,
    message: 'Label updated successfully',
    labelId: id,
    note: 'Label updated in browser localStorage'
  });
});

// Delete a label
app.delete('/api/labels/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    success: true,
    message: 'Label deleted successfully',
    labelId: id,
    note: 'Label removed from browser localStorage'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve the main app
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'frontend', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Label Manager app listening on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
