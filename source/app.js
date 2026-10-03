(function(){
"use strict";
var DATA = JSON.parse(document.getElementById("bb-data").textContent);
var ASSETS = JSON.parse(document.getElementById("bb-assets").textContent);
var ADMIN_HASH = "1jdyt3r88xf";
var $ = function(s, r){ return (r || document).querySelector(s); };
var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var esc = function(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]; }); };
var rupee = function(n){ return "₹" + Number(n).toLocaleString("en-IN"); };
var store = {
  get: function(k){ try { return JSON.parse(localStorage.getItem(k)); } catch(e){ return null; } },
  set: function(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} },
  sget: function(k){ try { return sessionStorage.getItem(k); } catch(e){ return null; } },
  sset: function(k, v){ try { sessionStorage.setItem(k, v); } catch(e){} }
};
var NUM = "+91 96436 51810";

/* ---------- drawn illustrations for items without a photo ---------- */
var WS = 'stroke="#fff" stroke-width="7" stroke-linejoin="round" paint-order="stroke"';
var ILLUS = {
  jar: '<svg viewBox="0 0 160 180" aria-hidden="true"><defs><clipPath id="jc"><rect x="34" y="40" width="92" height="124" rx="16"/></clipPath></defs><rect x="30" y="36" width="100" height="132" rx="20" fill="#fff" '+WS+'/><g clip-path="url(#jc)"><rect x="30" y="122" width="100" height="46" fill="#6B3A26"/><rect x="30" y="104" width="100" height="18" fill="#FFF6E6"/><rect x="30" y="84" width="100" height="20" fill="#8B4A2B"/><rect x="30" y="68" width="100" height="16" fill="#FFF6E6"/><rect x="30" y="48" width="100" height="20" fill="#4A2617"/><path d="M30 104q12 8 24 0t24 0t24 0t28 0" fill="none" stroke="#C9923F" stroke-width="5"/></g><rect x="30" y="36" width="100" height="132" rx="20" fill="none" stroke="#1C2370" stroke-width="3.5"/><rect x="40" y="58" width="7" height="90" rx="3.5" fill="#fff" opacity=".55"/><rect x="24" y="26" width="112" height="16" rx="8" fill="#E3EDFE" stroke="#1C2370" stroke-width="3.5"/><circle cx="80" cy="38" r="15" fill="#C9923F" stroke="#1C2370" stroke-width="3"/><g fill="#7A4A1A"><circle cx="74" cy="34" r="2"/><circle cx="84" cy="36" r="2"/><circle cx="79" cy="43" r="2"/></g></svg>',
  crunchy: '<svg viewBox="0 0 160 140" aria-hidden="true"><path d="M20 52v52c0 12 27 22 60 22s60-10 60-22V52" fill="#6B3A26" '+WS+'/><path d="M20 82c0 12 27 22 60 22s60-10 60-22v8c0 12-27 22-60 22s-60-10-60-22z" fill="#FFF0D6"/><ellipse cx="80" cy="52" rx="60" ry="20" fill="#4A2617" stroke="#fff" stroke-width="7" paint-order="stroke"/><g fill="#E0A63E"><path d="M50 46l8-4 5 6-6 5z"/><path d="M76 40l9 1 1 7-8 2z"/><path d="M100 50l8-2 4 6-7 4z"/><path d="M64 58l7-3 4 5-6 4z"/><path d="M90 60l6-4 5 5-6 4z"/></g><g fill="#F3D985"><circle cx="40" cy="54" r="3"/><circle cx="118" cy="52" r="3"/><circle cx="82" cy="50" r="2.6"/><circle cx="58" cy="40" r="2.6"/><circle cx="108" cy="42" r="2.6"/></g></svg>',
  loaf: '<svg viewBox="0 0 160 130" aria-hidden="true"><path d="M20 64q0-22 24-24h72q24 2 24 24v38q0 10-10 10H30q-10 0-10-10z" fill="#E2A75E" '+WS+'/><path d="M20 64q8-38 60-40q52 2 60 40q-28-12-60-12T20 64z" fill="#B86B2A"/><path d="M50 40q14 8 30 4t30-2" fill="none" stroke="#8A4A1E" stroke-width="3.5" stroke-linecap="round"/><g stroke="#C98A44" stroke-width="2.5"><path d="M56 62v48M80 58v52M104 62v48"/></g><g><circle cx="40" cy="80" r="3.4" fill="#E0386B"/><circle cx="66" cy="94" r="3.4" fill="#3E8E41"/><circle cx="92" cy="78" r="3.4" fill="#F3D985"/><circle cx="118" cy="92" r="3.4" fill="#E0386B"/><circle cx="46" cy="100" r="3" fill="#F3D985"/><circle cx="110" cy="74" r="3" fill="#3E8E41"/></g></svg>',
  bento: '<svg viewBox="0 0 160 160" aria-hidden="true"><rect x="12" y="12" width="136" height="136" rx="26" fill="#FFFDF7" stroke="#1C2370" stroke-width="3.5"/><circle cx="80" cy="84" r="52" fill="#5A2F1D" '+WS+'/><g fill="none" stroke="#7A4A33" stroke-width="5" stroke-linecap="round"><path d="M50 74q30-12 60 0"/><path d="M46 92q34-12 68 0"/><path d="M56 108q24-8 48 0"/></g><g fill="#fff">'+(function(){ var s=""; for(var i=0;i<28;i++){ var a=i/28*Math.PI*2; s+='<circle cx="'+(80+46*Math.cos(a)).toFixed(1)+'" cy="'+(84+46*Math.sin(a)).toFixed(1)+'" r="2.2"/>'; } return s; })()+'</g><g><path d="M44 56c-3-3 1-8 4-4 3-4 7 1 4 4l-4 4z" fill="#F19DAA"/><path d="M110 60c-3-3 1-8 4-4 3-4 7 1 4 4l-4 4z" fill="#FDF196"/><path d="M38 100c-3-3 1-8 4-4 3-4 7 1 4 4l-4 4z" fill="#B9D1FB"/><path d="M116 106c-3-3 1-8 4-4 3-4 7 1 4 4l-4 4z" fill="#F19DAA"/><path d="M78 126c-3-3 1-8 4-4 3-4 7 1 4 4l-4 4z" fill="#FDF196"/></g><rect x="76" y="44" width="8" height="34" rx="3" fill="#B9D1FB" stroke="#1C2370" stroke-width="2"/><path d="M80 26c6 6 6 12 0 16-6-4-6-10 0-16z" fill="#FDB43C" stroke="#1C2370" stroke-width="2"/></svg>'
};
var COOKIE = '<svg viewBox="0 0 120 120" aria-hidden="true"><path fill="#E9B26A" stroke="#3548C0" stroke-width="6" d="M60 8c15 0 22 5 31 12s20 18 20 34c0 16-6 26-14 36s-20 21-37 21c-17 0-27-7-36-15S9 78 9 61c0-17 7-28 16-37S44 8 60 8z"/><g fill="#1C2370"><path d="M38 40l9-3 5 7-4 8-9-1z"/><path d="M70 30l8 1 3 8-6 5-7-4z"/><path d="M54 60l10-2 4 8-6 7-8-4z"/><path d="M82 62l8 2 1 9-8 3-5-7z"/><path d="M32 72l8 1 2 8-7 4-6-6z"/></g></svg>';
var SPARK = '<svg viewBox="-14 -14 28 28" aria-hidden="true"><path fill="currentColor" d="M0-13C2-3 3-2 13 0C3 2 2 3 0 13C-2 3-3 2-13 0C-3-2-2-3 0-13Z"/></svg>';
var BADGE = '<svg class="badge" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="57" fill="#FDF196" stroke="#1C2370" stroke-width="2.5"/><defs><path id="bbc" d="M60 60m-42 0a42 42 0 1 1 84 0a42 42 0 1 1-84 0"/></defs><text><textPath href="#bbc">FRESHLY BAKED • MADE TO ORDER • DELHI •</textPath></text><path fill="#F19DAA" stroke="#1C2370" stroke-width="2" d="M60 77C49 70 43 64 43 57c0-5 4-9 9-9 4 0 6 2 8 5 2-3 4-5 8-5 5 0 9 4 9 9 0 7-6 13-17 20z"/></svg>';
var ICON = {
  fresh: '<svg viewBox="0 0 40 40" fill="none" stroke="#1C2370" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M8 22h24l-2 12H10z" fill="#FDF196"/><path d="M14 16c-2-3 2-5 0-8M20 16c-2-3 2-5 0-8M26 16c-2-3 2-5 0-8"/></svg>',
  pin: '<svg viewBox="0 0 40 40" fill="none" stroke="#1C2370" stroke-width="2.4" aria-hidden="true"><path d="M20 36s11-11 11-19a11 11 0 0 0-22 0c0 8 11 19 11 19z" fill="#F19DAA"/><circle cx="20" cy="17" r="4" fill="#fff"/></svg>',
  cake: '<svg viewBox="0 0 40 40" fill="none" stroke="#1C2370" stroke-width="2.4" stroke-linejoin="round" aria-hidden="true"><path d="M7 22h26v12H7z" fill="#fff"/><path d="M7 26c4 3 9 3 13 0s9-3 13 0"/><path d="M20 12v10" /><path d="M20 5c3 3 3 5 0 7-3-2-3-4 0-7z" fill="#FDF196"/></svg>',
  chat: '<svg viewBox="0 0 40 40" fill="none" stroke="#1C2370" stroke-width="2.4" stroke-linejoin="round" aria-hidden="true"><path d="M6 10h28v18H16l-7 6v-6H6z" fill="#fff"/><path d="M12 17h16M12 22h10"/></svg>'
};
function media(img, fit){
  if (img && img.indexOf("illus:") === 0) return ILLUS[img.slice(6)] || ILLUS.bento;
  var s = img && img.indexOf("asset:") === 0 ? (ASSETS[img.slice(6)] || "") : (img || "");
  return s ? '<img loading="lazy" src="' + esc(s) + '" alt="">' : ILLUS.bento;
}
function fitOf(it){ return it.img && it.img.indexOf("illus:") === 0 ? "contain" : (it.fit || "cover"); }

/* ---------- page shell ---------- */
var IG = "https://www.instagram.com/" + DATA.instagram + "/";
var hello = "https://wa.me/" + DATA.whatsapp + "?text=" + encodeURIComponent("Hi The Blissfull Bites! I'd like to place an order.");
var custom = "https://wa.me/" + DATA.whatsapp + "?text=" + encodeURIComponent("Hi The Blissfull Bites! I'd like to ask about a custom order.");
var words = ["Brownies","Brookies","Cookie boxes","Cheesecakes","Tiramisu","Cake jars","Cake pops","Tea cakes","Muffins","Bento cakes"];
var marq = '<span>' + words.map(function(w){ return w + ' <i>✦</i>'; }).join(" ") + '</span>';
var wavePath = "M0 56V28C120 6 240 4 360 22S600 52 720 34S960 0 1080 12S1320 46 1440 26V56Z";

document.getElementById("app").innerHTML =
'<header class="top"><div class="wrap">' +
  '<a class="logo" href="#top">' + COOKIE + '<span>the <b>blissfull</b> bites</span></a>' +
  '<nav class="nav" aria-label="Sections"><a href="#menu">Menu</a><a href="#about">About</a><a href="#reviews">Reviews</a></nav>' +
  '<button class="pill cart-btn" id="cartBtn" type="button" aria-label="Open your cart">Cart <span class="count" id="cartCount">0</span></button>' +
  '<a class="pill wa-top" id="waTop" href="' + hello + '" target="_blank" rel="noopener">Order on WhatsApp</a>' +
'</div></header>' +
'<main>' +
'<section class="hero" id="top"><div class="hero-dots"></div><div class="wrap">' +
  '<div class="hero-copy">' +
    '<span class="tag eyebrow">Home bakery · Delhi</span>' +
    '<h1>Sweet treats, <span class="it">baked</span> for you.</h1>' +
    '<p class="lede">Handmade brownies, brookies, cheesecakes, cake jars and more. Baked fresh to order, packed beautifully, delivered with love.</p>' +
    '<div class="ctas"><a class="btn btn-sun" href="#menu">Explore the menu</a><a class="btn btn-line" href="' + hello + '" target="_blank" rel="noopener">Order on WhatsApp</a></div>' +
    '<div class="thumbs" aria-hidden="true"><span><img src="' + ASSETS.browniesCut + '" alt=""></span><span><img src="' + ASSETS.cheesecakeCut + '" alt=""></span><span><img src="' + ASSETS.cookieTubCut + '" alt=""></span><em>&amp; lots more →</em></div>' +
  '</div>' +
  '<div class="hero-art">' +
    '<div class="sun"></div><div class="arch"></div>' + BADGE +
    '<div class="obj o-cookie"><img src="' + ASSETS.biscoffCookieCut + '" alt="Loaded caramel cookie"></div>' +
    '<div class="obj o-tira"><img src="' + ASSETS.tiramisuCut + '" alt="Tiramisu with a cream heart"></div>' +
    '<div class="obj o-cake"><img src="' + ASSETS.brookieTinCut + '" alt="Brookie tin"></div>' +
    '<div class="obj o-bowl"><img src="' + ASSETS.heartBrownieCut + '" alt="Heart brownie bites with strawberries and Nutella"></div>' +
    '<span class="spark sp1">' + SPARK + '</span><span class="spark sp2">' + SPARK + '</span><span class="spark sp3">' + SPARK + '</span>' +
  '</div>' +
'</div></section>' +
'<div class="band" aria-hidden="true"><svg class="wave" viewBox="0 0 1440 56" preserveAspectRatio="none"><path d="' + wavePath + '"/></svg><div class="marquee"><div class="marquee-track">' + marq + marq + '</div></div><svg class="wave2" viewBox="0 0 1440 56" preserveAspectRatio="none"><path d="' + wavePath + '"/></svg></div>' +
'<section class="block about" id="about"><div class="wrap">' +
  '<div class="about-copy"><span class="kicker">delivery &amp; contact</span><h2>Freshly baked in <span class="it">Delhi.</span></h2>' +
    '<p>We’re a Delhi-based home bakery serving handcrafted brownies, cheesecakes, cake jars, tiramisu and more, all made fresh to order.</p>' +
    '<p>Deliveries across West Delhi are usually much faster. For other parts of Delhi NCR, delivery may take about 60–90 minutes depending on distance, traffic and order volume.</p>' +
    '<p>Follow our journey, new launches and customer favourites on Instagram: <a href="' + IG + '" target="_blank" rel="noopener">@' + esc(DATA.instagram) + '</a></p></div>' +
  '<div class="collage" aria-hidden="true"><figure class="c1"><img loading="lazy" src="' + ASSETS.chocoCookies + '" alt=""></figure><figure class="c2"><img loading="lazy" src="' + ASSETS.cookieBox + '" alt=""></figure><figure class="c3"><img loading="lazy" src="' + ASSETS.brownieBites + '" alt=""></figure><div class="stamp">Made to order</div></div>' +
'</div></section>' +
'<div class="facts"><div class="wrap"><ul>' +
  '<li>' + ICON.fresh + 'Baked fresh to order</li><li>' + ICON.pin + 'Delivery across Delhi NCR</li><li>' + ICON.cake + 'Custom cakes welcome</li><li>' + ICON.chat + 'Order on WhatsApp</li>' +
'</ul></div></div>' +
'<section class="block menu" id="menu"><div class="wrap">' +
  '<div class="head"><div><span class="kicker">what we bake</span><h2>Our <span class="it">menu</span></h2><p>Pick a size and flavour, add it to your cart, and send the order to us on WhatsApp.</p></div><div class="chips" id="chips" role="group" aria-label="Filter menu"></div></div>' +
  '<div class="grid" id="grid"></div>' +
'</div></section>' +
'<section class="block reviews" id="reviews"><div class="wrap">' +
  '<div class="head"><div><h2>What others say</h2><p>Love notes our customers sent us on Instagram.</p></div><a class="btn btn-white" href="' + IG + '" target="_blank" rel="noopener">See more on Instagram</a></div>' +
  '<div class="reel" id="reviewReel"></div>' +
'</div></section>' +
'<section class="block custom" id="custom"><span class="ring" style="width:420px;height:420px;left:-140px;top:-160px"></span><span class="ring" style="width:300px;height:300px;right:-90px;bottom:-120px"></span><div class="wrap">' +
  '<h2>Want something <span class="it">custom?</span></h2>' +
  '<p>Planning a birthday, anniversary or office party? We do custom flavours, sizes and beautiful decorations. Message us and let’s make something special.</p>' +
  '<a class="btn btn-sun" href="' + custom + '" target="_blank" rel="noopener">Ask on WhatsApp</a>' +
'</div></section>' +
'</main>' +
'<footer><div class="wrap">' +
  '<p class="word">the blissfull bites</p>' +
  '<div class="foot-row">' +
    '<div><span class="lbl eyebrow">Order on WhatsApp</span><b style="user-select:all">' + NUM + '</b></div>' +
    '<div><span class="lbl eyebrow">Instagram</span><a href="' + IG + '" target="_blank" rel="noopener">@' + esc(DATA.instagram) + '</a></div>' +
    '<div><span class="lbl eyebrow">Kitchen</span>Home bakery in Delhi</div>' +
  '</div>' +
  '<div class="tiny"><span>Everything is baked fresh to order.</span><a href="#admin">Admin</a></div>' +
'</div></footer>' +
'<button class="pill cart-btn fab" id="fab" type="button" aria-label="Open your cart">Cart <span class="count" id="fabCount">0</span></button>' +
'<div class="scrim" id="scrim"></div>' +
'<aside class="drawer" id="drawer" aria-label="Your cart" aria-hidden="true">' +
  '<div class="drawer-head"><h2>Your cart</h2><button class="x" id="closeCart" type="button" aria-label="Close">×</button></div>' +
  '<div class="drawer-body" id="drawerBody"></div>' +
'</aside>' +
'<div class="toast" id="toast" role="status" aria-live="polite"></div>' +
'<div class="admin" id="admin" hidden></div>';

/* ---------- menu ---------- */
var activeCat = "All";
var picked = {};
var cart = (store.get("bb-cart2") || []).filter(function(l){ return findItem(l.id); });

function findItem(id){ for (var i=0;i<DATA.items.length;i++) if (DATA.items[i].id === id) return DATA.items[i]; return null; }
function cats(){ var c = ["All"]; DATA.items.forEach(function(it){ if (c.indexOf(it.cat) < 0) c.push(it.cat); }); return c; }
function sizesOf(it){ var s = []; it.options.forEach(function(o){ if (o.size && s.indexOf(o.size) < 0) s.push(o.size); }); return s; }
function optName(o){ return (o.size ? o.size + " · " : "") + o.label; }
function keyOf(id, o){ return id + "|" + (o.size || "") + "|" + o.label; }
function inCart(k){ for (var i=0;i<cart.length;i++) if (cart[i].key === k) return i; return -1; }
function pickedIdx(it){ var i = picked[it.id]; return (i != null && it.options[i]) ? i : 0; }
function showLabel(it){ return it.options.length > 1 || sizesOf(it).length > 0; }

function renderChips(){
  var c = cats(); if (c.indexOf(activeCat) < 0) activeCat = "All";
  $("#chips").innerHTML = c.map(function(x){ return '<button class="chip" type="button" data-cat="' + esc(x) + '" aria-pressed="' + (x === activeCat) + '">' + esc(x) + '</button>'; }).join("");
}
function renderMenu(){
  renderChips();
  var items = DATA.items.filter(function(it){ return activeCat === "All" || it.cat === activeCat; });
  if (!items.length){ $("#grid").innerHTML = '<p class="empty-note">Nothing here yet. Message us on WhatsApp to ask what’s baking.</p>'; return; }
  $("#grid").innerHTML = items.map(function(it){
    var sel = pickedIdx(it), opt = it.options[sel] || {label:"", price:0};
    var sizes = sizesOf(it), there = inCart(keyOf(it.id, opt)) > -1;
    var sizeRow = sizes.length > 1 ? '<div class="sizes" role="group" aria-label="Size">' + sizes.map(function(s){ return '<button class="size" type="button" data-id="' + esc(it.id) + '" data-size="' + esc(s) + '" aria-pressed="' + (opt.size === s) + '">' + esc(s) + '</button>'; }).join("") + '</div>' : '';
    var list = it.options.map(function(o, i){ return {o:o, i:i}; }).filter(function(x){ return !sizes.length || x.o.size === opt.size; });
    var flav = list.length > 1 ? '<div class="flavors" role="group" aria-label="Flavour">' + list.map(function(x){
      return '<button class="flavor" type="button" data-id="' + esc(it.id) + '" data-i="' + x.i + '" aria-pressed="' + (x.i === sel) + '">' + esc(x.o.label) + ' <small>' + rupee(x.o.price) + '</small></button>'; }).join("") + '</div>' : '';
    var fit = fitOf(it);
    return '<article class="card">' +
      '<div class="tile ' + fit + '">' + media(it.img, fit).replace('alt=""', 'alt="' + esc(it.name) + '"') + (it.soldOut ? '<span class="soldout">Sold out for now</span>' : '') + '</div>' +
      '<div class="card-body"><h3>' + esc(it.name) + '</h3>' + (it.desc ? '<p class="desc">' + esc(it.desc) + '</p>' : '') + sizeRow + flav +
      '<div class="card-foot"><span class="price">' + rupee(opt.price) + '</span>' +
      '<button class="add' + (there ? ' in' : '') + '" type="button" data-add="' + esc(it.id) + '"' + (it.soldOut ? ' disabled' : '') + '>' + (it.soldOut ? 'Sold out' : there ? 'In cart ✓' : '+ Add') + '</button></div></div>' +
    '</article>';
  }).join("");
}
document.addEventListener("click", function(e){
  var t = e.target.closest("button"); if (!t || t.closest("#admin") || t.closest("#drawer")) return;
  if (t.dataset.cat){ activeCat = t.dataset.cat; renderMenu(); }
  else if (t.classList.contains("size")){ var it = findItem(t.dataset.id); for (var i=0;i<it.options.length;i++){ if (it.options[i].size === t.dataset.size){ picked[it.id] = i; break; } } renderMenu(); }
  else if (t.classList.contains("flavor")){ picked[t.dataset.id] = +t.dataset.i; renderMenu(); }
  else if (t.dataset.add){ addToCart(t.dataset.add); }
});

/* ---------- cart ---------- */
var toastTimer;
function toast(msg){ var el = $("#toast"); el.textContent = msg; el.classList.add("on"); clearTimeout(toastTimer); toastTimer = setTimeout(function(){ el.classList.remove("on"); }, 2800); }
function saveCart(){ store.set("bb-cart2", cart); }
function bump(){ ["#cartBtn","#fab"].forEach(function(s){ var b=$(s); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }); }
function addToCart(id){
  var it = findItem(id); if (!it || it.soldOut) return;
  var o = it.options[pickedIdx(it)], k = keyOf(id, o), nm = it.name + (showLabel(it) ? " (" + optName(o) + ")" : "");
  if (inCart(k) > -1){ toast("Only one of each item per order. " + nm + " is already in your cart."); return; }
  cart.push({key:k, id:id, size:o.size || "", label:o.label, price:o.price, name:it.name});
  saveCart(); renderMenu(); renderCart(); bump();
  toast("Added " + nm + " to your cart");
}
var limitKey = null, limitTimer;
var form = store.get("bb-form") || {name:"", mode:"Delivery", date:"", addr:"", note:""};
function total(){ return cart.reduce(function(s, l){ return s + Number(l.price); }, 0); }
function lineName(l){ var it = findItem(l.id); return l.name + (it && showLabel(it) ? " (" + (l.size ? l.size + " · " : "") + l.label + ")" : ""); }
function message(){
  var lines = cart.map(function(l, i){ return (i+1) + ". " + lineName(l) + " - " + rupee(l.price); });
  var d = form.date ? new Date(form.date + "T00:00").toLocaleDateString("en-IN", {day:"numeric", month:"short", year:"numeric"}) : "";
  return "Hi The Blissfull Bites! I'd like to place an order:\n\n" + lines.join("\n") + "\n\nTotal: " + rupee(total()) +
    "\n\nName: " + form.name + "\n" + form.mode + (d ? "\nDate needed: " + d : "") + (form.mode === "Delivery" && form.addr ? "\nAddress / area: " + form.addr : "") + (form.note ? "\nNote: " + form.note : "");
}
function waHref(){ return "https://wa.me/" + DATA.whatsapp + "?text=" + encodeURIComponent(message()); }
function updateCounts(){ $("#cartCount").textContent = cart.length; $("#fabCount").textContent = cart.length; $("#fab").classList.toggle("has", cart.length > 0); }
function renderCart(){
  updateCounts();
  var b = $("#drawerBody");
  if (!cart.length){ b.innerHTML = '<div class="cart-empty"><img src="' + ASSETS.tiramisuCut + '" alt=""><p>Your cart is empty.<br>Add a few treats from the menu.</p><a class="btn btn-blue" href="#menu" id="toMenu">Browse the menu</a></div>'; return; }
  var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  b.innerHTML = cart.map(function(l){
    var it = findItem(l.id) || {options:[]}; var multi = showLabel(it);
    return '<div class="line" data-key="' + esc(l.key) + '"><div class="thumb ' + fitOf(it) + '">' + media(it.img, fitOf(it)) + '</div><div class="nm">' + esc(l.name) + (multi ? '<small>' + esc((l.size ? l.size + " · " : "") + l.label) + '</small>' : '') + '</div>' +
      '<div class="rt"><span class="amt">' + rupee(l.price) + '</span><div class="stepper"><button type="button" data-dec="' + esc(l.key) + '" aria-label="Remove ' + esc(l.name) + '">−</button><span>1</span><button type="button" data-inc="' + esc(l.key) + '" aria-label="Add another ' + esc(l.name) + '">+</button></div></div>' +
      (limitKey === l.key ? '<p class="limit">Only one per item. Need more? Mention it in the note below.</p>' : '') + '</div>';
  }).join("") +
  '<div class="total"><span>Total</span><b>' + rupee(total()) + '</b></div>' +
  '<form class="form" id="orderForm" novalidate>' +
    '<div class="field"><label for="o-name">Your name</label><input id="o-name" autocomplete="name" value="' + esc(form.name) + '" placeholder="e.g. Riya"></div>' +
    '<div class="field"><span class="lab">How do you want it?</span><div class="seg" role="radiogroup" aria-label="Delivery or pickup">' +
      ['Delivery','Pickup'].map(function(m){ return '<label><input type="radio" name="o-mode" id="o-mode-' + m + '" value="' + m + '"' + (form.mode === m ? ' checked' : '') + '><span>' + m + '</span></label>'; }).join("") + '</div></div>' +
    '<div class="field"><label for="o-date">Date needed</label><input type="date" id="o-date" min="' + today.toISOString().slice(0,10) + '" value="' + esc(form.date) + '"></div>' +
    (form.mode === "Delivery" ? '<div class="field"><label for="o-addr">Delivery address or area</label><input id="o-addr" value="' + esc(form.addr) + '" placeholder="e.g. Janakpuri, West Delhi"></div>' : '') +
    '<div class="field"><label for="o-note">Note (optional)</label><input id="o-note" value="' + esc(form.note) + '" placeholder="Message on the cake, extra quantity, timing"></div>' +
    '<p class="err" id="orderErr" hidden></p>' +
    '<a class="wa" id="waBtn" href="' + esc(waHref()) + '" target="_blank" rel="noopener">Send order on WhatsApp</a>' +
    '<div class="wa-num">Orders go to <b>' + NUM + '</b><button class="mini" type="button" id="copyOrder">Copy order text</button></div>' +
  '</form>';
}
function readForm(){
  var g = function(id){ var el = document.getElementById(id); return el ? el.value.trim() : null; };
  form.name = g("o-name") || ""; form.date = g("o-date") || "";
  var addr = g("o-addr"); if (addr !== null) form.addr = addr;
  form.note = g("o-note") || "";
  var m = $('input[name="o-mode"]:checked'); if (m) form.mode = m.value;
  store.set("bb-form", form);
  var a = $("#waBtn"); if (a) a.href = waHref();
}
function openCart(){ renderCart(); $("#drawer").classList.add("on"); $("#scrim").classList.add("on"); $("#drawer").setAttribute("aria-hidden","false"); setTimeout(function(){ $("#closeCart").focus(); }, 50); }
function closeCart(){ $("#drawer").classList.remove("on"); $("#scrim").classList.remove("on"); $("#drawer").setAttribute("aria-hidden","true"); }
$("#cartBtn").addEventListener("click", openCart);
$("#fab").addEventListener("click", openCart);
$("#waTop").addEventListener("click", function(e){ if (cart.length){ e.preventDefault(); openCart(); } });
$("#closeCart").addEventListener("click", closeCart);
$("#scrim").addEventListener("click", closeCart);
document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeCart(); });
$("#drawer").addEventListener("input", readForm);
$("#drawer").addEventListener("change", function(e){ readForm(); if (e.target.name === "o-mode"){ renderCart(); } });
$("#drawer").addEventListener("click", function(e){
  var t = e.target.closest("button, a"); if (!t) return;
  if (t.id === "toMenu"){ closeCart(); return; }
  if (t.dataset.dec){ var i = inCart(t.dataset.dec); if (i > -1){ cart.splice(i,1); saveCart(); renderCart(); renderMenu(); } return; }
  if (t.dataset.inc){
    limitKey = t.dataset.inc; renderCart(); var row = $('.line[data-key="' + CSS.escape(limitKey) + '"]'); if (row) row.classList.add("shake");
    clearTimeout(limitTimer); limitTimer = setTimeout(function(){ limitKey = null; var p = $(".limit"); if (p) p.remove(); }, 3500); return;
  }
  if (t.id === "copyOrder"){
    readForm(); var txt = message();
    try { navigator.clipboard.writeText(txt).then(function(){ toast("Order copied. Paste it in WhatsApp to " + NUM + "."); }, function(){ toast("Copy didn't work here. Use the green button instead."); }); }
    catch(err){ toast("Copy didn't work here. Use the green button instead."); }
    return;
  }
  if (t.id === "waBtn"){
    readForm();
    var err = !form.name ? "Add your name so we know who the order is for." : !form.date ? "Pick the date you need your order." : (form.mode === "Delivery" && !form.addr) ? "Add your delivery address or area." : "";
    var el = $("#orderErr");
    if (err){ e.preventDefault(); el.textContent = err; el.hidden = false; return; }
    el.hidden = true; toast("Opening WhatsApp with your order…");
  }
});

/* ---------- reviews ---------- */
function renderReviews(){
  var r = DATA.reviews || [];
  $("#reviewReel").innerHTML = r.length ? r.map(function(v){
    var h = v.handle.replace(/^@/,"");
    return '<article class="review"><div class="who"><span class="av">' + esc(h.charAt(0)) + '</span><div>@' + esc(h) + '<small>via Instagram</small></div></div>' +
      (v.rating ? '<div class="stars" aria-label="' + v.rating + ' out of 5">' + "★★★★★".slice(0, v.rating) + '<span style="opacity:.25">' + "★★★★★".slice(v.rating) + '</span></div>' : '') +
      (v.text ? '<blockquote>' + esc(v.text) + '</blockquote>' : '') + (v.img ? '<img loading="lazy" src="' + esc(v.img) + '" alt="Review screenshot from @' + esc(h) + '">' : '') + '</article>';
  }).join("") : '<div class="review empty"><h3>Reviews are on their way</h3><p style="margin:0;font-weight:600">Customer love notes from Instagram will show up here.</p><a class="ig-link" href="' + IG + '" target="_blank" rel="noopener">Read them on @' + esc(DATA.instagram) + '</a></div>';
}

/* ---------- admin ---------- */
var cyrb53 = function(str, seed){ seed = seed || 7; var h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed; for (var i=0, ch; i<str.length; i++){ ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); } h1 = Math.imul(h1 ^ (h1>>>16), 2246822507); h1 ^= Math.imul(h2 ^ (h2>>>13), 3266489909); h2 = Math.imul(h2 ^ (h2>>>16), 2246822507); h2 ^= Math.imul(h1 ^ (h1>>>13), 3266489909); return (4294967296 * (2097151 & h2) + (h1>>>0)).toString(36); };
var authed = store.sget("bb-admin") === "1";
var tab = "menu", editing = null, armed = null, dirty = 0, status = "";
var blankItem = function(){ return {id:"", name:"", cat:"", desc:"", img:"", fit:"cover", soldOut:false, options:[{size:"", label:"", price:""}]}; };

function routeAdmin(){ var on = location.hash === "#admin"; $("#admin").hidden = !on; document.body.style.overflow = on ? "hidden" : ""; if (on) renderAdmin(); }
window.addEventListener("hashchange", routeAdmin);

function renderAdmin(){
  var a = $("#admin");
  var top = '<div class="admin-top"><div class="wrap"><h2>Bakery admin</h2><a class="x" href="#menu" aria-label="Back to the website">×</a></div></div>';
  if (!authed){
    a.innerHTML = top + '<div class="wrap pad"><form class="login" id="loginForm"><h3>Sign in</h3><p class="hint">For the bakery team. Customers don’t need an account.</p>' +
      '<div class="field"><label for="a-key">Admin key</label><input id="a-key" autocomplete="username"></div>' +
      '<div class="field"><label for="a-pass">Password</label><input id="a-pass" type="password" autocomplete="current-password"></div>' +
      '<p class="err" id="loginErr" hidden>That key and password don’t match. Check for extra spaces and try again.</p>' +
      '<button class="btn btn-blue" type="submit">Sign in</button></form></div>';
    return;
  }
  var body = '<div class="tabs">' + [["menu","Menu items"],["edit", editing && editing.id ? "Edit item" : "Add new item"],["reviews","Reviews"]].map(function(t){ return '<button class="chip" type="button" data-tab="' + t[0] + '" aria-pressed="' + (tab === t[0]) + '">' + t[1] + '</button>'; }).join("") + '</div>';
  if (tab === "menu"){
    body += '<div class="panel"><h3>Menu items</h3><p class="hint">Edit prices and flavours, mark an item sold out, or remove it. Changes go live when you press Publish.</p>' +
      DATA.items.map(function(it){
        var ps = it.options.map(function(o){ return Number(o.price); }), lo = Math.min.apply(null, ps), hi = Math.max.apply(null, ps);
        return '<div class="arow"><div class="thumb ' + fitOf(it) + '">' + media(it.img, fitOf(it)) + '</div><div class="meta">' + esc(it.name) + (it.soldOut ? ' · <span style="color:#B3123E">sold out</span>' : '') + '<small>' + esc(it.cat) + ' · ' + (lo === hi ? rupee(lo) : rupee(lo) + "–" + rupee(hi)) + ' · ' + it.options.length + ' option' + (it.options.length > 1 ? 's' : '') + '</small></div>' +
          '<div class="acts"><button class="mini" type="button" data-edit="' + esc(it.id) + '">Edit</button><button class="mini" type="button" data-sold="' + esc(it.id) + '">' + (it.soldOut ? 'Back in stock' : 'Sold out') + '</button><button class="mini danger' + (armed === it.id ? ' arm' : '') + '" type="button" data-del="' + esc(it.id) + '">' + (armed === it.id ? 'Tap again to delete' : 'Delete') + '</button></div></div>';
      }).join("") + '<button class="btn btn-white" type="button" data-new="1" style="justify-self:start">+ Add new item</button></div>';
  } else if (tab === "edit"){
    var e = editing || (editing = blankItem());
    var catList = cats().slice(1);
    body += '<form class="panel" id="itemForm" novalidate><h3>' + (e.id ? 'Edit ' + esc(e.name) : 'Add a new item') + '</h3>' +
      '<div class="two"><div class="field"><label for="i-name">Item name</label><input id="i-name" value="' + esc(e.name) + '" placeholder="e.g. Red Velvet Jar"></div>' +
      '<div class="field"><label for="i-cat">Category</label><input id="i-cat" list="i-cats" value="' + esc(e.cat) + '" placeholder="e.g. Cakes"><datalist id="i-cats">' + catList.map(function(c){ return '<option value="' + esc(c) + '">'; }).join("") + '</datalist></div></div>' +
      '<div class="field"><label for="i-desc">Short description (optional)</label><input id="i-desc" value="' + esc(e.desc) + '" placeholder="One line customers will see"></div>' +
      '<div class="field"><label for="i-photo">Photo</label><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">' + (e.img ? '<div class="preview">' + media(e.img, "cover") + '</div>' : '') + '<input id="i-photo" type="file" accept="image/*"></div><p class="hint">Phone photos are fine; they are resized automatically.</p></div>' +
      '<div class="field"><span class="lab">Options and prices (₹)</span><div class="opts" id="opts"><div class="opt opt-h"><span>Size</span><span>Flavour</span><span>Price</span><span></span></div>' + e.options.map(function(o, i){ return '<div class="opt"><input id="o-s-' + i + '" value="' + esc(o.size || "") + '" placeholder="500g" aria-label="Size ' + (i+1) + '"><input id="o-l-' + i + '" value="' + esc(o.label) + '" placeholder="e.g. Nutella" aria-label="Flavour ' + (i+1) + '"><input id="o-p-' + i + '" type="number" inputmode="numeric" min="0" value="' + esc(o.price) + '" placeholder="Price" aria-label="Price ' + (i+1) + '"><button class="x" type="button" data-rmopt="' + i + '" aria-label="Remove option" style="width:34px;height:34px">×</button></div>'; }).join("") + '</div>' +
      '<button class="mini" type="button" id="addOpt" style="justify-self:start">+ Add option</button><p class="hint">Leave Size empty if the item comes in one size. Fill it in (Bento, 500g, 1kg) to show size buttons on the card.</p></div>' +
      '<p class="err" id="itemErr" hidden></p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-blue" type="submit">' + (e.id ? 'Save changes' : 'Add to menu') + '</button><button class="btn btn-white" type="button" id="cancelEdit">Cancel</button></div></form>';
  } else {
    body += '<form class="panel" id="revForm" novalidate><h3>Add a review</h3><p class="hint">Copy a comment or DM from Instagram, or upload its screenshot. Add only real reviews from customers.</p>' +
      '<div class="two"><div class="field"><label for="r-handle">Instagram handle</label><input id="r-handle" placeholder="@customer.handle"></div>' +
      '<div class="field"><label for="r-rate">Stars (optional)</label><select id="r-rate"><option value="">No stars</option><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option></select></div></div>' +
      '<div class="field"><label for="r-text">What they said</label><textarea id="r-text" rows="3" placeholder="Paste their words"></textarea></div>' +
      '<div class="field"><label for="r-img">Screenshot (optional)</label><input id="r-img" type="file" accept="image/*"></div>' +
      '<p class="err" id="revErr" hidden></p><button class="btn btn-blue" type="submit" style="justify-self:start">Add review</button></form>' +
      '<div class="panel" style="margin-top:16px"><h3>On the website (' + (DATA.reviews || []).length + ')</h3>' +
      ((DATA.reviews || []).length ? DATA.reviews.map(function(r){ return '<div class="arow"><div class="thumb">' + (r.img ? '<img src="' + esc(r.img) + '" alt="">' : '') + '</div><div class="meta">@' + esc(r.handle.replace(/^@/,"")) + '<small>' + esc((r.text || "Screenshot").slice(0,90)) + '</small></div><div class="acts"><button class="mini danger' + (armed === r.id ? ' arm' : '') + '" type="button" data-rdel="' + esc(r.id) + '">' + (armed === r.id ? 'Tap again to remove' : 'Remove') + '</button></div></div>'; }).join("") : '<p class="hint">No reviews yet. The website shows a link to your Instagram until you add some.</p>') + '</div>';
  }
  var bar = '<div class="savebar"><p>' + (status ? esc(status) : dirty ? dirty + ' unpublished change' + (dirty > 1 ? 's' : '') + '. Customers see them after you publish.' : 'Everything is live.') + '</p><button class="btn btn-blue" type="button" id="publishBtn"' + (dirty ? '' : ' disabled style="opacity:.5"') + '>Publish to website</button></div>';
  a.innerHTML = top + '<div class="wrap pad">' + body + '<p class="note" style="margin-top:20px">Unpublished changes are lost if you close or reload this page.</p></div>' + bar;
}
function changed(msg){ dirty++; status = ""; renderMenu(); renderReviews(); renderAdmin(); if (msg) toast(msg); }
function slug(s){ var b = s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || "item", id = b, n = 2; while (findItem(id)) id = b + "-" + (n++); return id; }
function compress(file, max){
  return new Promise(function(res, rej){
    var fr = new FileReader();
    fr.onerror = rej;
    fr.onload = function(){ var im = new Image(); im.onerror = rej; im.onload = function(){
      var s = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement("canvas");
      c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
      var x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0,0,c.width,c.height); x.drawImage(im, 0, 0, c.width, c.height);
      var u = c.toDataURL("image/webp", 0.76); if (u.indexOf("data:image/webp") !== 0) u = c.toDataURL("image/jpeg", 0.8); res(u);
    }; im.src = fr.result; };
    fr.readAsDataURL(file);
  });
}
function syncEditing(){
  if (!editing) return;
  var g = function(id){ var el = document.getElementById(id); return el ? el.value : ""; };
  editing.name = g("i-name"); editing.cat = g("i-cat"); editing.desc = g("i-desc");
  editing.options = editing.options.map(function(o, i){ return {size: g("o-s-" + i), label: g("o-l-" + i), price: g("o-p-" + i)}; });
}
$("#admin").addEventListener("submit", function(e){
  e.preventDefault();
  var f = e.target;
  if (f.id === "loginForm"){
    var k = $("#a-key").value.trim(), p = $("#a-pass").value;
    if (cyrb53(k + "|" + p) === ADMIN_HASH){ authed = true; store.sset("bb-admin", "1"); renderAdmin(); }
    else $("#loginErr").hidden = false;
  }
  if (f.id === "itemForm"){
    syncEditing();
    var e2 = editing, err = "";
    e2.name = e2.name.trim(); e2.cat = e2.cat.trim() || "Treats"; e2.desc = e2.desc.trim();
    e2.options = e2.options.filter(function(o){ return o.label.trim() || o.size.trim() || String(o.price).trim(); }).map(function(o){ var r = {label:o.label.trim() || o.size.trim() || "Classic", price: Number(o.price)}; if (o.size.trim() && o.label.trim()) r.size = o.size.trim(); return r; });
    if (!e2.name) err = "Give the item a name.";
    else if (!e2.options.length) err = "Add at least one option with a price.";
    else if (e2.options.some(function(o){ return !(o.price > 0); })) err = "Every option needs a price above ₹0.";
    else if (!e2.img) err = "Add a photo so customers can see it.";
    if (err){ if (!e2.options.length) e2.options = [{size:"", label:"", price:""}]; renderAdmin(); var el = $("#itemErr"); el.textContent = err; el.hidden = false; return; }
    var isNew = !e2.id;
    if (isNew){ e2.id = slug(e2.name); DATA.items.push(e2); }
    else { for (var i=0;i<DATA.items.length;i++) if (DATA.items[i].id === e2.id) DATA.items[i] = e2; }
    var nm = e2.name; editing = null; tab = "menu"; changed(isNew ? nm + " added. Publish to show it to customers." : nm + " updated.");
  }
  if (f.id === "revForm"){
    var h = $("#r-handle").value.trim().replace(/^@/, ""), tx = $("#r-text").value.trim(), rate = Number($("#r-rate").value) || 0, file = $("#r-img").files[0];
    var showErr = function(m){ var el = $("#revErr"); el.textContent = m; el.hidden = false; };
    if (!h) return showErr("Add the customer’s Instagram handle.");
    if (!tx && !file) return showErr("Paste what they said or add a screenshot.");
    var done = function(img){ DATA.reviews = DATA.reviews || []; DATA.reviews.unshift({id: "r" + Date.now().toString(36), handle: h, text: tx, rating: rate, img: img || ""}); changed("Review added."); };
    if (file) compress(file, 640).then(done, function(){ showErr("That image couldn’t be read. Try a PNG or JPG screenshot."); }); else done("");
  }
});
$("#admin").addEventListener("change", function(e){
  if (e.target.id === "i-photo" && e.target.files[0]){
    syncEditing();
    compress(e.target.files[0], 720).then(function(u){ editing.img = u; editing.fit = "cover"; renderAdmin(); }, function(){ toast("That photo couldn’t be read. Try a JPG or PNG."); });
  }
});
$("#admin").addEventListener("click", function(e){
  var t = e.target.closest("button"); if (!t) return;
  if (t.dataset.tab){ if (tab === "edit") syncEditing(); tab = t.dataset.tab; armed = null; renderAdmin(); return; }
  if (t.dataset.new){ editing = blankItem(); tab = "edit"; renderAdmin(); return; }
  if (t.dataset.edit){ editing = JSON.parse(JSON.stringify(findItem(t.dataset.edit))); editing.options.forEach(function(o){ o.size = o.size || ""; }); tab = "edit"; renderAdmin(); return; }
  if (t.dataset.sold){ var it = findItem(t.dataset.sold); it.soldOut = !it.soldOut; changed(it.name + (it.soldOut ? " marked sold out." : " is back in stock.")); return; }
  if (t.dataset.del){
    if (armed !== t.dataset.del){ armed = t.dataset.del; renderAdmin(); return; }
    var nm = findItem(armed).name; DATA.items = DATA.items.filter(function(x){ return x.id !== armed; }); cart = cart.filter(function(l){ return l.id !== armed; }); saveCart(); updateCounts(); armed = null; changed(nm + " removed."); return;
  }
  if (t.dataset.rdel){
    if (armed !== t.dataset.rdel){ armed = t.dataset.rdel; renderAdmin(); return; }
    DATA.reviews = DATA.reviews.filter(function(r){ return r.id !== armed; }); armed = null; changed("Review removed."); return;
  }
  if (t.id === "addOpt"){ syncEditing(); var last = editing.options[editing.options.length - 1] || {}; editing.options.push({size: last.size || "", label:"", price:""}); renderAdmin(); var inp = $("#o-l-" + (editing.options.length - 1)); if (inp) inp.focus(); return; }
  if (t.dataset.rmopt){ syncEditing(); editing.options.splice(+t.dataset.rmopt, 1); if (!editing.options.length) editing.options.push({size:"", label:"", price:""}); renderAdmin(); return; }
  if (t.id === "cancelEdit"){ editing = null; tab = "menu"; renderAdmin(); return; }
  if (t.id === "publishBtn"){ publish(); }
});

function buildPage(){
  var resetCss = "";
  $$("head style").some(function(s){ if (s.textContent.indexOf("safe-area-inset") > -1){ resetCss = s.textContent; return true; } return false; });
  if (!resetCss) resetCss = ":root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px/1.5 system-ui,sans-serif;background:#fafaf9}img{max-width:100%}[hidden]{display:none!important}";
  var dataTxt = JSON.stringify(DATA).replace(/</g, "\\u003c");
  var tag = "script";
  return '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>' + resetCss + '</style></head><body>' +
    '<title>The Blissfull Bites</title>' + document.getElementById("bb-fonts").outerHTML +
    '<style id="bb-css">' + document.getElementById("bb-css").textContent + '</style><div id="app"></div>' +
    '<' + tag + ' type="application/json" id="bb-assets">' + document.getElementById("bb-assets").textContent + '</' + tag + '>' +
    '<' + tag + ' type="application/json" id="bb-data">' + dataTxt + '</' + tag + '>' +
    '<' + tag + ' id="bb-js">' + document.getElementById("bb-js").textContent + '</' + tag + '>' +
    '</body></html>';
}
function publish(){
  var btn = $("#publishBtn"); btn.disabled = true; btn.textContent = "Publishing…";
  var fail = function(m){ status = m; renderAdmin(); };
  var api = window.claude && window.claude.use ? window.claude.use("artifact") : Promise.resolve(null);
  Promise.resolve(api).then(function(art){
    if (!art) return fail("Publishing works only when this page is open in Claude, signed in as the site owner.");
    return art.publish(buildPage()).then(function(){ dirty = 0; status = "Published. The website is reloading with your changes…"; renderAdmin(); }, function(err){
      var c = err && err.code;
      if (c === "conflict") fail("A newer version was published a moment ago. The page is reloading; make your change again after it loads.");
      else if (c === "not_writer" || c === "not_granted" || c === "consent_required" || c === "capability_disabled" || c === "not_declared") fail("This account can view the site but can’t publish it. Open it signed in to Claude as the site owner.");
      else if (c === "too_large") fail("The site is too large to publish. Remove a few photos or reviews and try again.");
      else if (c === "rate_limited") fail("Publishing too often. Wait a minute, then publish again.");
      else fail("Publishing didn’t go through. Wait a moment and press Publish again.");
    });
  });
}

renderMenu(); renderReviews(); updateCounts(); routeAdmin();
})();
