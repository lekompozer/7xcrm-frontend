'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import SignupStep1 from './components/SignupStep1';
import SignupStep2 from './components/SignupStep2';
import SignupIntro from './components/SignupIntro';
import { SignupData } from './types';

export default function SignupPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [signupData, setSignupData] = useState<SignupData>({
        // Step 1 data
        signupMethod: '', // 'google' or 'email'
        email: '',
        password: '',
        confirmPassword: '',
        // Step 2 data
        firstName: '',
        lastName: '',
        company: '',
        phoneNumber: '',
        selectedPlan: '',
        businessGoals: []
    });

    const handleNextStep = (stepData: Partial<SignupData>) => {
        setSignupData(prev => ({ ...prev, ...stepData }));
        setCurrentStep(2);
    };

    const handlePreviousStep = () => {
        setCurrentStep(1);
    };

    const handleComplete = (stepData: Partial<SignupData>) => {
        const finalData = { ...signupData, ...stepData };
        console.log('Signup completed:', finalData);

        // Simulate signup processing
        setTimeout(() => {
            // Redirect to the setup guide
            router.push('/app/setup-guide');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Side - Intro */}
            <div className="hidden lg:flex lg:w-1/2 bg-white">
                <SignupIntro currentStep={currentStep} />
            </div>

            {/* Right Side - Header + Form */}
            <div className="w-full lg:w-1/2 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                    <ArrowLeftIcon className="h-5 w-5" />
                                    <span>Back to 7x CRM</span>
                                </Link>
                            </div>
                            <div className="text-2xl font-bold text-blue-600">7x CRM</div>
                            <div className="w-24"></div> {/* Spacer for centering */}
                        </div>
                    </div>
                </header>

                {/* Progress Indicator */}
                <div className="bg-white border-b border-gray-200">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="py-4">
                            <div className="flex items-center justify-center space-x-8">
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        1
                                    </div>
                                    <span className={`ml-2 text-sm font-medium ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-600'
                                        }`}>
                                        Account Setup
                                    </span>
                                </div>
                                <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        2
                                    </div>
                                    <span className={`ml-2 text-sm font-medium ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-600'
                                        }`}>
                                        Business Information
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 h-full">
                        {currentStep === 1 ? (
                            <SignupStep1
                                onNext={handleNextStep}
                                initialData={signupData}
                            />
                        ) : (
                            <SignupStep2
                                onPrevious={handlePreviousStep}
                                onComplete={handleComplete}
                                initialData={signupData}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Intro - Show on small screens */}
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 hidden" id="mobile-intro">
                <div className="bg-white h-full overflow-y-auto">
                    <SignupIntro currentStep={currentStep} />
                </div>
            </div>
        </div>
    );
}
