'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
    ChartBarIcon,
    UserGroupIcon,
    DocumentTextIcon,
    QuestionMarkCircleIcon,
    PhoneIcon,
    Squares2X2Icon
} from '@heroicons/react/24/outline';

export default function MobileFloatingMenu() {
    const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
    const menuDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target as Node)) {
                setIsMenuDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="md:hidden fixed bottom-6 right-6 z-50">
            <div className="relative" ref={menuDropdownRef}>
                <button
                    onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}
                    className="flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors duration-200"
                >
                    <Squares2X2Icon className="h-6 w-6" />
                </button>

                {isMenuDropdownOpen && (
                    <div className="absolute bottom-full right-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                        <Link
                            href="/usage-plan"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg border-b border-gray-100"
                            onClick={() => setIsMenuDropdownOpen(false)}
                        >
                            <ChartBarIcon className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">Usage and Plan</span>
                        </Link>
                        <Link
                            href="/marketing-assistant"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                            onClick={() => setIsMenuDropdownOpen(false)}
                        >
                            <UserGroupIcon className="h-5 w-5 text-green-600" />
                            <span className="font-medium">Marketing Assistant</span>
                        </Link>
                        <Link
                            href="/documentation"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                            onClick={() => setIsMenuDropdownOpen(false)}
                        >
                            <DocumentTextIcon className="h-5 w-5 text-purple-600" />
                            <span className="font-medium">Documentation</span>
                        </Link>
                        <Link
                            href="/get-support"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                            onClick={() => setIsMenuDropdownOpen(false)}
                        >
                            <QuestionMarkCircleIcon className="h-5 w-5 text-orange-600" />
                            <span className="font-medium">Get Support</span>
                        </Link>
                        <Link
                            href="/contact-sales"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-lg"
                            onClick={() => setIsMenuDropdownOpen(false)}
                        >
                            <PhoneIcon className="h-5 w-5 text-red-600" />
                            <span className="font-medium">Contact Sales</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}