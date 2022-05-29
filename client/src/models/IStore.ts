import { IUser } from "./IUser";

export interface IStore {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}