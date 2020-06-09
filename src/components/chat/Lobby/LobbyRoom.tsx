import React from "react";
import styled from "styled-components";

import Input from "@/components/ui/Input";

const LobbyRoom = () => (
  <LobbyRoomWrapper>
    <Room />
    <div>
      <StyledInput />
    </div>
  </LobbyRoomWrapper>
);

const LobbyRoomWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  margin-right: auto;
  margin-left: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 700px;
`;

const Room = styled.div`
  width: 100%;
  border: 1px solid #000000;
  min-height: 150px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  border: 1px solid #000000;
  max-size:   
`;

export default LobbyRoom;
