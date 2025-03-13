import { FC } from 'react';
import s from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
	<header className={s.header}>
		<nav className={`${s.menu} p-4`}>
			<div className={s.menu_part_left}>
				<NavLink
					end
					to={'/'}
					className={({ isActive }) =>
						`${s.link} ${isActive ? s.link_active : ''}`
					}
				>
					{({ isActive }) => (
						<>
							<BurgerIcon
								type={isActive ? 'primary' : 'secondary'}
							/>
							<p className='text text_type_main-default ml-2 mr-10'>
								Конструктор
							</p>
						</>
					)}
				</NavLink>
				<NavLink
					to={'/feed'}
					className={({ isActive }) =>
						`${s.link} ${isActive ? s.link_active : ''}`
					}
				>
					{({ isActive }) => (
						<>
							<ListIcon
								type={isActive ? 'primary' : 'secondary'}
							/>
							<p className='text text_type_main-default ml-2'>
								Лента заказов
							</p>
						</>
					)}
				</NavLink>
			</div>
			<div className={s.logo}>
				<Logo className='' />
			</div>
			<div className={s.link_position_last}>
				<NavLink
					to={'/profile'}
					className={({ isActive }) =>
						`${s.link} ${isActive ? s.link_active : ''}`
					}
				>
					{({ isActive }) => (
						<>
							<ProfileIcon
								type={isActive ? 'primary' : 'secondary'}
							/>
							<p className='text text_type_main-default ml-2'>
								{userName ? userName : 'Личный кабинет'}
							</p>
						</>
					)}
				</NavLink>
			</div>
		</nav>
	</header>
);
