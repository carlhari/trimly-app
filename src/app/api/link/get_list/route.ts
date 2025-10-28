import prisma from "@/app/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await currentUser();

  if (!user)
    return NextResponse.json(
      { error: "Error: Failed to retrived user data while getting link list" },
      { status: 500 },
    );

  try {
    const linklist = await prisma.link.findMany({
      where: {
        User: {
          email: user.primaryEmailAddress?.emailAddress,
        },
      },
    });

    const linklistCount = await prisma.link.count({
      where: {
        User: {
          email: user.primaryEmailAddress?.emailAddress,
        },
      },
    });

    if (linklistCount === 0)
      return NextResponse.json({ ok: true, empty: true });

    if (linklist)
      return NextResponse.json(
        {
          data: linklist,
          ok: true,
          msg: "Log: Success retrieving link list data",
        },
        { status: 200 },
      );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        error: "Error: error occurred while processing to get link list",
      },
      { status: 500 },
    );
  }
}
