import React from 'react';
import { useNavigate } from 'react-router-dom';  // Updated to useNavigate
import { Avatar, Box, Button, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

const UserProfileView = () => {
  const navigate = useNavigate();  // useNavigate hook for redirection

  const profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/api/placeholder/100/100',
    memberType: 'member',
    age: 30,
    gender: 'male'
  };

  const handleLogout = async () => {
    try {
      // Making the API call to logout
      const response = await fetch('http://localhost:4200/auth/logout', {
        method: 'POST',  // or 'GET' based on your API requirements
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // To include cookies or session tokens if necessary
      });

      if (response.ok) {
        // Clear local storage or session storage if needed
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');

        // Redirect to login page or home page
        navigate('/login');  // Navigate to the login page using useNavigate
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" p={6} bg="white" rounded="lg" shadow="lg">
      <Flex justify="space-between" align="start" mb={6}>
        <Flex align="center" gap={4}>
          <Avatar
            src={profile.avatar}
            alt="Profile"
            boxSize="60px"
            name={profile.name}
            bg="gray.200"
          />
        </Flex>
        <Button
          onClick={handleLogout}
          leftIcon={<FaSignOutAlt />}
          colorScheme="red"
          variant="outline"
          borderRadius="md"
        >
          Logout
        </Button>
      </Flex>

      <VStack align="start" spacing={4}>
        <Box borderBottom="1px" borderColor="gray.200" pb={4}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontSize="sm" color="gray.500">Name</Text>
              <Text fontSize="md" fontWeight="medium">{profile.name}</Text>
            </GridItem>
            <GridItem>
              <Text fontSize="sm" color="gray.500">Email</Text>
              <Text fontSize="md" fontWeight="medium">{profile.email}</Text>
            </GridItem>
          </Grid>
        </Box>

        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem>
            <Text fontSize="sm" color="gray.500">Member Type</Text>
            <Text fontSize="md" fontWeight="medium" textTransform="capitalize">{profile.memberType}</Text>
          </GridItem>
          <GridItem>
            <Text fontSize="sm" color="gray.500">Age</Text>
            <Text fontSize="md" fontWeight="medium">{profile.age}</Text>
          </GridItem>
          <GridItem>
            <Text fontSize="sm" color="gray.500">Gender</Text>
            <Text fontSize="md" fontWeight="medium" textTransform="capitalize">{profile.gender}</Text>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default UserProfileView;
