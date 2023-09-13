import React from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import TodoList from './TodoList';

function Todos() {
  return (
    <div>
      <Header></Header>
      <TodosWrap>
        <TodosTitle>
          <div>내 할일</div>
        </TodosTitle>
        <TodoList></TodoList>
      </TodosWrap>
    </div>
  );
}

export default Todos;

const TodosWrap = styled.div`
  height: calc(100vh - 45px);
  background-color: rgb(255, 255, 255);
  padding: 24px;
`;

const TodosTitle = styled.div`
  width: 100%;
  margin: 24px 0px;
  div {
    font-size: 28px;
  }
`;
