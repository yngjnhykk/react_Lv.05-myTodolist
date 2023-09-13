import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteTodo } from '../../api/todos';
import { useMutation, QueryClient } from 'react-query';

function TodoItem({ todoInfo }) {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  const mutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      alert('삭제가 완료되었습니다.');
      console.log('success');
    },
  });

  const onClcickDeleteButton = (e) => {
    e.stopPropagation();
    mutation.mutate(todoInfo.id);
  };
  return (
    <div
      onClick={() => {
        navigate('/detailTodo', { state: { id: todoInfo.id } });
      }}
    >
      <TodoItemWrap>
        <TitleLine>
          <TodoItemTitle>{todoInfo.title}</TodoItemTitle>
          <DeleteButton
            onClick={(e) => {
              onClcickDeleteButton(e);
            }}
          >
            삭제
          </DeleteButton>
        </TitleLine>
        <TodoItemContent>{todoInfo.content}</TodoItemContent>
      </TodoItemWrap>
    </div>
  );
}

export default TodoItem;

const TodoItemWrap = styled.div`
  padding: 12px;
  border: 1px solid rgb(238, 238, 238);
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  width: 100%;
  min-height: 90px;
  margin-bottom: 12px;
`;

const TodoItemTitle = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: row;
`;

const TodoItemContent = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

const DeleteButton = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: row;
  flex-shrink: 0;
  border: 1px solid rgb(238, 238, 238);
  background-color: rgb(255, 255, 255);
  color: black;
  border-radius: 8px;
  cursor: pointer;
  width: 40px;
  height: 40px !important;
`;

const TitleLine = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: row;
`;
