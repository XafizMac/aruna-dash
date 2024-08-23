import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    const res = await request.json();
    const { id, status } = res;
    try {
        const users = await db.user.update({
            where: {
                id: id
            },
            data: {
                status: status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
            }
        })
        return NextResponse.json({ data: users }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ statusText: "Error", error: error.message }, { status: 500 });
    } finally {
        await db.$disconnect();
    }
}
