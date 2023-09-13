import React from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import CommentList from '../DetailTodo/CommentList';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTodos } from '../../api/todos';

function DetailTodo() {
  const navigate = useNavigate();
  const location = useLocation();

  // 서버에서 todos 데이터 가져오기---------------------------------------------

  const { isLoading, isError, data } = useQuery('todos', getTodos);

  if (isLoading) {
    return <div>로딩중입니다..</div>;
  }
  if (isError) {
    return <div>값을 불러오는데 실패했습니다. 에러메시지를 확인해주세요.</div>;
  }

  // TodoItem 에서 파라미터로 보낸 todo 의 고유 값, id 를 가져오기------------

  const id = location.state.id;

  //-----------------------------------------------------------------------
  const todosInfo = data.data;

  const matchTodo = todosInfo.filter((todo) => todo.id === id)[0];

  return (
    <div>
      <Header />
      <DetailTodoWrap>
        <DetailTodoBox>
          <DetatilTodoSection>
            <div>{matchTodo.id}</div>
            <Link to={'/todos'} style={{ fontSize: 24 }}>
              이전으로
            </Link>
          </DetatilTodoSection>
          <DetailTodoTitle>{matchTodo.title}</DetailTodoTitle>
          <DetailTodoContent>
            <div>{matchTodo.content}</div>
            <DetailTodoButton
              onClick={() => {
                navigate('/editTodo', { state: { id: matchTodo.id } });
              }}
            >
              수정
            </DetailTodoButton>
          </DetailTodoContent>
          <CommentList></CommentList>
        </DetailTodoBox>
      </DetailTodoWrap>
    </div>
  );
}

export default DetailTodo;

const DetailTodoWrap = styled.div`
  height: calc(100vh - 100px);
  background-color: rgb(255, 255, 255);
  padding: 24px;
`;

const DetailTodoBox = styled.div`
  height: 100%;
`;

const DetatilTodoSection = styled.div`
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

const DetailTodoTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  width: 80%;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

const DetailTodoContent = styled.div`
  height: calc(100% - 200px);
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  div {
    height: 300px;
    font-size: 14px;
  }
`;
const DetailTodoButton = styled.button`
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
