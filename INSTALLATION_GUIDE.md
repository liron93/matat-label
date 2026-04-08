# 🚀 Shopify Label Manager - Installation Guide

## Quick Start (2 minutes)

The Label Manager is now ready to use on your Shopify store!

### Step 1: Access the Standalone Label Manager

The label manager is available at:
```
https://raw.githubusercontent.com/liron93/matat-label/main/shopify-label-manager.html
```

### Step 2: Add to Your Shopify Theme

#### Method A: Direct HTML Include (Recommended)

1. Go to **Settings** → **Online Store** → **Themes**
2. Find your active theme and click **Edit code**
3. Open the `layout/theme.liquid` file
4. Find the `</head>` tag at the end of the HEAD section
5. Add this code **right before** `</head>`:

```html
<!-- Shopify Label Manager Widget -->
<iframe 
  src="https://raw.githubusercontent.com/liron93/matat-label/main/shopify-label-manager.html" 
  style="border: none; position: fixed; bottom: 20px; right: 20px; width: 400px; max-height: 600px; z-index: 99999;" 
  allowfullscreen>
</iframe>
```

#### Method B: Script Injection

If Method A doesn't work, use this method:

1. In the **Edit code** section, go to **Assets** folder
2. Click **Add new asset** → **Create a blank file**  
3. Name it `shopify-label-manager.js`
4. Add this code:

```javascript
(function() {
  fetch('https://raw.githubusercontent.com/liron93/matat-label/main/shopify-label-manager.html')
    .then(r => r.text())
    .then(html => {
      const div = document.createElement('div');
      div.innerHTML = html;
      document.body.appendChild(div.querySelector('#shopify-label-manager'));
      // Also append styles
      const style = div.querySelector('style');
      if (style) document.head.appendChild(style);
      // Also append script
      const script = div.querySelector('script');
      if (script) document.body.appendChild(script);
    });
})();
```

5. In `layout/theme.liquid`, add before `</body>`:
```html
<script src="{{ 'shopify-label-manager.js' | asset_url }}"></script>
```

## How to Use the Label Manager

Once installed, you'll see a floating widget (bottom right of your storefront):

1. **Create a Label**:
   - Click the "Create" tab
   - Enter label name (e.g., "Sale", "New", "Featured")
   - Enter the text that shows on products
   - Choose colors for background and text
   - Select label position (9 options: corners, edges, center)
   - Click "Save Label"

2. **View Your Labels**:
   - Click "My Labels" tab to see all saved labels
   - Labels automatically appear on product tiles

3. **Edit Labels**:
   - Delete unwanted labels using the delete button
   - Create new ones with different colors/positions

4. **Labels Persist**:
   - Labels are saved in browser localStorage
   - They will display for all visitors to your store

## Features

✨ **9 Position Options** - Top-left, top-center, top-right, middle-left, center, middle-right, bottom-left, bottom-center, bottom-right

🎨 **Custom Colors** - Full RGB color picker for both background and text colors

💾 **Persistent Storage** - Labels saved locally and displayed to all visitors

🔄 **Real-time Updates** - See changes instantly as you modify labels

📱 **Mobile Friendly** - Works seamlessly on all devices and screen sizes

## Troubleshooting

**Widget not appearing?**
- Make sure the code is added before the closing tag (</head> or </body>)
- Clear your browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
- Check that JavaScript is enabled in browser settings

**Labels not showing on products?**
- Refresh the page
- Make sure your theme has proper product grid structure
- Check browser console (F12) for any JavaScript errors

**Can't see the widget floating button?**
- Try scrolling to the bottom-right of the page
- Check if it's hidden behind other elements
- Ensure z-index isn't being overridden by theme CSS

## For Developers

**GitHub Repository:**
https://github.com/liron93/matat-label

**Technologies Used:**
- Pure JavaScript (no dependencies)
- HTML5/CSS3
- Browser localStorage for persistence
- Shopify theme integration

**To Deploy Custom Version:**
1. Fork the repository
2. Modify `shopify-label-manager.html` as needed
3. Push to your GitHub
4. Update the script src URL in your theme

---

**Version:** 1.0.0
**Created:** April 8, 2026
**License:** MIT
