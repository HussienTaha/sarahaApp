import mongoose from 'mongoose';
import MessageModel from './models/message.model.js';

import chalk from 'chalk';
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URLA);
    console.log(chalk.bgGreen('✅ MongoDB connected to sarahaapp ........❤️ 👌'));
  } catch (error) {
    console.error(chalk.red('❌ Connection error:..........😒 😒', error.message));
    
  }
};
MessageModel
export default connectDB;
