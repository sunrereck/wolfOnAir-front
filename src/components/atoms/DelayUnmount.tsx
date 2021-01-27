import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

interface DelayUnmountProps {
    children: React.ReactNode;
    isMounted: boolean;
}

function DelayUnmount({children, isMounted}: DelayUnmountProps): React.ReactElement | null {
    const [shouldRender, setShouldRender] = useState(false);
    const prevIsMounted = useRef<any>();

    useEffect(() => {
        if (isMounted && !shouldRender) {
            setShouldRender(true);


            return;
        }

        if (!isMounted && shouldRender) {
            prevIsMounted.current = setTimeout(() => {
                setShouldRender(false);
            }, 1000);
        }
        
        return () => clearTimeout(prevIsMounted.current);
    }, [isMounted, shouldRender]);

    return  shouldRender ? <Wrapper isMounted={isMounted}>{children}</Wrapper> : null;
}


const bounceIn = keyframes`
   0% {
     opacity: 0;  
   }

   50% {
       opacity: 0.5;
   }

   100% {
       opacity: 1;
   }
`;

const bounceOut = keyframes`
   0% {
       opacity : 1;
   }

   50% {
    opacity: 0.5;
    }

   100% {
       opacity : 0;
   }
`;

  const Wrapper = styled.div<{isMounted: boolean}>`
      animation: ${({isMounted}) => isMounted ? css`${bounceIn}`: css`${bounceOut} 2s`};
  `;
  
export default DelayUnmount;