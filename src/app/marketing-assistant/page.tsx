'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

// Content definitions for language support
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
        icon: "�"
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

export default function MarketingAssistantPage() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState('');
    const { currentLanguage, t } = useLanguage();

    const handleRegister = (packageName: string) => {
        setSelectedPackage(packageName);
        setShowSuccessModal(true);
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        // Navigate to conversations page after closing modal
        window.location.href = '/app/marketing-assistant/conversations';
    };

    return (
        <DashboardLayout>
            <div className="px-6 py-8">
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
                        <Link
                            href="/app/marketing-assistant/conversations"
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.964L3 20l1.036-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z" />
                            </svg>
                            {t(startButtonContent)}
                        </Link>
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
        </DashboardLayout>
    );
}
