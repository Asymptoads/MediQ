import React from 'react';
import {
  Box,
  Text,
  Container,
  Grid,
  GridItem,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';
import PageContainer from '../../components/PageContainer/PageContainer';
import './Specilization.scss';

const Specializations: React.FC = () => {
  const specializations = [
    { id: 1, name: 'Cardiology', description: 'Heart-related issues' },
    { id: 2, name: 'Dermatology', description: 'Skin and hair care' },
    { id: 3, name: 'Neurology', description: 'Nervous system specialists' },
    { id: 4, name: 'Orthopedics', description: 'Bone and joint care' },
    { id: 5, name: 'Pediatrics', description: 'Child health care' },
  ];

  return (
    <PageContainer>
      <Box minH="100vh" pt="80px" className="specializations-wrapper">
        <Container maxW="1280px" px={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Explore Doctor Specializations
          </Text>

          {/* Search Section */}
          <Flex mb={8}>
            <Input
              placeholder="Search for a specialization..."
              variant="outline"
              size="md"
              borderRadius="lg"
              mr={4}
            />
            <Button colorScheme="blue">Search</Button>
          </Flex>

          {/* Specializations Grid */}
          <Grid
            templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
            gap={6}
          >
            {specializations.map((specialization) => (
              <GridItem
                key={specialization.id}
                bg="white"
                borderRadius="lg"
                boxShadow="md"
                p={6}
                _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                transition="all 0.3s"
                onClick={() => console.log(`Clicked: ${specialization.name}`)}
                cursor="pointer"
              >
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  {specialization.name}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {specialization.description}
                </Text>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default Specializations;
