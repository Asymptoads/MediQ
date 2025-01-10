import React, { useState } from 'react';
import {
  Box,
  Text,
  Container,
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import './BookTest.scss';

const testOptions = [
  { value: 'complete-blood-count-cbc', label: 'Complete Blood Count (CBC)' },
  { value: 'lipid-profile', label: 'Lipid Profile' },
  { value: 'liver-function-test-lft', label: 'Liver Function Test (LFT)' },
  // Add more test options as needed...
];

const BookTest: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedTest: '',
    date: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    selectedTest: false,
    date: false,
  });

  const toast = useToast();
  const navigate = useNavigate(); // Use the hook at the top of the component

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false }); // Clear error when user types
  };

  const handleSubmit = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      phone: formData.phone.trim() === '' || !/^\d{10}$/.test(formData.phone),
      selectedTest: formData.selectedTest === '',
      date: formData.date === '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast({
        title: 'Error',
        description: 'Please fill out all fields correctly.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Success logic
    toast({
      title: 'Success',
      description: 'Your test has been successfully booked!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      selectedTest: '',
      date: '',
    });

    // Redirect to confirmation page
    navigate('/confirmation');
  };

  return (
    <PageContainer>

    <Container maxW="600px" mt={10} marginTop="70px">
      <Box textAlign="center" mb={6} className='page-wrapper'>
        <Text fontSize="2xl" fontWeight="bold" color="gray.700">
          Book a Lab Test
        </Text>
        <Text fontSize="md" color="gray.500" mt={2}>
          Fill in the details below to schedule your test.
        </Text>
      </Box>

      <Box as="form" p={6} boxShadow="md" borderRadius="md" bg="white">
        <FormControl isInvalid={errors.name} mb={4}>
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
          {errors.name && <FormErrorMessage>Name is required.</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.email} mb={4}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          {errors.email && <FormErrorMessage>Valid email is required.</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.phone} mb={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your 10-digit phone number"
          />
          {errors.phone && <FormErrorMessage>Valid phone number is required.</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.selectedTest} mb={4}>
          <FormLabel>Select Test</FormLabel>
          <Select
            name="selectedTest"
            value={formData.selectedTest}
            onChange={handleInputChange}
            placeholder="Select a test"
          >
            {testOptions.map((test) => (
              <option key={test.value} value={test.value}>
                {test.label}
              </option>
            ))}
          </Select>
          {errors.selectedTest && <FormErrorMessage>Please select a test.</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.date} mb={4}>
          <FormLabel>Select Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
          {errors.date && <FormErrorMessage>Date is required.</FormErrorMessage>}
        </FormControl>

        <Button colorScheme="green" size="lg" onClick={handleSubmit}>
          Book Test Now
        </Button>
      </Box>
    </Container>
    </PageContainer>
  );
};

export default BookTest;
