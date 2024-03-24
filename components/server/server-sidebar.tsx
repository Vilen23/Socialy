import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db';
import { Channeltype } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'
import ServerHeader from './server-header';

const ServerSidebar =  async({serverId}:{serverId:string}) => {
  const profile = await currentProfile();
  if(!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      Channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      Members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        }
      }
    }
  });

  if(!server) return redirect("/")

  const TextChannels = server?.Channels.filter((channel)=>channel.type === Channeltype.TEXT)
  const AudioChannels = server?.Channels.filter((channel)=>channel.type === Channeltype.AUDIO)
  const VideoChannels = server?.Channels.filter((channel)=>channel.type === Channeltype.VIDEO)

  const members = server?.Members.filter((member)=>member.profileId !== profile.id)

  const role = server?.Members.find((member)=>member.profileId === profile.id)?.role

  return (
    <div className='flex flex-col h-full text-black dark:text-white w-full dark:bg-[#2B2D31] bg-[#F2F3F5]  '>
      <ServerHeader
        server={{...server, members}}
        role={role}
      />
    </div>
  )
}

export default ServerSidebar
