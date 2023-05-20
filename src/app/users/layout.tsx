import {getUsers} from "@/actions";
import {UserList} from "@/app/users/componenets";
import {Sidebar} from "@/components/Sidebar";
import React from 'react'

export default async function UsersLayout({
                                              children,
                                          }: {
    children: React.ReactNode
}) {

    const users = await getUsers()

    return <Sidebar>
        <div className='h-full'>
            <UserList users={users}/>
            {children}
        </div>
    </Sidebar>
}