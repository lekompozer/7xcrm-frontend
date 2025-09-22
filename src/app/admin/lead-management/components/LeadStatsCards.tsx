import { ArrowUpIcon, ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useRef, useState, useEffect } from 'react';

interface LeadStat {
    id: string;
    name: string;
    count: number;
    color: string;
    previousCount: number;
    period: string;
}

interface LeadStatsCardsProps {
    stats: LeadStat[];
    selectedStat: string | null;
    onStatSelect: (statId: string | null) => void;
    timePeriod: string;
    onTimePeriodChange: (period: string) => void;
}

export default function LeadStatsCards({
    stats,
    selectedStat,
    onStatSelect,
    timePeriod,
    onTimePeriodChange
}: LeadStatsCardsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Check scroll position to show/hide arrows
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const canLeft = scrollLeft > 0;
            const canRight = scrollLeft < scrollWidth - clientWidth - 1;

            // Debug logging
            console.log('Scroll Check:', {
                scrollLeft,
                scrollWidth,
                clientWidth,
                canLeft,
                canRight,
                difference: scrollWidth - clientWidth
            });

            setCanScrollLeft(canLeft);
            setCanScrollRight(canRight);
        }
    };

    // Handle scroll left
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -270, behavior: 'smooth' });
        }
    };

    // Handle scroll right
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 270, behavior: 'smooth' });
        }
    };

    // Check scroll position on mount and when stats change
    useEffect(() => {
        // Use setTimeout to ensure DOM is fully rendered
        const timer = setTimeout(() => {
            checkScrollPosition();
        }, 100);

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            // Also trigger on resize
            window.addEventListener('resize', checkScrollPosition);
            return () => {
                container.removeEventListener('scroll', checkScrollPosition);
                window.removeEventListener('resize', checkScrollPosition);
                clearTimeout(timer);
            };
        }

        return () => clearTimeout(timer);
    }, [stats]);

    const calculateRatio = (current: number, previous: number) => {
        if (previous === 0) return { percentage: 0, isIncrease: true };
        const percentage = ((current - previous) / previous) * 100;
        return {
            percentage: Math.abs(percentage),
            isIncrease: percentage >= 0
        };
    };

    // Define background colors for selected state - matching LeadTable stage colors
    const getSelectedBackgroundClass = (statId: string) => {
        switch (statId) {
            case 'total':
                return 'bg-blue-500';
            case 'new':
                return 'bg-[#1E93AB]'; // MA-1 blue to match stage color
            case 'contacted':
                return 'bg-yellow-500';
            case 'consulted':
                return 'bg-orange-500';
            case 'quote':
                return 'bg-purple-500';
            case 'closed':
                return 'bg-green-500';
            case 'lost':
                return 'bg-red-500';
            default:
                return 'bg-blue-500';
        }
    };

    return (
        <div className="relative mb-6">
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
                    const isSelected = selectedStat === stat.id;

                    return (
                        <div
                            key={stat.id}
                            onClick={() => onStatSelect(selectedStat === stat.id ? null : stat.id)}
                            className={`relative rounded-lg shadow cursor-pointer transition-all duration-200 hover:shadow-lg border-2 overflow-hidden flex-shrink-0 ${isSelected
                                ? `${getSelectedBackgroundClass(stat.id)} border-transparent`
                                : 'bg-white border-transparent hover:border-gray-200'
                                }`}
                            style={{ width: '240px', height: '114px', padding: '24px' }}
                        >
                            {/* Time Period Selector only for Total - positioned at top right */}
                            {stat.id === 'total' && (
                                <div className="absolute top-5 right-3">
                                    <div className="relative">
                                        <select
                                            value={timePeriod}
                                            onChange={(e) => onTimePeriodChange(e.target.value)}
                                            className={`text-xs px-2 py-1 rounded border appearance-none pr-6 ${isSelected
                                                ? 'bg-white/20 text-white backdrop-blur-sm border-white/30'
                                                : 'bg-gray-50 text-gray-700'
                                                }`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <option value="this month">This Month</option>
                                            <option value="this week">This Week</option>
                                            <option value="this year">This Year</option>
                                            <option value="all time">All Time</option>
                                        </select>
                                        <ChevronDownIcon className={`absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none ${isSelected ? 'text-white' : 'text-gray-400'
                                            }`} />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col h-full">
                                <h3 className={`text-sm font-medium mb-2 ${isSelected ? 'text-white' : 'text-gray-600'
                                    }`}>
                                    {stat.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className={`text-3xl font-bold ${isSelected ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        {stat.count.toLocaleString()}
                                    </span>
                                    {/* Only show percentage change if not All Time */}
                                    {timePeriod !== 'all time' && (
                                        <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-md ${isSelected
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
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
