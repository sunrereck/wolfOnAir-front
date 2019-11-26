import React from 'react';

import ValidationInput from '@/components/ui/ValidationInput';

const HomeContainer = () => {
  return (
      <div>
        <ValidationInput 
          type="text"
          name="test"
          onChange={() => {}}
          value=""
        />
        <ValidationInput 
          type="text"
          name="test"
          onChange={() => {}}
          value=""
          errorMessage="필수값 입니다."        
        />
      </div>
  )
}

export default HomeContainer;