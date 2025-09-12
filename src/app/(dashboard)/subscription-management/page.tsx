'use client';

import { CalendarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function SubscriptionManagement() {
    // State để quản lý stat được chọn, mặc định là Total
    const [selectedStat, setSelectedStat] = useState('total');

    // Stats cho 6 loại subscription (thêm Total)
    const subscriptionStats = [
        { id: 'total', name: 'Total', count: 971, color: 'bg-gray-500' },
        { id: 'trial', name: 'Trial', count: 125, color: 'bg-blue-500' },
        { id: 'basic', name: 'Basic Plan', count: 234, color: 'bg-green-500' },
        { id: 'pro', name: 'Pro Plan', count: 456, color: 'bg-purple-500' },
        { id: 'enterprise', name: 'Enterprise Plan', count: 89, color: 'bg-orange-500' },
        { id: 'cancelled', name: 'Cancelled', count: 67, color: 'bg-red-500' },
    ];

    // Data với subscription types
    const subscriptions = [
        {
            id: 1,
            customerName: 'John Doe',
            email: 'john@example.com',
            plan: 'pro',
            planDisplay: 'Pro Plan',
            status: 'Active',
            startDate: '2024-01-15',
            nextBilling: '2024-02-15',
            amount: '$29.99',
        },
        {
            id: 2,
            customerName: 'Jane Smith',
            email: 'jane@example.com',
            plan: 'basic',
            planDisplay: 'Basic Plan',
            status: 'Active',
            startDate: '2024-01-10',
            nextBilling: '2024-02-10',
            amount: '$9.99',
        },
        {
            id: 3,
            customerName: 'Mike Johnson',
            email: 'mike@example.com',
            plan: 'trial',
            planDisplay: 'Trial',
            status: 'Trial',
            startDate: '2024-01-25',
            nextBilling: '2024-02-25',
            amount: '$0.00',
        },
        {
            id: 4,
            customerName: 'Sarah Wilson',
            email: 'sarah@example.com',
            plan: 'enterprise',
            planDisplay: 'Enterprise Plan',
            status: 'Active',
            startDate: '2024-01-05',
            nextBilling: '2024-02-05',
            amount: '$99.99',
        },
        {
            id: 5,
            customerName: 'David Brown',
            email: 'david@example.com',
            plan: 'pro',
            planDisplay: 'Pro Plan',
            status: 'Active',
            startDate: '2024-01-12',
            nextBilling: '2024-02-12',
            amount: '$29.99',
        },
        {
            id: 6,
            customerName: 'Lisa Davis',
            email: 'lisa@example.com',
            plan: 'basic',
            planDisplay: 'Basic Plan',
            status: 'Active',
            startDate: '2024-01-20',
            nextBilling: '2024-02-20',
            amount: '$9.99',
        },
        {
            id: 7,
            customerName: 'Robert Taylor',
            email: 'robert@example.com',
            plan: 'cancelled',
            planDisplay: 'Pro Plan',
            status: 'Cancelled',
            startDate: '2023-12-01',
            nextBilling: '-',
            amount: '-',
        },
        {
            id: 8,
            customerName: 'Emma Garcia',
            email: 'emma@example.com',
            plan: 'trial',
            planDisplay: 'Trial',
            status: 'Trial',
            startDate: '2024-01-28',
            nextBilling: '2024-02-28',
            amount: '$0.00',
        },
    ];

    // Lọc subscription theo stat được chọn
    const filteredSubscriptions = selectedStat === 'total'
        ? subscriptions
        : subscriptions.filter(sub => sub.plan === selectedStat);

    // Handle click stat
    const handleStatClick = (statId: string) => {
        setSelectedStat(statId);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
                <p className="text-gray-600">Manage customer subscriptions and plans</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                {subscriptionStats.map((stat) => (
                    <div
                        key={stat.id}
                        onClick={() => handleStatClick(stat.id)}
                        className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${selectedStat === stat.id
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-transparent'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${stat.color} mr-3`}></div>
                            <div>
                                <p className="text-sm text-gray-600">{stat.name}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.count.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Date Filter */}
            <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Date Range:</span>
                </div>
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Last 30 days</option>
                    <option>Last 7 days</option>
                    <option>Last 90 days</option>
                    <option>This month</option>
                    <option>Custom range</option>
                </select>
            </div>

            {/* Subscription Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">
                        {selectedStat === 'total' ? 'All Subscriptions' : `${subscriptionStats.find(s => s.id === selectedStat)?.name} Subscriptions`}
                        <span className="ml-2 text-sm text-gray-500">({filteredSubscriptions.length} total)</span>
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Billing</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSubscriptions.map((subscription) => (
                                <tr key={subscription.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{subscription.customerName}</div>
                                            <div className="text-sm text-gray-500">{subscription.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {subscription.planDisplay}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subscription.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                subscription.status === 'Trial' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {subscription.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.startDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.nextBilling}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subscription.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Cancel</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
