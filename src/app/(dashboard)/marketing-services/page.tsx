'use client';

import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function MarketingAssistantPage() {
    // State để quản lý search và filter
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedStat, setSelectedStat] = useState('total');
    const [statusFilter, setStatusFilter] = useState('all');
    const [packageFilter, setPackageFilter] = useState('all');
    const [serviceFilter, setServiceFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [showCustomDate, setShowCustomDate] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<{ id: number, name: string, email: string, subscriptionPackage: string } | null>(null);

    // State cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        subscriptionPackage: '',
        assistantName: '',
        marketingService: '',
        startedDate: '',
        status: 'New'
    });

    // Danh sách users có sẵn trong hệ thống
    const systemUsers = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', subscriptionPackage: 'Basic Plan' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', subscriptionPackage: 'Pro Plan' },
        { id: 3, name: 'Carol Williams', email: 'carol@example.com', subscriptionPackage: 'Enterprise Plan' },
        { id: 4, name: 'David Brown', email: 'david@example.com', subscriptionPackage: 'Basic Plan' },
        { id: 5, name: 'Eva Davis', email: 'eva@example.com', subscriptionPackage: 'Pro Plan' },
    ];

    // Danh sách assistants có sẵn
    const availableAssistants = [
        'Alex Martinez', 'Emily Chen', 'David Kim', 'Maria Rodriguez', 'James Wilson',
        'Sophie Taylor', 'Michael Brown', 'Lisa Anderson', 'Thomas Garcia', 'Jennifer Lee'
    ];

    // Stats cho Marketing Assistant
    const marketingStats = [
        { id: 'total', name: 'Total Customers', count: 456, color: 'bg-gray-500' },
        { id: 'basic', name: 'Marketing Assistant Basic', count: 189, color: 'bg-blue-500' },
        { id: 'premium', name: 'Marketing Assistant Premium', count: 178, color: 'bg-purple-500' },
        { id: 'pro', name: 'Marketing Assistant Pro', count: 89, color: 'bg-orange-500' },
    ];

    // Data cho marketing services
    const [marketingServices, setMarketingServices] = useState([
        {
            id: 1,
            customer: 'John Doe',
            email: 'john@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'Alex Martinez',
            status: 'Active',
            marketingService: 'Marketing Assistant Pro',
            registeredDate: '2024-01-15',
            startedDate: '2024-01-20',
            amount: '$199.99'
        },
        {
            id: 2,
            customer: 'Jane Smith',
            email: 'jane@example.com',
            subscriptionPackage: 'Basic Plan',
            assistantName: 'Emily Chen',
            status: 'Active',
            marketingService: 'Marketing Assistant Basic',
            registeredDate: '2024-01-10',
            startedDate: '2024-01-12',
            amount: '$49.99'
        },
        {
            id: 3,
            customer: 'Mike Johnson',
            email: 'mike@example.com',
            subscriptionPackage: 'Enterprise Plan',
            assistantName: 'David Kim',
            status: 'New',
            marketingService: 'Marketing Assistant Premium',
            registeredDate: '2024-01-25',
            startedDate: '2024-01-28',
            amount: '$129.99'
        },
        {
            id: 4,
            customer: 'Sarah Wilson',
            email: 'sarah@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'Maria Rodriguez',
            status: 'Active',
            marketingService: 'Marketing Assistant Pro',
            registeredDate: '2024-01-05',
            startedDate: '2024-01-08',
            amount: '$199.99'
        },
        {
            id: 5,
            customer: 'David Brown',
            email: 'david@example.com',
            subscriptionPackage: 'Basic Plan',
            assistantName: 'James Wilson',
            status: 'Cancelled',
            marketingService: 'Marketing Assistant Basic',
            registeredDate: '2024-01-12',
            startedDate: '2024-01-15',
            amount: '$49.99'
        },
        {
            id: 6,
            customer: 'Lisa Davis',
            email: 'lisa@example.com',
            subscriptionPackage: 'Enterprise Plan',
            assistantName: 'Sophie Taylor',
            status: 'Active',
            marketingService: 'Marketing Assistant Premium',
            registeredDate: '2024-01-20',
            startedDate: '2024-01-22',
            amount: '$129.99'
        },
        {
            id: 7,
            customer: 'Robert Taylor',
            email: 'robert@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'Michael Brown',
            status: 'Cancelled',
            marketingService: 'Marketing Assistant Pro',
            registeredDate: '2023-12-01',
            startedDate: '2023-12-05',
            amount: '$199.99'
        },
        {
            id: 8,
            customer: 'Emma Garcia',
            email: 'emma@example.com',
            subscriptionPackage: 'Basic Plan',
            assistantName: 'Lisa Anderson',
            status: 'New',
            marketingService: 'Marketing Assistant Basic',
            registeredDate: '2024-01-28',
            startedDate: '2024-02-01',
            amount: '$49.99'
        },
        {
            id: 9,
            customer: 'Tom Wilson',
            email: 'tom@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'Thomas Garcia',
            status: 'Active',
            marketingService: 'Marketing Assistant Pro',
            registeredDate: '2024-02-01',
            startedDate: '2024-02-03',
            amount: '$199.99'
        },
        {
            id: 10,
            customer: 'Anna Martinez',
            email: 'anna@example.com',
            subscriptionPackage: 'Enterprise Plan',
            assistantName: 'Jennifer Lee',
            status: 'Active',
            marketingService: 'Marketing Assistant Premium',
            registeredDate: '2024-02-05',
            startedDate: '2024-02-08',
            amount: '$129.99'
        },
        {
            id: 11,
            customer: 'Chris Anderson',
            email: 'chris@example.com',
            subscriptionPackage: 'Basic Plan',
            assistantName: 'Alex Martinez',
            status: 'Active',
            marketingService: 'Marketing Assistant Basic',
            registeredDate: '2024-02-10',
            startedDate: '2024-02-12',
            amount: '$49.99'
        },
        {
            id: 12,
            customer: 'Jessica Lee',
            email: 'jessica@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'Emily Chen',
            status: 'New',
            marketingService: 'Marketing Assistant Pro',
            registeredDate: '2024-02-15',
            startedDate: '2024-02-18',
            amount: '$199.99'
        },
        {
            id: 13,
            customer: 'Mark Thompson',
            email: 'mark@example.com',
            subscriptionPackage: 'Enterprise Plan',
            assistantName: 'David Kim',
            status: 'Active',
            marketingService: 'Marketing Assistant Premium',
            registeredDate: '2024-02-20',
            startedDate: '2024-02-22',
            amount: '$129.99'
        },
        {
            id: 14,
            customer: 'Rachel White',
            email: 'rachel@example.com',
            subscriptionPackage: 'Basic Plan',
            assistantName: 'Maria Rodriguez',
            status: 'Cancelled',
            marketingService: 'Marketing Assistant Basic',
            registeredDate: '2024-01-30',
            startedDate: '2024-02-02',
            amount: '$49.99'
        },
        {
            id: 15,
            customer: 'Kevin Miller',
            email: 'kevin@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'James Wilson',
            status: 'Active',
            marketingService: 'Marketing Assistant Pro',
            registeredDate: '2024-02-25',
            startedDate: '2024-02-28',
            amount: '$199.99'
        },
        {
            id: 16,
            customer: 'Nicole Davis',
            email: 'nicole@example.com',
            subscriptionPackage: 'Enterprise Plan',
            assistantName: 'Sophie Taylor',
            status: 'New',
            marketingService: 'Marketing Assistant Premium',
            registeredDate: '2024-03-01',
            startedDate: '2024-03-05',
            amount: '$129.99'
        },
        {
            id: 17,
            customer: 'Alex Rodriguez',
            email: 'alex@example.com',
            subscriptionPackage: 'Basic Plan',
            assistantName: 'Michael Brown',
            status: 'Active',
            marketingService: 'Marketing Assistant Basic',
            registeredDate: '2024-03-10',
            startedDate: '2024-03-12',
            amount: '$49.99'
        },
        {
            id: 18,
            customer: 'Samantha Clark',
            email: 'samantha@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'Lisa Anderson',
            status: 'Active',
            marketingService: 'Marketing Assistant Pro',
            registeredDate: '2024-03-15',
            startedDate: '2024-03-18',
            amount: '$199.99'
        },
    ]);

    // Function để handle click vào stats
    const handleStatClick = (statId: string) => {
        setSelectedStat(statId);
        setCurrentPage(1); // Reset về trang đầu
        // Sync serviceFilter với stat được chọn
        if (statId === 'total') {
            setServiceFilter('all');
        } else {
            setServiceFilter(statId);
        }
    };

    // Function để handle date filter change
    const handleDateFilterChange = (value: string) => {
        setDateFilter(value);
        setCurrentPage(1); // Reset về trang đầu
        if (value === 'custom') {
            setShowCustomDate(true);
        } else {
            setShowCustomDate(false);
            setStartDate('');
            setEndDate('');
        }
    };

    // Function để reset popup
    const resetPopup = () => {
        setCurrentStep(1);
        setUserSearchTerm('');
        setSelectedUser(null);
        setNewCustomer({
            name: '',
            email: '',
            subscriptionPackage: '',
            assistantName: '',
            marketingService: '',
            startedDate: '',
            status: 'New'
        });
        setShowAddCustomer(false);
    };

    // Function để chuyển sang step 2
    const proceedToStep2 = () => {
        if (selectedUser) {
            setNewCustomer({
                ...newCustomer,
                name: selectedUser.name,
                email: selectedUser.email,
                subscriptionPackage: selectedUser.subscriptionPackage
            });
            setCurrentStep(2);
        }
    };

    // Function để filter users
    const filteredUsers = systemUsers.filter(user =>
        user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
    );

    // Function để handle add customer
    const handleAddCustomer = () => {
        if (newCustomer.assistantName && newCustomer.marketingService && newCustomer.startedDate) {
            const newId = Math.max(...marketingServices.map(s => s.id)) + 1;
            const customerToAdd = {
                id: newId,
                customer: newCustomer.name,
                email: newCustomer.email,
                subscriptionPackage: newCustomer.subscriptionPackage,
                assistantName: newCustomer.assistantName,
                status: newCustomer.status,
                marketingService: newCustomer.marketingService,
                registeredDate: new Date().toISOString().split('T')[0],
                startedDate: newCustomer.startedDate,
                amount: newCustomer.subscriptionPackage.includes('Basic') ? '$49.99' :
                    newCustomer.subscriptionPackage.includes('Pro') ? '$199.99' : '$129.99'
            };
            setMarketingServices([...marketingServices, customerToAdd]);
            resetPopup();
        }
    };

    // Filter data dựa trên search và filter
    const filteredServices = marketingServices.filter(service => {
        const matchesSearch = service.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.assistantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.marketingService.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter theo selectedStat từ stats cards
        const matchesStat = selectedStat === 'total' ||
            (selectedStat === 'basic' && service.marketingService.includes('Basic')) ||
            (selectedStat === 'premium' && service.marketingService.includes('Premium')) ||
            (selectedStat === 'pro' && service.marketingService.includes('Pro'));

        // Status filter
        const matchesStatus = statusFilter === 'all' ||
            service.status.toLowerCase() === statusFilter.toLowerCase();

        // Package filter
        const matchesPackage = packageFilter === 'all' ||
            (packageFilter === 'basic' && service.subscriptionPackage.includes('Basic')) ||
            (packageFilter === 'pro' && service.subscriptionPackage.includes('Pro')) ||
            (packageFilter === 'enterprise' && service.subscriptionPackage.includes('Enterprise'));

        // Service filter
        const matchesService = serviceFilter === 'all' ||
            (serviceFilter === 'basic' && service.marketingService.includes('Basic')) ||
            (serviceFilter === 'premium' && service.marketingService.includes('Premium')) ||
            (serviceFilter === 'pro' && service.marketingService.includes('Pro'));

        // Date filter
        const matchesDate = (() => {
            if (dateFilter === 'all') return true;

            const serviceDate = new Date(service.registeredDate);
            const now = new Date();

            switch (dateFilter) {
                case 'thisweek':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return serviceDate >= weekAgo;
                case 'thismonth':
                    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    return serviceDate >= monthAgo;
                case 'thisyear':
                    const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                    return serviceDate >= yearAgo;
                case 'custom':
                    if (startDate && endDate) {
                        const start = new Date(startDate);
                        const end = new Date(endDate);
                        return serviceDate >= start && serviceDate <= end;
                    }
                    return true;
                default:
                    return true;
            }
        })();

        return matchesSearch && matchesStat && matchesStatus && matchesPackage && matchesService && matchesDate;
    });

    // Tính toán phân trang
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedServices = filteredServices.slice(startIndex, endIndex);

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Marketing Services</h1>
                    <p className="text-gray-600">Manage customers who subscribed to marketing assistant services</p>
                </div>
                <button
                    onClick={() => setShowAddCustomer(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                    Add Customer
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {marketingStats.map((stat) => (
                    <div
                        key={stat.id}
                        onClick={() => handleStatClick(stat.id)}
                        className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${selectedStat === stat.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
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

            {/* Filter */}
            <div className="bg-white rounded-lg shadow mb-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Status Filter */}
                    <div>
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                            className="w-full border border-gray-300 rounded-md px-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white bg-no-repeat bg-right"
                            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')", backgroundPosition: "right 10px center", backgroundSize: "12px 8px" }}
                        >
                            <option value="all">All Status</option>
                            <option value="new">New</option>
                            <option value="active">Active</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Subscription Package Filter */}
                    <div>
                        <select
                            value={packageFilter}
                            onChange={(e) => { setPackageFilter(e.target.value); setCurrentPage(1); }}
                            className="w-full border border-gray-300 rounded-md px-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white bg-no-repeat bg-right"
                            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')", backgroundPosition: "right 10px center", backgroundSize: "12px 8px" }}
                        >
                            <option value="all">All Packages</option>
                            <option value="basic">Basic Plan</option>
                            <option value="pro">Pro Plan</option>
                            <option value="enterprise">Enterprise Plan</option>
                        </select>
                    </div>

                    {/* Marketing Services Filter */}
                    <div>
                        <select
                            value={serviceFilter}
                            onChange={(e) => { setServiceFilter(e.target.value); setCurrentPage(1); }}
                            className="w-full border border-gray-300 rounded-md px-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white bg-no-repeat bg-right"
                            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')", backgroundPosition: "right 10px center", backgroundSize: "12px 8px" }}
                        >
                            <option value="all">All Services</option>
                            <option value="basic">Basic</option>
                            <option value="premium">Premium</option>
                            <option value="pro">Pro</option>
                        </select>
                    </div>

                    {/* Date Filter */}
                    <div>
                        <select
                            value={dateFilter}
                            onChange={(e) => handleDateFilterChange(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white bg-no-repeat bg-right"
                            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')", backgroundPosition: "right 10px center", backgroundSize: "12px 8px" }}
                        >
                            <option value="all">All Time</option>
                            <option value="thisweek">This Week</option>
                            <option value="thismonth">This Month</option>
                            <option value="thisyear">This Year</option>
                            <option value="custom">Custom Date</option>
                        </select>
                    </div>
                </div>

                {/* Custom Date Range Picker */}
                {showCustomDate && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Marketing Services Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">
                        Marketing Services
                        {selectedStat !== 'total' && (
                            <span className="ml-2 text-sm text-blue-600 font-medium">
                                - {marketingStats.find(stat => stat.id === selectedStat)?.name}
                            </span>
                        )}
                        <span className="ml-2 text-sm text-gray-500">({filteredServices.length} total)</span>
                    </h2>

                    {/* Search */}
                    <div className="w-80">
                        <div className="relative">
                            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search customers, emails, assistants..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription Package</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assistant Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marketing Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedServices.map((service) => (
                                <tr key={service.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{service.customer}</div>
                                            <div className="text-sm text-gray-500">{service.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {service.subscriptionPackage}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{service.assistantName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${service.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            service.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {service.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${service.marketingService.includes('Basic') ? 'bg-blue-100 text-blue-800' :
                                            service.marketingService.includes('Premium') ? 'bg-purple-100 text-purple-800' :
                                                'bg-orange-100 text-orange-800'
                                            }`}>
                                            {service.marketingService}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.registeredDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.startedDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900">View</button>
                                        <button className="text-green-600 hover:text-green-900">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
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
                                        {Math.min(endIndex, filteredServices.length)}
                                    </span>
                                    {' '}of{' '}
                                    <span className="font-medium">{filteredServices.length}</span>
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

            {/* Add Customer Popup */}
            {showAddCustomer && (
                <div
                    className="fixed inset-0 overflow-y-auto h-full w-full z-50 flex items-center justify-center"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                    }}
                >
                    <div className="relative mx-auto p-6 w-full max-w-md shadow-2xl rounded-lg bg-white">
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {currentStep === 1 ? 'Search Customer' : 'Add Marketing Assistant'}
                                </h3>
                                <button
                                    onClick={resetPopup}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Step Indicator */}
                            <div className="flex items-center mb-6">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    1
                                </div>
                                <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    2
                                </div>
                            </div>

                            {/* Step 1: Search Customer */}
                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Search by Customer Name or Email
                                        </label>
                                        <div className="relative">
                                            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                value={userSearchTerm}
                                                onChange={(e) => setUserSearchTerm(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Search customers..."
                                            />
                                        </div>
                                    </div>

                                    {/* User List */}
                                    {userSearchTerm && (
                                        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
                                            {filteredUsers.length > 0 ? (
                                                filteredUsers.map((user) => (
                                                    <div
                                                        key={user.id}
                                                        onClick={() => setSelectedUser(user)}
                                                        className={`p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${selectedUser?.id === user.id ? 'bg-blue-50 border-blue-200' : ''
                                                            }`}
                                                    >
                                                        <div className="font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-600">{user.email}</div>
                                                        <div className="text-xs text-blue-600">{user.subscriptionPackage}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-3 text-center text-gray-500">No users found</div>
                                            )}
                                        </div>
                                    )}

                                    {/* Selected User Display */}
                                    {selectedUser && (
                                        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                            <div className="font-medium text-green-900">Selected: {selectedUser.name}</div>
                                            <div className="text-sm text-green-700">{selectedUser.email}</div>
                                            <div className="text-xs text-green-600">{selectedUser.subscriptionPackage}</div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 2: Add Marketing Assistant */}
                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md mb-4">
                                        <div className="font-medium text-gray-900">{newCustomer.name}</div>
                                        <div className="text-sm text-gray-600">{newCustomer.email}</div>
                                        <div className="text-xs text-blue-600">{newCustomer.subscriptionPackage}</div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Marketing Service</label>
                                        <select
                                            value={newCustomer.marketingService}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, marketingService: e.target.value })}
                                            className="w-full border border-gray-300 rounded-md px-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white bg-no-repeat bg-right"
                                            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')", backgroundPosition: "right 10px center", backgroundSize: "12px 8px" }}
                                        >
                                            <option value="">Select service</option>
                                            <option value="Marketing Assistant Basic">Marketing Assistant Basic</option>
                                            <option value="Marketing Assistant Premium">Marketing Assistant Premium</option>
                                            <option value="Marketing Assistant Pro">Marketing Assistant Pro</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Assistant Name</label>
                                        <select
                                            value={newCustomer.assistantName}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, assistantName: e.target.value })}
                                            className="w-full border border-gray-300 rounded-md px-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white bg-no-repeat bg-right"
                                            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')", backgroundPosition: "right 10px center", backgroundSize: "12px 8px" }}
                                        >
                                            <option value="">Select assistant</option>
                                            {availableAssistants.map((assistant) => (
                                                <option key={assistant} value={assistant}>{assistant}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={newCustomer.status}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
                                            className="w-full border border-gray-300 rounded-md px-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white bg-no-repeat bg-right"
                                            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ite0nIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')", backgroundPosition: "right 10px center", backgroundSize: "12px 8px" }}
                                        >
                                            <option value="New">New</option>
                                            <option value="Active">Active</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Started Date</label>
                                        <input
                                            type="date"
                                            value={newCustomer.startedDate}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, startedDate: e.target.value })}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-between mt-6">
                                {currentStep === 1 ? (
                                    <>
                                        <button
                                            onClick={resetPopup}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={proceedToStep2}
                                            disabled={!selectedUser}
                                            className={`px-4 py-2 rounded-md transition-colors ${selectedUser
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            Next
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setCurrentStep(1)}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleAddCustomer}
                                            disabled={!newCustomer.marketingService || !newCustomer.assistantName || !newCustomer.startedDate}
                                            className={`px-4 py-2 rounded-md transition-colors ${newCustomer.marketingService && newCustomer.assistantName && newCustomer.startedDate
                                                ? 'bg-green-600 text-white hover:bg-green-700'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            Save Customer
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
