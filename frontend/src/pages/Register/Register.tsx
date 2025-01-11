import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
    Box,
    Heading,
    Text,
    Link as ChakraLink,
    Button,
    Image,
    VStack,
} from "@chakra-ui/react";

import { useBackendAPIContext } from "../../contexts/BackendAPIContext/BackendAPIContext";

import Icon from "../../components/Icon/Icon";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import FormBorder from "../../components/FormBorder/FormBorder";
import PageContainer from "../../components/PageContainer/PageContainer";

import "./Register.scss";

const Register = () => {
    const navigate = useNavigate();
    const { client } = useBackendAPIContext();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        setIsLoading(true);
        const userDetails = {
            name,
            email,
            password,
            date_of_birth: dateOfBirth,
            phone_number: phoneNumber,
            username,
        };
        client
            .post("/auth/register", userDetails)
            .then((res) => {
                console.log(res.data);
                setIsLoading(false);
                navigate("/login");
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                    <Text className="register-info-text">
                        Create your new account!
                    </Text>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <CustomTextInput
                            label="Name"
                            type="name"
                            value={name}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setName(e.target.value);
                            }}
                            placeholder="Name"
                            className="custom-input custom-input-username"
                        />
                        <CustomTextInput
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setEmail(e.target.value);
                            }}
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
                            ) => {
                                setPassword(e.target.value);
                            }}
                            className="custom-input custom-input-password"
                            placeholder="********"
                            required
                        />
                        <CustomTextInput
                            label="Date of Birth"
                            type="date"
                            value={dateOfBirth}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setDateOfBirth(e.target.value)}
                            className="custom-input custom-input-password"
                            required
                        />

                        <CustomTextInput
                            label="Phone Number"
                            type="tel"
                            value={phoneNumber}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPhoneNumber(e.target.value)}
                            className="custom-input custom-input-password"
                            placeholder="9800000000"
                            required
                        />
                        {/* <CustomTextInput
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setUsername(e.target.value);
                            }}
                            placeholder="Username"
                            className="custom-input custom-input-username"
                            required
                        /> */}
                        <ChakraLink
                            as={ReactRouterLink}
                            to="/"
                            className="forgot-password-link"
                        >
                            Forgot Password?
                        </ChakraLink>
                        <Button
                            type="submit"
                            className="form-submit-btn"
                            colorScheme="blue"
                            // color={"#d9d9d9"}
                            borderRadius={"8px"}
                            marginTop={"15px"}
                            height={"50px"}
                            fontSize={"22px"}
                            fontWeight={600}
                            isLoading={isLoading}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <FormBorder />
                    <Text className="or-continue-with">Or continue with</Text>
                    <Button className="google-sign-in-btn">
                        <Text as={"span"} className="google-logo-container">
                            <Image
                                src="/googlelogo.png"
                                className="google-logo"
                            />
                        </Text>
                        Sign in with Google
                    </Button>
                    <ChakraLink
                        as={ReactRouterLink}
                        to={"/login"}
                        className="login-page-link"
                        textAlign={"center"}
                        marginTop={"28px"}
                    >
                        Have an account?{" "}
                        <Text as={"span"} fontWeight={700}>
                            Sign In!
                        </Text>
                    </ChakraLink>
                    <ChakraLink
                        as={ReactRouterLink}
                        to={"/"}
                        className="back-home-link"
                    >
                        <Icon name="bx-arrow-back" className="arrow" />
                        Back to Home
                    </ChakraLink>
                </VStack>
            </Box>
        </PageContainer>
    );
};

export default Register;
