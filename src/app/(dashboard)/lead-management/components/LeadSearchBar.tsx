import { useState, useEffect, useRef } from 'react';
import { FunnelIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface FilterOption {
    value: string;
    label: string;
    selected: boolean;
}

interface LeadFilters {
    owners: FilterOption[];
    leadTypes: FilterOption[];
    stages: FilterOption[];
    statuses: FilterOption[];
    sources: FilterOption[];
}

interface LeadSearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onFilterToggle: () => void;
    filters: LeadFilters;
    onFiltersChange: (filters: LeadFilters) => void;
}

export default function LeadSearchBar({
    searchTerm: _searchTerm,
    onSearchChange: _onSearchChange,
    onFilterToggle,
    filters,
    onFiltersChange
}: LeadSearchBarProps) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

    const handleOptionToggle = (filterType: keyof LeadFilters, optionValue: string) => {
        const newFilters = { ...filters };
        const filterArray = newFilters[filterType];
        const optionIndex = filterArray.findIndex(option => option.value === optionValue);

        if (optionIndex !== -1) {
            filterArray[optionIndex].selected = !filterArray[optionIndex].selected;
            onFiltersChange(newFilters);
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

    const renderDropdown = (
        filterType: keyof LeadFilters,
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
                    className="w-full px-3 py-2 text-left text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-between"
                >
                    <span className="truncate">{getDropdownLabel(options, defaultLabel)}</span>
                    <ChevronDownIcon
                        className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
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

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {/* Owner Dropdown */}
                    {renderDropdown('owners', 'All Owners', filters.owners)}

                    {/* Lead Type Dropdown */}
                    {renderDropdown('leadTypes', 'Lead Type', filters.leadTypes)}

                    {/* Stage Dropdown */}
                    {renderDropdown('stages', 'Stage', filters.stages)}

                    {/* Status Dropdown */}
                    {renderDropdown('statuses', 'Status', filters.statuses)}

                    {/* Source Dropdown */}
                    {renderDropdown('sources', 'Source', filters.sources)}
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-gray-300"></div>

                {/* Filter Button */}
                <button
                    onClick={onFilterToggle}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors flex-shrink-0"
                >
                    <FunnelIcon className="h-4 w-4 mr-2" />
                    Filter
                </button>
            </div>
        </div>
    );
}
