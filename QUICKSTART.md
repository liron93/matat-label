# Quick Start Guide

Get your Shopify Label Manager app running in 5 minutes!

## Step 1: Install Dependencies (1 minute)

```bash
cd shopify-label-manager
npm install
```

## Step 2: Start the Server (30 seconds)

```bash
npm start
```

You should see:
```
Label Manager app listening on port 3000
Open http://localhost:3000 in your browser
```

## Step 3: Open the App (30 seconds)

Open your browser and go to:
```
http://localhost:3000
```

The Label Manager dashboard should load.

## Step 4: Create Your First Label (1 minute)

1. **Enter Label Details**
   - Name: `New`
   - Text: `NEW ITEM`
   - Color: Pick blue or any color
   - Position: Top Left (default)

2. **Click "Create Label"**

3. **See your label appear** in the right panel

Done! Your label is now stored in browser localStorage.

## What You Can Do

### Create Labels
- Give each label a unique name
- Customize the display text
- Pick any color
- Choose corner position

### Edit Labels
- Click the "Edit" button on any label
- Modify the properties
- Click the updated button to save

### Delete Labels
- Click the "Delete" button
- Confirm deletion

## Storage

Your labels are stored in your browser's localStorage. They persist when you:
- Refresh the page
- Close and reopen the browser
- Restart your computer

They are lost if you:
- Clear browser cache/data
- Use incognito/private mode
- Switch browsers or computers

## Next Steps

### To Deploy to Production

1. **Set up a server** (Heroku, AWS, etc.)
2. **Get Shopify API credentials**
3. **Configure environment variables**
4. **Deploy with `npm start`**

See `README.md` and `DEVELOPMENT.md` for detailed instructions.

### To Customize the App

Edit `web/frontend/index.html` for:
- Colors (search for `#667eea`)
- Layout and styling
- Labels and text

Edit `web/frontend/app.js` for:
- Label properties and behavior
- Storage logic
- Validation rules

Edit `web/index.js` to:
- Add database integration
- Add authentication
- Add new API endpoints

## Troubleshooting

### Port 3000 Already in Use

```bash
# Try a different port
PORT=4000 npm start
```

### Can't Find the App

Make sure you're at `http://localhost:3000` (not https)

### Labels Not Saving

Check if localStorage is enabled:
- Not in private/incognito mode
- Browser storage not disabled
- Check browser console (F12) for errors

## File Structure Overview

```
shopify-label-manager/
├── web/
│   ├── index.js              ← Express server
│   └── frontend/
│       ├── index.html        ← The app UI
│       └── app.js            ← App logic
├── package.json              ← Dependencies
└── shopify.app.toml          ← Shopify config
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `web/index.js` | Express server that serves the app |
| `web/frontend/index.html` | The user interface |
| `web/frontend/app.js` | Label management logic |
| `shopify.app.toml` | Shopify configuration |
| `package.json` | Node.js dependencies |

## Development vs Production

### Development
```bash
npm run dev    # Auto-restarts on file changes
```

### Production
```bash
NODE_ENV=production npm start
```

## Tips & Tricks

### Export Your Labels

Open browser console (F12) and run:
```javascript
window.labelManager.exportLabels();
```

This downloads a JSON file with all your labels.

### View All Labels in Console

```javascript
console.log(window.labelManager.labels);
```

### Clear All Labels

```javascript
localStorage.clear();
location.reload();
```

### Change the Port

```bash
PORT=5000 npm start
```

## Getting Help

1. Check the main `README.md`
2. See `DEVELOPMENT.md` for advanced topics
3. Open browser console (F12) to see errors
4. Check server logs in terminal

## Common Tasks

### I want to change the app colors

Edit `web/frontend/index.html`, find the `<style>` section, and update the gradient colors:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### I want to add more position options

1. Add a button in `web/frontend/index.html`
2. Add the position name in `app.js` in the `getPositionLabel()` method

### I want to persist data to a database

1. Install a database (MongoDB, PostgreSQL, etc.)
2. Update `web/index.js` API routes
3. See `DEVELOPMENT.md` for database integration example

## What's Next?

Once you're comfortable with the basics:

1. **Customize the UI** - Edit HTML and CSS
2. **Add validation** - Restrict label properties
3. **Add database** - Persist data beyond browser
4. **Add authentication** - Require login
5. **Deploy** - Put it on a live server

## Version Info

- **Node.js**: 16.0.0+
- **npm**: 7.0.0+
- **Express**: 4.18.2
- **Storage**: Browser localStorage

---

**Time to get started**: ~5 minutes
**Time to first label**: ~2 minutes
**Difficulty**: Easy

Enjoy your Label Manager!
