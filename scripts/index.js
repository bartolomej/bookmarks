#!/usr/cli/env node

const $ = require('cheerio');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const scrapeMetas = require('./metadata');
const parser = require('./parser');

/**
 * TODO: generate meta.json file with links metadata
 * TODO: generate tree.json file with topic hierarchy
 * TODO: ensure all <a> links in titles (in .md) enclose with </a>
 */

(async function () {
  let file = fs.readFileSync('../README.md').toString();
  let parsedHtml = marked(file);
  let parsedJson = parser.parseMarkdown(file);


  fs.writeFile(path.join('..', 'data', 'index.html'), JSON.stringify(parsedJson, null, 4), err => {
    if (err) throw err;
    console.log('DONE SAVING HTML 😀');
    process.exit();
  });

  return ;

  let urls = Array.from($('a', parsedHtml)).map(ele => ele.attribs.href);

  console.log('SCRAPING WEBSITES...');

  let metas = await scrapeMetas(urls);

  let metasObject = {};
  metas.forEach(ele => metasObject[ele.url] = ele);

  console.log('WRITING TO FILE...');

  fs.writeFile(path.join('data', 'meta.json'),
    JSON.stringify(metasObject, null, 4), err => {
      if (err) throw err;
      console.log('DONE 😀');
      process.exit();
    });
})();