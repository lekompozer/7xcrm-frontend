'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
    PlusIcon,
    ArrowUpTrayIcon,
    MagnifyingGlassIcon,
    Cog6ToothIcon,
    TableCellsIcon,
    ViewColumnsIcon
} from '@heroicons/react/24/outline';
import LeadStatsCards from '../../../admin/lead-management/components/LeadStatsCards';
import LeadFilterPanel from '../../../admin/lead-management/components/LeadFilterPanel';
import LeadTable from '../../../admin/lead-management/components/LeadTable';
import LeadSearchBar from '../../../admin/lead-management/components/LeadSearchBar';
import LeadActionPanel from '../../../admin/lead-management/components/LeadActionPanel';
import { sampleLeads } from '../../../admin/lead-management/data/sampleLeads';
import { Lead, LeadStats } from '@/types/lead';

// Filter option interface
interface FilterOption {
    value: string;
    label: string;
    selected: boolean;
}

// Filters interface
interface LeadFilters {
    owners: FilterOption[];
    leadTypes: FilterOption[];
    stages: FilterOption[];
    statuses: FilterOption[];
    sources: FilterOption[];
}

// Pipeline stages
const pipelineStages = [
    { id: 'new', name: 'New', color: 'bg-gray-100' },
    { id: 'contacted', name: 'Contacted', color: 'bg-blue-100' },
    { id: 'consulted', name: 'Consulted', color: 'bg-yellow-100' },
    { id: 'quote', name: 'Quote', color: 'bg-orange-100' },
    { id: 'closed', name: 'Closed', color: 'bg-green-100' }
];

// Pipeline View Component
interface PipelineViewProps {
    leads: Lead[];
    onViewLead: (lead: Lead) => void;
    onScheduleAppointment: (lead: Lead) => void;
    onUpdateLeadStage: (leadId: string, newStage: string) => void;
}

function PipelineView({ leads, onViewLead, onScheduleAppointment, onUpdateLeadStage }: PipelineViewProps) {
    const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
    const [dragOverStage, setDragOverStage] = useState<string | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [dragOverPosition, setDragOverPosition] = useState<'above' | 'below' | null>(null);
    const [stageLeadOrders, setStageLeadOrders] = useState<{ [stageId: string]: string[] }>({});

    const handleDragStart = (e: React.DragEvent, lead: Lead) => {
        setDraggedLead(lead);
        e.dataTransfer.effectAllowed = 'move';

        // Create a drag image with fixed dimensions to prevent layout issues
        const element = e.currentTarget as HTMLElement;
        const rect = element.getBoundingClientRect();
        const dragImage = element.cloneNode(true) as HTMLElement;

        // Set fixed dimensions to prevent stretching
        dragImage.style.width = `${rect.width}px`;
        dragImage.style.height = `${rect.height}px`;
        dragImage.style.position = 'fixed';
        dragImage.style.top = '-1000px';
        dragImage.style.left = '-1000px';
        dragImage.style.pointerEvents = 'none';
        dragImage.style.transform = 'rotate(3deg) scale(1.05)';
        dragImage.style.opacity = '0.9';
        dragImage.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        dragImage.style.zIndex = '9999';

        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, rect.width / 2, rect.height / 2);
        setTimeout(() => document.body.removeChild(dragImage), 0);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragEnter = (e: React.DragEvent, stageId: string, index?: number) => {
        e.preventDefault();
        setDragOverStage(stageId);
        if (typeof index === 'number') {
            setDragOverIndex(index);
            // Detect mouse position relative to card
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const mouseY = e.clientY;
            const cardMiddle = rect.top + rect.height / 2;
            setDragOverPosition(mouseY < cardMiddle ? 'above' : 'below');
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        // Only clear if leaving the stage container completely
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            setDragOverStage(null);
            setDragOverIndex(null);
            setDragOverPosition(null);
        }
    };

    const handleCardDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const mouseY = e.clientY;
        const cardMiddle = rect.top + rect.height / 2;
        const position = mouseY < cardMiddle ? 'above' : 'below';

        setDragOverIndex(index);
        setDragOverPosition(position);
    };

    const handleDrop = (e: React.DragEvent, targetStage: string, targetIndex?: number) => {
        e.preventDefault();
        if (draggedLead) {
            const draggedLeadStage = getStageIdFromLead(draggedLead);

            if (draggedLeadStage === targetStage && typeof targetIndex === 'number') {
                // Same stage - reorder based on position
                let finalIndex = targetIndex;
                if (dragOverPosition === 'below') {
                    finalIndex = targetIndex + 1;
                }
                reorderLeadsInStage(targetStage, draggedLead.id, finalIndex);
            } else {
                // Different stage - move lead
                onUpdateLeadStage(draggedLead.id, targetStage);
            }
            setDraggedLead(null);
        }
        setDragOverStage(null);
        setDragOverIndex(null);
        setDragOverPosition(null);
    };

    const getStageIdFromLead = (lead: Lead): string => {
        const stageMapping: { [key: string]: string } = {
            'New': 'new',
            'Contacted': 'contacted',
            'Consulted': 'consulted',
            'Quote': 'quote',
            'Closed': 'closed'
        };
        return stageMapping[lead.stage] || 'new';
    };

    const reorderLeadsInStage = (stageId: string, leadId: string, newIndex: number) => {
        const stageLeads = getLeadsForStage(stageId);
        const currentIndex = stageLeads.findIndex(lead => lead.id === leadId);

        if (currentIndex !== -1 && currentIndex !== newIndex) {
            const newOrder = [...(stageLeadOrders[stageId] || stageLeads.map(l => l.id))];
            const [movedLead] = newOrder.splice(currentIndex, 1);
            newOrder.splice(newIndex, 0, movedLead);

            setStageLeadOrders(prev => ({
                ...prev,
                [stageId]: newOrder
            }));
        }
    };

    const getLeadsForStage = (stageId: string) => {
        const stageMapping: { [key: string]: string } = {
            'new': 'New',
            'contacted': 'Contacted',
            'consulted': 'Consulted',
            'quote': 'Quote',
            'closed': 'Closed'
        };

        const stageLeads = leads.filter((lead: Lead) =>
            lead.stage.toLowerCase() === stageMapping[stageId]?.toLowerCase()
        );

        // Apply custom ordering if exists
        const customOrder = stageLeadOrders[stageId];
        if (customOrder) {
            const orderedLeads: Lead[] = [];
            customOrder.forEach(leadId => {
                const lead = stageLeads.find(l => l.id === leadId);
                if (lead) orderedLeads.push(lead);
            });
            // Add any new leads that aren't in the custom order
            stageLeads.forEach(lead => {
                if (!customOrder.includes(lead.id)) {
                    orderedLeads.push(lead);
                }
            });
            return orderedLeads;
        }

        return stageLeads;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Sales Pipeline</h3>
                <div className="flex gap-6 overflow-x-auto pb-4 min-h-0">
                    {pipelineStages.map(stage => {
                        const stageLeads = getLeadsForStage(stage.id);
                        return (
                            <div
                                key={stage.id}
                                className="flex-shrink-0 w-80 min-w-80 max-w-80"
                                onDragOver={handleDragOver}
                                onDragEnter={(e) => handleDragEnter(e, stage.id)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, stage.id)}
                            >
                                {/* Stage Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${stage.color} flex items-center gap-2`}>
                                            {stage.name}
                                            <span className="text-xs bg-white bg-opacity-70 px-1.5 py-0.5 rounded-full">
                                                {stageLeads.length}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* Stage Content */}
                                <div className={`min-h-[400px] rounded-lg p-3 transition-all duration-200 ${dragOverStage === stage.id
                                    ? 'bg-blue-50 border-2 border-dashed border-blue-300'
                                    : 'bg-gray-50'
                                    }`}>
                                    {stageLeads.length === 0 ? (
                                        <div
                                            className={`flex items-center justify-center h-32 text-gray-400 border-2 border-dashed rounded-lg transition-all duration-300 ${dragOverStage === stage.id
                                                ? 'border-blue-400 bg-blue-50 text-blue-600 shadow-lg transform-gpu'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, stage.id, 0)}
                                        >
                                            <div className="text-center">
                                                <p className="text-sm font-medium">
                                                    {dragOverStage === stage.id ? 'Drop lead here' : 'No leads in this stage'}
                                                </p>
                                                {dragOverStage === stage.id && (
                                                    <p className="text-xs mt-1 opacity-75">Release to move lead</p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {stageLeads.map((lead, index) => (
                                                <div key={lead.id} className="relative">
                                                    {/* Drop indicator above */}
                                                    {dragOverStage === stage.id && dragOverIndex === index && dragOverPosition === 'above' && (
                                                        <div className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full mb-2 transition-all duration-300 animate-pulse shadow-lg" />
                                                    )}

                                                    {/* Lead Card with enhanced drop zone */}
                                                    <div
                                                        draggable
                                                        onDragStart={(e) => handleDragStart(e, lead)}
                                                        onDragOver={(e) => handleCardDragOver(e, index)}
                                                        onDragEnter={(e) => handleDragEnter(e, stage.id, index)}
                                                        onDrop={(e) => handleDrop(e, stage.id, index)}
                                                        className={`bg-white rounded-lg p-4 shadow-sm border-2 transition-all duration-300 cursor-move relative overflow-hidden ${draggedLead?.id === lead.id
                                                            ? 'opacity-40 border-gray-300 shadow-none'
                                                            : dragOverStage === stage.id && dragOverIndex === index
                                                                ? 'border-blue-400 shadow-xl bg-blue-50/50 ring-2 ring-blue-200'
                                                                : 'border-gray-200 hover:shadow-lg hover:border-gray-300'
                                                            } ${draggedLead && draggedLead.id !== lead.id ? 'hover:shadow-xl hover:border-blue-300' : ''}`}
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <h4 className="font-medium text-gray-900 text-sm">
                                                                    {lead.name}
                                                                </h4>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    {lead.company}
                                                                </p>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {lead.email}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    ${lead.value?.toLocaleString() || '0'}
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    {lead.source}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                                                            <div className="flex items-center space-x-2">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${lead.status === 'Hot Interest' ? 'bg-red-100 text-red-800' :
                                                                    lead.status === 'Interest' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-green-100 text-green-800'
                                                                    }`}>
                                                                    {lead.status}
                                                                </span>
                                                            </div>
                                                            <div className="flex space-x-1">
                                                                <button
                                                                    onClick={() => onViewLead(lead)}
                                                                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                                                                >
                                                                    View
                                                                </button>
                                                                <span className="text-gray-300">|</span>
                                                                <button
                                                                    onClick={() => onScheduleAppointment(lead)}
                                                                    className="text-green-600 hover:text-green-800 text-xs font-medium"
                                                                >
                                                                    Schedule
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Drop indicator below */}
                                                    {dragOverStage === stage.id && dragOverIndex === index && dragOverPosition === 'below' && (
                                                        <div className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full mt-2 transition-all duration-300 animate-pulse shadow-lg" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
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
        count: 65,
        color: 'yellow',
        previousCount: 72,
        period: 'this month'
    },
    {
        id: 'consulted',
        name: 'Consulted',
        count: 45,
        color: 'purple',
        previousCount: 38,
        period: 'this month'
    },
    {
        id: 'quote',
        name: 'Quote',
        count: 30,
        color: 'orange',
        previousCount: 28,
        period: 'this month'
    },
    {
        id: 'closed',
        name: 'Closed',
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
    const [timePeriod, setTimePeriod] = useState('this_month');
    const [viewMode, setViewMode] = useState<'table' | 'pipeline'>('table');

    // Use state for leads so we can update them
    const [leads, setLeads] = useState<Lead[]>(sampleLeads);

    // Action panel state
    const [isActionPanelOpen, setIsActionPanelOpen] = useState(false);
    const [selectedLeadForAction, setSelectedLeadForAction] = useState<Lead | null>(null);

    // Filter leads based on selected stat
    const filteredLeads = useMemo(() => {
        let filtered = leads;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(lead =>
                lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.phone.includes(searchTerm) ||
                lead.id.toString().includes(searchTerm)
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
            }
        }

        return filtered;
    }, [selectedStat, searchTerm, filters, leads]);

    const handleClearFilters = useCallback(() => {
        setSelectedStat('total');
        setSearchTerm('');
        setFilters({
            owners: filters.owners.map(owner => ({ ...owner, selected: false })),
            leadTypes: filters.leadTypes.map(type => ({ ...type, selected: false })),
            stages: filters.stages.map(stage => ({ ...stage, selected: false })),
            statuses: filters.statuses.map(status => ({ ...status, selected: false })),
            sources: filters.sources.map(source => ({ ...source, selected: false })),
        });
    }, [filters]);

    const handleViewLead = useCallback((lead: Lead) => {
        setSelectedLeadForAction(lead);
        setIsActionPanelOpen(true);
    }, []);

    const handleScheduleAppointment = useCallback((lead: Lead) => {
        console.log('Schedule appointment for lead:', lead.id);
        // Handle appointment scheduling logic
    }, []);

    const handleCloseActionPanel = useCallback(() => {
        setIsActionPanelOpen(false);
        setSelectedLeadForAction(null);
    }, []);

    const handleUpdateLeadStage = useCallback((leadId: string, newStage: string) => {
        // Convert stage id to proper stage name
        const stageMapping: { [key: string]: string } = {
            'new': 'New',
            'contacted': 'Contacted',
            'consulted': 'Consulted',
            'quote': 'Quote',
            'closed': 'Closed'
        };

        const stageName = stageMapping[newStage] || newStage;

        setLeads(prevLeads =>
            prevLeads.map(lead =>
                lead.id === leadId
                    ? { ...lead, stage: stageName as Lead['stage'] }
                    : lead
            )
        );

        console.log(`Lead ${leadId} moved to ${stageName}`);
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
                        <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                        Import
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

            {/* Filters Only - LeadSearchBar component */}
            <LeadSearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onFilterToggle={() => setIsFilterOpen(true)}
                filters={filters}
                onFiltersChange={setFilters}
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

                    {/* View Mode Toggle */}
                    <div className="flex items-center border border-gray-300 rounded-md bg-gray-100">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${viewMode === 'table'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                } rounded-l-md`}
                            title="Table View"
                        >
                            <TableCellsIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('pipeline')}
                            className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${viewMode === 'pipeline'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                } rounded-r-md border-l border-gray-300`}
                            title="Pipeline View"
                        >
                            <ViewColumnsIcon className="h-4 w-4" />
                        </button>
                    </div>

                    {(Object.values(filters).some((filterArray: FilterOption[]) => filterArray.some((option: FilterOption) => option.selected)) || (selectedStat && selectedStat !== 'total')) && (
                        <button
                            onClick={handleClearFilters}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>

                <div className="text-sm text-gray-600">
                    Showing {filteredLeads.length} of {leads.length} leads
                    {selectedStat && selectedStat !== 'total' && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Filtered by: {statsData.find(s => s.id === selectedStat)?.name}
                        </span>
                    )}
                </div>
            </div>

            {/* Lead Content - Table or Pipeline View */}
            {viewMode === 'table' ? (
                <LeadTable
                    leads={filteredLeads}
                    onViewLead={handleViewLead}
                    onScheduleAppointment={handleScheduleAppointment}
                    isCustomizePanelOpen={isCustomizeOpen}
                    onCustomizePanelClose={() => setIsCustomizeOpen(false)}
                />
            ) : (
                <PipelineView
                    leads={filteredLeads}
                    onViewLead={handleViewLead}
                    onScheduleAppointment={handleScheduleAppointment}
                    onUpdateLeadStage={handleUpdateLeadStage}
                />
            )}

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

            {/* Lead Action Panel */}
            {selectedLeadForAction && (
                <LeadActionPanel
                    isOpen={isActionPanelOpen}
                    onClose={handleCloseActionPanel}
                    lead={selectedLeadForAction}
                />
            )}
        </div>
    );
}