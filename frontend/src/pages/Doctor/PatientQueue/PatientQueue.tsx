import React, { useState } from 'react';
import { Box, Card, CardHeader, CardBody, Text, Stack, Flex, Grid, Button, useToast } from '@chakra-ui/react';
import { MdPerson, MdAccessTime, MdGroup } from 'react-icons/md';
import PageContainer from '../../../components/Shared/PageContainer/PageContainer';

// Define the type for a patient
interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  waitTime: string;
  status: string; // "Waiting", "Called"
}

// Doctor information (can be dynamically passed or fetched)
const doctor = {
  name: "Dr. James Boyaju",
  department: "Opthalmology"
};

// Sample patients data (you can dynamically add more patients)
const patients: Patient[] = [
  { id: 1, name: "Falano Kto", age: 45, condition: "Regular Checkup", waitTime: "10 mins", status: "Waiting" },
  { id: 2, name: "Todpe Kto", age: 32, condition: "Follow-up", waitTime: "15 mins", status: "Waiting" },
  { id: 3, name: "Nachiani Manxe", age: 58, condition: "Consultation", waitTime: "20 mins", status: "Waiting" },
  { id: 4, name: "Lyang Garni manxe", age: 29, condition: "Routine Exam", waitTime: "5 mins", status: "Waiting" },
  { id: 5, name: "Mayalu", age: 37, condition: "Blood Test", waitTime: "8 mins", status: "Waiting" },
  { id: 6, name: "Ramailo garam sathi ", age: 41, condition: "Checkup", waitTime: "12 mins", status: "Waiting" },
  { id: 7, name: "James Harris", age: 54, condition: "Consultation", waitTime: "18 mins", status: "Waiting" },
  { id: 8, name: "Olivia Martinez", age: 36, condition: "Follow-up", waitTime: "22 mins", status: "Waiting" },
  { id: 9, name: "Liam Rodriguez", age: 49, condition: "Consultation", waitTime: "25 mins", status: "Waiting" },
  // Add more patients as needed
];

const PatientQueue = () => {
  const [selectedPatientIndex, setSelectedPatientIndex] = useState<number>(0);
  const [patientsData, setPatientsData] = useState<Patient[]>(patients); // Manage patients' status
  const toast = useToast();

  const handlePatientClick = (index: number) => {
    setSelectedPatientIndex(index);
  };

  const handleNextPatient = () => {
    const nextIndex = selectedPatientIndex + 1;

    if (nextIndex < patientsData.length) {
      // Update status of the current patient
      const updatedPatients = [...patientsData];
      updatedPatients[selectedPatientIndex].status = "Called"; // Mark the current patient as "Called"
      setPatientsData(updatedPatients); // Update the patients state

      setSelectedPatientIndex(nextIndex); // Move to the next patient

      toast({
        title: "Next patient notified",
        description: `Now seeing ${patientsData[nextIndex].name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "End of Queue",
        description: "No more patients in the queue.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Dynamic function for rendering patient details
  const renderPatientDetail = (label: string, value: string | number) => (
    <Box>
      <Text fontSize="sm" color="gray.600">{label}</Text>
      <Text fontWeight="medium">{value}</Text>
    </Box>
  );

  return (
    <PageContainer>
      <Box w="full" maxW="6xl" mx="auto" p="4" bg="#f9fafb" marginTop="55px" fontFamily="Jost">
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
              <Box maxHeight="400px" overflowY="auto">
                <Stack spacing="2">
                  {patientsData.map((patient, index) => (
                    <Box
                      key={patient.id}
                      onClick={() => handlePatientClick(index)}
                      p="3"
                      borderRadius="lg"
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{ bg: 'gray.100' }}
                      bg={selectedPatientIndex === index ? 'blue.100' : 'gray.50'}
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
              </Box>
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
                {[
                  { label: 'Total Patients', value: patientsData.length, bg: 'blue.50', color: 'blue.600' },
                  { label: 'Remaining Patients', value: patientsData.filter(p => p.status === 'Waiting').length, bg: 'green.50', color: 'green.600' },
                ].map(({ label, value, bg, color }) => (
                  <Box bg={bg} p="4" borderRadius="lg" key={label}>
                    <Text fontSize="lg" fontWeight="semibold">{label}</Text>
                    <Text fontSize="3xl" fontWeight="bold" color={color}>{value}</Text>
                  </Box>
                ))}
              </Stack>
            </CardBody>
          </Card>
        </Grid>

        {/* Patient Details Row */}
        {patientsData[selectedPatientIndex] && (
          <Card bg="white" marginTop='15px'>
            <CardHeader pb="2">
              <Flex align="center" gap="2">
                <MdPerson size="20" />
                <Text>Patient Information</Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr 1fr' }} gap="4">
                {[
                  { label: 'Name', value: patientsData[selectedPatientIndex].name },
                  { label: 'Age', value: patientsData[selectedPatientIndex].age },
                  { label: 'Condition', value: patientsData[selectedPatientIndex].condition },
                  { label: 'Wait Time', value: patientsData[selectedPatientIndex].waitTime },
                ].map(({ label, value }) => renderPatientDetail(label, value))}
              </Grid>
            </CardBody>
          </Card>
        )}

        {/* Next Button */}
        <Box textAlign="center" marginTop="15px">
          <Button colorScheme="blue" onClick={handleNextPatient}>
            Next
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default PatientQueue;
