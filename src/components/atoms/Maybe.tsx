import React from 'react';

interface MaybeProps {
  children: React.ReactElement;
  condition: boolean;
}

function Maybe({ children, condition }: MaybeProps): React.ReactElement | null {
	if (!condition) return null;

  return children;
};

export default Maybe;