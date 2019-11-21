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
    <Container onMouseEnter={onHover} target="_blank" href={url}>
      <Image
        src={image ? image : defaultImage}
        alt={title}
        onerror={`if (this.src != '${defaultImage}') this.src = '${defaultImage}';`}
      />
      <Title>{highlightText(title, searchPattern)}</Title>
      <Description>{highlightText(description, searchPattern)}</Description>
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
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 11px;
`;

const Image = styled.img`
  flex: 1;
  width: 150px;
  font-size: 10px;
`;

const Container = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  width: 200px;
  padding: 10px;
  margin: 5px;
  color: black;
`;
