import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { AuthProvider } from './auth-context';  // import the AuthProvider
import ProtectedRoute from './ProtectedRoute';  // import the ProtectedRoute component

//AdminImport
import Admin from './pages/Admin/AdminHome/adminHome';
import DoctorRegistration from './pages/Admin/DoctorRegistration/DoctorRegistration';
import SuccessComponent from './components/Shared/Success/Success';
import DoctorSchedules from './pages/Admin/DoctorSchedule/DoctorSchedule';
import QueueCreation from './pages/Admin/QueueCreation/QueueCreation';
import ViewPatients from './pages/Admin/ViewPatient/ViewPatient';
import PatientQueue from './pages/Doctor/PatientQueue/PatientQueue';
import DoctorDashboard from './pages/Doctor/DoctorDashboard/DoctorDashboard';

// import Logo from './components/HeaderRenderer/HeaderRenderer';
import Home from './pages/Patient/Home/Home';
import Login from './pages/Shared/Login/Login';
import Reports from './pages/Patient/Report/Report';
import DoctorSpecializations from './pages/Patient/Specilization/Specialization';
import Labtests from './pages/Patient/LabTest/LabTest';
import PaymentPage from './pages/Patient/Payment/Payment';
import QueuePage from './components/Patient/Queue/QueuePage';
import BookTest from './pages/Patient/BookTest/BookTest';
import Confirmation from './components/Patient/Confirmation/Confirmation';
import Register from './pages/Patient/Register/Register';
import MyAccount from './pages/Patient/MyAccount/MyAccount';
import SpecializationDetails from './components/Patient/Specilization/SpecilizationDetails';
import BookAppointment from './pages/Patient/BookAppointment/BookAppointment';
import AppointmentBooking from './pages/Patient/Datepicker/datepicker';

const App = () => {
    return (
        <AuthProvider>
            <Box className="app">
                <Routes>
                    {/* All non-protected routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Login />}  />
                    <Route path="/specialization" element={<DoctorSpecializations />} />
                    <Route path="/lab-tests" element={<Labtests />} />
                    <Route path="/specialization/:name" element={<SpecializationDetails />} />
                    <Route path="/book/:specialization/:schedule_id" element={<BookAppointment />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/queue" element={<QueuePage />} />
                    <Route path="/book-test" element={<BookTest />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/my-account" element={<MyAccount />} />
                    <Route path="/date-picker" element={<AppointmentBooking />} />

                    {/* <Route path="/reports" element={<Reports />} /> */}
                    {/* Protected Routes */}
                    {/* <Route path="/" element={<ProtectedRoute element={<Home />} />} /> */}
                    {/* <Route path="/reports" element={<ProtectedRoute element={<Reports />} />} /> */}
                    {/* <Route path="/specialization" element={<ProtectedRoute element={<DoctorSpecializations />} />} /> */}
                    {/* <Route path="/specializations/:name" element={<ProtectedRoute element={<SpecializationDetails />} />} /> */}
                    {/* <Route path="/appointment/book/:doctorID" element={<ProtectedRoute element={<BookAppointment />} />} /> */}
                    {/* <Route path="/payment" element={<ProtectedRoute element={<PaymentPage />} />} /> */}
                    {/* <Route path="/book-test" element={<ProtectedRoute element={<BookTest />} />} /> */}
                    {/* <Route path="/confirmation" element={<ProtectedRoute element={<Confirmation />} />} /> */}
                    {/* <Route path="/my-account" element={<ProtectedRoute element={<MyAccount />} />} /> */}
                    {/* <Route path="/date-picker" element={<ProtectedRoute element={<AppointmentBooking />} />} /> */}

                    {/* Admin Route */}
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/admin/doctor-registration' element={<DoctorRegistration />} />
                    <Route path='/success' element={<SuccessComponent message='Doctor Registered Successfully' />} />
                    <Route path='/admin/queue-creation' element={<QueueCreation />} />
                    <Route path='/admin/doctor-schedules' element={<DoctorSchedules />} />
                    <Route path='/admin/view-patients' element={<ViewPatients />} />
                    <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
                    <Route path='/doctor-dashboard/patient-queue' element={<PatientQueue />} />


                </Routes>
            </Box>
        </AuthProvider>
    );
};

export default App;
