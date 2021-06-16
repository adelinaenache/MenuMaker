import { Button, Layout } from '@/components';
import {
  CATEGORY_FIELDS,
  CREATE_CATEGORY,
  CREATE_ITEM,
  CreateCategoryParams,
  CreateCategoryResult,
  CreateItemParams,
  CreateItemResult,
  DELETE_CATEGORY,
  DELETE_ITEM,
  DeleteCategoryParams,
  DeleteCategoryResult,
  DeleteItemParams,
  DeleteItemResult,
  ITEM_FIELDS,
  UPDATE_ITEM,
  UpdateItemParams,
  UpdateItemResult,
} from '@/gql/restaurant';
import { useUser } from '@/hooks';
import { useRestaurant } from '@/hooks/useRestaurant';
import { Category, Item } from '@/types/restaurant';
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
  Image,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl, TextareaControl, NumberInputControl } from 'formik-chakra-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as yup from 'yup';
import QRCode from 'react-qr-code';

const categorySchema = yup.object().shape({
  name: yup.string().required(),
});

const itemSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  price: yup.number().min(0).required(),
  image: yup.mixed(),
});

const Restaurant = () => {
  const router = useRouter();
  const { restaurant } = useRestaurant(parseInt(router.query.id as string));
  const { user } = useUser();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isCreateItemOpen, onOpen: onCreateItemOpen, onClose: onCreateItemClose } = useDisclosure();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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

  const [createItem] = useMutation<CreateItemResult, CreateItemParams>(CREATE_ITEM, {
    onCompleted: onCreateItemClose,
    onError: (err) => {
      console.error(err);
    },
  });

  const [deleteItem] = useMutation<DeleteItemResult, DeleteItemParams>(DELETE_ITEM, {
    onError: (err) => {
      console.error(err);
    },
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      cache.evict({ id: cache.identify(data.removeItem) });
    },
  });

  const [updateItem] = useMutation<UpdateItemResult, UpdateItemParams>(UPDATE_ITEM, {
    onCompleted: () => {
      onCreateItemClose();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const hasAccess = restaurant && user?.id === parseInt(restaurant?.userId);

  return (
    <Layout>
      {restaurant && (
        <>
          <Flex justifyContent="center">
            <Box p="3" bgColor="white" rounded="xl">
              <QRCode value={window.location.href} />
            </Box>
          </Flex>

          {restaurant.categories.map((category) => (
            <Box key={category.id}>
              <Box>
                <Box position="relative">
                  <Text fontSize="4xl" my={6} textAlign="center">
                    {category.name}
                  </Text>

                  {hasAccess && (
                    <IconButton
                      color="red.300"
                      rounded="full"
                      aria-label="Delete category"
                      pos="absolute"
                      right="0"
                      top="50%"
                      transform="translateY(-50%)"
                      icon={<MinusIcon />}
                      onClick={() => deleteCategory({ variables: { id: category.id } })}
                    />
                  )}
                </Box>

                <SimpleGrid columns={3} gap={6}>
                  {category.items.map((item) => (
                    <Box
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      pos="relative"
                      onClick={
                        hasAccess
                          ? () => {
                              setSelectedItem(item);
                              onCreateItemOpen();
                            }
                          : undefined
                      }
                      cursor={hasAccess ? 'pointer' : undefined}
                      key={item.id}
                    >
                      <Flex flexDir="column" flex="1" py={3} pl={3} pr={3} minH="120px">
                        <Flex flex="1">
                          <Flex flexDir="column" flex="1">
                            <Flex flexDir="column" flex="1">
                              <Text fontSize="xl">{item.name}</Text>

                              <Text fontSize="sm">{item.description}</Text>
                            </Flex>

                            <Text fontSize="md">{item.price} lei</Text>
                          </Flex>

                          {item.image && (
                            <Image rounded="lg" w={100} src={item.image} alt={`${item.name} image`} objectFit="cover" />
                          )}
                        </Flex>
                      </Flex>

                      {hasAccess && (
                        <Button
                          rounded="none"
                          transform="rotate(45deg) translateY(-90%)"
                          bgColor="red.300"
                          pos="absolute"
                          top="0"
                          right="0"
                          w="100px"
                          h="100px"
                          onClick={() => deleteItem({ variables: { id: item.id } })}
                        />
                      )}
                    </Box>
                  ))}

                  {hasAccess && (
                    <Button
                      maxW="sm"
                      borderRadius="lg"
                      overflow="hidden"
                      cursor="pointer"
                      minH="120px"
                      onClick={() => {
                        setSelectedCategory(category);
                        onCreateItemOpen();
                      }}
                    >
                      <Flex flexDir="column" justifyContent="center" alignItems="center" flex="1" px={6} py={3}>
                        <Text fontSize="3xl">Add new item</Text>
                      </Flex>
                    </Button>
                  )}
                </SimpleGrid>
              </Box>

              <Modal
                isOpen={isCreateItemOpen}
                onClose={() => {
                  setSelectedItem(null);
                  onCreateItemClose();
                }}
                isCentered
              >
                <Formik
                  initialValues={selectedItem ?? { name: '', description: '', price: 0, image: '' }}
                  onSubmit={async (values) => {
                    if (!restaurant) {
                      return;
                    }

                    if (!selectedItem) {
                      if (!selectedCategory) {
                        return;
                      }

                      await createItem({
                        variables: {
                          ...values,
                          price: parseFloat((values.price as any) as string),
                          categoryId: selectedCategory.id,
                        },
                        update: (cache, { data }) => {
                          if (!data) {
                            return;
                          }

                          cache.modify({
                            id: cache.identify(selectedCategory),
                            fields: {
                              items: (items = []) => {
                                const newItemRef = cache.writeFragment({
                                  data: data.createItem,
                                  fragment: ITEM_FIELDS,
                                });
                                return [...items, newItemRef];
                              },
                            },
                          });
                        },
                      });
                    } else {
                      await updateItem({
                        variables: { id: selectedItem.id, ...values, price: parseFloat((values.price as any) as string) },
                      });
                      setSelectedItem(null);
                    }
                  }}
                  validationSchema={itemSchema}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Create a new item</ModalHeader>

                        <ModalBody pb={6}>
                          <InputControl name="name" label="Name" />
                          <TextareaControl name="description" label="Description" />
                          <NumberInputControl name="price" label="Price" />
                          {/*<InputControl inputProps={{ type: 'image' }} name="image" label="Image" />*/}
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            onClick={() => {
                              setSelectedItem(null);
                              onCreateItemClose();
                            }}
                            mr={3}
                          >
                            Cancel
                          </Button>

                          <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
                            {selectedItem ? 'Change' : 'Create'}
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Form>
                  )}
                </Formik>
              </Modal>
            </Box>
          ))}
        </>
      )}

      {hasAccess && (
        <Flex justifyContent="center" pt={6}>
          <Button w={60} onClick={onOpen}>
            Add new category
          </Button>
        </Flex>
      )}

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
