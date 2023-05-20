import {getConversationById} from "@/actions/getConversationById";
import {getMessages} from "@/actions/getMessages";
import {Body} from "@/app/conversations/[conversationId]/components/Body";
import {Form} from "@/app/conversations/[conversationId]/components/Form";
import {Header} from "@/app/conversations/[conversationId]/components/Header";
import {EmptyState} from "@/components/EmptyState";
import React from 'react';

type ParamsType = {
    conversationId: string
}

const Conversation = async ({params}: { params: ParamsType }) => {

    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (<div className='lg:pl-80 h-full'>
            <div className='h-full flex flex-col'>
                <EmptyState/>
            </div>
        </div>)
    }

    return (
        <div className='lg:pl-80 h-full'>
            <div className='h-full flex flex-col'>
                <Header
                    conversation={conversation}
                />
                <Body
                    initialMessages={messages || []}
                />
                <Form/>
            </div>
        </div>
    );
};

export default Conversation;