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
      <BcgImageContainer/>
      <SearchWrapper>
        <input onChange={onSearchInput} type="text" placeholder="Search ..."/>
        {searchMatchesCount && (<span><b>{searchMatchesCount}</b> matches</span>)}
      </SearchWrapper>
      <GitHubLogo href="https://github.com/bartolomej/cool-links" target="_blank">
        <img src={githubLogo} alt="GitHub logo"/>
      </GitHubLogo>
      <Header>
        <h1>Cool links <span role="img" aria-label="Links emoji">💾📚📖</span></h1>
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

const BcgImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  display: block;
  filter: blur(1px);
/*
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 200 200'%3E%3Cpolygon fill='%23e9d5fa' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3E%3C/svg%3E");

 */
background-color: #1a1a1a;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%233e1cdb' stroke-width='1' stroke-opacity='0.2'%3E%3Crect x='-40' y='40' width='75' height='75'/%3E%3Crect x='-35' y='45' width='65' height='65'/%3E%3Crect x='-30' y='50' width='55' height='55'/%3E%3Crect x='-25' y='55' width='45' height='45'/%3E%3Crect x='-20' y='60' width='35' height='35'/%3E%3Crect x='-15' y='65' width='25' height='25'/%3E%3Crect x='-10' y='70' width='15' height='15'/%3E%3Crect x='-5' y='75' width='5' height='5'/%3E%3Crect width='35' height='35'/%3E%3Crect x='5' y='5' width='25' height='25'/%3E%3Crect x='10' y='10' width='15' height='15'/%3E%3Crect x='15' y='15' width='5' height='5'/%3E%3Crect x='40' width='75' height='75'/%3E%3Crect x='45' y='5' width='65' height='65'/%3E%3Crect x='50' y='10' width='55' height='55'/%3E%3Crect x='55' y='15' width='45' height='45'/%3E%3Crect x='60' y='20' width='35' height='35'/%3E%3Crect x='65' y='25' width='25' height='25'/%3E%3Crect x='70' y='30' width='15' height='15'/%3E%3Crect x='75' y='35' width='5' height='5'/%3E%3Crect x='40' y='80' width='35' height='35'/%3E%3Crect x='45' y='85' width='25' height='25'/%3E%3Crect x='50' y='90' width='15' height='15'/%3E%3Crect x='55' y='95' width='5' height='5'/%3E%3Crect x='120' y='-40' width='75' height='75'/%3E%3Crect x='125' y='-35' width='65' height='65'/%3E%3Crect x='130' y='-30' width='55' height='55'/%3E%3Crect x='135' y='-25' width='45' height='45'/%3E%3Crect x='140' y='-20' width='35' height='35'/%3E%3Crect x='145' y='-15' width='25' height='25'/%3E%3Crect x='150' y='-10' width='15' height='15'/%3E%3Crect x='155' y='-5' width='5' height='5'/%3E%3Crect x='120' y='40' width='35' height='35'/%3E%3Crect x='125' y='45' width='25' height='25'/%3E%3Crect x='130' y='50' width='15' height='15'/%3E%3Crect x='135' y='55' width='5' height='5'/%3E%3Crect y='120' width='75' height='75'/%3E%3Crect x='5' y='125' width='65' height='65'/%3E%3Crect x='10' y='130' width='55' height='55'/%3E%3Crect x='15' y='135' width='45' height='45'/%3E%3Crect x='20' y='140' width='35' height='35'/%3E%3Crect x='25' y='145' width='25' height='25'/%3E%3Crect x='30' y='150' width='15' height='15'/%3E%3Crect x='35' y='155' width='5' height='5'/%3E%3Crect x='200' y='120' width='75' height='75'/%3E%3Crect x='40' y='200' width='75' height='75'/%3E%3Crect x='80' y='80' width='75' height='75'/%3E%3Crect x='85' y='85' width='65' height='65'/%3E%3Crect x='90' y='90' width='55' height='55'/%3E%3Crect x='95' y='95' width='45' height='45'/%3E%3Crect x='100' y='100' width='35' height='35'/%3E%3Crect x='105' y='105' width='25' height='25'/%3E%3Crect x='110' y='110' width='15' height='15'/%3E%3Crect x='115' y='115' width='5' height='5'/%3E%3Crect x='80' y='160' width='35' height='35'/%3E%3Crect x='85' y='165' width='25' height='25'/%3E%3Crect x='90' y='170' width='15' height='15'/%3E%3Crect x='95' y='175' width='5' height='5'/%3E%3Crect x='120' y='160' width='75' height='75'/%3E%3Crect x='125' y='165' width='65' height='65'/%3E%3Crect x='130' y='170' width='55' height='55'/%3E%3Crect x='135' y='175' width='45' height='45'/%3E%3Crect x='140' y='180' width='35' height='35'/%3E%3Crect x='145' y='185' width='25' height='25'/%3E%3Crect x='150' y='190' width='15' height='15'/%3E%3Crect x='155' y='195' width='5' height='5'/%3E%3Crect x='160' y='40' width='75' height='75'/%3E%3Crect x='165' y='45' width='65' height='65'/%3E%3Crect x='170' y='50' width='55' height='55'/%3E%3Crect x='175' y='55' width='45' height='45'/%3E%3Crect x='180' y='60' width='35' height='35'/%3E%3Crect x='185' y='65' width='25' height='25'/%3E%3Crect x='190' y='70' width='15' height='15'/%3E%3Crect x='195' y='75' width='5' height='5'/%3E%3Crect x='160' y='120' width='35' height='35'/%3E%3Crect x='165' y='125' width='25' height='25'/%3E%3Crect x='170' y='130' width='15' height='15'/%3E%3Crect x='175' y='135' width='5' height='5'/%3E%3Crect x='200' y='200' width='35' height='35'/%3E%3Crect x='200' width='35' height='35'/%3E%3Crect y='200' width='35' height='35'/%3E%3C/g%3E%3C/svg%3E");

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
    padding: 40% 0;
    color: palevioletred;
  }
`;

const Body = styled.div`
  width: 50%;
  padding-top: 5%;
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
  margin: 10px 0;
  @media (max-width: 800px) {
    text-align: center;
  }
`;

const SectionTitle = styled.h2`
  color: palevioletred;
  font-size: 2em;
  margin: 20px auto 20px;
`;

const SubsectionTitle = styled.h3`
  color: palevioletred;
  font-size: 1.1em;
  margin: 5px;
`;