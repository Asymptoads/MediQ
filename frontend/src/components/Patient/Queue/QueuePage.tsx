import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Text,
    Container,
    Button,
    VStack,
    HStack,
    Flex,
    Badge,
    useDisclosure,
    Icon,
    Stack,
    Alert,
    AlertIcon,
    AlertTitle,
} from '@chakra-ui/react';
import { FiClock, FiUser, FiCalendar } from 'react-icons/fi';
import PageContainer from '../../Shared/PageContainer/PageContainer';

const QueuePage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { doctor, date, time } = location.state || {};

    const [patientsAhead, setPatientsAhead] = useState(4); // Example initial value
    const avgTimePerPatient = 15; // Example time per patient in minutes
    const waitTime = patientsAhead * avgTimePerPatient;

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const interval = setInterval(() => {
            setPatientsAhead((prev) => (prev > 0 ? prev - 1 : 0));
        }, 5000); // Simulate patient updates every 5 seconds
        return () => clearInterval(interval);
    }, []);

    if (!doctor || !date || !time) {
        return (
            <Flex align="center" justify="center" minH="100vh">
                <Text fontSize="lg" color="gray.600">
                    No data available for the queue.
                </Text>
            </Flex>
        );
    }

    return (
        <PageContainer>
            <Container
                maxW="lg"
                py={8}
                px={6}
                bg="gray.50"
                borderRadius="lg"
                boxShadow="lg"
                marginTop="75px"
            >
                {/* Page Title */}
                <Box mb={6} textAlign="center">
                    <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                        Your Queue Status
                    </Text>
                </Box>

                {/* Main Queue Information */}
                <VStack spacing={5} align="stretch" bg="white" p={6} borderRadius="md" boxShadow="sm">
                    {/* Doctor Information */}
                    <Flex justify="space-between" align="center">
                        <HStack spacing={4}>
                            <Icon as={FiUser} color="blue.500" boxSize={5} />
                            <Text fontSize="lg" fontWeight="medium" color="blue.600">
                                {doctor.name}
                            </Text>
                        </HStack>
                        <Badge colorScheme="purple" fontSize="sm">
                            {doctor.specialization}
                        </Badge>
                    </Flex>

                    {/* Appointment Details */}
                    <HStack spacing={4}>
                        <Icon as={FiCalendar} color="green.500" boxSize={5} />
                        <Text fontSize="md">
                            <strong>Date:</strong> {date}
                        </Text>
                    </HStack>
                    <HStack spacing={4}>
                        <Icon as={FiClock} color="orange.500" boxSize={5} />
                        <Text fontSize="md">
                            <strong>Time:</strong> {time}
                        </Text>
                    </HStack>

                    {/* Dynamic Queue Details */}
                    <Box mt={4} textAlign="center">
                        <Text fontWeight="bold" fontSize="xl" color="red.500">
                            Patients Ahead: {patientsAhead}
                        </Text>
                        <Text fontWeight="medium" fontSize="lg" color="blue.500">
                            Estimated Wait Time: {waitTime} minutes
                        </Text>
                    </Box>
                </VStack>

                {/* Encouraging Message or Status */}
                <Box mt={4}>
                    {patientsAhead > 2 ? (
                        <Alert status="info" borderRadius="md">
                            <AlertIcon />
                            <AlertTitle>
                                Your turn is coming soon! Please be prepared.
                            </AlertTitle>
                        </Alert>
                    ) : patientsAhead > 0 ? (
                        <Alert status="success" borderRadius="md">
                            <AlertIcon />
                            <AlertTitle>
                                Almost there! Just {patientsAhead} patient(s) ahead.
                            </AlertTitle>
                        </Alert>
                    ) : (
                        <Alert status="success" borderRadius="md">
                            <AlertIcon />
                            <AlertTitle>
                                It's your turn! Please proceed to the doctor's room.
                            </AlertTitle>
                        </Alert>
                    )}
                </Box>

                {/* Action Buttons */}
                <VStack mt={6} spacing={4}>
                    <Button colorScheme="red" width="full" onClick={onOpen}>
                        Remove from Queue
                    </Button>
                    <Button colorScheme="blue" width="full" onClick={() => navigate('/home')}>
                        Go to Dashboard
                    </Button>
                </VStack>

                {/* Modal for Queue Removal Confirmation */}
                {isOpen && (
                    <Box>
                        <Text fontSize="sm" textAlign="center" mt={4} color="gray.600">
                            Are you sure you want to exit the queue? This action cannot be undone.
                        </Text>
                        <HStack justify="center" mt={2}>
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={() => navigate('/')}>
                                Yes, Exit Queue
                            </Button>
                        </HStack>
                    </Box>
                )}
            </Container>
        </PageContainer>
    );
};

export default QueuePage;


