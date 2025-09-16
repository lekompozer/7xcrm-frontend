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
    BanknotesIcon,
    Bars3Icon,
    XMarkIcon,
    UsersIcon,
    UserPlusIcon
} from '@heroicons/react/24/outline'; const menuItems = [
    {
        name: 'Home',
        href: '/home',
        icon: HomeIcon,
    },
    {
        name: 'Lead Management',
        href: '/lead-management',
        icon: UserPlusIcon,
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
        name: 'Marketing Assistant',
        href: '/marketing-assistants',
        icon: UsersIcon,
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSubmenu = (menuName: string) => {
        setOpenSubmenu(openSubmenu === menuName ? null : menuName);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileMenu}
                className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white md:hidden"
            >
                <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    flex h-full flex-col
                    md:w-64 md:relative md:translate-x-0
                    fixed w-64 top-0 left-0 z-50 transition-transform duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
                style={{ backgroundColor: '#000820' }}
            >
                {/* Mobile Close Button */}
                <button
                    onClick={closeMobileMenu}
                    className="absolute top-4 right-4 p-2 text-white md:hidden"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

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
                                                onClick={closeMobileMenu}
                                                className={`group flex gap-x-3 p-2 leading-6 font-medium ${pathname === item.href
                                                    ? 'text-white border-l-4 border-blue-600 -mx-2'
                                                    : 'hover:text-white hover:bg-gray-700 rounded-md'
                                                    }`}
                                                style={{
                                                    fontSize: '14px',
                                                    color: pathname === item.href ? 'white' : '#AEBEE1',
                                                    backgroundColor: pathname === item.href ? '#0A1330' : undefined
                                                }}
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
                                                    className={`group flex w-full items-center gap-x-3 p-2 text-left leading-6 font-medium ${pathname.startsWith(item.href)
                                                        ? 'text-white border-l-4 border-blue-600 -mx-2'
                                                        : 'hover:text-white hover:bg-gray-700 rounded-md'
                                                        }`}
                                                    style={{
                                                        fontSize: '14px',
                                                        color: pathname.startsWith(item.href) ? 'white' : '#AEBEE1',
                                                        backgroundColor: pathname.startsWith(item.href) ? '#0A1330' : undefined
                                                    }}
                                                >
                                                    <item.icon
                                                        className="h-6 w-6 shrink-0"
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                    <ChevronDownIcon
                                                        className={`ml-auto h-5 w-5 shrink-0 transition-transform ${openSubmenu === item.name ? 'rotate-180' : ''
                                                            }`}
                                                        style={{
                                                            color: pathname.startsWith(item.href) ? 'white' : '#AEBEE1'
                                                        }}
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                                {openSubmenu === item.name && (
                                                    <ul className="mt-1 px-2">
                                                        {item.children.map((subItem) => (
                                                            <li key={subItem.name}>
                                                                <Link
                                                                    href={subItem.href}
                                                                    onClick={closeMobileMenu}
                                                                    className={`group flex gap-x-3 py-2 pl-8 pr-2 leading-6 font-medium ${pathname === subItem.href
                                                                        ? 'text-white border-l-4 border-blue-600 -mx-2'
                                                                        : 'hover:text-white hover:bg-gray-700 rounded-md'
                                                                        }`}
                                                                    style={{
                                                                        fontSize: '14px',
                                                                        color: pathname === subItem.href ? 'white' : '#AEBEE1',
                                                                        backgroundColor: pathname === subItem.href ? '#0A1330' : undefined
                                                                    }}
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
        </>
    );
}
