'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, UserIcon, EnvelopeIcon, ArrowRightOnRectangleIcon, UserPlusIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
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
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex flex-1 items-center">
                    <h2 className="text-lg font-semibold text-gray-900 ml-16 md:hidden">
                        7x CRM Admin Dashboard
                    </h2>
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    {/* Navigation Tabs */}
                    <nav className="flex items-center space-x-1">
                        <Link
                            href="/signup"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                        >
                            <UserPlusIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">User Signup</span>
                        </Link>
                        <Link
                            href="/usage-plan"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                        >
                            <ChartBarIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">Usage and Plan</span>
                        </Link>
                    </nav>

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
        </div>
    );
}
