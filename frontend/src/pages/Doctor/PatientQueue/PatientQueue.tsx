import React, { useState } from 'react';
import { Box, Card, CardHeader, CardBody, Text, Stack, Flex, Grid, Button, useToast } from '@chakra-ui/react';
import { MdPerson, MdAccessTime, MdGroup } from 'react-icons/md';
import PageContainer from '../../../components/Shared/PageContainer/PageContainer';

interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  waitTime: string;
  status: string; // "Waiting", "Called", "Suspended"
}

const doctor = {
  name: "Dr. James Boyaju",
  department: "Opthalmology"
};

const patients: Patient[] = [
  { id: 1, name: "Falano Kto", age: 45, condition: "Regular Checkup", waitTime: "10 mins", status: "Waiting" },
  { id: 2, name: "Todpe Kto", age: 32, condition: "Follow-up", waitTime: "15 mins", status: "Waiting" },
  { id: 3, name: "Nachiani Manxe", age: 58, condition: "Consultation", waitTime: "20 mins", status: "Waiting" },
  { id: 4, name: "Lyang Garni manxe", age: 29, condition: "Routine Exam", waitTime: "5 mins", status: "Waiting" },
  { id: 5, name: "Mayalu", age: 37, condition: "Blood Test", waitTime: "8 mins", status: "Waiting" },
];

const PatientQueue = () => {
  const [patientsData, setPatientsData] = useState<Patient[]>(patients);
  const [operatedPatientId, setOperatedPatientId] = useState<number | null>(null);
  const [selectedPatientIndex, setSelectedPatientIndex] = useState<number>(0);
  const toast = useToast();

  const handlePatientClick = (index: number) => {
    setSelectedPatientIndex(index);
  };

  const handleOperatePatient = () => {
    setOperatedPatientId(patientsData[selectedPatientIndex].id);
    toast({
      title: "Patient Operated",
      description: `${patientsData[selectedPatientIndex].name} is now being operated on.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSuspendPatient = () => {
    if (operatedPatientId === patientsData[selectedPatientIndex].id) {
      return;
    }
    const updatedPatients = [...patientsData];
    const suspendedPatient = updatedPatients.splice(selectedPatientIndex, 1)[0];
    suspendedPatient.status = "Suspended";
    updatedPatients.unshift(suspendedPatient);

    const nextIndex = updatedPatients.findIndex(
      (patient, index) => index !== 0 && patient.status === "Waiting"
    );

    setPatientsData(updatedPatients);
    setSelectedPatientIndex(nextIndex !== -1 ? nextIndex : 0);

    toast({
      title: "Patient Suspended",
      description: `${suspendedPatient.name} has been moved to the top of the queue.`,
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleMarkComplete = () => {
    if (operatedPatientId !== patientsData[selectedPatientIndex].id) {
      return;
    }
    const updatedPatients = [...patientsData];
    updatedPatients.splice(selectedPatientIndex, 1);
    setPatientsData(updatedPatients);
    setOperatedPatientId(null);
    const nextIndex = selectedPatientIndex >= updatedPatients.length ? 0 : selectedPatientIndex;
    setSelectedPatientIndex(nextIndex);
    toast({
      title: "Patient Completed",
      description: `${patientsData[selectedPatientIndex]?.name} has been marked as completed.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const renderPatientDetail = (label: string, value: string | number) => (
    <Box>
      <Text fontSize="sm" color="gray.600">{label}</Text>
      <Text fontWeight="medium">{value}</Text>
    </Box>
  );

  return (
    <PageContainer>
      <Box w="full" maxW="6xl" mx="auto" p="4" bg="#f9fafb" marginTop="55px" fontFamily="Jost">
        <Card bg="white">
          <CardHeader pb="2">
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">{doctor.name}</Text>
            <Text color="gray.600">{doctor.department}</Text>
          </CardHeader>
        </Card>

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="4" marginTop="15px">
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
                      bg={
                        patient.status === "Suspended"
                          ? 'orange.100'
                          : selectedPatientIndex === index
                            ? 'blue.100'
                            : 'gray.50'
                      }
                    >
                      <Flex align="center" gap="3">
                        <Box bg="blue.500" borderRadius="full" p="2">
                          <MdPerson size="16" color="white" />
                        </Box>
                        <Box flex="1">
                          <Text fontWeight="medium">{patient.name}</Text>
                          <Text fontSize="sm" color="gray.600">
                            Wait time: {patient.waitTime} - Status: {patient.status}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </CardBody>
          </Card>

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
                  { label: 'Remaining Patients', value: patientsData.filter(p => p.status === "Waiting").length, bg: 'green.50', color: 'green.600' },
                  { label: 'Suspended Patients', value: patientsData.filter(p => p.status === "Suspended").length, bg: 'orange.50', color: 'orange.600' },
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

        {patientsData[selectedPatientIndex] && (
          <Card bg="white" marginTop="15px">
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
              <Flex justifyContent="space-between" marginTop="4">
                <Button colorScheme="blue" onClick={handleOperatePatient} isDisabled={operatedPatientId !== null && operatedPatientId !== patientsData[selectedPatientIndex].id}>
                  Operate
                </Button>
                <Button colorScheme="orange" onClick={handleSuspendPatient} isDisabled={operatedPatientId === patientsData[selectedPatientIndex].id}>
                  Suspend
                </Button>
                <Button colorScheme="green" onClick={handleMarkComplete} isDisabled={operatedPatientId !== patientsData[selectedPatientIndex].id}>
                  Mark Complete
                </Button>
              </Flex>
            </CardBody>
          </Card>
        )}
      </Box>
    </PageContainer>
  );
};

export default PatientQueue;
