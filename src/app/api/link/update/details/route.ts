import prisma from "@/app/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const user = await currentUser();

  if (!user)
    return NextResponse.json(
      {
        error:
          "Error: Failed to retrieve user data while processing getting the link detail",
        ok: false,
      },
      { status: 401 },
    );
  try {
    const checkLinkDetails = await prisma.link.findUnique({
      where: {
        id: id,
        User: {
          email: user.primaryEmailAddress?.emailAddress,
        },
      },
    });

    if (!checkLinkDetails)
      return NextResponse.json(
        {
          error: "Error: Failed to find Link details",
          ok: false,
        },
        { status: 401 },
      );

    const linklist = await prisma.link.findUnique({
      where: {
        id: id,
        User: {
          email: user.primaryEmailAddress?.emailAddress,
        },
      },
    });

    if (!linklist)
      return NextResponse.json(
        {
          error: "Error: Failed to get link details to update",
          ok: false,
        },
        { status: 401 },
      );

    return NextResponse.json({ ok: true, list: linklist });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error: error occurred while processing getting link details",
        ok: false,
      },
      { status: 401 },
    );
  }
}
