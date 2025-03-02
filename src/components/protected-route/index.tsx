import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
// import {RootState} from '../../store';
// import {Role} from '../../types';

export type ProtectedRouteProps = {
	onlyUnAuth?: boolean;
	children?: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) =>
	// const { user, isInit, isLoading } = useSelector((store: RootState) => store.user);

	// if (!isInit || isLoading) {
	//     return <div>Загрузка..</div>
	// }

	// if (!user || !accessRoles.includes(user.role)) {
	//     return <Navigate to="/sign-in" />;
	// }

	children ? children : <Outlet />;
