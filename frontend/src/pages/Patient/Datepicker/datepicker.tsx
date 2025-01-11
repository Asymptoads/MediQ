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
  SimpleGrid,
} from '@chakra-ui/react';
import Icon from '../../../components/Shared/Icon/Icon';
import { useBackendAPIContext } from '../../../contexts/BackendAPIContext/BackendAPIContext'; 


interface CalendarDay {
  day: number | '';
  disabled: boolean;
  isToday: boolean;
}

const AppointmentBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { client } = useBackendAPIContext();
  const toast = useToast();

  // Helper function to calculate days in a given month
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const days: CalendarDay[] = [];
    const today = new Date();
    const oneWeekFromToday = new Date(today);
    oneWeekFromToday.setDate(today.getDate() + 7);

    for (let i = 0; i < firstDay; i++) {
      days.push({ day: '', disabled: true, isToday: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isDisabled = date < new Date(new Date().setHours(0, 0, 0, 0));
      const isAfterOneWeek = date > oneWeekFromToday;
      days.push({
        day: i,
        disabled: isDisabled || isAfterOneWeek,
        isToday:
          currentMonth === new Date().getMonth() &&
          currentYear === new Date().getFullYear() &&
          i === new Date().getDate(),
      });
    }

    return days;
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const timeSlots = [
    '8:00 am - 10:00 am',
    '10:00 am - 12:00 pm',
    '1:00 pm - 3:00 pm',
  ];

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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
        description: Appointment booked for ${appointmentDetails.date} at ${appointmentDetails.time},
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
    <Container maxW="440px" py={4} className="appointment-wrapper">
      {/* MediQ Logo */}
      <Flex justify="center" mb={6}>
        <Heading size="lg">
          <Text as="span" color="green.500">
            Medi
          </Text>
          <Text as="span" color="blue.500">
            Q
          </Text>
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
        <Flex flex={1} direction="column">
          <Text fontSize="lg" fontWeight="medium">
            Book Your Appointment
          </Text>
          <Text fontSize="sm" opacity={0.9}>
            Book atleast a day ahead
          </Text>
        </Flex>
        <Icon name="bx-info-circle" />
      </Flex>

      {/* Calendar Section */}
      <Box bg="white" borderRadius="xl" p={6} boxShadow="sm" mb={6}>
        <Heading size="md" mb={4}>
          Select Date
        </Heading>
        
        <Flex justify="space-between" align="center" mb={4}>
          <Box
            as="span"
            onClick={handlePreviousMonth}
            cursor="pointer"
            aria-label="Previous Month"
          >
            <Icon name="bx-chevron-left" />
          </Box>
          <Text fontSize="md" fontWeight="medium">
            {new Date(currentYear, currentMonth).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <Box
            as="span"
            onClick={handleNextMonth}
            cursor="pointer"
            aria-label="Next Month"
          >
            <Icon name="bx-chevron-right" />
          </Box>
        </Flex>

        <Grid templateColumns="repeat(7, 1fr)" gap={1} mb={2}>
          {weekDays.map((day) => (
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
              bgColor={
                selectedDate?.getDate() === date.day ? 'blue.400' : undefined
              }
              borderRadius="full"
              onClick={() =>
                date.day &&
                setSelectedDate(new Date(currentYear, currentMonth, date.day))
              }
              _hover={{
                bg: date.day ? 'blue.50' : undefined,
              }}
            >
              {date.day}
            </Button>
          ))}
        </Grid>
      </Box>

      {/* Time Selection */}
      <Box bg="white" borderRadius="xl" p={6} boxShadow="sm" mb={6}>
        <Heading size="md" mb={4}>
          Select Time
        </Heading>
        <SimpleGrid columns={1} spacing={3}>
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
                borderColor: 'blue.400',
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
        bg="blue.400"
        _hover={{ bg: 'blue.900' }}
        onClick={handleConfirmAppointment}
      >
        Confirm Appointment
      </Button>
    </Container>
  );
};

export default AppointmentBooking;
