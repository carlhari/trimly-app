import prisma from "@/app/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { idList } = await req.json();
  const user = await currentUser();

  if (!user)
    return NextResponse.json(
      {
        error: "Error: Failed to retrieve user data while deleting link",
        ok: false,
      },
      { status: 500 },
    );

  try {
    const deleteLink = await prisma.link.deleteMany({
      where: {
        id: {
          in: idList,
        },
      },
    });

    if (!deleteLink)
      return NextResponse.json(
        { error: "Error: Failed to delete the link", ok: false },
        { status: 500 },
      );
    revalidatePath("/dashboard");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error: error occurred while processing the delete of an link",
        ok: false,
      },
      { status: 500 },
    );
  }
}
