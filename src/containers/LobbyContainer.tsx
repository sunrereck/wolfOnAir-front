import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Chat } from "@/interface/chat";

import { createRoom, connectLobby } from "@/api/chat";

import { RootState } from "@/modules";
import { join, leave, sendMessage } from "@/modules/chat";

import useInput from "@/hooks/useInput";
import useRequest from "@/hooks/useRequest";

import Lobby from "@/components/molecules/Lobby";

function LobbyContainer(): React.ReactElement {
  
  return (
    <>
      <div>gd</div>
    </>
  );
};

export default LobbyContainer;
