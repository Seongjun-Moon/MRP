/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import Styled from 'styled-components/native';
import {TodoListContextProvider} from '~/Context/TodoListContext';
import Todo from './Screen/Todo';

const Container = Styled.View`flex: 1; background-color: #EEE;`;

const App = () => {
  return (
    <TodoListContextProvider>
      <Container>
        <Todo />
      </Container>
    </TodoListContextProvider>
  );
};

export default App;
