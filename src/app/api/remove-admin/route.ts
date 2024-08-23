import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    const res = await request.json();
    const { id } = res;
    try {
        const admins = await db.user.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json({ admins }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ statusText: "Error", error: error.message }, { status: 500 });
    } finally {
        await db.$disconnect();
    }
}
