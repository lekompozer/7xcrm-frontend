'use client';

import { useState } from 'react';
import MarketingServicesHeader from './components/MarketingServicesHeader';
import MarketingStatsCards from './components/MarketingStatsCards';
import MarketingFilters from './components/MarketingFilters';
import MarketingServicesTable from './components/MarketingServicesTable';
import AddCustomerModal from './components/AddCustomerModal';
import DeactivatedListModal from './components/DeactivatedListModal';
import RestoreCustomerModal from './components/RestoreCustomerModal';
import Notification from './components/Notification';

// Types
interface MarketingService {
    id: number;
    customer: string;
    email: string;
    subscriptionPackage: string;
    assistantName: string;
    status: string;
    marketingService: string;
    registeredDate: string;
    startedDate: string;
    amount: string;
}

interface DeactivatedCustomer extends MarketingService {
    deactivatedDate: string;
}

interface SystemUser {
    id: number;
    name: string;
    email: string;
    subscriptionPackage: string;
}

export default function MarketingServicesPage() {
    // States
    const [searchTerm, setSearchTerm] = useState('');
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
    const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);
    const [showDeactivatedList, setShowDeactivatedList] = useState(false);
    const [showRestoreCustomer, setShowRestoreCustomer] = useState(false);
    const [selectedDeactivatedCustomer, setSelectedDeactivatedCustomer] = useState<DeactivatedCustomer | null>(null);
    const [showNewPackageForm, setShowNewPackageForm] = useState(false);
    const [timePeriod, setTimePeriod] = useState('this month');
    const [currentPage, setCurrentPage] = useState(1);
    const [notification, setNotification] = useState({
        message: '',
        type: 'success' as 'success' | 'error',
        isVisible: false
    });
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

    // Data
    const systemUsers: SystemUser[] = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', subscriptionPackage: 'Basic Plan' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', subscriptionPackage: 'Pro Plan' },
        { id: 3, name: 'Carol Williams', email: 'carol@example.com', subscriptionPackage: 'Enterprise Plan' },
        { id: 4, name: 'David Brown', email: 'david@example.com', subscriptionPackage: 'Basic Plan' },
        { id: 5, name: 'Eva Davis', email: 'eva@example.com', subscriptionPackage: 'Pro Plan' },
    ];

    const availableAssistants = [
        'Alex Martinez', 'Emily Chen', 'David Kim', 'Maria Rodriguez', 'James Wilson',
        'Sophie Taylor', 'Michael Brown', 'Lisa Anderson', 'Thomas Garcia', 'Jennifer Lee'
    ];

    const [deactivatedCustomers, setDeactivatedCustomers] = useState([
        {
            id: 101,
            customer: 'Peter Johnson',
            email: 'peter@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'Alex Martinez',
            status: 'Deactivated',
            marketingService: 'MA-3 — Performance Ads (Lead Generations)',
            registeredDate: '2023-11-15',
            startedDate: '2023-11-20',
            deactivatedDate: '2024-01-10',
            amount: '$199.99'
        },
        // ... other deactivated customers
    ]);

    // Function to get stats based on time period
    const getStatsForPeriod = (period: string) => {
        const baseStats = {
            total: { current: 456, previous: 398 },
            ma1: { current: 92, previous: 85 },
            ma2: { current: 89, previous: 76 },
            ma3: { current: 98, previous: 82 },
            ma4: { current: 95, previous: 89 },
            ma5: { current: 82, previous: 66 }
        };

        // Simulate different data for different periods
        if (period === 'this week') {
            return {
                total: { current: 89, previous: 76 },
                ma1: { current: 18, previous: 16 },
                ma2: { current: 17, previous: 15 },
                ma3: { current: 19, previous: 16 },
                ma4: { current: 18, previous: 17 },
                ma5: { current: 17, previous: 12 }
            };
        } else if (period === 'this year') {
            return {
                total: { current: 5234, previous: 4891 },
                ma1: { current: 1056, previous: 985 },
                ma2: { current: 1023, previous: 896 },
                ma3: { current: 1124, previous: 967 },
                ma4: { current: 1089, previous: 1034 },
                ma5: { current: 942, previous: 1009 }
            };
        } else if (period === 'all time') {
            return {
                total: { current: 12456, previous: 11234 },
                ma1: { current: 2523, previous: 2234 },
                ma2: { current: 2445, previous: 2189 },
                ma3: { current: 2634, previous: 2345 },
                ma4: { current: 2512, previous: 2398 },
                ma5: { current: 2342, previous: 2068 }
            };
        }

        return baseStats; // this month (default)
    };

    const currentStats = getStatsForPeriod(timePeriod);
    const dynamicMarketingStats = [
        {
            id: 'total',
            name: 'Total Customers',
            count: currentStats.total.current,
            previousCount: currentStats.total.previous,
            period: timePeriod,
            color: 'bg-blue-500'
        },
        {
            id: 'ma1',
            name: 'MA-1 — SevenX Launch & Enablement',
            count: currentStats.ma1.current,
            previousCount: currentStats.ma1.previous,
            period: timePeriod,
            color: 'bg-ma1-custom'
        },
        {
            id: 'ma2',
            name: 'MA-2 — Social, Fanpage & Website Management',
            count: currentStats.ma2.current,
            previousCount: currentStats.ma2.previous,
            period: timePeriod,
            color: 'bg-green-500'
        },
        {
            id: 'ma3',
            name: 'MA-3 — Performance Ads (Lead Generations)',
            count: currentStats.ma3.current,
            previousCount: currentStats.ma3.previous,
            period: timePeriod,
            color: 'bg-purple-500'
        },
        {
            id: 'ma4',
            name: 'MA-4 — Creative & Content Studio',
            count: currentStats.ma4.current,
            previousCount: currentStats.ma4.previous,
            period: timePeriod,
            color: 'bg-orange-500'
        },
        {
            id: 'ma5',
            name: 'MA-5 — Contact & Converstion Management',
            count: currentStats.ma5.current,
            previousCount: currentStats.ma5.previous,
            period: timePeriod,
            color: 'bg-ma5-custom'
        },
    ];

    const [marketingServices, setMarketingServices] = useState<MarketingService[]>([
        {
            id: 1,
            customer: 'John Doe',
            email: 'john@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'Alex Martinez',
            status: 'Active',
            marketingService: 'MA-4 — Creative & Content Studio',
            registeredDate: '2024-01-15',
            startedDate: '2024-01-20',
            amount: '$199.99'
        },
        {
            id: 2,
            customer: 'Sarah Johnson',
            email: 'sarah@example.com',
            subscriptionPackage: 'Basic Plan',
            assistantName: 'Emily Chen',
            status: 'Active',
            marketingService: 'MA-1 — SevenX Launch & Enablement',
            registeredDate: '2024-01-10',
            startedDate: '2024-01-15',
            amount: '$99.99'
        },
        {
            id: 3,
            customer: 'Mike Chen',
            email: 'mike@example.com',
            subscriptionPackage: 'Enterprise Plan',
            assistantName: 'David Kim',
            status: 'Paused',
            marketingService: 'MA-2 — Social, Fanpage & Website Management',
            registeredDate: '2024-01-05',
            startedDate: '2024-01-10',
            amount: '$299.99'
        },
        {
            id: 4,
            customer: 'Lisa Anderson',
            email: 'lisa@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'Maria Rodriguez',
            status: 'Active',
            marketingService: 'MA-5 — Contact & Converstion Management',
            registeredDate: '2024-01-20',
            startedDate: '2024-01-25',
            amount: '$199.99'
        },
        {
            id: 5,
            customer: 'David Wilson',
            email: 'david@example.com',
            subscriptionPackage: 'Basic Plan',
            assistantName: 'James Wilson',
            status: 'Active',
            marketingService: 'MA-1 — SevenX Launch & Enablement',
            registeredDate: '2024-01-18',
            startedDate: '2024-01-23',
            amount: '$99.99'
        },
        {
            id: 6,
            customer: 'Emma Taylor',
            email: 'emma@example.com',
            subscriptionPackage: 'Premium Plan',
            assistantName: 'Sophie Taylor',
            status: 'Active',
            marketingService: 'MA-3 — Performance Ads (Lead Generations)',
            registeredDate: '2024-01-12',
            startedDate: '2024-01-17',
            amount: '$149.99'
        },
        {
            id: 7,
            customer: 'Robert Brown',
            email: 'robert@example.com',
            subscriptionPackage: 'Enterprise Plan',
            assistantName: 'Michael Brown',
            status: 'New',
            marketingService: 'MA-2 — Social, Fanpage & Website Management',
            registeredDate: '2024-01-25',
            startedDate: '2024-01-30',
            amount: '$299.99'
        },
        {
            id: 8,
            customer: 'Jessica Garcia',
            email: 'jessica@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'Lisa Anderson',
            status: 'Active',
            marketingService: 'MA-3 — Performance Ads (Lead Generations)',
            registeredDate: '2024-01-08',
            startedDate: '2024-01-13',
            amount: '$199.99'
        },
        {
            id: 9,
            customer: 'Thomas Lee',
            email: 'thomas@example.com',
            subscriptionPackage: 'Basic Plan',
            assistantName: 'Thomas Garcia',
            status: 'Paused',
            marketingService: 'MA-1 — SevenX Launch & Enablement',
            registeredDate: '2024-01-14',
            startedDate: '2024-01-19',
            amount: '$99.99'
        },
        {
            id: 10,
            customer: 'Amanda Davis',
            email: 'amanda@example.com',
            subscriptionPackage: 'Premium Plan',
            assistantName: 'Jennifer Lee',
            status: 'Active',
            marketingService: 'MA-2 — Social, Fanpage & Website Management',
            registeredDate: '2024-01-22',
            startedDate: '2024-01-27',
            amount: '$149.99'
        },
        {
            id: 11,
            customer: 'Kevin Martinez',
            email: 'kevin@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'Alex Martinez',
            status: 'Active',
            marketingService: 'MA-4 — Creative & Content Studio',
            registeredDate: '2024-01-16',
            startedDate: '2024-01-21',
            amount: '$199.99'
        },
        {
            id: 12,
            customer: 'Rachel White',
            email: 'rachel@example.com',
            subscriptionPackage: 'Basic Plan',
            assistantName: 'Emily Chen',
            status: 'New',
            marketingService: 'MA-1 — SevenX Launch & Enablement',
            registeredDate: '2024-01-24',
            startedDate: '2024-01-29',
            amount: '$99.99'
        },
        {
            id: 13,
            customer: 'Christopher Rodriguez',
            email: 'chris@example.com',
            subscriptionPackage: 'Enterprise Plan',
            assistantName: 'David Kim',
            status: 'Active',
            marketingService: 'MA-3 — Performance Ads (Lead Generations)',
            registeredDate: '2024-01-11',
            startedDate: '2024-01-16',
            amount: '$299.99'
        },
        {
            id: 14,
            customer: 'Nicole Thompson',
            email: 'nicole@example.com',
            subscriptionPackage: 'Premium Plan',
            assistantName: 'Maria Rodriguez',
            status: 'Active',
            marketingService: 'MA-5 — Contact & Converstion Management',
            registeredDate: '2024-01-19',
            startedDate: '2024-01-24',
            amount: '$149.99'
        },
        {
            id: 15,
            customer: 'Daniel Jackson',
            email: 'daniel@example.com',
            subscriptionPackage: 'Pro Plan',
            assistantName: 'James Wilson',
            status: 'Paused',
            marketingService: 'MA-4 — Creative & Content Studio',
            registeredDate: '2024-01-13',
            startedDate: '2024-01-18',
            amount: '$199.99'
        },
        {
            id: 16,
            customer: 'Michelle Harris',
            email: 'michelle@example.com',
            subscriptionPackage: 'Basic Plan',
            assistantName: 'Sophie Taylor',
            status: 'Active',
            marketingService: 'MA-2 — Social, Fanpage & Website Management',
            registeredDate: '2024-01-17',
            startedDate: '2024-01-22',
            amount: '$99.99'
        },
        {
            id: 17,
            customer: 'Andrew Clark',
            email: 'andrew@example.com',
            subscriptionPackage: 'Enterprise Plan',
            assistantName: 'Michael Brown',
            status: 'Active',
            marketingService: 'MA-5 — Contact & Converstion Management',
            registeredDate: '2024-01-21',
            startedDate: '2024-01-26',
            amount: '$299.99'
        },
        {
            id: 18,
            customer: 'Stephanie Lewis',
            email: 'stephanie@example.com',
            subscriptionPackage: 'Premium Plan',
            assistantName: 'Lisa Anderson',
            status: 'New',
            marketingService: 'MA-1 — SevenX Launch & Enablement',
            registeredDate: '2024-01-23',
            startedDate: '2024-01-28',
            amount: '$149.99'
        }
    ]);

    // Filter logic
    const filteredServices = marketingServices.filter(service => {
        const matchesSearch = service.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.assistantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.marketingService.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStat = selectedStat === 'total' ||
            (selectedStat === 'ma1' && service.marketingService.includes('MA-1')) ||
            (selectedStat === 'ma2' && service.marketingService.includes('MA-2')) ||
            (selectedStat === 'ma3' && service.marketingService.includes('MA-3')) ||
            (selectedStat === 'ma4' && service.marketingService.includes('MA-4')) ||
            (selectedStat === 'ma5' && service.marketingService.includes('MA-5'));

        const matchesStatus = statusFilter === 'all' ||
            service.status.toLowerCase() === statusFilter.toLowerCase();

        const matchesPackage = packageFilter === 'all' ||
            (packageFilter === 'basic' && service.subscriptionPackage.includes('Basic')) ||
            (packageFilter === 'pro' && service.subscriptionPackage.includes('Pro')) ||
            (packageFilter === 'enterprise' && service.subscriptionPackage.includes('Enterprise'));

        const matchesService = serviceFilter === 'all' ||
            (serviceFilter === 'ma1' && service.marketingService.includes('MA-1')) ||
            (serviceFilter === 'ma2' && service.marketingService.includes('MA-2')) ||
            (serviceFilter === 'ma3' && service.marketingService.includes('MA-3')) ||
            (serviceFilter === 'ma4' && service.marketingService.includes('MA-4')) ||
            (serviceFilter === 'ma5' && service.marketingService.includes('MA-5'));

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

    // Pagination
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Event handlers
    const handleStatClick = (statId: string) => {
        setSelectedStat(statId);
        setCurrentPage(1);
        if (statId === 'total') {
            setServiceFilter('all');
        } else {
            setServiceFilter(statId);
        }
    };

    const handleDateFilterChange = (value: string) => {
        setDateFilter(value);
        setCurrentPage(1);
        if (value === 'custom') {
            setShowCustomDate(true);
        } else {
            setShowCustomDate(false);
            setStartDate('');
            setEndDate('');
        }
    };

    const handleShowDeactivatedList = () => {
        setShowDeactivatedList(true);
    };

    const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
        setNotification({
            message,
            type,
            isVisible: true
        });
    };

    const hideNotification = () => {
        setNotification(prev => ({
            ...prev,
            isVisible: false
        }));
    };

    const handleAddCustomer = () => {
        setShowAddCustomer(true);
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
    };

    const handleCloseAddCustomer = () => {
        setShowAddCustomer(false);
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
    };

    const handleNextStep = () => {
        if (selectedUser) {
            setNewCustomer(prev => ({
                ...prev,
                name: selectedUser.name,
                email: selectedUser.email,
                subscriptionPackage: selectedUser.subscriptionPackage
            }));
            setCurrentStep(2);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(1);
    };

    const handleCustomerChange = (field: string, value: string) => {
        setNewCustomer(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmitCustomer = () => {
        const newId = Math.max(...marketingServices.map(s => s.id)) + 1;
        const newService: MarketingService = {
            id: newId,
            customer: newCustomer.name,
            email: newCustomer.email,
            subscriptionPackage: newCustomer.subscriptionPackage,
            assistantName: newCustomer.assistantName,
            status: newCustomer.status,
            marketingService: newCustomer.marketingService,
            registeredDate: new Date().toISOString().split('T')[0],
            startedDate: newCustomer.startedDate,
            amount: newCustomer.marketingService.includes('Basic') ? '$99.99' :
                newCustomer.marketingService.includes('Premium') ? '$149.99' : '$199.99'
        };

        setMarketingServices(prev => [...prev, newService]);
        showNotification(`Customer ${newCustomer.name} has been added successfully!`);
        handleCloseAddCustomer();
    };

    const handleCloseDeactivatedList = () => {
        setShowDeactivatedList(false);
    };

    const handleRestoreCustomer = (customer: DeactivatedCustomer) => {
        setSelectedDeactivatedCustomer(customer);
        setShowRestoreCustomer(true);
    };

    const handleCloseRestoreCustomer = () => {
        setShowRestoreCustomer(false);
        setSelectedDeactivatedCustomer(null);
        setShowNewPackageForm(false);
        setNewCustomer({
            name: '',
            email: '',
            subscriptionPackage: '',
            assistantName: '',
            marketingService: '',
            startedDate: '',
            status: 'New'
        });
    };

    const handleRestoreWithNewPackage = () => {
        if (selectedDeactivatedCustomer) {
            setShowNewPackageForm(true);
            setNewCustomer({
                name: selectedDeactivatedCustomer.customer,
                email: selectedDeactivatedCustomer.email,
                subscriptionPackage: '',
                assistantName: '',
                marketingService: '',
                startedDate: '',
                status: 'Active'
            });
        }
    };

    const handleSubmitNewPackage = () => {
        if (selectedDeactivatedCustomer) {
            // Remove from deactivated list
            setDeactivatedCustomers(prev =>
                prev.filter(c => c.id !== selectedDeactivatedCustomer.id)
            );

            // Add to active list with new package
            const restoredCustomer: MarketingService = {
                id: selectedDeactivatedCustomer.id,
                customer: newCustomer.name,
                email: newCustomer.email,
                subscriptionPackage: newCustomer.subscriptionPackage,
                assistantName: newCustomer.assistantName,
                status: 'Active',
                marketingService: newCustomer.marketingService,
                registeredDate: new Date().toISOString().split('T')[0],
                startedDate: newCustomer.startedDate,
                amount: newCustomer.marketingService.includes('Basic') ? '$99.99' :
                    newCustomer.marketingService.includes('Premium') ? '$149.99' : '$199.99'
            };

            setMarketingServices(prev => [...prev, restoredCustomer]);
            showNotification(`Customer ${newCustomer.name} has been restored with new package successfully!`);
            handleCloseRestoreCustomer();
        }
    };

    const handleConfirmRestore = () => {
        if (selectedDeactivatedCustomer) {
            // Remove from deactivated list
            setDeactivatedCustomers(prev =>
                prev.filter(c => c.id !== selectedDeactivatedCustomer.id)
            );

            // Add back to active list
            const restoredCustomer: MarketingService = {
                id: selectedDeactivatedCustomer.id,
                customer: selectedDeactivatedCustomer.customer,
                email: selectedDeactivatedCustomer.email,
                subscriptionPackage: selectedDeactivatedCustomer.subscriptionPackage,
                assistantName: selectedDeactivatedCustomer.assistantName,
                status: 'Active',
                marketingService: selectedDeactivatedCustomer.marketingService,
                registeredDate: selectedDeactivatedCustomer.registeredDate,
                startedDate: selectedDeactivatedCustomer.startedDate,
                amount: selectedDeactivatedCustomer.amount
            };

            setMarketingServices(prev => [...prev, restoredCustomer]);
            showNotification(`Customer ${selectedDeactivatedCustomer.customer} has been restored successfully!`);
            handleCloseRestoreCustomer();
        }
    };

    return (
        <div>
            <MarketingServicesHeader
                onAddCustomer={handleAddCustomer}
                onShowDeactivatedList={handleShowDeactivatedList}
            />

            <MarketingStatsCards
                stats={dynamicMarketingStats}
                selectedStat={selectedStat}
                onStatClick={handleStatClick}
                timePeriod={timePeriod}
                onTimePeriodChange={setTimePeriod}
            />

            <MarketingFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusFilterChange={(value) => { setStatusFilter(value); setCurrentPage(1); }}
                packageFilter={packageFilter}
                onPackageFilterChange={(value) => { setPackageFilter(value); setCurrentPage(1); }}
                serviceFilter={serviceFilter}
                onServiceFilterChange={(value) => { setServiceFilter(value); setCurrentPage(1); }}
                dateFilter={dateFilter}
                onDateFilterChange={handleDateFilterChange}
                showCustomDate={showCustomDate}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
            />

            <MarketingServicesTable
                filteredServices={filteredServices}
                currentPage={currentPage}
                totalPages={totalPages}
                startIndex={startIndex}
                endIndex={endIndex}
                onPageChange={setCurrentPage}
            />

            {/* Modals */}
            <AddCustomerModal
                isOpen={showAddCustomer}
                onClose={handleCloseAddCustomer}
                currentStep={currentStep}
                userSearchTerm={userSearchTerm}
                onUserSearchChange={setUserSearchTerm}
                systemUsers={systemUsers}
                selectedUser={selectedUser}
                onUserSelect={setSelectedUser}
                newCustomer={newCustomer}
                onCustomerChange={handleCustomerChange}
                availableAssistants={availableAssistants}
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
                onSubmit={handleSubmitCustomer}
            />

            <DeactivatedListModal
                isOpen={showDeactivatedList}
                onClose={handleCloseDeactivatedList}
                deactivatedCustomers={deactivatedCustomers}
                onRestoreCustomer={handleRestoreCustomer}
            />

            <RestoreCustomerModal
                isOpen={showRestoreCustomer}
                onClose={handleCloseRestoreCustomer}
                customer={selectedDeactivatedCustomer}
                onConfirmRestore={handleConfirmRestore}
                onRestoreWithNewPackage={handleRestoreWithNewPackage}
                availableAssistants={availableAssistants}
                newCustomer={newCustomer}
                onCustomerChange={handleCustomerChange}
                showNewPackageForm={showNewPackageForm}
                onSubmitNewPackage={handleSubmitNewPackage}
            />

            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={hideNotification}
            />
        </div>
    );
}
