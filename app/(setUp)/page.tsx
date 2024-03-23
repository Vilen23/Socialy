
import React from 'react'
import { initialUser } from '@/lib/initial-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation';
import { InitialModal } from '@/components/modals/initial-modal';
import { motion } from 'framer-motion';
const SetupPage = async() => {
    const profile = await initialUser();
    console.log(profile)
    const servers = await db.server.findFirst({
        where:{
            Members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    })

    if(servers){
        return redirect(`/servers/${servers.id}`)
    }

    return (
        <div>
            <InitialModal/>
        </div>
  )
}

export default SetupPage
