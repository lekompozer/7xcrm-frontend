'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSidebar } from '../../contexts/SidebarContext';
import {
    ChevronDownIcon,
    UserIcon,
    EnvelopeIcon,
    ArrowRightOnRectangleIcon,
    BellIcon,
    GlobeAltIcon,
    Bars3Icon
} from '@heroicons/react/24/outline';

export default function AdminHeader() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('EN');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const languageDropdownRef = useRef<HTMLDivElement>(null);
    const { toggleMobileMenu } = useSidebar();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
                setIsLanguageDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200">
            <div className="flex h-16 items-center justify-between px-4">
                {/* Left side - Mobile menu button + Logo */}
                <div className="flex items-center">
                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 mr-2"
                        onClick={toggleMobileMenu}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    {/* Logo */}
                    <Link href="/admin" className="flex items-center">
                        <Image
                            src="/7xCRM-icon.png"
                            alt="7x CRM"
                            width={32}
                            height={32}
                            className="h-8 w-8"
                        />
                        <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">7x CRM Admin</span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center">
                    {/* Spacer */}
                </div>

                <div className="flex items-center gap-2.5 pr-6">
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
                            <span className="text-sm font-medium">{currentLanguage}</span>
                            <ChevronDownIcon className="h-3 w-3" />
                        </button>

                        {isLanguageDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 w-24 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <button
                                    onClick={() => {
                                        setCurrentLanguage('EN');
                                        setIsLanguageDropdownOpen(false);
                                    }}
                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${currentLanguage === 'EN' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                                >
                                    <span className="text-base">🇺🇸</span>
                                    <span>EN</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setCurrentLanguage('VI');
                                        setIsLanguageDropdownOpen(false);
                                    }}
                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${currentLanguage === 'VI' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
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
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            // Handle logout
                                        }}
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
        </header>
    );
}