'use client';

import { useState } from 'react';
import {
    UsersIcon,
    CreditCardIcon,
    SpeakerWaveIcon,
    ChartBarIcon,
    ClockIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';

interface HomeStat {
    id: string;
    name: string;
    count: number;
    icon: React.ComponentType<{ className?: string }>;
    previousCount: number;
    period: string;
}

const getHomeStats = (timePeriod: string): HomeStat[] => {
    const baseStats = {
        'this month': {
            totalUsers: { current: 1234, previous: 1102 },
            totalSubscriptions: { current: 856, previous: 789 },
            totalMarketingCustomers: { current: 234, previous: 198 },
            totalRevenue: { current: 45678, previous: 39456 }
        },
        'this week': {
            totalUsers: { current: 287, previous: 251 },
            totalSubscriptions: { current: 198, previous: 176 },
            totalMarketingCustomers: { current: 56, previous: 48 },
            totalRevenue: { current: 12340, previous: 10890 }
        },
        'this year': {
            totalUsers: { current: 12450, previous: 9876 },
            totalSubscriptions: { current: 8934, previous: 7123 },
            totalMarketingCustomers: { current: 2456, previous: 1987 },
            totalRevenue: { current: 567890, previous: 445670 }
        },
        'all time': {
            totalUsers: { current: 25678, previous: 23456 },
            totalSubscriptions: { current: 18945, previous: 17234 },
            totalMarketingCustomers: { current: 5678, previous: 5123 },
            totalRevenue: { current: 1234567, previous: 1098765 }
        }
    };

    const data = baseStats[timePeriod as keyof typeof baseStats] || baseStats['this month'];

    return [
        {
            id: 'total-users',
            name: 'Total Users',
            count: data.totalUsers.current,
            icon: UsersIcon,
            previousCount: data.totalUsers.previous,
            period: timePeriod
        },
        {
            id: 'total-subscriptions',
            name: 'Total Subscriptions',
            count: data.totalSubscriptions.current,
            icon: CreditCardIcon,
            previousCount: data.totalSubscriptions.previous,
            period: timePeriod
        },
        {
            id: 'total-marketing',
            name: 'Total Marketing Services Customers',
            count: data.totalMarketingCustomers.current,
            icon: SpeakerWaveIcon,
            previousCount: data.totalMarketingCustomers.previous,
            period: timePeriod
        },
        {
            id: 'total-revenue',
            name: 'Total Revenue',
            count: data.totalRevenue.current,
            icon: ChartBarIcon,
            previousCount: data.totalRevenue.previous,
            period: timePeriod
        }
    ];
};

// Sample data for history tables
const userTrialHistory = [
    {
        id: 1,
        name: 'Nguyễn Văn An',
        email: 'an.nguyen@email.com',
        package: 'Trial Account',
        registrationTime: '2024-01-15 14:30'
    },
    {
        id: 2,
        name: 'Trần Thị Bình',
        email: 'binh.tran@email.com',
        package: 'Trial Account',
        registrationTime: '2024-01-15 13:45'
    },
    {
        id: 3,
        name: 'Lê Minh Cường',
        email: 'cuong.le@email.com',
        package: 'Trial Account',
        registrationTime: '2024-01-15 12:20'
    },
    {
        id: 4,
        name: 'Phạm Thu Hương',
        email: 'huong.pham@email.com',
        package: 'Trial Account',
        registrationTime: '2024-01-15 11:15'
    },
    {
        id: 5,
        name: 'Võ Đức Khải',
        email: 'khai.vo@email.com',
        package: 'Trial Account',
        registrationTime: '2024-01-15 10:30'
    }
];

const expiredUsersHistory = [
    {
        id: 1,
        name: 'Đỗ Văn Tâm',
        email: 'tam.do@email.com',
        package: 'Trial Account',
        expirationTime: '2024-01-14 23:59'
    },
    {
        id: 2,
        name: 'Lại Thị Oanh',
        email: 'oanh.lai@email.com',
        package: 'Standard Package',
        expirationTime: '2024-01-13 18:30'
    },
    {
        id: 3,
        name: 'Cao Minh Đức',
        email: 'duc.cao@email.com',
        package: 'Trial Account',
        expirationTime: '2024-01-12 15:20'
    },
    {
        id: 4,
        name: 'Từ Thu Hà',
        email: 'ha.tu@email.com',
        package: 'Essential Package',
        expirationTime: '2024-01-11 09:45'
    },
    {
        id: 5,
        name: 'Hồ Văn Phước',
        email: 'phuoc.ho@email.com',
        package: 'Trial Account',
        expirationTime: '2024-01-10 14:15'
    }
];

const subscriptionHistory = [
    {
        id: 1,
        name: 'Hoàng Minh Tuấn',
        email: 'tuan.hoang@email.com',
        package: 'Professional Package',
        registrationTime: '2024-01-15 16:45'
    },
    {
        id: 2,
        name: 'Đặng Thị Mai',
        email: 'mai.dang@email.com',
        package: 'Standard Package',
        registrationTime: '2024-01-15 15:30'
    },
    {
        id: 3,
        name: 'Bùi Văn Hùng',
        email: 'hung.bui@email.com',
        package: 'Elite Package',
        registrationTime: '2024-01-15 14:20'
    },
    {
        id: 4,
        name: 'Ngô Thị Lan',
        email: 'lan.ngo@email.com',
        package: 'Essential Package',
        registrationTime: '2024-01-15 13:10'
    },
    {
        id: 5,
        name: 'Vũ Minh Đức',
        email: 'duc.vu@email.com',
        package: 'Professional Package',
        registrationTime: '2024-01-15 12:30'
    }
];

const marketingServiceHistory = [
    {
        id: 1,
        name: 'Châu Thị Yến',
        email: 'yen.chau@email.com',
        package: 'MA-1 — SevenX Launch & Enablement',
        registrationTime: '2024-01-15 17:20'
    },
    {
        id: 2,
        name: 'Lý Văn Thành',
        email: 'thanh.ly@email.com',
        package: 'MA-2 — Social, Fanpage & Website Management',
        registrationTime: '2024-01-15 16:10'
    },
    {
        id: 3,
        name: 'Đinh Thu Thảo',
        email: 'thao.dinh@email.com',
        package: 'MA-3 — Performance Ads (Lead Generations)',
        registrationTime: '2024-01-15 15:45'
    },
    {
        id: 4,
        name: 'Trương Minh Quân',
        email: 'quan.truong@email.com',
        package: 'MA-4 — Creative & Content Studio',
        registrationTime: '2024-01-15 14:30'
    },
    {
        id: 5,
        name: 'Phan Thị Hồng',
        email: 'hong.phan@email.com',
        package: 'MA-1 — SevenX Launch & Enablement',
        registrationTime: '2024-01-15 13:25'
    }
];

export default function HomePage() {
    const [timePeriod, setTimePeriod] = useState('this month');
    const [selectedStat, setSelectedStat] = useState('total-users');

    const stats = getHomeStats(timePeriod);

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

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatValue = (stat: HomeStat) => {
        if (stat.id === 'total-revenue') {
            return formatCurrency(stat.count);
        }
        return stat.count.toLocaleString();
    };

    const getSelectedBackgroundClass = (statId: string) => {
        switch (statId) {
            case 'total-users':
                return 'bg-blue-500';
            case 'total-subscriptions':
                return 'bg-green-500';
            case 'total-marketing':
                return 'bg-purple-500';
            case 'total-revenue':
                return 'bg-orange-500';
            default:
                return 'bg-blue-500';
        }
    };
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Welcome to 7x CRM Admin Dashboard. Here&apos;s what&apos;s happening with your business today.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => {
                        const ratio = calculateRatio(stat.count, stat.previousCount);
                        const periodComparison = getPeriodComparison(stat.period);

                        return (
                            <div
                                key={stat.id}
                                onClick={() => setSelectedStat(stat.id)}
                                className={`relative rounded-lg shadow cursor-pointer transition-all duration-200 hover:shadow-lg border-2 overflow-hidden w-full ${selectedStat === stat.id
                                    ? `${getSelectedBackgroundClass(stat.id)} border-transparent`
                                    : 'bg-white border-transparent hover:border-gray-200'
                                    }`}
                                style={{ height: '164px', padding: '24px' }}
                            >
                                {/* Time Period Selector only for Total Users - positioned at top right */}
                                {stat.id === 'total-users' && (
                                    <div className="absolute top-5 right-3">
                                        <div className="relative">
                                            <select
                                                value={timePeriod}
                                                onChange={(e) => setTimePeriod(e.target.value)}
                                                className={`text-xs px-2 py-1 rounded border appearance-none pr-6 ${selectedStat === stat.id
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
                                            <ChevronDownIcon className={`absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none ${selectedStat === stat.id ? 'text-white' : 'text-gray-400'
                                                }`} />
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col h-full">
                                    <h3 className={`text-sm font-medium mb-2 ${selectedStat === stat.id ? 'text-white' : 'text-gray-600'
                                        }`}>
                                        {stat.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-3xl font-bold ${selectedStat === stat.id ? 'text-white' : 'text-gray-900'
                                            }`}>
                                            {formatValue(stat)}
                                        </span>
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
                                        <p className={`text-sm mt-3 ${selectedStat === stat.id ? 'text-white/80' : 'text-gray-500'
                                            }`}>
                                            {periodComparison}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Latest History */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
                {/* User Trial History */}
                <div className="rounded-lg bg-white p-6 shadow min-w-[388px]">
                    <div className="flex items-center mb-4">
                        <UsersIcon className="h-6 w-6 text-blue-600 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">Latest User Trial</h3>
                    </div>
                    <div className="space-y-3">
                        {userTrialHistory.map((user) => (
                            <div key={user.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <UsersIcon className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    <p className="text-xs text-blue-600 font-medium">{user.package}</p>
                                </div>
                                <div className="flex items-center text-xs text-gray-400">
                                    <ClockIcon className="h-3 w-3 mr-1" />
                                    {user.registrationTime}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expired Users History */}
                <div className="rounded-lg bg-white p-6 shadow min-w-[388px]">
                    <div className="flex items-center mb-4">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">Latest Expired Users</h3>
                    </div>
                    <div className="space-y-3">
                        {expiredUsersHistory.map((user) => (
                            <div key={user.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                                    <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    <p className="text-xs text-red-600 font-medium">{user.package}</p>
                                </div>
                                <div className="flex items-center text-xs text-gray-400">
                                    <ClockIcon className="h-3 w-3 mr-1" />
                                    {user.expirationTime}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subscription Registration History */}
                <div className="rounded-lg bg-white p-6 shadow min-w-[388px]">
                    <div className="flex items-center mb-4">
                        <CreditCardIcon className="h-6 w-6 text-green-600 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">Subscriptions Register</h3>
                    </div>
                    <div className="space-y-3">
                        {subscriptionHistory.map((subscription) => (
                            <div key={subscription.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <CreditCardIcon className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{subscription.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{subscription.email}</p>
                                    <p className="text-xs text-green-600 font-medium">{subscription.package}</p>
                                </div>
                                <div className="flex items-center text-xs text-gray-400">
                                    <ClockIcon className="h-3 w-3 mr-1" />
                                    {subscription.registrationTime}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Marketing Service Registration History */}
                <div className="rounded-lg bg-white p-6 shadow min-w-[388px]">
                    <div className="flex items-center mb-4">
                        <SpeakerWaveIcon className="h-6 w-6 text-purple-600 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">Marketing Service Register</h3>
                    </div>
                    <div className="space-y-3">
                        {marketingServiceHistory.map((service) => (
                            <div key={service.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                    <SpeakerWaveIcon className="h-4 w-4 text-purple-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{service.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{service.email}</p>
                                    <p className="text-xs text-purple-600 font-medium">{service.package}</p>
                                </div>
                                <div className="flex items-center text-xs text-gray-400">
                                    <ClockIcon className="h-3 w-3 mr-1" />
                                    {service.registrationTime}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
