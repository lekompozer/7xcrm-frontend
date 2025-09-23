'use client';

export default function PageAPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">PageA Dashboard</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Your main advertising dashboard with all key features.
                </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to PageA</h2>
                <p className="text-gray-600 mb-4">
                    Access all advertising features through the sub-navigation:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>Dashboard:</strong> Overview of advertising performance</li>
                    <li><strong>Campaigns:</strong> Manage your advertising campaigns</li>
                    <li><strong>Audiences:</strong> Create and manage target audiences</li>
                    <li><strong>Billing & Payments:</strong> Handle advertising billing</li>
                    <li><strong>Facebook Integration:</strong> Connect with Facebook Ads</li>
                </ul>
            </div>
        </div>
    );
}