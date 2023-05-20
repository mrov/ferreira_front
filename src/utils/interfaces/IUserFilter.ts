import { Status } from "./IUser";

export default interface IUserFilter  {
    name?: string;
    login?: string;
    cpf?: string;
    startDateBirth?: Date;
    endDateBirth?: Date;
    startInsertedAt?: Date;
    endInsertedAt?: Date;
    startUpdatedAt?: Date;
    endUpdatedAt?: Date;
    startAge?: number;
    endAge?: number;
    status?: Status;
    pageNumber?: number;
  }

  