import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';
import { authSelectors } from '../../services/slices/auth.slice';

export const AppHeader: FC = () => {
	const userName = useAppSelector(authSelectors.userSelector)?.name ?? '';

	return <AppHeaderUI userName={userName} />;
};
