import {
    UsersIcon,
    CreditCardIcon,
    SpeakerWaveIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline'; const stats = [
    {
        name: 'Total Customers',
        stat: '1,234',
        icon: UsersIcon,
        change: '+12%',
        changeType: 'increase',
    },
    {
        name: 'Active Subscriptions',
        stat: '856',
        icon: CreditCardIcon,
        change: '+8%',
        changeType: 'increase',
    },
    {
        name: 'Marketing Campaigns',
        stat: '23',
        icon: SpeakerWaveIcon,
        change: '+5%',
        changeType: 'increase',
    },
    {
        name: 'Monthly Revenue',
        stat: '$45,678',
        icon: ChartBarIcon,
        change: '+15%',
        changeType: 'increase',
    },
];

export default function HomePage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Welcome to 7x CRM Admin Dashboard. Here&apos;s what&apos;s happening with your business today.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
                    >
                        <dt>
                            <div className="absolute rounded-md bg-indigo-500 p-3">
                                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">
                                {item.name}
                            </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline">
                            <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                {item.change}
                            </p>
                        </dd>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="rounded-lg bg-white p-6 shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Subscriptions</h3>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center space-x-3">
                                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">Customer {item}</p>
                                    <p className="text-sm text-gray-500">Subscribed to Pro Plan</p>
                                </div>
                                <div className="text-sm text-gray-500">2 hours ago</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Marketing Performance</h3>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Campaign {item}</p>
                                    <p className="text-sm text-gray-500">Email Marketing</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">85%</p>
                                    <p className="text-sm text-gray-500">Open Rate</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
