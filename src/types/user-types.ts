export interface IUserType {
  username: string;
  email: string;
  password: string;
  location: string;
}

export interface IUserSchema extends IUserType {
  _id: string;
}
