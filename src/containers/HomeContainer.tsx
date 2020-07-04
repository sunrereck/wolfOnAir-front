import React, { useState } from "react";

import Confirm from "@/components/ui/Confirm";

const HomeContainer = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setOpen((prevState) => !prevState);
        }}
      >
        TEST
      </button>
      <Confirm
        onCancel={() => {
          setOpen((prevState) => !prevState);
        }}
        onClick={() => {
          setOpen((prevState) => !prevState);
        }}
        onClose={() => {
          setOpen((prevState) => !prevState);
        }}
        isShown={isOpen}
        title="방 만들기"
      >
        방제: 잉양잉용
        모드: ㅇㅇ
      </Confirm>
    </div>
  );
};

export default HomeContainer;
