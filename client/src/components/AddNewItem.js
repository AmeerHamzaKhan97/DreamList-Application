import React, { useState } from "react";

import { TextField, Autocomplete, Stack, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

function AddNewItem() {
  const [cat, setCat] = useState("");
  const [dream, setDream] = useState("");
  const [value, setValue] = useState(new Date());

  const handleCatergory = (e, value) => {
    setCat(value);
    console.log(value);
  };

  const handleDream = (e) => {
    setDream(e.target.value);
  };

  const handleDate = (newValue) => {
    setValue(newValue);
    console.log(newValue, "workzzz");
  };

  const submitForm = () => {
    console.log(cat);
    console.log(dream);
  };

  return (
    <>
      <Stack spacing={1} sx={{ width: 300 }}>
        <Autocomplete
          disablePortal
          // onChange={(event, value) => console.log(value)}
          onChange={handleCatergory}
          options={list}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Category" variant="standard" />
          )}
        />
        <TextField label="Dream" variant="standard" onChange={handleDream} />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date to Compelete the dream"
            inputFormat="dd/MM/yyyy"
            value={value}
            onChange={handleDate}
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
          />
        </LocalizationProvider>
        <Button onClick={submitForm}>Submit</Button>
      </Stack>
    </>
  );
}

const list = ["Personal", "Business"];

export default AddNewItem;
