import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    LandingPage,
    LoginPage,
    RegisterPage,
    HomePage,
    ProfilePage,
} from 'pages';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
import { ProtectRouteComponent } from 'components';

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route
                        path="/"
                        element={<LandingPage />}
                    />
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    />
                    <Route
                        path="/home"
                        element={<ProtectRouteComponent><HomePage /></ProtectRouteComponent>}
                    />
                    <Route
                        path="/profile/:userId"
                        element={<ProtectRouteComponent><ProfilePage /></ProtectRouteComponent>}
                    />
                </Routes>
            </ThemeProvider>

        </BrowserRouter>
    );
}

export default App;
