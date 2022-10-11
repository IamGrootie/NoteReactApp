import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

export default function RequireAuth({ children }) {
	const { currentUser } = useAuth();

	if (!currentUser) {
		return <Navigate to="/login" />;
	}

	return children;
}
