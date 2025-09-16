'use client';

import { useState, useMemo, useCallback } from 'react';
import {
    PlusIcon,
    ArrowDownTrayIcon,
    FunnelIcon,
    CalendarIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import LeadStatsCards from './components/LeadStatsCards';
import LeadSearchBar from './components/LeadSearchBar';
import LeadFilterPanel from './components/LeadFilterPanel';
import LeadTable from './components/LeadTable';
import { sampleLeads } from './data/sampleLeads';
import { Lead, LeadFilters, LeadStats } from '@/types/lead';

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
    }
];

export default function LeadManagementPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [filters, setFilters] = useState<LeadFilters>({});
    const [selectedStat, setSelectedStat] = useState<string | null>('total');
    const [timePeriod, setTimePeriod] = useState('this month');

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

        // Apply quick filters - remove this section since we don't have quick filters anymore

        // Apply advanced filters
        if (filters.owner) {
            filtered = filtered.filter(lead => lead.owner === filters.owner);
        }
        if (filters.leadType) {
            filtered = filtered.filter(lead => lead.leadType === filters.leadType);
        }
        if (filters.stage) {
            filtered = filtered.filter(lead => lead.stage === filters.stage);
        }
        if (filters.status) {
            filtered = filtered.filter(lead => lead.status === filters.status);
        }
        if (filters.source) {
            filtered = filtered.filter(lead => lead.source === filters.source);
        }

        // Apply date filters
        if (filters.dateAddedFrom || filters.dateAddedTo) {
            filtered = filtered.filter(lead => {
                const leadDate = new Date(lead.dateAdded);
                const fromDate = filters.dateAddedFrom ? new Date(filters.dateAddedFrom) : null;
                const toDate = filters.dateAddedTo ? new Date(filters.dateAddedTo) : null;

                return (!fromDate || leadDate >= fromDate) && (!toDate || leadDate <= toDate);
            });
        }

        if (filters.interactionFrom || filters.interactionTo) {
            filtered = filtered.filter(lead => {
                if (!lead.lastInteraction) return false;
                const interactionDate = new Date(lead.lastInteraction);
                const fromDate = filters.interactionFrom ? new Date(filters.interactionFrom) : null;
                const toDate = filters.interactionTo ? new Date(filters.interactionTo) : null;

                return (!fromDate || interactionDate >= fromDate) && (!toDate || interactionDate <= toDate);
            });
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
            }
        }

        return filtered;
    }, [searchTerm, filters, selectedStat]);

    const handleApplyFilters = useCallback(() => {
        setIsFilterPanelOpen(false);
    }, []);

    const handleClearFilters = useCallback(() => {
        setFilters({});
        // Keep selectedStat as 'total' instead of clearing it
        setSelectedStat('total');
    }, []);

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
                onStatSelect={setSelectedStat}
                timePeriod={timePeriod}
                onTimePeriodChange={setTimePeriod}
            />

            {/* Filters Only */}
            <LeadSearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onFilterToggle={() => setIsFilterPanelOpen(true)}
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
            </div>            {/* Lead Table */}
            <LeadTable
                leads={filteredLeads}
                onViewLead={handleViewLead}
                onScheduleAppointment={handleScheduleAppointment}
            />

            {/* Filter Panel */}
            <LeadFilterPanel
                isOpen={isFilterPanelOpen}
                onClose={() => setIsFilterPanelOpen(false)}
                filters={filters}
                onFiltersChange={setFilters}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
            />
        </div>
    );
}
