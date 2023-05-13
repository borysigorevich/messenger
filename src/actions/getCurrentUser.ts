import {getSession} from "@/actions/getSession";
import prisma from "@/libs/prismadb";

export const getCurrentUser = async () => {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }

        const currentUser = await prisma.user.findFirst({
            where: {
                email: session?.user?.email || undefined
            }
        })

        if(!currentUser) return null
        return currentUser

    } catch (error: any) {
        return null
    }
}