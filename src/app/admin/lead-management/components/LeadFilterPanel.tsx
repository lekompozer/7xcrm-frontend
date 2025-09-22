import { XMarkIcon, CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { LeadFilters } from '@/types/lead';
import { useEffect, useState, useRef } from 'react';

interface FilterOption {
    value: string;
    label: string;
    selected: boolean;
}

interface AdvancedLeadFilters {
    owners: FilterOption[];
    leadTypes: FilterOption[];
    stages: FilterOption[];
    statuses: FilterOption[];
    sources: FilterOption[];
    dateAddedFrom: string;
    dateAddedTo: string;
    birthdayFrom: string;
    birthdayTo: string;
    interactionFrom: string;
    interactionTo: string;
}

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
    onApplyFilters,
    onClearFilters
}: LeadFilterPanelProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [advancedFilters, setAdvancedFilters] = useState<AdvancedLeadFilters>({
        owners: [
            { value: 'John Smith', label: 'John Smith', selected: false },
            { value: 'Sarah Johnson', label: 'Sarah Johnson', selected: false },
            { value: 'Mike Chen', label: 'Mike Chen', selected: false },
            { value: 'Emily Davis', label: 'Emily Davis', selected: false },
        ],
        leadTypes: [
            { value: 'Customer', label: 'Customer', selected: false },
            { value: 'Prospect', label: 'Prospect', selected: false },
            { value: 'Hidden', label: 'Hidden', selected: false },
        ],
        stages: [
            { value: 'New', label: 'New', selected: false },
            { value: 'Contacted', label: 'Contacted', selected: false },
            { value: 'Consulted', label: 'Consulted', selected: false },
            { value: 'Quote', label: 'Quote', selected: false },
            { value: 'Closed', label: 'Closed', selected: false },
            { value: 'Lost', label: 'Lost', selected: false },
        ],
        statuses: [
            { value: 'Cold', label: 'Cold 10%', selected: false },
            { value: 'Unidentified', label: 'Unidentified 25%', selected: false },
            { value: 'Follow Later', label: 'Follow Later 50%', selected: false },
            { value: 'Interest', label: 'Interest 75%', selected: false },
            { value: 'Hot Interest', label: 'Hot Interest 85%', selected: false },
            { value: 'Close', label: 'Close 99.99%', selected: false },
            { value: 'Stop', label: 'Stop 0%', selected: false },
            { value: 'Re-buy', label: 'Re-buy', selected: false },
            { value: 'Change Mind', label: 'Change Mind', selected: false },
            { value: 'Denied', label: 'Denied', selected: false },
        ],
        sources: [
            { value: 'Website', label: 'Website', selected: false },
            { value: 'Social Media', label: 'Social Media', selected: false },
            { value: 'Referral', label: 'Referral', selected: false },
            { value: 'Cold Call', label: 'Cold Call', selected: false },
            { value: 'Email Campaign', label: 'Email Campaign', selected: false },
            { value: 'Event', label: 'Event', selected: false },
        ],
        dateAddedFrom: '',
        dateAddedTo: '',
        birthdayFrom: '',
        birthdayTo: '',
        interactionFrom: '',
        interactionTo: ''
    });
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdown && dropdownRefs.current[openDropdown]) {
                const dropdownElement = dropdownRefs.current[openDropdown];
                if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
                    setOpenDropdown(null);
                }
            }
        };

        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [openDropdown]);

    const handleOptionToggle = (filterType: keyof AdvancedLeadFilters, optionValue: string) => {
        if (typeof advancedFilters[filterType] === 'object' && Array.isArray(advancedFilters[filterType])) {
            const filterArray = advancedFilters[filterType] as FilterOption[];
            const optionIndex = filterArray.findIndex(option => option.value === optionValue);

            if (optionIndex !== -1) {
                const newFilters = { ...advancedFilters };
                (newFilters[filterType] as FilterOption[])[optionIndex].selected = !filterArray[optionIndex].selected;
                setAdvancedFilters(newFilters);
            }
        }
    };

    const getSelectedCount = (filterArray: FilterOption[]) => {
        return filterArray.filter(option => option.selected).length;
    };

    const getDropdownLabel = (filterArray: FilterOption[], defaultLabel: string) => {
        const selectedCount = getSelectedCount(filterArray);
        if (selectedCount === 0) return defaultLabel;
        if (selectedCount === 1) {
            const selected = filterArray.find(option => option.selected);
            return selected ? selected.label : defaultLabel;
        }
        return `${selectedCount} selected`;
    };

    const renderCheckboxDropdown = (
        filterType: keyof AdvancedLeadFilters,
        defaultLabel: string,
        options: FilterOption[]
    ) => {
        const isOpen = openDropdown === filterType;

        return (
            <div
                className="relative"
                ref={(el) => {
                    dropdownRefs.current[filterType] = el;
                }}
            >
                <button
                    onClick={() => setOpenDropdown(isOpen ? null : filterType)}
                    className="w-full px-3 py-2 text-left text-sm bg-white/80 backdrop-blur-sm border border-gray-300/60 rounded-md hover:bg-gray-50/80 hover:backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-between"
                >
                    <span className="truncate">{getDropdownLabel(options, defaultLabel)}</span>
                    <ChevronDownIcon
                        className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center px-3 py-2 hover:bg-gray-50/80 hover:backdrop-blur-sm cursor-pointer text-sm transition-all duration-150"
                            >
                                <input
                                    type="checkbox"
                                    checked={option.selected}
                                    onChange={() => handleOptionToggle(filterType, option.value)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                                />
                                <span className="text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const handleDateChange = (field: keyof AdvancedLeadFilters, value: string) => {
        setAdvancedFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleClearAll = () => {
        setAdvancedFilters({
            owners: advancedFilters.owners.map(owner => ({ ...owner, selected: false })),
            leadTypes: advancedFilters.leadTypes.map(type => ({ ...type, selected: false })),
            stages: advancedFilters.stages.map(stage => ({ ...stage, selected: false })),
            statuses: advancedFilters.statuses.map(status => ({ ...status, selected: false })),
            sources: advancedFilters.sources.map(source => ({ ...source, selected: false })),
            dateAddedFrom: '',
            dateAddedTo: '',
            birthdayFrom: '',
            birthdayTo: '',
            interactionFrom: '',
            interactionTo: ''
        });
        onClearFilters();
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
            <div className={`absolute inset-y-0 right-0 max-w-md w-full bg-white/90 backdrop-blur-md shadow-2xl border-l border-gray-200/50 z-10 transform transition-all duration-300 ease-in-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
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
                            {renderCheckboxDropdown('owners', 'All Owners', advancedFilters.owners)}
                        </div>

                        {/* Lead Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Lead Type
                            </label>
                            {renderCheckboxDropdown('leadTypes', 'All Types', advancedFilters.leadTypes)}
                        </div>

                        {/* Stage Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stage
                            </label>
                            {renderCheckboxDropdown('stages', 'All Stages', advancedFilters.stages)}
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            {renderCheckboxDropdown('statuses', 'All Statuses', advancedFilters.statuses)}
                        </div>

                        {/* Source Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Source
                            </label>
                            {renderCheckboxDropdown('sources', 'All Sources', advancedFilters.sources)}
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
                                            value={advancedFilters.dateAddedFrom}
                                            onChange={(e) => handleDateChange('dateAddedFrom', e.target.value)}
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
                                            value={advancedFilters.dateAddedTo}
                                            onChange={(e) => handleDateChange('dateAddedTo', e.target.value)}
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
                                            value={advancedFilters.birthdayFrom}
                                            onChange={(e) => handleDateChange('birthdayFrom', e.target.value)}
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
                                            value={advancedFilters.birthdayTo}
                                            onChange={(e) => handleDateChange('birthdayTo', e.target.value)}
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
                                            value={advancedFilters.interactionFrom}
                                            onChange={(e) => handleDateChange('interactionFrom', e.target.value)}
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
                                            value={advancedFilters.interactionTo}
                                            onChange={(e) => handleDateChange('interactionTo', e.target.value)}
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
                <div className="px-6 py-4 border-t border-gray-200/50 bg-gray-50/80 backdrop-blur-sm">
                    <div className="flex space-x-3">
                        <button
                            onClick={handleClearAll}
                            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-300/60 rounded-md hover:bg-gray-50/80 hover:backdrop-blur-md transition-all duration-200"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={() => {
                                onApplyFilters();
                                onClose();
                            }}
                            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600/90 backdrop-blur-sm border border-transparent rounded-md hover:bg-blue-700/90 transition-all duration-200"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
