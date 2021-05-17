import React from 'react';

interface ConditionalWrapperProps {
  condition?: boolean;
  thenComponent: JSX.Element;
  elseComponent?: JSX.Element;
}

export const ConditionalWrapper = ({
  children,
  condition,
  thenComponent,
  elseComponent,
}: React.PropsWithChildren<ConditionalWrapperProps>) => {
  return (
    <>
      {condition
        ? children && React.cloneElement(thenComponent, { children })
        : (elseComponent && React.cloneElement(elseComponent, { children })) || children}
    </>
  );
};
