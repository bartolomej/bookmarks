/**
 * @description
 * Outputs new tree state based on searchPattern.
 * @param tree {Object}
 * @param metadata {Object}
 * @param searchPattern {string}
 */
export default function (tree, metadata, searchPattern) {
  let nextTree = [];
  let clonedTree = JSON.parse(JSON.stringify(tree));
  for (let section of clonedTree) {
    if (section.links) {
      let links = getMatchedLinks(section);
      if (links.length > 0) {
        nextTree.push({ ...section, links })
      }
    }
    if (section.subsections) {
      let nextSection = { ...section, subsections: [] };
      for (let sub of section.subsections) {
        let links = getMatchedLinks(sub);
        if (links.length > 0) {
          nextSection.subsections.push({ ...sub, links })
        }
      }
      if (nextSection.subsections.length > 0) {
        nextTree.push(nextSection);
      }
    }
  }
  function getMatchedLinks (section) {
    let links = [];
    for (let j = 0; j < section.links.length; j++) {
      let data = metadata[section.links[j]];
      if (data === undefined) {
        console.log(`${section.links[j]} is undefined`);
        continue;
      }
      if (
        new RegExp(searchPattern).test(data.title) ||
        new RegExp(searchPattern).test(data.description)
      ) {
        links.push(...section.links.slice(j, j + 1))
      }
    }
    return links;
  }
  return nextTree;
}