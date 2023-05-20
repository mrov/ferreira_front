import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Header from "../../components/shared/Header";
import UserFilter from "./UserFilter";
import { IUser, Status } from "../../utils/interfaces/IUser";
import { useEffect, useState } from "react";
import IUserFilter from "../../utils/interfaces/IUserFilter";

import { deleteAllUsers, getUserData } from "../../services/UsersService";
import { Button, Card, Grid } from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

import DeleteUserModal from "../../components/modals/DeleteUserModal";

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
  const [columns, setColumns] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState<IUserFilter>({
    status: Status.Active,
  });
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    fetchUserData();
  }, [filters]);

  const fetchUserData = async () => {
    try {
      const response = await getUserData(filters);

      if (response?.status === 200) {
        setUsers(response?.data);
        setColumns(mapColumns(response?.data[0]));
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

  return (
    <>
      <DeleteUserModal
        userId={selectedUserId}
        open={openModal}
        onClose={function (): void {
          setOpenModal(false);
        }}
        onDelete={function (): void {
          fetchUserData();
          setOpenModal(false);
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

        <TableContainer component={Card}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell align="center" key={column}>
                    {column}
                  </TableCell>
                ))}
                {users.length ? (
                  <>
                    <TableCell align="center" key={"EditHeader"}>
                      Edit
                    </TableCell>
                    <TableCell align="center" key={"DeleteHeader"}>
                      Delete
                    </TableCell>
                  </>
                ) : (
                  <></>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: IUser) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.keys(user).map((property) => (
                    <TableCell key={user.id + property} align="center">
                      {user[property as keyof IUser] as string}
                    </TableCell>
                  ))}
                  <TableCell key={"EditPencil"} align="center">
                    <CreateIcon sx={{ cursor: "pointer" }} htmlColor="blue" />
                  </TableCell>
                  {String(user.status) === Status.Active ? (
                    <TableCell key={"DeleteIcon"} align="center">
                      <div
                        onClick={() => {
                          setOpenModal(true);
                          setSelectedUserId(user.id);
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
                          setOpenModal(true);
                          setSelectedUserId(user.id);
                        }}
                      >
                        <RestoreFromTrashIcon
                          sx={{ cursor: "pointer" }}
                          htmlColor="green"
                        />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary">
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
