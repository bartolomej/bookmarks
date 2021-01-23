import React from 'react';
import styled from "styled-components";


export default function ({ url, title, image, description, searchPattern = '' }) {
  const defaultImage = 'website-logo.svg';
  function onHover (e) {
    console.log(url, title, description);
  }
  if (title === undefined) {
    console.log(`undefined title for: ${url}`)
  }
  return (
    <Container key={url} id={url} onMouseEnter={onHover} target="_blank" href={url}>
      <ImageContainer>
        <Image
          src={image ? image : defaultImage}
          alt={title}
          onerror={`if (this.src != '${defaultImage}') this.src = '${defaultImage}';`}
        />
      </ImageContainer>
      <DetailsContainer>
        {/* if title doesn't exist display url */}
        {title === '' && <Title>{url}</Title>}
        <Title>{highlightText(title, searchPattern)}</Title>
        <Description>{highlightText(description, searchPattern)}</Description>
      </DetailsContainer>
    </Container>
  )
}

function highlightText (text, pattern) {
  if (text === undefined) return text;
  if (pattern === '') return formatText(text);
  let match = text.match(new RegExp(pattern, 'i'));
  if (match === null) return formatText(text);
  let matchIndex = match.index;
  return (
    <div>
      <span>{text.substring(0, matchIndex)}</span>
      <mark>{text.substring(matchIndex, matchIndex + pattern.length)}</mark>
      <span>{text.substring(matchIndex + pattern.length, text.length)}</span>
    </div>
  )
}

function formatText (text) {
  const LENGTH_LIMIT = 80;
  if (text.length <= LENGTH_LIMIT) {
    return text;
  } else {
    return text.substring(0, LENGTH_LIMIT) + '...';
  }
}

const Title = styled.h3`
  font-size: 16px;
  color: black;
`;

const Description = styled.p`
  font-size: 12px;
  color: grey;
`;

const Image = styled.img`
  flex: 1;
  width: 150px;
  font-size: 10px;
  border-radius: 20px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  white-space: pre-wrap;
  margin-top: 8px;
  overflow-wrap: break-word;
`;

const ImageContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: center;
  align-items: center;
`;

const Container = styled.a`
  display: flex;
  border-radius: 20px;
  border: 2px solid white;
  background-color: white;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  width: 200px;
  padding: 20px;
  margin: 10px;
  color: black;
  img {
    transition: all .2s ease-in-out;
  }
  &:hover {
    border-color: palevioletred;
    img {
      transform: scale(1.1);
    }
    h3 {
      color: palevioletred;
    }
  }
`;
