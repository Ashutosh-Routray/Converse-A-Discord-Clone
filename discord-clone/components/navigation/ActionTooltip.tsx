"use client";

import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface ActionTooltipProps {
    label: string;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}

const ActionTooltip: React.FC<ActionTooltipProps> = ({ label, children, side, align }) => {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={50}>
            <TooltipTrigger asChild={true}>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align} className='z-10'>
                <p className='font-semibold text-sm capitalize'>
                    {label.toLowerCase()}
                </p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default ActionTooltip