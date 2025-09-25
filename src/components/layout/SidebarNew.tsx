'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/contexts/SidebarContext';
import {
    HomeIcon,
    CreditCardIcon,
    SpeakerWaveIcon,
    CogIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    UserGroupIcon,
    BanknotesIcon,
    Bars3Icon,
    XMarkIcon,
    UsersIcon,
    UserPlusIcon,
    BellIcon,
    CubeIcon,
    ChartBarIcon,
    DocumentTextIcon,
    BuildingOfficeIcon,
    PuzzlePieceIcon,
    ChartPieIcon,
    MegaphoneIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
    LockClosedIcon,
    CircleStackIcon
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

type ThemeType = 'light' | 'blue' | 'dark';

const adminMenuItems: MenuItem[] = [
    {
        name: 'Home',
        href: '/admin/home',
        icon: HomeIcon,
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
        name: 'Sales Hub',
        href: '/app/sales-hub',
        icon: ChartPieIcon,
        subItems: [
            {
                name: 'Leads',
                href: '/app/sales-hub/leads',
                icon: UserPlusIcon,
            },
            {
                name: 'Deals',
                href: '/app/sales-hub/deals',
                icon: CurrencyDollarIcon,
            },
            {
                name: 'Policies',
                href: '/app/sales-hub/policies',
                icon: DocumentTextIcon,
            },
            {
                name: 'Report',
                href: '/app/sales-hub/report',
                icon: ChartBarIcon,
            }
        ]
    },
    {
        name: 'Advertising',
        href: '/app/advertising',
        icon: MegaphoneIcon,
        subItems: [
            {
                name: 'PageA',
                href: '/app/advertising/page-a',
                icon: SpeakerWaveIcon,
                subItems: [
                    {
                        name: 'Dashboard',
                        href: '/app/advertising/page-a/dashboard',
                        icon: HomeIcon,
                    },
                    {
                        name: 'Campaigns',
                        href: '/app/advertising/page-a/campaigns',
                        icon: MegaphoneIcon,
                    },
                    {
                        name: 'Audiences',
                        href: '/app/advertising/page-a/audiences',
                        icon: UsersIcon,
                    },
                    {
                        name: 'Billing & Payments',
                        href: '/app/advertising/page-a/billing',
                        icon: CreditCardIcon,
                    },
                    {
                        name: 'Facebook Integration',
                        href: '/app/advertising/page-a/facebook',
                        icon: PuzzlePieceIcon,
                    }
                ]
            }
        ]
    },
    {
        name: 'Marketing',
        href: '/app/marketing',
        icon: SpeakerWaveIcon,
        subItems: [
            {
                name: 'Conversations',
                href: '/app/marketing/conversations',
                icon: UserGroupIcon,
            },
            {
                name: 'Contacts',
                href: '/app/marketing/contacts',
                icon: UsersIcon,
            },
            {
                name: 'Workflow',
                href: '/app/marketing/workflow',
                icon: DocumentTextIcon,
            }
        ]
    },
    {
        name: 'Settings',
        href: '/app/settings',
        icon: CogIcon,
        subItems: [
            {
                name: 'Products',
                href: '/app/product-management',
                icon: CubeIcon,
            },
            {
                name: 'Data Configuration',
                href: '/app/settings/data-configuration',
                icon: CircleStackIcon,
            },
            {
                name: 'User',
                href: '/app/settings/user',
                icon: UserCircleIcon,
            },
            {
                name: 'Permission',
                href: '/app/settings/permission',
                icon: LockClosedIcon,
            },
            {
                name: 'Company Organization',
                href: '/app/settings/company-organization',
                icon: BuildingOfficeIcon,
            },
            {
                name: 'Notifications',
                href: '/app/settings/notifications',
                icon: BellIcon,
            },
            {
                name: 'Partner Apps',
                href: '/app/settings/partner-apps',
                icon: PuzzlePieceIcon,
            }
        ]
    },
];

export default function Sidebar({ mode = 'admin' }: SidebarProps) {
    const pathname = usePathname();
    const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set(['Sales Hub'])); // Use Set to track multiple open submenus
    const [openNestedSubmenu, setOpenNestedSubmenu] = useState<string | null>(null);
    const [sidebarTheme, setSidebarTheme] = useState<ThemeType>('light');
    const { isCollapsed, setIsCollapsed, isMobileMenuOpen, toggleMobileMenu } = useSidebar();

    const menuItems = mode === 'admin' ? adminMenuItems : appMenuItems;

    const toggleSubmenu = (menuName: string) => {
        setOpenSubmenus(prev => {
            const newSet = new Set(prev);
            if (menuName === 'Sales Hub') {
                // Allow Sales Hub to be toggled only if user explicitly clicks it
                if (newSet.has('Sales Hub')) {
                    newSet.delete('Sales Hub');
                } else {
                    newSet.add('Sales Hub');
                }
            } else {
                // For other menus, toggle them but always keep Sales Hub open
                if (newSet.has(menuName)) {
                    newSet.delete(menuName);
                } else {
                    newSet.add(menuName);
                }
                // Always ensure Sales Hub stays open
                newSet.add('Sales Hub');
            }
            return newSet;
        });
        setOpenNestedSubmenu(null); // Close nested when parent changes
    };

    const toggleNestedSubmenu = (menuName: string) => {
        setOpenNestedSubmenu(openNestedSubmenu === menuName ? null : menuName);
    };

    const closeMobileMenu = () => {
        // Using context function to close mobile menu
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        // Close submenus when collapsing, but keep Sales Hub open when expanding
        if (!isCollapsed) {
            setOpenSubmenus(new Set());
            setOpenNestedSubmenu(null);
        } else {
            // When expanding, restore Sales Hub as default open
            setOpenSubmenus(new Set(['Sales Hub']));
        }
    };

    const getThemeStyles = () => {
        switch (sidebarTheme) {
            case 'blue':
                return {
                    background: '#f5fafdff',
                    textColor: 'text-gray-700',
                    hoverBg: 'hover:bg-blue-100',
                    activeBg: 'bg-blue-100',
                    activeText: 'text-blue-800',
                    borderColor: 'border-blue-200',
                };
            case 'dark':
                return {
                    background: '#1f2937',
                    textColor: 'text-gray-300',
                    hoverBg: 'hover:bg-gray-700',
                    activeBg: 'bg-gray-600',
                    activeText: 'text-white',
                    borderColor: 'border-gray-600',
                };
            default: // light
                return {
                    background: 'white',
                    textColor: 'text-gray-700',
                    hoverBg: 'hover:bg-gray-100',
                    activeBg: 'bg-blue-50',
                    activeText: 'text-blue-600',
                    borderColor: 'border-gray-200',
                };
        }
    };

    const themeStyles = getThemeStyles();

    const renderMenuItem = (item: MenuItem, level: number = 0, onClose?: () => void) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isOpen = level === 0 ? openSubmenus.has(item.name) : openNestedSubmenu === item.name;
        const paddingLeft = level === 0 ? 'pl-6' : level === 1 ? 'pl-12' : 'pl-16'; // Increased padding to align with header icon

        // Don't render submenus when collapsed
        if (isCollapsed && level > 0) {
            return null;
        }

        if (hasSubItems) {
            return (
                <div key={item.name}>
                    <button
                        onClick={() => {
                            if (isCollapsed) return; // Don't open submenus when collapsed
                            if (level === 0) {
                                toggleSubmenu(item.name);
                            } else {
                                toggleNestedSubmenu(item.name);
                            }
                        }}
                        className={`group flex w-full items-center text-left leading-6 ${level === 0 ? 'font-semibold' : 'font-medium'} relative ${isCollapsed
                            ? 'justify-center p-2 mx-0'
                            : `gap-x-3 p-2 -mx-2 ${paddingLeft}`
                            } ${pathname === item.href
                                ? `${themeStyles.activeText} ${themeStyles.activeBg}`
                                : `${themeStyles.textColor} ${themeStyles.hoverBg}`
                            }`}
                        style={{
                            fontSize: '16px'
                        }}
                        title={isCollapsed ? item.name : undefined}
                    >
                        <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                        />
                        {!isCollapsed && (
                            <>
                                {item.name}
                                <ChevronDownIcon
                                    className={`ml-auto h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''} ${pathname === item.href
                                        ? sidebarTheme === 'dark' ? 'text-white' : 'text-blue-600'
                                        : sidebarTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </button>
                    {isOpen && !isCollapsed && (
                        <ul className="mt-1 space-y-1">
                            {item.subItems?.map((subItem) => (
                                <li key={subItem.name}>
                                    {renderMenuItem(subItem, level + 1, onClose)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`group flex gap-x-3 p-2 leading-6 ${level === 0 ? 'font-semibold' : 'font-medium'} relative -mx-2 ${isCollapsed ? 'justify-center px-0' : paddingLeft
                    } ${pathname === item.href
                        ? `${themeStyles.activeText} ${themeStyles.activeBg} before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-600`
                        : `${themeStyles.textColor} ${themeStyles.hoverBg}`
                    }`}
                style={{
                    fontSize: '16px'
                }}
                title={isCollapsed ? item.name : undefined}
            >
                <item.icon
                    className={`h-6 w-6 shrink-0 ${isCollapsed ? '' : ''}`}
                    aria-hidden="true"
                />
                {!isCollapsed && item.name}
            </Link>
        );
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
            <div className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 transition-all duration-300 ${isCollapsed ? 'md:w-16' : 'md:w-64'
                }`}>
                <nav
                    className={`flex flex-1 flex-col border-r ${themeStyles.borderColor} pb-4 pt-16 relative shadow-sm`}
                    style={{ backgroundColor: themeStyles.background }}
                > {/* Changed pt-20 to pt-16 for smaller header */}
                    {/* Collapse/Expand Toggle Button */}
                    <button
                        onClick={toggleCollapse}
                        className="absolute -right-3 top-16 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 border-2 border-gray-300 shadow-lg transition-all duration-200"
                        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {isCollapsed ? (
                            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                        ) : (
                            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                        )}
                    </button>

                    {/* Menu Items */}
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="space-y-1 px-2">{/* Added px-2 to allow -mx-2 on items to extend to edges */}
                                {menuItems.map((item) => (
                                    <li key={item.name}>
                                        {renderMenuItem(item, 0)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>

                    {/* Footer - Only show for app mode */}
                    {mode === 'app' && !isCollapsed && (
                        <div className={`px-4 py-3 border-t ${themeStyles.borderColor} mt-auto`}>
                            {/* Version and Theme Color Picker in same line */}
                            <div className="flex items-center justify-between">
                                <span className={`text-xs ${themeStyles.textColor}`}>7x CRM v1.01</span>
                                <div className="flex gap-2">
                                    {/* Light Theme */}
                                    <button
                                        onClick={() => setSidebarTheme('light')}
                                        className={`w-4 h-4 rounded-sm bg-white border-2 transition-all duration-200 ${sidebarTheme === 'light'
                                            ? 'border-blue-500 shadow-md scale-110'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        title="Light Theme"
                                    />

                                    {/* Blue Theme */}
                                    <button
                                        onClick={() => setSidebarTheme('blue')}
                                        className={`w-4 h-4 rounded-sm border-2 transition-all duration-200 ${sidebarTheme === 'blue'
                                            ? 'border-blue-500 shadow-md scale-110'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        style={{ backgroundColor: '#e8f4f8' }}
                                        title="Blue Theme"
                                    />

                                    {/* Dark Theme */}
                                    <button
                                        onClick={() => setSidebarTheme('dark')}
                                        className={`w-4 h-4 rounded-sm bg-gray-800 border-2 transition-all duration-200 ${sidebarTheme === 'dark'
                                            ? 'border-blue-500 shadow-md scale-110'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        title="Dark Theme"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            </div>

            {/* Mobile sidebar overlay */}
            <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                {/* Background overlay - Match Customize Panel styling */}
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm mobile-sidebar-backdrop"
                    onClick={closeMobileMenu}
                ></div>
                {/* Sidebar with slide animation - Match Customize Panel styling */}
                <nav
                    className={`fixed top-0 left-0 bottom-0 flex w-[240px] flex-col backdrop-blur-md border-r ${themeStyles.borderColor} px-4 pb-4 pt-16 shadow-2xl mobile-sidebar-glass transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    style={{ backgroundColor: sidebarTheme === 'light' ? 'rgba(255, 255, 255, 0.9)' : sidebarTheme === 'blue' ? 'rgba(232, 244, 248, 0.9)' : 'rgba(31, 41, 55, 0.9)' }}
                >
                    {/* Menu Items - No branding section needed since it's in header */}
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="space-y-1 px-2">{/* Consistent with desktop version, added px-2 */}
                                {menuItems.map((item) => (
                                    <li key={item.name}>
                                        {renderMenuItem(item, 0, closeMobileMenu)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>

                    {/* Mobile Footer - Only show for app mode */}
                    {mode === 'app' && (
                        <div className={`px-2 py-3 border-t ${themeStyles.borderColor} mt-auto`}>
                            {/* Version and Theme Color Picker in same line */}
                            <div className="flex items-center justify-between">
                                <span className={`text-xs ${themeStyles.textColor}`}>7x CRM v1.01</span>
                                <div className="flex gap-2">
                                    {/* Light Theme */}
                                    <button
                                        onClick={() => setSidebarTheme('light')}
                                        className={`w-4 h-4 rounded-sm bg-white border-2 transition-all duration-200 ${sidebarTheme === 'light'
                                            ? 'border-blue-500 shadow-md scale-110'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        title="Light Theme"
                                    />

                                    {/* Blue Theme */}
                                    <button
                                        onClick={() => setSidebarTheme('blue')}
                                        className={`w-4 h-4 rounded-sm border-2 transition-all duration-200 ${sidebarTheme === 'blue'
                                            ? 'border-blue-500 shadow-md scale-110'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        style={{ backgroundColor: '#e8f4f8' }}
                                        title="Blue Theme"
                                    />

                                    {/* Dark Theme */}
                                    <button
                                        onClick={() => setSidebarTheme('dark')}
                                        className={`w-4 h-4 rounded-sm bg-gray-800 border-2 transition-all duration-200 ${sidebarTheme === 'dark'
                                            ? 'border-blue-500 shadow-md scale-110'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        title="Dark Theme"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </>
    );
}