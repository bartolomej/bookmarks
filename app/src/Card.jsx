import React from 'react';
import styled from "styled-components";


export default function ({url, title, image, description}) {
  return (
    <Container href={url}>
      <Image src={image} alt={title}/>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  )
}

const Title = styled.h3`
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 11px;
`;

const Image = styled.img`
  width: 100px;
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
