'use client';

export default function SettingsPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Configure your application settings and preferences.
                </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Settings</h2>
                <p className="text-gray-600 mb-4">
                    Use the navigation menu to access different settings categories:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Data Configuration:</strong> Configure data sources and integrations</li>
                    <li><strong>User:</strong> Manage your user profile and preferences</li>
                    <li><strong>Permission:</strong> Control access rights and permissions</li>
                    <li><strong>Company Organization:</strong> Manage company structure and teams</li>
                    <li><strong>Notifications:</strong> Configure notification preferences</li>
                    <li><strong>Partner Apps:</strong> Manage third-party integrations</li>
                </ul>
            </div>
        </div>
    );
}