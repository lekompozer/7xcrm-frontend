import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-1 flex-col min-w-0">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6 pr-5 max-w-full md:pl-6 pl-16">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
