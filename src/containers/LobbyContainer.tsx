import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocketIOClient, { connect } from "socket.io-client";


import { Chat } from "@/interface/chat";

import { createRoom, connectLobby } from "@/api/chat";

import { RootState } from "@/modules";

import useInput from "@/hooks/useInput";
import useRequest from "@/hooks/useRequest";

import Lobby from "@/components/molecules/Lobby";

function LobbyContainer(): React.ReactElement {
  const socket = useRef<any>(null);

  useEffect(() => {
     socket.current = connect(`${process.env.REACT_APP_CHAT}/chat`, { path: "/socket.io" });

  })

  return (
    <>
      <div>gd</div>
    </>
  );
};

export default LobbyContainer;
