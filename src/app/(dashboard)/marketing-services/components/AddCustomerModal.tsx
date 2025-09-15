import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SystemUser {
    id: number;
    name: string;
    email: string;
    subscriptionPackage: string;
}

interface AddCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentStep: number;
    userSearchTerm: string;
    onUserSearchChange: (term: string) => void;
    systemUsers: SystemUser[];
    selectedUser: SystemUser | null;
    onUserSelect: (user: SystemUser) => void;
    newCustomer: {
        name: string;
        email: string;
        subscriptionPackage: string;
        assistantName: string;
        marketingService: string;
        startedDate: string;
        status: string;
    };
    onCustomerChange: (field: string, value: string) => void;
    availableAssistants: string[];
    onNextStep: () => void;
    onPrevStep: () => void;
    onSubmit: () => void;
}

export default function AddCustomerModal({
    isOpen,
    onClose,
    currentStep,
    userSearchTerm,
    onUserSearchChange,
    systemUsers,
    selectedUser,
    onUserSelect,
    newCustomer,
    onCustomerChange,
    availableAssistants,
    onNextStep,
    onPrevStep,
    onSubmit
}: AddCustomerModalProps) {
    if (!isOpen) return null;

    const filteredUsers = systemUsers.filter(user =>
        user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Add New Customer - Step {currentStep} of 2
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6">
                    {currentStep === 1 ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Search System Users
                                </label>
                                <input
                                    type="text"
                                    value={userSearchTerm}
                                    onChange={(e) => onUserSearchChange(e.target.value)}
                                    placeholder="Type at least 3 characters to search..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {userSearchTerm.length >= 3 && (
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map(user => (
                                            <div
                                                key={user.id}
                                                onClick={() => onUserSelect(user)}
                                                className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedUser?.id === user.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                                <div className="text-sm text-gray-600">{user.subscriptionPackage}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4 text-gray-500">
                                            No users found
                                        </div>
                                    )}
                                </div>
                            )}

                            {userSearchTerm.length > 0 && userSearchTerm.length < 3 && (
                                <div className="text-center py-4 text-gray-500 text-sm">
                                    Type at least 3 characters to search
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button
                                    onClick={onNextStep}
                                    disabled={!selectedUser}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="mb-4">
                                <p className="text-gray-700 text-sm mb-2">
                                    Adding customer: <span className="font-medium">{selectedUser?.name}</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600">
                                        {newCustomer.name}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600">
                                        {newCustomer.email}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Package</label>
                                <div className="relative">
                                    <select
                                        value={newCustomer.subscriptionPackage}
                                        onChange={(e) => onCustomerChange('subscriptionPackage', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                    >
                                        <option value="">Select package...</option>
                                        <option value="Basic Plan">Basic Plan</option>
                                        <option value="Pro Plan">Pro Plan</option>
                                        <option value="Enterprise Plan">Enterprise Plan</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assistant Name</label>
                                <div className="relative">
                                    <select
                                        value={newCustomer.assistantName}
                                        onChange={(e) => onCustomerChange('assistantName', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                    >
                                        <option value="">Select assistant...</option>
                                        {availableAssistants.map(assistant => (
                                            <option key={assistant} value={assistant}>{assistant}</option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Marketing Service</label>
                                <div className="relative">
                                    <select
                                        value={newCustomer.marketingService}
                                        onChange={(e) => onCustomerChange('marketingService', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                    >
                                        <option value="">Select service...</option>
                                        <option value="MA-1 — SevenX Launch & Enablement">MA-1 — SevenX Launch & Enablement</option>
                                        <option value="MA-2 — Social, Fanpage & Website Management">MA-2 — Social, Fanpage & Website Management</option>
                                        <option value="MA-3 — Performance Ads (Lead Generations)">MA-3 — Performance Ads (Lead Generations)</option>
                                        <option value="MA-4 — Creative & Content Studio">MA-4 — Creative & Content Studio</option>
                                        <option value="MA-5 — Contact & Converstion Management">MA-5 — Contact & Converstion Management</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Started Date</label>
                                <input
                                    type="date"
                                    value={newCustomer.startedDate}
                                    onChange={(e) => onCustomerChange('startedDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    onClick={onPrevStep}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={onSubmit}
                                    disabled={!newCustomer.name || !newCustomer.email || !newCustomer.subscriptionPackage || !newCustomer.assistantName || !newCustomer.marketingService || !newCustomer.startedDate}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    Add Customer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
