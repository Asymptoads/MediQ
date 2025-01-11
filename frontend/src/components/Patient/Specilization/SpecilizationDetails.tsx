import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Text,
    Container,
    Button,
    Divider,
    VStack,
    Flex,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import PageContainer from '../PageContainer/PageContainer';
import './SpecilizationDetails.scss';

const doctors = [
    {
        id: 1,
        name: 'Dr. James Boyaju',
        specialization: 'Ophthalmology',
        contact: '123-456-7890',
        location: 'Ittachhen, Bhaktapur',
        schedule: [
            { day: 'Monday', time: '9:00 AM - 12:00 PM' },
            { day: 'Wednesday', time: '2:00 PM - 5:00 PM' },
        ],
    },
    {
        id: 2,
        name: 'Dr. Bibek Boyaju',
        specialization: 'Ophthalmology',
        contact: '987-654-3210',
        location: 'Ittachhen, Bhaktapur',
        schedule: [
            { day: 'Tuesday', time: '10:00 AM - 1:00 PM' },
            { day: 'Thursday', time: '3:00 PM - 6:00 PM' },
        ],
    },
    {
        id: 3,
        name: 'Dr. Ali Vefa',
        specialization: 'Ophthalmology',
        contact: '456-789-1234',
        location: 'New Road, Kathmandu',
        schedule: [
            { day: 'Friday', time: '9:00 AM - 12:00 PM' },
        ],
    },
];

const specializationDetails = {
    name: 'Ophthalmology',
    description: 'Eye care and vision specialists',
    details: 'Ophthalmologists deal with vision correction, eye surgery, and eye diseases. If you are experiencing any vision issues or need an eye check-up, consult an ophthalmologist for proper diagnosis and treatment.',
};

const SpecializationDetails: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();

    if (name !== specializationDetails.name.toLowerCase()) {
        return (
            <PageContainer>
                <Container maxW="container.md" height="100vh" display="flex" alignItems="center" justifyContent="center" bg="#f9fafb">
                    <Text className="page-wrapper" fontSize="xl">
                        Specialization not found
                    </Text>
                </Container>
            </PageContainer>
        );
    }

    const handleBookAppointment = () => {
        // Navigate to the generalized appointment booking page
        navigate(`/appointment/book/${specializationDetails.name.toLowerCase()}`);
    };

    return (
        <PageContainer>
            <Container maxW="1280px" py={6} bg="#f9fafb">
                <Box mb={6} textAlign="center" marginTop="50px" className="page-wrapper">
                    <Text fontSize="2xl" fontWeight="bold">
                        {specializationDetails.name}
                    </Text>
                    <Text fontSize="lg">
                        {specializationDetails.description}
                    </Text>
                </Box>

                <Box bg="white" p={6} borderRadius="md" boxShadow="md" mb={6} className="page-wrapper">
                    <Divider my={4} />
                    <VStack align="start" spacing={3}>
                        <Text fontSize="lg" fontWeight="bold">
                            Additional Information:
                        </Text>
                        <Text>{specializationDetails.details}</Text>
                    </VStack>
                </Box>

                {/* Doctors List */}
                <Box>
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                        Available Doctors
                    </Text>
                    <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={6}>
                        {doctors.map((doctor) => (
                            <GridItem
                                key={doctor.id}
                                bg="white"
                                borderRadius="lg"
                                boxShadow="md"
                                p={6}
                                _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                                transition="transform 0.3s ease"
                            >
                                <Flex direction="column" align="start">
                                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                                        {doctor.name}
                                    </Text>
                                    <Text fontSize="sm" mb={2}>
                                        {doctor.specialization}
                                    </Text>
                                    <Text fontSize="sm" mb={4}>
                                        Contact: {doctor.contact}
                                    </Text>
                                    <Text fontSize="sm" mb={4}>
                                        Location: {doctor.location}
                                    </Text>
                                    <Box>
                                        <Text fontSize="sm" fontWeight="bold" mb={2}>
                                            Schedule:
                                        </Text>
                                        {doctor.schedule.map((slot, index) => (
                                            <Text fontSize="sm" key={index}>
                                                {slot.day}: {slot.time}
                                            </Text>
                                        ))}
                                    </Box>
                                </Flex>
                            </GridItem>
                        ))}
                    </Grid>
                </Box>

                {/* Single Book Appointment Button */}
                <Box textAlign="center" mt={6}>
                    <Button colorScheme="green" size="lg" onClick={handleBookAppointment}>
                        Book Appointment
                    </Button>
                </Box>
            </Container>
        </PageContainer>
    );
};

export default SpecializationDetails;
