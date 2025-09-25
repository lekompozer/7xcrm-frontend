import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AppHomePage() {
    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
                    <p className="text-gray-600">Coming Soon...</p>
                </div>
            </div>
        </DashboardLayout>
    );
}