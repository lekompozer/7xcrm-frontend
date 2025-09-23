'use client';

export default function SalesHubPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Sales Hub</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Central dashboard for managing your sales pipeline, leads, deals, and policies.
                </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Sales Hub</h2>
                <p className="text-gray-600">
                    Use the sidebar to navigate to Leads, Deals, Policies, or Reports.
                </p>
            </div>
        </div>
    );
}