import { Center, Heading, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import * as React from 'react';
import { AnimatedIntroCard, Button, Layout } from '@/components';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { AuthMutation, LoginResult } from '@/types/AuthTypes';
import { ACCESS_TOKEN, REFRESH_TOKEN, setToken } from '@/utils/token';
import { LOGIN } from '@/gql/auth';
import { useState } from 'react';
import router from 'next/router';

const passwordYupSchema = yup.string().required('Field is required');

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address. Try again.').required('Field is required'),
  password: passwordYupSchema,
});

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [sendLogin] = useMutation<LoginResult, AuthMutation>(LOGIN, {
    async onCompleted(data) {
      const { login } = data;
      if (login) {
        setToken(ACCESS_TOKEN, login.accessToken);
        setToken(REFRESH_TOKEN, login.refreshToken);
        await router.push({
          pathname: '/restaurants',
        });
      }
    },
    onError(err) {
      console.log('ERROR', err);
      setErrorMessage(err?.message || 'An unknown error occurred');
    },
  });

  return (
    <Layout unwrapped>
      <Center h="100%" flexDirection="column">
        <Heading my="10">Login</Heading>
        <AnimatedIntroCard>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              setErrorMessage(null);
              await sendLogin({
                variables: {
                  email: values.email,
                  password: values.password,
                },
              });
            }}
            validateOnChange={false}
          >
            {() => (
              <Form>
                <InputControl name="email" label="Email" mt="4" inputProps={{ type: 'email' }} />
                <InputControl name="password" label="Password" mt="4" inputProps={{ type: 'password' }} />
                <Center mt="8" flexDirection="column">
                  {errorMessage && (
                    <Text color="red" mb="8">
                      {errorMessage}
                    </Text>
                  )}
                  <SubmitButton type="submit">Login</SubmitButton>
                  <Button href="/auth/signup" colorScheme="blue" variant="link">
                    you don&apos;t have an account yet? Signup here!
                  </Button>
                </Center>
              </Form>
            )}
          </Formik>
        </AnimatedIntroCard>
      </Center>
    </Layout>
  );
}
