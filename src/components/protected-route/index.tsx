import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { authSelectors } from '../../services/slices/auth.slice';
import { useAppSelector } from '../../services/store';
import { Preloader } from '@ui';
import { userSelector } from '../../services/selectors/auth.selectors';

export type ProtectedRouteProps = {
	onlyUnAuth?: boolean;
	children?: React.ReactNode;
};

export const ProtectedRoute = ({
	onlyUnAuth,
	children
}: ProtectedRouteProps) => {
	const location = useLocation();
	const user = useAppSelector(userSelector);
	const isAuthChecked = useAppSelector(authSelectors.isAuthCheckedSelector);

	if (!isAuthChecked) {
		console.log('WAIT USER CHECKOUT');
		return <Preloader />;
	}

	if (onlyUnAuth && user) {
		console.log('NAVIGATE FROM LOGIN TO INDEX');
		const from = location.state?.from || { pathname: '/' };
		const backgroundLocation = location.state?.from?.background || null;
		return (
			<Navigate
				replace
				to={from}
				state={{ background: backgroundLocation }}
			/>
		);
	}

	if (!onlyUnAuth && !user) {
		console.log('NAVIGATE FROM PAGE TO LOGIN');
		return (
			<Navigate
				replace
				to={'/login'}
				state={{
					from: {
						...location,
						background: location.state?.background,
						state: null
					}
				}}
			/>
		);
	}
	console.log('RENDER COMPONENT');

	return children ? children : <Outlet />;
};
