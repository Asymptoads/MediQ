import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { useBackendAPIContext } from "../../../contexts/BackendAPIContext/BackendAPIContext";
import PageContainer from "../../../components/Shared/PageContainer/PageContainer";

const UserProfileView: React.FC = () => {
    const navigate = useNavigate();
    const { client } = useBackendAPIContext();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [currentUserAppointments, setCurrentUserAppointments] = useState<
        any[]
    >([]);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await client.get("http://localhost:4200/api/user");
                console.log("Current User Data:", res.data);
                setCurrentUser(res.data);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchCurrentUser();
    }, [client]);

    useEffect(() => {
        if (!currentUser?.user_id) return;

        const fetchUserAppointments = async () => {
            try {
                const res = await client.get(
                    `http://localhost:4200/api/user/appointments/not_completed/${currentUser.user_id}`
                );
                console.log("Appointments Data:", res.data);
                setCurrentUserAppointments(
                    Array.isArray(res.data) ? res.data : []
                );
            } catch (err) {
                console.error("Error fetching appointments:", err);
            }
        };

        fetchUserAppointments();
    }, [client, currentUser]);
    // const appointments = [
    //     {
    //         id: 1,
    //         date: "2025-01-15",
    //         time: "10:00 AM",
    //         doctorName: "Dr. Sarah Smith",
    //         department: "Cardiology",
    //         status: "Scheduled", // Replaces 'upcoming'
    //     },
    //     {
    //         id: 2,
    //         date: "2025-01-20",
    //         time: "2:30 PM",
    //         doctorName: "Dr. Michael Johnson",
    //         department: "Orthopedics",
    //         status: "Scheduled", // Replaces 'upcoming'
    //     },
    //     {
    //         id: 3,
    //         date: "2024-12-28",
    //         time: "11:15 AM",
    //         doctorName: "Dr. Emily Brown",
    //         department: "Neurology",
    //         status: "Attended", // Replaces 'completed'
    //     },
    //     {
    //         id: 4,
    //         date: "2024-12-28",
    //         time: "11:15 AM",
    //         doctorName: "Dr. Emily Brown",
    //         department: "Neurology",
    //         status: "Attended", // Replaces 'completed'
    //     },
    // ];
    if (!currentUser) {
        return <div>Loading...</div>;
    }

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:4200/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
    };

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };
    const age = calculateAge(currentUser.date_of_birth);

    return (
        <PageContainer>
            <Box maxW="4xl" mx="auto" p={6} marginTop="55px" fontFamily="Jost">
                <Box
                    bg={useColorModeValue("white", "gray.800")}
                    rounded="lg"
                    shadow="md"
                    p={6}
                    mb={6}
                >
                    <Flex justify="space-between" align="start" mb={6}>
                        <Flex align="center" gap={4}>
                            {/* <Avatar src={currentUser.avatar} size="lg" /> */}
                            <Box>
                                <Text fontSize="xl" fontWeight="semibold">
                                    {currentUser.name}
                                </Text>
                                <Text color="gray.500">
                                    {currentUser.email}
                                </Text>
                            </Box>
                        </Flex>
                        <Button
                            onClick={handleLogout}
                            colorScheme="red"
                            variant="outline"
                            size="sm"
                        >
                            Logout
                        </Button>
                    </Flex>

                    <Grid
                        templateColumns="repeat(3, 1fr)"
                        gap={4}
                        mb={8}
                        pb={4}
                        borderBottom="1px"
                        borderColor="gray.200"
                    >
                        <Box>
                            <Text fontSize="sm" color="gray.500">
                                Member Type
                            </Text>
                            <Text
                                fontWeight="medium"
                                textTransform="capitalize"
                            >
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
                            <Text
                                fontWeight="medium"
                                textTransform="capitalize"
                            >
                                {currentUser.sex}
                            </Text>
                        </Box>
                    </Grid>

                    <Box>
                        <Text fontSize="lg" fontWeight="semibold" mb={4}>
                            My Appointments
                        </Text>
                        <Grid
                            templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                            gap={6}
                        >
                            {currentUserAppointments &&
                            currentUserAppointments.length > 0 ? (
                                currentUserAppointments.map(
                                    (appointment: any) => (
                                        <Box
                                            key={appointment.id}
                                            p={4}
                                            border="1px"
                                            borderColor="gray.200"
                                            rounded="lg"
                                            shadow="md"
                                            height="180px"
                                            bg={useColorModeValue(
                                                "white",
                                                "gray.700"
                                            )}
                                            _hover={{
                                                shadow: "lg",
                                                bg: useColorModeValue(
                                                    "gray.50",
                                                    "gray.600"
                                                ),
                                            }}
                                            transition="all 0.2s"
                                        >
                                            <Flex
                                                justify="space-between"
                                                align="start"
                                                mb={3}
                                            >
                                                <Box>
                                                    <Text fontWeight="medium">
                                                        {appointment.doctorName}
                                                    </Text>
                                                    <Text
                                                        fontSize="sm"
                                                        color="gray.500"
                                                    >
                                                        {appointment.department}
                                                    </Text>
                                                </Box>
                                                <Badge
                                                    px={3}
                                                    py={1}
                                                    colorScheme={
                                                        appointment.status ===
                                                        "Scheduled"
                                                            ? "green"
                                                            : appointment.status ===
                                                              "Attended"
                                                            ? "blue"
                                                            : "red" // For other statuses like 'Canceled' or 'Missed'
                                                    }
                                                    rounded="full"
                                                >
                                                    {appointment.status}
                                                </Badge>
                                            </Flex>
                                            <VStack
                                                align="start"
                                                spacing={1}
                                                fontSize="sm"
                                                color="gray.600"
                                            >
                                                <Text>
                                                    Date: {appointment.date}
                                                </Text>
                                                <Text>
                                                    Time: {appointment.time}
                                                </Text>
                                            </VStack>
                                        </Box>
                                    )
                                )
                            ) : (
                                <text>no upcoming appointments</text>
                            )}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </PageContainer>
    );
};

export default UserProfileView;
