import React from 'react';
import { Flex, Text, chakra, IconButton, Box, Container } from '@chakra-ui/react';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  isLoggedIn: boolean; // Prop to indicate if the user is logged in
}

const Logo: React.FC<LogoProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // Redirect to the homepage
  };


  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/my-account'); // Redirect to the My Account page if logged in
    } else {
      navigate('/login'); // Redirect to the Login page if not logged in
    }
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
            // onClick={handleLogoClick} // Click handler for redirect
          >
            <chakra.span color="green.500">Medi</chakra.span>
            <chakra.span color="blue.500">Q</chakra.span>
          </Text>

          {/* User Icon */}
          <IconButton
            aria-label="User profile"
            icon={<BiUser size="24px" />}
            variant="ghost"
            colorScheme="gray"
            size="lg"
            onClick={handleUserClick} // Check login status and redirect
            cursor="pointer"
            _hover={{ bg: 'gray.100' }}
            _active={{ bg: 'gray.200' }}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Logo;
