import { model, Schema } from 'mongoose';

import { IUser } from '../interfaces/user.interface';

const UserSchema = new Schema<IUser>({
  name: { type: String, index: true },
  email: { type: String, index: true },
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
