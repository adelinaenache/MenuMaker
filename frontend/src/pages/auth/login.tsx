import { Center, Heading, Text } from '@chakra-ui/layout';
import { Formik, Form } from 'formik';
import * as React from 'react';
import { AnimatedIntroCard, Layout } from '@/components';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { AuthMutation, LoginResult } from '@/types/AuthTypes';
import { ACCESS_TOKEN, REFRESH_TOKEN, setToken } from '@/utils/token';
import { LOGIN } from '@/gql/auth';
import { useState } from 'react';

const passwordYupSchema = yup.string().required('Field is required').min(8, '').max(64, '');

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address. Try again.').required('Field is required'),
  password: passwordYupSchema,
});

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [sendLogin] = useMutation<LoginResult, AuthMutation>(LOGIN, {
    onCompleted({ login }) {
      if (login) {
        setToken(ACCESS_TOKEN, login.accessToken);
        setToken(REFRESH_TOKEN, login.refreshToken);
      }
    },
    onError(err) {
      setErrorMessage(err.message);
    },
  });

  return (
    <Layout>
      <Center h="100%" flexDirection="column">
        <Heading my="10">Login</Heading>
        <AnimatedIntroCard>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              setErrorMessage(null);
              sendLogin({
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
                <InputControl name="email" label="Email" mt="4" />
                <InputControl name="password" label="Password" mt="4" inputProps={{ type: 'password' }} />
                <Center mt="8" flexDirection="column">
                  {errorMessage && (
                    <Text color="red" mb="8">
                      {errorMessage}
                    </Text>
                  )}
                  <SubmitButton type="submit">Login</SubmitButton>
                </Center>
              </Form>
            )}
          </Formik>
        </AnimatedIntroCard>
      </Center>
    </Layout>
  );
}
