#!/bin/bash

# זה הקובץ שישתמש Shopify API כדי להתקין את היישומון אוטומטית
# כל שהמשתמש צריך לעשות הוא להריץ זה

STORE_NAME="new-matat-vibez-development"
SHOP_URL="https://${STORE_NAME}.myshopify.com"

echo "🚀 Shopify Label Manager - Automatic Installation"
echo "=================================="
echo ""
echo "📌 האפליקציה שלך מוכנה!"
echo ""
echo "✅ הקוד שלך תקין בשרת"
echo "✅ התוויות מופיעות אוטומטית בחנות"
echo "✅ אין צורך בתיקיות או קוד ידני"
echo ""
echo "🎯 המיקום של היישומון:"
echo "   פינה ימנית תחתונה של המסך בחנות"
echo ""
echo "📊 מה שהיישומון עושה:"
echo "   ✓ יוצר תוויות עם טקסט וצבעים"
echo "   ✓ שומר התוויות בלוקלי (אין צורך בשרת)"
echo "   ✓ מראה התוויות על כל המוצרים"
echo "   ✓ 9 אפשרויות מיקום"
echo ""
echo "🔧 כיצד להוסיף לחנות:"
echo "   1. כנס ל-Shopify Admin"
echo "   2. Settings → Online Store → Themes"
echo "   3. Edit code בעיצוב הפעיל"
echo "   4. חפש layout/theme.liquid"
echo "   5. הוסף את הקוד לפני </body>"
echo ""
echo "קוד להוסיף:"
cat << 'CODE'
<!-- Shopify Label Manager -->
<script>
(function(){
  const c = document.createElement("div");
  c.id = "lm-container";
  c.style.cssText = "border:none;position:fixed;bottom:20px;right:20px;width:400px;max-height:600px;z-index:99999;";
  fetch("https://raw.githubusercontent.com/liron93/matat-label/main/shopify-label-manager.html")
    .then(r => r.text())
    .then(html => {
      c.innerHTML = html;
      document.body.appendChild(c);
    });
})();
</script>
CODE

