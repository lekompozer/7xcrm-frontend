'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSidebar } from '../../contexts/SidebarContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
    ChevronDownIcon,
    UserIcon,
    EnvelopeIcon,
    ArrowRightOnRectangleIcon,
    BellIcon,
    GlobeAltIcon,
    QuestionMarkCircleIcon,
    ChartBarIcon,
    UserGroupIcon,
    DocumentTextIcon,
    PhoneIcon,
    StarIcon,
    Bars3Icon,
    ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);
    const [isTrialUser] = useState(true); // State để kiểm tra user có phải trial không
    const dropdownRef = useRef<HTMLDivElement>(null);
    const languageDropdownRef = useRef<HTMLDivElement>(null);
    const supportDropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const isAdminMode = pathname.startsWith('/admin');
    const { toggleMobileMenu } = useSidebar();
    const { currentLanguage, setLanguage } = useLanguage();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
                setIsLanguageDropdownOpen(false);
            }
            if (supportDropdownRef.current && !supportDropdownRef.current.contains(event.target as Node)) {
                setIsSupportDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Add logout logic here
        console.log('Logging out...');
        setIsDropdownOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex h-13 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white shadow-sm">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                {/* Mobile Hamburger Button - Only visible on mobile */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden flex items-center justify-center ml-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>

                {/* Logo and Brand */}
                <div className="logo-container flex items-center gap-3 min-w-0 flex-shrink-0" style={{ marginLeft: '5px' }}>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                            @media (min-width: 768px) {
                                .logo-container {
                                    margin-left: 25px !important;
                                }
                            }
                        `
                    }} />
                    <Image
                        src="/7xCRM-icon.png"
                        alt="7x CRM"
                        width={28}
                        height={28}
                        className="h-7 w-7 flex-shrink-0"
                    />
                    <Link href={isAdminMode ? '/admin/home' : '/app/home'} className="text-gray-900 text-lg font-bold whitespace-nowrap">
                        <span className="hidden sm:inline">7x CRM {isAdminMode ? 'Admin' : ''}</span>
                        <span className="sm:hidden">7x CRM</span>
                    </Link>
                </div>

                {/* Desktop Navigation Menu - Hidden on mobile */}
                <div className="hidden md:flex items-center gap-6" style={{ marginLeft: '115px' }}>
                    <nav className="flex items-center space-x-3">
                        <Link
                            href="/tasks"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
                        >
                            <ClipboardDocumentListIcon className="h-4 w-4 flex-shrink-0" />
                            <span>Tasks</span>
                        </Link>

                        <Link
                            href="/marketing-assistant"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
                        >
                            <UserGroupIcon className="h-4 w-4 flex-shrink-0" />
                            <span>Marketing Assistant</span>
                        </Link>

                        <Link
                            href="/app/usage-plan"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
                        >
                            <ChartBarIcon className="h-4 w-4 flex-shrink-0" />
                            <span>Usage and Plan</span>
                        </Link>

                        {/* Support Dropdown */}
                        <div className="relative" ref={supportDropdownRef}>
                            <button
                                onClick={() => setIsSupportDropdownOpen(!isSupportDropdownOpen)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
                            >
                                <QuestionMarkCircleIcon className="h-4 w-4 flex-shrink-0" />
                                <span>Support</span>
                                <ChevronDownIcon className="h-3 w-3 flex-shrink-0" />
                            </button>

                            {isSupportDropdownOpen && (
                                <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    <Link
                                        href="/documentation"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg"
                                        onClick={() => setIsSupportDropdownOpen(false)}
                                    >
                                        <DocumentTextIcon className="h-4 w-4" />
                                        Documentation
                                    </Link>
                                    <Link
                                        href="/get-support"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setIsSupportDropdownOpen(false)}
                                    >
                                        <QuestionMarkCircleIcon className="h-4 w-4" />
                                        Get Support
                                    </Link>
                                    <Link
                                        href="/contact-sales"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-lg"
                                        onClick={() => setIsSupportDropdownOpen(false)}
                                    >
                                        <PhoneIcon className="h-4 w-4" />
                                        Contact Sales
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>

            </div>

            <div className="flex flex-1 items-center">
                {/* Spacer */}
            </div>
            <div className="flex items-center gap-2.5 pr-6">
                {/* Pro Plan Badge - Right side before notifications */}
                <div className="hidden sm:flex items-center gap-2">
                    {/* Pro Icon and Text */}
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-50 border border-purple-200 rounded-lg">
                        <StarIcon className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700">Pro</span>
                    </div>

                    {/* Separator and Trial Badge - Only show if user is trial */}
                    {isTrialUser && (
                        <>
                            <span className="text-gray-400 text-sm">-</span>
                            <div className="px-2 py-1 bg-amber-50 border border-amber-200 rounded-lg">
                                <span className="text-sm font-medium text-amber-700">Trial</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Right side icons only */}

                {/* Notification */}
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                    <BellIcon className="h-5 w-5" />
                </button>

                {/* Language Selector */}
                <div className="relative" ref={languageDropdownRef}>
                    <button
                        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                        className="flex items-center gap-1 p-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                    >
                        <GlobeAltIcon className="h-5 w-5" />
                        <span className="text-sm font-medium">{currentLanguage.toUpperCase()}</span>
                        <ChevronDownIcon className="h-3 w-3" />
                    </button>

                    {isLanguageDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-24 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <button
                                onClick={() => {
                                    setLanguage('en');
                                    setIsLanguageDropdownOpen(false);
                                }}
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${currentLanguage === 'en' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                            >
                                <span className="text-base">🇺🇸</span>
                                <span>EN</span>
                            </button>
                            <button
                                onClick={() => {
                                    setLanguage('vi');
                                    setIsLanguageDropdownOpen(false);
                                }}
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${currentLanguage === 'vi' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                            >
                                <span className="text-base">🇻🇳</span>
                                <span>VI</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* User menu */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                        {/* Avatar with initials */}
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">AU</span>
                        </div>
                        <div className="hidden sm:block text-left">
                            <span className="text-sm font-medium text-gray-700 block">Admin User</span>
                        </div>
                        <ChevronDownIcon
                            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            {/* User info header */}
                            <div className="px-4 py-3 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                                        <span className="text-base font-medium text-white">AU</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Admin User</p>
                                        <p className="text-sm text-gray-500">Administrator</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu items */}
                            <div className="py-1">
                                <div className="px-4 py-2 flex items-center gap-3 text-sm text-gray-700">
                                    <UserIcon className="h-4 w-4 text-gray-400" />
                                    <span>Role: Administrator</span>
                                </div>
                                <div className="px-4 py-2 flex items-center gap-3 text-sm text-gray-700">
                                    <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                                    <span>admin@7xcrm.com</span>
                                </div>
                                <hr className="my-1 border-gray-100" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <ArrowRightOnRectangleIcon className="h-4 w-4 text-gray-400" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
