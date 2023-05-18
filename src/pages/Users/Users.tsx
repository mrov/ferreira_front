import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Header from "../../components/shared/Header";
import UserFilter from "./UserFilter";
import IUser from "../../utils/interfaces/IUserFilter";
import { useEffect, useState } from "react";
import IUserFilter from "../../utils/interfaces/IUserFilter";

import { getUserData } from "../../services/UsersService";
import { Card } from "@mui/material";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const filter: IUserFilter = {};

        const response = await getUserData(filter);
        if (response?.status === 200) {
          setUsers(response?.data);
          setColumns(mapColumns(response?.data[0]));
        }
        // Process the response data here
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Header />

      <UserFilter
        onFilter={function (filters: Partial<IUser>): void {
          throw new Error("Function not implemented.");
        }}
      />

      <TableContainer component={Card}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(user).map((property) => (
                  <TableCell key={user.id+property} align="right">{user[property as keyof IUser]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default User;
