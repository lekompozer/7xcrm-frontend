import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    newProduct: {
        productName: string;
        productId: string;
        branch: string;
        yearOfContribution: number;
        premiumMode: string;
        premiumPayment: number;
        targetPremium: number;
        faceAmount: number;
        description: string;
        status: string;
    };
    onProductChange: (field: string, value: string | number) => void;
    onSubmit: () => void;
}

export default function AddProductModal({
    isOpen,
    onClose,
    newProduct,
    onProductChange,
    onSubmit
}: AddProductModalProps) {
    if (!isOpen) return null;

    const branches = [
        'Life Insurance',
        'Health Insurance',
        'Disability Insurance',
        'Annuities'
    ];

    const premiumModes = [
        'Monthly',
        'Quarterly',
        'Semi-Annual',
        'Annual'
    ];

    const statuses = [
        'Active',
        'Inactive',
        'Discontinued'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-2xl w-full mx-4 border border-gray-200 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Add New Life Insurance Product
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-6">
                        {/* Product Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.productName}
                                    onChange={(e) => onProductChange('productName', e.target.value)}
                                    placeholder="e.g., Indexed Universal Life (IUL)"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product ID *
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.productId}
                                    onChange={(e) => onProductChange('productId', e.target.value)}
                                    placeholder="e.g., IUL-001"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Branch and Year */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Branch *
                                </label>
                                <div className="relative">
                                    <select
                                        value={newProduct.branch}
                                        onChange={(e) => onProductChange('branch', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        {branches.map(branch => (
                                            <option key={branch} value={branch}>{branch}</option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Year of Contribution *
                                </label>
                                <input
                                    type="number"
                                    value={newProduct.yearOfContribution || ''}
                                    onChange={(e) => onProductChange('yearOfContribution', parseInt(e.target.value) || 0)}
                                    placeholder="e.g., 2024"
                                    min="2020"
                                    max="2030"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Premium Information */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Premium Mode *
                                </label>
                                <div className="relative">
                                    <select
                                        value={newProduct.premiumMode}
                                        onChange={(e) => onProductChange('premiumMode', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                        required
                                    >
                                        <option value="">Select Mode</option>
                                        {premiumModes.map(mode => (
                                            <option key={mode} value={mode}>{mode}</option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Premium Payment *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={newProduct.premiumPayment || ''}
                                        onChange={(e) => onProductChange('premiumPayment', parseFloat(e.target.value) || 0)}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Target Premium *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={newProduct.targetPremium || ''}
                                        onChange={(e) => onProductChange('targetPremium', parseFloat(e.target.value) || 0)}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Face Amount and Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Face Amount *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={newProduct.faceAmount || ''}
                                        onChange={(e) => onProductChange('faceAmount', parseFloat(e.target.value) || 0)}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <div className="relative">
                                    <select
                                        value={newProduct.status}
                                        onChange={(e) => onProductChange('status', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                        required
                                    >
                                        <option value="">Select Status</option>
                                        {statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                value={newProduct.description}
                                onChange={(e) => onProductChange('description', e.target.value)}
                                placeholder="Enter detailed product description..."
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                required
                            />
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200/50">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Create Product
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
