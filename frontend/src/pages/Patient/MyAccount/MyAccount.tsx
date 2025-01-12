import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
    Box,
    Text,
    VStack,
    HStack,
    Avatar,
    IconButton,
    Divider,
    Container,
    Stack,
    Spinner,
    useToast,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import PageContainer from '../../../components/Shared/PageContainer/PageContainer';
import axios from 'axios';

const ProfilePage: React.FC = () => {
    const [profileData, setProfileData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();
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
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('http://localhost:4200/api/user');
                const user = res.data;

                // Format date of birth
                const formattedDateOfBirth = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }).format(new Date(user.date_of_birth));

                // Determine role
                const role = user.is_admin
                    ? 'Admin'
                    : user.is_doctor
                    ? 'Doctor'
                    : 'Member';

                setProfileData({
                    userInfo: {
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar || 'https://bit.ly/dan-abramov',
                        age: calculateAge(user.date_of_birth),
                        gender: user.sex,
                        role: role,
                    },
                    additionalInfo: {
                        joined: user.joined_date,
                        location: user.location || 'Not provided',
                    },
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to load user data. Please try again later.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [toast]);

    const handleLogout = () => {
        return <Navigate to="/login" />;
        alert('Logged Out!');
    };

    if (isLoading) {
        return (
            <PageContainer>
                <Container maxW="1280px" py={8} marginTop="55px">
                    <Spinner size="xl" />
                </Container>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Container maxW="1280px" py={8} marginTop="55px">
                {/* Profile Section */}
                <Box
                    bg="white"
                    p={6}
                    borderRadius="lg"
                    boxShadow="lg"
                    textAlign="center"
                >
                    {/* Avatar */}
                    <Avatar
                        size="2xl"
                        name={profileData.userInfo.name}
                        src={profileData.userInfo.avatar}
                        mb={4}
                    />
                    <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                        {profileData.userInfo.name}
                    </Text>
                    <Text fontSize="md" color="gray.500">
                        {profileData.userInfo.email}
                    </Text>
                    <Text fontSize="ms" mt={4} color="gray.500">
                      {profileData.userInfo.role}
                    </Text>
                    <Text fontSize="sm" mt={4} color="gray.600">
                        Age: {profileData.userInfo.age}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        Gender: {profileData.userInfo.gender}
                    </Text>

                    {/* Actions */}
                    <Stack direction="row" spacing={4} mt={6} justify="center">
                        <IconButton
                            aria-label="Logout"
                            icon={<FiLogOut />}
                            colorScheme="red"
                            onClick={handleLogout}
                        />
                    </Stack>
                </Box>
            </Container>
        </PageContainer>
    );
};

export default ProfilePage;
