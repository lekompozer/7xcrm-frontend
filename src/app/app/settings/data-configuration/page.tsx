'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import {
    UserGroupIcon,
    DocumentTextIcon,
    CubeIcon,
    ShieldCheckIcon,
    ClipboardDocumentCheckIcon,
    UserIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function DataConfigurationPage() {
    const [activeTab, setActiveTab] = useState('lead');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const tabs = useMemo(() => [
        { id: 'lead', name: 'Lead', icon: UserGroupIcon },
        { id: 'note', name: 'Note', icon: DocumentTextIcon },
        { id: 'product', name: 'Product', icon: CubeIcon },
        { id: 'policy', name: 'Policy', icon: ShieldCheckIcon },
        { id: 'task', name: 'Task', icon: ClipboardDocumentCheckIcon },
        { id: 'user', name: 'User', icon: UserIcon },
    ], []);

    // Check scroll position to show/hide arrows
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    // Handle scroll left
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    // Handle scroll right
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    // Check scroll position on mount and when tabs change
    useEffect(() => {
        checkScrollPosition();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, [tabs]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'lead':
                return <LeadConfigTab />;
            case 'note':
                return <NoteConfigTab />;
            case 'product':
                return <ProductConfigTab />;
            case 'policy':
                return <PolicyConfigTab />;
            case 'task':
                return <TaskConfigTab />;
            case 'user':
                return <UserConfigTab />;
            default:
                return <LeadConfigTab />;
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Data Configuration</h1>
                <p className="text-gray-600 mt-2">Configure data fields and settings for your CRM system</p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                <div className="border-b border-gray-200">
                    <div className="relative">
                        {/* Left scroll arrow */}
                        <button
                            onClick={scrollLeft}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-200 transition-opacity duration-200 ${canScrollLeft ? 'opacity-100 hover:bg-gray-50' : 'opacity-0 pointer-events-none'
                                }`}
                            style={{ transform: 'translateY(-50%) translateX(-50%)' }}
                        >
                            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                        </button>

                        {/* Right scroll arrow */}
                        <button
                            onClick={scrollRight}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-200 transition-opacity duration-200 ${canScrollRight ? 'opacity-100 hover:bg-gray-50' : 'opacity-0 pointer-events-none'
                                }`}
                            style={{ transform: 'translateY(-50%) translateX(50%)' }}
                        >
                            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                        </button>

                        {/* Scrollable tabs container */}
                        <nav
                            ref={scrollContainerRef}
                            className="-mb-px flex overflow-x-auto stats-scroll-container"
                            onScroll={checkScrollPosition}
                        >
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 flex-shrink-0 ${activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{tab.name}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}

// Lead Configuration Tab Component
function LeadConfigTab() {
    const leadFields = [
        { name: 'First Name', type: 'Text', required: true, enabled: true },
        { name: 'Last Name', type: 'Text', required: true, enabled: true },
        { name: 'Email', type: 'Email', required: true, enabled: true },
        { name: 'Phone', type: 'Phone', required: false, enabled: true },
        { name: 'Company', type: 'Text', required: false, enabled: true },
        { name: 'Lead Source', type: 'Dropdown', required: false, enabled: true },
        { name: 'Lead Status', type: 'Dropdown', required: true, enabled: true },
        { name: 'Lead Stage', type: 'Dropdown', required: true, enabled: true },
        { name: 'Lead Score', type: 'Number', required: false, enabled: false },
    ];

    const leadStatusOptions = [
        { value: 'New', active: true },
        { value: 'Contacted', active: true },
        { value: 'Qualified', active: true },
        { value: 'Unqualified', active: false },
        { value: 'Closed', active: true },
    ];

    const leadStageOptions = [
        { value: 'Initial Contact', active: true },
        { value: 'Discovery', active: true },
        { value: 'Proposal', active: true },
        { value: 'Negotiation', active: true },
        { value: 'Closed Won', active: true },
        { value: 'Closed Lost', active: false },
    ];

    return (
        <div className="space-y-8">
            {/* Lead Fields Configuration */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Lead Data Configuration</h3>
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Custom Field
                    </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {leadFields.map((field, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{field.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{field.type}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${field.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {field.required ? 'Required' : 'Optional'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${field.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {field.enabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Lead Status Configuration */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-900">Lead Status Options</h4>
                    <button className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                        <PlusIcon className="h-3 w-3 mr-1" />
                        Add Status
                    </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {leadStatusOptions.map((status, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-900">{status.value}</span>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {status.active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                                    <button className="text-red-600 hover:text-red-900 text-sm">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lead Stage Configuration */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-900">Lead Stage Options</h4>
                    <button className="inline-flex items-center px-3 py-1.5 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors">
                        <PlusIcon className="h-3 w-3 mr-1" />
                        Add Stage
                    </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {leadStageOptions.map((stage, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-900">{stage.value}</span>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stage.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {stage.active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                                    <button className="text-red-600 hover:text-red-900 text-sm">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Note Configuration Tab Component
function NoteConfigTab() {
    const noteSettings = [
        { setting: 'Auto-save notes', value: 'Enabled', description: 'Automatically save notes as you type' },
        { setting: 'Note attachments', value: 'Enabled', description: 'Allow file attachments to notes' },
        { setting: 'Note templates', value: 'Enabled', description: 'Use predefined note templates' },
        { setting: 'Note history', value: 'Enabled', description: 'Keep version history of note changes' },
    ];

    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Note Configuration</h3>

            <div className="space-y-4">
                {noteSettings.map((setting, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">{setting.setting}</h4>
                                <p className="text-sm text-gray-600">{setting.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${setting.value === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {setting.value}
                                </span>
                                <button className="text-blue-600 hover:text-blue-900">
                                    <Cog6ToothIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Product Configuration Tab Component
function ProductConfigTab() {
    const productCategories = [
        'Life Insurance',
        'Health Insurance',
        'Disability Insurance',
        'Annuities',
        'Investment Products'
    ];

    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Product Configuration</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Product Categories</h4>
                    <div className="space-y-2">
                        {productCategories.map((category, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                                <span className="text-sm text-gray-900">{category}</span>
                                <button className="text-red-600 hover:text-red-900">Remove</button>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors">
                        + Add Category
                    </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Product Settings</h4>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Enable product variants</span>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Enabled</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Product pricing tiers</span>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Enabled</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Product recommendations</span>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Disabled</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Policy Configuration Tab Component
function PolicyConfigTab() {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Policy Configuration</h3>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-900">Policy Management Settings</h4>
                        <p className="text-gray-600">Configure policy workflows and approval processes</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Approval Workflow</h5>
                        <p className="text-sm text-gray-600">Configure multi-step approval process for policies</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Policy Templates</h5>
                        <p className="text-sm text-gray-600">Manage standardized policy document templates</p>
                    </div>
                </div>

                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Configure Policy Settings
                </button>
            </div>
        </div>
    );
}

// Task Configuration Tab Component
function TaskConfigTab() {
    const taskTypes = [
        'Follow-up Call',
        'Email Campaign',
        'Document Review',
        'Client Meeting',
        'Policy Review'
    ];

    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Task Configuration</h3>

            <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Task Types</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {taskTypes.map((type, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                                <span className="text-sm text-gray-900">{type}</span>
                                <button className="text-blue-600 hover:text-blue-900">Edit</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Task Automation</h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Auto-assign tasks based on lead source</span>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Enabled</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Send reminder notifications</span>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Enabled</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Escalate overdue tasks</span>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Disabled</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// User Configuration Tab Component
function UserConfigTab() {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">User Configuration</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">User Roles & Permissions</h4>
                    <div className="space-y-3">
                        <div className="p-3 bg-white rounded border">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900">Admin</span>
                                <span className="text-xs text-gray-500">Full access</span>
                            </div>
                        </div>
                        <div className="p-3 bg-white rounded border">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900">Manager</span>
                                <span className="text-xs text-gray-500">Team management</span>
                            </div>
                        </div>
                        <div className="p-3 bg-white rounded border">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900">Agent</span>
                                <span className="text-xs text-gray-500">Lead management</span>
                            </div>
                        </div>
                    </div>
                    <button className="mt-4 w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors">
                        + Add Role
                    </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">User Settings</h4>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Two-factor authentication</span>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Required</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Password complexity</span>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">High</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Session timeout</span>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">4 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Email notifications</span>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Enabled</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}