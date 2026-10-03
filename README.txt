THE BLISSFULL BITES - WEBSITE FILES

index.html
  The complete website in one file. All photos, styles and code are inside it.
  Double-click to open it in a browser, or upload it to any web host
  (Netlify Drop, GitHub Pages, Hostinger, etc.).

images/
  photos/   Product photos, compressed for the web.
  cutouts/  Product photos with the background removed (used in the hero and menu cards).

source/
  style.css   Design (colours, fonts, layout).
  app.js      Menu, cart, WhatsApp order message, reviews, admin panel.
  data.json   Menu items, prices, flavours, sizes and reviews.
  assets.json Images packed for embedding.
  build.py    Rebuilds index.html from the files above:  python3 build.py
              (writes blissfull-bites.html; run it from inside the source folder)

ORDERS
  Orders open WhatsApp to +91 96436 51810 with the items, total, name,
  date, delivery/pickup and address filled in.

ADMIN
  Footer link "Admin". Key: BLISS-ADMIN-4827   Password: Brownie@Bento92
  "Publish to website" saves changes only on the Claude-hosted version.
  On another host, edit source/data.json and rebuild, or ask for a
  version with a database.
