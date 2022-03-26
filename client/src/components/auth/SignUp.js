import * as Yup from "yup";
import React, { useState } from "react";
// import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
// import eyeFill from "@iconify/icons-eva/eye-fill";
// import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Button,
} from "@mui/material";
// import { LoadingButton } from "@mui/lab";

import Domain from "../../Domain";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [result, setResult] = useState("");

  const handleName = (e) => {
    const { value } = e.target;
    console.log(value);
    setName(value);
  };

  const handleEmail = (e) => {
    const { value } = e.target;
    console.log(value);
    setEmail(value);
  };

  const handlePassword = (e) => {
    const { value } = e.target;
    console.log(value);
    setPassword(value);
  };

  const RegisterSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),

    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",

      email: "",
      Role: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate("/dashboard", { replace: true });
    },
  });

  const handleSubmit = async () => {
    console.log("done");
    // e.preventDefault();
    const creator = { name, email, password };
    console.log("see", creator);

    fetch(`${Domain}/api/v1/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creator),
    })
      .then((res) => res.json())
      .then((data) => setResult(data), console.log(result));
  };

  const { errors, touched, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Stack spacing={3} sx={{ maxWidth: "500px", margin: "auto" }}>
        <Form
          autoComplete="off"
          noValidate
          //   onSubmit={handleSubmit}
          onChange={handleName}
        >
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}
          <TextField
            fullWidth
            label="Name"
            {...getFieldProps("Name")}
            error={Boolean(touched.firstName && errors.Name)}
            helperText={touched.firstName && errors.Name}
          />
        </Form>

        {/* <TextField
            fullWidth
            label="Last name"
            {...getFieldProps('lastName')}
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          /> */}
        {/* </Stack> */}
        <Form
          autoComplete="off"
          noValidate
          //   onSubmit={handleSubmit}
          onChange={handleEmail}
        >
          <TextField
            fullWidth
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Form>

        {/* <Form autoComplete="off" noValidate onSubmit={handleSubmit} onChange={handleRole}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="Role"
            {...getFieldProps('Role')}
            error={Boolean(touched.Role && errors.Role)}
            helperText={touched.Role && errors.Role}
          />
        </Form> */}

        <Form
          autoComplete="off"
          noValidate
          //   onSubmit={handleSubmit}
          onChange={handlePassword}
        >
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {/* <Icon icon={showPassword ? eyeFill : eyeOffFill} /> */}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Form>

        {result === "" ? null : (
          <Alert
            sx={{ marginTop: "10px", marginBottom: "5px" }}
            severity={result.response}
          >
            {result.msg}
          </Alert>
        )}

        <Button
          fullWidth
          sx={{ width: "200px" }}
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          onClick={() => {
            handleSubmit();
            console.log(name, email);
          }}
        >
          Register
        </Button>
      </Stack>
      {/* </Form> */}
    </FormikProvider>
  );
}
