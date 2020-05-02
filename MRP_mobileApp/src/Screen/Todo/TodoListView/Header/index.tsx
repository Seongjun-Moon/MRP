import React from 'react';
import Styled from 'styled-components/native';
import {Text} from 'react-native';

const Container = Styled.View`height:40px;justify-content:center;align-items:center;`;
const TitleLabel = Styled.View`font-size:24px;font-weight:bold;`;

interface Props {}

const Header = ({}: Props) => {
  return (
    <Container>
      <TitleLabel>
        <Text>Todo List App</Text>
      </TitleLabel>
    </Container>
  );
};

export default Header;
