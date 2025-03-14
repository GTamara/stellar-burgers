import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { authSelectors, login } from '../../services/slices/auth.slice';

export const Login: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(login({ email, password }));
	};

	return (
		<LoginUI
			errorText={useAppSelector(authSelectors.errorSelector) ?? ''}
			email={email}
			setEmail={setEmail}
			password={password}
			setPassword={setPassword}
			handleSubmit={handleSubmit}
		/>
	);
};
