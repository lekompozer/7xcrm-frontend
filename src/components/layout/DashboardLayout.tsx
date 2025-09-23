'use client';

import SidebarNew from './SidebarNew';
import Header from './Header';
import MobileFloatingMenu from './MobileFloatingMenu';
import { usePathname } from 'next/navigation';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

function DashboardContent({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const isAdminMode = pathname.startsWith('/admin');
    const { isCollapsed } = useSidebar();

    return (
        <div className="flex h-screen bg-gray-100">
            <SidebarNew mode={isAdminMode ? 'admin' : 'app'} />
            {/* Header spans full width */}
            <Header />
            {/* Mobile Floating Menu */}
            <MobileFloatingMenu />
            {/* Main content area with sidebar margin */}
            <div className={`flex flex-1 flex-col min-w-0 transition-all duration-300 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'
                } pt-13`}> {/* Changed pt-16 to pt-13 to match new header height */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <DashboardContent>{children}</DashboardContent>
        </SidebarProvider>
    );
}