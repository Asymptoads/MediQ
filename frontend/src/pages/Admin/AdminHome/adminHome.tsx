import { Box, Text, Container, Grid, GridItem, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PageContainer from "../../../components/Shared/PageContainer/PageContainer";
import Icon from "../../../components/Shared/Icon/Icon";

const Admin: React.FC = () => {
    return (
        <PageContainer>
            <Box minH="100vh" pt="80px" className="home-wrapper">
                <Container maxW="1280px" px={6}>

                    <Box className="assistant-grid">
                        <Grid
                            templateColumns={["1fr", "repeat(2, 1fr)"]}
                            gap={6}
                            className="assistant-grid-container"
                        >
                            <GridItem
                                as={Link}
                                to="/admin/doctor-registration"
                                width="100%"
                                h="200"
                                bg="white"
                                borderRadius="lg"
                                boxShadow="md"
                                p={6}
                                _hover={{
                                    textDecoration: "none",
                                    boxShadow: "lg",
                                }}
                            >
                                <Flex direction="column" h="100%">
                                    <Flex align="center" mb={4}>
                                        <Box
                                            bg="gray.800"
                                            p={3}
                                            borderRadius="lg"
                                            mr={4}
                                        >
                                            <Icon name="file-text" />
                                        </Box>
                                        <Text fontSize="xl" fontWeight="bold">
                                            Doctor Registration
                                        </Text>
                                    </Flex>
                                    <Box flex={1}>
                                        <Text color="gray.600">
                                            Add new doctors to the system
                                        </Text>
                                    </Box>
                                </Flex>
                            </GridItem>
                            <GridItem
                                as={Link}
                                to="/admin/queue-creation"
                                width="100%"
                                h="200"
                                bg="white"
                                borderRadius="lg"
                                boxShadow="md"
                                p={6}
                                _hover={{
                                    textDecoration: "none",
                                    boxShadow: "lg",
                                }}
                            >
                                <Flex direction="column" h="100%">
                                    <Flex align="center" mb={4}>
                                        <Box
                                            bg="gray.800"
                                            p={3}
                                            borderRadius="lg"
                                            mr={4}
                                        >
                                            <Icon name="file-text" />
                                        </Box>
                                        <Text fontSize="xl" fontWeight="bold">
                                            Queue Creation 
                                        </Text>
                                    </Flex>
                                    <Box flex={1}>
                                        <Text color="gray.600">
                                            Manage doctor queues efficiently
                                        </Text>
                                    </Box>
                                </Flex>
                            </GridItem>

                            <GridItem
                                as={Link}
                                to="/admin/view-patients"
                                width="100%"
                                h="200"
                                bg="white"
                                borderRadius="lg"
                                boxShadow="md"
                                p={6}
                                _hover={{
                                    textDecoration: "none",
                                    boxShadow: "lg",
                                }}
                            >
                                <Flex direction="column" h="100%">
                                    <Flex align="center" mb={4}>
                                        <Box
                                            bg="blue.500"
                                            p={3}
                                            borderRadius="lg"
                                            mr={4}
                                        >
                                            <Icon name="stethoscope" />
                                        </Box>
                                        <Text fontSize="xl" fontWeight="bold">
                                            View Patients
                                        </Text>
                                    </Flex>
                                    <Box flex={1}>
                                        <Text color="gray.600">
                                            View patients records
                                        </Text>
                                    </Box>
                                </Flex>
                            </GridItem>

                            <GridItem
                                as={Link}
                                to="/admin/doctor-schedules"
                                width="100%"
                                h="200"
                                bg="white"
                                borderRadius="lg"
                                boxShadow="md"
                                p={6}
                                _hover={{
                                    textDecoration: "none",
                                    boxShadow: "lg",
                                }}
                            >
                                <Flex direction="column" h="100%">
                                    <Flex align="center" mb={4}>
                                        <Box
                                            bg="green.500"
                                            p={3}
                                            borderRadius="lg"
                                            mr={4}
                                        >
                                            <Icon name="flask" />
                                        </Box>
                                        <Text fontSize="xl" fontWeight="bold">
                                            View Doctor Schedules
                                        </Text>
                                    </Flex>
                                    <Box flex={1}>
                                        <Text color="gray.600">
                                            View the schedules of the doctor 
                                        </Text>
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

export default Admin;

