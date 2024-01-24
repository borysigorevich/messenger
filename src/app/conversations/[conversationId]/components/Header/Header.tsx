'use client'
import {ProfileDrawer} from "@/app/conversations/[conversationId]/components/Header/components/ProfileDrawer";
import {HeaderProps} from "@/app/conversations/[conversationId]/components/Header/types";
import {Avatar} from "@/components/Avatar";
import {useOtherUser} from "@/hooks/useOtherUser";
import {Conversation} from "@prisma/client";
import Link from "next/link";
import React, {useMemo, useState} from 'react';
import {HiChevronLeft, HiEllipsisHorizontal} from "react-icons/all";

export const Header: React.FC<HeaderProps> = (
    {
        conversation
    }
) => {

    const [drawerOpen, setDrawerOpen] = useState(false)

    const otherUser = useOtherUser(conversation)

    const statusText = useMemo(() => {
        if ((conversation as Conversation).isGroup) {
            return `${conversation?.users?.length} members`
        }

        return 'Active now'
    }, [conversation])

    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div
                className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 items-center justify-between
            shadow-sm'
            >
                <div className='flex gap-3 items-center'>
                    <Link
                        className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
                        href='/conversations'>
                        <HiChevronLeft size={32}/>
                    </Link>

                    <Avatar currentUser={otherUser}/>

                    <div className='flex flex-col'>
                        <div>{(conversation as Conversation).name || otherUser?.name}</div>
                        <div className='text-sm text-neutral-500 font-light'>{statusText}</div>
                    </div>
                </div>
                <HiEllipsisHorizontal

                    className='text-sky-500 hover:text-sky-600 transition cursor-pointer'
                    size={32}
                    onClick={() => {
                        setDrawerOpen(true)
                    }}/>
            </div>
        </>
    );
};