import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const isAuth = Boolean(useSelector((state) => state.token));

    if (!isAuth) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default ProtectedRoute;
