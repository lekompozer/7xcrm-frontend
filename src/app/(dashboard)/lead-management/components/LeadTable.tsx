import { useState } from 'react';
import {
    ChevronUpDownIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    EyeIcon,
    PhoneIcon,
    EnvelopeIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';
import { Lead } from '@/types/lead';

interface LeadTableProps {
    leads: Lead[];
    onViewLead: (lead: Lead) => void;
    onScheduleAppointment: (lead: Lead) => void;
}

type SortField = 'name' | 'stage' | 'value' | 'lastInteraction' | 'dateAdded';
type SortDirection = 'asc' | 'desc';

export default function LeadTable({ leads, onViewLead, onScheduleAppointment }: LeadTableProps) {
    const [sortField, setSortField] = useState<SortField>('dateAdded');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) {
            return <ChevronUpDownIcon className="h-4 w-4" />;
        }
        return sortDirection === 'asc' ?
            <ChevronUpIcon className="h-4 w-4" /> :
            <ChevronDownIcon className="h-4 w-4" />;
    };

    const sortedLeads = [...leads].sort((a, b) => {
        let aValue: string | number | undefined = a[sortField];
        let bValue: string | number | undefined = b[sortField];

        // Handle undefined values
        if (aValue === undefined) aValue = '';
        if (bValue === undefined) bValue = '';

        // Handle date sorting
        if (sortField === 'lastInteraction' || sortField === 'dateAdded') {
            aValue = new Date(aValue as string).getTime();
            bValue = new Date(bValue as string).getTime();
        }

        // Handle string sorting
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (sortDirection === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
    });

    const totalPages = Math.ceil(sortedLeads.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedLeads = sortedLeads.slice(startIndex, startIndex + itemsPerPage);

    const getStageColor = (stage: string) => {
        switch (stage) {
            case 'New': return 'bg-blue-100 text-blue-800';
            case 'Contacted': return 'bg-yellow-100 text-yellow-800';
            case 'Consulted': return 'bg-purple-100 text-purple-800';
            case 'Quote': return 'bg-orange-100 text-orange-800';
            case 'Closed': return 'bg-green-100 text-green-800';
            case 'Lost': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getTimeSince = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        return `${Math.floor(diffInDays / 30)} months ago`;
    };

    return (
        <div className="bg-white rounded-lg shadow">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('name')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Lead</span>
                                    {getSortIcon('name')}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('stage')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Stage</span>
                                    {getSortIcon('stage')}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('value')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Value</span>
                                    {getSortIcon('value')}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Owner
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('lastInteraction')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Last Contact</span>
                                    {getSortIcon('lastInteraction')}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('dateAdded')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Added</span>
                                    {getSortIcon('dateAdded')}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-medium">
                                                {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div
                                                className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                                                onClick={() => onViewLead(lead)}
                                            >
                                                {lead.name}
                                            </div>
                                            <div className="text-sm text-gray-500">{lead.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(lead.stage)}`}>
                                        {lead.stage}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {lead.value ? formatCurrency(lead.value) : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {lead.owner}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {lead.lastInteraction ? (
                                        <>
                                            <div>{formatDate(lead.lastInteraction)}</div>
                                            <div className="text-xs text-gray-400">{getTimeSince(lead.lastInteraction)}</div>
                                        </>
                                    ) : (
                                        <div className="text-gray-400">No contact</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(lead.dateAdded)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => onViewLead(lead)}
                                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                                            title="View Details"
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => window.open(`tel:${lead.phone}`, '_self')}
                                            className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                                            title="Call Lead"
                                        >
                                            <PhoneIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => window.open(`mailto:${lead.email}`, '_self')}
                                            className="text-purple-600 hover:text-purple-900 p-1 hover:bg-purple-50 rounded"
                                            title="Send Email"
                                        >
                                            <EnvelopeIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onScheduleAppointment(lead)}
                                            className="text-orange-600 hover:text-orange-900 p-1 hover:bg-orange-50 rounded"
                                            title="Schedule Appointment"
                                        >
                                            <CalendarIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                    <div className="flex-1 flex justify-between items-center">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(startIndex + itemsPerPage, leads.length)}</span> of{' '}
                            <span className="font-medium">{leads.length}</span> results
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {/* Page Numbers */}
                            <div className="flex space-x-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNumber;
                                    if (totalPages <= 5) {
                                        pageNumber = i + 1;
                                    } else {
                                        if (currentPage <= 3) {
                                            pageNumber = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNumber = totalPages - 4 + i;
                                        } else {
                                            pageNumber = currentPage - 2 + i;
                                        }
                                    }

                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => setCurrentPage(pageNumber)}
                                            className={`px-3 py-1 text-sm border rounded-md ${currentPage === pageNumber
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
