import React from 'react';
import { Box, Text, Input, Button, Link, VStack, HStack, Image, Icon } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import './Login.scss';
import 'boxicons';

// type IconName = string;

const LoginPage: React.FC = () => {
  return (
    <Box className="login-page" padding="0 25px" minHeight="100vh" position="relative">
      <VStack className="login-stuff-container" marginTop="52px" spacing={4} align="stretch">
        {/* Logo */}
        <Text fontSize="32px" fontWeight="bold" fontFamily="variables.$primary-font" textAlign="center">
          <Text as="span" color="green.400">Medi</Text>
          <Text as="span" color="blue.6  00">Q</Text>
        </Text>

        {/* Login Form */}
        <VStack className="login-form" spacing={4} align="stretch">
          <Input placeholder="Username" className="custom-input" marginTop="25px" />
          <Input placeholder="Password" type="password" className="custom-input" />
          <Link
            href="#"
            className="forgot-password-link"
            textAlign="right"
            fontSize="14px"
            fontWeight="600"
            color="variables.$pure-black-60"
            marginTop="15px"
            alignSelf="flex-end"
          >
            Forgot Password?
          </Link>
          <Button
            className="form-submit-btn"
            fontFamily="variables.$primary-font"
            _hover={{ backgroundColor: "variables.$pure-black-80" }}
          >
            Log In
          </Button>
        </VStack>

        {/* Or Continue With */}
        <Text className="or-continue-with" textAlign="center" fontSize="18px" fontWeight="200" color="variables.$pure-black-80">
          Or Continue With
        </Text>

        {/* Google Sign In Button */}
        <Button
          className="google-sign-in-btn"
          height="50px"
          borderRadius="8px"
          backgroundColor="variables.$pure-white"
          fontFamily="variables.$primary-font"
          fontSize="18px"
          fontWeight="600"
          color="variables.$pure-black-80"
        >
          <HStack spacing={3} align="center">
            <Text>Sign in with Google</Text>
          </HStack>
        </Button>

        {/* Register Page Link */}
        <Text className="register-page-link" fontFamily="variables.$primary-font" fontWeight="400" fontSize="18px">
          Don’t have an account? <Link href="/register">Register</Link>
        </Text>

        {/* Back Home Link */}
        <Link
          href="/"
          className="back-home-link"
          display="inline-flex"
          alignSelf="flex-end"
          fontSize="15px"
          fontWeight="700"
          fontFamily="variables.$primary-font"
          textDecoration="none"
          marginTop="25px"
        >
          <Icon as={ArrowBackIcon} marginRight="3px" boxSize={5} /> Back to Home
        </Link>
      </VStack>
    </Box>
  );
};

export default LoginPage;
