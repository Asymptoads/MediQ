import React, { useEffect, useState } from 'react';
import { Box, Text, Container, Grid, GridItem, Flex, useToast } from '@chakra-ui/react';
import PageContainer from '../../../components/Shared/PageContainer/PageContainer';
import Icon from '../../../components/Shared/Icon/Icon';
import { useNavigate } from 'react-router-dom';
import { useBackendAPIContext } from '../../../contexts/BackendAPIContext/BackendAPIContext';

const LabTests: React.FC = () => {
  const [specializations, setSpecializations] = useState<{ specialization: string; description: string }[]>([]); // State to store the specializations
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to handle errors

  const { client } = useBackendAPIContext(); // Get the API client
  const navigate = useNavigate();
  const toast = useToast(); // For showing toast notifications

  // Fetch specializations from the API
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await client.get('/queue/labtest/');
        setSpecializations(response.data || []); // Assuming the API response has a `data` property
        setIsLoading(false);
      } catch (err: any) {
        console.error('Error fetching specializations:', err);
        setError(err.message || 'Failed to load specializations');
        toast({
          title: 'Error',
          description: 'Failed to load specializations. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    };

    fetchSpecializations();
  }, [client, toast]);

  const handleCardClick = (specialization: string) => {
    // Navigate to the appointment page with the specialization name
    navigate(`/specialization/${specialization}`);
  };

  if (isLoading) {
    return (
      <PageContainer>
        <Box minH="100vh" pt="80px" textAlign="center">
          <Text fontSize="lg" color="gray.500">
            Loading specializations...
          </Text>
        </Box>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Box minH="100vh" pt="80px" textAlign="center">
          <Text fontSize="lg" color="red.500">
            {error}
          </Text>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Box minH="100vh" pt="80px" className="doctor-specializations-wrapper">
        <Container maxW="1280px" px={6}>
          <Box mb={6} textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              Department
            </Text>
            <Text fontSize="lg" color="gray.500">
              Find the right specialist for your needs
            </Text>
          </Box>

          <Grid templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6}>
            {specializations.map((specialization, index) => (
              <GridItem
                key={index}
                bg="white"
                borderRadius="lg"
                boxShadow="md"
                p={6}
                _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                transition="transform 0.3s ease"
                onClick={() => handleCardClick(specialization.specialization)} // Updated onClick handler
              >
                <Flex direction="column" align="center" textAlign="center">
                  <Box bg="green.500" p={4} borderRadius="full" mb={4}>
                    <Icon name="stethoscope" />
                  </Box>
                  <Text fontSize="xl" fontWeight="bold" mb={2}>
                    {specialization.specialization}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {specialization.description}
                  </Text>
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default LabTests;
