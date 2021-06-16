import { Button, Layout } from '@/components';
import {
  CATEGORY_FIELDS,
  CREATE_CATEGORY,
  CreateCategoryParams,
  CreateCategoryResult,
  DELETE_CATEGORY,
  DeleteCategoryParams,
  DeleteCategoryResult,
} from '@/gql/restaurant';
import { useRestaurant } from '@/hooks/useRestaurant';
import { Category } from '@/types/restaurant';
import { useMutation } from '@apollo/client';
import { MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useRouter } from 'next/router';
import React from 'react';
import * as yup from 'yup';

const categorySchema = yup.object().shape({
  name: yup.string().required(),
});

const Restaurant = () => {
  const router = useRouter();
  const { restaurant } = useRestaurant(parseInt(router.query.id as string));

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createCategory] = useMutation<CreateCategoryResult, CreateCategoryParams>(CREATE_CATEGORY, {
    onCompleted: onClose,
    onError: (err) => {
      console.error(err);
    },
    update: (cache, { data }) => {
      if (!data || !restaurant) {
        return;
      }

      cache.modify({
        id: cache.identify(restaurant),
        fields: {
          categories: (categories = []) => {
            const newCategoryRef = cache.writeFragment({
              data: data.createCategory,
              fragment: CATEGORY_FIELDS,
              fragmentName: 'CategoryFields',
            });
            return [...categories, newCategoryRef];
          },
        },
      });
    },
  });

  const [deleteCategory] = useMutation<DeleteCategoryResult, DeleteCategoryParams>(DELETE_CATEGORY, {
    onCompleted: onClose,
    onError: (err) => {
      console.error(err);
    },
    update: (cache, { data }) => {
      if (!data || !restaurant) {
        return;
      }

      cache.evict({ id: cache.identify(data.removeCategory) });
    },
  });

  return (
    <Layout>
      {restaurant &&
        restaurant.categories.map((category) => (
          <Box key={category.id}>
            <Box position="relative">
              <Text fontSize="4xl" my={6} textAlign="center">
                {category.name}
              </Text>

              <IconButton
                color="red.300"
                rounded="full"
                aria-label="Delete category"
                pos="absolute"
                right="0"
                top="50%"
                icon={<MinusIcon />}
                onClick={() => deleteCategory({ variables: { id: category.id } })}
              />
            </Box>

            <SimpleGrid columns={3} gap={6}>
              {category.items.map((item) => (
                <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" key={item.id}>
                  <Flex flexDir="column" flex="1" px={6} py={3} minH="120px">
                    <Flex flexDir="column" flex="1">
                      <Text fontSize="xl">{item.name}</Text>

                      <Text fontSize="sm">{item.description}</Text>
                    </Flex>

                    <Text fontSize="md">{item.price} lei</Text>
                  </Flex>
                </Box>
              ))}

              <Button
                maxW="sm"
                borderRadius="lg"
                overflow="hidden"
                cursor="pointer"
                minH="120px"
                onClick={() => {
                  console.log('adding item');
                }}
              >
                <Flex flexDir="column" justifyContent="center" alignItems="center" flex="1" px={6} py={3}>
                  <Text fontSize="3xl" color="gray.100">
                    Add new item
                  </Text>
                </Flex>
              </Button>
            </SimpleGrid>
          </Box>
        ))}

      <Flex justifyContent="center" pt={6}>
        <Button w={60} onClick={onOpen}>
          Add new category
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={async (values) => {
            if (!restaurant) {
              return;
            }

            await createCategory({
              variables: { ...values, restaurantId: restaurant.id },
            });
          }}
          validationSchema={categorySchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create a new category</ModalHeader>

                <ModalBody pb={6}>
                  <InputControl name="name" label="Category name" />
                </ModalBody>

                <ModalFooter>
                  <Button onClick={onClose} mr={3}>
                    Cancel
                  </Button>

                  <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
                    Create
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          )}
        </Formik>
      </Modal>
    </Layout>
  );
};

export default Restaurant;
