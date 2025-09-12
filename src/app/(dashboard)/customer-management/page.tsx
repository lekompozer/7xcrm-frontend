import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const customers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        company: 'Tech Corp',
        subscriptionStatus: 'Active',
        joinDate: '2024-01-15',
        totalSpent: '$299.99',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 (555) 987-6543',
        company: 'Design Studio',
        subscriptionStatus: 'Active',
        joinDate: '2024-01-10',
        totalSpent: '$199.99',
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '+1 (555) 456-7890',
        company: 'Marketing Agency',
        subscriptionStatus: 'Cancelled',
        joinDate: '2023-12-01',
        totalSpent: '$999.99',
    },
];

export default function CustomerManagementPage() {
    return (
        <div>
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Manage your customer database and relationships
                        </p>
                    </div>
                    <button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                        Add Customer
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search customers..."
                            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <select className="rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Cancelled</option>
                        <option>Pending</option>
                    </select>
                    <select className="rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                        <option>Join Date</option>
                        <option>Name</option>
                        <option>Total Spent</option>
                    </select>
                </div>
            </div>

            {/* Customer Stats */}
            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-2xl font-bold text-gray-900">1,234</div>
                    <div className="text-sm text-gray-500">Total Customers</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-2xl font-bold text-green-600">856</div>
                    <div className="text-sm text-gray-500">Active Customers</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-2xl font-bold text-yellow-600">234</div>
                    <div className="text-sm text-gray-500">Pending Customers</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-2xl font-bold text-red-600">144</div>
                    <div className="text-sm text-gray-500">Cancelled</div>
                </div>
            </div>

            {/* Customers Table */}
            <div className="rounded-lg bg-white shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Customer List</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Company
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Join Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Spent
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {customer.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    ID: {customer.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{customer.email}</div>
                                        <div className="text-sm text-gray-500">{customer.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {customer.company}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${customer.subscriptionStatus === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {customer.subscriptionStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {customer.joinDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {customer.totalSpent}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            View
                                        </a>
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Edit
                                        </a>
                                        <a href="#" className="text-red-600 hover:text-red-900">
                                            Delete
                                        </a>
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
