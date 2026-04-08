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

// Shopify App Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Label Manager API is running' });
});

// Redirect root to dashboard
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'frontend', 'index.html'));
});

// API Routes for labels (saved in browser, not backend)
app.post('/api/labels', (req, res) => {
  res.json({
    success: true,
    message: 'Label stored in browser localStorage',
    note: 'Labels persist client-side'
  });
});

app.get('/api/labels', (req, res) => {
  res.json({
    success: true,
    message: 'Labels are stored in browser localStorage',
    note: 'No backend database needed'
  });
});

// Health check for Shopify
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Label Manager running on port ${PORT}`);
  console.log(`📱 Visit http://localhost:${PORT} to test`);
});
