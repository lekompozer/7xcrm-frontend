'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    CreditCardIcon,
    SpeakerWaveIcon,
    CogIcon,
    ChevronDownIcon,
    UserGroupIcon,
    BanknotesIcon
} from '@heroicons/react/24/outline'; const menuItems = [
    {
        name: 'Home',
        href: '/home',
        icon: HomeIcon,
    },
    {
        name: 'Subscription Management',
        href: '/subscription-management',
        icon: CreditCardIcon,
    },
    {
        name: 'Marketing Services',
        href: '/marketing-services',
        icon: SpeakerWaveIcon,
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: CogIcon,
        children: [
            {
                name: 'User Management',
                href: '/settings/user-management',
                icon: UserGroupIcon,
            },
            {
                name: 'Payment Management',
                href: '/settings/payment-management',
                icon: BanknotesIcon,
            },
        ],
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (menuName: string) => {
        setOpenSubmenu(openSubmenu === menuName ? null : menuName);
    };

    return (
        <div className="flex h-full w-64 flex-col bg-gray-900" style={{ width: '256px' }}>
            <div className="flex h-16 shrink-0 items-center px-4">
                <h1 className="text-xl font-bold text-white">7x CRM Admin</h1>
            </div>
            <nav className="flex flex-1 flex-col px-4 pb-4">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    {!item.children ? (
                                        <Link
                                            href={item.href}
                                            className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${pathname === item.href
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                }`}
                                        >
                                            <item.icon
                                                className="h-6 w-6 shrink-0"
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <div>
                                            <button
                                                onClick={() => toggleSubmenu(item.name)}
                                                className={`group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm leading-6 font-semibold ${pathname.startsWith(item.href)
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                    }`}
                                            >
                                                <item.icon
                                                    className="h-6 w-6 shrink-0"
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                                <ChevronDownIcon
                                                    className={`ml-auto h-5 w-5 shrink-0 transition-transform ${openSubmenu === item.name ? 'rotate-180' : ''
                                                        }`}
                                                    aria-hidden="true"
                                                />
                                            </button>
                                            {openSubmenu === item.name && (
                                                <ul className="mt-1 px-2">
                                                    {item.children.map((subItem) => (
                                                        <li key={subItem.name}>
                                                            <Link
                                                                href={subItem.href}
                                                                className={`group flex gap-x-3 rounded-md py-2 pl-8 pr-2 text-sm leading-6 ${pathname === subItem.href
                                                                    ? 'bg-gray-800 text-white font-semibold'
                                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                                    }`}
                                                            >
                                                                <subItem.icon
                                                                    className="h-5 w-5 shrink-0"
                                                                    aria-hidden="true"
                                                                />
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
