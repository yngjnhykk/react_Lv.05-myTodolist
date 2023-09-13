import React from 'react';
import styled from 'styled-components';
import { removeCookie } from '../cookies/cookies';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    removeCookie('id');
    navigate('/login');
  };
  return (
    <HeaderWrap>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Home
      </button>
      <button onClick={logout}>로그아웃</button>
    </HeaderWrap>
  );
}

export default Header;
const HeaderWrap = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: row;
  height: 45px;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(221, 221, 221);
  padding: 0px 12px;
`;
