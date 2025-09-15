import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface MarketingFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
    packageFilter: string;
    onPackageFilterChange: (value: string) => void;
    serviceFilter: string;
    onServiceFilterChange: (value: string) => void;
    dateFilter: string;
    onDateFilterChange: (value: string) => void;
    showCustomDate: boolean;
    startDate: string;
    endDate: string;
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
}

export default function MarketingFilters({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    packageFilter,
    onPackageFilterChange,
    serviceFilter,
    onServiceFilterChange,
    dateFilter,
    onDateFilterChange,
    showCustomDate,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange
}: MarketingFiltersProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            {/* Search */}
            <div className="mb-4">
                <div className="relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search customers, emails, assistants, or services..."
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Status Filter */}
                <div className="relative">
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusFilterChange(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                    >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="active">Active</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Subscription Package Filter */}
                <div className="relative">
                    <select
                        value={packageFilter}
                        onChange={(e) => onPackageFilterChange(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                    >
                        <option value="all">All Packages</option>
                        <option value="basic">Basic Plan</option>
                        <option value="pro">Pro Plan</option>
                        <option value="enterprise">Enterprise Plan</option>
                    </select>
                    <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Marketing Services Filter */}
                <div className="relative">
                    <select
                        value={serviceFilter}
                        onChange={(e) => onServiceFilterChange(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                    >
                        <option value="all">All Services</option>
                        <option value="ma1">MA-1 — SevenX Launch & Enablement</option>
                        <option value="ma2">MA-2 — Social, Fanpage & Website Management</option>
                        <option value="ma3">MA-3 — Performance Ads (Lead Generations)</option>
                        <option value="ma4">MA-4 — Creative & Content Studio</option>
                        <option value="ma5">MA-5 — Contact & Converstion Management</option>
                    </select>
                    <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Date Filter */}
                <div className="relative">
                    <select
                        value={dateFilter}
                        onChange={(e) => onDateFilterChange(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                    >
                        <option value="all">All Time</option>
                        <option value="thisweek">This Week</option>
                        <option value="thismonth">This Month</option>
                        <option value="thisyear">This Year</option>
                        <option value="custom">Custom Date</option>
                    </select>
                    <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Custom Date Range */}
            {showCustomDate && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => onStartDateChange(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => onEndDateChange(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
