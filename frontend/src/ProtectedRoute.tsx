import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth-context';  // use the useAuth hook to get authentication status

interface ProtectedRouteProps {
    element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // or a loading spinner
    }

    // If the user is not authenticated, redirect to login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{element}</>;
};

export default ProtectedRoute;
