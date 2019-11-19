import React, { useEffect, useState } from 'react';
import './index.css';
import styled from 'styled-components';
import Card from "./Card";

export default function () {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://hn.algolia.com/api/v1/search?query=redux',);
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <Container>

      <Body>
        <Card
          url={"https://github.com/sp4ke/awesome-explorables"}
          title={"GitHub - sp4ke/awesome-explorables: A curated list of awesome explorable explanations."}
          description={"A curated list of awesome explorable explanations. - sp4ke/awesome-explorables"}
          image={"https://avatars2.githubusercontent.com/u/210457?s=400&v=4"}
        />
      </Body>

    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Body = styled.div`
  width: 40%;
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;