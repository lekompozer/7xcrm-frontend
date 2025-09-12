import { PlusIcon } from '@heroicons/react/24/outline';

interface Stat {
    name: string;
    value: number;
    color: string;
}

interface MarketingAssistantHeaderProps {
    onAddAssistant: () => void;
    stats: Stat[];
}

export default function MarketingAssistantHeader({
    onAddAssistant,
    stats
}: MarketingAssistantHeaderProps) {
    const getColorClasses = (color: string) => {
        switch (color) {
            case 'blue':
                return 'bg-blue-50 text-blue-700';
            case 'green':
                return 'bg-green-50 text-green-700';
            case 'red':
                return 'bg-red-50 text-red-700';
            case 'purple':
                return 'bg-purple-50 text-purple-700';
            default:
                return 'bg-gray-50 text-gray-700';
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Marketing Assistant</h1>
                    <p className="text-gray-600">Manage your marketing assistants and track their performance</p>
                </div>
                <button
                    onClick={onAddAssistant}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    Add Assistant
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className={`w-8 h-8 rounded-md ${getColorClasses(stat.color)} flex items-center justify-center`}>
                                    <span className="text-sm font-semibold">{stat.value}</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        {stat.name}
                                    </dt>
                                    <dd className="text-lg font-semibold text-gray-900">
                                        {stat.value.toLocaleString()}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
