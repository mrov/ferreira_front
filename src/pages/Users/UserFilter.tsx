import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";
import IUserFilter from "../../utils/interfaces/IUserFilter";
import { Status } from "../../utils/interfaces/IUser";
import AgeRangeField from "../../components/shared/AgeRangeField";

interface UserFilterProps {
  onFilter: (filters: IUserFilter) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<IUserFilter>({});

  useEffect(() => {
    setFilters({ status: Status.Active });
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleAgeChange = (startAge: number | undefined, endAge: number | undefined) => {
    setFilters((prevFilters) => ({ ...prevFilters, startAge: startAge, endAge: endAge }));
  };

  // TODO create a all filter to get every status
  const handleStatusChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, status: value }));
  };

  const handleApplyFilter = () => {
    onFilter(filters);
  };

  return (
    <Grid container spacing={2} paddingBottom={3}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          name="name"
          label="Name"
          fullWidth
          value={filters.name || ""}
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          name="login"
          label="Login"
          fullWidth
          value={filters.login || ""}
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          name="cpf"
          label="CPF"
          fullWidth
          value={filters.cpf || ""}
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          name="startDateBirth"
          label="Start Date of Birth"
          type="date"
          fullWidth
          value={filters.startDateBirth || ""}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          name="endDateBirth"
          label="End Date of Birth"
          type="date"
          fullWidth
          value={filters.endDateBirth || ""}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          name="startInsertedAt"
          label="Start Inserted At"
          type="date"
          fullWidth
          value={filters.startInsertedAt || ""}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          name="endInsertedAt"
          label="End Inserted At"
          type="date"
          fullWidth
          value={filters.endInsertedAt || ""}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          name="startUpdatedAt"
          label="Start Updated At"
          type="date"
          fullWidth
          value={filters.startUpdatedAt || ""}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          name="endUpdatedAt"
          label="End Updated At"
          type="date"
          fullWidth
          value={filters.endUpdatedAt || ""}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AgeRangeField onChange={handleAgeChange}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            name="status"
            label="Status"
            value={filters.status || ""}
            onChange={handleStatusChange}
          >
            <MenuItem value={Status.Inactive}>Inactive</MenuItem>
            <MenuItem value={Status.Active}>Active</MenuItem>
            <MenuItem value={Status.Blocked}>Blocked</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleApplyFilter}>
          Apply Filter
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserFilter;
