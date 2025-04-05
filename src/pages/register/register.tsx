import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { authSelectors, register } from '../../services/slices/auth.slice';

export const Register: FC = () => {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorText, setError] = useState<Error | null>(null);

	const dispatch = useAppDispatch();

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(
			register({
				name: userName,
				email,
				password
			})
		);
	};

	return (
		<RegisterUI
			errorText={useAppSelector(authSelectors.errorSelector) ?? ''}
			email={email}
			userName={userName}
			password={password}
			setEmail={setEmail}
			setPassword={setPassword}
			setUserName={setUserName}
			handleSubmit={handleSubmit}
		/>
	);
};
