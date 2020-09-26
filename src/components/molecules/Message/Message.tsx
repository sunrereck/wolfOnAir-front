import React, { memo } from "react";

import UserMessage from "./UserMessage";
import SystemMessage from "./SystemMessage";

interface MessageProps {
  isSystem: boolean;
  message: string;
  userName: string;
  style: Object;
}

const Message = ({
  isSystem,
  message,
  style,
  userName
}: MessageProps): JSX.Element => {
  if (isSystem) {
    return <SystemMessage message={message} style={style} />;
  }

  return <UserMessage message={message} style={style} userName={userName} />;
};

export default memo(Message);
