import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Text,
    Container,
    Button,
    VStack,
    HStack,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Icon,
} from '@chakra-ui/react';
import { FiClock, FiUser, FiCalendar } from 'react-icons/fi';
import PageContainer from '../../Shared/PageContainer/PageContainer';

const QueuePage: React.FC = () => {
    const navigate = useNavigate();

    // Dummy data for testing
    const dummyData = {
        doctor: {
            name: 'Dr. Jane Doe',
            specialization: 'Cardiology',
        },
        date: '2025-01-15',
        time: '10:30 AM',
        patientsAhead: 4,
        avgTimePerPatient: 15,
    };

    const { doctor, date, time, patientsAhead, avgTimePerPatient } = dummyData;

    const waitTime = patientsAhead * avgTimePerPatient;

    // Modal state for confirmation before exiting the queue
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleExitQueue = () => {
        // Logic to remove the user from the queue
        alert('You have been removed from the queue.');
        navigate('/'); // Redirect to dashboard or homepage
    };

    const handleDashboardRedirect = () => {
        navigate('/home'); // Navigate to the dashboard
    };

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
                <Box mb={6} textAlign="center">
                    <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                        Your Queue Status
                    </Text>
                </Box>

                <VStack spacing={5} align="stretch" bg="white" p={6} borderRadius="md" boxShadow="sm">
                    <Flex justify="space-between" align="center">
                        <HStack spacing={4}>
                            <Icon as={FiUser} color="blue.500" boxSize={5} />
                            <Text fontSize="lg" fontWeight="medium">
                                {doctor.name}
                            </Text>
                        </HStack>
                        <Text color="gray.500" fontSize="sm">
                            {doctor.specialization}
                        </Text>
                    </Flex>

                    <HStack spacing={4}>
                        <Icon as={FiCalendar} color="green.500" boxSize={5} />
                        <Text fontSize="md">{date}</Text>
                    </HStack>

                    <HStack spacing={4}>
                        <Icon as={FiClock} color="orange.500" boxSize={5} />
                        <Text fontSize="md">{time}</Text>
                    </HStack>

                    <HStack spacing={4}>
                        <Text fontWeight="bold" fontSize="md">
                            Patients Ahead:
                        </Text>
                        <Text fontSize="md" color="red.500">
                            {patientsAhead}
                        </Text>
                    </HStack>

                    <HStack spacing={4}>
                        <Text fontWeight="bold" fontSize="md">
                            Estimated Wait Time:
                        </Text>
                        <Text fontSize="md" color="blue.500">
                            {waitTime} minutes
                        </Text>
                    </HStack>
                </VStack>

                <VStack mt={6} spacing={4}>
                    <Button colorScheme="red" width="full" onClick={onOpen}>
                        Remove from Queue
                    </Button>
                    <Button colorScheme="blue" width="full" onClick={handleDashboardRedirect}>
                        Go to Dashboard
                    </Button>
                </VStack>

                {/* Modal for confirming removal from queue */}
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Exit Queue</ModalHeader>
                        <ModalBody>
                            <Text>
                                Are you sure you want to exit the queue? You will no longer be able to proceed with the appointment.
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={handleExitQueue}>
                                Yes, Exit Queue
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Container>
        </PageContainer>
    );
};

export default QueuePage;
