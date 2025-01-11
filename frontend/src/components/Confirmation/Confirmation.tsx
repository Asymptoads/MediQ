import React from 'react';
import { Box, Text, Container, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="600px" mt={10}>
      <Box textAlign="center" p={6} boxShadow="md" borderRadius="md" bg="white">
        <Text fontSize="2xl" fontWeight="bold" color="green.500" mb={4}>
          Booking Confirmed!
        </Text>
        <Text fontSize="md" color="gray.600" mb={6}>
          Thank you for booking your lab test. You will receive a confirmation email shortly.
        </Text>
        <Button colorScheme="green" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Confirmation;
