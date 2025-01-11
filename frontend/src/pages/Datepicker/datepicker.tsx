import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  Flex,
  Container,
  useToast,
  SimpleGrid
} from '@chakra-ui/react';
import Icon from '../../components/Icon/Icon';
import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';


interface CalendarDay {
  day: number | '';
  disabled: boolean;
  isToday: boolean;
}

const AppointmentBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const { client } = useBackendAPIContext(); // Properly destructure client
  const toast = useToast(); // Initialize toast
  
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const today = new Date();
    const daysInMonth = getDaysInMonth(today.getFullYear(), today.getMonth());
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    
    const days: CalendarDay[] = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: '', disabled: true, isToday: false });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      const isDisabled = date < new Date(today.setHours(0, 0, 0, 0));
      days.push({ 
        day: i, 
        disabled: isDisabled,
        isToday: i === today.getDate()
      });
    }
    
    return days;
  };

  const timeSlots = [
    '9:00 am',
    '10:00 am',
    '11:00 am',
    '1:00 pm',
    '2:00 pm',
    '3:00 pm'
  ];

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const handleConfirmAppointment = async () => {
    if (!selectedDate || !selectedTime) return;

    const appointmentDetails = {
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
    };

    try {
      await client.post('/appointments/return', appointmentDetails);
      toast({
        title: 'Appointment Confirmed',
        description: `Appointment booked for ${appointmentDetails.date} at ${appointmentDetails.time}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Failed to confirm the appointment. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="440px" py={4} className='appointment-wrapper'>
      {/* MediQ Logo */}
      <Flex justify="center" mb={6}>
        <Heading size="lg">
          <Text as="span" color="green.500">Medi</Text>
          <Text as="span" color="blue.500">Q</Text>
        </Heading>
      </Flex>

      {/* Header */}
      <Flex
        bg="blue.400"
        color="white"
        p={4}
        borderRadius="xl"
        mb={6}
        alignItems="center"
      >
        <Icon name='bx-left-arrow-alt' />
        <Flex flex={1} ml={3} direction="column">
          <Text fontSize="lg" fontWeight="medium">
            Book Your Appointment
          </Text>
          <Text fontSize="sm" opacity={0.9}>1 hour</Text>
        </Flex>
        <Icon name='bx-info-circle' />
      </Flex>

      {/* Calendar Section */}
      <Box bg="white" borderRadius="xl" p={6} boxShadow="sm" mb={6}>
        <Heading size="md" mb={4}>Select Date</Heading>
        
        <Flex justify="space-between" align="center" mb={4}>
          <Icon name='bx-chevron-left' />
          <Text fontSize="md" fontWeight="medium">{currentMonth}</Text>
          <Icon name='bx-chevron-right' />
        </Flex>

        <Grid templateColumns="repeat(7, 1fr)" gap={1} mb={2}>
          {weekDays.map(day => (
            <Text
              key={day}
              fontSize="xs"
              textAlign="center"
              color="gray.500"
              fontWeight="medium"
            >
              {day}
            </Text>
          ))}
        </Grid>

        <Grid templateColumns="repeat(7, 1fr)" gap={1}>
          {generateCalendarDays().map((date, index) => (
            <Button
              key={index}
              size="sm"
              variant="ghost"
              isDisabled={date.disabled}
              bg={date.isToday ? 'blue.50' : undefined}
              color={selectedDate?.getDate() === date.day ? 'white' : 'inherit'}
              bgColor={selectedDate?.getDate() === date.day ? 'blue.400' : undefined}
              borderRadius="full"
              onClick={() => date.day && setSelectedDate(new Date(new Date().getFullYear(), new Date().getMonth(), date.day))}
              _hover={{
                bg: date.day ? 'blue.50' : undefined
              }}
            >
              {date.day}
            </Button>
          ))}
        </Grid>
      </Box>

      {/* Time Selection */}
      <Box bg="white" borderRadius="xl" p={6} boxShadow="sm" mb={6}>
        <Heading size="md" mb={4}>Select Time</Heading>
        <SimpleGrid columns={3} spacing={3}>
          {timeSlots.map((time) => (
            <Button
              key={time}
              variant="outline"
              isActive={selectedTime === time}
              onClick={() => setSelectedTime(time)}
              colorScheme="blue"
              size="md"
              _active={{
                bg: 'blue.400',
                color: 'white',
                borderColor: 'blue.400'
              }}
            >
              {time}
            </Button>
          ))}
        </SimpleGrid>
      </Box>

      {/* Confirm Button */}
      <Button
        w="full"
        size="lg"
        colorScheme="blue"
        isDisabled={!selectedDate || !selectedTime}
        bg="navy.900"
        _hover={{ bg: 'navy.800' }}
        onClick={handleConfirmAppointment}
      >
        Confirm Appointment
      </Button>
    </Container>
  );
};

export default AppointmentBooking;