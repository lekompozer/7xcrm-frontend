import DashboardLayout from '@/components/layout/DashboardLayout';

export default function TasksPage() {
    return (
        <DashboardLayout>
            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
                        <p className="mt-2 text-gray-600">Manage and track your tasks and to-do items</p>
                    </div>

                    {/* Coming Soon Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="text-center">
                            <div className="mx-auto h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="h-12 w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tasks Feature Coming Soon</h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                We&apos;re working hard to bring you a comprehensive task management system. Stay tuned for updates!
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                                <h4 className="font-medium text-blue-900 mb-2">What to expect:</h4>
                                <ul className="text-sm text-blue-800 space-y-1 text-left">
                                    <li>• Create and manage tasks</li>
                                    <li>• Set priorities and due dates</li>
                                    <li>• Assign tasks to team members</li>
                                    <li>• Track progress and completion</li>
                                    <li>• Integration with CRM activities</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}