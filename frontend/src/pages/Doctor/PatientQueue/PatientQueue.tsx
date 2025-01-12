import React, { useState } from 'react';
import { Box, Card, CardHeader, CardBody, Text, Stack, Flex, Grid } from '@chakra-ui/react';
import { MdPerson, MdAccessTime, MdGroup } from 'react-icons/md';
import PageContainer from '../../../components/Shared/PageContainer/PageContainer';

// Define the type for a patient
interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  waitTime: string;
  status: string;
}

const PatientQueue = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Sample data - replace with your actual data
  const doctor = {
    name: "Dr. James Boyaju",
    department: "Opthalmology"
  };
  
  const patients: Patient[] = [
    { id: 1, name: "John Smith", age: 45, condition: "Regular Checkup", waitTime: "10 mins", status: "Waiting" },
    { id: 2, name: "Emma Davis", age: 32, condition: "Follow-up", waitTime: "15 mins", status: "Waiting" },
    { id: 3, name: "Michael Johnson", age: 58, condition: "Consultation", waitTime: "20 mins", status: "Waiting" },
  ];

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  return (
    <PageContainer>

    <Box w="full" maxW="6xl" mx="auto" p="4" bg="#f9fafb" marginTop="55px" fontFamily="Jost" >
      {/* Doctor Information */}
      <Card bg="white">
        <CardHeader pb="2">
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">{doctor.name}</Text>
          <Text color="gray.600">{doctor.department}</Text>
        </CardHeader>
      </Card>

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="4" marginTop='15px'>
        {/* Patient List Column */}
        <Card bg="white">
          <CardHeader pb="2">
            <Flex align="center" gap="2">
              <MdGroup size="20" />
              <Text>Patient Queue</Text>
            </Flex>
          </CardHeader>
          <CardBody>
            <Stack spacing="2">
              {patients.map((patient: Patient) => (
                <Box
                  key={patient.id}
                  onClick={() => handlePatientClick(patient)}
                  p="3"
                  borderRadius="lg"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ bg: 'gray.100' }}
                  bg={selectedPatient?.id === patient.id ? 'blue.100' : 'gray.50'}
                >
                  <Flex align="center" gap="3">
                    <Box bg="blue.500" borderRadius="full" p="2">
                      <MdPerson size="16" color="white" />
                    </Box>
                    <Box flex="1">
                      <Text fontWeight="medium">{patient.name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        Wait time: {patient.waitTime}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>

        {/* Statistics Column */}
        <Card bg="white">
          <CardHeader pb="2">
            <Flex align="center" gap="2">
              <MdAccessTime size="20" />
              <Text>Queue Statistics</Text>
            </Flex>
          </CardHeader>
          <CardBody>
            <Stack spacing="4">
              <Box bg="blue.50" p="4" borderRadius="lg">
                <Text fontSize="lg" fontWeight="semibold">Total Patients</Text>
                <Text fontSize="3xl" fontWeight="bold" color="blue.600">{patients.length}</Text>
              </Box>
              <Box bg="green.50" p="4" borderRadius="lg">
                <Text fontSize="lg" fontWeight="semibold">Remaining Patients</Text>
                <Text fontSize="3xl" fontWeight="bold" color="green.600">
                  {patients.filter(p => p.status === 'Waiting').length}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      {/* Patient Details Row */}
      {selectedPatient && (
        <Card bg="white" marginTop='15px'>
          <CardHeader pb="2">
            <Flex align="center" gap="2">
              <MdPerson size="20" />
              <Text>Patient Information</Text>
            </Flex>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr 1fr' }} gap="4">
              <Box>
                <Text fontSize="sm" color="gray.600">Name</Text>
                <Text fontWeight="medium">{selectedPatient.name}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600">Age</Text>
                <Text fontWeight="medium">{selectedPatient.age}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600">Condition</Text>
                <Text fontWeight="medium">{selectedPatient.condition}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600">Wait Time</Text>
                <Text fontWeight="medium">{selectedPatient.waitTime}</Text>
              </Box>
            </Grid>
          </CardBody>
        </Card>
      )}
    </Box>
    </PageContainer>
  );
};

export default PatientQueue;
