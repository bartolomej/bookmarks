import search from "./search";


describe('Search functionality tests', function () {

  it('should retrieve "Other awesome lists" section', function () {
    let nextTree = search(testTree, testMeta, 'aweso');
    expect(nextTree).toEqual([
      {
        "title": "Other awesome lists",
        "links": [
          "https://github.com/sp4ke/awesome-explorables",
          "https://github.com/jpantunes/awesome-cryptoeconomics"
        ]
      }
    ])
  });

  it('should retrieve 1 url in "Theories and concepts" subsection', function () {
    // TODO: regex match ignore case
    let nextTree = search(testTree, testMeta, 'Q');
    expect(nextTree).toEqual([
      {
        "title": "Computer science",
        "subsections": [
          {
            "title": "Theories and concepts",
            "links": [
              "https://quantum.country/qcvc"
            ]
          }
        ]
      }
    ])
  });

});

const testTree = [
  {
    "title": "Other awesome lists",
    "links": [
      "https://github.com/sp4ke/awesome-explorables",
      "https://github.com/jpantunes/awesome-cryptoeconomics"
    ]
  },
  {
    "title": "Computer science",
    "subsections": [
      {
        "title": "Theories and concepts",
        "links": [
          "http://setosa.io/ev/markov-chains/",
          "https://quantum.country/qcvc"
        ]
      },
      {
        "title": "Programming",
        "links": [
          "https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/",
          "https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow"
        ]
      }
    ]
  },
  {
    "title": "Game Theory",
    "links": [
      "https://www.hawaii.edu/powerkills/TCH.CHAP26.HTM",
    ]
  }
];

const testMeta = {
  "https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/": {
    "url": "https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/",
    "title": "A crash course in just-in-time (JIT) compilers - Mozilla Hacks - the Web developer blog",
    "description": "This is the second part in a series on WebAssembly and what makes it fast. If you haven’t read the others, we recommend starting from the beginning. JavaScript started out ...",
    "image": "https://hacks.mozilla.org/wp-content/themes/Hax/img/hacks-meta-image.jpg"
  },
  "https://github.com/sp4ke/awesome-explorables": {
    "url": "https://github.com/sp4ke/awesome-explorables",
    "title": "GitHub - sp4ke/awesome-explorables: A curated list of awesome explorable explanations.",
    "icon": "https://github.githubassets.com/favicon.ico",
    "description": "A curated list of awesome explorable explanations. - sp4ke/awesome-explorables",
    "image": "https://avatars2.githubusercontent.com/u/210457?s=400&v=4"
  },
  "https://github.com/jpantunes/awesome-cryptoeconomics": {
    "url": "https://github.com/jpantunes/awesome-cryptoeconomics",
    "title": "GitHub - jpantunes/awesome-cryptoeconomics: An awesome curated list of Cryptoeconomic research and learning materials",
    "icon": "https://github.githubassets.com/favicon.ico",
    "description": "An awesome curated list of Cryptoeconomic research and learning materials - jpantunes/awesome-cryptoeconomics",
    "image": "https://avatars3.githubusercontent.com/u/26281423?s=400&v=4"
  },
  "http://setosa.io/ev/markov-chains/": {
    "url": "http://setosa.io/ev/markov-chains/",
    "title": "Markov Chains explained visually",
    "image": "http://setosa.io/ev/markov-chains/fb-thumb.png"
  },
  "https://quantum.country/qcvc": {
    "url": "https://quantum.country/qcvc",
    "title": "Quantum computing for the very curious",
    "description": "Presented in an experimental mnemonic medium that makes it almost effortless to remember what you read",
    "image": "https://quantum.country/assets/social.png"
  },
  "https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow": {
    "url": "https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow",
    "title": "Gitflow Workflow | Atlassian Git Tutorial",
    "icon": "https://wac-cdn.atlassian.com/assets/img/favicons/gitguide/favicon.png",
    "description": "A deep dive into the Gitflow Workflow. Learn if this Git workflow is right for you and your team with this comprehensive tutorial. ",
    "author": "Atlassian"
  },
  "https://www.hawaii.edu/powerkills/TCH.CHAP26.HTM": {
    "url": "https://www.hawaii.edu/powerkills/TCH.CHAP26.HTM",
    "title": "NATURE AND LEVELS OF CONFLICT"
  }
};