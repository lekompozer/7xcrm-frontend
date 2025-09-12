import { PlusIcon, PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/24/outline';

const marketingAssistants = [
    {
        id: 1,
        name: 'Email Campaign Assistant',
        description: 'Automated email marketing campaigns for customer engagement',
        status: 'Active',
        subscribers: 1234,
        campaigns: 15,
        openRate: '24.5%',
        clickRate: '3.2%',
        lastActivity: '2 hours ago',
    },
    {
        id: 2,
        name: 'Social Media Assistant',
        description: 'Automated social media posting and engagement tracking',
        status: 'Active',
        subscribers: 856,
        campaigns: 8,
        openRate: '18.7%',
        clickRate: '2.8%',
        lastActivity: '1 hour ago',
    },
    {
        id: 3,
        name: 'SMS Marketing Assistant',
        description: 'Targeted SMS campaigns for promotions and updates',
        status: 'Paused',
        subscribers: 654,
        campaigns: 5,
        openRate: '95.2%',
        clickRate: '8.1%',
        lastActivity: '1 day ago',
    },
];

const campaignTypes = [
    { name: 'Email Campaigns', count: 15, active: 12 },
    { name: 'Social Media', count: 8, active: 8 },
    { name: 'SMS Campaigns', count: 5, active: 3 },
    { name: 'Push Notifications', count: 3, active: 2 },
];

export default function MarketingAssistantPage() {
    return (
        <div>
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Marketing Assistant Management</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Manage automated marketing services and campaigns
                        </p>
                    </div>
                    <button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                        Create Assistant
                    </button>
                </div>
            </div>

            {/* Campaign Overview */}
            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
                {campaignTypes.map((type) => (
                    <div key={type.name} className="bg-white rounded-lg shadow p-6">
                        <div className="text-lg font-semibold text-gray-900">{type.name}</div>
                        <div className="mt-2 flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-indigo-600">{type.count}</div>
                                <div className="text-sm text-gray-500">Total</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-green-600">{type.active}</div>
                                <div className="text-sm text-gray-500">Active</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Marketing Assistants */}
            <div className="grid grid-cols-1 gap-6">
                {marketingAssistants.map((assistant) => (
                    <div key={assistant.id} className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <h3 className="text-lg font-medium text-gray-900">{assistant.name}</h3>
                                    <span className={`ml-3 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${assistant.status === 'Active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {assistant.status}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {assistant.status === 'Active' ? (
                                        <>
                                            <button className="p-2 text-yellow-600 hover:text-yellow-700">
                                                <PauseIcon className="h-5 w-5" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:text-red-700">
                                                <StopIcon className="h-5 w-5" />
                                            </button>
                                        </>
                                    ) : (
                                        <button className="p-2 text-green-600 hover:text-green-700">
                                            <PlayIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">{assistant.description}</p>
                        </div>

                        <div className="px-6 py-4">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{assistant.subscribers}</div>
                                    <div className="text-sm text-gray-500">Subscribers</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{assistant.campaigns}</div>
                                    <div className="text-sm text-gray-500">Campaigns</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">{assistant.openRate}</div>
                                    <div className="text-sm text-gray-500">Open Rate</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600">{assistant.clickRate}</div>
                                    <div className="text-sm text-gray-500">Click Rate</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Last Activity</div>
                                    <div className="text-sm text-gray-500">{assistant.lastActivity}</div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-4">
                                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                                        View Campaigns
                                    </button>
                                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                                        Analytics
                                    </button>
                                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                                        Settings
                                    </button>
                                </div>
                                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Campaigns */}
            <div className="mt-8">
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Recent Campaign Activity</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex items-center justify-between border-b border-gray-100 pb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <PlayIcon className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                Campaign {item} - Email Marketing
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Sent to 1,234 subscribers • 2 hours ago
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-900">24.5% open rate</div>
                                        <div className="text-sm text-gray-500">3.2% click rate</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
