
import React from 'react'
import { initialUser } from '@/lib/initial-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation';
import { InitialModal } from '@/components/modals/initial-modal';
import { motion } from 'framer-motion';
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
            <InitialModal/>
        </div>
  )
}

export default SetupPage
