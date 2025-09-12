import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface DeactivatedCustomer {
    id: number;
    customer: string;
    email: string;
    subscriptionPackage: string;
    assistantName: string;
    status: string;
    marketingService: string;
    registeredDate: string;
    startedDate: string;
    deactivatedDate: string;
    amount: string;
}

interface RestoreCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    customer: DeactivatedCustomer | null;
    onConfirmRestore: () => void;
    onRestoreWithNewPackage: () => void;
    availableAssistants: string[];
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
    showNewPackageForm: boolean;
    onSubmitNewPackage: () => void;
}

export default function RestoreCustomerModal({
    isOpen,
    onClose,
    customer,
    onConfirmRestore,
    onRestoreWithNewPackage,
    availableAssistants,
    newCustomer,
    onCustomerChange,
    showNewPackageForm,
    onSubmitNewPackage
}: RestoreCustomerModalProps) {
    if (!isOpen || !customer) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                    <h2 className="text-xl font-semibold text-gray-900">Restore Customer</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6">
                    {!showNewPackageForm ? (
                        <div className="mb-6">
                            <p className="text-gray-700 mb-6">
                                Choose how you want to restore this customer:
                            </p>

                            <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-600">Customer:</span>
                                    <span className="text-sm text-gray-900">{customer.customer}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-600">Email:</span>
                                    <span className="text-sm text-gray-900">{customer.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-600">Previous Service:</span>
                                    <span className="text-sm text-gray-900">{customer.marketingService}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-600">Previous Assistant:</span>
                                    <span className="text-sm text-gray-900">{customer.assistantName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-600">Deactivated:</span>
                                    <span className="text-sm text-gray-900">
                                        {new Date(customer.deactivatedDate).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={onConfirmRestore}
                                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                                >
                                    <div className="font-medium text-gray-900 mb-1">Restore as Previous</div>
                                    <div className="text-sm text-gray-600">
                                        Restore with the same package, service, and assistant as before
                                    </div>
                                </button>

                                <button
                                    onClick={onRestoreWithNewPackage}
                                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
                                >
                                    <div className="font-medium text-gray-900 mb-1">Register New Package</div>
                                    <div className="text-sm text-gray-600">
                                        Register with a new subscription package and assistant
                                    </div>
                                </button>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="mb-4">
                                <p className="text-gray-700 text-sm mb-2">
                                    Registering new package for: <span className="font-medium">{customer.customer}</span>
                                </p>
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
                                        <option value="Marketing Assistant Basic">Marketing Assistant Basic</option>
                                        <option value="Marketing Assistant Premium">Marketing Assistant Premium</option>
                                        <option value="Marketing Assistant Pro">Marketing Assistant Pro</option>
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
                                    onClick={onClose}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onSubmitNewPackage}
                                    disabled={!newCustomer.subscriptionPackage || !newCustomer.assistantName || !newCustomer.marketingService || !newCustomer.startedDate}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    Register New Package
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
