import React from 'react';
import styled from "styled-components";


export default function ({ url, title, image, description, searchPattern }) {
  return (
    <Container target="_blank" href={url}>
      <Image src={image} alt={title}/>
      <Title>{highlightText(title, searchPattern)}</Title>
      <Description>{highlightText(description, searchPattern)}</Description>
    </Container>
  )
}

function highlightText (text, pattern) {
  if (text === undefined) return text;
  if (pattern === '') return text;
  let match = text.match(new RegExp(pattern));
  if (match === null) return text;
  let matchIndex = match.index;
  return (
    <div>
      <span>{text.substring(0, matchIndex)}</span>
      <mark>{text.substring(matchIndex, matchIndex + pattern.length)}</mark>
      <span>{text.substring(matchIndex + pattern.length, text.length)}</span>
    </div>
  )
}

const Title = styled.h3`
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 11px;
`;

const Image = styled.img`
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
