import { MediaRoom } from "@/components/MediaRoom";
import ChatHeader from "@/components/chat/Header";
import ChatInput from "@/components/chat/Input";
import ChatMessages from "@/components/chat/Messages";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ConversationsPageProps {
  params: {
    memberId: string;
    serverId: string;
  }
  searchParams: {
    video: boolean;
  }
}

export default async function ConversationsPage({ params: { memberId: profileId, serverId }, searchParams: { video }}: ConversationsPageProps) {
  const profile = await currentProfile();

  if(!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    }, 
    include: {
      profile: true,
    }
  });

  if(!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(currentMember.id, profileId);

  if(!conversation) {
    return redirect("/servers/" + serverId);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;
  const chatHeader = await ChatHeader({ name: otherMember.profile.name, type: "conversation", serverId, imageUrl: otherMember.profile.imageUrl });

  return (
    <main className="bg-white dark:bg-[#313338] flex flex-col h-full">
        {chatHeader}
        {!video && (
          <>
            <ChatMessages
              name={currentMember.profile.name}
              member={currentMember}
              chatId={conversation.id}
              apiUrl="/api/direct-messages"
              socketUrl="/api/socket/direct-messages"
              paramKey="conversationId"
              paramValue={conversation.id}
              type="conversation"
              socketQuery={{
                conversationId: conversation.id
              }}
            />
            <ChatInput
              name={otherMember.profile.name}
              type="conversation"
              apiUrl="/api/socket/direct-messages"
              query={{
                conversationId: conversation.id
              }}
            />
          </>
        )}
        {video && (
          <MediaRoom
            chatId={conversation.id}
            audio={true}
            video={true}
          />
        )}
    </main>
  )
}
