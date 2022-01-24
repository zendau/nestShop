import { User } from '../users.entity';

export default interface IUser extends User {
  confirmPassword: string;
}
