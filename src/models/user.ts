import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import ErrorWithCode from '../utils/classes/ErrorWithCode';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (
    // eslint-disable-next-line no-unused-vars
    email: string,
    // eslint-disable-next-line no-unused-vars
    password: string,
  ) => Promise<mongoose.Document<unknown, any, IUser>>;
}

const userSchema = new mongoose.Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(avatar: string) {
        return validator.isURL(avatar);
      },
      message: 'Not A Valid Avatar',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email: string) {
        return validator.isEmail(email);
      },
      message: 'Not A Valid Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static(
  'findUserByCredentials',
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email }).select('+password')
      .orFail(() => {
        throw new ErrorWithCode(StatusCodes.UNAUTHORIZED, 'Wrong Email or Password');
      })
      .then((user) => bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new ErrorWithCode(StatusCodes.UNAUTHORIZED, 'Wrong Email or Password');
        }
        return user;
      }));
  },
);

export default mongoose.model<IUser, UserModel>('User', userSchema);
