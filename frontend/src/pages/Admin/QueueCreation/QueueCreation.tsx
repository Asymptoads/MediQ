import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Select,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // For page navigation
import PageContainer from "../../../components/Shared/PageContainer/PageContainer";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Schedule = {
  doctor: string;
  day: string;
  startTime: string;
  endTime: string;
};

const QueueCreation = () => {
  const [specialization, setSpecialization] = useState("");
  const [doctor, setDoctor] = useState("");
  const [status, setStatus] = useState("open");
  const [weeklySchedule, setWeeklySchedule] = useState<Schedule[]>([]);
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [isLabTest, setIsLabTest] = useState(false);
  const [errors, setErrors] = useState({
    specialization: false,
    description: false,
    weeklySchedule: false,
    status: false,
  });
  const [doctorsData, setDoctorsData] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();

  // Fetch doctors data from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:4200/api/doctors");
        const doctors = response.data;

        // Process data to match the required structure
        const formattedData: Record<string, string[]> = {};
        doctors.forEach((doctor: any) => {
          const spec = doctor.specialization;
          if (!formattedData[spec]) {
            formattedData[spec] = [];
          }
          formattedData[spec].push(doctor.name);
        });

        setDoctorsData(formattedData);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Function to handle the addition of a schedule
  const addSchedule = () => {
    if (!doctor || !day || !startTime || !endTime) {
      alert("Please fill in all schedule details");
      return;
    }

    setWeeklySchedule([...weeklySchedule, { doctor, day, startTime, endTime }]);
    setDoctor("");
    setDay("");
    setStartTime("");
    setEndTime("");
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!specialization || weeklySchedule.length === 0 || !status) {
      setErrors({
        specialization: !specialization,
        description: !description,
        weeklySchedule: weeklySchedule.length === 0,
        status: !status,
      });
      alert("Please fill in all required fields.");
      return;
    }

    const queueDetails = {
      specialization,
      is_lab_test: isLabTest,
      description,
      status,
      weekly_schedule: weeklySchedule,
    };
   
    console.log(queueDetails);
    try {
      const response = axios.post("http://localhost:4200/api/queue", queueDetails);
      console.log(response);
      navigate('/success');
    } catch (error) {
      console.error("Error creating queue:", error);
      alert("Error creating queue. Please try again.");
    }

    // // Submit the queueDetails to your backend here
    // console.log(queueDetails); // Just for testing
    // navigate("/success"); // Redirect on success
  };

  return (
    <PageContainer>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" px={4} marginTop="55px" fontFamily="Jost">
        <VStack
          spacing={6}
          align="center"
          bg="white"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          width="100%"
          maxW="650px"
        >
          <Heading fontFamily="Jost">Create Queue</Heading>
          <Text>Create a new queue for a doctor specialization</Text>

          {/* Specialization Dropdown */}
          <FormControl isInvalid={errors.specialization}>
            <FormLabel>Specialization</FormLabel>
            <Select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="Select specialization"
            >
              {Object.keys(doctorsData).map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </Select>
            <FormErrorMessage>Specialization is required.</FormErrorMessage>
          </FormControl>

          {/* Doctor Dropdown - Dependent on Specialization */}
          <FormControl isInvalid={errors.weeklySchedule}>
            <FormLabel>Doctor</FormLabel>
            <Select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              placeholder="Select doctor"
              isDisabled={!specialization} // Disable if no specialization selected
            >
              {specialization &&
                doctorsData[specialization]?.map((doc, index) => (
                  <option key={index} value={doc}>
                    {doc}
                  </option>
                ))}
            </Select>
          </FormControl>


          {/* Description */}
          <FormControl isInvalid={errors.description}>
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
            <FormErrorMessage>Description is required.</FormErrorMessage>
          </FormControl>

          {/* Weekly Schedule Section */}
          <Heading size="md" mt={4} fontFamily="Jost">
            Add Weekly Schedule
          </Heading>

          {/* Day Selection */}
          <FormControl isInvalid={errors.weeklySchedule}>
            <FormLabel>Day</FormLabel>
            <Select value={day} onChange={(e) => setDay(e.target.value)} placeholder="Select day">
              {daysOfWeek.map((d, index) => (
                <option key={index} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Start Time and End Time */}
          <FormControl isInvalid={errors.weeklySchedule}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </FormControl>

          <FormControl isInvalid={errors.weeklySchedule}>
            <FormLabel>End Time</FormLabel>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </FormControl>

          <Button colorScheme="blue" onClick={addSchedule} mt={4}>
            Add Schedule
          </Button>

          {/* Status Selection */}
          <FormControl isInvalid={errors.status} mt={4}>
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="paused">Paused</option>
            </Select>
          </FormControl>

          {/* Submit Button */}
          <Button colorScheme="green" onClick={handleSubmit} mt={6} width="100%">
            Create Queue
          </Button>
        </VStack>
      </Box>
    </PageContainer>
  );
};

export default QueueCreation;
