import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useQuery } from 'react-query';
import { getTodos } from '../../api/todos';
import { getCookie } from '../../cookies/cookies';

function TodoList() {
  // 서버에서 todo 정보 가져오기-----------------------------------------

  const { isLoading, isError, data } = useQuery('todos', getTodos);

  if (isLoading) {
    return <div>로딩중입니다..</div>;
  }
  if (isError) {
    return <div>값을 불러오는데 실패했습니다. 에러메시지를 확인해주세요.</div>;
  }
  const todosInfo = data.data;

  // 쿠키에서 유저를 구분하는 고유한 key 값, customID 를 가져옴------------

  const customID = getCookie('customID');

  //--------------------------------------------------------------------
  return (
    <div>
      <TodoListWrap>
        {todosInfo
          .filter((todo) => todo.customID === customID)
          .map((todo) => (
            <TodoItem todoInfo={todo} key={todo.id} />
          ))}
      </TodoListWrap>
    </div>
  );
}

export default TodoList;

const TodoListWrap = styled.div`
  overflow-y: scroll;
  height: calc(100vh - 200px);
`;
