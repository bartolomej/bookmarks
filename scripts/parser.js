function parseMarkdown (markdown) {
  let output = [];
  // split by main sections
  const sections = markdown.split('\n## ');
  // start from index 2 - leave out description and contents
  for (let s = 2; s < sections.length; s++) {
    if (sections[s].indexOf('\n#### ') < 0) {
      // parse section if no subsections found
      output.push(parseSection(sections[s]));
    } else {
      let subsections = sections[s].split('\n#### ');
      let section = {
        title: subsections[0].substring(subsections[0].indexOf('</a>') + 4, subsections[0].indexOf('\n')),
        subsections: []
      };
      // start at index 1 - leave out section title
      for (let i = 1; i < subsections.length; i++) {
        section.subsections.push(parseSection(subsections[i]))
      }
      output.push(section);
    }
  }
  return output;
}

function parseSection (input) {
  let section = { title: '', links: [] };
  const lines = input.split('\n');
  const startTitleIndex = input.indexOf('</a>');
  if (startTitleIndex < 0) {
    throw new Error(`Expected </a> tag in section: \n${input}`);
  }
  section.title = lines[0].substring(startTitleIndex + 4);
  for (let l = 1; l < lines.length; l++) {
    let startIndex = lines[l].indexOf('(') + 1;
    let endIndex = lines[l].indexOf(')');
    let string = lines[l].substring(startIndex, endIndex);
    string.length > 5 && section.links.push(string);
  }
  return section;
}

module.exports = {
  parseMarkdown,
  parseSection
};