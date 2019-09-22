#!/usr/cli/env node

const $ = require('cheerio');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');
const request = require('request');
const uuid = require('uuid').v4;


(async function () {
  let file = fs.readFileSync('README.md').toString();
  let parsedHtml = marked(file);

  let urls = Array.from($('a', parsedHtml)).map(ele => ele.attribs.href);

  console.log('SCRAPING WEBSITES...');

  let metas = await scrapeMetas(urls);

  let dir = path.join('assets', 'images');

  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(dir, file), err => {
        if (err) throw err;
      });
    }
  });

  console.log('DOWNLOADING IMAGES...');
  let json = {};
  metas.forEach(async ele => {
    let obj = ele;
    if (ele.image !== undefined) {
      let filePath = path.join('assets', 'images', uuid() + '.png');
      download(ele.image, filePath);
      obj.image = filePath
    }
    if (ele.icon !== undefined) {
      let filePath = path.join('assets', 'images', uuid() + '.png');
      download(ele.icon, filePath);
      obj.icon = filePath;
    }
    json[ele.url] = obj;
  })

  console.log('WRITING TO FILE...');

  fs.writeFile('meta.json', JSON.stringify(json, null, 4), err => {
    if (err) throw err;
    console.log('DONE 😀');
  });
})();


async function download(url, filename) {
  return new Promise(resolve => {
    request
      .get(url)
      .on('error', err => {
        console.error(err)
      })
      .on('response', res => {
        console.log('content-length: ', res.headers['content-length'])
      })
      .on('close', resolve)
      .pipe(fs.createWriteStream(filename))
  })
}


async function scrapeMetas(urls) {

  const isRelativeUrl = url =>
    url !== undefined &&
    url !== null &&
    !/http/.test(url);

  const parseRelativeUrl = (indexUrl, url) => {
    let urlEndIndex = indexUrl.indexOf('/', 8);
    if (urlEndIndex > 0) {
      return indexUrl.substring(0, urlEndIndex) + url;
    } else {
      let suffixUrl = url[0] === '/' ? url : '/' + url;
      return indexUrl.substring(0, indexUrl.length) + suffixUrl;
    }
  };

  let metas = await Promise.all(urls.map(async url => {

    let website;
    try {
      website = await fetch(url).then(res => res.text());
    } catch (e) { return undefined }

    const getMetaTag = name =>
      $(`meta[name="${name}"]`, website).attr('content') ||
      $(`meta[property="og:${name}"]`, website).attr('content')  ||
      $(`meta[property="twitter:${name}]"]`, website).attr('content') ||
      $(`meta[property="twitter:${name}:src]"]`, website).attr('content');

    let title = $('title', website).first().text();
    // TODO: accept only type=image/png to avoid downloading data:image
    let icon = $('link[rel=icon][type="image/png"]', website).attr('href');
    let name = getMetaTag('name');
    let description = getMetaTag('description');
    let image = getMetaTag('image');
    let author = getMetaTag('author');

    if (isRelativeUrl(icon)) {
      icon = parseRelativeUrl(url, icon);
    }
    if (isRelativeUrl(image)) {
      image = parseRelativeUrl(url, image);
    }

    return { url, title, icon, name, description, image, author }
  }));

  return metas.filter(ele => ele !== null && ele !== undefined);
}