import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server Id missing", { status: 401 });
    const { name, type } = await req.json();
    if(name==="general") return new NextResponse("Name cannot be general",{status:400})
    const channel = await db.server.update({
      where: {
        id: serverId,
        Members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        Channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });
    return NextResponse.json(channel)
  } catch (error) {
    console.log("CREATE_CHANNEL", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
