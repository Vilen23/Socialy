import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request 
) {
  try {
    const profile = await currentProfile();
    if (!profile)
    return new NextResponse("Unauthorized access", { status: 400 });
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server id missing", { status: 400 });
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId:{
          not: profile.id
        },
        Members:{
          some:{
            profileId:profile.id
          }
        }
      },
      data:{
        Members:{
          deleteMany:{
            profileId:profile.id
          }
        }
      }
      
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[LEAVE_SERVER]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
