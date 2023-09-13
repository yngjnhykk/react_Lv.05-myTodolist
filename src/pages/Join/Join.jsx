import React from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { getUsers, addUser } from '../../api/users';
import { QueryClient, useMutation } from 'react-query';
import { useQuery } from 'react-query';

function Join() {
  // 상태 관리 -----------------------------------------
  const [userID, onChangeIDHandler] = useInput('');
  const [userPassword, onChangePasswordHandler] = useInput('');

  //네비게이트----------------------------------------------
  const navigate = useNavigate();

  // 리액트 쿼리 코드-------------------------------------------
  
  const queryClient = new QueryClient();

  const mutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const { isLoading, isError, data } = useQuery('users', getUsers);

  if (isLoading) {
    return <div>로딩중입니다..</div>;
  }
  const userInfo = data.data;


  // 회원가입-------------------------------------------------------
  let customID = 3;

  const join = () => {
    const isMatch = userInfo.filter((user) => user.userID === parseInt(userID));
    if (isMatch.length > 0) {
      console.log(isMatch);
      alert('이미 가입한 아이디입니다. 다른 아이디로 다시 한 번 시도해주세요.');
    } else {
      const newUser = {
        customID,
        userID: +userID,
        userPassword: +userPassword,
      };
      mutation.mutate(newUser);
      alert('환영합니다. 회원님. 로그인페이지로 이동하겠습니다.');
      navigate('/login');
      customID++;
    }
  };
  return (
    <LoginWrap>
      <h1>회원가입</h1>
      <LoginBox>
        <label>아이디</label>
        <Input
          value={userID}
          name='userID'
          type='text'
          onChange={onChangeIDHandler}
        ></Input>
        <label>비밀번호</label>
        <Input
          value={userPassword}
          name='userPassword'
          type='password'
          onChange={onChangePasswordHandler}
        ></Input>
        <Button onClick={join}>회원가입</Button>
        <Button
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인 페이지로 이동
        </Button>
      </LoginBox>
    </LoginWrap>
  );
}

export default Join;

const LoginWrap = styled.div`
  height: 79vh;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 50px;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 0px 12px;
`;

const LoginBox = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  box-sizing: border-box;
  height: 46px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  padding: 0px 12px;
  font-size: 14px;
  border: 1px solid rgb(238, 238, 238);
`;

const Button = styled.button`
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
  background-color: skyblue;
  cursor: pointer;
  width: 100%;
`;
