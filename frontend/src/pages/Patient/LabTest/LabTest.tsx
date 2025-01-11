import React from 'react';
import { Box, Text, Container, Grid, GridItem, Flex } from '@chakra-ui/react';
import PageContainer from '../../../components/Shared/PageContainer/PageContainer';
import Icon from '../../../components/Shared/Icon/Icon';
import './LabTest.scss';
import { Link } from 'react-router-dom';

const labTests = [
  { id: 1, name: 'Complete Blood Count', description: 'Comprehensive blood test' },
  { id: 2, name: 'Lipid Panel', description: 'Cholesterol and triglycerides' },
  { id: 3, name: 'Liver Function Test (LFT)', description: 'Assess liver health' },
  { id: 4, name: 'Kidney Function Test (KFT)', description: 'Evaluate kidney performance' },
  { id: 5, name: 'Thyroid Profile', description: 'Thyroid hormone levels' },
  { id: 6, name: 'COVID-19 RTPCR', description: 'Detect SARS-CoV-2' },
  { id: 7, name: 'Vitamin D Test', description: 'Measure Vitamin D levels' },
  { id: 8, name: 'Blood Glucose Test', description: 'Measure blood sugar levels' },
];

const LabTests: React.FC = () => {
  return (
    <PageContainer>
      <Box minH="100vh" pt="80px" className="lab-tests-wrapper">
        <Container maxW="1280px" px={6}>
          <Box mb={6} textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              Explore Lab Tests
            </Text>
            <Text fontSize="lg" color="gray.500">
              Find detailed insights into different lab tests
            </Text>
          </Box>

          <Grid templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6}>
            {labTests.map((test) => (
              <GridItem
                key={test.id}
                bg="white"
                borderRadius="lg"
                boxShadow="md"
                p={6}
                _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                transition="transform 0.3s ease"
              >
                <Link to={`/labtests/${test.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Flex direction="column" align="center" textAlign="center">
                    <Box bg="green.500" p={4} borderRadius="full" mb={4}>
                      <Icon name="stethoscope" />
                    </Box>
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                      {test.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {test.description}
                    </Text>
                  </Flex>
                </Link>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default LabTests;
