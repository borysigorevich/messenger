import { IconType } from 'react-icons';

export type MobileItemProps = {
	label: string;
	icon: IconType;
	href: string;
	onClick?: () => void;
	active?: boolean;
};
