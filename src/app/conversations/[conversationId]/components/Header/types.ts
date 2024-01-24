import {Conversation, User} from "@prisma/client";
import {FullConversationType} from "../../../../../../types";

export type HeaderProps = {
    conversation: Conversation & { users: User[] }
}