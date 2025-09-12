'use client';

import { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, UsersIcon, UserIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

// Types
interface MarketingAssistant {
    id: number;
    name: string;
    email: string;
    specialization: string;
    status: 'Active' | 'Inactive';
    customerCount: number;
    joinedDate: string;
    phoneNumber: string;
}

export default function MarketingAssistantPage() {
    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);

    const [assistants, setAssistants] = useState<MarketingAssistant[]>([
        {
            id: 1,
            name: 'Alex Martinez',
            email: 'alex.martinez@7xcrm.com',
            specialization: 'Social Media Marketing',
            status: 'Active',
            customerCount: 25,
            joinedDate: '2023-01-15',
            phoneNumber: '+1 (555) 123-4567'
        },
        {
            id: 2,
            name: 'Emily Chen',
            email: 'emily.chen@7xcrm.com',
            specialization: 'Content Marketing',
            status: 'Active',
            customerCount: 30,
            joinedDate: '2023-02-20',
            phoneNumber: '+1 (555) 234-5678'
        },
        {
            id: 3,
            name: 'David Kim',
            email: 'david.kim@7xcrm.com',
            specialization: 'Email Marketing',
            status: 'Active',
            customerCount: 22,
            joinedDate: '2023-03-10',
            phoneNumber: '+1 (555) 345-6789'
        },
        {
            id: 4,
            name: 'Maria Rodriguez',
            email: 'maria.rodriguez@7xcrm.com',
            specialization: 'SEO & Analytics',
            status: 'Inactive',
            customerCount: 0,
            joinedDate: '2023-04-05',
            phoneNumber: '+1 (555) 456-7890'
        },
        {
            id: 5,
            name: 'James Wilson',
            email: 'james.wilson@7xcrm.com',
            specialization: 'Paid Advertising',
            status: 'Active',
            customerCount: 18,
            joinedDate: '2023-05-12',
            phoneNumber: '+1 (555) 567-8901'
        }
    ]);

    // Filter assistants
    const filteredAssistants = assistants.filter(assistant => {
        const matchesSearch = assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assistant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assistant.specialization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || assistant.status.toLowerCase() === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Statistics
    const totalAssistants = assistants.length;
    const activeAssistants = assistants.filter(a => a.status === 'Active').length;
    const inactiveAssistants = assistants.filter(a => a.status === 'Inactive').length;
    const totalCustomers = assistants.reduce((sum, a) => sum + a.customerCount, 0);

    const stats = [
        {
            name: 'Total Assistants',
            value: totalAssistants,
            icon: UsersIcon,
            color: 'bg-blue-500',
            textColor: 'text-blue-600'
        },
        {
            name: 'Active Assistants',
            value: activeAssistants,
            icon: CheckCircleIcon,
            color: 'bg-green-500',
            textColor: 'text-green-600'
        },
        {
            name: 'Inactive Assistants',
            value: inactiveAssistants,
            icon: XCircleIcon,
            color: 'bg-red-500',
            textColor: 'text-red-600'
        },
        {
            name: 'Total Customers',
            value: totalCustomers,
            icon: UserIcon,
            color: 'bg-purple-500',
            textColor: 'text-purple-600'
        }
    ];

    const toggleStatus = (id: number) => {
        setAssistants(assistants.map(assistant =>
            assistant.id === id
                ? {
                    ...assistant,
                    status: assistant.status === 'Active' ? 'Inactive' : 'Active',
                    customerCount: assistant.status === 'Active' ? 0 : assistant.customerCount
                }
                : assistant
        ));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Marketing Assistant</h1>
                    <p className="text-gray-600">Manage your marketing assistants and track their performance</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    Add Assistant
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                                    <IconComponent className={`h-6 w-6 ${stat.textColor}`} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search assistants by name, email, or specialization..."
                            />
                        </div>
                    </div>
                    <div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Assistants Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">
                        Marketing Assistants ({filteredAssistants.length})
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Assistant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Specialization
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customers
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAssistants.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        No assistants found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredAssistants.map((assistant) => (
                                    <tr key={assistant.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-white">
                                                            {assistant.name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {assistant.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {assistant.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{assistant.specialization}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => toggleStatus(assistant.id)}
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 ${assistant.status === 'Active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {assistant.status}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {assistant.customerCount}
                                                </span>
                                                <span className="text-sm text-gray-500 ml-1">customers</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatDate(assistant.joinedDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {assistant.phoneNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900">
                                                    View
                                                </button>
                                                <button className="text-green-600 hover:text-green-900">
                                                    Edit
                                                </button>
                                                <button className="text-red-600 hover:text-red-900">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}