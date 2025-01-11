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
import "./Login.scss";
import "boxicons";
import { useBackendAPIContext } from "../../../contexts/BackendAPIContext/BackendAPIContext";
import { useUserContext } from "../../../contexts/UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../components/Shared/PageContainer/PageContainer";
import CustomTextInput from "../../../components/Shared/CustomTextInput/CustomTextInput";

const Login: React.FC = () => {
    const { client } = useBackendAPIContext();
    const { fetchUser } = useUserContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        const userDetails = {
            email,
            password,
        };
        try {
            const res = await client.post(
                "http://localhost:4200/auth/login",
                userDetails
            );
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
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)" // Updated shadow
                    borderRadius="8px" // Optional: Add border radius for a smoother look
                    p={6} // Optional: Add padding inside the container
                    bg="white" // Optional: Ensure background is white
                >
                    {/* Logo */}
                    <Text
                        fontSize="32px"
                        fontWeight="bold"
                        fontFamily="variables.$primary-font"
                        textAlign="center"
                    >
                        <Text as="span" color="green.400">
                            Medi
                        </Text>
                        <Text as="span" color="blue.600">
                            Q
                        </Text>
                    </Text>

                    {/* Login Form */}
                    <VStack className="login-form" spacing={4} align="stretch">
                        <form onSubmit={handleSubmit}>
                            <CustomTextInput
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                                className="custom-input custom-input-email"
                                required
                            />
                            <CustomTextInput
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setPassword(e.target.value)}
                                placeholder="********"
                                className="custom-input custom-input-password"
                                required
                            />
                            <Link
                                href="#"
                                className="forgot-password-link"
                                textAlign="left"
                                fontSize="14px"
                                fontWeight="600"
                                color="variables.$pure-black-60"
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
                    <Text
                        className="register-page-link"
                        fontFamily="variables.$primary-font"
                        fontWeight="400"
                        fontSize="18px"
                    >
                        Don’t have an account?{" "}
                        <Link href="/register">Register</Link>
                    </Text>
                </VStack>
            </Box>
        </PageContainer>
    );
};

export default Login;
