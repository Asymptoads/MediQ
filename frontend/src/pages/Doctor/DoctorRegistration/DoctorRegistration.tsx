import { useState } from "react";
import {
    Box,
    Heading,
    Text,
    Button,
    VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CustomTextInput from "../../../components/Shared/CustomTextInput/CustomTextInput";
import PageContainer from "../../../components/Shared/PageContainer/PageContainer";
import "./DoctorRegistration.scss";

const DoctorRegistration = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Specialization dictionary
    const specializationOptions = [
        { label: "Cardiologist", value: "cardiologist" },
        { label: "Neurologist", value: "neurologist" },
        { label: "Orthopedic", value: "orthopedic" },
        { label: "Pediatrician", value: "pediatrician" },
        { label: "Dermatologist", value: "dermatologist" },
    ];

    const handleRegister = () => {
        setIsLoading(true);
    
        // Simulating a successful registration (remove the backend API call)
        setTimeout(() => {
            setIsLoading(false);
            navigate("/success"); // Navigate to success page after 2 seconds
        }, 2000); // Simulate delay for 2 seconds
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleRegister();
    };

    return (
        <PageContainer>
            <Box
                className="register-page"
                padding="0 25px"
                minHeight="10vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <VStack
                    className="register-stuff-container"
                    spacing={4}
                    align="stretch"
                    width="100%"
                    maxW="650px"
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
                    borderRadius="8px"
                    p={6}
                    bg="white"
                >
                    <Heading className="greeting">Doctor Registration</Heading>
                    <Text className="register-info-text">Doctor Registration Form</Text>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <CustomTextInput
                            label="Name"
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="custom-input custom-input-name"
                        />
                        <CustomTextInput
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@email.com"
                            className="custom-input custom-input-email"
                            required
                        />
                        <CustomTextInput
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="custom-input custom-input-password"
                            placeholder="********"
                            required
                        />
                        <CustomTextInput
                            label="Date of Birth"
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="custom-input custom-input-dob"
                            required
                        />
                        <CustomTextInput
                            label="Phone Number"
                            type="phone_number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="custom-input custom-input-phone-number"
                            placeholder="9800000000"
                            required
                        />
                        <CustomTextInput
                            label="Doctor Specialization"
                            type="select"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            options={specializationOptions}
                            className="custom-input custom-input-specialization"
                            required
                        />
                        <Button
                            type="submit"
                            className="form-submit-btn"
                            colorScheme="blue"
                            borderRadius="8px"
                            marginTop="20px"
                            height="50px"
                            fontSize="22px"
                            fontWeight={600}
                            isLoading={isLoading}
                        >
                            Register
                        </Button>
                    </form>
                </VStack>
            </Box>
        </PageContainer>
    );
};

export default DoctorRegistration;
