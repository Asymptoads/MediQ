import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Avatar,
    Flex,
    Text,
    Button,
    Grid,
    Badge,
    useColorModeValue,
    VStack,
    Spinner,
    Center,
} from "@chakra-ui/react";
import { useBackendAPIContext } from "../../../contexts/BackendAPIContext/BackendAPIContext";
import PageContainer from "../../../components/Shared/PageContainer/PageContainer";

const UserProfileView: React.FC = () => {
    const navigate = useNavigate();
    const { client } = useBackendAPIContext();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [currentUserAppointments, setCurrentUserAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await client.get("http://localhost:4200/api/user");
                console.log("Current User Data:", res.data);
                setCurrentUser(res.data);
            } catch (err) {
                setError("Error fetching user data");
                console.error("Error fetching user:", err);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserAppointments = async (userId: string) => {
            try {
                const res = await client.get(`http://localhost:4200/api/user/appointments/not_completed/${userId}`);
                setCurrentUserAppointments(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                setError("Error fetching appointments");
                console.error("Error fetching appointments:", err);
            }
        };

        if (currentUser) {
            fetchUserAppointments(currentUser._id);
        } else {
            fetchCurrentUser();
        }
    }, [client, currentUser]);
      const handleAppointmentClick = (appointmentId: string) => {
          navigate(`/queue/${appointmentId}`);
      };
    const handleLogout = useCallback(async () => {
        try {
            const response = await fetch("/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.ok) {
                localStorage.removeItem("authToken");
                sessionStorage.removeItem("authToken");
                navigate("/login");
            } else {
                console.error("Logout failed:", response.statusText);
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    }, [navigate]);

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    if (loading) {
        return (
            <Center height="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center height="100vh">
                <Text color="red.500">{error}</Text>
            </Center>
        );
    }

    if (!currentUser) {
        return (
            <Center height="100vh">
                <Text>Unable to load user data.</Text>
            </Center>
        );
    }

    const age = calculateAge(currentUser.date_of_birth);

    return (
        <PageContainer>
            <Box maxW="4xl" mx="auto" p={6} marginTop="55px" fontFamily="Jost">
                <Box bg={useColorModeValue("white", "gray.800")} rounded="lg" shadow="md" p={6} mb={6}>
                    <Flex justify="space-between" align="start" mb={6}>
                        <Flex align="center" gap={4}>
                            <Avatar src={currentUser.avatar} size="lg" alt={currentUser.name} />
                            <Box>
                                <Text fontSize="xl" fontWeight="semibold">
                                    {currentUser.name}
                                </Text>
                                <Text color="gray.500">
                                    {currentUser.email}
                                </Text>
                            </Box>
                        </Flex>
                        <Button onClick={handleLogout} colorScheme="red" variant="outline" size="sm">
                            Logout
                        </Button>
                    </Flex>

                    <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={8} pb={4} borderBottom="1px" borderColor="gray.200">
                        <Box>
                            <Text fontSize="sm" color="gray.500">
                                Member Type
                            </Text>
                            <Text fontWeight="medium" textTransform="capitalize">
                                {currentUser.memberType}
                            </Text>
                        </Box>
                        <Box>
                            <Text fontSize="sm" color="gray.500">
                                Age
                            </Text>
                            <Text fontWeight="medium">{age}</Text>
                        </Box>
                        <Box>
                            <Text fontSize="sm" color="gray.500">
                                Gender
                            </Text>
                            <Text fontWeight="medium" textTransform="capitalize">
                                {currentUser.sex}
                            </Text>
                        </Box>
                    </Grid>

                    <Box>
                        <Text fontSize="lg" fontWeight="semibold" mb={4}>
                            My Appointments
                        </Text>
                        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
                            {currentUserAppointments.length > 0 ? (
                                currentUserAppointments.map((appointment: any) => (
                                    <Box
                                        key={appointment._id}
                                        onClick={() => handleAppointmentClick(appointment._id)}
                                        p={4}
                                        border="1px"
                                        borderColor="gray.200"
                                        rounded="lg"
                                        shadow="md"
                                        height="180px"
                                        bg={useColorModeValue("white", "gray.700")}
                                        _hover={{ shadow: "lg", bg: useColorModeValue("gray.50", "gray.600") }}
                                        transition="all 0.2s"
                                    >
                                        <Flex justify="space-between" align="start" mb={3}>
                                            <Box>
                                                <Text fontWeight="medium">
                                                    {appointment.category}
                                                </Text>
                                                <Text fontSize="sm" color="gray.500">
                                                    {appointment.schedule.day}
                                                </Text>
                                            </Box>
                                            <Badge
                                                px={3}
                                                py={1}
                                                colorScheme="green"
                                                rounded="full"
                                            >
                                                Not Completed
                                            </Badge>
                                        </Flex>
                                        <VStack align="start" spacing={1} fontSize="sm" color="gray.600">
                                            <Text>Start Time: {appointment.schedule.start_time}</Text>
                                            <Text>End Time: {appointment.schedule.end_time}</Text>
                                            <Text>Registered At: {new Date(appointment.registered_at).toLocaleDateString()}</Text>
                                        </VStack>
                                    </Box>
                                ))
                            ) : (
                                <Text>No upcoming appointments</Text>
                            )}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </PageContainer>
    );
};

export default UserProfileView;
