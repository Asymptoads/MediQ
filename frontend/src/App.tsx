// import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

// import Logo from './components/HeaderRenderer/HeaderRenderer';
import Home from './pages/Patient/Home/Home';
import Login from './pages/Shared/Login/Login';
import Reports from './pages/Patient/Report/Report';
import DoctorSpecializations from './pages/Patient/Specilization/Specialization';
import LabTests from './pages/Patient/LabTest/LabTest';
import LabTestDetails from './components/Patient/LabTestDetails/LabTestDetails';

import PaymentPage from './pages/Patient/Payment/Payment';
import QueuePage from './components/Patient/Queue/QueuePage';
import BookTest from './pages/Patient/BookTest/BookTest';
import Confirmation from './components/Patient/Confirmation/Confirmation';
// import TestStatus from './components/TestStatus/TestStatus';


import Register from './pages/Patient/Register/Register';
import MyAccount from './pages/Patient/MyAccount/MyAccount';


import './App.scss';
import SpecializationDetails from './components/Patient/Specilization/SpecilizationDetails';
import BookAppointment from './pages/Patient/BookAppointment/BookAppointment';

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

                    <Route path='/register' element={<Register />} />
                    <Route path='/my-account' element={<MyAccount />} /> 
                </Routes>
            {/* </CalendarContextProvider> */}
        </Box>
    );
};

export default App;
