import React from 'react';

interface INewLineTextProps {
  text: string;
}

function NewLineText ({ text }: INewLineTextProps): React.ReactElement {
    return (
    <>
        {
        text.split('\n').map((word: string) => (
        <span key={word}>
            {word}
            <br />
        </span>
        ))
    }
      </>
    );
}

export default NewLineText;