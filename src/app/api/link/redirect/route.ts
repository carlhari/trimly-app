import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { shortenUrl } = await req.json();

  try {
    const linkdetails = await prisma.link.findUnique({
      where: {
        shortenUrl: shortenUrl,
      },
    });
    if (!linkdetails)
      return NextResponse.json(
        {
          error: "Error: Failed to get link details",
          ok: false,
        },
        { status: 401 },
      );

    const views = await prisma.link.update({
      where: {
        id: linkdetails.id,
      },

      data: {
        views: { increment: 1 },
      },
    });

    if (!views)
      return NextResponse.json({
        error: "Error: Failed to add view count while processing redirect",
        ok: false,
      });

    return NextResponse.json({
      ok: true,
      url: linkdetails.originalUrl,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error: error occured while creating new link", ok: false },
      { status: 500 },
    );
  }
}
