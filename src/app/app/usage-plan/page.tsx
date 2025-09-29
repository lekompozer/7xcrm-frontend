'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { UserIcon, CreditCardIcon, DocumentTextIcon, ClockIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon, EnvelopeIcon, PhoneIcon, UserGroupIcon, Cog6ToothIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../../contexts/LanguageContext';

// Language content
const tabNames = {
    'account-usage': { en: 'Account Usage', vi: 'Sử Dụng Tài Khoản' },
    'upgrade-plan': { en: 'Upgrade Subscription Plan', vi: 'Nâng Cấp Gói Dịch Vụ' },
    'marketing-assistant': { en: 'Marketing Service', vi: 'Dịch Vụ Marketing' },
    'payment-method': { en: 'Payment Method', vi: 'Phương Thức Thanh Toán' },
    'billing-info': { en: 'Billing Information', vi: 'Thông Tin Thanh Toán' },
    'billing-history': { en: 'Billing History', vi: 'Lịch Sử Thanh Toán' },
    'support': { en: 'Support', vi: 'Hỗ Trợ' }
};

// Marketing Service content definitions
const titleContent = {
    en: "Ready to upgrade your Marketing?",
    vi: "Sẵn sàng nâng cấp Marketing của bạn?"
};

const subtitleContent = {
    en: "Start a conversation with Marketing Assistant and discover how we can help you achieve your marketing goals.",
    vi: "Bắt đầu cuộc trò chuyện với Marketing Assistant và khám phá cách chúng tôi có thể giúp bạn đạt được mục tiêu marketing."
};

const whyChooseTitleContent = {
    en: "Why Choose Marketing Services from 7xCRM",
    vi: "Tại Sao Nên Chọn Marketing Services từ 7xCRM"
};

const packagesTitleContent = {
    en: "Marketing Service Packages",
    vi: "Các Gói Marketing Service"
};

const modalTitleContent = {
    en: "Registration Successful!",
    vi: "Đăng Ký Thành Công!"
};

const modalMessageContent = {
    en: "Thank you for registering for",
    vi: "Cảm ơn bạn đã đăng ký gói"
};

const modalDescriptionContent = {
    en: "The 7x CRM Marketing Assistant team will contact you as soon as possible.",
    vi: "Đội ngũ Marketing Assistant của 7x CRM sẽ liên hệ lại với bạn trong thời gian sớm nhất."
};

const modalButtonContent = {
    en: "Go to Conversations",
    vi: "Chuyển đến Conversations"
};

const startButtonContent = {
    en: "Get Started",
    vi: "Bắt Đầu Ngay"
};

const whyChooseItems = [
    {
        title: {
            en: "Focus on selling, leave marketing to experts.",
            vi: "Tập trung bán hàng, giao marketing cho chuyên gia."
        },
        description: {
            en: "Maximize your revenue-generating time and double productivity.",
            vi: "Tối ưu thời gian kiếm tiền, tăng gấp đôi hiệu suất làm việc."
        },
        icon: "🚀"
    },
    {
        title: {
            en: "Professional branding at minimal cost.",
            vi: "Chuyên nghiệp hóa hình ảnh với chi phí cực thấp."
        },
        description: {
            en: "Get a full-scale marketing strategy like having an in-house team.",
            vi: "Sở hữu chiến lược marketing bài bản ngang một đội ngũ."
        },
        icon: "💼"
    },
    {
        title: {
            en: "CRM + Marketing: All-in-one power.",
            vi: "CRM + Marketing: All-in-one siêu hiệu quả."
        },
        description: {
            en: "Seamless lead capture and customer care on a single platform.",
            vi: "Lead tự động đổ về, chăm sóc khách hàng liền mạch một nền tảng."
        },
        icon: "⚡"
    },
    {
        title: {
            en: "Data-driven results, clear ROI.",
            vi: "Kết quả đo lường được, ROI rõ ràng."
        },
        description: {
            en: "Optimize your budget to focus on channels that drive real customers.",
            vi: "Tối ưa ngân sách tập trung vào kênh mang về khách hàng thật."
        },
        icon: "📊"
    }
];

// Individual services data
const individualServices = [
    {
        id: 'setup-account',
        name: {
            en: 'Account Setup & Platform Integration (Facebook, Phone, Email...)',
            vi: 'Setup tài khoản & kết nối nền tảng (Facebook, Phone, Email...)'
        },
        price: 99
    },
    {
        id: 'content-scheduling',
        name: {
            en: 'Multi-platform Content Scheduling (Facebook Page/Profile, TikTok, YouTube Shorts)',
            vi: 'Lên lịch nội dung đa nền tảng (Facebook Page/Profile, TikTok,YouTube Shorts)'
        },
        price: 149
    },
    {
        id: 'ads-optimization',
        name: {
            en: 'Create & Optimize Ads (Meta/Insta/Threads/Google/TikTok/Native)',
            vi: 'Tạo & tối ưu quảng cáo (Meta/Insta/Threads/Google/TikTok/Native)'
        },
        price: 199
    },
    {
        id: 'website-funnel',
        name: {
            en: 'Website/Funnel Design & Build',
            vi: 'Website/Funnel Design & Build'
        },
        price: 299
    },
    {
        id: 'crm-messaging',
        name: {
            en: 'Messaging & Follow-up Customers on CRM',
            vi: 'Nhắn tin & Follow-up khách hàng trên crm'
        },
        price: 129
    },
    {
        id: 'email-sms-workflow',
        name: {
            en: 'Setup & Operate & Optimize Email/SMS Workflow',
            vi: 'Setup & Vận hành & tối ưu workflow email/SMS'
        },
        price: 179
    },
    {
        id: 'content-production',
        name: {
            en: 'Monthly Content Production',
            vi: 'Sản xuất nội dung hàng tháng'
        },
        price: 249
    },
    {
        id: 'conversion-campaigns',
        name: {
            en: 'Create & Optimize Conversion Campaigns (Email/SMS)',
            vi: 'Tạo & tối ưu chiến dịch chuyển đổi (Email/SMS)'
        },
        price: 159
    },
    {
        id: 'graphic-design',
        name: {
            en: 'Graphic Design (Brand & Ads)',
            vi: 'Graphic Design (Brand & Ads)'
        },
        price: 199
    },
    {
        id: 'ads-funnel',
        name: {
            en: 'Create Funnel for Ads',
            vi: 'Tạo Funnel phục vụ Ads'
        },
        price: 149
    },
    {
        id: 'video-editing',
        name: {
            en: 'Video/Motion Editing',
            vi: 'Edit Video/Motion'
        },
        price: 229
    },
    {
        id: 'comment-group-management',
        name: {
            en: 'Comment & Group Management',
            vi: 'Quản lý comment & group'
        },
        price: 119
    }
];

// Content for Custom Services section
const customServicesTitleContent = {
    en: "Build Your Custom Marketing Package",
    vi: "Xây Dựng Gói Marketing Tùy Chỉnh"
};

const customServicesSubtitleContent = {
    en: "Select individual services that match your specific needs",
    vi: "Chọn các dịch vụ riêng lẻ phù hợp với nhu cầu cụ thể của bạn"
};

const totalCostContent = {
    en: "Total Cost",
    vi: "Tổng Chi Phí"
};

const registerCustomContent = {
    en: "Register Custom Package",
    vi: "Đăng Ký Gói Tùy Chỉnh"
};

const marketingPackages = [
    {
        id: 'MA-1',
        name: {
            en: 'SevenX Launch & Enablement',
            vi: 'SevenX Launch & Enablement'
        },
        subtitle: {
            en: 'Marketing Contact',
            vi: 'Marketing Contact'
        },
        description: {
            en: 'Account setup & platform integration, email/SMS workflow operations',
            vi: 'Setup tài khoản & kết nối nền tảng, vận hành workflow email/SMS'
        },
        price: '$199',
        features: {
            en: [
                'Account setup & platform integration (Facebook, Phone, Email...)',
                'Setup & operate & optimize email/SMS workflows; multi-channel calendar reminders; re-engage old leads',
                '4 core workflows: New Lead, No-Answer, No-Show, After-Sale',
                'Personalized startup library (email/SMS/call scripts)',
                '120\' coaching + office-hour Q&A during the month'
            ],
            vi: [
                'Setup tài khoản & kết nối nền tảng (Facebook, Phone, Email...)',
                'Setup & Vận hành & tối ưu workflow email/SMS; nhắc lịch đa kênh; re-engage lead cũ',
                '4 workflow cốt lõi: New Lead, No-Answer, No-Show, After-Sale',
                'Thư viện khởi động (email/SMS/call script) cá nhân hoá',
                'Coaching 120\' + office-hour Q&A trong tháng'
            ]
        },
        icon: '🚀',
        color: 'from-blue-500 to-cyan-600'
    },
    {
        id: 'MA-2',
        name: {
            en: 'Social, Fanpage & Website Management',
            vi: 'Social, Fanpage & Website Management'
        },
        subtitle: {
            en: 'Marketing Contact',
            vi: 'Marketing Contact'
        },
        description: {
            en: 'Comprehensive social media and website management',
            vi: 'Quản lý toàn diện social media và website'
        },
        price: '$399',
        features: {
            en: [
                'Multi-platform content scheduling (Facebook Page/Profile, TikTok, YouTube Shorts)',
                'Monthly content production',
                'Fanpage & community management',
                'Website management'
            ],
            vi: [
                'Lên lịch nội dung đa nền tảng (Facebook Page/Profile, TikTok, YouTube Shorts)',
                'Sản xuất nội dung hằng tháng',
                'Quản trị fanpage & cộng đồng',
                'Website management'
            ]
        },
        icon: '📱',
        color: 'from-purple-500 to-pink-600'
    },
    {
        id: 'MA-3',
        name: {
            en: 'Performance Ads (Lead Generations)',
            vi: 'Performance Ads (Lead Generations)'
        },
        subtitle: {
            en: 'Marketing Contact',
            vi: 'Marketing Contact'
        },
        description: {
            en: 'Optimize advertising and lead conversion',
            vi: 'Tối ưu quảng cáo và chuyển đổi lead'
        },
        price: '$599',
        features: {
            en: [
                'Create & optimize ads (Meta/Insta/Threads/Google/TikTok/Native)',
                'Create & optimize conversion campaigns (Email/SMS)',
                'Create funnels for ads'
            ],
            vi: [
                'Tạo & tối ưu quảng cáo (Meta/Insta/Threads/Google/TikTok/Native)',
                'Tạo & tối ưu chiến dịch chuyển đổi (Email/SMS)',
                'Tạo Funnel phục vụ Ads'
            ]
        },
        icon: '🎯',
        color: 'from-green-500 to-emerald-600'
    },
    {
        id: 'MA-4',
        name: {
            en: 'Creative & Content Studio',
            vi: 'Creative & Content Studio'
        },
        subtitle: {
            en: 'Marketing Contact',
            vi: 'Marketing Contact'
        },
        description: {
            en: 'Professional design and content creation',
            vi: 'Thiết kế và sáng tạo nội dung chuyên nghiệp'
        },
        price: '$799',
        features: {
            en: [
                'Website/Funnel Design & Build',
                'Graphic Design (Brand & Ads)',
                'Video/Motion Editing',
                'Copywriting & Script'
            ],
            vi: [
                'Website/Funnel Design & Build',
                'Graphic Design (Brand & Ads)',
                'Edit Video/Motion',
                'Copywriting & Script'
            ]
        },
        icon: '🎨',
        color: 'from-orange-500 to-red-600'
    },
    {
        id: 'MA-5',
        name: {
            en: 'Contact & Conversion Management',
            vi: 'Contact & Conversion Management'
        },
        subtitle: {
            en: 'Marketing Contact',
            vi: 'Marketing Contact'
        },
        description: {
            en: 'Customer contact and conversion management',
            vi: 'Quản lý liên lạc và chuyển đổi khách hàng'
        },
        price: '$999',
        features: {
            en: [
                'Messaging & follow-up customers on CRM',
                'Appointment requests & schedule management',
                'Comment & group management'
            ],
            vi: [
                'Nhắn tin & Follow-up khách hàng trên CRM',
                'Xin cuộc hẹn & quản lý lịch hẹn',
                'Quản lý comment & group'
            ]
        },
        icon: '💬',
        color: 'from-indigo-500 to-purple-600'
    }
];

export default function UsagePlanPage() {
    const [activeTab, setActiveTab] = useState('account-usage');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const { t, currentLanguage } = useLanguage();

    // Marketing Service states
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    // Marketing Service handler functions
    const handleRegister = (packageName: string) => {
        setSelectedPackage(packageName);
        setShowSuccessModal(true);
    };

    const handleServiceToggle = (serviceId: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const calculateTotal = () => {
        return selectedServices.reduce((total, serviceId) => {
            const service = individualServices.find(s => s.id === serviceId);
            return total + (service?.price || 0);
        }, 0);
    };

    const handleCustomRegister = () => {
        if (selectedServices.length > 0) {
            setSelectedPackage(`Custom Package (${selectedServices.length} services)`);
            setShowSuccessModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        // Navigate to conversations page after closing modal
        window.location.href = '/app/marketing-assistant/conversations';
    };

    const tabs = useMemo(() => [
        { id: 'account-usage', name: t(tabNames['account-usage']), icon: ClockIcon },
        { id: 'upgrade-plan', name: t(tabNames['upgrade-plan']), icon: ArrowUpIcon },
        { id: 'marketing-assistant', name: t(tabNames['marketing-assistant']), icon: ChatBubbleLeftRightIcon },
        { id: 'payment-method', name: t(tabNames['payment-method']), icon: CreditCardIcon },
        { id: 'billing-info', name: t(tabNames['billing-info']), icon: DocumentTextIcon },
        { id: 'billing-history', name: t(tabNames['billing-history']), icon: ClockIcon },
        { id: 'support', name: t(tabNames['support']), icon: ShieldCheckIcon },
    ], [t]);

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
                return (
                    <div className="max-w-7xl mx-auto">
                        {/* CTA Banner - Moved to top */}
                        <div
                            className="rounded-2xl p-12 text-center text-white mb-16"
                            style={{
                                background: 'linear-gradient(to right, #E55D87, #5FC3E4)'
                            }}
                        >
                            <h2 className="text-3xl font-bold mb-4">
                                {t(titleContent)}
                            </h2>
                            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                                {t(subtitleContent)}
                            </p>
                            <button
                                onClick={() => window.location.href = '/app/marketing-assistant/conversations'}
                                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.964L3 20l1.036-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z" />
                                </svg>
                                {t(startButtonContent)}
                            </button>
                        </div>

                        {/* Why Choose Us */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                                {t(whyChooseTitleContent)}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {whyChooseItems.map((item, index) => (
                                    <div key={index} className="text-center bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8">
                                        <div className="text-4xl mb-4">{item.icon}</div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{t(item.title)}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{t(item.description)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Custom Services Selection */}
                        <div className="mb-16">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    {t(customServicesTitleContent)}
                                </h2>
                                <p className="text-xl text-gray-600">
                                    {t(customServicesSubtitleContent)}
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <div className="grid grid-cols-1 gap-4 mb-8">
                                    {individualServices.map((service) => (
                                        <div
                                            key={service.id}
                                            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedServices.includes(service.id)
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                                }`}
                                            onClick={() => handleServiceToggle(service.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedServices.includes(service.id)}
                                                        onChange={() => handleServiceToggle(service.id)}
                                                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="text-gray-900 font-medium">
                                                        {t(service.name)}
                                                    </span>
                                                </div>
                                                <span className="text-lg font-bold text-blue-600">
                                                    ${service.price}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {selectedServices.length > 0 && (
                                    <div className="border-t pt-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-xl font-semibold text-gray-900">
                                                {t(totalCostContent)}:
                                            </span>
                                            <span className="text-2xl font-bold text-blue-600">
                                                ${calculateTotal()}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleCustomRegister}
                                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            {t(registerCustomContent)}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Marketing Packages */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                                {t(packagesTitleContent)}
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {marketingPackages.map((pkg) => (
                                    <div key={pkg.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:bg-blue-600 group">
                                        <div className="p-8">
                                            <div className="flex items-start justify-between mb-6">
                                                <div>
                                                    <div className="flex items-center mb-2">
                                                        <span className="text-3xl mr-3">{pkg.icon}</span>
                                                        <div>
                                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">{pkg.id}</h3>
                                                            <p className="text-lg font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">{t(pkg.name)}</p>
                                                        </div>
                                                    </div>
                                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                                                        {t(pkg.subtitle)}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-2xl font-bold text-blue-600 group-hover:text-white transition-colors duration-300">
                                                        {pkg.price}
                                                    </span>
                                                    <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                                                        /month
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-8 group-hover:text-white transition-colors duration-300">{t(pkg.description)}</p>

                                            <div className="space-y-3 mb-8">
                                                {pkg.features[currentLanguage].map((feature: string, idx: number) => (
                                                    <div key={idx} className="flex items-start">
                                                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-gray-700 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleRegister(t(pkg.name))}
                                                    className="w-[200px] py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-lg"
                                                >
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
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

            {/* Success Modal */}
            {showSuccessModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-60"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{t(modalTitleContent)}</h3>
                            <p className="text-gray-600 mb-6">
                                {t(modalMessageContent)} <strong>{selectedPackage}</strong>.
                                {t(modalDescriptionContent)}
                            </p>
                            <button
                                onClick={handleCloseModal}
                                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {t(modalButtonContent)}
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
    const plans = ['Essential', 'Standard', 'Professional', 'Elite'];

    const featureCategories = [
        {
            title: 'Feature usage limits',
            features: [
                {
                    name: 'Seats included',
                    description: 'Number of user licenses included in the plan.',
                    values: ['1', '3', '5', 'Customize']
                },
                {
                    name: 'Contacts',
                    description: 'Maximum number of contact records you can store.',
                    values: ['5,000', '10,000', '50,000', '+200,000']
                },
                {
                    name: 'Opportunity Pipeline',
                    description: 'Number of sales pipelines you can maintain',
                    values: ['3', '10', 'Unlimited', 'Unlimited']
                },
                {
                    name: 'Automations',
                    description: 'Number of active automation workflows allowed',
                    values: ['5', '10', '50', 'Unlimited']
                },
                {
                    name: 'Email sends / mo',
                    description: 'Month sending cap per user (provider policies still apply).',
                    values: ['2,000', '5,000', '10,000', '50,000']
                },
                {
                    name: 'SMS/MMS sends / segment / mo',
                    description: 'Monthly text/message cap per segment',
                    values: ['1,000', '3,000', '10,000', '25,000']
                },
                {
                    name: 'Reporting',
                    description: 'Dashboards for conversion rates, top lead sources, and pipeline revenue. Export shareable reports fast.',
                    values: ['Month', 'Month', 'Week + Realtime', 'BI + Attribution']
                }
            ]
        },
        {
            title: 'CRM & Deals',
            features: [
                {
                    name: 'Contacts & Custom Fields',
                    description: 'Store customer profiles with tailored data points.',
                    values: ['✅', '✅', '✅', '✅']
                },
                {
                    name: 'Opportunity Pipeline',
                    description: 'Visual stages to track deal progress.',
                    values: ['✅', '✅', '✅', '✅']
                },
                {
                    name: 'File Attachments',
                    description: 'Add and store files with contacts or deals for quick access in CRM.',
                    values: ['✅', '✅', '✅', '✅']
                },
                {
                    name: 'Tasks/Notes',
                    description: 'Keep every customer record, task, and note in one place so nothing slips.',
                    values: ['✅', '✅', '✅', '✅']
                },
                {
                    name: 'Reminders (email/SMS)',
                    description: 'Auto reminders for tasks, meetings, and renewals via email or SMS.',
                    values: ['⛔', '✅', '✅', '✅']
                },
                {
                    name: 'Deal Management',
                    description: 'Create, update, assign, and forecast deals.',
                    values: ['✅', '✅', '✅', '✅']
                },
                {
                    name: 'Deal Card Customization',
                    description: 'Choose which fields appear on the deal card.',
                    values: ['✅', '✅', '✅', '✅']
                },
                {
                    name: 'Data Import/Export',
                    description: 'Bulk CSV import/export with mapping.',
                    values: ['✅', '✅', '✅', '✅']
                },
                {
                    name: 'Merge Duplicates',
                    description: 'Find and merge duplicate contacts/deals.',
                    values: ['✅', '✅', '✅', '✅']
                },
                {
                    name: 'Booking & Appointments',
                    description: 'Self-serve scheduling with auto-reminders.',
                    values: ['✅', '✅', '✅', '✅']
                },
                {
                    name: 'Sequences (Email/SMS)',
                    description: 'Multi-step follow-ups sent on a schedule.',
                    values: ['⛔', '✅', '✅', '✅']
                },
                {
                    name: 'Automations (Triggers)',
                    description: 'Event-based actions (tag, task, send, route).',
                    values: ['✅', '✅', '✅', '✅']
                },
                {
                    name: 'Social Inbox (comments)',
                    description: 'See and reply to all social comment from one post',
                    values: ['⛔', '✅', '✅', '✅']
                },
                {
                    name: 'Inbox (Messenger, Email, SMS)',
                    description: 'Send SMS, reply to emails, and manage Facebook messages in one place',
                    values: ['✅', '✅', '✅', '✅']
                },
                {
                    name: 'If/Else Steps',
                    description: 'Conditional branching to personalize flows.',
                    values: ['✅', '✅', '✅', '✅']
                },
                {
                    name: 'Drip / Queue Node',
                    description: 'Throttle releases to avoid campaign spikes.',
                    values: ['⛔', '✅', '✅', '✅']
                },
                {
                    name: 'Life Insurance Quoter (Premium Calculator)',
                    description: 'Instantly calculate premiums and create shareable life insurance quotes—by carrier, product, coverage, term, and riders.',
                    values: ['⛔', '⛔', '✅', '✅']
                }
            ]
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upgrade Your Subscription Plan</h3>
                <p className="text-gray-600">Choose the plan that best fits your business needs</p>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-full">
                    {/* Plan Headers */}
                    <div className="grid grid-cols-6 gap-4 mb-6">
                        <div className="col-span-2">
                            <h4 className="font-semibold text-gray-900">Features</h4>
                        </div>
                        {plans.map((plan, index) => (
                            <div key={plan} className="text-center">
                                <div className={`rounded-lg p-4 ${index === 1 ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
                                    <h4 className="font-bold text-lg text-gray-900">{plan}</h4>
                                    {index === 1 && (
                                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full mt-1 inline-block">
                                            Most Popular
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Feature Categories */}
                    {featureCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="mb-8">
                            <h5 className="font-semibold text-gray-900 mb-4 text-base">{category.title}</h5>

                            {category.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="grid grid-cols-6 gap-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                                    <div className="col-span-2">
                                        <div className="pr-4">
                                            <h6 className="font-medium text-gray-900 text-sm">{feature.name}</h6>
                                            <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                                        </div>
                                    </div>
                                    {feature.values.map((value, valueIndex) => (
                                        <div key={valueIndex} className="text-center text-sm">
                                            <span className={`${value === '✅' ? 'text-green-600 text-lg' :
                                                value === '⛔' ? 'text-red-500 text-lg' :
                                                    value.includes('Unlimited') ? 'text-blue-600 font-semibold' :
                                                        'text-gray-700'
                                                }`}>
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-6 gap-4 mt-8">
                        <div className="col-span-2"></div>
                        {plans.map((plan, index) => (
                            <div key={plan} className="text-center">
                                <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${index === 1
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                    }`}>
                                    Choose {plan}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
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