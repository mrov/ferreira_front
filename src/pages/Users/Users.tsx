import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Header from "../../components/shared/Header";
import UserFilter from "./UserFilter";
import { IUser, IUserPagination, Status } from "../../utils/interfaces/IUser";
import { useEffect, useState } from "react";
import IUserFilter from "../../utils/interfaces/IUserFilter";

import { deleteAllUsers, getUserData } from "../../services/UsersService";
import { Button, Card, Grid } from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

import DeleteUserModal from "../../components/modals/DeleteUserModal";
import UserModal from "../../components/modals/UserModal";
import Pagination from "../../components/shared/Pagination";
import { getStatusName } from "../../utils/functions/UserUtils";

function mapColumns(user: any): string[] {
  const columns: string[] = [];
  for (const key in user) {
    if (Object.prototype.hasOwnProperty.call(user, key)) {
      columns.push(key);
    }
  }
  return columns;
}

function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [pagination, setPagination] =
    useState<Omit<IUserPagination, "users">>();
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
      }
    } catch (error) {
      console.error(error);
      // Handle error here
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

  return (
    <>
      <DeleteUserModal
        userId={selectedUser.id}
        open={openDeleteModal}
        onClose={function (): void {
          setOpenDeleteModal(false);
        }}
        onDelete={function (): void {
          fetchUserData();
          setOpenDeleteModal(false);
        }}
      />

      <UserModal
        user={selectedUser}
        open={openUserModal}
        onClose={function (): void {
          setOpenUserModal(false);
        }}
      />

      <Header />

      <Grid item xs={12} sx={{ p: 3 }}>
        <Grid item xs={12}>
          <UserFilter
            onFilter={function (filters: IUserFilter): void {
              setFilters(filters);
            }}
          />
        </Grid>

        {users.length ? (
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
                    {String(user.status) === Status.Active ? (
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
                          onClick={() => {
                            setOpenDeleteModal(true);
                            setSelectedUser(user);
                          }}
                        >
                          <RestoreFromTrashIcon
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

            <Pagination pagination={pagination} />
          </TableContainer>
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
