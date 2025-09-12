import { ArrowUpIcon, ArrowDownIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useRef, useState, useEffect } from 'react';

interface SubscriptionStat {
    id: string;
    name: string;
    count: number;
    color: string;
    previousCount: number;
    period: string; // e.g., "this month", "this week", "this year"
}

interface SubscriptionStatsCardsProps {
    stats: SubscriptionStat[];
    selectedStat: string;
    onStatClick: (statId: string) => void;
    timePeriod: string;
    onTimePeriodChange: (period: string) => void;
}

export default function SubscriptionStatsCards({
    stats,
    selectedStat,
    onStatClick,
    timePeriod,
    onTimePeriodChange
}: SubscriptionStatsCardsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Check scroll position to show/hide arrows
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    // Handle scroll left
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
        }
    };

    // Handle scroll right
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
        }
    };

    // Check scroll position on mount and when stats change
    useEffect(() => {
        checkScrollPosition();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, [stats]);
    const calculateRatio = (current: number, previous: number) => {
        if (previous === 0) return { percentage: 0, isIncrease: true };
        const percentage = ((current - previous) / previous) * 100;
        return {
            percentage: Math.abs(percentage),
            isIncrease: percentage >= 0
        };
    };

    const getPeriodComparison = (period: string) => {
        switch (period) {
            case 'this month':
                return 'vs last month';
            case 'this week':
                return 'vs last week';
            case 'this year':
                return 'vs last year';
            case 'all time':
                return 'vs previous period';
            default:
                return 'vs previous period';
        }
    };

    // Define background colors for selected state
    const getSelectedBackgroundClass = (statId: string) => {
        switch (statId) {
            case 'total':
                return 'bg-blue-500';
            case 'trial':
                return 'bg-trial-custom'; // Custom #fcc82b color
            case 'basic':
                return 'bg-green-500';
            case 'pro':
                return 'bg-purple-500';
            case 'enterprise':
                return 'bg-orange-500';
            case 'cancelled':
                return 'bg-red-500';
            default:
                return 'bg-blue-500';
        }
    };

    return (
        <div className="relative mb-8">
            {/* Left scroll arrow */}
            <button
                onClick={scrollLeft}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-200 transition-opacity duration-200 ${canScrollLeft ? 'opacity-100 hover:bg-gray-50' : 'opacity-0 pointer-events-none'
                    }`}
                style={{ transform: 'translateY(-50%) translateX(-50%)' }}
            >
                <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>

            {/* Right scroll arrow */}
            <button
                onClick={scrollRight}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-200 transition-opacity duration-200 ${canScrollRight ? 'opacity-100 hover:bg-gray-50' : 'opacity-0 pointer-events-none'
                    }`}
                style={{ transform: 'translateY(-50%) translateX(50%)' }}
            >
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>

            {/* Scrollable container */}
            <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto stats-scroll-container"
                onScroll={checkScrollPosition}
            >
                {stats.map((stat) => {
                    const ratio = calculateRatio(stat.count, stat.previousCount);
                    const periodComparison = getPeriodComparison(stat.period);

                    return (
                        <div
                            key={stat.id}
                            onClick={() => onStatClick(stat.id)}
                            className={`relative rounded-lg shadow cursor-pointer transition-all duration-200 hover:shadow-lg border-2 overflow-hidden flex-shrink-0 ${selectedStat === stat.id
                                ? `${getSelectedBackgroundClass(stat.id)} border-transparent`
                                : 'bg-white border-transparent hover:border-gray-200'
                                }`}
                            style={{ width: '240px', height: '144px', padding: '24px' }}
                        >
                            {/* Time Period Selector only for Total - positioned at top right */}
                            {stat.id === 'total' && (
                                <div className="absolute top-5 right-4">
                                    <div className="relative">
                                        <select
                                            value={timePeriod}
                                            onChange={(e) => {
                                                e.stopPropagation(); // Prevent card click
                                                onTimePeriodChange(e.target.value);
                                            }}
                                            className={`appearance-none border border-gray-200 rounded-md pl-2 pr-6 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${selectedStat === stat.id
                                                ? 'bg-white/20 text-white backdrop-blur-sm border-white/30'
                                                : 'bg-gray-50 text-gray-700'
                                                }`}
                                        >
                                            <option value="this week">This Week</option>
                                            <option value="this month">This Month</option>
                                            <option value="this year">This Year</option>
                                            <option value="all time">All Time</option>
                                        </select>
                                        <ChevronDownIcon className={`absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none ${selectedStat === stat.id ? 'text-white' : 'text-gray-400'
                                            }`} />
                                    </div>
                                </div>
                            )}

                            <div className="mb-4">
                                <p className={`text-sm font-medium mb-1 ${selectedStat === stat.id ? 'text-white' : 'text-gray-600'}`}>
                                    {stat.name}
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className={`text-3xl font-bold ${selectedStat === stat.id ? 'text-white' : 'text-gray-900'}`}>
                                        {stat.count.toLocaleString()}
                                    </p>
                                    <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-md ${selectedStat === stat.id
                                        ? 'bg-white/20 backdrop-blur-sm text-white'
                                        : ratio.isIncrease ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {ratio.isIncrease ? (
                                            <ArrowUpIcon className="h-4 w-4 mr-1" />
                                        ) : (
                                            <ArrowDownIcon className="h-4 w-4 mr-1" />
                                        )}
                                        {ratio.percentage.toFixed(1)}%
                                    </div>
                                </div>
                                {/* Only show comparison text if not All Time */}
                                {stat.period !== 'all time' && (
                                    <p className={`text-sm mt-3 ${selectedStat === stat.id ? 'text-white/80' : 'text-gray-500'}`}>
                                        {periodComparison}: {stat.previousCount.toLocaleString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
