import { prisma } from "@/libs/pisma";

export async function getTasks(tenantId: number) {
    return await prisma.task.findMany({
        where: { tenantId }
    })
}