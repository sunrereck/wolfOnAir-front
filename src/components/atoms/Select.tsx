import React, { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';

import IcCaret from '@/components/icons/IcCaret';

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  placeholder?: string;
  value: unknown;
  onChange: (value: unknown) => void;
}

function Select ({
  children,
  placeholder = "선택",
  value,
  onChange
}: SelectProps): React.ReactElement {
  const wrapperEl = useRef<HTMLDivElement>(null);
  const [isShowing, setIsShowing] = useState(false);
  const childrenArray = React.Children.toArray(children);
  const selectedIndex = childrenArray.findIndex((child) => (
    (child as React.ReactElement).props.value === value
  ));
  const options: any[] = childrenArray.map((child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    return (
      React.cloneElement(child as React.ReactElement, {
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          
          onChange(child.props.value);
          onSetOptions();
        },
        'data-value': child.props.value,
        value: undefined,
        text: child.props.text
      })
    )
  });

  const onSetOptions = () => {
    setIsShowing(prevState => !prevState);
  }

  const onCloseOptions = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    
    setIsShowing(false);
  }

  return (
    <Wrapper ref={wrapperEl}>
      <SelectWrapper onClick={onSetOptions} className={`select ${isShowing ? 'select-open' : 'select-close'}`} ref={wrapperEl}>
        <span>
          {
            selectedIndex >= 0 
            ? (options[selectedIndex] as React.ReactElement).props.text  
            : placeholder
          }
          <IcCaret />
        </span>
          <Transition in={isShowing} timeout={100} mountOnEnter unmountOnExit>
            {
              state => (
                <OptionsWrapper role="presentation" onClick={onCloseOptions}>
                  <Options 
                    className={`select-options ${state}`}
                    top={wrapperEl?.current?.offsetTop || 0} 
                    left={wrapperEl?.current?.offsetLeft || 0}
                    width={wrapperEl?.current?.clientWidth || 0}>
                    {options}
                  </Options>
                </OptionsWrapper>
              )
            }
          </Transition>
      </SelectWrapper>
    </Wrapper>
  );
}

const popFadeIn = keyframes`
  0% {
    transform: scale(0.9, 0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1, 1);
    opacity: 1;
  }
`;

const popFadeOut = keyframes`
0% {
  transform: scale(1, 1);
  opacity: 1;
}
100% {
  transform: scale(0.9, 0.9);
  opacity: 0;
}  
`;

const Wrapper = styled.div`
  display: inline-flex;
  position: relative;
  align-items: center;
  min-width: 160px;
`;

const SelectWrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  user-select: none;
  min-height: 1.1876em; 
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0.5rem;
  border-bottom: 1px solid ${({theme}) => theme.primaryColor};

  svg {
    position: absolute;
    width: 14px;
    height: 14px;
    top: 50%;
    right: 0;
    margin-top: -7px;
  }

  &.select-open {
    svg {
      transform: rotate(180deg);
    }
  }
`;

const OptionsWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Options = styled.div<{top: number; left: number; width: number;}>`
  position: absolute;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  border-radius: 4px;
  top: ${({top}) => top}px;
  left: ${({left}) => left}px;
  width: ${({width}) => width}px;
  overflow-x: hidden;
  overflow-y: auto;

  &.entering {
    animation-duration: .1s;
    animation-fill-mode: both;
    animation-timing-function: ease-in;
    animation-name: ${popFadeIn} 
  }

  &.exiting {
    animation-duration: .1s;
    animation-fill-mode: both;
    animation-timing-function: ease-in;
    animation-name: ${popFadeOut};
  }
`;

export default Select;
