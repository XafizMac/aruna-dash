import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    const res = await request.json();
    const { email, username } = res;

    try {
        const admins = await db.user.create({
            data: {
                username,
                email,
                role: "ADMIN",
                status: "ACTIVE",
            }
        })
        return NextResponse.json({ admins }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ statusText: "Error", error: error.message }, { status: 500 });
    } finally {
        await db.$disconnect();
    }
}
