import Header from "../../components/shared/Header";
import UserFilter from "./UserFilter";
import { IUser, IUserPagination, Status } from "../../utils/interfaces/IUser";
import { useEffect, useState } from "react";
import IUserFilter from "../../utils/interfaces/IUserFilter";

import {
  deleteAllUsers,
  editUserStatus,
  getUserData,
} from "../../services/UsersService";
import {
  Button,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import BlockIcon from "@mui/icons-material/Block";

import DeleteUserModal from "../../components/modals/DeleteUserModal";
import UserModal from "../../components/modals/UserModal";
import Pagination from "../../components/shared/Pagination";
import { getStatusName } from "../../utils/functions/UserUtils";

const translateColumns: any = {
  cpf: "CPF",
  dateOfBirth: "Date of Birth",
  email: "Email",
  id: "ID",
  insertedAt: "Inserted At",
  login: "Login",
  motherName: "Mother's Name",
  name: "Name",
  phone: "Phone",
  status: "Status",
  updatedAt: "Updated At",
};

function mapColumns(user: any): string[] {
  const columns: string[] = [];
  for (const key in user) {
    if (Object.prototype.hasOwnProperty.call(user, key)) {
      columns.push(translateColumns[key]);
    }
  }
  return columns;
}

function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [pagination, setPagination] =
    useState<Omit<Partial<IUserPagination>, "users">>();
  const [columns, setColumns] = useState<string[]>([]);
  const [filters, setFilters] = useState<IUserFilter>({
    status: Status.Active,
  });

  // Modals Infos
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Partial<IUser>>({});

  useEffect(() => {
    fetchUserData();
  }, [filters]);

  const fetchUserData = async () => {
    try {
      const response = await getUserData(filters);

      if (response?.status === 200) {
        const { users, ...paginationInfo } = response.data;
        setUsers(users);
        setPagination(paginationInfo);
        setColumns(mapColumns(users[0]));
        if (
          filters.pageNumber &&
          paginationInfo.totalPages < filters.pageNumber
        ) {
          setFilters((prevFilter) => ({
            ...prevFilter,
            pageNumber: pagination?.totalPages,
          }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // TODO Create a modal to confirm the delete all action
  const deleteAllHandler = async () => {
    await deleteAllUsers();
  };

  const renderProperty = (
    userId: string | number,
    value: string | number,
    property: string
  ) => {
    if (property === "status") {
      return (
        <TableCell key={userId + property} align="center">
          {getStatusName(String(value))}
        </TableCell>
      );
    } else {
      return (
        <TableCell key={userId + property} align="center">
          {value}
        </TableCell>
      );
    }
  };

  // mode can recieve "next" or "prev"
  const updatePagination = (mode: string): void => {
    if (mode === "next") {
      setFilters((prevFilter) => ({
        ...prevFilter,
        pageNumber: pagination?.currentPage + 1,
      }));
    } else if (mode === "prev") {
      setFilters((prevFilter) => ({
        ...prevFilter,
        pageNumber: pagination?.currentPage - 1,
      }));
    }
  };

  return (
    <>
      <DeleteUserModal
        userId={selectedUser.id}
        open={openDeleteModal}
        onClose={function (): void {
          setOpenDeleteModal(false);
        }}
        onDelete={async function (): Promise<void> {
          await fetchUserData();
          setOpenDeleteModal(false);
        }}
      />

      <UserModal
        user={selectedUser}
        open={openUserModal}
        onClose={function (): void {
          fetchUserData();
          setOpenUserModal(false);
        }}
      />

      <Header />

      <Grid item xs={12} sx={{ p: 3 }}>
        <Grid item xs={12}>
          <h2>Filtros</h2>
          <UserFilter
            onFilter={function (filters: IUserFilter): void {
              setFilters((prevFilter) => ({ ...prevFilter, ...filters }));
            }}
          />
        </Grid>

        {users.length ? (
          <>
            <h2 style={{ marginTop: 0 }}>Usuários</h2>
            <TableContainer component={Card}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell align="center" key={column}>
                        {column}
                      </TableCell>
                    ))}
                    <>
                      <TableCell align="center" key={"EditHeader"}>
                        Edit
                      </TableCell>
                      <TableCell align="center" key={"DeleteHeader"}>
                        Delete
                      </TableCell>
                      <TableCell align="center" key={"BlockHeader"}>
                        Block
                      </TableCell>
                    </>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user: IUser) => (
                    <TableRow
                      key={user.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {Object.keys(user).map((property) =>
                        renderProperty(
                          user.id,
                          user[property as keyof IUser],
                          property
                        )
                      )}

                      {/* TODO Turn this region another component Actions Region (Edit/Delete/Rrcover User) */}
                      <TableCell key={"EditPencil"} align="center">
                        <div
                          onClick={() => {
                            setSelectedUser(user);
                            setOpenUserModal(true);
                          }}
                        >
                          <CreateIcon
                            sx={{ cursor: "pointer" }}
                            htmlColor="blue"
                          />
                        </div>
                      </TableCell>
                      {String(user.status) !== Status.Inactive ? (
                        <TableCell key={"DeleteIcon"} align="center">
                          <div
                            onClick={() => {
                              setOpenDeleteModal(true);
                              setSelectedUser(user);
                            }}
                          >
                            <DeleteIcon
                              sx={{ cursor: "pointer" }}
                              htmlColor="Red"
                            />
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell key={"RestoreFromTrashIcon"} align="center">
                          <div
                            onClick={async () => {
                              await editUserStatus(user, Status.Active);
                              fetchUserData();
                            }}
                          >
                            <RestoreFromTrashIcon
                              sx={{ cursor: "pointer" }}
                              htmlColor="green"
                            />
                          </div>
                        </TableCell>
                      )}
                      {String(user.status) !== Status.Blocked ? (
                        <TableCell key={"Block"} align="center">
                          <div
                            onClick={async () => {
                              await editUserStatus(user, Status.Blocked);
                              fetchUserData();
                            }}
                          >
                            <BlockIcon
                              sx={{ cursor: "pointer" }}
                              htmlColor="red"
                            />
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell key={"RestoreBlock"} align="center">
                          <div
                            onClick={async () => {
                              await editUserStatus(user, Status.Active);
                              fetchUserData();
                            }}
                          >
                            <BlockIcon
                              sx={{ cursor: "pointer" }}
                              htmlColor="green"
                            />
                          </div>
                        </TableCell>
                      )}

                      {/* End of Actions Region (Edit/Delete/Rrcover User) */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Pagination
                pagination={pagination}
                onNextPagination={function (): void {
                  updatePagination("next");
                }}
                onPrevPagination={function (): void {
                  updatePagination("prev");
                }}
              />
            </TableContainer>
          </>
        ) : (
          <></>
        )}
        <Button
          variant="contained"
          onClick={() => {
            setSelectedUser({});
            setOpenUserModal(true);
          }}
          color="primary"
        >
          Add User
        </Button>
        <Button variant="contained" color="error" onClick={deleteAllHandler}>
          Delete All
        </Button>
      </Grid>
    </>
  );
}

export default User;
