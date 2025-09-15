import { useState, useEffect } from 'react';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Customer } from '@/types/customer';

interface CustomerDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    customer: Customer | null;
    onSave?: (customer: Customer) => void;
    readonly?: boolean;
}

export default function CustomerDetailsModal({
    isOpen,
    onClose,
    customer,
    onSave,
    readonly = false
}: CustomerDetailsModalProps) {
    const [activeTab, setActiveTab] = useState('information');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        joinDate: '',
        totalSpent: '',
        source: '',
        referrer: '',
        notes: ''
    });
    const [editedData, setEditedData] = useState({
        name: '',
        phone: '',
        company: '',
        address: '',
        joinDate: ''
    });

    // Subscription status management
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [cancellingSubscription, setCancellingSubscription] = useState<number | null>(null);
    const [cancelReason, setCancelReason] = useState('');

    // Subscription activation management
    const [showActivateDialog, setShowActivateDialog] = useState(false);
    const [activatingSubscription, setActivatingSubscription] = useState<number | null>(null);
    const [activateReason, setActivateReason] = useState('');

    // Initialize form data when customer changes
    useEffect(() => {
        if (customer) {
            setFormData({
                name: customer.name || '',
                email: customer.email || '',
                phone: customer.phone || '',
                company: customer.company || '',
                address: customer.address || '',
                joinDate: customer.joinDate || '',
                totalSpent: customer.totalSpent || '',
                source: customer.source || '',
                referrer: customer.referrer || '',
                notes: customer.notes || ''
            });
        }
    }, [customer]);

    // Dynamic subscription data based on customer
    const getSubscriptionData = () => {
        if (!customer) return [];

        // Trial users: Mike Johnson, Emma Garcia, Jessica Lee, Alex Rodriguez
        if (['Mike Johnson', 'Emma Garcia', 'Jessica Lee', 'Alex Rodriguez'].includes(customer.name)) {
            return [
                {
                    id: 1,
                    package: 'Trial Package',
                    startDate: '2024-08-01',
                    endDate: '2024-09-01',
                    status: 'Trial',
                    amount: '$0.00',
                    paymentMethod: 'Free Trial'
                }
            ];
        }

        // Cancelled users: Robert Taylor, Rachel White
        if (['Robert Taylor', 'Rachel White'].includes(customer.name)) {
            return [
                {
                    id: 2,
                    package: customer.name === 'Robert Taylor' ? 'Pro Package' : 'Basic Package',
                    startDate: '2024-06-01',
                    endDate: '2024-07-01',
                    status: 'Cancelled',
                    amount: customer.name === 'Robert Taylor' ? '$199.99' : '$99.99',
                    paymentMethod: 'Credit Card'
                }
            ];
        }

        // Active users: All others - assign appropriate package based on common patterns
        const activePackage = customer.name.includes('Enterprise') || customer.name === 'Sarah Wilson' || customer.name === 'Anna Martinez' || customer.name === 'Mark Thompson' || customer.name === 'Samantha Clark'
            ? 'Enterprise Package'
            : customer.name.includes('Pro') || customer.name === 'John Doe' || customer.name === 'David Brown' || customer.name === 'Tom Wilson' || customer.name === 'Kevin Miller'
                ? 'Pro Package'
                : 'Basic Package';

        const activeAmount = activePackage === 'Enterprise Package'
            ? '$299.99'
            : activePackage === 'Pro Package'
                ? '$199.99'
                : '$99.99';

        return [
            {
                id: 3,
                package: activePackage,
                startDate: '2024-08-01',
                endDate: '2024-09-01',
                status: 'Active',
                amount: activeAmount,
                paymentMethod: 'Credit Card'
            }
        ];
    };

    // Initialize subscription data state
    const [subscriptionData, setSubscriptionData] = useState<any[]>([]);

    // Update subscription data when customer changes
    useEffect(() => {
        if (customer) {
            const newSubscriptionData = getSubscriptionData();
            setSubscriptionData(newSubscriptionData);
        }
    }, [customer]);

    // Sort subscriptions: Active first, then by most recent start date
    const sortedSubscriptionData = [...subscriptionData].sort((a, b) => {
        // Active status priority
        if (a.status === 'Active' && b.status !== 'Active') return -1;
        if (b.status === 'Active' && a.status !== 'Active') return 1;

        // Then sort by start date (most recent first)
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

    // Sample marketing service data
    const marketingServiceHistory = [
        {
            id: 1,
            service: 'Creative & Content Studio (MA-1)',
            assistant: 'Sarah Johnson',
            startDate: '2024-01-15',
            completedDate: '2024-02-01',
            status: 'Completed',
            amount: '$150.00',
            deliverables: 'Logo Design, Brand Guidelines'
        },
        {
            id: 2,
            service: 'Social Media Management (MA-2)',
            assistant: 'Mike Chen',
            startDate: '2024-02-05',
            completedDate: null,
            status: 'In Progress',
            amount: '$200.00',
            deliverables: 'Content Calendar, Posts'
        },
        {
            id: 3,
            service: 'Performance Ads (MA-4)',
            assistant: 'Lisa Wang',
            startDate: '2024-02-20',
            completedDate: '2024-03-05',
            status: 'Completed',
            amount: '$300.00',
            deliverables: 'Ad Campaigns, Analytics Report'
        }
    ];

    // Calculate totals (moved after subscriptionData state)
    const totalMarketingServiceRevenue = marketingServiceHistory.reduce((sum, service) => {
        return sum + parseFloat(service.amount.replace('$', ''));
    }, 0);

    if (!isOpen || !customer) return null;

    const handleInputChange = (field: string, value: string) => {
        if (!readonly) {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    // Inline editing functions
    const handleEdit = () => {
        if (customer) {
            setEditedData({
                name: customer.name || '',
                phone: customer.phone || '',
                company: customer.company || '',
                address: customer.address || '',
                joinDate: customer.joinDate || ''
            });
            setIsEditing(true);
        }
    };

    const handleSaveInline = () => {
        if (onSave && customer) {
            onSave({
                ...customer,
                ...editedData
            });
        }
        setIsEditing(false);
    };

    const handleCancelInline = () => {
        setIsEditing(false);
    };

    const handleEditedInputChange = (field: string, value: string) => {
        setEditedData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Subscription cancellation functions
    const handleCancelSubscription = (subscriptionId: number) => {
        setCancellingSubscription(subscriptionId);
        setShowCancelDialog(true);
    };

    const handleConfirmCancel = () => {
        if (cancellingSubscription && cancelReason.trim()) {
            setSubscriptionData(prev =>
                prev.map(sub =>
                    sub.id === cancellingSubscription
                        ? { ...sub, status: 'Cancelled' }
                        : sub
                )
            );
            setShowCancelDialog(false);
            setCancellingSubscription(null);
            setCancelReason('');
        }
    };

    const handleCloseCancelDialog = () => {
        setShowCancelDialog(false);
        setCancellingSubscription(null);
        setCancelReason('');
    };

    // Subscription activation functions
    const handleActivateSubscription = (subscriptionId: number) => {
        setActivatingSubscription(subscriptionId);
        setShowActivateDialog(true);
    };

    const handleConfirmActivate = () => {
        if (activatingSubscription && activateReason.trim()) {
            setSubscriptionData(prev =>
                prev.map(sub =>
                    sub.id === activatingSubscription
                        ? { ...sub, status: 'Active' }
                        : sub
                )
            );
            setShowActivateDialog(false);
            setActivatingSubscription(null);
            setActivateReason('');
        }
    };

    const handleCloseActivateDialog = () => {
        setShowActivateDialog(false);
        setActivatingSubscription(null);
        setActivateReason('');
    };

    // Calculate dynamic subscription revenue
    const totalSubscriptionRevenue = subscriptionData.reduce((sum, sub) => {
        return sum + parseFloat(sub.amount.replace('$', ''));
    }, 0);

    const tabs = [
        { id: 'information', name: 'Information' },
        { id: 'subscriptions', name: 'Subscriptions' },
        { id: 'marketing-service', name: 'Marketing Service' },
        { id: 'source', name: 'Source' }
    ];

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
            }}
        >
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden mx-4 shadow-2xl">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                        Customer Details - {customer.name}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Modal Body */}
                <div className="px-6 py-6 max-h-[500px] overflow-y-auto">
                    {/* Information Tab */}
                    {activeTab === 'information' && (
                        <div className="space-y-6">
                            {/* Header with Edit Button */}
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
                                <div className="flex items-center space-x-3">
                                    {isEditing && !readonly && (
                                        <>
                                            <button
                                                onClick={handleCancelInline}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSaveInline}
                                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                                            >
                                                Save
                                            </button>
                                        </>
                                    )}
                                    {!isEditing && !readonly && (
                                        <button
                                            onClick={handleEdit}
                                            className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            <PencilIcon className="w-4 h-4 mr-1" />
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={isEditing ? editedData.name : formData.name}
                                        onChange={(e) => isEditing ? handleEditedInputChange('name', e.target.value) : handleInputChange('name', e.target.value)}
                                        className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${(readonly || !isEditing) ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                        readOnly={readonly || !isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-600"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={isEditing ? editedData.phone : formData.phone}
                                        onChange={(e) => isEditing ? handleEditedInputChange('phone', e.target.value) : handleInputChange('phone', e.target.value)}
                                        className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${(readonly || !isEditing) ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                        readOnly={readonly || !isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                    <input
                                        type="text"
                                        value={isEditing ? editedData.company : formData.company}
                                        onChange={(e) => isEditing ? handleEditedInputChange('company', e.target.value) : handleInputChange('company', e.target.value)}
                                        className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${(readonly || !isEditing) ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                        readOnly={readonly || !isEditing}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                    <input
                                        type="text"
                                        value={isEditing ? editedData.address : formData.address}
                                        onChange={(e) => isEditing ? handleEditedInputChange('address', e.target.value) : handleInputChange('address', e.target.value)}
                                        className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${(readonly || !isEditing) ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                        readOnly={readonly || !isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                                    <input
                                        type="date"
                                        value={isEditing ? editedData.joinDate : formData.joinDate}
                                        onChange={(e) => isEditing ? handleEditedInputChange('joinDate', e.target.value) : handleInputChange('joinDate', e.target.value)}
                                        className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${(readonly || !isEditing) ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                        readOnly={readonly || !isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Spent</label>
                                    <input
                                        type="text"
                                        value={formData.totalSpent}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-600"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Source Tab */}
                    {activeTab === 'source' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                                    <select
                                        value={formData.source}
                                        onChange={(e) => handleInputChange('source', e.target.value)}
                                        className={`w-full border border-gray-300 rounded-md px-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white bg-no-repeat bg-right ${readonly ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                        style={{
                                            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')",
                                            backgroundPosition: "right 10px center",
                                            backgroundSize: "12px 8px"
                                        }}
                                        disabled={readonly}
                                    >
                                        <option value="">Select Source</option>
                                        <option value="Google Ads">Google Ads</option>
                                        <option value="Facebook Ads">Facebook Ads</option>
                                        <option value="Social Media">Social Media</option>
                                        <option value="Organic Search">Organic Search</option>
                                        <option value="Email Marketing">Email Marketing</option>
                                        <option value="Content Marketing">Content Marketing</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Webinar">Webinar</option>
                                        <option value="Direct">Direct</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Referrer</label>
                                    <input
                                        type="text"
                                        value={formData.referrer}
                                        onChange={(e) => handleInputChange('referrer', e.target.value)}
                                        className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${readonly ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                        readOnly={readonly}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                                    <textarea
                                        rows={4}
                                        value={formData.notes}
                                        onChange={(e) => handleInputChange('notes', e.target.value)}
                                        className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${readonly ? 'bg-gray-50 text-gray-600' : ''
                                            }`}
                                        placeholder="Add notes about this customer..."
                                        readOnly={readonly}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Subscriptions Tab */}
                    {activeTab === 'subscriptions' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">Subscription History</h3>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Total Revenue</p>
                                    <p className="text-xl font-bold text-blue-600">${totalSubscriptionRevenue.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Package
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Period
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Payment Method
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {sortedSubscriptionData.map((subscription) => (
                                            <tr key={subscription.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {subscription.package}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {subscription.startDate} - {subscription.endDate}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${subscription.status === 'Active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : subscription.status === 'Trial'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : subscription.status === 'Expired'
                                                                ? 'bg-gray-100 text-gray-800'
                                                                : subscription.status === 'Cancelled'
                                                                    ? 'bg-red-100 text-red-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {subscription.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {subscription.amount}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {subscription.paymentMethod}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {subscription.status === 'Active' && !readonly && (
                                                        <button
                                                            onClick={() => handleCancelSubscription(subscription.id)}
                                                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                    {subscription.status === 'Cancelled' && !readonly && (
                                                        <button
                                                            onClick={() => handleActivateSubscription(subscription.id)}
                                                            className="text-green-600 hover:text-green-900 text-sm font-medium"
                                                        >
                                                            Active
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Marketing Service Tab */}
                    {activeTab === 'marketing-service' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">Marketing Service History</h3>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Total Revenue</p>
                                    <p className="text-xl font-bold text-green-600">${totalMarketingServiceRevenue.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Summary Statistics */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-900">{marketingServiceHistory.length}</p>
                                        <p className="text-sm text-gray-500">Total Services</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-green-600">
                                            {marketingServiceHistory.filter(s => s.status === 'Completed').length}
                                        </p>
                                        <p className="text-sm text-gray-500">Completed</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">
                                            {marketingServiceHistory.filter(s => s.status === 'In Progress').length}
                                        </p>
                                        <p className="text-sm text-gray-500">In Progress</p>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Service
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Assistant
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Timeline
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Deliverables
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {marketingServiceHistory.map((service) => (
                                            <tr key={service.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {service.service}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {service.assistant}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        Start: {service.startDate}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {service.completedDate ? `Completed: ${service.completedDate}` : 'In Progress'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${service.status === 'Completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : service.status === 'In Progress'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {service.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {service.amount}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {service.deliverables}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Cancel Subscription Confirmation Dialog */}
            {showCancelDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleCloseCancelDialog}></div>
                    <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium text-red-600 mb-4">Cancel Subscription</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            If you cancel the subscription package, the user will immediately lose access to the 7xCRM application and will not be able to use it until the subscription is reactivated. Do you still want to proceed with canceling the user&apos;s subscription?
                        </p>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cancellation Reason *
                            </label>
                            <textarea
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                placeholder="Please provide a reason for cancellation..."
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleCloseCancelDialog}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmCancel}
                                disabled={!cancelReason.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Confirm Cancellation
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Activate Subscription Confirmation Dialog */}
            {showActivateDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleCloseActivateDialog}></div>
                    <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium text-green-600 mb-4">Activate Subscription</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            By activating this subscription package, the user will regain full access to the 7xCRM application and all associated features. Do you want to proceed with activating the user&apos;s subscription?
                        </p>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Activation Reason *
                            </label>
                            <textarea
                                value={activateReason}
                                onChange={(e) => setActivateReason(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                placeholder="Please provide a reason for activation..."
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleCloseActivateDialog}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmActivate}
                                disabled={!activateReason.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Confirm Activation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
