import {Sidebar} from "@/components/Sidebar";
import React from 'react'

export default function UsersLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {

    return <Sidebar>
        <div className='h-full'>
            {children}
        </div>
    </Sidebar>
}