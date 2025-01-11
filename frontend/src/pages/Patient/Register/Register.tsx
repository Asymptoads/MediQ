import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  Button,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { useBackendAPIContext } from "../../../contexts/BackendAPIContext/BackendAPIContext";
import Icon from "../../../components/Shared/Icon/Icon";
import CustomTextInput from "../../../components/Shared/CustomTextInput/CustomTextInput";
import FormBorder from "../../../components/Patient/FormBorder/FormBorder";
import PageContainer from "../../../components/Shared/PageContainer/PageContainer";
import axios from "axios";
import "./Register.scss";

// Function to calculate password entropy
const calculatePasswordEntropy = (password) => {
  const characterSets = [
    /[a-z]/, // Lowercase letters
    /[A-Z]/, // Uppercase letters
    /[0-9]/, // Numbers
    /[!@#$%^&*(),.?":{}|<>]/, // Special characters
  ];

  let poolSize = 0;

  characterSets.forEach((regex) => {
    if (regex.test(password)) {
      poolSize += regex.source.length;
    }
  });

  const entropy = password.length * Math.log2(poolSize || 1);
  return entropy;
};

const Register = () => {
  const navigate = useNavigate();
  const { client } = useBackendAPIContext();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const entropy = calculatePasswordEntropy(value);

    if (entropy < 28) {
      setPasswordError("Very Weak: Consider using a stronger password.");
    } else if (entropy < 36) {
      setPasswordError("Weak: Add more complexity or length.");
    } else if (entropy < 50) {
      setPasswordError("Medium: A decent password, but could be stronger.");
    } else {
      setPasswordError(""); // Strong password
    }
  };

const handleRegister = async () => {
  setIsLoading(true);
  const userDetails = {
    name,
    email,
    sex,
    password,
    date_of_birth: dateOfBirth,
    phone_number: phoneNumber,
  };

  try {
    console.log(userDetails)
    await client.post("/auth/register", userDetails);

    toast({
      title: "Signup Successful",
      description: "Your account has been created successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate("/login"); // Redirect to login after success
  } catch (error) {
    toast({
      title: "Signup Failed",
      description: error.response?.data?.message || "An error occurred.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordError) {
      toast({
        title: "Invalid Password",
        description: "Please fix the password issues before submitting.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    handleRegister();
  };

  return (
    <PageContainer>
      <Box
        className="register-page"
        padding="0 25px"
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <VStack
          className="register-stuff-container"
          spacing={4}
          align="stretch"
          width="100%"
          maxW="650px"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
          borderRadius="8px"
          p={6}
          bg="white"
        >
          {/* Logo */}
          <Text
            fontSize="32px"
            fontWeight="bold"
            fontFamily="variables.$primary-font"
            textAlign="center"
            mb={10}
          >
            <Text as="span" color="green.400">
              Medi
            </Text>
            <Text as="span" color="blue.600">
              Q
            </Text>
          </Text>
          <Heading className="greeting">Create Account</Heading>
          <form className="register-form" onSubmit={handleSubmit}>
            <CustomTextInput
              label="Name"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="custom-input custom-input-username"
            />
            <CustomTextInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="custom-input custom-input-email"
              required
            />
             <Select
              placeholder="Select Sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="custom-input custom-input-gender"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
            <CustomTextInput
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="custom-input custom-input-password"
              placeholder="********"
              required
            />
            {passwordError && (
              <Box color="red.500" fontSize="sm" mt={1}>
                {passwordError}
              </Box>
            )}
            <CustomTextInput
              label="Date of Birth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="custom-input custom-input-dob"
              required
            />
            <CustomTextInput
              label="Phone Number"
              type="phone_number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="custom-input custom-input-phone-number"
              placeholder="9800000000"
              required
            />
            <Button
              type="submit"
              className="form-submit-btn"
              colorScheme="blue"
              borderRadius="8px"
              marginTop="15px"
              height="50px"
              fontSize="22px"
              fontWeight={600}
              isLoading={isLoading}
            >
              Sign Up
            </Button>
          </form>
          <FormBorder />
          <ChakraLink as={ReactRouterLink} to="/login" className="login-page-link" textAlign="center" marginTop="28px">
            Have an account?{" "}
            <Text as="span" fontWeight={700}>
              Sign In!
            </Text>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/" className="back-home-link">
            <Icon name="bx-arrow-back" className="arrow" />
            Back to Home
          </ChakraLink>
        </VStack>
      </Box>
    </PageContainer>
  );
};

export default Register;
