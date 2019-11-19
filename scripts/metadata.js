const fetch = require('node-fetch');

module.exports = async function (urls) {

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

  let metas = await Promise.all(urls.map(async (url, index) => {

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
    let name = getMetaTag('name');
    let description = getMetaTag('description');
    let image = getMetaTag('image');
    let author = getMetaTag('author');
    let icon =
      $('link[rel=icon][type="image/png"]', website).attr('href') ||
      $('link[rel=shortcut-icon][type="image/png"]', website).attr('href') ||
      $('link[rel=icon][type="image/x-icon"]', website).attr('href') ||
      $('link[rel=mack-icon]', website).attr('href');

    if (isRelativeUrl(icon)) {
      icon = parseRelativeUrl(url, icon);
    }
    if (isRelativeUrl(image)) {
      image = parseRelativeUrl(url, image);
    }

    return { url, title, icon, name, description, image, author }
  }));

  return metas.filter(ele => ele !== null && ele !== undefined);
};