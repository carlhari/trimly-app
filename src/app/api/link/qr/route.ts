import prisma from "@/app/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
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
    const getdetails = await prisma.link.findUnique({
      where: {
        id: id,
        User: {
          email: user.primaryEmailAddress?.emailAddress,
        },
      },
      select: {
        shortenUrl: true,
        generateQR: true,
      },
    });

    if (!getdetails)
      return NextResponse.json(
        {
          error: "Error: Failed to retrieve link details",
          ok: false,
        },
        { status: 401 },
      );

    if (!getdetails?.generateQR)
      return NextResponse.json(
        { error: "Error: Disabled QR generation please try again", ok: false },
        { status: 401 },
      );

    return NextResponse.json({ ok: true, shortenUrl: getdetails.shortenUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error: error occured while creating new link", ok: false },
      { status: 500 },
    );
  }
}
