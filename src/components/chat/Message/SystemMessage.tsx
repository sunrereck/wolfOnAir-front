import React, { memo } from 'react';

import styled from 'styled-components';

interface SystemMessageProps {
  message: string;
}

const SystemMessage = ({ message }: SystemMessageProps) => <SystemMessageWrapper>{message}</SystemMessageWrapper>;

const SystemMessageWrapper = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  color: #4caf50;
  line-height: 1.25;
`;

export default memo(SystemMessage);