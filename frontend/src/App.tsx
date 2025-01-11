import { useEffect, useState } from 'react';
import { Route, Routes, Router } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Logo from './components/HeaderRenderer/HeaderRenderer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Reports from './pages/Report/Report';
import DoctorSpecializations from './pages/Specilization/Specialization';
import LabTests from './pages/LabTest/LabTest';
import LabTestDetails from './components/LabTestDetails/LabTestDetails';

import PaymentPage from './pages/Payment/Payment';
import QueuePage from './components/Queue/QueuePage';
import BookTest from './pages/BookTest/BookTest';
import Confirmation from './components/Confirmation/Confirmation';
// import TestStatus from './components/TestStatus/TestStatus';


// import Register from './pages/Register/Register';
import MyAccount from './pages/MyAccount/MyAccount';


import './App.scss';
import SpecializationDetails from './components/Specilization/SpecilizationDetails';
import BookAppointment from './components/BookAppointment/BookAppointment';

const App = () => {
    // return (
    //     <Box className='app'>
    //         <NavBar />

    //         <Flex>
    //         {/*Sidebar here */}
    //         <Sidebar />

    //         <Box flex="1">
    //         <Routes>
    //             <Route path='/' element={<Home />} />
    //             <Route path='/auth/login' element={<Login />} />

    //             {/* <Route path="/calendar" element={<Calender />} />
    //             <Route path="/kanban" element={<Kanban />} /> */}

    // try to fetch user on site load
    // const { fetchUser } = useUserContext();
    // useEffect(() => {
    //     fetchUser();
    // }, []);

    return (
        <Box className='app'>
            {/* <CalendarContextProvider> */}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/reports' element={<Reports />} />
                    <Route path='/specialization' element={<DoctorSpecializations />} />
                    <Route path='/specializations/:name' element={<SpecializationDetails />} />
                    <Route path='/appointment/book/:doctorID' element={<BookAppointment />} />
                    <Route path='/payment' element={<PaymentPage/> } />
                    <Route path='/queue' element={<QueuePage />} />
                    <Route path='/lab-tests' element={<LabTests />} />
                    <Route path="/labtests/:testName" element={<LabTestDetails />} />
                    <Route path='/book-test' element={<BookTest />} />
                    <Route path='/confirmation' element={<Confirmation />} />
                    {/* <Route path='/test-status' element={<TestStatus />} /> */}

                    {/* <Route path='/register' element={<Register />} />*/}
                    <Route path='/my-account' element={<MyAccount />} /> 
                </Routes>
            {/* </CalendarContextProvider> */}
        </Box>
    );
};

export default App;
