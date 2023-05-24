import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
// import HomePage from 'scenes/homePage';
// import LoginPage from 'scenes/loginPage';
// import ProfilePage from 'scenes/profilePage';

import {
  LoginPage,
  RegisterPage,
  HomePage,
  ProfilePage,
  LandingPage
} from './pages';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </ThemeProvider>

    </BrowserRouter>
  );
}

export default App;
