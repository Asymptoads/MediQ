import React, { useEffect, useState } from "react";
import { Box, Text, Container, Grid, GridItem, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useBackendAPIContext } from "../../contexts/BackendAPIContext/BackendAPIContext";
import PageContainer from "../../components/PageContainer/PageContainer";
import "./Home.scss";
import Icon from "../../components/Icon/Icon";

const Home: React.FC = () => {
    const { client } = useBackendAPIContext();
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await client.get("http://localhost:4200/api/user");
                setCurrentUser(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCurrentUser();
    }, [client]);
    return (
        <PageContainer>
            <Box minH="100vh" pt="80px" className="home-wrapper">
                <Container maxW="1280px" px={6}>
                    <Box className="greeting-container" bg="white" width="100%">
                        <Text
                            fontSize="xl"
                            fontWeight="bold"
                            color="gray.700"
                            className="greeting-text"
                        >
                            {currentUser
                                ? `Hello! ${currentUser.name}`
                                : "Loading..."}
                        </Text>
                        <Icon name="bxs-ghost" />
                    </Box>

                    <Box
                        className="search-container"
                        bg="white"
                        width="100%"
                        pt={6}
                        pb={4}
                        borderRadius="md"
                        boxShadow="md"
                    >
                        <input
                            type="text"
                            placeholder="Search for doctor, department, reports..."
                            className="search-input"
                        />
                    </Box>

                    <Box className="assistant-grid">
                        <Grid
                            templateColumns={["1fr", "repeat(2, 1fr)"]}
                            gap={6}
                            className="assistant-grid-container"
                        >
                            {/* Reports Section */}
                            <GridItem
                                as={Link}
                                to="/reports"
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
                                            Reports
                                        </Text>
                                    </Flex>
                                    <Box flex={1}>
                                        <Text color="gray.600">
                                            View and manage your medical reports
                                        </Text>
                                    </Box>
                                </Flex>
                            </GridItem>

                            {/* My Appointment Section */}
                            <GridItem
                                as={Link}
                                to="/appointments"
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
                                            My Appointment
                                        </Text>
                                    </Flex>
                                    <Box flex={1}>
                                        <Text color="gray.600">
                                            View your appointment
                                        </Text>
                                    </Box>
                                </Flex>
                            </GridItem>

                            {/* Doctor Specializations Section */}
                            <GridItem
                                as={Link}
                                to="/specialization"
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
                                            Doctor Specializations
                                        </Text>
                                    </Flex>
                                    <Box flex={1}>
                                        <Text color="gray.600">
                                            Explore and connect with specialists
                                        </Text>
                                    </Box>
                                </Flex>
                            </GridItem>

                            {/* Lab Tests Section */}
                            <GridItem
                                as={Link}
                                to="/lab-tests"
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
                                            Lab Tests
                                        </Text>
                                    </Flex>
                                    <Box flex={1}>
                                        <Text color="gray.600">
                                            Book and manage your lab tests
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

export default Home;
