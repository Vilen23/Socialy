import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        const profile =  await currentProfile();
        if(!profile) return new NextResponse("Unauthorized access",{status:400})
        const {searchParams} = new URL(req.url);
        const serverId = searchParams.get("serverId")
        if(!serverId) return new NextResponse("Server id is missing",{status:400})

        const server = await db.server.delete({
            where:{
                id:serverId,
                profileId:profile.id
            }
        })
        return new NextResponse("Server deleted",{status:200})
    } catch (error) {
        console.log("DELETE_SERVER",error);
        return new NextResponse("Internal server error",{status:500})
        
    }
}