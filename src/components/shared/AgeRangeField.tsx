import { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

interface IAgeRangeFieldProps {
    onChange: (startAge: number | undefined, endAge: number | undefined) => void;
  }

const AgeRangeField: React.FC<IAgeRangeFieldProps> = ({ onChange }) => {
  const [range, setRange] = useState(6);
  const [startAge, setStartAge] = useState<number>();
  const [endAge, setEndAge] = useState<number>();

  useEffect(() => {
    onChange(startAge, endAge);
  }, [startAge, endAge]);

  const handleRangeChange = (event: any) => {
    const selectedRange = event.target.value;

    switch (selectedRange) {
      case 1:
        setStartAge(18);
        setEndAge(26);
        break;
      case 2:
        setStartAge(25);
        setEndAge(31);
        break;
      case 3:
        setStartAge(30);
        setEndAge(36);
        break;
      case 4:
        setStartAge(35);
        setEndAge(41);
        break;
      case 5:
        setStartAge(40);
        break;
      case 6:
        setStartAge(undefined);
        setEndAge(undefined);
        break;
      default:
        break;
    }

    setRange(selectedRange);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          name="age"
          label="Age"
          value={range}
          onChange={handleRangeChange}
        >
          <MenuItem value={1}>Entre 18 e 26 anos</MenuItem>
          <MenuItem value={2}>Entre 25 e 31 anos</MenuItem>
          <MenuItem value={3}>Entre 30 e 36 anos</MenuItem>
          <MenuItem value={4}>Entre 35 e 41 anos</MenuItem>
          <MenuItem value={5}>Maior que 40 anos</MenuItem>
          <MenuItem value={6}>Todas Idades</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default AgeRangeField;
