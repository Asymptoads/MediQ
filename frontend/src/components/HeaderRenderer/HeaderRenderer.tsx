import React from 'react';
import { Flex, Text, chakra, IconButton, Box, Container } from '@chakra-ui/react';
import { BiUser } from 'react-icons/bi';

interface LogoProps {
  onUserClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onUserClick }) => {
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
        maxW="1280px" // Stops shrinking beyond 1920px
        width="100%" // Ensures full width before maxW is reached
        px={6}
      >
        <Flex 
          justify="space-between" 
          align="center"
          height="64px"
        >
          <Text 
            fontSize={{ base: "xl", md: "2xl" }} 
            fontWeight="bold" 
            letterSpacing="tight"
            userSelect="none"
          >
            <chakra.span color="green.500">Medi</chakra.span>
            <chakra.span color="blue.500">Q</chakra.span>
          </Text>
          
          <IconButton
            aria-label="User profile"
            icon={<BiUser size="24px" />}
            variant="ghost"
            colorScheme="gray"
            size="lg"
            onClick={onUserClick}
            _hover={{ bg: 'gray.100' }}
            _active={{ bg: 'gray.200' }}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Logo;
