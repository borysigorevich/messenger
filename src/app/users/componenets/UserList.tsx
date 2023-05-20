'use client'
import {UserBox} from "@/app/users/componenets/components/UserBox";
import {UserListProps} from "@/app/users/componenets/types";
import React from 'react';

export const UserList: React.FC<UserListProps> = (
    {
        users,
    }
) => {

    return (
        <aside className='fixed inset-0 pb-20 lg:pb-0 lg:block lg:w-80 left-0 lg:left-20 overflow-y-auto
        border-r border-gray-200  block w-full
        '>
            <div className='px-5'>
                <div className='flex-col flex'>
                    <div className='text-2xl font-bold text-neutral-800 py-4'>
                        People
                    </div>
                </div>
                {users?.map((user) => (
                    <UserBox
                        key={user.id}
                        user={user}
                    />
                ))
                }
            </div>
        </aside>
    );
};