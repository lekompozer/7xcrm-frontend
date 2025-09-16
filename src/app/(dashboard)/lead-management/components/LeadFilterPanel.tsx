import { XMarkIcon, CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { LeadFilters } from '@/types/lead';
import { useEffect, useState } from 'react';

interface LeadFilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
    filters: LeadFilters;
    onFiltersChange: (filters: LeadFilters) => void;
    onApplyFilters: () => void;
    onClearFilters: () => void;
}

export default function LeadFilterPanel({
    isOpen,
    onClose,
    filters,
    onFiltersChange,
    onApplyFilters,
    onClearFilters
}: LeadFilterPanelProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);

    const handleFilterChange = (key: keyof LeadFilters, value: string) => {
        onFiltersChange({
            ...filters,
            [key]: value || undefined
        });
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-40 overflow-hidden">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            ></div>

            {/* Slide-in Panel */}
            <div className={`absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-10 transform transition-all duration-300 ease-in-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                    <h2 className="text-lg font-semibold text-gray-900">Advanced Filters</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-full"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Filter Content */}
                <div className="flex-1 px-6 py-6 overflow-y-auto max-h-[calc(100vh-140px)]">
                    <div className="space-y-6">
                        {/* Owner Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Owner
                            </label>
                            <div className="relative">
                                <select
                                    value={filters.owner || ''}
                                    onChange={(e) => handleFilterChange('owner', e.target.value)}
                                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                >
                                    <option value="">All Owners</option>
                                    <option value="John Smith">John Smith</option>
                                    <option value="Sarah Johnson">Sarah Johnson</option>
                                    <option value="Mike Chen">Mike Chen</option>
                                    <option value="Emily Davis">Emily Davis</option>
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Lead Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Lead Type
                            </label>
                            <div className="relative">
                                <select
                                    value={filters.leadType || ''}
                                    onChange={(e) => handleFilterChange('leadType', e.target.value)}
                                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                >
                                    <option value="">All Types</option>
                                    <option value="Individual">Individual</option>
                                    <option value="Business">Business</option>
                                    <option value="Partner">Partner</option>
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Stage Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stage
                            </label>
                            <div className="relative">
                                <select
                                    value={filters.stage || ''}
                                    onChange={(e) => handleFilterChange('stage', e.target.value)}
                                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                >
                                    <option value="">All Stages</option>
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Consulted">Consulted</option>
                                    <option value="Quote">Quote</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Lost">Lost</option>
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <div className="relative">
                                <select
                                    value={filters.status || ''}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Converted">Converted</option>
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Source Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Source
                            </label>
                            <div className="relative">
                                <select
                                    value={filters.source || ''}
                                    onChange={(e) => handleFilterChange('source', e.target.value)}
                                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                >
                                    <option value="">All Sources</option>
                                    <option value="Website">Website</option>
                                    <option value="Social Media">Social Media</option>
                                    <option value="Referral">Referral</option>
                                    <option value="Cold Call">Cold Call</option>
                                    <option value="Email Campaign">Email Campaign</option>
                                    <option value="Event">Event</option>
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Date Added Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date Added
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">From</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={filters.dateAddedFrom || ''}
                                            onChange={(e) => handleFilterChange('dateAddedFrom', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">To</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={filters.dateAddedTo || ''}
                                            onChange={(e) => handleFilterChange('dateAddedTo', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Birthday Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Birthday
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">From</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={filters.birthdayFrom || ''}
                                            onChange={(e) => handleFilterChange('birthdayFrom', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">To</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={filters.birthdayTo || ''}
                                            onChange={(e) => handleFilterChange('birthdayTo', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interaction Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Interaction
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">From</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={filters.interactionFrom || ''}
                                            onChange={(e) => handleFilterChange('interactionFrom', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">To</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={filters.interactionTo || ''}
                                            onChange={(e) => handleFilterChange('interactionTo', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex space-x-3">
                        <button
                            onClick={onClearFilters}
                            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={onApplyFilters}
                            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
