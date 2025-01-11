import React from "react";
import { Box, Text, Container, Grid, GridItem, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PageContainer from "../../../components/Shared/PageContainer/PageContainer";
import Icon from "../../../components/Shared/Icon/Icon";
import "./adminHome.scss";
const Admin: React.FC = () => {
    const sections = [
        {
            title: "Doctor Registration",
            description: "Add new doctors to the system",
            icon: "user-plus",
            bgColor: "blue.500",
            link: "/admin/doctor-registration",
        },
        {
            title: "Queue Creation",
            description: "Manage patient queues efficiently",
            icon: "clipboard-list",
            bgColor: "orange.500",
            link: "/admin/queue-creation",
        },
        {
            title: "View Patients",
            description: "Access and manage patient information",
            icon: "users",
            bgColor: "green.500",
            link: "/admin/view-patients",
        },
        {
            title: "Remove Doctor",
            description: "Remove doctors from the system",
            icon: "user-times",
            bgColor: "red.500",
            link: "/admin/remove-doctor",
        },
    ];

    return (
        <PageContainer>
            <Box minH="100vh" pt="80px" className="admin-wrapper">
                <Container maxW="1280px" px={6}>
                    <Box
                        className="admin-header"
                        bg="white"
                        width="100%"
                        pt={6}
                        pb={4}
                        borderRadius="md"
                        boxShadow="md"
                    >
                        <Text fontSize="2xl" fontWeight="bold" color="gray.700">
                            Admin Dashboard
                        </Text>
                    </Box>

                    <Box className="admin-grid">
                        <Grid
                            // templateColumns={"repeat(auto-fit, minmax(280px, 1fr))"}

                            templateColumns={["1fr", "repeat(2, 1fr)"]}
                            gap={6}
                            className="admin-grid-container"
                        >
                            {sections.map((section, index) => (
                                <GridItem
                                    key={index}
                                    as={Link}
                                    to={section.link}
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
                                                bg={section.bgColor}
                                                p={3}
                                                borderRadius="lg"
                                                mr={4}
                                            >
                                                <Icon name={section.icon} />
                                            </Box>
                                            <Text fontSize="xl" fontWeight="bold">
                                                {section.title}
                                            </Text>
                                        </Flex>
                                        <Box flex={1}>
                                            <Text color="gray.600">
                                                {section.description}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </GridItem>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </PageContainer>
    );
};

export default Admin;
