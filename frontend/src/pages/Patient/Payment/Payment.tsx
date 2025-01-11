import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Text,
    Container,
    Button,
    Divider,
    VStack,
} from '@chakra-ui/react';
import PageContainer from '../../components/PageContainer/PageContainer';

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();

    // Hardcoded dummy data for testing
    const doctor = {
        name: 'Dr. James Boyaju',
        specialization: 'Ophthalmology',
    };
    const date = '2025-01-15';
    const time = '10:00 AM';

    const handlePayment = () => {
        // Simulate a successful payment
        alert('Payment successful!');
    
        // Navigate to the queue page with the necessary data
        navigate('/queue', {
            state: {
                doctor: doctor, // Use the doctor details from location.state
                date: date,
                time: time,
            },
        });
    };
    

    return (
        <PageContainer>
            <Container maxW="1280px" py={6} bg="#f9fafb" borderRadius="md" boxShadow="md" marginTop='55px'>
                <Box mb={6} textAlign="center">
                    <Text fontSize="2xl" fontWeight="bold">
                        Payment
                    </Text>
                    <Text fontSize="md" color="gray.600">
                        Confirm your appointment and proceed with payment.
                    </Text>
                </Box>

                {/* Appointment Details */}
                <Box bg="white" p={6} borderRadius="md" boxShadow="sm" mb={6}>
                    <VStack align="start" spacing={3}>
                        <Text fontSize="lg" fontWeight="bold">
                            Appointment Details:
                        </Text>
                        <Text>Doctor: {doctor.name}</Text>
                        <Text>Specialization: {doctor.specialization}</Text>
                        <Text>Date: {date}</Text>
                        <Text>Time: {time}</Text>
                        <Divider my={4} />
                        <Text fontSize="lg" fontWeight="bold">
                            Total Cost: Rs 1500
                        </Text>
                    </VStack>
                </Box>

                {/* Payment Button */}
                <Box textAlign="center">
                    <Button
                        mt={4}
                        colorScheme="green"
                        size="lg"
                        onClick={handlePayment}
                    >
                        Pay Rs 1500
                    </Button>
                </Box>
            </Container>
        </PageContainer>
    );
};

export default PaymentPage;

// const handleBookAppointment = (doctorId: number) => {
//     const selectedDoctor = doctors.find((doc) => doc.id === doctorId);
//     if (selectedDoctor) {
//         navigate('/payment', {
//             state: {
//                 doctor: selectedDoctor,
//                 date: selectedDate,
//                 time: selectedTime,
//             },
//         });
//     }
// };
