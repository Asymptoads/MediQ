import React from 'react';
import { Box, Text, Container, Grid, GridItem, Flex } from '@chakra-ui/react';
import PageContainer from '../../components/PageContainer/PageContainer';
import Icon from '../../components/Icon/Icon';
import './Specilization.scss';

const specializations = [
  { id: 1, name: 'Cardiology', description: 'Heart-related issues and conditions' },
  { id: 2, name: 'Dermatology', description: 'Skin, hair, and nail care' },
  { id: 3, name: 'Neurology', description: 'Nervous system specialists' },
  { id: 4, name: 'Orthopedics', description: 'Bone, joint, and muscle care' },
  { id: 5, name: 'Pediatrics', description: 'Health care for children and infants' },
  { id: 6, name: 'Gynecology', description: 'Women’s reproductive health' },
  { id: 7, name: 'Ophthalmology', description: 'Eye care and vision specialists' },
  { id: 8, name: 'Oncology', description: 'Cancer diagnosis and treatment' },
  { id: 9, name: 'Endocrinology', description: 'Hormonal and gland disorders' },
  { id: 10, name: 'Gastroenterology', description: 'Digestive system and stomach care' },
];

const DoctorSpecializations: React.FC = () => {
  return (
    <PageContainer>
      <Box minH="100vh" pt="80px" className="doctor-specializations-wrapper">
        <Container maxW="1280px" px={6}>
          <Box mb={6} textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              Explore Doctor Specializations
            </Text>
            <Text fontSize="lg" color="gray.500">
              Find the right specialist for your needs
            </Text>
          </Box>

          <Grid templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6}>
            {specializations.map((specialization) => (
              <GridItem
                key={specialization.id}
                bg="white"
                borderRadius="lg"
                boxShadow="md"
                p={6}
                _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                transition="transform 0.3s ease"
              >
                <Flex direction="column" align="center" textAlign="center">
                  <Box bg="green.500" p={4} borderRadius="full" mb={4}>
                    <Icon name="stethoscope" />
                  </Box>
                  <Text fontSize="xl" fontWeight="bold" mb={2}>
                    {specialization.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {specialization.description}
                  </Text>
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default DoctorSpecializations;
