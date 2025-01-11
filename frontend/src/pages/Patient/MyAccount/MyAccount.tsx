import React from 'react';
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
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import PageContainer from '../../components/PageContainer/PageContainer';

const ProfilePage: React.FC = () => {
    // Profile data dictionary
    const profileData = {
        userInfo: {
            name: 'Medi Q',
            email: 'MediQ@mediq.com',
            avatar: 'https://bit.ly/dan-abramov', // Replace with your avatar URL
        },
        additionalInfo: {
            joined: 'January 2023',
            role: 'Member',
            location: 'Bhaktapur, Nepal',
        },
    };

    const handleLogout = () => {
        // Implement logout functionality
        alert('Logged Out!');
    };

    return (
        <PageContainer>

        <Container maxW="1280px" py={8} marginTop='55px' >
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

                {/* Name and Email */}
                <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                    {profileData.userInfo.name}
                </Text>
                <Text fontSize="md" color="gray.500">
                    {profileData.userInfo.email}
                </Text>

                {/* Bio */}
                <Text fontSize="sm" mt={4} color="gray.600">
                    {profileData.userInfo.bio}
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

            {/* Additional Information Section */}
            <Box
                mt={6}
                p={4}
                bg="gray.50"
                borderRadius="lg"
                boxShadow="md"
                textAlign="left"
            >
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                    Additional Info
                </Text>
                <Divider mb={4} />
                <VStack spacing={3} align="stretch">
                    {Object.entries(profileData.additionalInfo).map(
                        ([key, value]) => (
                            <HStack key={key} justify="space-between">
                                <Text fontWeight="medium">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </Text>
                                <Text color="gray.600">{value}</Text>
                            </HStack>
                        )
                    )}
                </VStack>
            </Box>
        </Container>
        </PageContainer>
    );
};

export default ProfilePage;
