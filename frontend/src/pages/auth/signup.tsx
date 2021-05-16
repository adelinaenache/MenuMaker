import { Center, Heading, Text } from '@chakra-ui/layout';
import { Formik, Form } from 'formik';
import * as React from 'react';
import { AnimatedIntroCard, Layout } from '@/components';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '@/gql/auth';
import { AuthMutation, SignupResult } from '@/types/AuthTypes';
import { ACCESS_TOKEN, REFRESH_TOKEN, setToken } from '@/utils/token';
import { useState } from 'react';

const passwordYupSchema = yup.string().required('Field is required').min(8, '').max(64, '');

const signupSchema = yup.object().shape({
  email: yup.string().email('Invalid email address. Try again.').required('Field is required'),
  password: passwordYupSchema,
  confirmPass: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    })
    .required('Field is required'),
});

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [sendSignup] = useMutation<SignupResult, AuthMutation>(SIGNUP, {
    onCompleted({ signup }) {
      if (signup) {
        setToken(ACCESS_TOKEN, signup.accessToken);
        setToken(REFRESH_TOKEN, signup.refreshToken);
      }
    },
    onError(err) {
      setErrorMessage(err.message);
    },
  });

  return (
    <Layout>
      <Center h="100%" flexDirection="column">
        <Heading my="10">Signup</Heading>
        <AnimatedIntroCard>
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={signupSchema}
            onSubmit={async (values) => {
              setErrorMessage(null);
              sendSignup({
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
                <InputControl name="confirmPass" label="Confirm Password" inputProps={{ type: 'password' }} mt="4" />
                <Center mt="8" flexDirection="column">
                  {errorMessage && (
                    <Text color="red" mb="8">
                      {errorMessage}
                    </Text>
                  )}
                  <SubmitButton type="submit">Submit</SubmitButton>
                </Center>
              </Form>
            )}
          </Formik>
        </AnimatedIntroCard>
      </Center>
    </Layout>
  );
}
