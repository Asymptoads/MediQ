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
import PageContainer from "../../../components/Shared/PageContainer/PageContainer";

const ViewPatients: React.FC = () => {
  // Dummy data for patients
  const initialPatients = [
    {
      id: 1,
      name: "Alice Johnson",
      age: 30,
      contact: "+1234567890",
      doctor: "Dr. John Doe",
      specialization: "Cardiology",
      appointmentDate: "2025-01-15",
      status: "Scheduled",
    },
    {
      id: 2,
      name: "Bob Smith",
      age: 45,
      contact: "+9876543210",
      doctor: "Dr. Jane Smith",
      specialization: "Dermatology",
      appointmentDate: "2025-01-18",
      status: "Completed",
    },
    {
      id: 3,
      name: "Charlie Brown",
      age: 38,
      contact: "+1122334455",
      doctor: "Dr. Robert Brown",
      specialization: "Eye",
      appointmentDate: "2025-01-20",
      status: "Cancelled",
    },
  ];

  const [patients, setPatients] = useState(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle Delete Action
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      const updatedPatients = patients.filter((patient) => patient.id !== id);
      setPatients(updatedPatients);
    }
  };

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>

    <Container maxW="1280px" py={6} marginTop='55px' fontFamily='Jost'>
      <Heading mb={6} fontFamily='Jost'>View Patients</Heading>
      
      {/* Search Input */}
      <Box mb={4}>
        <Input
          type="text"
          placeholder="Search by name, doctor, or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {filteredPatients.length === 0 ? (
        <Text>No patients found.</Text>
      ) : (
        <Box overflowX="auto">
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Age</Th>
                <Th>Contact</Th>
                <Th>Doctor</Th>
                <Th>Specialization</Th>
                <Th>Appointment Date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredPatients.map((patient) => (
                <Tr key={patient.id}>
                  <Td>{patient.name}</Td>
                  <Td>{patient.age}</Td>
                  <Td>{patient.contact}</Td>
                  <Td>{patient.doctor}</Td>
                  <Td>{patient.specialization}</Td>
                  <Td>{patient.appointmentDate}</Td>
                  <Td>{patient.status}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(patient.id)}
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
    </PageContainer>
  );
};

export default ViewPatients;
