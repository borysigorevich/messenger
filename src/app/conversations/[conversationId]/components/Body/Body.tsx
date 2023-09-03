'use client'
import {MessageBox} from "@/app/conversations/[conversationId]/components/Body/components/MessageBox";
import {BodyProps} from "@/app/conversations/[conversationId]/components/Body/types";
import {useConversation} from "@/hooks/useConversation";
import axios from "axios";
import React, {useEffect, useRef, useState} from 'react';

export const Body: React.FC<BodyProps> = (
    {
        initialMessages
    }
) => {

    const [initialMessagesState, setInitialMessageState] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement | null>(null)

    const {conversationId} = useConversation()

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    return (
        <div className='flex-1 overflow-y-auto'>
            {initialMessagesState.map((message, index) => (
                <MessageBox
                    key={message.id}
                    data={message}
                    isLast={index === initialMessagesState.length - 1}
                />
            ))}

            <div ref={bottomRef} className='pt-24'/>
        </div>
    );
};