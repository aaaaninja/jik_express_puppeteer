const fs = require("fs");

const pp = require("puppeteer");
const R  = require("ramda");
const _  = require("lodash");

(async () => {
////////////////////////////////////////////////////////////////////////////////
const urls = [ "https://github.com/GoogleChrome/puppeteer/blob/master/README.md"
             , "https://github.com/GoogleChrome/puppeteer"
             ];

const browser = await pp.launch({args: ['--no-sandbox','--disable-setuid-sandbox'], headless: false}); // debug用途にheadlessをfalseにしてgui表示させてる.
const tabs    = await Promise.all([...Array(100)].map( (_, i) => browser.newPage() )); // テキトーに100枚バっとtabを開いてる.
await Promise.all(urls.map( (url, idx) => tabs[idx].goto(url))); // すべて並列で進むが、次に行に行くのは一番遅い読み込みのやつに引っ張られる.
await Promise.all(urls.map( (url, idx) => tabs[idx].screenshot({path: `${idx}_oo.png`})));
await browser.close();
////////////////////////////////////////////////////////////////////////////////
})();
