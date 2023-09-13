import React from 'react';
import styled from 'styled-components';
import { getUsers } from '../../api/users';
import { useQuery } from 'react-query';
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../cookies/cookies';

function Login() {
  // 상태 관리 -----------------------------------------

  const [userID, onChangeIDHandler] = useInput('');
  const [userPassword, onChangePasswordHandler] = useInput('');
  //네비게이트----------------------------------------------

  const navigate = useNavigate();

  // 리액트 쿼리 코드-------------------------------------------

  const { isLoading, isError, data } = useQuery('users', getUsers);
  if (isLoading) {
    return <div>로딩중입니다..</div>;
  }
  if (isError) {
    return (
      <div>서버를 불러오는 데에 실패했습니다. 에러메시지를 확인해주세요.</div>
    );
  }
  const userInfo = data.data;

  // 로그인------------------------------------------------------------

  const onSubmit = () => {
    console.log(userInfo);
    const isMatch = userInfo.filter((user) => user.userID === parseInt(userID));
    if (isMatch.length > 0) {
      if (isMatch[0]['userPassword'] === parseInt(userPassword)) {
        setCookie(`customID`, isMatch[0]['customID'], {
          path: '/',
          secure: true,
          maxAge: 3000,
        });
        alert('반갑습니다. 회원님');
        navigate(`/`, { replace: true });
      } else {
        alert('비밀번호가 맞지 않았습니다. 다시 시도해주세요.');
      }
    } else {
      alert('존재하지 않은 유저입니다.');
    }
  };

  //-------------------------------------------------------------------------
  return (
    <LoginWrap>
      <h1>로그인 하기</h1>
      <LoginBox>
        <label>아이디</label>
        <Input
          value={userID}
          type='text'
          name='userID'
          onChange={onChangeIDHandler}
        ></Input>
        <label>비밀번호</label>
        <Input
          value={userPassword}
          type='text'
          name='userPassword'
          onChange={onChangePasswordHandler}
        ></Input>
        <Button onClick={onSubmit}>로그인</Button>
        <Button
          onClick={() => {
            navigate('/join');
          }}
        >
          회원가입
        </Button>
      </LoginBox>
    </LoginWrap>
  );
}

export default Login;

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
