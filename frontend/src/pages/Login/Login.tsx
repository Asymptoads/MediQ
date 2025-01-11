import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Link,
  VStack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useBackendAPIContext } from "../../contexts/BackendAPIContext/BackendAPIContext";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/PageContainer/PageContainer";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import "./Login.scss";

const Login: React.FC = () => {
  const { client } = useBackendAPIContext();
  const { fetchUser } = useUserContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const userDetails = { email, password };
    try {
      const res = await client.post("http://localhost:4200/auth/login", userDetails);
      console.log(res.data);
      fetchUser();
      navigate("/home");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <PageContainer>
      <Box
        className="login-page"
        padding="0 25px"
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <VStack
          className="login-stuff-container"
          marginTop="52px"
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
          <Text fontSize="32px" fontWeight="bold" textAlign="center">
            <Text as="span" color="green.400">
              Medi
            </Text>
            <Text as="span" color="blue.600">
              Q
            </Text>
          </Text>

          {/* Login Form */}
          <VStack spacing={4} align="stretch">
            <form onSubmit={handleSubmit}>
              <CustomTextInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="custom-input custom-input-email"
                required
              />
              <CustomTextInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="custom-input custom-input-password"
                required
              />
              <Link
                href="#"
                fontSize="14px"
                fontWeight="600"
                color="gray.600"
                marginTop="15px"
                alignSelf="flex-end"
              >
                Forgot Password?
              </Link>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                width="100%"
                mt={4}
              >
                {isLoading ? <Spinner size="sm" /> : "Login"}
              </Button>
            </form>
          </VStack>

          {/* Register Page Link */}
          <Text fontWeight="400" fontSize="18px">
            Don’t have an account? <Link href="/register">Register</Link>
          </Text>

          {/* Back Home Link */}
          <Link
            href="/"
            display="inline-flex"
            fontSize="15px"
            fontWeight="700"
            marginTop="25px"
          >
            <Icon name="bx-left-arrow-alt" /> Back to Home
          </Link>
        </VStack>
      </Box>
    </PageContainer>
  );
};

export default Login;
