'use client'
import {Avatar} from "@/components/Avatar";
import {DesktopItem} from "@/components/DesktopSidebar/components/DesktopItem";
import {DesktopSidebarProps} from "@/components/DesktopSidebar/types";
import {useRoutes} from "@/hooks/useRoutes";
import React from 'react';

export const DesktopSidebar: React.FC<DesktopSidebarProps> = (
    {
        currentUser
    }
) => {
    const routes = useRoutes()
    const [isOpen, setIsOpen] = React.useState(false)

    const handleOpen = () => setIsOpen(true)

    return (
        <div
            className='hidden lg:fixed lg:left-0 lg:inset-y-0 lg:z-40 lg:w-20 lg:overflow-y-auto lg:bg-white
            lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col xl:px-6 lg:justify-between'
        >
            <nav className='mt-4 flex flex-col justify-between'>
                <ul
                    role='list'
                    className='flex flex-col items-center gap-1'
                >
                    {routes.map(route => (
                        <DesktopItem
                            key={route.label}
                            label={route.label}
                            href={route.href}
                            onClick={route.onClick}
                            icon={route.icon}
                            active={route.active}
                        />
                    ))}
                </ul>
            </nav>

            <nav className='mt-4 flex flex-col justify-between items-center'>
                <div
                    onClick={handleOpen}
                    className='cursor-pointer hover:opacity-75 transition'
                >
                    <Avatar
                        currentUser={currentUser}
                    />
                </div>
            </nav>
        </div>
    );
};