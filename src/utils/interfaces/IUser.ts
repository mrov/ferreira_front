interface IUser {
  id: number | string;
  name: string;
  login: string;
  password: string;
  email: string;
  phone: string;
  cpf: string;
  dateOfBirth: string;
  motherName: string;
  status: Status;
  insertedAt: string;
  updatedAt: string;
}

interface IUserForm {
  name: string;
  login: string;
  password: string;
  email: string;
  phone: string;
  cpf: string;
  dateOfBirth: string;
  motherName: string;
}

enum Status {
  Inactive = "0",
  Active = "1",
  Blocked = "2",
}

export { Status };  export type { IUser, IUserForm };

