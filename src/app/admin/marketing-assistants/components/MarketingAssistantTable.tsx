import { TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

interface MarketingAssistant {
    id: number;
    name: string;
    email: string;
    specialization: string;
    status: 'Active' | 'Inactive';
    customerCount: number;
    joinedDate: string;
    phoneNumber: string;
}

interface MarketingAssistantTableProps {
    assistants: MarketingAssistant[];
    onDeleteAssistant: (id: number) => void;
    onToggleStatus: (id: number) => void;
    onViewAssistant: (assistant: MarketingAssistant) => void;
}

export default function MarketingAssistantTable({
    assistants,
    onDeleteAssistant,
    onToggleStatus,
    onViewAssistant
}: MarketingAssistantTableProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Inactive':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Assistant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Specialization
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customers Managed
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Joined Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {assistants.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                No assistants found matching your criteria.
                            </td>
                        </tr>
                    ) : (
                        assistants.map((assistant) => (
                            <tr key={assistant.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                                <span className="text-sm font-medium text-white">
                                                    {assistant.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-blue-600 hover:text-blue-900 hover:underline cursor-pointer"
                                                onClick={() => onViewAssistant(assistant)}>
                                                {assistant.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {assistant.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{assistant.specialization}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => onToggleStatus(assistant.id)}
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 ${getStatusColor(assistant.status)}`}
                                    >
                                        {assistant.status}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium text-gray-900">
                                            {assistant.customerCount}
                                        </span>
                                        <span className="text-sm text-gray-500 ml-1">customers</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {formatDate(assistant.joinedDate)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {assistant.phoneNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => onViewAssistant(assistant)}
                                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                            title="View Details"
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onDeleteAssistant(assistant.id)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded"
                                            title="Delete Assistant"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
