import json
css=open('style.css').read()
js=open('app.js').read()
assets=open('assets.json').read()
data=json.dumps(json.load(open('data.json')),ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
assert '</script' not in js.lower()
fonts='<link id="bb-fonts" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bowlby+One&family=Figtree:wght@500;600;700;800&family=Fraunces:ital,opsz,wght,SOFT,WONK@1,9..144,700,100,1&family=Poiret+One&display=swap">'
html=('<title>The Blissfull Bites</title>'+fonts+'<style id="bb-css">'+css+'</style><div id="app"></div>'
 '<script type="application/json" id="bb-assets">'+assets+'</script>'
 '<script type="application/json" id="bb-data">'+data+'</script>'
 '<script id="bb-js">'+js+'</script>')
open('blissfull-bites.html','w').write(html); print(len(html)//1024,'KB')
