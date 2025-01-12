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

