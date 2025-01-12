import React, { useEffect, useState } from 'react';
import { Flex, Text, chakra, IconButton, Box, Container } from '@chakra-ui/react';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Icon from '../Icon/Icon';

const HeaderRenderer: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status when the component mounts
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:4200/auth/status', { withCredentials: true });
        setIsLoggedIn(response.data.isLoggedIn); // Update state based on backend response
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4200/auth/logout', {}, { withCredentials: true });
      setIsLoggedIn(false); // Update state after logout
      navigate('/'); // Redirect to home page (or any page you prefer)
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleLogoClick = () => {
    navigate('/'); // Redirect to homepage
  };

  const handleUserClick = () => {
      navigate('/my-account');
  };

  return (
    <Box 
      as="header" 
      position="fixed"
      top="0"
      left="0"
      right="0"
      bg="white"
      zIndex={1000}
      borderBottom="none"
      boxShadow="none"
      width="100%"
    >
      <Container 
        maxW="1280px" // Stops shrinking beyond 1280px
        width="100%" // Ensures full width before maxW is reached
        px={6}
      >
        <Flex 
          justify="space-between" 
          align="center"
          height="64px"
        >
          {/* Logo */}
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="bold"
            letterSpacing="tight"
            userSelect="none"
            cursor="pointer" // Makes it look clickable
            onClick={handleLogoClick} // Click handler for redirect
          >
            <chakra.span color="green.500">Medi</chakra.span>
            <chakra.span color="blue.500">Q</chakra.span>
          </Text>

          {/* User Icon */}
          <Icon name='bsx-user' />

          <IconButton
            aria-label={isLoggedIn ? 'Logout' : 'User profile'}
            icon={<BiUser size="24px" />}
            variant="ghost"
            colorScheme="gray"
            size="lg"
            onClick={handleUserClick} // Check login status and handle accordingly
            // onClick={() => console.log('clicked')}

            cursor="pointer"
            _hover={{ bg: 'gray.100' }}
            _active={{ bg: 'gray.200' }}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default HeaderRenderer;
