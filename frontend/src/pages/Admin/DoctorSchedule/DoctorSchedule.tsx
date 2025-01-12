import React, { useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Container,
  Text,
  Input,
} from "@chakra-ui/react";

const DoctorSchedules: React.FC = () => {
  // Dummy data as a dictionary (map)
  const initialData = [
    {
      id: 1,
      doctor: "Dr. John Doe",
      specialization: "Cardiology",
      day: "Monday",
      startTime: "09:00",
      endTime: "12:00",
    },
    {
      id: 2,
      doctor: "Dr. Jane Smith",
      specialization: "Dermatology",
      day: "Wednesday",
      startTime: "10:00",
      endTime: "13:00",
    },
    {
      id: 3,
      doctor: "Dr. Robert Brown",
      specialization: "Eye",
      day: "Friday",
      startTime: "08:00",
      endTime: "11:00",
    },
  ];

  const [schedules, setSchedules] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle Delete Action
  const handleDelete = (id: number) => {
    // Confirmation Dialog (optional)
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      // Filter out the deleted schedule
      const updatedSchedules = schedules.filter((schedule) => schedule.id !== id);
      setSchedules(updatedSchedules);
    }
  };

  // Filter schedules based on search query
  const filteredSchedules = schedules.filter((schedule) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      schedule.doctor.toLowerCase().includes(searchLower) ||
      schedule.specialization.toLowerCase().includes(searchLower) ||
      schedule.day.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Container maxW="1280px" py={6}>
      <Heading mb={6}>Doctor Schedules</Heading>
      <Input
        placeholder="Search by doctor, specialization, or day"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={4}
      />
      {filteredSchedules.length === 0 ? (
        <Text>No schedules found.</Text>
      ) : (
        <Box overflowX="auto">
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Doctor</Th>
                <Th>Specialization</Th>
                <Th>Day</Th>
                <Th>Start Time</Th>
                <Th>End Time</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredSchedules.map((schedule) => (
                <Tr key={schedule.id}>
                  <Td>{schedule.doctor}</Td>
                  <Td>{schedule.specialization}</Td>
                  <Td>{schedule.day}</Td>
                  <Td>{schedule.startTime}</Td>
                  <Td>{schedule.endTime}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(schedule.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Container>
  );
};

export default DoctorSchedules;
