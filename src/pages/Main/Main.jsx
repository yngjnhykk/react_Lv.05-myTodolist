import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <MainWrap>
        <MainBox>
          <MainContent>
            <div className='title'>무엇을 할까요?</div>
            <MainOption>
              <div>할 일 기록하기</div>
              <button
                onClick={() => {
                  navigate(`/addTodo`);
                }}
              >
                화살표
              </button>
            </MainOption>
            <MainOption>
              <div>TODO LIST</div>
              <button
                onClick={() => {
                  navigate('/todos');
                }}
              >
                화살표
              </button>
            </MainOption>
          </MainContent>
        </MainBox>
      </MainWrap>
    </>
  );
}

export default Main;

const MainWrap = styled.div`
  height: calc(100vh - 45px);
  background-color: rgb(255, 255, 255);
  padding: 24px;
`;

const MainBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MainContent = styled.div`
  margin-top: 24px;
  display: flex;
  -webkit-box-align: start;
  align-items: start;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  .title {
    font-size: 40px;
  }
`;

const MainOption = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: row;
  padding: 0px 20px;
  width: 100%;
  height: 120px;
  border: 1px solid rgb(238, 238, 238);
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  cursor: pointer;
  div {
    font-size: 24px;
  }
  button {
    width: 100px;
    height: 50px;
  }
`;
