import prisma from "@/app/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, title, originalUrl, generateQR } = await req.json();
  const user = await currentUser();
  if (!user)
    return NextResponse.json({
      error:
        "Error: Failed to retrieve user information while processing the update",
      ok: false,
    });
  try {
    const update = await prisma.link.update({
      where: {
        id: id,
        User: {
          email: user.primaryEmailAddress?.emailAddress,
        },
      },
      data: {
        title: title,
        originalUrl: originalUrl,
        generateQR: generateQR,
      },
    });

    if (!update)
      return NextResponse.json(
        {
          error: "Error: Failed to update the link detail",
          ok: false,
        },
        { status: 500 },
      );

    return NextResponse.json({
      ok: true,
      msg: "Success: Link details Updated",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error: error occurred while updating link details",
        ok: false,
      },
      { status: 500 },
    );
  }
}
