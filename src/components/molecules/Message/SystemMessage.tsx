import React, { memo } from 'react';

import styled from 'styled-components';

interface SystemMessage {
  message: string;
  style: Object;
}

const SystemMessage = ({ message, style }: SystemMessage) => <SystemMessageWrapper style={style}>{message}</SystemMessageWrapper>;

const SystemMessageWrapper = styled.span<{style: Object}>`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  color: #4caf50;
  line-height: 1.25;
`;

export default memo(SystemMessage);