import React from 'react'
import { initialUser } from '@/lib/initial-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation';

const SetupPage = async() => {
    const profile = await initialUser();
    const servers = await db.server.findFirst({
        where:{
            Members:{
                some:{
                    id:profile.id
                }
            }
        }
    })

    if(servers){
        return redirect(`/server/${servers.id}`)
    }

    return (
        <div>
            Create a server
        </div>
  )
}

export default SetupPage
