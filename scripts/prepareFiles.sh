./downloads/zimtools/zimdump dump --dir=./app-wiki/wiki-files  ./downloads/wiki.zim
# python3 scripts/indexCreator.py && 
# Build and tar next js app.
cp -r app-wiki/wiki-files/- app-wiki/wiki-files/I app-wiki/public
rm app-wiki/public/**/*.js
rm app-wiki/public/**/**/*.js
rm app-wiki/public/**/**/**/*.js
mv app-wiki/public/-/favicon app-wiki/public/

cd app-wiki && npm run build && cd out && tar -cf ../../wiki-website.tar . && cd ../..
