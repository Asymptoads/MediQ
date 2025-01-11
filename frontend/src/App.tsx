import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import './App.scss';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Datepicker from './pages/Datepicker/datepicker';
import MyAccount from './pages/MyAccount/MyAccount';
import Reports from './pages/Report/Report';
import DoctorSpecializations from './pages/Specilization/Specialization';
import LabTests from './pages/LabTest/LabTest';
import LabTestDetails from './components/LabTestDetails/LabTestDetails';
import PaymentPage from './pages/Payment/Payment';
import QueuePage from './components/Queue/QueuePage';
import BookTest from './pages/BookTest/BookTest';
import Confirmation from './components/Confirmation/Confirmation';
import TestStatus from './components/TestStatus/TestStatus';
import SpecializationDetails from './components/Specilization/SpecilizationDetails';
import BookAppointment from './components/BookAppointment/BookAppointment';

const App = () => {
    return (
        <Box className='app'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/datepicker' element={<Datepicker />} />
                <Route path='/my-account' element={<MyAccount />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/specialization' element={<DoctorSpecializations />} />
                <Route path='/specializations/:name' element={<SpecializationDetails />} />
                <Route path='/appointment/book/:doctorID' element={<BookAppointment />} />
                <Route path='/lab-tests' element={<LabTests />} />
                <Route path='/labtests/:testName' element={<LabTestDetails />} />
                <Route path='/payment' element={<PaymentPage />} />
                <Route path='/queue' element={<QueuePage />} />
                <Route path='/book-test' element={<BookTest />} />
                <Route path='/confirmation' element={<Confirmation />} />
                <Route path='/test-status' element={<TestStatus />} />
            </Routes>
        </Box>
    );
};

export default App;
