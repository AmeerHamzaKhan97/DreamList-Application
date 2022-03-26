import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  Link as RouterLink,
  useNavigate,
  Navigate,
  useHistory,
} from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
// import eyeFill from "@iconify/icons-eva/eye-fill";
// import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// import { useSelector, useDispatch } from "react-redux";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Alert,
  Button,
} from "@mui/material";
// import { LoadingButton } from "@mui/lab";

// import { updateState } from "../../../redux-store/userSlice";
import Domain from "../../Domain";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  // const user = useSelector((state) => state.userStore.user);
  // const history = useHistory();

  const changeStatus = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const changePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      role: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    // onSubmit: () => {
    //   navigate("/dashboard", { replace: true });
    // },
  });
  // const updateReduxState = (payload) => {
  //   dispatch(updateState(payload));
  // };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const user = { email, password };

    await fetch(`${Domain}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'x-access-token': `Bearer' $( localStorage.getItem('login-access-token'))`
      },
      body: JSON.stringify(user),
    })
      .then((res) =>
        // console.log(res);
        res.json()
      )
      .then((data) => {
        console.log(data);

        if (data.status === "200") {
          console.log("work");
          localStorage.setItem("login-access-token-dreamlist", data.acessToken);

          // updateReduxState({
          //   jwt: data.acessToken,
          //   user: data.user,
          //   role: data.role,
          //   name: data.name,
          // });

          // navigate("/dashboard/app");
        } else {
          // console.log('Error', data.msg);
          setResult(data);
          console.log("error", data);
        }
      });
  };

  const { errors, touched, values, isSubmitting, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  // useEffect(() => {
  //   if (user !== null && user !== undefined) {
  //     console.log("login user check");
  //     navigate("/dashboard/app");
  //   } else if (
  //     localStorage.getItem("login-access-token") !== null &&
  //     localStorage.getItem("login-access-token") !== ""
  //   ) {
  //     const jwt = localStorage.getItem("login-access-token");
  //     const domainName = window.location.hostname;

  //     fetch(`${Domain} '/api/v1/getUserData'`, {
  //       headers: {
  //         Authorization: `Bearer ${jwt}`,
  //       },
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         dispatch(updateState({ jwt, user: data.user }));
  //         navigate("/dashboard/app");
  //       });
  //   }
  // }, []);

  return (
    <FormikProvider value={formik}>
      <Stack spacing={3} sx={{ maxWidth: "500px", margin: "auto" }}>
        <Form
          autoComplete="off"
          noValidate
          // onSubmit={handleSubmit}
          onChange={changeStatus}
        >
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Form>

        <Form
          autoComplete="off"
          noValidate
          // onSubmit={handleSubmit}
          onChange={changePassword}
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
                  <IconButton onClick={handleShowPassword} edge="end">
                    {/* <Icon icon={showPassword ? eyeFill : eyeOffFill} /> */}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <Icon
            icon="ri:add-circle-line"
            style={{
              fontSize: "100px",
              cursor: "pointer",
            }}
            onClick={() => console.log("working...")}
          />
        </Form>
        <Button
          fullWidth
          sx={{ width: "200px" }}
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          onClick={() => {
            handleSubmit();
            console.log(email);
          }}
        >
          Login
        </Button>
      </Stack>

      <Form autoComplete="off" noValidate>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          {/* <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link> */}
          {result === "" ? null : (
            <Alert severity={result.response}>{result.msg}</Alert>
          )}
        </Stack>
      </Form>
    </FormikProvider>
  );
}
