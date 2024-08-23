import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const db = new PrismaClient();

export async function GET() {
    try {
        const users = await db.user.findMany({
            where: {
                role: "USER"
            }
        });
        return NextResponse.json({ data: users }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ statusText: "Error", error: error.message }, { status: 500 });
    } finally {
        await db.$disconnect();
    }
}
