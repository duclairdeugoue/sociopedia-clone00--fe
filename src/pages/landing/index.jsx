import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme, useMediaQuery, Button } from '@mui/material';

const Index = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
                <Typography
                    fontWeight="Bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                >
                    Sociopedia
                </Typography>
            </Box>
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={palette.background.alt}
            >
                <Typography fontWeight="500" variant='h5' sx={{ mb: "1.5rem" }}>
                    Welcome to Sociopedia, the Social Media for Sociopaths!
                </Typography>
                <Button
                    onClick={() => navigate("/login")}
                    sx={{
                        m: "2rem",
                        p: "1rem",
                        backgroundColor: palette.primary.main,
                        color: palette.background.alt,
                        "&:hover": { color: palette.primary.dark }
                    }}>
                    Sign In
                </Button>
                <Button
                    onClick={() => navigate("/register")}
                    sx={{
                        m: "2rem",
                        p: "1rem",
                        backgroundColor: palette.primary.main,
                        color: palette.background.alt,
                        "&:hover": { color: palette.primary.dark }
                    }}>
                    Sign Up
                </Button>
            </Box>

        </Box>
    )
}

export default Index
