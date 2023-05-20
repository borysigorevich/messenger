import {User} from "@prisma/client";
import {useSession} from "next-auth/react";
import {useMemo} from "react";
import {FullConversationType} from "../../types";

export const useOtherUser = (
    conversation: FullConversationType | { users: User[] }
) => {
    const session = useSession()

    return useMemo(() => {
        const currentUser = session?.data?.user

        return conversation.users.find(user => user.email !== currentUser?.email) || null
    }, [session?.data?.user?.email, conversation.users])
}