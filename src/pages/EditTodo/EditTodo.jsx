import React, { useRef, useState } from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTodos, patchTodo } from '../../api/todos';
import { QueryClient, useMutation } from 'react-query';

function EditTodo() {
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef();
  const queryClient = new QueryClient();

  const mutation = useMutation(patchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      alert('수정이 완료되었습니다. todos 페이지로 돌아가겠습니다.');
      navigate('/todos');
      console.log('success');
    },
  });

  // 서버에서 todos 데이터 가져오기---------------------------------------------

  const { isLoading, isError, data } = useQuery('todos', getTodos);

  if (isLoading) {
    return <div>로딩중입니다..</div>;
  }
  if (isError) {
    return <div>값을 불러오는데 실패했습니다. 에러메시지를 확인해주세요.</div>;
  }

  const todosInfo = data.data;

  // TodoItem 에서 파라미터로 보낸 todo 의 고유 값, id 를 이용해 매칭되는 todo 찾기------------

  const id = location.state.id;
  const matchTodo = todosInfo.filter((todo) => todo.id === id)[0];
  //-----------------------------------------------------------------------

  // 수정하기 -------------------------------------------

  const onClickReviseButton = () => {
    const edit = { content: contentRef.current.value };
    mutation.mutate({ todoId: matchTodo.id, edit });
  };
  return (
    <div>
      <Header />
      <EditTodoWrap>
        <EditTodoBox>
          <EditTodoSection>
            <div>{matchTodo.id}</div>
            <div>이전으로</div>
          </EditTodoSection>
          <EditTodoTitle>{matchTodo.title}</EditTodoTitle>
          <EditTodoContent>
            <EditTodoTextarea
              rows={10}
              maxLength={200}
              defaultValue={matchTodo.content}
              ref={contentRef}
            ></EditTodoTextarea>
          </EditTodoContent>
          <EditTodoButton onClick={onClickReviseButton}>저장</EditTodoButton>
        </EditTodoBox>
      </EditTodoWrap>
    </div>
  );
}

export default EditTodo;

const EditTodoWrap = styled.div`
  height: calc(100vh - 100px);
  background-color: rgb(255, 255, 255);
  padding: 24px;
`;

const EditTodoBox = styled.div`
  height: 100%;
`;

const EditTodoSection = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 32px;
  div {
    font-size: 24px;
  }
`;

const EditTodoTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  width: 80%;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

const EditTodoContent = styled.div`
  height: calc(100% - 200px);
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

const EditTodoTextarea = styled.textarea`
  width: 100%;
  border: 1px solid rgb(238, 238, 238);
  padding: 12px;
  font-size: 14px;
`;

const EditTodoButton = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: row;
  flex-shrink: 0;
  border: 1px solid rgb(238, 238, 238);
  color: rgb(255, 255, 255);
  height: 46px;
  border-radius: 8px;
  background-color: rgb(254, 83, 31);
  cursor: pointer;
  width: 100%;
`;
