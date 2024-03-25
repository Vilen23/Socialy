import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Channeltype, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./Server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

const IconMap = {
  [Channeltype.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [Channeltype.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [Channeltype.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
};

const ServerSidebar = async ({ serverId }: { serverId: string }) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");

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
        },
      },
    },
  });

  if (!server) return redirect("/");

  const TextChannels = server?.Channels.filter(
    (channel) => channel.type === Channeltype.TEXT
  );
  const AudioChannels = server?.Channels.filter(
    (channel) => channel.type === Channeltype.AUDIO
  );
  const VideoChannels = server?.Channels.filter(
    (channel) => channel.type === Channeltype.VIDEO
  );

  const members = server?.Members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server?.Members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-black dark:text-white w-full dark:bg-[#2B2D31] bg-[#F2F3F5]  ">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: TextChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: AudioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: VideoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!TextChannels?.length && (
          <div className="mb-4">
            <ServerSection
              sectionType="channels"
              channelType={Channeltype.TEXT}
              role={role}
              label="Text Channels"
            />
            {TextChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
        {!!AudioChannels?.length && (
          <div className="mb-4">
            <ServerSection
              sectionType="channels"
              channelType={Channeltype.AUDIO}
              role={role}
              label="Voice Channels"
            />
            {AudioChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
        {!!VideoChannels?.length && (
          <div className="mb-4">
            <ServerSection
              sectionType="channels"
              channelType={Channeltype.VIDEO}
              role={role}
              label="Video Channels"
            />
            {VideoChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
        {!!members?.length && (
          <div className="mb-4">
            <ServerSection sectionType="members" role={role} label="Members" server={server}/>
            {members.map((member) => (
              <ServerMember member={member} server={server} key={member.id}/>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
