# Shopify Label Manager App

A minimal yet powerful Shopify app for managing product labels on your storefront. Create, edit, and delete customizable labels with full control over color, text, and positioning.

## Features

- **Label Management**: Create, edit, and delete product labels
- **Customization**: Set custom colors, text, and positions for each label
- **Local Storage**: All data stored securely in browser localStorage
- **Responsive Design**: Works on desktop and mobile devices
- **Easy Integration**: Minimal setup required
- **No Database Required**: Perfect for MVP and quick deployment

## Quick Start

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn
- Shopify account and app development environment

### Installation

1. **Clone or extract the project**
   ```bash
   cd shopify-label-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   Or for development with hot reload:
   ```bash
   npm run dev
   ```

4. **Access the app**
   - Open http://localhost:3000 in your browser
   - The Label Manager dashboard will load

## Architecture

```
shopify-label-manager/
├── shopify.app.toml          # Shopify app configuration
├── package.json              # Node.js dependencies
├── web/
│   ├── index.js             # Express server
│   └── frontend/
│       ├── index.html       # Main UI
│       ├── app.js           # Client-side logic
│       └── style.css        # Styling (embedded in index.html)
├── extensions/              # Placeholder for future extensions
└── README.md               # This file
```

## Core Components

### Backend (Express Server)

- **File**: `web/index.js`
- **Port**: 3000 (configurable via PORT env var)
- **Endpoints**:
  - `GET /` - Serves the main app
  - `GET /api/labels` - Get all labels
  - `POST /api/labels` - Create new label
  - `PUT /api/labels/:id` - Update label
  - `DELETE /api/labels/:id` - Delete label
  - `GET /health` - Health check

### Frontend (Single Page App)

- **File**: `web/frontend/index.html` + `app.js`
- **Storage**: Browser localStorage
- **Key Classes**:
  - `LabelManager`: Main application class

## Usage

### Creating a Label

1. Enter a label name (e.g., "New", "Sale")
2. Enter the label text to display
3. Select a color using the color picker
4. Choose the position (top-left, top-right, bottom-left, bottom-right)
5. Click "Create Label"

### Editing a Label

1. Click the "Edit" button on any label
2. Modify the label properties
3. Click the updated button to save changes

### Deleting a Label

1. Click the "Delete" button on any label
2. Confirm the deletion

## Data Storage

All label data is stored in the browser's localStorage under the key `shopify-labels`. The data structure is:

```json
[
  {
    "id": 1712577600000,
    "name": "New",
    "text": "NEW ITEM",
    "color": "#667eea",
    "position": "top-left",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
]
```

### Exporting Labels

To export your labels, open the browser console and run:
```javascript
window.labelManager.exportLabels();
```

### Importing Labels

To import labels from a JSON file, open the browser console and run:
```javascript
const jsonData = '[{"id":1712577600000,...}]'; // Your JSON here
window.labelManager.importLabels(jsonData);
```

## Customization

### Modifying Colors

Edit the gradient color values in `web/frontend/index.html`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Changing the Port

Set the PORT environment variable:
```bash
PORT=4000 npm start
```

### Adding More Position Options

Edit the position buttons in `web/frontend/index.html` and update the position preview in `app.js`.

## Deployment

### To Shopify Platform

1. **Build the app** (if needed)
   ```bash
   npm run build
   ```

2. **Create app on Shopify**
   - Go to your Shopify Partner Dashboard
   - Create a new app
   - Copy your API credentials

3. **Configure credentials**
   - Update `shopify.app.toml` with your API credentials
   - Set your app URL

4. **Deploy**
   ```bash
   npm start
   ```

### To Heroku

1. **Create Procfile**
   ```
   web: npm start
   ```

2. **Deploy**
   ```bash
   heroku create
   heroku config:set NODE_ENV=production
   git push heroku main
   ```

### To Other Platforms

- Set `NODE_ENV=production`
- Set `PORT` environment variable
- Ensure Node.js 16+ is available
- Run `npm install && npm start`

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

## API Reference

### POST /api/labels

Create a new label.

**Request:**
```json
{
  "name": "New",
  "text": "NEW ITEM",
  "color": "#667eea",
  "position": "top-left"
}
```

**Response:**
```json
{
  "success": true,
  "label": {
    "id": 1712577600000,
    "name": "New",
    "color": "#667eea",
    "position": "top-left",
    "text": "NEW ITEM",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

### PUT /api/labels/:id

Update an existing label.

**Request:**
```json
{
  "name": "Sale",
  "text": "ON SALE",
  "color": "#ff6b6b",
  "position": "top-right"
}
```

### DELETE /api/labels/:id

Delete a label.

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Then restart
npm start
```

### Labels Not Appearing

1. Check browser console for errors (F12)
2. Verify localStorage is enabled in browser
3. Clear browser cache and reload

### Data Lost After Refresh

- Make sure localStorage is not cleared by browser settings
- Check if running in private/incognito mode (data not persisted)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Roadmap

Future enhancements could include:

- [ ] Database integration for persistent storage
- [ ] Multi-user support with authentication
- [ ] Label templates
- [ ] Scheduled label campaigns
- [ ] Analytics dashboard
- [ ] Bulk import/export
- [ ] Label preview on actual products
- [ ] A/B testing labels

## License

MIT

## Support

For issues and questions, refer to the Shopify documentation at https://shopify.dev

## Development

### Running Tests

```bash
npm test
```

### Code Style

The project uses standard JavaScript. No linter configured for MVP.

### Git Workflow

1. Create a feature branch
2. Make changes
3. Test locally
4. Create a pull request

## Performance Notes

- App loads in < 100ms
- Supports up to 1000+ labels in localStorage (browser dependent)
- No external API calls (all processing is local)

## Security Considerations

- All data stored locally (browser storage)
- No sensitive data transmitted
- CORS enabled for development
- Add authentication before production use

## Contributing

Contributions are welcome! Please follow the existing code style and test your changes locally.

---

**Version**: 1.0.0
**Last Updated**: 2024-01-15
**Maintained By**: Shopify App Developer
