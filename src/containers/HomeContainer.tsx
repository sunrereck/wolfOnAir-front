import React, { useState } from 'react';

import Alert from '@/components/ui/Alert';
const HomeContainer = () => {
  const [isOpen, setOpen ] = useState(false);
  return (
      <div>
        <button type="button" onClick={() => {
          setOpen(prevState => !prevState);
        }}>TEST</button>
        <Alert 
          onClick={() => {
            setOpen(prevState => !prevState);
          }}
          onClose={() => {
            setOpen(prevState => !prevState);
          }}
          isOpen={isOpen}
          title="12345"
        >
          테스트
        </Alert>
      </div>
  )
}

export default HomeContainer;