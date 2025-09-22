'use client';

import { CalendarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import SubscriptionStatsCards from './components/SubscriptionStatsCards';
import CustomerDetailsModal from '@/components/modals/CustomerDetailsModal';
import { Customer } from '@/types/customer';

export default function SubscriptionManagement() {
    // State để quản lý stat được chọn, mặc định là Total
    const [selectedStat, setSelectedStat] = useState('total');
    // State để quản lý time period cho stats
    const [timePeriod, setTimePeriod] = useState('this month');
    // State để quản lý search
    const [searchTerm, setSearchTerm] = useState('');
    // State để quản lý popup customer detail
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    // State cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Stats cho 7 loại subscription (thêm Total và Expired)
    const subscriptionStats = [
        { id: 'total', name: 'Total', count: 1023, color: 'bg-blue-500', previousCount: 932, period: timePeriod },
        { id: 'trial', name: 'Trial', count: 125, color: 'bg-trial-custom', previousCount: 110, period: timePeriod },
        { id: 'expired', name: 'Expired', count: 52, color: 'bg-gray-500', previousCount: 42, period: timePeriod },
        { id: 'basic', name: 'Basic Plan', count: 234, color: 'bg-green-500', previousCount: 210, period: timePeriod },
        { id: 'pro', name: 'Pro Plan', count: 456, color: 'bg-purple-500', previousCount: 420, period: timePeriod },
        { id: 'enterprise', name: 'Enterprise Plan', count: 89, color: 'bg-orange-500', previousCount: 95, period: timePeriod },
        { id: 'cancelled', name: 'Cancelled', count: 67, color: 'bg-red-500', previousCount: 55, period: timePeriod },
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

    // Data chi tiết customer
    const customerDetails: { [key: number]: Customer } = {
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

    // Lọc subscription theo stat được chọn và search term
    const filteredSubscriptions = selectedStat === 'total'
        ? subscriptions.filter(sub =>
            searchTerm === '' ||
            sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.planDisplay.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : subscriptions.filter(sub =>
            sub.plan === selectedStat && (
                searchTerm === '' ||
                sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sub.planDisplay.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

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

    // Handle time period change
    const handleTimePeriodChange = (period: string) => {
        setTimePeriod(period);
    };

    // Handle click View để hiển thị lịch sử
    // Handle click view detail để hiển thị thông tin chi tiết customer
    const handleViewDetail = (customerId: number) => {
        setSelectedCustomer(customerDetails[customerId]);
        setShowCustomerModal(true);
    };

    // Handle click customer name để hiển thị thông tin chi tiết
    const handleViewCustomer = (customerId: number) => {
        setSelectedCustomer(customerDetails[customerId]);
        setShowCustomerModal(true);
    };

    // Handle close customer modal
    const handleCloseCustomerModal = () => {
        setShowCustomerModal(false);
        setSelectedCustomer(null);
    };

    // Handle save customer information
    const handleSaveCustomer = (customer: Customer) => {
        // Logic để save customer info sẽ được implement sau
        console.log('Saving customer:', customer);
        setShowCustomerModal(false);
        setSelectedCustomer(null);
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
                    <p className="text-gray-600">Manage customer subscriptions and plans</p>
                </div>
            </div>

            {/* Stats Cards */}
            <SubscriptionStatsCards
                stats={subscriptionStats}
                selectedStat={selectedStat}
                onStatClick={handleStatClick}
                timePeriod={timePeriod}
                onTimePeriodChange={handleTimePeriodChange}
            />

            {/* Search and Date Filter */}
            <div className="flex items-center justify-between mb-6 gap-6">
                {/* Search Box */}
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search customers or emails..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Date Filter */}
                <div className="flex items-center space-x-4">
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
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
                                            onClick={() => handleViewDetail(subscription.id)}
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

            {/* Customer Detail Modal */}
            <CustomerDetailsModal
                isOpen={showCustomerModal}
                onClose={handleCloseCustomerModal}
                customer={selectedCustomer}
                onSave={handleSaveCustomer}
            />
        </div>
    );
}
