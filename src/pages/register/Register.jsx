import {
    Box,
    Button,
    TextField,
    Typography,
    useTheme,
    useMediaQuery
} from '@mui/material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from 'formik';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { FlexBetween } from "components";
import { AuthService } from 'services';

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});


const initialValueRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};


const Register = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const handleRegisterFormSubmit = async (values, onSubmitProps) => {
        // This allows us to send form infos with image
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append('picturePath', values.picture.name);

        const savedUser = await AuthService.register(formData);
        if (savedUser) {
            onSubmitProps.resetForm();
            navigate('/login');
        }
    }

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
                    onSubmit={handleRegisterFormSubmit}
                    initialValues={initialValueRegister}
                    validationSchema={registerSchema}>
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        resetForm,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": {
                                        gridColumn: isNonMobileScreens ? undefined : "span 4",
                                    }
                                }}>
                                <>
                                    <TextField
                                        label="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name="firstName"
                                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        sx={{ gridColumn: "span 2" }} />
                                    <TextField
                                        label="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name="lastName"
                                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        sx={{ gridColumn: "span 2" }} />
                                    <TextField
                                        label="Location"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location}
                                        name="location"
                                        error={Boolean(touched.location) && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                        sx={{ gridColumn: "span 4" }} />
                                    <TextField
                                        label="Occupation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.occupation}
                                        name="occupation"
                                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                        helperText={touched.occupation && errors.occupation}
                                        sx={{ gridColumn: "span 4" }} />
                                    <Box
                                        gridColumn="span 4"
                                        border={`1px solid ${palette.neutral.medium}`}
                                        borderRadius="5px"
                                        p="1rem">
                                        <Dropzone
                                            acceptedFiles=".jpg,.jpeg,.png"
                                            multiple={false}
                                            onDrop={(acceptedFiles) => {
                                                setFieldValue("picture", acceptedFiles[0])
                                            }}>
                                            {({ getRootProps, getInputProps }) => (
                                                <Box
                                                    {...getRootProps()}
                                                    border={`2px dashed ${palette.primary.main}`}
                                                    p="2rem"
                                                    sx={{ "&:hover": { cursor: "pointer" } }}>
                                                    <input {...getInputProps()} />
                                                    {!values.picture ?
                                                        (
                                                            <p>Click here to add a picture</p>
                                                        ) : (
                                                            <FlexBetween>
                                                                <Typography>
                                                                    {values.picture.name}
                                                                </Typography>
                                                                <EditOutlinedIcon />
                                                            </FlexBetween>
                                                        )
                                                    }

                                                </Box>
                                            )}
                                        </Dropzone>
                                    </Box>
                                </>
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
                            {/* LOGIN AND REGISTER BUTTON */}
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
                                    REGISTER
                                </Button>
                                <Typography
                                    onClick={() => navigate("/login")}
                                    sx={{
                                        textDecoration: "underline",
                                        color: palette.primary.main,
                                        "&:hover": {
                                            cursor: "pointer",
                                            color: palette.primary.dark,
                                        }
                                    }}>
                                    Already have an account? Login here.
                                </Typography>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>


        </Box>

    );
}

export default Register;
