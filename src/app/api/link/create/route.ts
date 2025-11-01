import prisma from "@/app/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { originalUrl, shortenUrl, title, generateQR } = await req.json();
  const user = await currentUser();

  if (!user)
    return NextResponse.json(
      {
        error:
          "Error: Failed to retrieve user data while processing create new link",
        ok: false,
      },
      { status: 401 },
    );

  try {
    const isExistingShortenUrl = await prisma.link.findUnique({
      where: {
        shortenUrl: shortenUrl,
      },
    });

    if (isExistingShortenUrl)
      return NextResponse.json(
        {
          error: "Error: Shortened Url already exists please try again",
          ok: false,
        },
        { status: 401 },
      );

    const createLink = await prisma.link.create({
      data: {
        title: title,
        originalUrl: originalUrl,
        shortenUrl: shortenUrl,
        generateQR: generateQR,
        User: {
          connect: { email: user.primaryEmailAddress?.emailAddress },
        },
      },
    });

    if (!createLink)
      return NextResponse.json(
        { error: "Error: Failed to create new link", ok: false },
        { status: 401 },
      );

    return NextResponse.json({ ok: true, msg: "Success: New Link Created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error: error occured while creating new link", ok: false },
      { status: 500 },
    );
  }
}
