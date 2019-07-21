const fs = require("fs");

const pp = require("puppeteer");
const _ = require("lodash");

(async () => {
////////////////////////////////////////////////////////////////////////////////
const urls = [ "https://github.com/GoogleChrome/puppeteer/blob/master/README.md"
             , "https://github.com/GoogleChrome/puppeteer"
             ];

const browser = await pp.launch({args: ['--no-sandbox','--disable-setuid-sandbox'], headless: false});
const tabs = await Promise.all([...Array(100)].map( (_, i) => browser.newPage() ));
await Promise.all(urls.map( (url, idx) => tabs[idx].goto(url)));
await Promise.all(urls.map( (url, idx) => tabs[idx].screenshot({path: `${idx}_oo.png`})));
await browser.close();
////////////////////////////////////////////////////////////////////////////////
})();
