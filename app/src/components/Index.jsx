import React from 'react';
import styled from "styled-components";
import "styled-components/macro";


export default function ({ tree, metadata }) {
  const ListItem = styled.li`
    padding: 3px 0; 
    margin-left: 20px;
    list-style-type: none;
  `;
  function renderLinks (links) {
    return links.map(l => {
      const title = metadata[l] ? metadata[l].title : l;
      return (
        <ListItem>
          <LinkTitle href={`#${l}`}>{title ? title : l}</LinkTitle>
        </ListItem>
      )
    })
  }

  return (
    <nav>
      <ul css={`padding-top: 10px`}>
        {tree.map(section => {
          if (!section.subsections) {
            return (
              <MainListItem>
                <SectionText href={`#${section.name}`}>{section.title}</SectionText>
                <SectionLinks>{renderLinks(section.links)}</SectionLinks>
              </MainListItem>
            )
          } else {
            return (
              <MainListItem>
                <SectionText href={`#${section.name}`}>{section.title}</SectionText>
                <SectionLinks>
                  {section.subsections.map(s => {
                    return (
                      <SubsectionList>
                        <SubsectionText href={`#${s.name}`}>{s.title}</SubsectionText>
                        {renderLinks(s.links)}
                      </SubsectionList>
                    )
                  })}
                </SectionLinks>
              </MainListItem>
            )
          }
        })}
      </ul>
    </nav>
  )
}

const MainListItem = styled.li`
  padding: 30px 20px;
  list-style-type: none;
`;

const SectionText = styled.a`
  font-weight: bold;
  color: white;
  text-decoration: none;
  border-bottom: 2px solid white;
  padding-bottom: 2px;
`;

const SubsectionText = styled.a`
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
  text-decoration: none;
`;

const LinkTitle = styled.a`
  padding: 10px 0;
  font-weight: unset;
  color: #ffffff87;
  text-decoration: none;
  &:hover {
    color: palevioletred;
  }
`;

const SectionLinks = styled.ul`
  padding-top: 15px;
  padding-left: 15px;
`;

const SubsectionList = styled.ul`
  padding-left: 15px;
  padding-top: 15px;
`;