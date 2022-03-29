import React, { useState } from "react";

import { TextField, Autocomplete, Stack, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

//component
import Domain from "../Domain";

function AddNewItem() {
  const [type, setType] = useState("");
  const [dream, setDream] = useState("");
  const [date, setDate] = useState(new Date());

  const handleCatergory = (e, value) => {
    setType(value);
    // console.log(value);
  };

  const handleDream = (e) => {
    setDream(e.target.value);
  };

  const handleDate = (newValue) => {
    setDate(newValue);
    // console.log(newValue, "workzzz");
  };

  const submitForm = () => {
    console.log(type);
    console.log(dream);
    console.log(date);
    fetch(`${Domain}/api/v1/addDream`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ type, dream, date }),
    }).then((res) => res.json());
  };

  return (
    <>
      <h2>Add your Dream</h2>
      <Stack spacing={1} sx={{ width: 300 }}>
        <Autocomplete
          disablePortal
          // onChange={(event, value) => console.log(value)}
          onChange={handleCatergory}
          options={list}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Type of Dream" variant="standard" />
          )}
        />
        <TextField label="Dream" variant="standard" onChange={handleDream} />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date to complete the dream(change it)"
            inputFormat="dd/MM/yyyy"
            value={date}
            onChange={handleDate}
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
          />
        </LocalizationProvider>
        {/* <Button onClick={submitForm}>Submit</Button> */}
        <Button
          fullWidth
          sx={{ width: "200px" }}
          size="large"
          type="submit"
          variant="contained"
          onClick={submitForm}
        >
          Add Dream
        </Button>
      </Stack>
    </>
  );
}

const list = ["Personal", "Business"];

export default AddNewItem;
