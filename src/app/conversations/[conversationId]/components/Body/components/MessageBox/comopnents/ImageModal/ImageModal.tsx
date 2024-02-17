import { Modal } from '@/components/Modal';
import Image from 'next/image';
import React from 'react';

type ImageModalProps = {
	src: string | null;
	onClose: () => void;
	isOpen: boolean;
};

export const ImageModal = ({ src, onClose, isOpen }: ImageModalProps) => {
	if (!src) return null;
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={'h-80'}>
				<Image fill alt='message image' src={src} className={'object-cover'} />
			</div>
		</Modal>
	);
};
