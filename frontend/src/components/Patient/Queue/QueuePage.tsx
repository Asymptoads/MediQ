import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  Button,
  VStack,
  Divider,
  HStack,
  Circle,
  Stack,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import PageContainer from '../../Shared/PageContainer/PageContainer';

const QueueVisualization: React.FC = () => {
  const doctorInfo = {
    name: "Dr. Jane Doe",
    specialty: "Cardiology",
    appointmentDate: "2025-01-15",
    appointmentTime: "10:30 AM",
  };

  const queueData = Array.from({ length: 20}, (_, index) => ({
    position: index + 1,
    isCurrentUser: index === 19, // Highlight the current user at position 5
  }));

  return (
    <PageContainer>

    <Box bg="white" w="full" maxW="1280px" mx="auto" p={6} boxShadow="md" borderRadius="md" marginTop='55px' fontFamily='Jost'>
      {/* Card Header */}
      <VStack spacing={2} textAlign="center">
        <Heading size="lg" color="blue.600">Your Queue Status</Heading>
      </VStack>

      <Divider my={4} />

      {/* Doctor Info */}
      <Flex justify="space-between" align="center" pb={4} borderBottom="1px" borderColor="gray.200">
        <HStack spacing={2}>
          <Icon as={LuUser} w={6} h={6} color="blue.500" />
          <Text fontSize="lg" fontWeight="medium" color="gray.800">{doctorInfo.name}</Text>
        </HStack>
        <Text fontSize="sm" color="gray.500">{doctorInfo.specialty}</Text>
      </Flex>

      {/* Appointment Details */}
      <VStack spacing={2} align="start" mt={4}>
        <HStack spacing={2}>
          <Icon as={FaCalendarAlt} w={5} h={5} color="green.500" />
          <Text color="gray.700">{doctorInfo.appointmentDate}</Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={FaClock} w={5} h={5} color="orange.500" />
          <Text color="gray.700">{doctorInfo.appointmentTime}</Text>
        </HStack>
      </VStack>

      {/* Queue Visualization */}
      <VStack spacing={4} mt={6}>
        <Text fontSize="sm" fontWeight="medium" color="gray.700">Queue Position:</Text>


        {/* Desktop View */}
        <Flex
        display={{ base: "none", md: "flex" }}
        justify="center"
        align="center"
        gap={6}
        wrap="wrap"
        >
        {queueData.map(({ position, isCurrentUser }) => (
            <Box
            key={position}
            position="relative"
            maxW="10%" // Maximum 10 items in a row
            textAlign="center"
            >
            <Circle
                size="16"
                bg={isCurrentUser ? "red.100" : "gray.100"}
                borderWidth={isCurrentUser ? 3 : 0}
                borderColor={isCurrentUser ? "red.500" : "transparent"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.1)" }}
            >
                <Icon as={LuUser} w={8} h={8} color={isCurrentUser ? "red.500" : "gray.500"} />
            </Circle>
            {isCurrentUser && (
                <Text
                position="absolute"
                bottom="-6"
                left="50%"
                transform="translateX(-50%)"
                fontSize="xs"
                fontWeight="medium"
                color="red.500"
                >
                You
                </Text>
            )}
            </Box>
        ))}
        </Flex>

        {/* Mobile View */}
        <Flex display={{ base: "flex", md: "none" }} justify="center" align="center" gap={6} wrap="wrap">
        {queueData.map(({ position, isCurrentUser }) => (
            <Box key={position} position="relative">
            <Circle
                size="16"
                bg={isCurrentUser ? "red.100" : "gray.100"}
                borderWidth={isCurrentUser ? 3 : 0}
                borderColor={isCurrentUser ? "red.500" : "transparent"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.1)" }}
            >
                <Icon as={LuUser} w={8} h={8} color={isCurrentUser ? "red.500" : "gray.700"} />
            </Circle>
            {isCurrentUser && (
                <Text
                position="absolute"
                bottom="-6"
                left="50%"
                transform="translateX(-50%)"
                fontSize="xs"
                fontWeight="medium"
                color="red.500"
                >
                You
                </Text>
            )}
            </Box>
        ))}
        </Flex>
      </VStack>

      {/* Actions */}
      <VStack spacing={4} mt={6}>
        <Button colorScheme="red" size="lg" w="full">
          Remove from Queue
        </Button>
        <Button colorScheme="blue" size="lg" w="full">
          Go to Dashboard
        </Button>
      </VStack>
    </Box>
    </PageContainer>
  );
};

export default QueueVisualization;
