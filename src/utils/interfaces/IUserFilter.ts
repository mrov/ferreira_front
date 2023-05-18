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

  enum Status {
    Inactive = 0,
    Active = 1,
    Blocked = 2
  }

  export {Status}