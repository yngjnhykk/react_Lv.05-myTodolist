import React from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { QueryClient, useMutation } from 'react-query';
import { addTodo } from '../../api/todos';
import { getCookie } from '../../cookies/cookies';

function AddTodo() {
  // 상태 관리------------------------------------------------

  const [userName, onChangeUserNameHandler] = useInput('');
  const [title, onChangeTitleHandler] = useInput('');
  const [content, onChangeContentHandler] = useInput('');

  // 리액트 쿼리 관련 코드-------------------------------------------
  const queryClient = new QueryClient();

  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
    onError: (err) => {
      alert(err);
    },
  });

  // cookie 로 아이디 가져오기
  const customID = getCookie('customID');
  console.log(customID);

  // 추가하기--------------------------------------------------------

  const addTodoButton = () => {
    const newTodo = {
      customID,
      title,
      content,
      userName,
    };
    mutation.mutate(newTodo);
  };

  //-------------------------------------------------------------------------
  return (
    <div>
      <Header />
      <AddTodoWrap>
        <AddTodoBox>
          <AddTodoForm>
            <div>
              <AddTodoText>작성자</AddTodoText>
              <AddTodoInput
                value={userName}
                onChange={onChangeUserNameHandler}
                type='text'
                placeholder='작성자의 이름을 입력해주세요.(5자 이내)'
              ></AddTodoInput>
              <AddTodoText>제목</AddTodoText>
              <AddTodoInput
                value={title}
                onChange={onChangeTitleHandler}
                type='text'
                placeholder='제목을 입력해주세요.(50자 이내)'
              ></AddTodoInput>
              <AddTodoText>내용</AddTodoText>
              <AddTodoTextarea
                value={content}
                onChange={onChangeContentHandler}
                rows={10}
                maxLength={200}
                type='text'
                placeholder='내용을 입력해주세요.(200자 이내)'
              ></AddTodoTextarea>
            </div>
            <AddTodoButton onClick={addTodoButton}>추가하기</AddTodoButton>
          </AddTodoForm>
        </AddTodoBox>
      </AddTodoWrap>
    </div>
  );
}

export default AddTodo;

const AddTodoWrap = styled.div`
  height: calc(100vh - 120px);
  background-color: rgb(255, 255, 255);
  padding: 24px;
`;

const AddTodoBox = styled.div`
  height: 100%;
`;

const AddTodoForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-box-align: start;
  align-items: start;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: column;
  div {
    width: 100%;
  }
`;

const AddTodoText = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

const AddTodoInput = styled.input`
  box-sizing: border-box;
  height: 46px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  padding: 0px 12px;
  font-size: 14px;
  border: 1px solid rgb(238, 238, 238);
  ::placeholder {
    color: black;
  }
`;

const AddTodoTextarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid rgb(238, 238, 238);
  padding: 12px;
  font-size: 14px;
`;

const AddTodoButton = styled.button`
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
