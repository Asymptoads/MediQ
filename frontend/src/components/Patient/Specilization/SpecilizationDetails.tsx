import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Text,
    Container,
    Button,
    VStack,
    useToast,
    SimpleGrid,
} from '@chakra-ui/react';
import PageContainer from '../../Shared/PageContainer/PageContainer';
import { useBackendAPIContext } from '../../../contexts/BackendAPIContext/BackendAPIContext';
import './SpecilizationDetails.scss';

const SpecializationDetails: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    const { client } = useBackendAPIContext();

    const [specialization, setSpecialization] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSpecialization = async () => {
            try {
                const response = await client.get(`/queue/${name}`);
                setSpecialization(response.data);
                setIsLoading(false);
            } catch (err: any) {
                console.error('Error fetching specialization:', err);
                setError(err.message || 'Failed to load specialization');
                toast({
                    title: 'Error',
                    description: 'Failed to load specialization. Please try again later.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                setIsLoading(false);
            }
        };

        fetchSpecialization();
    }, [client, name, toast]);

    if (isLoading) {
        return (
            <PageContainer>
                <Container maxW="container.md" height="100vh" display="flex" alignItems="center" justifyContent="center" bg="#f9fafb">
                    <Text className="page-wrapper" fontSize="xl">
                        Loading...
                    </Text>
                </Container>
            </PageContainer>
        );
    }

    if (error || !specialization) {
        return (
            <PageContainer>
                <Container maxW="container.md" height="100vh" display="flex" alignItems="center" justifyContent="center" bg="#f9fafb">
                    <Text className="page-wrapper" fontSize="xl">
                        {error || 'Specialization not found'}
                    </Text>
                </Container>
            </PageContainer>
        );
    }

    const handleNavigate = (scheduleId: string) => {
        navigate(`/book/${specialization.specialization}/${scheduleId}`);
    };

    return (
        <PageContainer>
            <Container maxW="1280px" py={6} bg="#f9fafb">
                <Box mb={6} textAlign="center" marginTop="50px" className="page-wrapper">
                    <Text fontSize="2xl" fontWeight="bold">
                        {specialization.specialization}
                    </Text>
                    <Text fontSize="lg">
                        {specialization.description}
                    </Text>
                </Box>

                <SimpleGrid columns={[1, null, 2]} spacing={6}>
                    {specialization.weekly_schedule.map((schedule: any) => (
                        <Box
                            key={schedule._id}
                            p={4}
                            bg="white"
                            borderRadius="md"
                            boxShadow="md"
                            cursor="pointer"
                            onClick={() => handleNavigate(schedule._id)}
                            _hover={{ bg: 'gray.100' }}
                            transition="background-color 0.3s"
                        >
                            <Text fontSize="lg" fontWeight="bold">
                                {schedule.day}: {schedule.start_time} - {schedule.end_time}
                            </Text>
                            <VStack align="start" spacing={2} mt={2}>
                                {schedule.doctors.map((doctor: any) => (
                                    <Text fontSize="sm" key={doctor._id}>
                                        {doctor.name} (Contact: {doctor.phone_number})
                                    </Text>
                                ))}
                            </VStack>
                        </Box>
                    ))}
                </SimpleGrid>

                <Box textAlign="center" mt={6}>
                    <Button colorScheme="green" size="lg" onClick={() => navigate(`/appointment/book/${specialization.specialization.toLowerCase()}`)}>
                        Book Appointment
                    </Button>
                </Box>
            </Container>
        </PageContainer>
    );
};

export default SpecializationDetails;
