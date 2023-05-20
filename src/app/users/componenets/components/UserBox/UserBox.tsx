'use client';
import {UserBoxProps} from "@/app/users/componenets/components/UserBox/types";
import {Avatar} from "@/components/Avatar";
import axios from "axios";
import {useRouter} from "next/navigation";
import React from 'react';

export const UserBox: React.FC<UserBoxProps> = (
    {
        user
    }
) => {

    const router = useRouter()
    const [loading, setLoading] = React.useState(false)

    const handleClick = React.useCallback(() => {
        setLoading(true)
        axios.post('/api/conversations', {
            userId: user.id
        }).then(({data}) => {
            router.push(`/conversations/${data.id}`)
        }).finally(() => {
            setLoading(false)
        })

    }, [router, user])

    return (
        <div
            onClick={handleClick}
            className='flex items-center w-full relative space-x-3 bg-white p-3 rounded-lg cursor-pointer
         hover:bg-neutral-100 transition duration-300'
        >
            <Avatar currentUser={user}/>

            <div className='min-w-0 flex-1'>
                <div className='focus:outline-none'>
                    <div className='flex justify-between items-center mb-1'>
                        <p className='text-sm font-medium text-gray-900'>
                            {user.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};