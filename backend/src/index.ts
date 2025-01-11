import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import { mongo_uri, port } from './envconfig';

import router from './router/index';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', router());

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

mongoose.Promise = Promise;
mongoose.connect(mongo_uri);
mongoose.connection.on('error', (err: Error) => {
  console.log(err);
});


// Delete all the users
// import { userModel } from './models/user.model';
// const clearUsers = async () => {
//   try {
//     await userModel.deleteMany();
//     console.log('All users have been deleted');
//   } catch (error) {
//     console.error('Error clearing users:', error);
//   }
// };
// clearUsers();

// import { queueModel } from './models/queue.model';
// const clearQueue = async () => {
//   try {
//     await queueModel.deleteMany({});
//     console.log('All queue have been deleted');
//   } catch (error) {
//     console.error('Error clearing queue:', error);
//   }
// };
// clearQueue();

// import { appointmentModel } from './models/appointment.model';
// const clearAppointments = async () => {
//   try {
//     await appointmentModel.deleteMany({});
//     console.log('All appointments have been deleted');
//   } catch (error) {
//     console.error('Error clearing appointments:', error);
//   }
// };
// clearAppointments();

// Create a helper function to generate fake users
// const generateUsers = async () => {
//   const specializations = [
//     'OPD',
//     'Eye',
//     'Ear',
//     'Cardiology',
//     'Orthopedics',
//     'Dermatology',
//     'Neurology',
//     'X-ray',
//     'Ultrasound',
//     'MRI',
//     'CT Scan',
//     'Pathology',
//     'Radiology',
//     'Pediatrics',
//     'Gynaecology',
//     'Dentistry',
//     'ENT',
//     'Gastroenterology',
//     'Hematology',
//     'Oncology',
//     'Rheumatology',
//     'Urology',
//     'Pulmonology',
//     'Endocrinology'
//   ];
//
//   try {
//     // Check if the admin user already exists
//     const adminExists = await userModel.findOne();
//
//     if (adminExists) {
//       console.log('Admin user already exists. No new users will be created.');
//       return; // Exit the function if the admin already exists
//     }
//     // Create admin user
//     const adminUser = new userModel({
//       name: 'Admin User',
//       email: 'admin@example.com',
//       password: 'adminpassword',
//       date_of_birth: new Date('1990-01-01'),
//       sex: 'Male',
//       phone_number: '1234567890',
//       authentication: {
//         hashed_password: 'adminhashedpassword',
//         salt: 'adminsalt',
//         sessionToken: 'adminsessiontoken',
//       },
//       is_admin: true,
//       is_doctor: false,
//     });
//
//     await adminUser.save();
//     console.log('Admin user created');
//
//     // Create one doctor for each specialization
//     for (let i = 0; i < specializations.length; i++) {
//       const gender = i % 2 === 0 ? 'Female' : 'Male'; // Alternate gender
//       const doctor = new userModel({
//         name: `${specializations[i]} Doctor`,
//         email: `${specializations[i].toLowerCase()}_doctor${i + 1}@example.com`,
//         password: 'doctorpassword',
//         date_of_birth: new Date('1985-01-01'),
//         sex: gender,
//         phone_number: `98765432${i}`,
//         authentication: {
//           hashed_password: 'doctorhashedpassword',
//           salt: 'doctorsalt',
//           sessionToken: `doctor${i + 1}sessiontoken`,
//         },
//         is_admin: false,
//         is_doctor: true,
//         specialization: specializations[i],
//         is_busy: false,
//       });
//
//       await doctor.save();
//       console.log(`${specializations[i]} Doctor created`);
//     }
//
//     // Create 10 random non-doctor users
//     for (let i = 0; i < 10; i++) {
//       const gender = i % 2 === 0 ? 'Female' : 'Male'; // Alternate gender
//       const user = new userModel({
//         name: `User ${i + 1}`,
//         email: `user${i + 1}@example.com`,
//         password: 'userpassword',
//         date_of_birth: new Date('2000-01-01'),
//         sex: gender,
//         phone_number: `99999999${i}`,
//         authentication: {
//           hashed_password: 'userhashedpassword',
//           salt: 'usersalt',
//           sessionToken: `user${i + 1}sessiontoken`,
//         },
//         is_admin: false,
//         is_doctor: false,
//       });
//
//       await user.save();
//       console.log(`Normal User ${i + 1} created`);
//     }
//     console.log('All users, doctors, and normal users created');
//   } catch (error) {
//     console.error('Error creating users and doctors:', error);
//   }
// };
// generateUsers();
