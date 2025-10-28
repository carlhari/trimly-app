import prisma from "@/app/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  const { originalUrl, shortenUrl, title, generateQR } = await req.json();
  const user = await currentUser();

  if (!user)
    return NextResponse.json(
      {
        error:
          "Error: Failed to retrieve user data while processing create new link",
      },
      { status: 500 },
    );

  try {
    const createLink = await prisma.link.create({
      data: {
        title: title,
        originalUrl: originalUrl,
        shortenUrl: shortenUrl,
        generateQR: generateQR,
      },
    });

    if (!createLink)
      return NextResponse.json(
        { error: "Error: Failed to create new link" },
        { status: 400 },
      );

    return NextResponse.json({ ok: true, msg: "Success: New Link Created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error: error occured while creating  link" },
      { status: 500 },
    );
  }
}
