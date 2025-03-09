import {
	ConstructorPage,
	Feed,
	ForgotPassword,
	Login,
	NotFound404,
	Profile,
	ProfileOrders,
	Register,
	ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
	AppHeader,
	IngredientDetails,
	Modal,
	OrderInfo,
	ProtectedRoute
} from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, useAppDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/burger-constructor.slice';
import { getFeed } from '../../services/slices/feed.slice';
import { authActions, getUser } from '../../services/slices/auth.slice';

const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const backgroundLocation = location.state?.background;
	const dispatch: AppDispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUser())
			.unwrap()
			.catch((e) => {
				console.error('Get user error', e);
			})
			.finally(() => dispatch(authActions.isAuthChecked()));

		dispatch(getFeed());
		dispatch(getIngredients());
	}, []);

	function goBack() {
		navigate(-1);
	}

	return (
		<div className={styles.app}>
			<AppHeader />

			<Routes location={backgroundLocation || location}>
				<Route path='/' element={<ConstructorPage />} />
				<Route path='/feed' element={<Feed />} />
				<Route
					path='/login'
					element={
						<ProtectedRoute onlyUnAuth>
							<Login />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/register'
					element={
						<ProtectedRoute onlyUnAuth>
							<Register />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/forgot-password'
					element={
						<ProtectedRoute onlyUnAuth>
							<ForgotPassword />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/reset-password'
					element={
						<ProtectedRoute>
							<ResetPassword />
						</ProtectedRoute>
					}
				/>
				<Route path='/profile' element={<ProtectedRoute />}>
					<Route index element={<Profile />} />
					<Route path='orders' element={<ProfileOrders />}>
						<Route path=':id' element={<OrderInfo />} />
					</Route>
				</Route>
				<Route
					path='/ingredients/:id'
					element={<IngredientDetails />}
				/>
				<Route path='*' element={<NotFound404 />} />
			</Routes>

			{backgroundLocation && (
				<Routes>
					<Route
						path='/feed/:number'
						element={
							<Modal title='Детали заказа' onClose={goBack}>
								<OrderInfo />
							</Modal>
						}
					/>
					<Route
						path='/ingredients/:id'
						element={
							<Modal title='Детали ингредиента' onClose={goBack}>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path='/profile/orders/:number'
						element={
							<ProtectedRoute>
								<Modal title='Детали заказа' onClose={goBack}>
									<OrderInfo />
								</Modal>
							</ProtectedRoute>
						}
					/>
				</Routes>
			)}
		</div>
	);
};

export default App;
