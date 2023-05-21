import { IUser, IUserForm, Status } from "../interfaces/IUser";

const mapUserToUserForm = function (user: Partial<IUser>): Partial<IUserForm> {
  return {
    id: user.id,
    name: user.name,
    login: user.login,
    email: user.email,
    phone: user.phone,
    cpf: user.cpf,
    dateOfBirth: user.dateOfBirth,
    motherName: user.motherName,
  };
};

const getStatusName = function (value: string): string | undefined {
    const statusKeys = Object.keys(Status) as Array<keyof typeof Status>;
    const statusKey = statusKeys.find((key) => Status[key] == value);
    return statusKey ? statusKey.toString() : undefined;
  }

export { mapUserToUserForm, getStatusName };
