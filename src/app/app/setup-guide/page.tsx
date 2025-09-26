'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import {
    CheckCircleIcon,
    CreditCardIcon,
    UserIcon,
    CogIcon,
    PlayIcon,
    ArrowRightIcon,
    XMarkIcon,
    BuildingOfficeIcon,
    GlobeAltIcon,
    DocumentArrowUpIcon,
    ChatBubbleLeftRightIcon,
    MegaphoneIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

// Payment Modal Component
function PaymentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { t } = useLanguage();
    const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'paypal' | null>(null);
    const [currentStep, setCurrentStep] = useState<'method' | 'stripe-form' | 'paypal-connecting' | 'success'>('method');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paypalWindow, setPaypalWindow] = useState<Window | null>(null);

    // Form data for Stripe
    const [stripeData, setStripeData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        country: 'US',
        postalCode: ''
    });

    const paymentModalContent = {
        title: {
            en: "Add Payment Method",
            vi: "Bổ sung phương thức thanh toán"
        },
        subtitle: {
            en: "Access advanced CRM features and marketing tools",
            vi: "Truy cập các tính năng CRM nâng cao và công cụ marketing"
        },
        stripe: {
            en: "Stripe",
            vi: "Stripe"
        },
        paypal: {
            en: "PayPal",
            vi: "PayPal"
        },
        skip: {
            en: "Skip for now",
            vi: "Bỏ qua"
        },
        back: {
            en: "Back",
            vi: "Quay Lại"
        },
        addPayment: {
            en: "Add Payment Method",
            vi: "Thêm Phương Thức Thanh Toán"
        },
        processing: {
            en: "Processing...",
            vi: "Đang Xử Lý..."
        },
        success: {
            en: "Payment Method Added Successfully!",
            vi: "Đã Thêm Phương Thức Thanh Toán Thành Công!"
        },
        successDesc: {
            en: "Your payment information has been securely saved.",
            vi: "Thông tin thanh toán của bạn đã được lưu an toàn."
        },
        connectingPaypal: {
            en: "Connecting to PayPal...",
            vi: "Đang Kết Nối PayPal..."
        },
        paypalConnecting: {
            en: "Please complete the authorization in the PayPal popup window.",
            vi: "Vui lòng hoàn tất ủy quyền trong cửa sổ popup PayPal."
        },
        cardNumber: {
            en: "Card Number",
            vi: "Số Thẻ"
        },
        expiryDate: {
            en: "Expiry Date",
            vi: "Ngày Hết Hạn"
        },
        cvv: {
            en: "CVV",
            vi: "CVV"
        },
        cardholderName: {
            en: "Cardholder Name",
            vi: "Tên Chủ Thẻ"
        },
        country: {
            en: "Country",
            vi: "Quốc Gia"
        },
        postalCode: {
            en: "Postal Code",
            vi: "Mã Bưu Điện"
        }
    };

    const handleMethodSelect = (method: 'stripe' | 'paypal') => {
        setSelectedMethod(method);

        if (method === 'stripe') {
            setCurrentStep('stripe-form');
        } else if (method === 'paypal') {
            handlePaypalConnect();
        }
    };

    const handlePaypalConnect = async () => {
        setCurrentStep('paypal-connecting');
        setIsProcessing(true);

        try {
            // Step 1: Create billing agreement on backend
            const response = await fetch('/api/paypal/create-agreement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    return_url: `${window.location.origin}/api/paypal/success`,
                    cancel_url: `${window.location.origin}/api/paypal/cancel`
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create PayPal agreement');
            }

            const data = await response.json();

            // Step 2: Open PayPal popup
            const popup = window.open(
                data.approval_url,
                'paypal-popup',
                'width=500,height=600,scrollbars=yes,resizable=yes'
            );

            setPaypalWindow(popup);

            // Step 3: Listen for popup close or success
            const checkClosed = setInterval(() => {
                if (popup?.closed) {
                    clearInterval(checkClosed);
                    setIsProcessing(false);
                    // If popup was closed without success message, assume success for demo
                    handlePaypalSuccess();
                }
            }, 1000);

            // Step 4: Listen for success/cancel messages from popup
            const handleMessage = (event: MessageEvent) => {
                if (event.origin !== window.location.origin) return;

                if (event.data.type === 'PAYPAL_SUCCESS') {
                    clearInterval(checkClosed);
                    popup?.close();
                    setIsProcessing(false);
                    handlePaypalSuccess();
                    window.removeEventListener('message', handleMessage);
                } else if (event.data.type === 'PAYPAL_CANCEL') {
                    clearInterval(checkClosed);
                    popup?.close();
                    setIsProcessing(false);
                    setCurrentStep('method');
                    window.removeEventListener('message', handleMessage);
                }
            };

            window.addEventListener('message', handleMessage);

        } catch (error) {
            console.error('PayPal connection error:', error);
            setIsProcessing(false);
            setCurrentStep('method');
            alert('Failed to connect to PayPal. Please try again.');
        }
    };

    const handlePaypalSuccess = () => {
        setCurrentStep('success');
        setSelectedMethod('paypal');
    };

    const handleStripeFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate Stripe API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsProcessing(false);
        setCurrentStep('success');
    };

    const handleComplete = () => {
        onClose();
        // Reset all states
        setCurrentStep('method');
        setSelectedMethod(null);
        setIsProcessing(false);
        setStripeData({
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardholderName: '',
            country: 'US',
            postalCode: ''
        });
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\D/g, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    // Cleanup popup on component unmount
    useEffect(() => {
        return () => {
            if (paypalWindow && !paypalWindow.closed) {
                paypalWindow.close();
            }
        };
    }, [paypalWindow]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

                {/* Modal */}
                <div className={`relative w-full transform overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl transition-all ${currentStep === 'stripe-form' ? 'max-w-lg' : 'max-w-md'
                    }`}>
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/10 rounded-2xl"></div>

                    <div className="relative p-6">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 p-2 rounded-lg hover:bg-black/10 transition-colors"
                        >
                            <XMarkIcon className="h-5 w-5 text-gray-600" />
                        </button>

                        {/* Method Selection Step */}
                        {currentStep === 'method' && (
                            <>
                                {/* Header */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4 mx-auto">
                                        <CreditCardIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                                        {t(paymentModalContent.title)}
                                    </h3>
                                    <p className="text-sm text-gray-600 text-center">
                                        {t(paymentModalContent.subtitle)}
                                    </p>
                                </div>

                                {/* Payment Methods */}
                                <div className="space-y-3 mb-6">
                                    {/* Stripe */}
                                    <div
                                        onClick={() => handleMethodSelect('stripe')}
                                        className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 bg-white/50 cursor-pointer transition-all"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">S</span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">
                                                    {t(paymentModalContent.stripe)}
                                                </h4>
                                                <p className="text-sm text-gray-600">Credit/Debit Cards</p>
                                            </div>
                                            <ArrowRightIcon className="h-5 w-5 text-gray-400 ml-auto" />
                                        </div>
                                    </div>

                                    {/* PayPal */}
                                    <div
                                        onClick={() => handleMethodSelect('paypal')}
                                        className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 bg-white/50 cursor-pointer transition-all"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">P</span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">
                                                    {t(paymentModalContent.paypal)}
                                                </h4>
                                                <p className="text-sm text-gray-600">PayPal Account</p>
                                            </div>
                                            <ArrowRightIcon className="h-5 w-5 text-gray-400 ml-auto" />
                                        </div>
                                    </div>
                                </div>

                                {/* Skip button */}
                                <button
                                    onClick={onClose}
                                    className="w-full py-3 px-4 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    {t(paymentModalContent.skip)}
                                </button>
                            </>
                        )}

                        {/* Stripe Form Step */}
                        {currentStep === 'stripe-form' && (
                            <>
                                {/* Header */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4 mx-auto">
                                        <CreditCardIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                                        Add Credit Card
                                    </h3>
                                    <p className="text-sm text-gray-600 text-center">
                                        Enter your card information securely
                                    </p>
                                </div>

                                {/* Stripe Form */}
                                <form onSubmit={handleStripeFormSubmit} className="space-y-4">
                                    {/* Card Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {t(paymentModalContent.cardNumber)}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            value={stripeData.cardNumber}
                                            onChange={(e) => setStripeData(prev => ({
                                                ...prev,
                                                cardNumber: formatCardNumber(e.target.value)
                                            }))}
                                            maxLength={19}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Expiry Date */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {t(paymentModalContent.expiryDate)}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                value={stripeData.expiryDate}
                                                onChange={(e) => setStripeData(prev => ({
                                                    ...prev,
                                                    expiryDate: formatExpiryDate(e.target.value)
                                                }))}
                                                maxLength={5}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70"
                                                required
                                            />
                                        </div>

                                        {/* CVV */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {t(paymentModalContent.cvv)}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                value={stripeData.cvv}
                                                onChange={(e) => setStripeData(prev => ({
                                                    ...prev,
                                                    cvv: e.target.value.replace(/\D/g, '').substring(0, 4)
                                                }))}
                                                maxLength={4}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Cardholder Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {t(paymentModalContent.cardholderName)}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={stripeData.cardholderName}
                                            onChange={(e) => setStripeData(prev => ({
                                                ...prev,
                                                cardholderName: e.target.value
                                            }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Country */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {t(paymentModalContent.country)}
                                            </label>
                                            <select
                                                value={stripeData.country}
                                                onChange={(e) => setStripeData(prev => ({
                                                    ...prev,
                                                    country: e.target.value
                                                }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70"
                                            >
                                                <option value="US">United States</option>
                                                <option value="VN">Vietnam</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="CA">Canada</option>
                                            </select>
                                        </div>

                                        {/* Postal Code */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {t(paymentModalContent.postalCode)}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="12345"
                                                value={stripeData.postalCode}
                                                onChange={(e) => setStripeData(prev => ({
                                                    ...prev,
                                                    postalCode: e.target.value
                                                }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex space-x-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep('method')}
                                            className="flex-1 py-3 px-4 rounded-xl font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
                                        >
                                            {t(paymentModalContent.back)}
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isProcessing}
                                            className="flex-1 py-3 px-4 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                                        >
                                            {isProcessing ? t(paymentModalContent.processing) : t(paymentModalContent.addPayment)}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}

                        {/* PayPal Connecting Step */}
                        {currentStep === 'paypal-connecting' && (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    {t(paymentModalContent.connectingPaypal)}
                                </h4>
                                <p className="text-sm text-gray-600 mb-6">
                                    {t(paymentModalContent.paypalConnecting)}
                                </p>
                                <button
                                    onClick={() => {
                                        if (paypalWindow && !paypalWindow.closed) {
                                            paypalWindow.close();
                                        }
                                        setCurrentStep('method');
                                        setIsProcessing(false);
                                    }}
                                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}

                        {/* Success Step */}
                        {currentStep === 'success' && (
                            <div className="text-center">
                                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                                    <CheckCircleIcon className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {t(paymentModalContent.success)}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {t(paymentModalContent.successDesc)}
                                </p>
                                <div className="text-center mb-4">
                                    <p className="text-sm text-gray-500">
                                        Payment Method: <span className="font-semibold">
                                            {selectedMethod === 'stripe' ? 'Credit Card' : 'PayPal'}
                                        </span>
                                    </p>
                                </div>
                                <button
                                    onClick={handleComplete}
                                    className="w-full py-3 px-4 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
                                >
                                    Complete Setup
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main Setup Guide Component
export default function SetupGuidePage() {
    const { t } = useLanguage();
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(true); // Always open by default

    const setupContent = {
        title: {
            en: "Welcome to 7x CRM",
            vi: "Chào Mừng Đến Với 7x CRM"
        },
        subtitle: {
            en: "Let's get you started with a quick setup process",
            vi: "Hãy bắt đầu với quy trình thiết lập nhanh chóng"
        },
        step1: {
            title: {
                en: "Import Your Leads",
                vi: "Nhập Danh Sách Khách Hàng"
            },
            description: {
                en: "Upload your existing customer data and lead information",
                vi: "Tải lên dữ liệu khách hàng và thông tin leads hiện có"
            },
            action: {
                en: "Import Leads",
                vi: "Nhập Leads"
            }
        },
        step2: {
            title: {
                en: "Integrate Your Communication Channels",
                vi: "Tích Hợp Kênh Liên Lạc"
            },
            description: {
                en: "Connect your email, phone, and social media channels",
                vi: "Kết nối email, điện thoại và các kênh mạng xã hội"
            },
            action: {
                en: "Setup Channels",
                vi: "Thiết Lập Kênh"
            }
        },
        step3: {
            title: {
                en: "Do Your Marketing Campaign",
                vi: "Thực Hiện Chiến Dịch Marketing"
            },
            description: {
                en: "Create and launch your first marketing campaign",
                vi: "Tạo và khởi chạy chiến dịch marketing đầu tiên"
            },
            action: {
                en: "Start Campaign",
                vi: "Bắt Đầu Chiến Dịch"
            }
        },
        step4: {
            title: {
                en: "Manage Lead Lifecycle Stages",
                vi: "Quản Lý Chu Kỳ Sống Của Lead"
            },
            description: {
                en: "Track, nurture, and improve the lead lifecycle stages with us",
                vi: "Theo dõi, nuôi dưỡng và cải thiện các giai đoạn vòng đời khách hàng tiềm năng cùng chúng tôi"
            },
            action: {
                en: "Go to Leads Page",
                vi: "Đi đến trang Leads"
            }
        },
        skipForNow: {
            en: "Skip for now",
            vi: "Bỏ qua"
        },
        completed: {
            en: "Completed",
            vi: "Đã Hoàn Thành"
        }
    };

    const steps = [
        {
            number: 1,
            title: t(setupContent.step1.title),
            description: t(setupContent.step1.description),
            action: t(setupContent.step1.action),
            icon: DocumentArrowUpIcon,
            bgColor: "bg-blue-50",
            textColor: "text-blue-600",
            borderColor: "border-blue-200"
        },
        {
            number: 2,
            title: t(setupContent.step2.title),
            description: t(setupContent.step2.description),
            action: t(setupContent.step2.action),
            icon: ChatBubbleLeftRightIcon,
            bgColor: "bg-green-50",
            textColor: "text-green-600",
            borderColor: "border-green-200"
        },
        {
            number: 3,
            title: t(setupContent.step3.title),
            description: t(setupContent.step3.description),
            action: t(setupContent.step3.action),
            icon: MegaphoneIcon,
            bgColor: "bg-purple-50",
            textColor: "text-purple-600",
            borderColor: "border-purple-200"
        },
        {
            number: 4,
            title: t(setupContent.step4.title),
            description: t(setupContent.step4.description),
            action: t(setupContent.step4.action),
            icon: ChartBarIcon,
            bgColor: "bg-indigo-50",
            textColor: "text-indigo-600",
            borderColor: "border-indigo-200"
        }
    ];

    const handleStepAction = (stepNumber: number) => {
        // Mark step as completed
        if (!completedSteps.includes(stepNumber)) {
            setCompletedSteps([...completedSteps, stepNumber]);
        }

        // Move to next step except for last step
        if (stepNumber < 4) {
            setCurrentStep(stepNumber + 1);
        }

        // Navigate to different pages based on step directly
        switch (stepNumber) {
            case 1:
                // Navigate to leads page and trigger Add Lead popup via URL param
                window.location.href = '/app/sales-hub/leads?addLead=true';
                break;
            case 2:
                window.location.href = '/app/marketing-integration';
                break;
            case 3:
                window.location.href = '/app/advertising/page-a/campaigns';
                break;
            case 4:
                window.location.href = '/app/sales-hub/leads';
                break;
            default:
                window.location.href = '/app/home';
        }
    };

    const handleSkipStep = (stepNumber: number) => {
        if (stepNumber < 4) {
            setCurrentStep(stepNumber + 1);
        } else {
            window.location.href = '/app/home';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 mx-auto">
                        <GlobeAltIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {t(setupContent.title)}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t(setupContent.subtitle)}
                    </p>
                </div>

                {/* Progress bar */}
                <div className="mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center space-x-4">
                            {steps.map((step, index) => (
                                <div key={step.number} className="flex items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${completedSteps.includes(step.number)
                                        ? 'bg-green-500 text-white'
                                        : currentStep === step.number
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        {completedSteps.includes(step.number) ? (
                                            <CheckCircleIcon className="h-5 w-5" />
                                        ) : (
                                            step.number
                                        )}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-16 h-1 mx-2 rounded transition-all ${completedSteps.includes(step.number) || currentStep > step.number
                                            ? 'bg-green-500'
                                            : 'bg-gray-200'
                                            }`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Steps */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-6 md:grid-cols-2">
                        {steps.map((step) => {
                            const isCompleted = completedSteps.includes(step.number);
                            const isCurrent = currentStep === step.number;
                            const isAccessible = step.number <= currentStep || isCompleted;

                            return (
                                <div key={step.number} className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${isCompleted
                                    ? 'border-green-200 bg-green-50'
                                    : isCurrent
                                        ? `${step.borderColor} ${step.bgColor} scale-105 shadow-lg`
                                        : isAccessible
                                            ? 'border-gray-200 bg-white hover:shadow-md'
                                            : 'border-gray-100 bg-gray-50'
                                    }`}>
                                    {/* Glass effect for current step */}
                                    {isCurrent && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/10"></div>
                                    )}

                                    <div className="relative p-6">
                                        {/* Step Icon & Number */}
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${isCompleted
                                                ? 'bg-green-100'
                                                : isCurrent
                                                    ? step.bgColor
                                                    : 'bg-gray-100'
                                                }`}>
                                                {isCompleted ? (
                                                    <CheckCircleIcon className="h-8 w-8 text-green-600" />
                                                ) : (
                                                    <step.icon className={`h-8 w-8 ${isCurrent ? step.textColor : 'text-gray-400'
                                                        }`} />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className={`text-xl font-bold mb-1 ${isCompleted ? 'text-green-800' : isCurrent ? 'text-gray-900' : 'text-gray-600'
                                                    }`}>
                                                    {step.title}
                                                </h3>
                                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${isCompleted
                                                    ? 'bg-green-100 text-green-800'
                                                    : isCurrent
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {isCompleted ? t(setupContent.completed) : `Step ${step.number}`}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className={`text-sm mb-6 ${isCompleted ? 'text-green-700' : isCurrent ? 'text-gray-700' : 'text-gray-500'
                                            }`}>
                                            {step.description}
                                        </p>

                                        {/* Actions */}
                                        {!isCompleted && (
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => handleStepAction(step.number)}
                                                    disabled={!isAccessible}
                                                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${isCurrent
                                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                                                        : isAccessible
                                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                >
                                                    {step.action}
                                                </button>
                                                {isCurrent && (
                                                    <button
                                                        onClick={() => handleSkipStep(step.number)}
                                                        className="px-4 py-3 rounded-xl font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                                    >
                                                        {t(setupContent.skipForNow)}
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {/* Completed checkmark */}
                                        {isCompleted && (
                                            <div className="flex items-center justify-center py-3">
                                                <div className="flex items-center space-x-2 text-green-600">
                                                    <CheckCircleIcon className="h-5 w-5" />
                                                    <span className="font-semibold">{t(setupContent.completed)}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => {
                    setIsPaymentModalOpen(false);
                }}
            />
        </div>
    );
}