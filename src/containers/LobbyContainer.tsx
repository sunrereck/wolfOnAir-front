import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { Chat } from "@/models/chat";
import { RoomModeTypes } from "@/models/room";

import { createRoom, connectLobby } from "@/api/chat";

import { RootState } from "@/modules";

import useRequest from "@/hooks/useRequest";

import chatColors from '@/styles/chatColors';

import Lobby from '@/components/organisms/Lobby';

function LobbyContainer(): React.ReactElement {
  const [isSowingNewRoomModal, setIsShowingNewRoomModal] = useState(false);
  const [peopleCount, setPeopleCount] = useState(0);
  const [roomType, setRoomType] = useState<RoomModeTypes | ''>('');
  const [color, setColor] = useState(chatColors.black);
  const [chats, setChats] = useState<Chat[]>([]);
  const { userName } = useSelector((state: RootState) => state.user); 
  const socket = useRef<any>(null);

  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_CHAT}/chat`, {
      withCredentials: true,
      query: {
        room: 'lobby',
        userName
      }
    });

    socket.current.on('join', (chat: Chat) => {
      setChats((prevState) => ([
        ...prevState,
        chat
      ]))
    });

    socket.current.on('getMessage', (chat: Chat) => {
      setChats((prevState) => ([
        ...prevState,
        chat
      ]))
    })

    return () => {
      socket.current.disconnect();
    }
  }, [userName]);

  useEffect(() => {
    const chatColorList = Object.keys(chatColors);
    const random = Math.floor(Math.random() * chatColorList.length);
    const color = chatColorList[random];

    setColor(color);
  }, []);

  const onSendMessage = (message: string) => {
    socket.current.emit('sendMessage', {
      color,
      message,
      userName,
      room: 'lobby'
    });
  }

  const onSetRoomType = (roomType: string) => {
    setRoomType(roomType);
  }

  const onSetPeopleCount = (peopleCount: number) => {
    setPeopleCount(peopleCount);
  }

  return (
    <Lobby 
      chats={chats}
      isSowingNewRoomModal={isSowingNewRoomModal}
      roomType={roomType}
      peopleCount={peopleCount}
      onSendMessage={onSendMessage} 
      onSetRoomType={onSetRoomType}
      onSetPeopleCount={onSetPeopleCount} />
  );
};

export default LobbyContainer;
