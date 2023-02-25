export interface IUserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
}

export interface IUserSchema extends IUserType {
  _id: string;
}
