import {User} from "@prisma/client";
import {FullConversationType} from "../../../../../../types";

export type HeaderProps = {
    conversation: FullConversationType | { users: User[] }
}