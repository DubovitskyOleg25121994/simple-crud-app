import { connect } from 'mongoose';

import { MONGO_URL } from '../config/environments';

export const databaseConnection = async () => {
  try {
    await connect(MONGO_URL);
  } catch (e) {
    console.log(e);
  }
};
