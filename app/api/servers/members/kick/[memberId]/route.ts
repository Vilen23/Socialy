import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{params}:{params:{memberId:string}}){
    try {
        const profile = await currentProfile();
        if(!profile) return new NextResponse("Unauthorized",{status:401})
        const {serverId} = await req.json();
        const kick = await db.server.update({
            where:{
                id:serverId
            },
            data:{
                Members:{
                    delete:{
                        id:params.memberId
                    }
                }
            },
            include:{
                Members:{
                    include:{
                        profile:true
                    },
                    orderBy:{
                        role:"asc"
                    }
                }
            }
        })
        return NextResponse.json(kick)
    } catch (error) {
        console.log("[MEMBER_ID]",error)
        return new NextResponse("Internal Error",{status:500})
    }
}