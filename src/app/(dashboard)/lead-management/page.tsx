'use client';

import { useState, useMemo, useCallback } from 'react';
import {
    PlusIcon,
    ArrowDownTrayIcon,
    CalendarIcon,
    MagnifyingGlassIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';
import LeadStatsCards from './components/LeadStatsCards';
import LeadSearchBar from './components/LeadSearchBar';
import LeadFilterPanel from './components/LeadFilterPanel';
import LeadTable from './components/LeadTable';
import { sampleLeads } from './data/sampleLeads';
import { Lead, LeadStats } from '@/types/lead';

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

// Sample stats data for the cards
const statsData: LeadStats[] = [
    {
        id: 'total',
        name: 'Total',
        count: 150,
        color: 'blue',
        previousCount: 142,
        period: 'this month'
    },
    {
        id: 'new',
        name: 'New',
        count: 25,
        color: 'green',
        previousCount: 18,
        period: 'this week'
    },
    {
        id: 'contacted',
        name: 'Contacted',
        count: 45,
        color: 'yellow',
        previousCount: 38,
        period: 'this month'
    },
    {
        id: 'consulted',
        name: 'Consulted',
        count: 32,
        color: 'purple',
        previousCount: 28,
        period: 'this month'
    },
    {
        id: 'quote',
        name: 'Quote',
        count: 18,
        color: 'orange',
        previousCount: 12,
        period: 'this month'
    },
    {
        id: 'closed',
        name: 'Closed',
        count: 12,
        color: 'emerald',
        previousCount: 8,
        period: 'this month'
    },
    {
        id: 'lost',
        name: 'Lost',
        count: 8,
        color: 'red',
        previousCount: 5,
        period: 'this month'
    }
];

export default function LeadManagementPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
    const [_selectedLeads, _setSelectedLeads] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStat, setSelectedStat] = useState<string>('total');
    const [timePeriod, setTimePeriod] = useState<string>('this-month');
    const [filters, setFilters] = useState<LeadFilters>({
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
    });

    // Filter leads based on search term and filters
    const filteredLeads = useMemo(() => {
        let filtered = sampleLeads;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(lead =>
                lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.phone.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply checkbox filters
        const selectedOwners = filters.owners.filter(owner => owner.selected).map(owner => owner.value);
        if (selectedOwners.length > 0) {
            filtered = filtered.filter(lead => selectedOwners.includes(lead.owner));
        }

        const selectedLeadTypes = filters.leadTypes.filter(type => type.selected).map(type => type.value);
        if (selectedLeadTypes.length > 0) {
            filtered = filtered.filter(lead => selectedLeadTypes.includes(lead.leadType));
        }

        const selectedStages = filters.stages.filter(stage => stage.selected).map(stage => stage.value);
        if (selectedStages.length > 0) {
            filtered = filtered.filter(lead => selectedStages.includes(lead.stage));
        }

        const selectedStatuses = filters.statuses.filter(status => status.selected).map(status => status.value);
        if (selectedStatuses.length > 0) {
            filtered = filtered.filter(lead => selectedStatuses.includes(lead.status));
        }

        const selectedSources = filters.sources.filter(source => source.selected).map(source => source.value);
        if (selectedSources.length > 0) {
            filtered = filtered.filter(lead => selectedSources.includes(lead.source));
        }

        // Apply selected stat filter
        if (selectedStat && selectedStat !== 'total') {
            switch (selectedStat) {
                case 'new':
                    filtered = filtered.filter(lead => lead.stage === 'New');
                    break;
                case 'contacted':
                    filtered = filtered.filter(lead => lead.stage === 'Contacted');
                    break;
                case 'consulted':
                    filtered = filtered.filter(lead => lead.stage === 'Consulted');
                    break;
                case 'quote':
                    filtered = filtered.filter(lead => lead.stage === 'Quote');
                    break;
                case 'closed':
                    filtered = filtered.filter(lead => lead.stage === 'Closed');
                    break;
                case 'lost':
                    filtered = filtered.filter(lead => lead.stage === 'Lost');
                    break;
            }
        }

        return filtered;
    }, [searchTerm, filters, selectedStat]);

    const handleApplyFilters = useCallback(() => {
        setIsFilterOpen(false);
    }, []);

    const handleClearFilters = useCallback(() => {
        setFilters({
            owners: filters.owners.map(owner => ({ ...owner, selected: false })),
            leadTypes: filters.leadTypes.map(type => ({ ...type, selected: false })),
            stages: filters.stages.map(stage => ({ ...stage, selected: false })),
            statuses: filters.statuses.map(status => ({ ...status, selected: false })),
            sources: filters.sources.map(source => ({ ...source, selected: false })),
        });
        setSelectedStat('total');
    }, [filters]);

    const handleViewLead = useCallback((lead: Lead) => {
        // TODO: Open lead details modal
        console.log('View lead:', lead);
    }, []);

    const handleScheduleAppointment = useCallback((lead: Lead) => {
        // TODO: Open appointment scheduling modal
        console.log('Schedule appointment for:', lead);
    }, []);

    const handleCreateLead = useCallback(() => {
        // TODO: Open create lead modal
        console.log('Create new lead');
    }, []);

    const handleImportLeads = useCallback(() => {
        // TODO: Open import leads dialog
        console.log('Import leads');
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
                    <p className="text-gray-600">Track and manage your sales leads</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => console.log('Schedule appointment')}
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Appointment
                    </button>
                    <button
                        onClick={handleImportLeads}
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                        Import
                    </button>
                    <button
                        onClick={handleCreateLead}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        New Lead
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <LeadStatsCards
                stats={statsData}
                selectedStat={selectedStat}
                onStatSelect={(statId) => setSelectedStat(statId || 'total')}
                timePeriod={timePeriod}
                onTimePeriodChange={setTimePeriod}
            />

            {/* Filters Only */}
            <LeadSearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onFilterToggle={() => setIsFilterOpen(true)}
                filters={filters}
                onFiltersChange={setFilters}
            />

            {/* Search and Results Summary */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* Only Search Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by Name, ID, Phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            style={{ width: '480px' }}
                        />
                    </div>

                    {/* Customize Button */}
                    <button
                        onClick={() => setIsCustomizeOpen(true)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors flex-shrink-0"
                    >
                        <Cog6ToothIcon className="h-4 w-4 mr-2" />
                        Customize
                    </button>

                    {(Object.keys(filters).length > 0 || (selectedStat && selectedStat !== 'total')) && (
                        <button
                            onClick={handleClearFilters}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>

                <div className="text-sm text-gray-600">
                    Showing {filteredLeads.length} of {sampleLeads.length} leads
                    {selectedStat && selectedStat !== 'total' && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Filtered by: {statsData.find(s => s.id === selectedStat)?.name}
                        </span>
                    )}
                </div>
            </div>

            {/* Lead Table */}
            <LeadTable
                leads={filteredLeads}
                onViewLead={handleViewLead}
                onScheduleAppointment={handleScheduleAppointment}
                isCustomizePanelOpen={isCustomizeOpen}
                onCustomizePanelClose={() => setIsCustomizeOpen(false)}
            />

            {/* Filter Panel - Temporarily disabled */}
            {/* Filter Panel */}
            <LeadFilterPanel
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={{
                    status: '',
                    stage: '',
                    source: '',
                    owner: '',
                    leadType: '',
                    dateAddedFrom: '',
                    dateAddedTo: '',
                    birthdayFrom: '',
                    birthdayTo: '',
                    interactionFrom: '',
                    interactionTo: ''
                }}
                onFiltersChange={() => { }}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
            />
        </div>
    );
}
