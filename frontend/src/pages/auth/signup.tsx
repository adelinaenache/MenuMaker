import { Box, Center, Flex, Heading } from "@chakra-ui/layout";
import { Formik, Form, Field, FieldProps } from "formik";
import * as React from "react";
import { AnimatedIntroCard, Layout } from "./components";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import * as yup from "yup";
import { AnimatePresence } from "framer-motion";
// export const FormikChackraField = ({ form: }) => {};

const passwordYupSchema = yup
  .string()
  .required("Field is required")
  .min(8, "")
  .max(64, "")
  .test({
    name: "lower-and-upper",
    test: (value) => {
      if (!value) return false;
      return value.toUpperCase() !== value && value.toLowerCase() !== value;
    },
  })
  .test({
    name: "letters-and-numbers",
    test: (value) => {
      if (!value) return false;
      return /^(?=.*[a-zA-Z])(?=.*[0-9])/g.test(value);
    },
  })
  .test({
    name: "special-characters",
    test: (value) => {
      if (!value) return false;
      return /[!@#?\]\[()_\-+=]/g.test(value);
    },
  });

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address. Try again.")
    .required("Field is required"),
  password: passwordYupSchema,
  confirmPassword: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    })
    .required("Field is required"),
});

export default function Signup() {
  return (
    <Layout>
      <Center h="100%" flexDirection="column">
        <Heading my="10">Signup</Heading>
        <AnimatedIntroCard>
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={signupSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
            validateOnChange={false}
          >
            <Form>
              <InputControl name="email" label="Email" mt="4" />
              <InputControl name="password" label="Password" mt="4" />
              <InputControl
                name="confirmPass"
                label="Confirm Password"
                mt="4"
              />
              <Center mt="8">
                <SubmitButton>Signup</SubmitButton>
              </Center>
            </Form>
          </Formik>
        </AnimatedIntroCard>
      </Center>
    </Layout>
  );
}
