import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";


import { Chat } from "@/interface/chat";

import { createRoom, connectLobby } from "@/api/chat";

import { RootState } from "@/modules";

import useInput from "@/hooks/useInput";
import useRequest from "@/hooks/useRequest";

import Lobby from "@/components/molecules/Lobby";

function LobbyContainer(): React.ReactElement {
  const socket = useRef<any>(null);

  useEffect(() => {
     socket.current = io(`${process.env.REACT_APP_CHAT}/chat`);
  })

  return (
    <>
      <div>gd</div>
    </>
  );
};

export default LobbyContainer;
