const parser = require('./parser');

const exampleMarkdown = `
# Cool links 💾📚📖

[comment]: <> (TODO: split topics into multiple files)
[comment]: <> (TODO: mark each link with tags)

Links of different interesting ideas, resources, blogs, articles, books etc.<br>


## <a name="contents"></a>Contents

- [Computer science](#computer-science)
\t- [Theories and Concepts](#theories-and-concepts)
\t- [Programming](#programming)

## <a name="computer-science"></a>Other awesome lists
- [Awesome Explorables](https://github.com/sp4ke/awesome-explorables) -  A curated list of awesome explorable explanations.
- [Awesome Cryptoeconomics](https://github.com/jpantunes/awesome-cryptoeconomics)

## <a name="computer-science"></a>Computer science
*[&#8593; top](#contents)*

#### <a name="theories-and-conceprs"></a>Theories and concepts
- [DAO](https://github.com/the-dao/whitepaper) - Decentralized Autonomous Organisation
- [Markov chains explained visually](http://setosa.io/ev/markov-chains/)
- [Quantum computing for the curious](https://quantum.country/qcvc)

#### <a name="programming"></a>Programming
- [Crash Course in JIT](https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/)
- [How JavaScript Works](https://blog.logrocket.com/how-javascript-works-optimizing-the-v8-compiler-for-efficiency/)
- [Designing Programs](https://designingprograms.bitbucket.io/index.html) - Practical and pedagogical approach to programming
`;

it('should parse markdown', function () {
  const parsed = parser.parseMarkdown(exampleMarkdown);

  expect(parsed).toEqual([
    {
      title: 'Other awesome lists',
      links: [
        'https://github.com/sp4ke/awesome-explorables',
        'https://github.com/jpantunes/awesome-cryptoeconomics'
      ]
    },
    {
      title: 'Computer science',
      subsections: [
        {
          title: 'Theories and concepts',
          links: [
            'https://github.com/the-dao/whitepaper',
            'http://setosa.io/ev/markov-chains/',
            'https://quantum.country/qcvc'
          ],
        },
        {
          title: 'Programming',
          links: [
            'https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/',
            'https://blog.logrocket.com/how-javascript-works-optimizing-the-v8-compiler-for-efficiency/',
            'https://designingprograms.bitbucket.io/index.html'
          ]
        }
      ]
    }
  ])
}); 