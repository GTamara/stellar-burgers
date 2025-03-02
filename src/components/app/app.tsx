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
import { Route, Routes, useLocation } from 'react-router-dom';

const App = () => {
	const location = useLocation();

	const backgroundLocation = location.state?.backgroundLocation;

	return (
		<div className={styles.app}>
			<AppHeader />

			<Routes location={backgroundLocation || location}>
				<Route path='/' element={<ConstructorPage />} />
				<Route path='/feed' element={<Feed />} />
				<Route path='/login' element={<ProtectedRoute />}>
					<Route path='/login' element={<Login />} />
				</Route>
				<Route path='/register' element={<ProtectedRoute />}>
					<Route path='/register' element={<Register />} />
				</Route>
				<Route path='/forgot-password' element={<ProtectedRoute />}>
					<Route
						path='/forgot-password'
						element={<ForgotPassword />}
					/>
				</Route>
				<Route path='/reset-password' element={<ProtectedRoute />}>
					<Route path='/reset-password' element={<ResetPassword />} />
				</Route>
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
							<Modal title='Детали заказа' onClose={() => {}}>
								<OrderInfo />
							</Modal>
						}
					/>
					<Route
						path='/ingredients/:id'
						element={
							<Modal title='Детали заказа' onClose={() => {}}>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path='/profile/orders/:number'
						element={
							<ProtectedRoute>
								<Modal title='Детали заказа' onClose={() => {}}>
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
