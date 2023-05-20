'use client'
import {ConversationBoxProps} from "@/app/conversations/components/ConversationList/ConversationBox/types";
import {Avatar} from "@/components/Avatar";
import {useOtherUser} from "@/hooks/useOtherUser";
import clsx from "clsx";
import {format} from 'date-fns'
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import React, {useMemo} from 'react';

export const ConversationBox: React.FC<ConversationBoxProps> = (
    {data, selected}
) => {
    const otherUser = useOtherUser(data)
    const session = useSession()
    const router = useRouter()

    const handleClick = () => {
        router.push(`/conversations/${data.id}`)
    }
    
    const lastMessage = useMemo(() => {
        const messages = data.messages || []
        return messages[data.messages.length - 1]
    }, [data])

    const hasSeen = useMemo(() => {
        const userEmail = session?.data?.user?.email

        if (!lastMessage) return false

        const seenArray = lastMessage.seen || []

        if (!userEmail) return false

        return seenArray.filter(user => user.email === userEmail).length > 0
    }, [lastMessage, session])

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent an image'
        }

        if (lastMessage?.body) {
            return lastMessage.body
        }

        return 'Started a conversation'
    }, [lastMessage])

    return (
        <div onClick={handleClick}>
            <div
                className={clsx(
                    `w-full p-3 relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg cursor-pointer transition`,
                    selected ? 'bg-neutral-100' : 'bg-white'
                )}
            >
                <Avatar currentUser={otherUser}/>

                <div className='flex-1 min-w-0'>
                    <div className='focus:outline-none'>
                        <div className='flex justify-between items-center mb-1'>
                            <p className='text-md font-medium text-gray-900'>{data?.name || otherUser?.name}</p>
                            {lastMessage?.createdAt && (
                                <p>{format(new Date(lastMessage?.createdAt), 'p')}</p>
                            )}
                        </div>
                        <p
                            className={clsx(
                                `text-sm truncate`,
                                hasSeen ? 'text-gray-500' : 'font-medium text-black'
                            )}
                        >{lastMessageText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};