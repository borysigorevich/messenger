import React from 'react';
import { IconType } from 'react-icons';

export type DesktopItemProps = {
	label: string;
	icon: IconType;
	href: string;
	onClick?: () => void;
	active?: boolean;
};
