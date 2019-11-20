#!/usr/cli/env node

const fs = require('fs');
const path = require('path');
const scrapeMetas = require('./metadata');
const parseMarkdown = require('./parser');

(async function () {
  let file = fs.readFileSync('../README.md').toString();
  let parsedJson = parseMarkdown(file);
  let links = flattenLinks(parsedJson);

  fs.writeFile(path.join('..', 'data', 'tree.json'),
    JSON.stringify(parsedJson, null, 4), err => {
      if (err) throw err;
      console.log('DONE SAVING LINKS TREE 😀');
    });

  fs.writeFile(path.join('..', 'data', 'links.json'),
    JSON.stringify(links, null, 4), err => {
      if (err) throw err;
      console.log('DONE SAVING LINKS 😀');
    });

  console.log('SCRAPING WEBSITES...');

  let metas = await scrapeMetas(links);

  let metasObject = {};
  metas.forEach(ele => metasObject[ele.url] = ele);

  console.log('WRITING TO FILE...');

  fs.writeFile(path.join('..', 'data', 'meta.json'),
    JSON.stringify(metasObject, null, 4), err => {
      if (err) throw err;
      console.log('DONE SAVING METADATA 😀');
      process.exit();
    });
})();

function flattenLinks (tree) {
  let links = [];
  for (let section of tree) {
    if (section.subsections) {
      for (let sub of section.subsections) {
        links.push(...sub.links);
      }
    } else {
      links.push(...section.links);
    }
  }
  return links;
}