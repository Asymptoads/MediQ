import React, { useEffect, useState } from 'react';
import { Box, Text, Container, Spinner, Button } from '@chakra-ui/react';
import PageContainer from '../PageContainer/PageContainer';

// Dictionary to manage dynamic details
const testDetails = {
  "complete-blood-count": {
    title: "Complete Blood Count (CBC)",
    description: "Analyzing your blood to provide a detailed overview of your health.",
    averageDuration: 15, // Average duration in minutes per person
  },
  "lipid-profile": {
    title: "Lipid Profile",
    description: "A comprehensive test to assess cholesterol and lipid levels.",
    averageDuration: 20, // Average duration in minutes per person
  },
  "liver-function-test": {
    title: "Liver Function Test (LFT)",
    description: "Monitoring liver health through key enzyme analysis.",
    averageDuration: 10, // Average duration in minutes per person
  },
  // Add more tests as needed...
};

// Props for dynamic test
interface TestStatusProps {
  testType: keyof typeof testDetails;
}

const TestStatus: React.FC<TestStatusProps> = ({ testType }) => {
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [waitingTime, setWaitingTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const testInfo = testDetails[testType];

  useEffect(() => {
    const fetchQueueStatus = () => {
      setLoading(true);

      // Simulate fetching data
      setTimeout(() => {
        const dummyQueuePosition = Math.floor(Math.random() * 10) + 1; // Random position between 1 and 10
        setQueuePosition(dummyQueuePosition);
        setWaitingTime(dummyQueuePosition * (testInfo?.averageDuration || 15));
        setLoading(false);
      }, 1000); // Simulate 1-second delay
    };

    fetchQueueStatus();
  }, [testInfo]);

  return (
    <PageContainer>
      <Container maxW="1280px" mt={10} marginTop="70px">
        {loading ? (
          <Box textAlign="center">
            <Spinner size="xl" color="green.500" />
            <Text mt={4} color="gray.500">
              Fetching your status...
            </Text>
          </Box>
        ) : (
          <Box textAlign="center" p={6} boxShadow="md" borderRadius="md" bg="white">
            {testInfo && queuePosition !== null && waitingTime !== null ? (
              <>
                <Text fontSize="2xl" fontWeight="bold" color="gray.700" mb={4}>
                  {testInfo.title}
                </Text>
                <Text fontSize="md" color="gray.600" mb={4}>
                  {testInfo.description}
                </Text>
                <Text fontSize="lg" color="gray.600" mb={4}>
                  There are <b>{queuePosition}</b> people ahead of you in the queue.
                </Text>
                <Text fontSize="lg" color="gray.600" mb={4}>
                  Estimated waiting time: <b>{waitingTime} minutes</b>.
                </Text>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  Please arrive 15 minutes earlier than your turn.
                </Text>
              </>
            ) : (
              <Text color="red.500">Unable to fetch your status. Please try again later.</Text>
            )}
            <Button colorScheme="green" onClick={() => window.location.reload()}>
              Refresh Status
            </Button>
          </Box>
        )}
      </Container>
    </PageContainer>
  );
};

export default TestStatus;
