import React from 'react'

import { Avatar, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
    src?: string;
    className?: string;

}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, className }) => {
  return (
    <Avatar className={cn("aspect-square w-7 md:w-10", className)}>
        <AvatarImage src={src} />
    </Avatar>
  )
}

export default UserAvatar;
