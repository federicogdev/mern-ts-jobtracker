export interface IUserType {
  username: string;
  email: string;
  password: string;
  location: string;
}

export interface IUserReturnType {
  _id: string;
  username: string;
  email: string;
  location: string;
  token: string;
}

export interface IUserSchema extends IUserType {
  _id: string;
}
