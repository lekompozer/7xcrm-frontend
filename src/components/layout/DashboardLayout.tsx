'use client';

import SidebarNew from './SidebarNew';
import Header from './Header';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const isAdminMode = pathname.startsWith('/admin');

    return (
        <div className="flex h-screen bg-gray-100">
            <SidebarNew mode={isAdminMode ? 'admin' : 'app'} />
            <div className="flex flex-1 flex-col min-w-0 md:ml-64">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}