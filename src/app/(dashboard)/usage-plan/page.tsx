'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { UserIcon, CreditCardIcon, DocumentTextIcon, ClockIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon, EnvelopeIcon, PhoneIcon, UserGroupIcon, Cog6ToothIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

export default function UsagePlanPage() {
    const [activeTab, setActiveTab] = useState('account-usage');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const tabs = useMemo(() => [
        { id: 'account-usage', name: 'Account Usage', icon: ClockIcon },
        { id: 'upgrade-plan', name: 'Upgrade Subscription Plan', icon: ArrowUpIcon },
        { id: 'marketing-assistant', name: 'Marketing Assistant', icon: ChatBubbleLeftRightIcon },
        { id: 'payment-method', name: 'Payment Method', icon: CreditCardIcon },
        { id: 'billing-info', name: 'Billing Information', icon: DocumentTextIcon },
        { id: 'billing-history', name: 'Billing History', icon: ClockIcon },
        { id: 'support', name: 'Support', icon: ShieldCheckIcon },
    ], []);

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
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    // Handle scroll right
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    // Check scroll position on mount and when tabs change
    useEffect(() => {
        checkScrollPosition();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, [tabs]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'account-usage':
                return <AccountUsageTab />;
            case 'upgrade-plan':
                return <UpgradePlanTab />;
            case 'marketing-assistant':
                return <MarketingAssistantTab />;
            case 'payment-method':
                return <PaymentMethodTab />;
            case 'billing-info':
                return <BillingInfoTab />;
            case 'billing-history':
                return <BillingHistoryTab />;
            case 'support':
                return <SupportTab />;
            default:
                return <AccountUsageTab />;
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Usage & Plan</h1>
                <p className="text-gray-600 mt-2">Monitor your usage and manage your subscription</p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                <div className="border-b border-gray-200">
                    <div className="relative">
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

                        {/* Scrollable tabs container */}
                        <nav
                            ref={scrollContainerRef}
                            className="-mb-px flex overflow-x-auto stats-scroll-container"
                            onScroll={checkScrollPosition}
                        >
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 flex-shrink-0 ${activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{tab.name}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}

// Account Usage Tab Component
function AccountUsageTab() {
    const usageStats = [
        {
            label: 'Total Email Sent',
            value: '2,725',
            limit: '10,000',
            percentage: 25.7,
            icon: EnvelopeIcon,
            color: 'blue'
        },
        {
            label: 'Total SMS Sent',
            value: '680',
            limit: '1,000',
            percentage: 68.0,
            icon: ChatBubbleOvalLeftEllipsisIcon,
            color: 'green'
        },
        {
            label: 'Total Leads Management',
            value: '1,256',
            limit: '5,000',
            percentage: 25.1,
            icon: UserGroupIcon,
            color: 'purple'
        },
        {
            label: 'Total Accounts using your CRM Workspace',
            value: '1',
            limit: '5',
            percentage: 20.0,
            icon: UserIcon,
            color: 'indigo'
        },
        {
            label: 'Total Pipeline Automation',
            value: '1',
            limit: '5',
            percentage: 20.0,
            icon: Cog6ToothIcon,
            color: 'orange'
        },
        {
            label: 'Total Call Minutes',
            value: '34',
            limit: '100',
            percentage: 34.0,
            icon: PhoneIcon,
            color: 'pink'
        }
    ];

    const callStats = [
        {
            label: 'Total Outbound Call Minutes',
            value: '22',
            percentage: 64.7,
            color: 'emerald'
        },
        {
            label: 'Total Inbound Call Minutes',
            value: '12',
            percentage: 35.3,
            color: 'teal'
        }
    ];

    const userInfo = {
        name: 'John Doe',
        email: 'john.doe@company.com',
        trialDaysLeft: 12
    };

    const getColorClasses = (color: string) => {
        const colorMap = {
            blue: 'bg-blue-50 border-blue-200',
            green: 'bg-green-50 border-green-200',
            purple: 'bg-purple-50 border-purple-200',
            indigo: 'bg-indigo-50 border-indigo-200',
            orange: 'bg-orange-50 border-orange-200',
            pink: 'bg-pink-50 border-pink-200',
            emerald: 'bg-emerald-50 border-emerald-200',
            teal: 'bg-teal-50 border-teal-200'
        };
        return colorMap[color as keyof typeof colorMap] || 'bg-gray-50 border-gray-200';
    };

    const getProgressColor = (color: string) => {
        const progressMap = {
            blue: 'bg-blue-600',
            green: 'bg-green-600',
            purple: 'bg-purple-600',
            indigo: 'bg-indigo-600',
            orange: 'bg-orange-600',
            pink: 'bg-pink-600',
            emerald: 'bg-emerald-600',
            teal: 'bg-teal-600'
        };
        return progressMap[color as keyof typeof progressMap] || 'bg-gray-600';
    };

    const getIconColor = (color: string) => {
        const iconMap = {
            blue: 'text-blue-600',
            green: 'text-green-600',
            purple: 'text-purple-600',
            indigo: 'text-indigo-600',
            orange: 'text-orange-600',
            pink: 'text-pink-600',
            emerald: 'text-emerald-600',
            teal: 'text-teal-600'
        };
        return iconMap[color as keyof typeof iconMap] || 'text-gray-600';
    };

    return (
        <div>
            {/* User Info Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                        <div className="flex items-center space-x-3">
                            <h2 className="text-xl font-semibold text-gray-900">{userInfo.name}</h2>
                            <span className="text-lg font-medium text-gray-900">- Standard</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                Trial
                            </span>
                        </div>
                        <p className="text-gray-600">{userInfo.email}</p>
                        <p className="text-sm text-gray-600">{userInfo.trialDaysLeft} days left in trial</p>
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-6">Current Usage Overview</h3>

            {/* Main Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {usageStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className={`border rounded-lg p-6 ${getColorClasses(stat.color)}`}>
                            <div className="flex items-center justify-between mb-4">
                                <Icon className={`h-8 w-8 ${getIconColor(stat.color)}`} />
                                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                            </div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">{stat.label}</h4>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-gray-600">Usage</span>
                                <span className="text-xs text-gray-600">{stat.value} / {stat.limit}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(stat.color)}`}
                                    style={{ width: `${Math.min(stat.percentage, 100)}%` }}
                                ></div>
                            </div>
                            <div className="text-xs text-gray-500">{stat.percentage}% used</div>
                        </div>
                    );
                })}
            </div>

            {/* Call Minutes Breakdown */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                    <PhoneIcon className="h-6 w-6 text-gray-600 mr-2" />
                    Call Minutes Breakdown
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {callStats.map((stat, index) => (
                        <div key={index} className={`border rounded-lg p-4 ${getColorClasses(stat.color)}`}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-900">{stat.label}</span>
                                <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(stat.color)}`}
                                    style={{ width: `${stat.percentage}%` }}
                                ></div>
                            </div>
                            <div className="text-xs text-gray-500">{stat.percentage}% of total call time</div>
                        </div>
                    ))}
                </div>

                {/* Total Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Total Call Minutes Summary</span>
                        <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">34 minutes</div>
                            <div className="text-sm text-gray-600">34% of monthly limit (100 min)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}// Upgrade Plan Tab Component
function UpgradePlanTab() {
    const plans = [
        {
            name: 'Essential',
            price: '$29',
            period: 'per month',
            features: ['Up to 2,500 leads', '25,000 emails/month', '10 team members', '10 GB storage'],
            current: false
        },
        {
            name: 'Professional',
            price: '$59',
            period: 'per month',
            features: ['Up to 10,000 leads', '100,000 emails/month', '25 team members', '50 GB storage'],
            current: false,
            recommended: true
        },
        {
            name: 'Enterprise',
            price: '$119',
            period: 'per month',
            features: ['Unlimited leads', 'Unlimited emails', 'Unlimited team members', '200 GB storage'],
            current: false
        }
    ];

    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Upgrade Your Plan</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <div key={index} className={`border rounded-lg p-6 relative ${plan.recommended ? 'border-blue-500' : 'border-gray-200'}`}>
                        {plan.recommended && (
                            <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Recommended
                            </span>
                        )}
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h4>
                        <div className="mb-4">
                            <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                            <span className="text-gray-600 ml-1">{plan.period}</span>
                        </div>
                        <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-600">
                                    <ShieldCheckIcon className="h-4 w-4 text-green-500 mr-2" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className={`w-full py-2 px-4 rounded-md font-medium ${plan.recommended
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                            }`}>
                            Upgrade to {plan.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Marketing Assistant Tab Component
function MarketingAssistantTab() {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Marketing Assistant Services</h3>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <ChatBubbleLeftRightIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-900">Professional Marketing Support</h4>
                        <p className="text-gray-600">Get expert help with your marketing campaigns</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Campaign Creation</h5>
                        <p className="text-sm text-gray-600">Professional assistance in creating effective marketing campaigns</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Content Strategy</h5>
                        <p className="text-sm text-gray-600">Expert guidance on content creation and marketing strategy</p>
                    </div>
                </div>
                <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
                    Request Marketing Assistant
                </button>
            </div>
        </div>
    );
}

// Payment Method Tab Component
function PaymentMethodTab() {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Payment Methods</h3>
            <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <CreditCardIcon className="h-8 w-8 text-gray-400" />
                            <div>
                                <p className="font-medium text-gray-900">**** **** **** 4242</p>
                                <p className="text-sm text-gray-600">Expires 12/24</p>
                            </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Primary
                        </span>
                    </div>
                </div>
                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-gray-400 transition-colors">
                    + Add New Payment Method
                </button>
            </div>
        </div>
    );
}

// Billing Info Tab Component
function BillingInfoTab() {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Billing Information</h3>
            <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" value="Acme Corporation" readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" value="123-456-789" readOnly />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
                        <textarea className="w-full border border-gray-300 rounded-md px-3 py-2 rows-3" readOnly>
                            123 Business St
                            Suite 100
                            San Francisco, CA 94105
                        </textarea>
                    </div>
                </div>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Edit Billing Information
                </button>
            </div>
        </div>
    );
}

// Billing History Tab Component
function BillingHistoryTab() {
    const billingHistory = [
        { date: '2024-02-01', description: 'Professional Plan - Monthly', amount: '$59.00', status: 'Paid' },
        { date: '2024-01-01', description: 'Professional Plan - Monthly', amount: '$59.00', status: 'Paid' },
        { date: '2023-12-01', description: 'Essential Plan - Monthly', amount: '$29.00', status: 'Paid' },
    ];

    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Billing History</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {billingHistory.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button className="text-blue-600 hover:text-blue-900">Download Invoice</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Support Tab Component
function SupportTab() {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Support & Help</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">Contact Support</h4>
                    <p className="text-blue-700 mb-4">Get help from our support team</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Create Support Ticket
                    </button>
                </div>
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <h4 className="text-lg font-semibold text-green-900 mb-3">Knowledge Base</h4>
                    <p className="text-green-700 mb-4">Browse our help documentation</p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                        View Documentation
                    </button>
                </div>
            </div>
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Recent Support Tickets</h5>
                <p className="text-gray-600 text-sm">No recent support tickets</p>
            </div>
        </div>
    );
}
