import {getCurrentUser} from "@/actions";
import {NextResponse} from "next/server";
import prisma from '@/libs/prismadb'

type RequestBodyType = {
    message: string
    image: string
    conversationId: any
}

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const body = await req.json()
        const {
            message,
            image,
            conversationId
        } = body as unknown as RequestBodyType

        const newMessage = await prisma.message.create({
            data: {
                image,
                body: message,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seen: true,
                sender: true
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })

        return NextResponse.json(newMessage)

    } catch (error: any) {
        console.log(error)
        return new NextResponse('Internal error', {status: 500})
    }
}