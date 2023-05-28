import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { setUser, setToken, setFriends } from "contexts";
import { useDispatch, useSelector } from "react-redux";
import { AuthService, UsersService } from "services";
import { useEffect } from 'react';

const Login = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
  });

  const initialValueLogin = {
    email: "",
    password: "",
  };

  const checkCurrentLoggedUserExist = (user, token) => {
    if (user !== null && token !== null) {
      UsersService.getUser(user._id, token)
        .then((res) => {
          if (res.ok) {
            return navigate("/home");
          } else {
            console.log("user does not exist");
          }
        })
        .catch((err) => { console.log(err.message) })
    }
  }

  const handleLoginFormSubmit = (values, onSubmitProps) => {
    AuthService.login(values)
      .then((res) => {
        if (res.ok) {
          dispatch(setToken({ token: res.data.token }));
          dispatch(setUser({ user: res.data.user }));
          UsersService.getUserFriends(res.data.user._id, res.data.token).then((res) => {
            dispatch(setFriends({ friends: res }))
          })
          onSubmitProps.resetForm();
          navigate("/home");
        } else {
          console.log("Wrong Email or Password");
        }
      })
      .catch((err) => { console.log(err.message); })

  }

  useEffect(() => {
    checkCurrentLoggedUserExist(user, token);
  }, []); // eslint-disable-line


  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={palette.background.alt}
        p="1rem 6%"
        textAlign="center">
        <Typography
          fontWeight="Bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary">
          Sociopedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "30%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={palette.background.alt}>
        <Typography fontWeight="500" variant='h5' sx={{ mb: "1.5rem" }}>
          Welcome to Sociopedia, the Social Media for Sociopaths!
        </Typography>
        <Formik
          onSubmit={handleLoginFormSubmit}
          initialValues={initialValueLogin}
          validationSchema={loginSchema}>
          {
            ({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobileScreens ? undefined : "span 1"
                    }
                  }}>
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }} />
                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }} />
                </Box>
                <Box>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      m: "2rem 0",
                      p: "1rem",
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": { color: palette.primary.dark }
                    }}>
                    LOGIN
                  </Button>
                  <Typography
                    onClick={() => navigate("/register")}
                    sx={{
                      textDecoration: "underline",
                      color: palette.primary.main,
                      "&:hover": {
                        cursor: "pointer",
                        color: palette.primary.dark,
                      }
                    }}>
                    Don't have an account? Sign Up here.
                  </Typography>
                </Box>
              </form>
            )
          }

        </Formik>
      </Box>


    </Box>
  )
}

export default Login;
