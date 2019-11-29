import React, { useEffect, useState } from 'react';
import './index.css';
import styled from 'styled-components';
import Card from "./Card";
import search from "./search";
import githubLogo from './assets/github.png';
import { ReactComponent as ArrowAsset } from "./assets/arrow.svg";


export default function () {

  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState({});
  const [metaData, setMetaData] = useState({});
  const [searchPattern, setSearchPattern] = useState('');
  const [matchedTreeData, setMatchedTreeData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const treeDataResponse = await get(apiUrl('tree.json'));
      const metaDataResponse = await get(apiUrl('meta.json'));
      setTreeData(treeDataResponse);
      setMatchedTreeData(treeDataResponse);
      setMetaData(metaDataResponse);
    };
    fetchData().then(r => setLoading(false));
  }, []);

  function getMatches () {
    let count = 0;
    for (let s of matchedTreeData) {
      if (!s.subsections) {
        count += s.links.length;
        continue;
      }
      for (let sub of s.subsections) {
        count += sub.links.length;
      }
    }
    return count;
  }

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

  const searchMatchesCount = getMatches();
  return (
    <Container>
      <SearchWrapper>
        <input onChange={onSearchInput} type="text" placeholder="Search ..."/>
        {searchMatchesCount && (<span><b>{searchMatchesCount}</b> matches</span>)}
      </SearchWrapper>
      <GitHubLogo href="https://github.com/bartolomej/cool-links" target="_blank">
        <img src={githubLogo} alt="GitHub logo"/>
      </GitHubLogo>
      <Header>
        <h1>Cool links 💾📚📖</h1>
        <p>Links of different interesting ideas, resources, blogs, articles, books etc.</p>
        <ArrowSvg/>
      </Header>
      <Body>
        {loading && (
          <LoadingContainer>
            <h1>Loading....</h1>
          </LoadingContainer>
        )}
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
    if (data.title === undefined) {
      return console.log(`Title not found for ${link}`);
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
  return `https://raw.githubusercontent.com/bartolomej/cool-links/master/data/${file}`;
}

const ArrowSvg = styled(ArrowAsset)`
  height: 100px;
  padding-top: 150px;
  animation: slide-down-up 3s ease-in-out .1s infinite;
  #arrowPath {
    fill: white;
  }
  @keyframes slide-down-up {
    0% {
        transform: translateY(-30%);
    }
    50% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-30%);
    }
}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

const SearchWrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: palevioletred;
  input {
    outline: none;
    padding: 10px;
    border-radius: 20px;
    border: 2px solid palevioletred;
    font-weight: bold;
    font-size: 12px;
  }
`;

const GitHubLogo = styled.a`
  position: absolute;
  top: 10px;
  left: 10px;
  &:hover {
    transform: rotate(360deg);
    transition: transform 0.5s ease-in-out;
  }
  img {
    height: 50px;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  color: white;
  background-color: palevioletred;
  h1 {
    margin: 20px;
    font-size: 3em;
  }
  p {
    font-size: 1em;
  }
  @media (max-width: 800px) {
    padding: 70px 10px 30px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    padding-top: 40%;
  }
`;

const Body = styled.div`
  width: 50%;
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
  padding: 50px 0;
`;

const Subsection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-wrap: wrap;
  margin: 20px 0;
  @media (max-width: 800px) {
    text-align: center;
  }
`;

const SectionTitle = styled.h2`
  color: palevioletred;
  font-size: 2em;
  margin: 20px auto 10px;
`;

const SubsectionTitle = styled.h3`
  color: palevioletred;
  font-size: 1.1em;
  margin: 10px;
`;