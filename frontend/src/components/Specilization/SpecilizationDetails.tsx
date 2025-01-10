import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import {
    Box,
    Text,
    Container,
    Button,
    Divider,
    VStack,
    Flex,
    Grid,
    GridItem
} from '@chakra-ui/react';
import PageContainer from '../PageContainer/PageContainer';
import './SpecilizationDetails.scss';

const doctors = [
    { id: 1, name: 'Dr. James Boyaju', specialization: 'Ophthalmology', contact: '123-456-7890', location: 'Ittachhen, Bhaktapur' },
    { id: 2, name: 'Dr. Bibek Boyaju', specialization: 'Ophthalmology', contact: '987-654-3210', location: 'Ittachhen, Bhaktapur' },
    { id: 3, name: 'Dr. Ali Vefa', specialization: 'Ophthalmology', contact: '456-789-1234', location: 'New Road, Kathmandu' },
];

const specializationDetails = {
    name: 'Ophthalmology',
    description: 'Eye care and vision specialists',
    details: 'Ophthalmologists deal with vision correction, eye surgery, and eye diseases. If you are experiencing any vision issues or need an eye check-up, consult an ophthalmologist for proper diagnosis and treatment.'
};

const SpecializationDetails: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate(); // Use useNavigate to navigate

    if (name !== specializationDetails.name.toLowerCase()) {
        return (
            <PageContainer>
                <Container maxW="container.md" height="100vh" display="flex" alignItems="center" justifyContent="center" bg='#f9fafb'>
                    <Text className="page-wrapper" fontSize="xl" >
                        Specialization not found
                    </Text>
                </Container>
            </PageContainer>
        );
    }

    const handleBookAppointment = (doctorId: number) => {
        // Navigate to the appointment booking page for the selected doctor
        navigate(`/appointment/book/${doctorId}`);
    };

    return (
        <PageContainer>
            <Container maxW="1000px" py={6} bg='#f9fafb'>
                <Box mb={6} textAlign="center" marginTop="50px" className="page-wrapper">
                    <Text fontSize="2xl" fontWeight="bold" >
                        {specializationDetails.name}
                    </Text>
                    <Text fontSize="lg" >
                        {specializationDetails.description}
                    </Text>
                </Box>

                <Box bg="white" p={6} borderRadius="md" boxShadow="md" mb={6} className="page-wrapper">
                    <Divider my={4} />
                    <VStack align="start" spacing={3}>
                        <Text fontSize="lg" fontWeight="bold">
                            Additional Information:
                        </Text>
                        <Text >{specializationDetails.details}</Text>
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
                                    <Text fontSize="sm"  mb={4}>
                                        Contact: {doctor.contact}
                                    </Text>
                                    <Text fontSize="sm"  mb={4}>
                                        Location: {doctor.location}
                                    </Text>
                                    <Button
                                        colorScheme="green"
                                        size="sm"
                                        onClick={() => handleBookAppointment(doctor.id)} // Use navigate here
                                    >
                                        Book Appointment
                                    </Button>
                                </Flex>
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </PageContainer>
    );
};

export default SpecializationDetails;
