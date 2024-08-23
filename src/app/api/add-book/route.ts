import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export default async function POST(requst: NextRequest) {
    // const addbook = await db.book.create({
    //     data: {
    //         name: "",
    //         author: "",
    //         category: {}
    //     }
    // })

    return NextResponse
}