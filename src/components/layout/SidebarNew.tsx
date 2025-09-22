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
    UserPlusIcon,
    BellIcon,
    CubeIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
    mode?: 'admin' | 'app';
}

interface MenuItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    subItems?: MenuItem[];
}

const adminMenuItems: MenuItem[] = [
    {
        name: 'Home',
        href: '/admin/home',
        icon: HomeIcon,
    },
    {
        name: 'Lead Management',
        href: '/admin/lead-management',
        icon: UserPlusIcon,
    },
    {
        name: 'Product Management',
        href: '/admin/product-management',
        icon: CubeIcon,
    },
    {
        name: 'Subscription Management',
        href: '/admin/subscription-management',
        icon: CreditCardIcon,
    },
    {
        name: 'Marketing Services',
        href: '/admin/marketing-services',
        icon: SpeakerWaveIcon,
    },
    {
        name: 'Marketing Assistant',
        href: '/admin/marketing-assistants',
        icon: UsersIcon,
    },
    {
        name: 'Usage & Plan',
        href: '/admin/usage-plan',
        icon: ChartBarIcon,
    },
    {
        name: 'Settings',
        href: '/admin/settings',
        icon: CogIcon,
        subItems: [
            {
                name: 'User Management',
                href: '/admin/settings/user-management',
                icon: UserGroupIcon,
            },
            {
                name: 'Payment Management',
                href: '/admin/settings/payment-management',
                icon: BanknotesIcon,
            },
            {
                name: 'Notifications',
                href: '/admin/settings/notifications',
                icon: BellIcon,
            }
        ]
    },
];

const appMenuItems: MenuItem[] = [
    {
        name: 'Dashboard',
        href: '/app/home',
        icon: HomeIcon,
    },
    {
        name: 'Lead Management',
        href: '/app/lead-management',
        icon: UserPlusIcon,
    },
    {
        name: 'Marketing Services',
        href: '/app/marketing-services',
        icon: SpeakerWaveIcon,
    },
    {
        name: 'Product Management',
        href: '/app/product-management',
        icon: CubeIcon,
    },
    {
        name: 'Settings',
        href: '/app/settings',
        icon: CogIcon,
    },
];

export default function Sidebar({ mode = 'admin' }: SidebarProps) {
    const pathname = usePathname();
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = mode === 'admin' ? adminMenuItems : appMenuItems;

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
            {/* Mobile menu button */}
            <div className="md:hidden">
                <button
                    onClick={toggleMobileMenu}
                    className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                    {isMobileMenuOpen ? (
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    )}
                </button>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <nav className="flex flex-1 flex-col bg-gray-800 px-4 pb-4 pt-5">
                    <div className="flex h-16 flex-shrink-0 items-center px-4">
                        <Link href={mode === 'admin' ? '/admin/home' : '/app/home'} className="text-white text-lg font-bold">
                            7x CRM {mode === 'admin' ? 'Admin' : ''}
                        </Link>
                    </div>
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {menuItems.map((item) => (
                                    <li key={item.name}>
                                        {'subItems' in item ? (
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
                                                        {item.subItems?.map((subItem) => (
                                                            <li key={subItem.name}>
                                                                <Link
                                                                    href={subItem.href}
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
                                        ) : (
                                            <Link
                                                href={item.href}
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
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Mobile sidebar */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={closeMobileMenu}></div>
                    <nav className="fixed top-0 left-0 bottom-0 flex w-5/6 max-w-sm flex-col bg-gray-800 px-4 pb-4 pt-16">
                        <div className="flex h-16 flex-shrink-0 items-center px-4">
                            <Link href={mode === 'admin' ? '/admin/home' : '/app/home'} className="text-white text-lg font-bold">
                                7x CRM {mode === 'admin' ? 'Admin' : ''}
                            </Link>
                        </div>
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {menuItems.map((item) => (
                                        <li key={item.name}>
                                            {'subItems' in item ? (
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
                                                            {item.subItems?.map((subItem) => (
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
                                            ) : (
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
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
}