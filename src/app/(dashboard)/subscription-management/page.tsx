'use client';

import { CalendarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function SubscriptionManagement() {
    // State để quản lý stat được chọn, mặc định là Total
    const [selectedStat, setSelectedStat] = useState('total');
    // State để quản lý popup history
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedCustomerHistory, setSelectedCustomerHistory] = useState<{ id: number, name: string, history: {date: string, action: string, plan: string, amount: string, status: string}[] } | null>(null);
    // State để quản lý popup customer detail
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<{ [key: string]: string | number } | null>(null);
    const [activeTab, setActiveTab] = useState('information');

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

    // Data lịch sử subscription cho mỗi customer
    const subscriptionHistories: { [key: number]: { date: string, action: string, plan: string, amount: string, status: string }[] } = {
        1: [ // John Doe
            { date: '2024-01-15', action: 'Subscribed', plan: 'Pro Plan', amount: '$29.99', status: 'Success' },
            { date: '2023-12-01', action: 'Upgraded', plan: 'Basic → Pro Plan', amount: '$29.99', status: 'Success' },
            { date: '2023-11-15', action: 'Subscribed', plan: 'Basic Plan', amount: '$9.99', status: 'Success' },
        ],
        2: [ // Jane Smith
            { date: '2024-01-10', action: 'Subscribed', plan: 'Basic Plan', amount: '$9.99', status: 'Success' },
            { date: '2023-10-10', action: 'Trial Ended', plan: 'Trial → Basic Plan', amount: '$9.99', status: 'Success' },
        ],
        3: [ // Mike Johnson
            { date: '2024-01-25', action: 'Started Trial', plan: 'Trial', amount: '$0.00', status: 'Active' },
        ],
        4: [ // Sarah Wilson
            { date: '2024-01-05', action: 'Subscribed', plan: 'Enterprise Plan', amount: '$99.99', status: 'Success' },
            { date: '2023-11-20', action: 'Upgraded', plan: 'Pro → Enterprise Plan', amount: '$99.99', status: 'Success' },
        ],
        5: [ // David Brown
            { date: '2024-01-12', action: 'Subscribed', plan: 'Pro Plan', amount: '$29.99', status: 'Success' },
        ],
        6: [ // Lisa Davis
            { date: '2024-01-20', action: 'Subscribed', plan: 'Basic Plan', amount: '$9.99', status: 'Success' },
        ],
        7: [ // Robert Taylor
            { date: '2024-01-15', action: 'Cancelled', plan: 'Pro Plan', amount: '-', status: 'Cancelled' },
            { date: '2023-12-01', action: 'Subscribed', plan: 'Pro Plan', amount: '$29.99', status: 'Success' },
        ],
        8: [ // Emma Garcia
            { date: '2024-01-28', action: 'Started Trial', plan: 'Trial', amount: '$0.00', status: 'Active' },
        ],
    };

    // Data chi tiết customer
    const customerDetails: { [key: number]: { [key: string]: string | number } } = {
        1: { // John Doe
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 (555) 123-4567',
            address: '123 Main St, New York, NY 10001',
            company: 'Tech Solutions Inc.',
            joinDate: '2023-11-15',
            totalSpent: '$89.97',
            source: 'Google Ads',
            referrer: 'Search Campaign',
            notes: 'Premium customer, responsive to email campaigns'
        },
        2: { // Jane Smith
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+1 (555) 234-5678',
            address: '456 Oak Ave, Los Angeles, CA 90210',
            company: 'Design Studio LLC',
            joinDate: '2023-10-10',
            totalSpent: '$29.97',
            source: 'Social Media',
            referrer: 'Facebook Ad Campaign',
            notes: 'Interested in design features'
        },
        3: { // Mike Johnson
            id: 3,
            name: 'Mike Johnson',
            email: 'mike@example.com',
            phone: '+1 (555) 345-6789',
            address: '789 Pine St, Chicago, IL 60601',
            company: 'Freelancer',
            joinDate: '2024-01-25',
            totalSpent: '$0.00',
            source: 'Organic Search',
            referrer: 'Direct Website Visit',
            notes: 'Trial user, needs follow-up'
        },
        4: { // Sarah Wilson
            id: 4,
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            phone: '+1 (555) 456-7890',
            address: '321 Elm St, Seattle, WA 98101',
            company: 'Wilson Enterprises',
            joinDate: '2023-11-20',
            totalSpent: '$199.98',
            source: 'Referral',
            referrer: 'Partner Program',
            notes: 'High-value customer, enterprise needs'
        },
        5: { // David Brown
            id: 5,
            name: 'David Brown',
            email: 'david@example.com',
            phone: '+1 (555) 567-8901',
            address: '654 Maple Dr, Austin, TX 78701',
            company: 'Brown & Associates',
            joinDate: '2024-01-12',
            totalSpent: '$29.99',
            source: 'Email Marketing',
            referrer: 'Newsletter Campaign',
            notes: 'Engaged with product demos'
        },
        6: { // Lisa Davis
            id: 6,
            name: 'Lisa Davis',
            email: 'lisa@example.com',
            phone: '+1 (555) 678-9012',
            address: '987 Cedar Ln, Miami, FL 33101',
            company: 'Creative Agency',
            joinDate: '2024-01-20',
            totalSpent: '$9.99',
            source: 'Content Marketing',
            referrer: 'Blog Article',
            notes: 'Interested in creative tools'
        },
        7: { // Robert Taylor
            id: 7,
            name: 'Robert Taylor',
            email: 'robert@example.com',
            phone: '+1 (555) 789-0123',
            address: '147 Birch St, Denver, CO 80201',
            company: 'Taylor Consulting',
            joinDate: '2023-12-01',
            totalSpent: '$29.99',
            source: 'Paid Search',
            referrer: 'Google Ads',
            notes: 'Cancelled due to budget constraints'
        },
        8: { // Emma Garcia
            id: 8,
            name: 'Emma Garcia',
            email: 'emma@example.com',
            phone: '+1 (555) 890-1234',
            address: '258 Willow Way, Portland, OR 97201',
            company: 'Garcia Marketing',
            joinDate: '2024-01-28',
            totalSpent: '$0.00',
            source: 'Webinar',
            referrer: 'Marketing Webinar',
            notes: 'Trial from webinar attendee'
        }
    };

    // Lọc subscription theo stat được chọn
    const filteredSubscriptions = selectedStat === 'total'
        ? subscriptions
        : subscriptions.filter(sub => sub.plan === selectedStat);

    // Handle click stat
    const handleStatClick = (statId: string) => {
        setSelectedStat(statId);
    };

    // Handle click View để hiển thị lịch sử
    const handleViewHistory = (customerId: number, customerName: string) => {
        setSelectedCustomerHistory({
            id: customerId,
            name: customerName,
            history: subscriptionHistories[customerId] || []
        });
        setShowHistoryModal(true);
    };

    // Handle close modal
    const handleCloseModal = () => {
        setShowHistoryModal(false);
        setSelectedCustomerHistory(null);
    };

    // Handle click customer name để hiển thị thông tin chi tiết
    const handleViewCustomer = (customerId: number) => {
        setSelectedCustomer(customerDetails[customerId]);
        setShowCustomerModal(true);
        setActiveTab('information');
    };

    // Handle close customer modal
    const handleCloseCustomerModal = () => {
        setShowCustomerModal(false);
        setSelectedCustomer(null);
        setActiveTab('information');
    };

    // Handle save customer information
    const handleSaveCustomer = () => {
        // Logic để save customer info sẽ được implement sau
        console.log('Saving customer:', selectedCustomer);
        handleCloseCustomerModal();
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">History</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSubscriptions.map((subscription) => (
                                <tr key={subscription.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div
                                                onClick={() => handleViewCustomer(subscription.id)}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-900 cursor-pointer hover:underline"
                                            >
                                                {subscription.customerName}
                                            </div>
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
                                        <button
                                            onClick={() => handleViewHistory(subscription.id, subscription.customerName)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* History Modal */}
            {showHistoryModal && selectedCustomerHistory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden mx-4">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">
                                Subscription History - {selectedCustomerHistory.name}
                            </h3>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-4 max-h-96 overflow-y-auto">
                            {selectedCustomerHistory.history.length > 0 ? (
                                <div className="space-y-4">
                                    {selectedCustomerHistory.history.map((historyItem: { date: string, action: string, plan: string, amount: string, status: string }, index: number) => (
                                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className={`w-3 h-3 rounded-full mt-1 ${historyItem.status === 'Success' ? 'bg-green-500' :
                                                historyItem.status === 'Active' ? 'bg-blue-500' :
                                                    historyItem.status === 'Cancelled' ? 'bg-red-500' : 'bg-gray-500'
                                                }`}></div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{historyItem.action}</p>
                                                        <p className="text-sm text-gray-600">{historyItem.plan}</p>
                                                        <p className="text-xs text-gray-500">{historyItem.date}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-gray-900">{historyItem.amount}</p>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${historyItem.status === 'Success' ? 'bg-green-100 text-green-800' :
                                                            historyItem.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                                                                historyItem.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {historyItem.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No subscription history found</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer Detail Modal */}
            {showCustomerModal && selectedCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden mx-4">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">
                                Customer Details - {selectedCustomer.name}
                            </h3>
                            <button
                                onClick={handleCloseCustomerModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200">
                            <nav className="flex space-x-8 px-6">
                                <button
                                    onClick={() => setActiveTab('information')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'information'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Information
                                </button>
                                <button
                                    onClick={() => setActiveTab('source')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'source'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Source
                                </button>
                            </nav>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-6 max-h-96 overflow-y-auto">
                            {/* Information Tab */}
                            {activeTab === 'information' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCustomer.name}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                defaultValue={selectedCustomer.email}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                defaultValue={selectedCustomer.phone}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCustomer.company}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCustomer.address}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                                            <input
                                                type="date"
                                                defaultValue={selectedCustomer.joinDate}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Total Spent</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCustomer.totalSpent}
                                                readOnly
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Source Tab */}
                            {activeTab === 'source' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                                            <select
                                                defaultValue={selectedCustomer.source}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="Google Ads">Google Ads</option>
                                                <option value="Facebook Ads">Facebook Ads</option>
                                                <option value="Social Media">Social Media</option>
                                                <option value="Organic Search">Organic Search</option>
                                                <option value="Email Marketing">Email Marketing</option>
                                                <option value="Content Marketing">Content Marketing</option>
                                                <option value="Referral">Referral</option>
                                                <option value="Webinar">Webinar</option>
                                                <option value="Direct">Direct</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Referrer</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCustomer.referrer}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                                            <textarea
                                                rows={4}
                                                defaultValue={selectedCustomer.notes}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Add notes about this customer..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={handleCloseCustomerModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveCustomer}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
