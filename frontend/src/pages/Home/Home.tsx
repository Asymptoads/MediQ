import React from 'react';
import { Box, Text, Container, Grid, GridItem, Flex } from '@chakra-ui/react';
import PageContainer from '../../components/PageContainer/PageContainer';
import './Home.scss';
import Icon from '../../components/Icon/Icon';

const Home: React.FC = () => {
  return (
    <PageContainer>
      <Box
        minH="100vh"
        pt="80px"
        className="home-wrapper"
      >
        <Container maxW="1280px" px={6}>
          <Box
            className="greeting-container"
            bg="white"
            width="100%"
          >
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.700"
              className="greeting-text"
            >
              Hello! Saurav Dhoju
            </Text>

            <Icon name="bxs-ghost" />
          </Box>

          <Box
            className="search-container"
            bg="white"
            width="100%"
            pt={6} // Added padding to the top
            pb={4} // Padding at the bottom for spacing
            borderRadius="md" // Rounded corners for the search box
            boxShadow="md" // Slight shadow for better definition
          >
            <input
              type="text"
              placeholder="Search for doctor, department, reports..."
              className="search-input"
            />
          </Box>

          <Box className='assistant-grid'>
          <Grid templateColumns={['1fr', 'repeat(2, 1fr)']} // Single column on mobile, two columns on larger screens
                        gap={6}
                        className='assistant-grid-container'>
            {/* Reports Section */}
            <GridItem
                width='100%'
                h='200'
                bg='white'
                borderRadius="lg"
                boxShadow="md"
                p={6}
            >
                <Flex direction="column" h="100%">
                <Flex align="center" mb={4}>
                    <Box bg="gray.800" p={3} borderRadius="lg" mr={4}>
                    <Icon name="file-text" />
                    </Box>
                    <Text fontSize="xl" fontWeight="bold">Reports</Text>
                </Flex>
                <Box flex={1}>
                    <Text color="gray.600">View and manage your medical reports</Text>
                </Box>
                </Flex>
            </GridItem>

            {/* My Appointment Section */}
            <GridItem
                width='100%'
                h='200'
                bg='white'
                borderRadius="lg"
                boxShadow="md"
                p={6}
            >
                <Flex direction="column" h="100%">
                <Flex align="center" mb={4}>
                    <Box bg="gray.800" p={3} borderRadius="lg" mr={4}>
                    <Icon name="file-text" />
                    </Box>
                    <Text fontSize="xl" fontWeight="bold">My Appointment</Text>
                </Flex>
                <Box flex={1}>
                    <Text color="gray.600">View your appointment</Text>
                </Box>
                </Flex>
            </GridItem>

            {/* Doctor Specializations Section */}
            <GridItem
                width='100%'
                h='200'
                bg='white'
                borderRadius="lg"
                boxShadow="md"
                p={6}
            >
                <Flex direction="column" h="100%">
                <Flex align="center" mb={4}>
                    <Box bg="blue.500" p={3} borderRadius="lg" mr={4}>
                    <Icon name="stethoscope" />
                    </Box>
                    <Text fontSize="xl" fontWeight="bold">Doctor Specializations</Text>
                </Flex>
                <Box flex={1}>
                    <Text color="gray.600">Explore and connect with specialists</Text>
                </Box>
                </Flex>
            </GridItem>

            {/* Lab Tests Section */}
            <GridItem
                width='100%'
                h='200'
                bg='white'
                borderRadius="lg"
                boxShadow="md"
                p={6}
            >
                <Flex direction="column" h="100%">
                <Flex align="center" mb={4}>
                    <Box bg="green.500" p={3} borderRadius="lg" mr={4}>
                    <Icon name="flask" />
                    </Box>
                    <Text fontSize="xl" fontWeight="bold">Lab Tests</Text>
                </Flex>
                <Box flex={1}>
                    <Text color="gray.600">Book and manage your lab tests</Text>
                </Box>
                </Flex>
            </GridItem>
        </Grid>

          </Box>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default Home;
