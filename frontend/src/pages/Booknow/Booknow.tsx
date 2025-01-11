import React, { useState } from 'react';
import {
  Box,
  Container,
  Text,
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from '@chakra-ui/react';
import PageContainer from '../../components/PageContainer/PageContainer';
import './BookingPage.scss';

const BookingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });

  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.age || !formData.email || !formData.phone || !formData.date || !formData.time) {
      toast({
        title: 'Error',
        description: 'Please fill in all the fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Your booking has been confirmed!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setFormData({
      name: '',
      age: '',
      email: '',
      phone: '',
      date: '',
      time: '',
    });
  };

  return (
    <PageContainer>
      <Box minH="100vh" pt="80px" className="booking-page-wrapper">
        <Container maxW="600px" px={6}>
          <Box mb={6} textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              Book Lab Test
            </Text>
            <Text fontSize="lg" color="gray.500">
              Complete the form to confirm your appointment
            </Text>
          </Box>

          {/* Booking Summary */}
          <Box
            mb={6}
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontSize="lg" fontWeight="bold" color="blue.600" mb={2}>
              Lipid Panel
            </Text>
            <Text fontSize="sm" color="gray.600" mb={1}>
              Cholesterol and triglycerides
            </Text>
            <Text fontSize="sm" color="gray.600">
              Estimated Time: 48 hours
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="green.600" mt={4}>
              Price: $30
            </Text>
          </Box>

          {/* Booking Form */}
          <Box
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="md"
          >
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Age</FormLabel>
              <Input
                name="age"
                placeholder="Enter your age"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phone"
                placeholder="Enter your phone number"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Preferred Date</FormLabel>
              <Input
                name="date"
                placeholder="Select date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Preferred Time</FormLabel>
              <Select
                name="time"
                placeholder="Select time"
                value={formData.time}
                onChange={handleChange}
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </Select>
            </FormControl>
            <Button colorScheme="blue" width="100%" onClick={handleSubmit}>
              Confirm Booking
            </Button>
          </Box>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default BookingPage;
