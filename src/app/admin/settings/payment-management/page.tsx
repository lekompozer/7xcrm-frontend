import { PlusIcon, CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const paymentAccounts = [
    {
        id: 1,
        name: 'Stripe Payment Gateway',
        type: 'Credit Card',
        status: 'Active',
        lastTransaction: '2024-01-15 14:30',
        monthlyVolume: '$12,456',
        successRate: '98.5%',
    },
    {
        id: 2,
        name: 'PayPal Business',
        type: 'PayPal',
        status: 'Active',
        lastTransaction: '2024-01-15 12:15',
        monthlyVolume: '$8,234',
        successRate: '97.2%',
    },
    {
        id: 3,
        name: 'Bank Transfer (ACH)',
        type: 'Bank Transfer',
        status: 'Inactive',
        lastTransaction: '2024-01-10 09:45',
        monthlyVolume: '$3,567',
        successRate: '99.1%',
    },
];

const recentTransactions = [
    {
        id: 1,
        customer: 'John Doe',
        amount: '$29.99',
        status: 'Success',
        method: 'Credit Card',
        date: '2024-01-15 14:30',
    },
    {
        id: 2,
        customer: 'Jane Smith',
        amount: '$9.99',
        status: 'Success',
        method: 'PayPal',
        date: '2024-01-15 12:15',
    },
    {
        id: 3,
        customer: 'Bob Johnson',
        amount: '$99.99',
        status: 'Failed',
        method: 'Credit Card',
        date: '2024-01-15 10:30',
    },
];

export default function PaymentManagementPage() {
    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
                <p className="text-gray-600">Manage payment gateways and billing settings for customer subscriptions</p>
            </div>

            <div className="space-y-6">
                {/* Payment Overview */}
                <div className="rounded-lg bg-white shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">Payment Management</h2>
                            <button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                Add Payment Method
                            </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage payment gateways and billing settings for customer subscriptions
                        </p>
                    </div>

                    {/* Payment Stats */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                            <div className="bg-green-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <BanknotesIcon className="h-8 w-8 text-green-600" />
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-green-600">$24,257</div>
                                        <div className="text-sm text-green-600">Monthly Revenue</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <CreditCardIcon className="h-8 w-8 text-blue-600" />
                                    <div className="ml-4">
                                        <div className="text-2xl font-bold text-blue-600">1,245</div>
                                        <div className="text-sm text-blue-600">Transactions</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-yellow-50 rounded-lg p-4">
                                <div className="text-2xl font-bold text-yellow-600">98.2%</div>
                                <div className="text-sm text-yellow-600">Success Rate</div>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-4">
                                <div className="text-2xl font-bold text-purple-600">3</div>
                                <div className="text-sm text-purple-600">Payment Methods</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Accounts */}
                <div className="rounded-lg bg-white shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Payment Accounts</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Gateway
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Monthly Volume
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Success Rate
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Transaction
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paymentAccounts.map((account) => (
                                    <tr key={account.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <CreditCardIcon className="h-10 w-10 text-gray-400" />
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {account.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {account.type}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${account.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {account.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {account.monthlyVolume}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {account.successRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {account.lastTransaction}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                Configure
                                            </a>
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                Test
                                            </a>
                                            <a href="#" className="text-red-600 hover:text-red-900">
                                                Disable
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="rounded-lg bg-white shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Method
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentTransactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {transaction.customer}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {transaction.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${transaction.status === 'Success'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {transaction.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {transaction.method}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {transaction.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                View Details
                                            </a>
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Refund
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Settings */}
                <div className="rounded-lg bg-white shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Payment Settings</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Auto-retry failed payments</h4>
                                <p className="text-sm text-gray-500">Automatically retry failed subscription payments</p>
                            </div>
                            <button
                                type="button"
                                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                            >
                                <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Send payment notifications</h4>
                                <p className="text-sm text-gray-500">Email customers about payment status</p>
                            </div>
                            <button
                                type="button"
                                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                            >
                                <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
