import React from "react";
import { Transition } from "react-transition-group";

interface FadeProps {
  children: React.ReactNode;
  isShown: boolean;
  timeout: number;
}

function getOpacity(state: string): number {
  if (state === "entered") {
    return 1;
  }

  return 0;
}

const Fade = ({ children, isShown, timeout }: FadeProps): JSX.Element => {
  return (
    <Transition in={isShown} timeout={timeout} mountOnEnter unmountOnExit>
      {state => (
        <div
          style={{
            transition: `opacity ${timeout}ms ease-in-out`,
            opacity: getOpacity(state)
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};

export default Fade;
