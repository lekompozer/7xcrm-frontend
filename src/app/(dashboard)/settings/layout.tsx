'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const settingsNavigation = [
    { name: 'User Management', href: '/settings/user-management' },
    { name: 'Payment Management', href: '/settings/payment-management' },
];

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Manage your system configuration and preferences
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                {/* Settings Navigation */}
                <div className="lg:col-span-1">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <nav className="space-y-2">
                            {settingsNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`block rounded-md px-3 py-2 text-sm font-medium ${pathname === item.href
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3">
                    {children}
                </div>
            </div>
        </div>
    );
}
