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

// For the edit and create modal
interface IUserForm {
  id: number | string;
  name: string;
  login: string;
  password?: string;
  email: string;
  phone: string;
  cpf: string;
  dateOfBirth: string;
  motherName: string;
}

interface IUserPagination {
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  users: IUser[];
}

enum Status {
  Inactive = "0",
  Active = "1",
  Blocked = "2",
}

export { Status };  export type { IUser, IUserForm, IUserPagination };

