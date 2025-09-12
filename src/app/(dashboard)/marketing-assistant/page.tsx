'use client';

import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function MarketingAssistantPage() {
    // State để quản lý search và filter
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    // Stats cho Marketing Assistant
    const marketingStats = [
        { id: 'total', name: 'Total', count: 456, color: 'bg-gray-500' },
        { id: 'basic', name: 'Marketing Assistant Basic', count: 189, color: 'bg-blue-500' },
        { id: 'premium', name: 'Marketing Assistant Premium', count: 178, color: 'bg-purple-500' },
        { id: 'pro', name: 'Marketing Assistant Pro', count: 89, color: 'bg-orange-500' },
    ];

    // Data cho marketing services
    const marketingServices = [
        {
            id: 1,
            customer: 'John Doe',
            email: 'john@example.com',
            subscriptionPackage: 'Pro Plan',
            marketingService: 'Marketing Assistant Pro',
            registeredDate: '2024-01-15',
            startedDate: '2024-01-20',
            amount: '$199.99',
            status: 'Active'
        },
        {
            id: 2,
            customer: 'Jane Smith',
            email: 'jane@example.com',
            subscriptionPackage: 'Basic Plan',
            marketingService: 'Marketing Assistant Basic',
            registeredDate: '2024-01-10',
            startedDate: '2024-01-12',
            amount: '$49.99',
            status: 'Active'
        },
        {
            id: 3,
            customer: 'Mike Johnson',
            email: 'mike@example.com',
            subscriptionPackage: 'Enterprise Plan',
            marketingService: 'Marketing Assistant Premium',
            registeredDate: '2024-01-25',
            startedDate: '2024-01-28',
            amount: '$129.99',
            status: 'Active'
        },
        {
            id: 4,
            customer: 'Sarah Wilson',
            email: 'sarah@example.com',
            subscriptionPackage: 'Pro Plan',
            marketingService: 'Marketing Assistant Pro',
            registeredDate: '2024-01-05',
            startedDate: '2024-01-08',
            amount: '$199.99',
            status: 'Active'
        },
        {
            id: 5,
            customer: 'David Brown',
            email: 'david@example.com',
            subscriptionPackage: 'Basic Plan',
            marketingService: 'Marketing Assistant Basic',
            registeredDate: '2024-01-12',
            startedDate: '2024-01-15',
            amount: '$49.99',
            status: 'Paused'
        },
        {
            id: 6,
            customer: 'Lisa Davis',
            email: 'lisa@example.com',
            subscriptionPackage: 'Enterprise Plan',
            marketingService: 'Marketing Assistant Premium',
            registeredDate: '2024-01-20',
            startedDate: '2024-01-22',
            amount: '$129.99',
            status: 'Active'
        },
        {
            id: 7,
            customer: 'Robert Taylor',
            email: 'robert@example.com',
            subscriptionPackage: 'Pro Plan',
            marketingService: 'Marketing Assistant Pro',
            registeredDate: '2023-12-01',
            startedDate: '2023-12-05',
            amount: '$199.99',
            status: 'Cancelled'
        },
        {
            id: 8,
            customer: 'Emma Garcia',
            email: 'emma@example.com',
            subscriptionPackage: 'Basic Plan',
            marketingService: 'Marketing Assistant Basic',
            registeredDate: '2024-01-28',
            startedDate: '2024-02-01',
            amount: '$49.99',
            status: 'Active'
        },
    ];

    // Filter data dựa trên search và filter
    const filteredServices = marketingServices.filter(service => {
        const matchesSearch = service.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.marketingService.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = selectedFilter === 'all' ||
            (selectedFilter === 'basic' && service.marketingService.includes('Basic')) ||
            (selectedFilter === 'premium' && service.marketingService.includes('Premium')) ||
            (selectedFilter === 'pro' && service.marketingService.includes('Pro'));

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Marketing Assistant Management</h1>
                <p className="text-gray-600">Manage marketing assistant services and customer subscriptions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {marketingStats.map((stat) => (
                    <div
                        key={stat.id}
                        className="bg-white rounded-lg shadow p-6"
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

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow mb-6 p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* Search */}
                    <div className="flex-1 w-full sm:w-auto">
                        <div className="relative">
                            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search customers, emails, or services..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="flex items-center space-x-2">
                        <FunnelIcon className="h-5 w-5 text-gray-400" />
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Services</option>
                            <option value="basic">Basic</option>
                            <option value="premium">Premium</option>
                            <option value="pro">Pro</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Marketing Services Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">
                        Marketing Assistant Services
                        <span className="ml-2 text-sm text-gray-500">({filteredServices.length} total)</span>
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription Package</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marketing Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredServices.map((service) => (
                                <tr key={service.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{service.customer}</div>
                                            <div className="text-sm text-gray-500">{service.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {service.subscriptionPackage}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${service.marketingService.includes('Basic') ? 'bg-blue-100 text-blue-800' :
                                            service.marketingService.includes('Premium') ? 'bg-purple-100 text-purple-800' :
                                                'bg-orange-100 text-orange-800'
                                            }`}>
                                            {service.marketingService}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.registeredDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.startedDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900">View</button>
                                        <button className="text-green-600 hover:text-green-900">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
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
