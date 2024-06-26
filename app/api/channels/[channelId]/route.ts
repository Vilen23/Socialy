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
    if (!serverId) return new NextResponse("Invalid server", { status: 400 });
    const server = await db.server.update({
      where: {
        id: serverId,
        Members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            }
          }
        }
      },
      data: {
        Channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            }
          }
        }
      }
    });

    return NextResponse.json(server);

    return NextResponse.json(server);
  } catch (error) {
    console.log("DELETE_CHANNEL", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
