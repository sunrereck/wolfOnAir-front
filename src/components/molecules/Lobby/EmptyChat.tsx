import React from 'react';
import styled from 'styled-components';

const EmptyChat  = () => <EmptyChatWrapper>앗, 아직 개설된 채팅방이 없어요!</EmptyChatWrapper>;

const EmptyChatWrapper = styled.div`
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 700px;
  text-align: center;
  font-size: 1rem;
`;

export default EmptyChat;