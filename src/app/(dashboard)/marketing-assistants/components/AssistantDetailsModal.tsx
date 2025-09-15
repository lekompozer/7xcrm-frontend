import { useState } from 'react';
import { XMarkIcon, DocumentIcon, PhoneIcon, EnvelopeIcon, CalendarIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

interface MarketingAssistant {
    id: number;
    name: string;
    email: string;
    specialization: string;
    status: 'Active' | 'Inactive' | 'Paused';
    customerCount: number;
    joinedDate: string;
    phoneNumber: string;
    startWorkDate?: string;
    address?: string;
    department?: string;
    skills?: string[];
    certifications?: string[];
    cvFiles?: { name: string; uploadDate: string; url: string }[];
}

interface Customer {
    id: number;
    name: string;
    email: string;
    subscriptionPackage: string;
    marketingService: string;
    status: string;
    startedDate: string;
    totalAmount: string;
}

interface AssistantDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    assistant: MarketingAssistant | null;
    customers: Customer[];
    onStatusChange: (id: number, status: 'Active' | 'Inactive' | 'Paused') => void;
}

export default function AssistantDetailsModal({
    isOpen,
    onClose,
    assistant,
    customers,
    onStatusChange
}: AssistantDetailsModalProps) {
    const [selectedTab, setSelectedTab] = useState(0);

    // Editing states
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        email: assistant?.email || '',
        phoneNumber: assistant?.phoneNumber || '',
        joinedDate: assistant?.joinedDate || '',
        startWorkDate: assistant?.startWorkDate || '',
        specialization: assistant?.specialization || '',
        department: assistant?.department || 'Marketing'
    });
    const [editedSkills, setEditedSkills] = useState(assistant?.skills || []);
    const [newSkill, setNewSkill] = useState('');
    const [isAddingSkill, setIsAddingSkill] = useState(false);

    if (!assistant || !isOpen) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Inactive':
                return 'bg-red-100 text-red-800';
            case 'Paused':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Edit handling functions
    const handleStartEdit = () => {
        setEditedData({
            email: assistant.email,
            phoneNumber: assistant.phoneNumber,
            joinedDate: assistant.joinedDate,
            startWorkDate: assistant.startWorkDate || '',
            specialization: assistant.specialization,
            department: assistant.department || 'Marketing'
        });
        setEditedSkills(assistant.skills || []);
        setIsEditing(true);
    };

    const handleSave = () => {
        // Here you would typically make an API call to save the data
        console.log('Saving assistant data:', editedData, editedSkills);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsAddingSkill(false);
        setNewSkill('');
    };

    const handleRemoveSkill = (indexToRemove: number) => {
        setEditedSkills(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setEditedSkills(prev => [...prev, newSkill.trim()]);
            setNewSkill('');
            setIsAddingSkill(false);
        }
    };

    const handleFileUpload = () => {
        // Handle file upload logic
        console.log('File upload clicked');
    };

    const handleDeleteFile = (fileName: string) => {
        // Handle file deletion logic
        console.log('Delete file:', fileName);
    };

    const assistantCustomers = customers.filter(customer =>
        customer.name.includes(assistant.name) ||
        Math.random() > 0.5 // Temporary random filter for demo
    );

    const totalRevenue = assistantCustomers.reduce((sum, customer) => {
        const amount = parseFloat(customer.totalAmount.replace('$', ''));
        return sum + amount;
    }, 0);

    const tabs = [
        { name: 'Information', count: null },
        { name: 'Customers', count: assistantCustomers.length },
        { name: 'Management', count: null }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full mx-4 border border-gray-200 max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-lg font-medium text-white">
                                {assistant.name.split(' ').map(n => n[0]).join('')}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-blue-600 hover:text-blue-900 cursor-pointer hover:underline">
                                {assistant.name}
                            </h3>
                            <p className="text-sm text-gray-500">{assistant.specialization}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assistant.status)}`}>
                            {assistant.status}
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        {isEditing && (
                            <>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </>
                        )}
                        <button
                            type="button"
                            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={onClose}
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="flex space-x-8">
                            {tabs.map((tab, index) => (
                                <button
                                    key={tab.name}
                                    onClick={() => setSelectedTab(index)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${selectedTab === index
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>{tab.name}</span>
                                        {tab.count !== null && (
                                            <span className="bg-gray-200/70 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                                                {tab.count}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    {selectedTab === 0 && (
                        <div className="space-y-6">
                            {/* Personal Information */}
                            <div className="bg-gray-50/30 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-medium text-gray-900">Personal Information</h4>
                                    {!isEditing && (
                                        <button
                                            onClick={handleStartEdit}
                                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                            <span>Edit</span>
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500">Email</p>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    value={editedData.email}
                                                    onChange={(e) => setEditedData(prev => ({ ...prev, email: e.target.value }))}
                                                    className="text-sm text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-900">{assistant.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500">Phone</p>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    value={editedData.phoneNumber}
                                                    onChange={(e) => setEditedData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                                    className="text-sm text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-900">{assistant.phoneNumber}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500">Joined Company</p>
                                            {isEditing ? (
                                                <input
                                                    type="date"
                                                    value={editedData.joinedDate}
                                                    onChange={(e) => setEditedData(prev => ({ ...prev, joinedDate: e.target.value }))}
                                                    className="text-sm text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-900">{formatDate(assistant.joinedDate)}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500">Started Work</p>
                                            {isEditing ? (
                                                <input
                                                    type="date"
                                                    value={editedData.startWorkDate}
                                                    onChange={(e) => setEditedData(prev => ({ ...prev, startWorkDate: e.target.value }))}
                                                    className="text-sm text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-900">
                                                    {assistant.startWorkDate ? formatDate(assistant.startWorkDate) : 'N/A'}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Professional Information */}
                            <div className="bg-gray-50/30 rounded-lg p-4">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-2">Specialization</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedData.specialization}
                                                onChange={(e) => setEditedData(prev => ({ ...prev, specialization: e.target.value }))}
                                                className="text-sm text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-900">{assistant.specialization}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-2">Department</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedData.department}
                                                onChange={(e) => setEditedData(prev => ({ ...prev, department: e.target.value }))}
                                                className="text-sm text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-900">{assistant.department || 'Marketing'}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm font-medium text-gray-500">Skills</p>
                                        {isEditing && (
                                            <button
                                                onClick={() => setIsAddingSkill(true)}
                                                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                                            >
                                                <PlusIcon className="h-4 w-4" />
                                                <span>Add</span>
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {(isEditing ? editedSkills : (assistant.skills || [])).map((skill, index) => (
                                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100/70 text-blue-800">
                                                {skill}
                                                {isEditing && (
                                                    <button
                                                        onClick={() => handleRemoveSkill(index)}
                                                        className="ml-1 text-blue-600 hover:text-blue-800"
                                                    >
                                                        <XMarkIcon className="h-3 w-3" />
                                                    </button>
                                                )}
                                            </span>
                                        ))}
                                        {isEditing && isAddingSkill && (
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={newSkill}
                                                    onChange={(e) => setNewSkill(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                                    className="text-xs border border-gray-300 rounded px-2 py-1"
                                                    placeholder="Enter skill"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={handleAddSkill}
                                                    className="text-green-600 hover:text-green-800 text-xs"
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    onClick={() => { setIsAddingSkill(false); setNewSkill('') }}
                                                    className="text-red-600 hover:text-red-800 text-xs"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Files & Documents */}
                            <div className="bg-gray-50/30 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-medium text-gray-900">Files & Documents</h4>
                                    <button
                                        onClick={handleFileUpload}
                                        className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:text-blue-700 text-sm border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                                    >
                                        <PlusIcon className="h-4 w-4" />
                                        <span>Upload File</span>
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {assistant.cvFiles && assistant.cvFiles.length > 0 ? (
                                        assistant.cvFiles.map((file, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-3 bg-white/70 rounded-lg border border-gray-200/50">
                                                <DocumentIcon className="h-8 w-8 text-blue-500" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                                    <p className="text-xs text-gray-500">Uploaded: {formatDate(file.uploadDate)}</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                        Download
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteFile(file.name)}
                                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4">
                                            <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-500">No files uploaded</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Customers Tab */}
                    {selectedTab === 1 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-medium text-gray-900">Managed Customers</h4>
                                <div className="text-sm text-gray-500">
                                    Total Revenue: <span className="font-medium text-green-600">${totalRevenue.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Package
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Service
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Started
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white/50 divide-y divide-gray-200">
                                        {assistantCustomers.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                    No customers assigned to this assistant.
                                                </td>
                                            </tr>
                                        ) : (
                                            assistantCustomers.map((customer) => (
                                                <tr key={customer.id} className="hover:bg-gray-50/50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                            <div className="text-sm text-gray-500">{customer.email}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {customer.subscriptionPackage}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {customer.marketingService}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                                                            {customer.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatDate(customer.startedDate)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {customer.totalAmount}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Management Tab */}
                    {selectedTab === 2 && (
                        <div className="space-y-6">
                            <h4 className="text-lg font-medium text-gray-900">Assistant Management</h4>

                            {/* Status Management */}
                            <div className="bg-gray-50/30 rounded-lg p-4">
                                <h5 className="text-md font-medium text-gray-900 mb-4">Status Management</h5>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Current Status</label>
                                        <div className="mt-2 space-y-2">
                                            {['Active', 'Paused', 'Inactive'].map((status) => (
                                                <label key={status} className="inline-flex items-center mr-6">
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value={status}
                                                        checked={assistant.status === status}
                                                        onChange={() => onStatusChange(assistant.id, status as 'Active' | 'Inactive' | 'Paused')}
                                                        className="form-radio h-4 w-4 text-blue-600"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{status}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <p className="text-sm text-gray-600 mb-2">Status Descriptions:</p>
                                        <ul className="text-xs text-gray-500 space-y-1">
                                            <li><strong>Active:</strong> Assistant is currently working and can take new customers</li>
                                            <li><strong>Paused:</strong> Assistant is temporarily unavailable but still employed</li>
                                            <li><strong>Inactive:</strong> Assistant is no longer working for the company</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Statistics */}
                            <div className="bg-gray-50/30 rounded-lg p-4">
                                <h5 className="text-md font-medium text-gray-900 mb-4">Performance Overview</h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-white/70 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">{assistant.customerCount}</div>
                                        <div className="text-sm text-gray-500">Total Customers</div>
                                    </div>
                                    <div className="text-center p-4 bg-white/70 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(0)}</div>
                                        <div className="text-sm text-gray-500">Total Revenue</div>
                                    </div>
                                    <div className="text-center p-4 bg-white/70 rounded-lg">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {assistant.customerCount > 0 ? (totalRevenue / assistant.customerCount).toFixed(0) : '0'}
                                        </div>
                                        <div className="text-sm text-gray-500">Avg. Revenue/Customer</div>
                                    </div>
                                </div>
                            </div>

                            {/* Work History */}
                            <div className="bg-gray-50/30 rounded-lg p-4">
                                <h5 className="text-md font-medium text-gray-900 mb-4">Work History</h5>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Started working</p>
                                            <p className="text-xs text-gray-500">{formatDate(assistant.startWorkDate || assistant.joinedDate)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Joined company</p>
                                            <p className="text-xs text-gray-500">{formatDate(assistant.joinedDate)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}