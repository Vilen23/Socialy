import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server id is missing", { status: 401 });
    const { name, type } = await req.json();
    const server = await db.server.update({
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
          update: {
            where: {
              id: params.channelId,
              NOT:{
                name:"general"
              }
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });
    return NextResponse.json(server)
  } catch (error) {
    console.log("[EDIT_CHANNEL]", error);
    return new NextResponse("Internal serevr error", { status: 500 });
  }
}
