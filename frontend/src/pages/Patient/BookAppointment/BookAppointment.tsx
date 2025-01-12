import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Container,
  Select,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBackendAPIContext } from '../../../contexts/BackendAPIContext/BackendAPIContext';
import PageContainer from '../../../components/Shared/PageContainer/PageContainer';
import './BookaAppointment.scss';

const appointmentOptions = [
  "First-Time Consultations",
  "Consultation",
  "Follow-up Visits",
  "Report Collections",
  "Prescription Refills",
  "Category",
  "Routine Check-up",
  "Emergency",
  "Vaccination",
  "Pre-Surgery Assessment",
  "Post-Surgery Review",
  "Diagnostic Imaging",
  "Specialist Referral",
];

const BookTest: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { specialization, schedule_id } = useParams<{ specialization: string; schedule_id: string }>();
  const { client } = useBackendAPIContext();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await client.get("http://localhost:4200/api/user");
        setCurrentUser(res.data);
        console.log(currentUser);
      } catch (err) {
        console.error('Error fetching user:', err);
        toast({
          title: 'Error',
          description: 'Failed to fetch user information. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchCurrentUser();
  }, [client, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setError(false);
  };

  const handleSubmit = async () => {
    if (!selectedCategory) {
      setError(true);
      toast({
        title: 'Error',
        description: 'Please select an appointment category.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true); // Start loading
      const res = await client.post('create-appointment', {
        userId: currentUser?._id,
        specialization,
        category: selectedCategory,
        schedule_id,
      });
      console.log(res)

      toast({
        title: 'Success',
        description: 'Your appointment has been successfully booked!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/confirmation');
    } catch (error: any) {
      toast({
        title: 'Booking Failed',
        description: error.response?.data?.message || 'Failed to book the appointment. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <PageContainer>
      <Container maxW="600px" mt={10} marginTop="70px">
        <Box textAlign="center" mb={6} className='page-wrapper'>
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">
            Set Appointment
          </Text>
          <Text fontSize="md" color="gray.500" mt={2}>
            Select an appointment category to continue.
          </Text>
        </Box>

        <Box as="form" p={6} boxShadow="md" borderRadius="md" bg="white">
          <FormControl isInvalid={error} mb={4}>
            <FormLabel>Select Appointment Category</FormLabel>
            <Select
              value={selectedCategory}
              onChange={handleInputChange}
              placeholder="Select a category"
            >
              {appointmentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button
            colorScheme="green"
            size="lg"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Book
          </Button>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default BookTest;
