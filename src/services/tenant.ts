import { prisma } from "@/libs/pisma";

export async function getTenanant(host: string){
    const tenant = await prisma.tenant.findFirst({
        where: { host }
    });
    return tenant;
}