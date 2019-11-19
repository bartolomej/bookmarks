import React from 'react';
import styled from "styled-components";

export default function ({url, title, image, description}) {
  return (
    <Container href={url}>
      <img src={image} alt={title}/>
      <h3>{title}</h3>
      <p>{description}</p>
    </Container>
  )
}

const Container = styled.a`
  display: flex;
  flex-direction: column;
`;
