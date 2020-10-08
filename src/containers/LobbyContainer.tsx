import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { History } from "history";

import { Chat } from "@/interface/chat";

import { createRoom, connectLobby } from "@/api/chat";

import { RootState } from "@/modules";
import { join, leave, sendMessage } from "@/modules/chat";

import useInput from "@/hooks/useInput";
import useRequest from "@/hooks/useRequest";

import Lobby from "@/components/chat/Lobby";

const LobbyContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [isShownConfirm, setConfirm] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { isLoggedIn, chat, uid, userName } = useSelector(
    (state: RootState) => ({
      isLoggedIn: state.user.isLoggedIn,
      uid: state.user.uid,
      userName: state.user.userName,
      chat: state.chat.chat,
    })
  );
  const [message, onChangeMessage, onResetMessage] = useInput();
  const [roomTitle, onChangeRoomTitle, onResetRoomTitle] = useInput();
  const [state, onConnectLobby, onResetLobbyState] = useRequest(
    () => connectLobby(uid),
    [],
    true
  );
  const [roomState, onCreateRoom, onResetRoomState] = useRequest(createRoom, [], true);

  const onOpenNewRoom = () => {
    setConfirm(true);
  };

  const onCloseNewRoom = () => {
    onResetRoomTitle();
    setConfirm(false);
  };

  const onClickNewRoom = async () => {
    try {
      await onCreateRoom(roomTitle, userName);
    } catch (err) {
      let message = "서버와의 연결에 실패하였습니다.";

      if (err.response && err.response.status === 400) {
        message = "필수값이 누락되어 방생성을 완료하지 못하였습니다.";
      }

      setErrorMessage(message);
    }
  };

  const onSendMessage = useCallback(() => {
    if (!message) {
      return;
    }

    dispatch(sendMessage(message));
    onResetMessage();
  }, [dispatch, message, onResetMessage]);

  const onResetError = useCallback(() => {
    onResetLobbyState();
    onResetRoomState();

  }, [onResetLobbyState, onResetRoomState]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const initialize = async () => {
      try {
        await onConnectLobby();
      } catch(err) {
        let message = "서버와의 연결에 실패하였습니다.";
  
        if (err.response && err.response.status === 401) {
          message = "로그인 상태가 아닙니다.";
        }
  
        setErrorMessage(message);
      }
    }

    initialize();
  
    // eslint-disable-next-line
  }, [isLoggedIn]);
  
  useEffect(() => {

    if (state && state.data) {
      dispatch(join());
    }

  }, [dispatch, state]);

  useEffect(() => {
    if (!chat) {
      return;
    }

    setChatList((prevState) => prevState.concat(chat));
  }, [chat]);

  useEffect(() => {
    if (roomState && roomState.data) {
      dispatch(leave());
      window.location.href = `/room/${roomState.data.roomId}`;
    }
  }, [dispatch, roomState]);

  return (
    <>
      <Lobby
        chatList={chatList}
        errorMessage={errorMessage}
        isError={!!state.error || !!roomState.error}
        isShownNewRoom={isShownConfirm}
        message={message}
        roomList={[]}
        roomTitle={roomTitle}
        onChangeMessage={onChangeMessage}
        onChangeRoomTitle={onChangeRoomTitle}
        onCloseNewRoom={onCloseNewRoom}
        onCreateRoom={onClickNewRoom}
        onOpenNewRoom={onOpenNewRoom}
        onResetError={onResetError}
        onSendMessage={onSendMessage}
      />
    </>
  );
};

export default LobbyContainer;
