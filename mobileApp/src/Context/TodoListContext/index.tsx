import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

// Context 생성 (@types/index.d.ts에 정의한 타입을 사용하여 Context의 데이터 타입을 지정)
const TodoListContext = createContext<ITodoListContext>({
  todoList: [],
  addTodoList: (todo: string): void => {},
  removeTodoList: (index: number): void => {},
});

// 실제 Context 구현 부분
const TodoListContextProvider = ({children}: Props) => {
  // 생성한 state를 저장하여 Context의 데이터를 수정
  const [todoList, setTodoList] = useState<Array<string>>([]);

  const addTodoList = (todo: string): void => {
    const list = [...todoList, todo];
    setTodoList(list);
    AsyncStorage.setItem('todoList', JSON.stringify(list));
  };

  const removeTodoList = (index: number): void => {
    let list = [...todoList];
    list.splice(index, 1);
    setTodoList(list);
    AsyncStorage.setItem('todoList', JSON.stringify(list));
  };

  const initData = async () => {
    try {
      const list = await AsyncStorage.getItem('todoList');
      if (list !== null) {
        setTodoList(JSON.parse(list));
      }
    } catch (e) {
      console.log(e);
    }
  };
  // useEffect를 통해 AsyncStorage에 저장된 데이터를 가져와 설정
  useEffect(() => {
    initData();
  }, []);

  return (
    <TodoListContext.Provider value={{todoList, addTodoList, removeTodoList}}>
      {children}
    </TodoListContext.Provider>
  );
};

export {TodoListContextProvider, TodoListContext};
