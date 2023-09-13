import React from 'react';
import styled from 'styled-components';

function CommentList() {
  return (
    <div>
      <CommentListWrap>
        <div>눌러서 댓글보기</div>
      </CommentListWrap>
    </div>
  );
}

export default CommentList;

const CommentListWrap = styled.div`
  height: 30px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  transition: height 400ms ease-in-out 0s;
  div {
    font-size: 16px;
  }
`;
