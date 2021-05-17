import { Layout } from '@/components';
import { CREATE_RESTAURANT, CreateRestaurantMutation, CreateRestaurantResult, RESTAURANT_FIELDS } from '@/gql/restaurant';
import { withAuth } from '@/hoc';
import { useUser } from '@/hooks';
import { useMutation } from '@apollo/client';
import { Center, Heading, Text } from '@chakra-ui/layout';
import { Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as yup from 'yup';

const restaurantSchema = yup.object().shape({
  name: yup.string().required(),
  country: yup.string().required(),
  city: yup.string().required(),
  address: yup.string().required(),
});

const CreateRestaurant = withAuth(() => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const router = useRouter();
  const { user } = useUser();

  const [createRestaurant] = useMutation<CreateRestaurantResult, CreateRestaurantMutation>(CREATE_RESTAURANT, {
    onCompleted: async () => {
      await router.push('/restaurants');
    },
    onError: (err) => {
      setErrorMessage(err.message);
    },
    update: (cache, { data }) => {
      if (!data || !user) {
        return;
      }

      cache.modify({
        id: cache.identify(user),
        fields: {
          restaurants: (restaurants = []) => {
            const newRestaurantRef = cache.writeFragment({
              data: data.createRestaurant,
              fragment: RESTAURANT_FIELDS,
            });
            return [...restaurants, newRestaurantRef];
          },
        },
      });
    },
  });

  return (
    <Layout>
      <Heading>Create a restaurant</Heading>

      <Formik
        initialValues={{ name: '', country: '', city: '', address: '' }}
        validationSchema={restaurantSchema}
        onSubmit={async (values) => {
          setErrorMessage(null);
          await createRestaurant({
            variables: values,
          });
        }}
      >
        {() => {
          return (
            <Form>
              <Stack spacing={4}>
                <InputControl name="name" label="Restaurant name" />
                <InputControl name="country" label="Country" />
                <InputControl name="city" label="City" />
                <InputControl name="address" label="Address" />
              </Stack>

              <Center mt="8" flexDirection="column">
                {errorMessage && (
                  <Text color="red" mb="8">
                    {errorMessage}
                  </Text>
                )}

                <SubmitButton type="submit">Create</SubmitButton>
              </Center>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
});

export default CreateRestaurant;
