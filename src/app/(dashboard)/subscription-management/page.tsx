'use client';

import { CalendarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function SubscriptionManagement() {
    // State để quản lý stat được chọn, mặc định là Total
    const [selectedStat, setSelectedStat] = useState('total');
    // State để quản lý popup history
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedCustomerHistory, setSelectedCustomerHistory] = useState<{ id: number, name: string, history: { date: string, action: string, plan: string, amount: string, status: string }[] } | null>(null);
    // State để quản lý popup customer detail
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<{ [key: string]: string | number } | null>(null);
    const [activeTab, setActiveTab] = useState('information');

    // State cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Stats cho 6 loại subscription (thêm Total)
    const subscriptionStats = [
        { id: 'total', name: 'Total', count: 971, color: 'bg-gray-500' },
        { id: 'trial', name: 'Trial', count: 125, color: 'bg-blue-500' },
        { id: 'basic', name: 'Basic Plan', count: 234, color: 'bg-green-500' },
        { id: 'pro', name: 'Pro Plan', count: 456, color: 'bg-purple-500' },
        { id: 'enterprise', name: 'Enterprise Plan', count: 89, color: 'bg-orange-500' },
        { id: 'cancelled', name: 'Cancelled', count: 67, color: 'bg-red-500' },
    ];

    // Data với subscription types
    const subscriptions = [
        {
            id: 1,
            customerName: 'John Doe',
            email: 'john@example.com',
            plan: 'pro',
            planDisplay: 'Pro Plan',
            status: 'Active',
            startDate: '2024-01-15',
            nextBilling: '2024-02-15',
            amount: '$29.99',
        },
        {
            id: 2,
            customerName: 'Jane Smith',
            email: 'jane@example.com',
            plan: 'basic',
            planDisplay: 'Basic Plan',
            status: 'Active',
            startDate: '2024-01-10',
            nextBilling: '2024-02-10',
            amount: '$9.99',
        },
        {
            id: 3,
            customerName: 'Mike Johnson',
            email: 'mike@example.com',
            plan: 'trial',
            planDisplay: 'Trial',
            status: 'Trial',
            startDate: '2024-01-25',
            nextBilling: '2024-02-25',
            amount: '$0.00',
        },
        {
            id: 4,
            customerName: 'Sarah Wilson',
            email: 'sarah@example.com',
            plan: 'enterprise',
            planDisplay: 'Enterprise Plan',
            status: 'Active',
            startDate: '2024-01-05',
            nextBilling: '2024-02-05',
            amount: '$99.99',
        },
        {
            id: 5,
            customerName: 'David Brown',
            email: 'david@example.com',
            plan: 'pro',
            planDisplay: 'Pro Plan',
            status: 'Active',
            startDate: '2024-01-12',
            nextBilling: '2024-02-12',
            amount: '$29.99',
        },
        {
            id: 6,
            customerName: 'Lisa Davis',
            email: 'lisa@example.com',
            plan: 'basic',
            planDisplay: 'Basic Plan',
            status: 'Active',
            startDate: '2024-01-20',
            nextBilling: '2024-02-20',
            amount: '$9.99',
        },
        {
            id: 7,
            customerName: 'Robert Taylor',
            email: 'robert@example.com',
            plan: 'cancelled',
            planDisplay: 'Pro Plan',
            status: 'Cancelled',
            startDate: '2023-12-01',
            nextBilling: '-',
            amount: '-',
        },
        {
            id: 8,
            customerName: 'Emma Garcia',
            email: 'emma@example.com',
            plan: 'trial',
            planDisplay: 'Trial',
            status: 'Trial',
            startDate: '2024-01-28',
            nextBilling: '2024-02-28',
            amount: '$0.00',
        },
        {
            id: 9,
            customerName: 'Tom Wilson',
            email: 'tom@example.com',
            plan: 'pro',
            planDisplay: 'Pro Plan',
            status: 'Active',
            startDate: '2024-02-01',
            nextBilling: '2024-03-01',
            amount: '$29.99',
        },
        {
            id: 10,
            customerName: 'Anna Martinez',
            email: 'anna@example.com',
            plan: 'enterprise',
            planDisplay: 'Enterprise Plan',
            status: 'Active',
            startDate: '2024-02-05',
            nextBilling: '2024-03-05',
            amount: '$99.99',
        },
        {
            id: 11,
            customerName: 'Chris Anderson',
            email: 'chris@example.com',
            plan: 'basic',
            planDisplay: 'Basic Plan',
            status: 'Active',
            startDate: '2024-02-10',
            nextBilling: '2024-03-10',
            amount: '$9.99',
        },
        {
            id: 12,
            customerName: 'Jessica Lee',
            email: 'jessica@example.com',
            plan: 'trial',
            planDisplay: 'Trial',
            status: 'Trial',
            startDate: '2024-02-15',
            nextBilling: '2024-03-15',
            amount: '$0.00',
        },
        {
            id: 13,
            customerName: 'Mark Thompson',
            email: 'mark@example.com',
            plan: 'enterprise',
            planDisplay: 'Enterprise Plan',
            status: 'Active',
            startDate: '2024-02-20',
            nextBilling: '2024-03-20',
            amount: '$99.99',
        },
        {
            id: 14,
            customerName: 'Rachel White',
            email: 'rachel@example.com',
            plan: 'cancelled',
            planDisplay: 'Basic Plan',
            status: 'Cancelled',
            startDate: '2024-01-30',
            nextBilling: '-',
            amount: '-',
        },
        {
            id: 15,
            customerName: 'Kevin Miller',
            email: 'kevin@example.com',
            plan: 'pro',
            planDisplay: 'Pro Plan',
            status: 'Active',
            startDate: '2024-02-25',
            nextBilling: '2024-03-25',
            amount: '$29.99',
        },
        {
            id: 16,
            customerName: 'Nicole Davis',
            email: 'nicole@example.com',
            plan: 'basic',
            planDisplay: 'Basic Plan',
            status: 'Active',
            startDate: '2024-03-01',
            nextBilling: '2024-04-01',
            amount: '$9.99',
        },
        {
            id: 17,
            customerName: 'Alex Rodriguez',
            email: 'alex@example.com',
            plan: 'trial',
            planDisplay: 'Trial',
            status: 'Trial',
            startDate: '2024-03-10',
            nextBilling: '2024-04-10',
            amount: '$0.00',
        },
        {
            id: 18,
            customerName: 'Samantha Clark',
            email: 'samantha@example.com',
            plan: 'enterprise',
            planDisplay: 'Enterprise Plan',
            status: 'Active',
            startDate: '2024-03-15',
            nextBilling: '2024-04-15',
            amount: '$99.99',
        },
    ];

    // Data lịch sử subscription cho mỗi customer
    const subscriptionHistories: { [key: number]: { date: string, action: string, plan: string, amount: string, status: string }[] } = {
        1: [ // John Doe
            { date: '2024-01-15', action: 'Subscribed', plan: 'Pro Plan', amount: '$29.99', status: 'Success' },
            { date: '2023-12-01', action: 'Upgraded', plan: 'Basic → Pro Plan', amount: '$29.99', status: 'Success' },
            { date: '2023-11-15', action: 'Subscribed', plan: 'Basic Plan', amount: '$9.99', status: 'Success' },
        ],
        2: [ // Jane Smith
            { date: '2024-01-10', action: 'Subscribed', plan: 'Basic Plan', amount: '$9.99', status: 'Success' },
            { date: '2023-10-10', action: 'Trial Ended', plan: 'Trial → Basic Plan', amount: '$9.99', status: 'Success' },
        ],
        3: [ // Mike Johnson
            { date: '2024-01-25', action: 'Started Trial', plan: 'Trial', amount: '$0.00', status: 'Active' },
        ],
        4: [ // Sarah Wilson
            { date: '2024-01-05', action: 'Subscribed', plan: 'Enterprise Plan', amount: '$99.99', status: 'Success' },
            { date: '2023-11-20', action: 'Upgraded', plan: 'Pro → Enterprise Plan', amount: '$99.99', status: 'Success' },
        ],
        5: [ // David Brown
            { date: '2024-01-12', action: 'Subscribed', plan: 'Pro Plan', amount: '$29.99', status: 'Success' },
        ],
        6: [ // Lisa Davis
            { date: '2024-01-20', action: 'Subscribed', plan: 'Basic Plan', amount: '$9.99', status: 'Success' },
        ],
        7: [ // Robert Taylor
            { date: '2024-01-15', action: 'Cancelled', plan: 'Pro Plan', amount: '-', status: 'Cancelled' },
            { date: '2023-12-01', action: 'Subscribed', plan: 'Pro Plan', amount: '$29.99', status: 'Success' },
        ],
        8: [ // Emma Garcia
            { date: '2024-01-28', action: 'Started Trial', plan: 'Trial', amount: '$0.00', status: 'Active' },
        ],
        9: [ // Tom Wilson
            { date: '2024-02-01', action: 'Subscribed', plan: 'Pro Plan', amount: '$29.99', status: 'Success' },
        ],
        10: [ // Anna Martinez
            { date: '2024-02-05', action: 'Subscribed', plan: 'Enterprise Plan', amount: '$99.99', status: 'Success' },
            { date: '2024-01-20', action: 'Upgraded', plan: 'Pro → Enterprise Plan', amount: '$99.99', status: 'Success' },
        ],
        11: [ // Chris Anderson
            { date: '2024-02-10', action: 'Subscribed', plan: 'Basic Plan', amount: '$9.99', status: 'Success' },
        ],
        12: [ // Jessica Lee
            { date: '2024-02-15', action: 'Started Trial', plan: 'Trial', amount: '$0.00', status: 'Active' },
        ],
        13: [ // Mark Thompson
            { date: '2024-02-20', action: 'Subscribed', plan: 'Enterprise Plan', amount: '$99.99', status: 'Success' },
        ],
        14: [ // Rachel White
            { date: '2024-02-15', action: 'Cancelled', plan: 'Basic Plan', amount: '-', status: 'Cancelled' },
            { date: '2024-01-30', action: 'Subscribed', plan: 'Basic Plan', amount: '$9.99', status: 'Success' },
        ],
        15: [ // Kevin Miller
            { date: '2024-02-25', action: 'Subscribed', plan: 'Pro Plan', amount: '$29.99', status: 'Success' },
        ],
        16: [ // Nicole Davis
            { date: '2024-03-01', action: 'Subscribed', plan: 'Basic Plan', amount: '$9.99', status: 'Success' },
        ],
        17: [ // Alex Rodriguez
            { date: '2024-03-10', action: 'Started Trial', plan: 'Trial', amount: '$0.00', status: 'Active' },
        ],
        18: [ // Samantha Clark
            { date: '2024-03-15', action: 'Subscribed', plan: 'Enterprise Plan', amount: '$99.99', status: 'Success' },
        ],
    };

    // Data chi tiết customer
    const customerDetails: { [key: number]: { [key: string]: string | number } } = {
        1: { // John Doe
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 (555) 123-4567',
            address: '123 Main St, New York, NY 10001',
            company: 'Tech Solutions Inc.',
            joinDate: '2023-11-15',
            totalSpent: '$89.97',
            source: 'Google Ads',
            referrer: 'Search Campaign',
            notes: 'Premium customer, responsive to email campaigns'
        },
        2: { // Jane Smith
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+1 (555) 234-5678',
            address: '456 Oak Ave, Los Angeles, CA 90210',
            company: 'Design Studio LLC',
            joinDate: '2023-10-10',
            totalSpent: '$29.97',
            source: 'Social Media',
            referrer: 'Facebook Ad Campaign',
            notes: 'Interested in design features'
        },
        3: { // Mike Johnson
            id: 3,
            name: 'Mike Johnson',
            email: 'mike@example.com',
            phone: '+1 (555) 345-6789',
            address: '789 Pine St, Chicago, IL 60601',
            company: 'Freelancer',
            joinDate: '2024-01-25',
            totalSpent: '$0.00',
            source: 'Organic Search',
            referrer: 'Direct Website Visit',
            notes: 'Trial user, needs follow-up'
        },
        4: { // Sarah Wilson
            id: 4,
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            phone: '+1 (555) 456-7890',
            address: '321 Elm St, Seattle, WA 98101',
            company: 'Wilson Enterprises',
            joinDate: '2023-11-20',
            totalSpent: '$199.98',
            source: 'Referral',
            referrer: 'Partner Program',
            notes: 'High-value customer, enterprise needs'
        },
        5: { // David Brown
            id: 5,
            name: 'David Brown',
            email: 'david@example.com',
            phone: '+1 (555) 567-8901',
            address: '654 Maple Dr, Austin, TX 78701',
            company: 'Brown & Associates',
            joinDate: '2024-01-12',
            totalSpent: '$29.99',
            source: 'Email Marketing',
            referrer: 'Newsletter Campaign',
            notes: 'Engaged with product demos'
        },
        6: { // Lisa Davis
            id: 6,
            name: 'Lisa Davis',
            email: 'lisa@example.com',
            phone: '+1 (555) 678-9012',
            address: '987 Cedar Ln, Miami, FL 33101',
            company: 'Creative Agency',
            joinDate: '2024-01-20',
            totalSpent: '$9.99',
            source: 'Content Marketing',
            referrer: 'Blog Article',
            notes: 'Interested in creative tools'
        },
        7: { // Robert Taylor
            id: 7,
            name: 'Robert Taylor',
            email: 'robert@example.com',
            phone: '+1 (555) 789-0123',
            address: '147 Birch St, Denver, CO 80201',
            company: 'Taylor Consulting',
            joinDate: '2023-12-01',
            totalSpent: '$29.99',
            source: 'Paid Search',
            referrer: 'Google Ads',
            notes: 'Cancelled due to budget constraints'
        },
        8: { // Emma Garcia
            id: 8,
            name: 'Emma Garcia',
            email: 'emma@example.com',
            phone: '+1 (555) 890-1234',
            address: '258 Willow Way, Portland, OR 97201',
            company: 'Garcia Marketing',
            joinDate: '2024-01-28',
            totalSpent: '$0.00',
            source: 'Webinar',
            referrer: 'Marketing Webinar',
            notes: 'Trial from webinar attendee'
        },
        9: { // Tom Wilson
            id: 9,
            name: 'Tom Wilson',
            email: 'tom@example.com',
            phone: '+1 (555) 901-2345',
            address: '369 Spruce Ave, Boston, MA 02101',
            company: 'Wilson Tech',
            joinDate: '2024-02-01',
            totalSpent: '$29.99',
            source: 'Google Ads',
            referrer: 'Search Campaign',
            notes: 'New customer, good engagement'
        },
        10: { // Anna Martinez
            id: 10,
            name: 'Anna Martinez',
            email: 'anna@example.com',
            phone: '+1 (555) 012-3456',
            address: '741 Palm St, San Diego, CA 92101',
            company: 'Martinez Consulting',
            joinDate: '2024-01-20',
            totalSpent: '$199.98',
            source: 'Referral',
            referrer: 'Partner Program',
            notes: 'Upgraded from Pro to Enterprise'
        },
        11: { // Chris Anderson
            id: 11,
            name: 'Chris Anderson',
            email: 'chris@example.com',
            phone: '+1 (555) 123-4567',
            address: '852 Ash Blvd, Phoenix, AZ 85001',
            company: 'Anderson Design',
            joinDate: '2024-02-10',
            totalSpent: '$9.99',
            source: 'Social Media',
            referrer: 'Instagram Campaign',
            notes: 'Small business owner'
        },
        12: { // Jessica Lee
            id: 12,
            name: 'Jessica Lee',
            email: 'jessica@example.com',
            phone: '+1 (555) 234-5678',
            address: '963 Fir Dr, Las Vegas, NV 89101',
            company: 'Lee & Partners',
            joinDate: '2024-02-15',
            totalSpent: '$0.00',
            source: 'Organic Search',
            referrer: 'Google Search',
            notes: 'Currently in trial period'
        },
        13: { // Mark Thompson
            id: 13,
            name: 'Mark Thompson',
            email: 'mark@example.com',
            phone: '+1 (555) 345-6789',
            address: '174 Hickory Ln, Nashville, TN 37201',
            company: 'Thompson Industries',
            joinDate: '2024-02-20',
            totalSpent: '$99.99',
            source: 'Email Marketing',
            referrer: 'Newsletter',
            notes: 'Enterprise customer, tech-savvy'
        },
        14: { // Rachel White
            id: 14,
            name: 'Rachel White',
            email: 'rachel@example.com',
            phone: '+1 (555) 456-7890',
            address: '285 Poplar Way, Atlanta, GA 30301',
            company: 'White Creative',
            joinDate: '2024-01-30',
            totalSpent: '$9.99',
            source: 'Content Marketing',
            referrer: 'Blog Post',
            notes: 'Cancelled subscription, price sensitivity'
        },
        15: { // Kevin Miller
            id: 15,
            name: 'Kevin Miller',
            email: 'kevin@example.com',
            phone: '+1 (555) 567-8901',
            address: '396 Redwood St, Sacramento, CA 95814',
            company: 'Miller Solutions',
            joinDate: '2024-02-25',
            totalSpent: '$29.99',
            source: 'Paid Search',
            referrer: 'Google Ads',
            notes: 'Professional services company'
        },
        16: { // Nicole Davis
            id: 16,
            name: 'Nicole Davis',
            email: 'nicole@example.com',
            phone: '+1 (555) 678-9012',
            address: '507 Dogwood Ct, Richmond, VA 23220',
            company: 'Davis Enterprises',
            joinDate: '2024-03-01',
            totalSpent: '$9.99',
            source: 'Social Media',
            referrer: 'LinkedIn Campaign',
            notes: 'B2B focused customer'
        },
        17: { // Alex Rodriguez
            id: 17,
            name: 'Alex Rodriguez',
            email: 'alex@example.com',
            phone: '+1 (555) 789-0123',
            address: '618 Magnolia Ave, New Orleans, LA 70112',
            company: 'Rodriguez Media',
            joinDate: '2024-03-10',
            totalSpent: '$0.00',
            source: 'Webinar',
            referrer: 'Product Demo',
            notes: 'Trial user, interested in media features'
        },
        18: { // Samantha Clark
            id: 18,
            name: 'Samantha Clark',
            email: 'samantha@example.com',
            phone: '+1 (555) 890-1234',
            address: '729 Sycamore Rd, Minneapolis, MN 55401',
            company: 'Clark Corp',
            joinDate: '2024-03-15',
            totalSpent: '$99.99',
            source: 'Referral',
            referrer: 'Customer Referral',
            notes: 'Large enterprise client'
        }
    };

    // Lọc subscription theo stat được chọn
    const filteredSubscriptions = selectedStat === 'total'
        ? subscriptions
        : subscriptions.filter(sub => sub.plan === selectedStat);

    // Tính toán phân trang
    const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSubscriptions = filteredSubscriptions.slice(startIndex, endIndex);

    // Handle click stat
    const handleStatClick = (statId: string) => {
        setSelectedStat(statId);
        setCurrentPage(1); // Reset về trang đầu khi thay đổi filter
    };

    // Handle click View để hiển thị lịch sử
    const handleViewHistory = (customerId: number, customerName: string) => {
        setSelectedCustomerHistory({
            id: customerId,
            name: customerName,
            history: subscriptionHistories[customerId] || []
        });
        setShowHistoryModal(true);
    };

    // Handle close modal
    const handleCloseModal = () => {
        setShowHistoryModal(false);
        setSelectedCustomerHistory(null);
    };

    // Handle click customer name để hiển thị thông tin chi tiết
    const handleViewCustomer = (customerId: number) => {
        setSelectedCustomer(customerDetails[customerId]);
        setShowCustomerModal(true);
        setActiveTab('information');
    };

    // Handle close customer modal
    const handleCloseCustomerModal = () => {
        setShowCustomerModal(false);
        setSelectedCustomer(null);
        setActiveTab('information');
    };

    // Handle save customer information
    const handleSaveCustomer = () => {
        // Logic để save customer info sẽ được implement sau
        console.log('Saving customer:', selectedCustomer);
        handleCloseCustomerModal();
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
                <p className="text-gray-600">Manage customer subscriptions and plans</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                {subscriptionStats.map((stat) => (
                    <div
                        key={stat.id}
                        onClick={() => handleStatClick(stat.id)}
                        className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${selectedStat === stat.id
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-transparent'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${stat.color} mr-3`}></div>
                            <div>
                                <p className="text-sm text-gray-600">{stat.name}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.count.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Date Filter */}
            <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Date Range:</span>
                </div>
                <select className="border border-gray-300 rounded-md px-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white bg-no-repeat bg-right" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')", backgroundPosition: "right 10px center", backgroundSize: "12px 8px" }}>
                    <option>Last 30 days</option>
                    <option>Last 7 days</option>
                    <option>Last 90 days</option>
                    <option>This month</option>
                    <option>Custom range</option>
                </select>
            </div>

            {/* Subscription Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">
                        {selectedStat === 'total' ? 'All Subscriptions' : `${subscriptionStats.find(s => s.id === selectedStat)?.name} Subscriptions`}
                        <span className="ml-2 text-sm text-gray-500">({filteredSubscriptions.length} total)</span>
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Billing</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">History</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedSubscriptions.map((subscription) => (
                                <tr key={subscription.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div
                                                onClick={() => handleViewCustomer(subscription.id)}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-900 cursor-pointer hover:underline"
                                            >
                                                {subscription.customerName}
                                            </div>
                                            <div className="text-sm text-gray-500">{subscription.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {subscription.planDisplay}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subscription.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            subscription.status === 'Trial' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {subscription.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.startDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.nextBilling}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subscription.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleViewHistory(subscription.id, subscription.customerName)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                disabled={currentPage === 1}
                                className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                                    }`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing{' '}
                                    <span className="font-medium">{startIndex + 1}</span>
                                    {' '}to{' '}
                                    <span className="font-medium">
                                        {Math.min(endIndex, filteredSubscriptions.length)}
                                    </span>
                                    {' '}of{' '}
                                    <span className="font-medium">{filteredSubscriptions.length}</span>
                                    {' '}results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                                            }`}
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = index + 1;
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setCurrentPage(pageNumber)}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNumber
                                                    ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                                    }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    })}
                                    <button
                                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
                                            }`}
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* History Modal */}
            {showHistoryModal && selectedCustomerHistory && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                    }}
                >
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden mx-4 shadow-2xl">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">
                                Subscription History - {selectedCustomerHistory.name}
                            </h3>
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
                        <div className="px-6 py-4 max-h-96 overflow-y-auto">
                            {selectedCustomerHistory.history.length > 0 ? (
                                <div className="space-y-4">
                                    {selectedCustomerHistory.history.map((historyItem: { date: string, action: string, plan: string, amount: string, status: string }, index: number) => (
                                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className={`w-3 h-3 rounded-full mt-1 ${historyItem.status === 'Success' ? 'bg-green-500' :
                                                historyItem.status === 'Active' ? 'bg-blue-500' :
                                                    historyItem.status === 'Cancelled' ? 'bg-red-500' : 'bg-gray-500'
                                                }`}></div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{historyItem.action}</p>
                                                        <p className="text-sm text-gray-600">{historyItem.plan}</p>
                                                        <p className="text-xs text-gray-500">{historyItem.date}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-gray-900">{historyItem.amount}</p>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${historyItem.status === 'Success' ? 'bg-green-100 text-green-800' :
                                                            historyItem.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                                                                historyItem.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {historyItem.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No subscription history found</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer Detail Modal */}
            {showCustomerModal && selectedCustomer && (
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
                                Customer Details - {selectedCustomer.name}
                            </h3>
                            <button
                                onClick={handleCloseCustomerModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200">
                            <nav className="flex space-x-8 px-6">
                                <button
                                    onClick={() => setActiveTab('information')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'information'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Information
                                </button>
                                <button
                                    onClick={() => setActiveTab('source')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'source'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Source
                                </button>
                            </nav>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-6 max-h-96 overflow-y-auto">
                            {/* Information Tab */}
                            {activeTab === 'information' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCustomer.name}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                defaultValue={selectedCustomer.email}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                defaultValue={selectedCustomer.phone}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCustomer.company}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCustomer.address}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                                            <input
                                                type="date"
                                                defaultValue={selectedCustomer.joinDate}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Total Spent</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCustomer.totalSpent}
                                                readOnly
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-600"
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
                                                defaultValue={selectedCustomer.source}
                                                className="w-full border border-gray-300 rounded-md px-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white bg-no-repeat bg-right"
                                                style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')", backgroundPosition: "right 10px center", backgroundSize: "12px 8px" }}
                                            >
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
                                                defaultValue={selectedCustomer.referrer}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                                            <textarea
                                                rows={4}
                                                defaultValue={selectedCustomer.notes}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Add notes about this customer..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={handleCloseCustomerModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveCustomer}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
