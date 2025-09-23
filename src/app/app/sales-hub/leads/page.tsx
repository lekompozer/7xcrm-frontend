'use client';

import { useState, useMemo, useCallback } from 'react';
import {
    PlusIcon,
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';
import LeadStatsCards from '../../../admin/lead-management/components/LeadStatsCards';
import LeadFilterPanel from '../../../admin/lead-management/components/LeadFilterPanel';
import LeadTable from '../../../admin/lead-management/components/LeadTable';
import { sampleLeads } from '../../../admin/lead-management/data/sampleLeads';
import { Lead, LeadStats } from '@/types/lead';

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
        count: 65,
        color: 'yellow',
        previousCount: 72,
        period: 'this month'
    },
    {
        id: 'qualified',
        name: 'Qualified',
        count: 45,
        color: 'purple',
        previousCount: 38,
        period: 'this month'
    },
    {
        id: 'converted',
        name: 'Converted',
        count: 15,
        color: 'green',
        previousCount: 14,
        period: 'this month'
    }
];

export default function LeadsPage() {
    const [selectedStat, setSelectedStat] = useState<string | null>('total');
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [timePeriod, setTimePeriod] = useState('this_month');

    // Filter leads based on selected stat
    const filteredLeads = useMemo(() => {
        let filtered = sampleLeads;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(lead =>
                lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.phone.includes(searchTerm) ||
                lead.id.toString().includes(searchTerm)
            );
        }

        // Filter by selected stat
        if (selectedStat && selectedStat !== 'total') {
            filtered = filtered.filter(lead => lead.status === selectedStat);
        }

        // Apply additional filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== '') {
                switch (key) {
                    case 'stage':
                        filtered = filtered.filter(lead => lead.stage === value);
                        break;
                    case 'source':
                        filtered = filtered.filter(lead => lead.source === value);
                        break;
                    case 'owner':
                        filtered = filtered.filter(lead => lead.owner === value);
                        break;
                    case 'leadType':
                        filtered = filtered.filter(lead => lead.leadType === value);
                        break;
                    case 'status':
                        filtered = filtered.filter(lead => lead.status === value);
                        break;
                    // Add more filter cases as needed
                }
            }
        });

        return filtered;
    }, [selectedStat, searchTerm, filters]);

    const handleClearFilters = useCallback(() => {
        setSelectedStat('total');
        setSearchTerm('');
        setFilters({});
    }, []);

    const handleViewLead = useCallback((lead: Lead) => {
        console.log('View lead:', lead.id);
        // Handle lead view logic
    }, []);

    const handleScheduleAppointment = useCallback((lead: Lead) => {
        console.log('Schedule appointment for lead:', lead.id);
        // Handle appointment scheduling logic
    }, []);

    const handleApplyFilters = useCallback(() => {
        setIsFilterOpen(false);
    }, []);

    return (
        <div className="flex-1 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage and track your sales leads
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                        Export
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Lead
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

            {/* Search and Filters Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                    {/* Search Bar */}
                    <div className="relative flex-shrink-0">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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