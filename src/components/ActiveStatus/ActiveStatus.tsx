'use client';
import { useActiveChannel } from '@/hooks/useActiveChannel';
import React from 'react';

export const ActiveStatus = () => {
	useActiveChannel();

	return null;
};
