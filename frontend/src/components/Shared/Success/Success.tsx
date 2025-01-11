import React from "react";
import { Box, Text, Button, VStack, Icon, Heading } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom"; // For page navigation

type SuccessComponentProps = {
  title?: string;
  message: string;
  redirectTo?: string; // Optional: Redirect after success
  buttonText?: string; // Optional: Custom button text
};

const SuccessComponent = ({
  title = "Success!",
  message,
  redirectTo = "/",
  buttonText = "Go to Dashboard",
}: SuccessComponentProps) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirectTo); // Redirect to the specified path
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg="gray.50"
      px={4}
    >
      <VStack
        spacing={6}
        align="center"
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        width="100%"
        maxW="400px"
      >
        <Icon
          as={CheckCircleIcon}
          color="green.500"
          boxSize="50px"
          mb={4}
        />
        <Heading as="h2" size="xl" color="green.500">
          {title}
        </Heading>
        <Text fontSize="lg" textAlign="center" color="gray.600">
          {message}
        </Text>
        <Button
          colorScheme="green"
          size="lg"
          onClick={handleRedirect}
          width="full"
        >
          {buttonText}
        </Button>
      </VStack>
    </Box>
  );
};

export default SuccessComponent;
