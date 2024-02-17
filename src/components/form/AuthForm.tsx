'use client';
import { AuthSocialButton } from '@/components/authSocialButton';
import { Button } from '@/components/button';
import { SOCIAL_ACTION, VARIANT } from '@/components/form/enums';
import { FormSchema } from '@/components/form/types';
import { Input } from '@/components/inputs';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { BsGithub, BsGoogle } from 'react-icons/bs';
import logo from '../../assets/logo.png';

// const getPromisesArray = (urls: string[], size: number): string[][] => {
//     const result: string[][] = []
//     const urlsLength = urls.length
//
//     for (let i = urlsLength; i > 0 && urls.length; i -= size) {
//         result.push(urls.splice(urls.length - size, size))
//     }
//
//     return result.reverse()
// }
//
// const arr = [
//     'one',
//     'two',
//     'three',
//     'four',
//     'five'
// ]

export const AuthForm = () => {
	const router = useRouter();

	const [variant, setVariant] = React.useState<VARIANT>(VARIANT.LOGIN);
	const [isLoading, setIsLoading] = React.useState(false);

	const toggleVariant = useCallback(() => {
		if (variant === VARIANT.LOGIN) {
			setVariant(VARIANT.REGISTER);
			localStorage.setItem('variant', VARIANT.REGISTER);
		} else if (variant === VARIANT.REGISTER) {
			setVariant(VARIANT.LOGIN);
			localStorage.setItem('variant', VARIANT.LOGIN);
		}
	}, [variant]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const socialAction = (action: SOCIAL_ACTION) => {
		setIsLoading(true);
		signIn(action, { redirect: false })
			.then((callback) => {
				if (callback?.error) {
					toast.error('Something went wrong');
				} else if (callback?.ok) {
					toast.success('Success');
					router.push('/users');
				}
			})
			.catch((error) => {
				console.log(error, 'Catch error');
				toast.error('Something went wrong');
				setIsLoading(false);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
		setIsLoading(true);

		try {
			if (variant === VARIANT.REGISTER) {
				await axios.post('/api/register', formData);
				await signIn('credentials', formData);
			} else if (variant === VARIANT.LOGIN) {
				await signIn('credentials', {
					...formData,
					redirect: false,
				}).then((callback) => {
					if (callback?.error) {
						toast.error('Something went wrong');
					} else if (callback?.ok) {
						toast.success('Success');
						router.push('/users');
					}
				});
			}
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setIsLoading(false);
			reset();
		}
	};

	// React.useEffect(() => {
	//     setVariant(() => {
	//         const storageVariant = localStorage.getItem('variant')
	//         if (storageVariant) {
	//             if (storageVariant === VARIANT.LOGIN) return VARIANT.LOGIN
	//             if (storageVariant === VARIANT.REGISTER) return VARIANT.REGISTER
	//         }
	//         return VARIANT.LOGIN
	//     })
	// }, [])

	// React.useLayoutEffect(() => {
	//     setVariant(() => {
	//         const storageVariant = localStorage.getItem('variant')
	//         if (storageVariant) {
	//             if (storageVariant === VARIANT.LOGIN) return VARIANT.LOGIN
	//             if (storageVariant === VARIANT.REGISTER) return VARIANT.REGISTER
	//         }
	//         return VARIANT.LOGIN
	//     })
	// }, [])

	return (
		<div className='flex min-h-full flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<Image
					src={logo}
					alt='messanger logo'
					width={48}
					height={48}
					className='mx-auto w-auto select-none'
				/>
				<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
					{variant === VARIANT.LOGIN
						? 'Sign in an account'
						: 'Sign up to your account'}
				</h2>

				<div className='mt-6 rounded bg-white p-6 shadow-sm'>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-6'
					>
						{variant === VARIANT.REGISTER && (
							<Input
								required
								id='name'
								label='Name'
								type='text'
								errors={errors}
								register={register}
								disabled={isLoading}
							/>
						)}

						<Input
							required
							id='email'
							label='Email address'
							type='email'
							errors={errors}
							register={register}
							disabled={isLoading}
						/>

						<Input
							required
							id='password'
							label='Password'
							type='password'
							errors={errors}
							register={register}
							disabled={isLoading}
						/>

						<Button disabled={isLoading} type='submit'>
							{variant === VARIANT.LOGIN ? 'Sign in' : 'Sign up'}
						</Button>
					</form>

					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-300' />
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='bg-white px-2 text-gray-500'>
									Or continue with
								</span>
							</div>
						</div>

						<div className='mt-6 flex gap-2'>
							<AuthSocialButton
								Icon={BsGithub}
								onClick={() => socialAction(SOCIAL_ACTION.GITHUB)}
							/>

							<AuthSocialButton
								Icon={BsGoogle}
								onClick={() => socialAction(SOCIAL_ACTION.GOOGLE)}
							/>
						</div>
					</div>

					<div className='mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500'>
						<div>
							{variant === VARIANT.LOGIN
								? 'New to messenger?'
								: 'Already have an account?'}
						</div>

						<div onClick={toggleVariant} className='cursor-pointer underline'>
							{variant === VARIANT.LOGIN ? 'Create an account' : 'Login'}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
