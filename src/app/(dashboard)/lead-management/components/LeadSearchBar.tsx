import { MagnifyingGlassIcon, FunnelIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface LeadSearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onFilterToggle: () => void;
}

export default function LeadSearchBar({
    searchTerm,
    onSearchChange,
    onFilterToggle
}: LeadSearchBarProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            {/* Filter Dropdowns Only */}
            <div className="flex items-center gap-3">
                {/* Dropdown Container - Takes full width and distributes evenly */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {/* Owner Dropdown */}
                    <div className="relative">
                        <select className="px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white w-full">
                            <option value="">All Owners</option>
                            <option value="John Smith">John Smith</option>
                            <option value="Sarah Johnson">Sarah Johnson</option>
                            <option value="Mike Chen">Mike Chen</option>
                            <option value="Emily Davis">Emily Davis</option>
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Lead Type Dropdown */}
                    <div className="relative">
                        <select className="px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white w-full">
                            <option value="">Lead Type</option>
                            <option value="Individual">Individual</option>
                            <option value="Business">Business</option>
                            <option value="Partner">Partner</option>
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Stage Dropdown */}
                    <div className="relative">
                        <select className="px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white w-full">
                            <option value="">Stage</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Consulted">Consulted</option>
                            <option value="Quote">Quote</option>
                            <option value="Closed">Closed</option>
                            <option value="Lost">Lost</option>
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Status Dropdown */}
                    <div className="relative">
                        <select className="px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white w-full">
                            <option value="">Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Converted">Converted</option>
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Source Dropdown */}
                    <div className="relative">
                        <select className="px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white w-full">
                            <option value="">Source</option>
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

                {/* Divider */}
                <div className="h-8 w-px bg-gray-300"></div>

                {/* Filter Button - Fixed position */}
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
