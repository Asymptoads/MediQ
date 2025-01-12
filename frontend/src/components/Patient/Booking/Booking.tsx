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

interface BookingOption {
  value: string;
  label: string;
}

interface BookingFormProps {
  title: string;
  description: string;
  options: BookingOption[];
  redirectPath: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ title, description, options, redirectPath }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedOption: '',
    date: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    selectedOption: false,
    date: false,
  });

  const toast = useToast();
  const navigate = useNavigate();

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
      selectedOption: formData.selectedOption === '',
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
      description: 'Your appointment has been successfully booked!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      selectedOption: '',
      date: '',
    });

    // Redirect to confirmation page
    navigate(redirectPath);
  };

  return (
    <PageContainer>
      <Container maxW="600px" mt={10} marginTop="70px">
        <Box textAlign="center" mb={6} className="page-wrapper">
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">
            {title}
          </Text>
          <Text fontSize="md" color="gray.500" mt={2}>
            {description}
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

          <FormControl isInvalid={errors.selectedOption} mb={4}>
            <FormLabel>Select Option</FormLabel>
            <Select
              name="selectedOption"
              value={formData.selectedOption}
              onChange={handleInputChange}
              placeholder="Select an option"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors.selectedOption && <FormErrorMessage>Please select an option.</FormErrorMessage>}
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
            Book Now
          </Button>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default BookingForm;
