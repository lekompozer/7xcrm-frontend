'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Lead } from '@/types/lead';
import CustomizeColumnsPanel from './CustomizeColumnsPanel';
import {
    ChevronUpIcon,
    ChevronDownIcon,
    DocumentMagnifyingGlassIcon,
    EllipsisVerticalIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

interface Column {
    id: string;
    name: string;
    width: number;
    visible: boolean;
    sticky: 'left' | 'right' | 'none';
    draggable: boolean;
}

interface LeadTableProps {
    leads: Lead[];
    onViewLead: (lead: Lead) => void;
    onScheduleAppointment: (lead: Lead) => void;
    isCustomizePanelOpen?: boolean;
    onCustomizePanelClose?: () => void;
}

// Function to get stage color
const getStageColor = (stage: string) => {
    switch (stage) {
        case 'New':
            return 'bg-[#1E93AB] text-white';
        case 'Contacted':
            return 'bg-yellow-100 text-yellow-800';
        case 'Consulted':
            return 'bg-orange-100 text-orange-800';
        case 'Quote':
            return 'bg-purple-100 text-purple-800';
        case 'Closed':
            return 'bg-green-100 text-green-800';
        case 'Lost':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

// Function to get status color
const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'interest':
            return 'bg-pink-100 text-pink-800';
        case 'hot interest':
            return 'bg-red-100 text-red-800';
        case 'close':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

// Function to generate avatar
const generateAvatar = (contactName: string, leadId?: string) => {
    // Some leads will have real profile images
    const hasRealAvatar = leadId && ['#ED18CB23', '#ED18CB26', '#ED18CB29'].includes(leadId);

    if (hasRealAvatar) {
        return (
            <img
                src={`https://images.unsplash.com/photo-${leadId === '#ED18CB23' ? '1472099645785-5658abf4ff4e' : leadId === '#ED18CB26' ? '1494790108755-2616c4901d52' : '1507003211169-0a1dd7228f2d'}?w=40&h=40&fit=crop&crop=face`}
                alt={contactName}
                className="w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-full object-cover flex-shrink-0"
            />
        );
    }

    // Generate initials for avatar
    const initials = contactName
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);

    return (
        <div className="w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
            {initials}
        </div>
    );
};

export default function LeadTable({
    leads,
    onViewLead,
    onScheduleAppointment,
    isCustomizePanelOpen = false,
    onCustomizePanelClose = () => { }
}: LeadTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [showRightShadow, setShowRightShadow] = useState(true);
    const dropdownRef = useRef<HTMLButtonElement>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [columns, setColumns] = useState<Column[]>([
        { id: 'selection', name: 'Selection', width: 50, visible: true, sticky: 'left', draggable: false },
        { id: 'lead', name: 'Lead', width: 250, visible: true, sticky: 'left', draggable: false },
        { id: 'leadId', name: 'Lead ID', width: 108, visible: true, sticky: 'none', draggable: true },
        { id: 'stage', name: 'Stage', width: 100, visible: true, sticky: 'none', draggable: true },
        { id: 'source', name: 'Source', width: 140, visible: true, sticky: 'none', draggable: true },
        { id: 'status', name: 'Status', width: 100, visible: true, sticky: 'none', draggable: true },
        { id: 'cellphone', name: 'Cellphone', width: 130, visible: true, sticky: 'none', draggable: true },
        { id: 'state', name: 'State', width: 120, visible: true, sticky: 'none', draggable: true },
        { id: 'leadType', name: 'Lead Type', width: 100, visible: true, sticky: 'none', draggable: true },
        { id: 'contactName', name: 'Contact Name', width: 200, visible: false, sticky: 'none', draggable: true },
        { id: 'workPhone', name: 'Work Phone', width: 130, visible: false, sticky: 'none', draggable: true },
        { id: 'agent', name: 'Agent', width: 150, visible: false, sticky: 'none', draggable: true },
        { id: 'owner', name: 'Owner', width: 150, visible: false, sticky: 'none', draggable: true },
        { id: 'cellphone2', name: 'Cellphone 2', width: 130, visible: false, sticky: 'none', draggable: true },
        { id: 'homePhone', name: 'Home Phone', width: 130, visible: false, sticky: 'none', draggable: true },
        { id: 'email', name: 'Email', width: 200, visible: false, sticky: 'none', draggable: true },
        { id: 'gender', name: 'Gender', width: 100, visible: false, sticky: 'none', draggable: true },
        { id: 'dateOfBirth', name: 'Date of Birth', width: 120, visible: false, sticky: 'none', draggable: true },
        { id: 'policyStatus', name: 'Policy Status', width: 120, visible: false, sticky: 'none', draggable: true },
        { id: 'leadTag', name: 'Lead Tag', width: 120, visible: false, sticky: 'none', draggable: true },
        { id: 'city', name: 'City', width: 120, visible: false, sticky: 'none', draggable: true },
        { id: 'usaCitizen', name: 'USA Citizen', width: 120, visible: false, sticky: 'none', draggable: true },
        { id: 'greenCard', name: 'Green Card', width: 120, visible: false, sticky: 'none', draggable: true },
        { id: 'driverLicense', name: 'Driver License', width: 130, visible: false, sticky: 'none', draggable: true },
        { id: 'actions', name: 'Actions', width: 120, visible: true, sticky: 'right', draggable: false },
    ]);

    const itemsPerPage = 10;
    const visibleColumns = useMemo(() => columns.filter(col => col.visible), [columns]);
    const tableWidth = useMemo(() => visibleColumns.reduce((total, col) => total + col.width, 0), [visibleColumns]);
    const totalPages = Math.ceil(leads.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedLeads = leads.slice(startIndex, startIndex + itemsPerPage);

    // Calculate left positions for sticky columns
    const getLeftPosition = (columnId: string) => {
        const columnIndex = visibleColumns.findIndex(col => col.id === columnId);
        if (columnIndex === -1) return 0;

        let leftPosition = 0;
        for (let i = 0; i < columnIndex; i++) {
            const col = visibleColumns[i];
            if (col.sticky === 'left') {
                leftPosition += col.width;
            } else {
                break;
            }
        }
        return leftPosition;
    };

    // Calculate right positions for sticky columns
    const getRightPosition = (columnId: string) => {
        const columnIndex = visibleColumns.findIndex(col => col.id === columnId);
        if (columnIndex === -1) return 0;

        let rightPosition = 0;
        for (let i = visibleColumns.length - 1; i > columnIndex; i--) {
            const col = visibleColumns[i];
            if (col.sticky === 'right') {
                rightPosition += col.width;
            } else {
                break;
            }
        }
        return rightPosition;
    };

    const handleSelectLead = (leadId: string) => {
        const newSelected = new Set(selectedLeads);
        if (newSelected.has(leadId)) {
            newSelected.delete(leadId);
        } else {
            newSelected.add(leadId);
        }
        setSelectedLeads(newSelected);
    };

    const handleSelectAll = () => {
        if (selectedLeads.size === paginatedLeads.length && paginatedLeads.length > 0) {
            // If all current page leads are selected, deselect all
            setSelectedLeads(new Set());
        } else {
            // Select all leads in current page
            setSelectedLeads(new Set(paginatedLeads.map(lead => lead.id)));
        }
    };

    const isAllSelected = paginatedLeads.length > 0 && selectedLeads.size === paginatedLeads.length;
    const isIndeterminate = selectedLeads.size > 0 && selectedLeads.size < paginatedLeads.length;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setOpenDropdown(null);
        };

        if (openDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [openDropdown]);

    // Handle scroll to show/hide right shadow
    useEffect(() => {
        const handleScroll = (e: Event) => {
            const container = e.target as HTMLElement;
            const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
            setShowRightShadow(!isAtEnd);
        };

        const container = tableContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            // Check initial state
            const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
            setShowRightShadow(!isAtEnd);

            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const renderCellContent = (column: Column, lead: Lead) => {
        switch (column.id) {
            case 'selection':
                return (
                    <div className="flex justify-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedLeads.has(lead.id)}
                            onChange={() => handleSelectLead(lead.id)}
                        />
                    </div>
                );
            case 'lead':
                return (
                    <div className="flex items-center space-x-3">
                        {generateAvatar(lead.name, lead.id)}
                        <div className="min-w-0 flex-1">
                            <button
                                onClick={() => onViewLead(lead)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer hover:underline text-left truncate block w-full"
                            >
                                {lead.name}
                            </button>
                            <div className="text-sm text-gray-500 truncate">{lead.email}</div>
                        </div>
                    </div>
                );
            case 'leadId':
                return lead.id;
            case 'stage':
                return (
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(lead.stage)}`}>
                        {lead.stage}
                    </span>
                );
            case 'source':
                return lead.source;
            case 'status':
                return (
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                    </span>
                );
            case 'cellphone':
                return lead.phone;
            case 'state':
                return lead.state || '-';
            case 'leadType':
                return lead.leadType;
            case 'contactName':
                return lead.name;
            case 'workPhone':
                return lead.workPhone || '-';
            case 'agent':
                return lead.agent || '-';
            case 'owner':
                return lead.owner;
            case 'actions':
                return (
                    <div className="flex items-center justify-center space-x-2 relative">
                        <button
                            onClick={() => onViewLead(lead)}
                            className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50 transition-colors"
                            title="View Details"
                        >
                            <HiOutlineClipboardDocumentList className="h-4 w-4" />
                        </button>
                        <div className="relative">
                            <button
                                ref={dropdownRef}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setDropdownPosition({
                                        top: rect.bottom + window.scrollY + 4,
                                        left: rect.right - 128 + window.scrollX
                                    });
                                    setOpenDropdown(openDropdown === lead.id ? null : lead.id);
                                }}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
                                title="More Actions"
                                data-dropdown-trigger={lead.id}
                            >
                                <EllipsisVerticalIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                );
            default:
                return '-';
        }
    };

    return (
        <div className="bg-white shadow-sm rounded-lg relative">
            <div className="relative">
                <div className="overflow-x-auto relative" ref={tableContainerRef}>
                    {/* Shadow indicator for scrollable content on the right */}
                    {showRightShadow && (
                        <div className="absolute top-0 right-30 bottom-0 w-8 bg-gradient-to-l from-gray-200 to-transparent opacity-50 pointer-events-none z-20"></div>
                    )}
                    <table className="w-full divide-y divide-gray-200 table-fixed" style={{ minWidth: `${tableWidth}px` }}>
                        <thead className="bg-gray-50">
                            <tr>
                                {visibleColumns.map((column) => {
                                    const stickyStyle = column.sticky === 'left'
                                        ? { left: `${getLeftPosition(column.id)}px` }
                                        : column.sticky === 'right'
                                            ? { right: '0px' }
                                            : {};

                                    return (
                                        <th
                                            key={column.id}
                                            className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left ${
                                                // Border phải cho sticky left columns
                                                column.sticky === 'left'
                                                    ? 'border-r border-gray-200'
                                                    : ''
                                                } ${
                                                // Border trái cho sticky right columns (actions)
                                                column.sticky === 'right'
                                                    ? 'border-l border-gray-200'
                                                    : ''
                                                } ${column.sticky === 'left'
                                                    ? 'sticky z-10 bg-gray-50'
                                                    : column.sticky === 'right'
                                                        ? 'sticky z-20 bg-gray-50'
                                                        : ''
                                                }`}
                                            style={{
                                                width: `${column.width}px`,
                                                minWidth: `${column.width}px`,
                                                ...stickyStyle
                                            }}
                                        >
                                            {column.id === 'selection' ? (
                                                <div className="flex justify-center">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                        checked={isAllSelected}
                                                        ref={(el) => {
                                                            if (el) el.indeterminate = isIndeterminate;
                                                        }}
                                                        onChange={handleSelectAll}
                                                    />
                                                </div>
                                            ) : (
                                                column.name
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {paginatedLeads.map((lead, index) => (
                                <tr
                                    key={lead.id}
                                    className={`group transition-all duration-200 border-l-4 border-l-transparent hover:border-l-blue-500 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        }`}
                                >
                                    {visibleColumns.map((column) => {
                                        const stickyStyle = column.sticky === 'left'
                                            ? { left: `${getLeftPosition(column.id)}px` }
                                            : column.sticky === 'right'
                                                ? { right: '0px' }
                                                : {};

                                        return (
                                            <td
                                                key={column.id}
                                                className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                                                    // Border phải cho sticky left columns
                                                    column.sticky === 'left'
                                                        ? 'border-r border-gray-200'
                                                        : ''
                                                    } ${
                                                    // Border trái cho sticky right columns (actions)
                                                    column.sticky === 'right'
                                                        ? 'border-l border-gray-200'
                                                        : ''
                                                    } ${column.sticky !== 'none'
                                                        ? `sticky z-10 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                        }`
                                                        : ''
                                                    }`}
                                                style={{
                                                    width: `${column.width}px`,
                                                    minWidth: `${column.width}px`,
                                                    ...stickyStyle
                                                }}
                                            >
                                                {renderCellContent(column, lead)}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, leads.length)} of {leads.length} leads
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            const page = i + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 text-sm rounded-md ${page === currentPage
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <CustomizeColumnsPanel
                isOpen={isCustomizePanelOpen}
                onClose={onCustomizePanelClose}
                columns={columns}
                onColumnsChange={setColumns}
            />

            {/* Dropdown Menu - Rendered outside table to avoid overflow issues */}
            {openDropdown && (
                <div
                    className="fixed w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    style={{
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => {
                            console.log('Edit lead:', openDropdown);
                            setOpenDropdown(null);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 rounded-t-md"
                    >
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={() => {
                            console.log('Hide lead:', openDropdown);
                            setOpenDropdown(null);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 rounded-b-md"
                    >
                        <span>Hide</span>
                    </button>
                </div>
            )}
        </div>
    );
}