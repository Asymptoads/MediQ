import React, { useState } from 'react';
import { Box, Container, Button, Select, Text, VStack, HStack, Input } from '@chakra-ui/react';
import './BookAppointment.scss';
import PageContainer from '../PageContainer/PageContainer';


const BookAppointment: React.FC = () => {
  return (
    <PageContainer>
        <Box className='appointment-wrapper'>
            <h1>Book an appointment</h1>
        </Box>
    </PageContainer>
  );
};

export default BookAppointment;
