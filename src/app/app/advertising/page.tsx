'use client';

export default function AdvertisingPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Advertising</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Manage your advertising campaigns and marketing efforts.
                </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Advertising</h2>
                <p className="text-gray-600 mb-4">
                    Use the navigation menu to access different advertising features:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>PageA:</strong> Main advertising dashboard and features</li>
                </ul>
            </div>
        </div>
    );
}