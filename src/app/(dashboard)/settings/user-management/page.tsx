'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function UserManagementPage() {
    // State để quản lý popup add user
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'John Admin',
            email: 'john@7xcrm.com',
            role: 'Admin',
            status: 'Active',
            lastLogin: '2024-01-15 14:30',
            createdAt: '2023-12-01',
        },
        {
            id: 2,
            name: 'Jane Manager',
            email: 'jane@7xcrm.com',
            role: 'User',
            status: 'Active',
            lastLogin: '2024-01-15 10:15',
            createdAt: '2024-01-05',
        },
        {
            id: 3,
            name: 'Bob Staff',
            email: 'bob@7xcrm.com',
            role: 'User',
            status: 'Inactive',
            lastLogin: '2024-01-10 16:45',
            createdAt: '2024-01-08',
        },
    ]);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: 'User'
    });

    // Handle add user
    const handleAddUser = () => {
        if (newUser.name && newUser.email) {
            const user = {
                id: users.length + 1,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                status: 'Pending',
                lastLogin: '-',
                createdAt: new Date().toISOString().split('T')[0],
            };
            setUsers([...users, user]);
            setNewUser({ name: '', email: '', role: 'User' });
            setShowAddUserModal(false);
        }
    };

    // Handle close modal
    const handleCloseModal = () => {
        setShowAddUserModal(false);
        setNewUser({ name: '', email: '', role: 'User' });
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">Manage admin and user accounts for the system</p>
            </div>

            <div className="rounded-lg bg-white shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium text-gray-900">User Management</h2>
                        <button
                            onClick={() => setShowAddUserModal(true)}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                            Add User
                        </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage admin and user accounts for the system
                    </p>
                </div>

                {/* User Stats */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-600">3</div>
                            <div className="text-sm text-blue-600">Total Users</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-600">1</div>
                            <div className="text-sm text-green-600">Admin Users</div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-yellow-600">2</div>
                            <div className="text-sm text-yellow-600">Regular Users</div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Login
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${user.role === 'Admin'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${user.status === 'Active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {user.lastLogin}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {user.createdAt}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Edit
                                        </a>
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Reset Password
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

                {/* Role Permissions */}
                <div className="px-6 py-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Role Permissions</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Admin Role</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Full system access</li>
                                <li>• User management</li>
                                <li>• Payment management</li>
                                <li>• System settings</li>
                                <li>• All dashboard features</li>
                            </ul>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">User Role</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Dashboard viewing</li>
                                <li>• Customer management</li>
                                <li>• Subscription viewing</li>
                                <li>• Marketing assistant access</li>
                                <li>• Limited settings access</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Add User Modal */}
                {showAddUserModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg max-w-md w-full mx-4">
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">Add New User</h3>
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
                            <div className="px-6 py-4">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={newUser.name}
                                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={newUser.email}
                                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Role
                                        </label>
                                        <select
                                            value={newUser.role}
                                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="User">User</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Note:</strong> New users will be created with &quot;Pending&quot; status.
                                            They will receive an email invitation to activate their account.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddUser}
                                    disabled={!newUser.name || !newUser.email}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Add User
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
