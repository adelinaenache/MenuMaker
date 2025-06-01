import { ConditionalWrapper } from '@/components';
import { Never } from '@/types/utility';
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';
import NextLink from 'next/link';
import React from 'react';

type BaseButtonProps = Partial<NextLinkProps> | Never<NextLinkProps>;

export type ButtonProps = React.PropsWithChildren<BaseButtonProps & Partial<Omit<ChakraButtonProps, 'as'>>>;

// Has to be a new component because both chakra and next share the `as` keyword
export const Button = ({ href, as, replace, scroll, shallow, prefetch, children, ...chakraProps }: ButtonProps) => {
  return (
    <ConditionalWrapper
      condition={!!href}
      thenComponent={
        <NextLink passHref={true} href={href!} as={as} replace={replace} scroll={scroll} shallow={shallow} prefetch={prefetch} />
      }
    >
      <ChakraButton {...chakraProps}>{children}</ChakraButton>
    </ConditionalWrapper>
  );
};
