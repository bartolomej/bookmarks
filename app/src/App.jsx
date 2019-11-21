import React, { useEffect, useState } from 'react';
import './index.css';
import styled from 'styled-components';
import Card from "./Card";
import search from "./search";


export default function () {

  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [searchPattern, setSearchPattern] = useState('');
  const [matchedTreeData, setMatchedTreeData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      if (process.env.NODE_ENV === 'development') {
        setTreeData(require('./data/tree.json'));
        setMatchedTreeData(require('./data/tree.json'));
        setMetaData(require('./data/meta.json'));
        return;
      }
      const treeDataResponse = await get(apiUrl('tree.json'));
      const metaDataResponse = await get(apiUrl('meta.json'));
      setTreeData(treeDataResponse);
      setMatchedTreeData(treeDataResponse);
      setMetaData(metaDataResponse);
      setLoading(false);
    };
    fetchData().then(r => setLoading(false));
  }, []);

  function onSearchInput (e) {
    setLoading(true);
    let searchPattern = e.target.value;
    setSearchPattern(searchPattern);
    if (searchPattern === '') {
      setLoading(false);
      return setMatchedTreeData(treeData);
    }
    let nextTree = search(treeData, metaData, searchPattern);
    setMatchedTreeData(nextTree);
    setLoading(false);
  }

  return (
    <Container>
      {loading && (
        <LoadingContainer>
          <h1>Loading....</h1>
        </LoadingContainer>
      )}
      <SearchInput onChange={onSearchInput} type="text" placeholder="Search ..."/>
      <Header>
        <h1>Cool links 💾📚📖</h1>
        <p>Links of different interesting ideas, resources, blogs, articles, books etc.</p>
      </Header>
      <Body>
        {matchedTreeData.map(renderSection)}
      </Body>
    </Container>
  );

  function renderSection (section) {
    if (!section.subsections) {
      return (
        <Section>
          <SectionTitle>{section.title}</SectionTitle>
          <LinksContainer>
            {section.links.map(renderLink)}
          </LinksContainer>
        </Section>
      )
    }
    return (
      <Section>
        <SectionTitle>{section.title}</SectionTitle>
        <LinksContainer>
          {section.subsections.map(s => {
            return (
              <Subsection>
                <SubsectionTitle>{s.title}</SubsectionTitle>
                <LinksContainer>
                  {s.links.map(renderLink)}
                </LinksContainer>
              </Subsection>
            )
          })}
        </LinksContainer>
      </Section>
    );
  }

  function renderLink (link) {
    let data = metaData[link];
    if (data === undefined) {
      return console.log(`Data not found for ${link}`);
    }
    return (
      <Card
        url={link}
        title={data.title}
        description={data.description}
        image={data.image}
        searchPattern={searchPattern}
      />
    )
  }
}

async function get (url) {
  const response = await fetch(url);
  return await response.json();
}

function apiUrl (file) {
  return `https://raw.githubusercontent.com/bartolomej/cool-links/react-migration/data/${file}`;
}

const SearchInput = styled.input`
  outline: none;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid palevioletred;
  font-weight: bold;
  font-size: 12px;
  position: fixed;
  top: 10px;
  right: 10px;
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`;

const Header = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px;
  border-bottom: 2px dotted palevioletred;
  @media (max-width: 800px) {
    width: unset;
    padding: 70px 30px 30px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  width: 60%;
  text-align: center;
  @media (max-width: 1000px) {
    width: 70%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
`;

const Subsection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0;
`;

const SectionTitle = styled.h2`
  color: palevioletred;
  font-size: 1.5em;
  margin: 20px auto 10px;
`;

const SubsectionTitle = styled.h3`
  color: palevioletred;
  font-size: 1em;
  margin: 10px;
`;