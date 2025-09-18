'use client';

import { useState } from 'react';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';

interface SignupStep2Props {
    onPrevious: () => void;
    onComplete: (data: any) => void;
    initialData: any;
}

const subscriptionPlans = [
    {
        id: 'trial',
        name: 'Free Trial',
        price: 'Free',
        duration: '14 days',
        features: [
            'All features included',
            'Up to 100 leads',
            'Basic support',
            'Email integration'
        ],
        recommended: true
    },
    {
        id: 'essential',
        name: 'Essential',
        price: '$29',
        duration: 'per month',
        features: [
            'Up to 1,000 leads',
            'Advanced reporting',
            'Phone support',
            'Email & SMS campaigns'
        ]
    },
    {
        id: 'professional',
        name: 'Professional',
        price: '$79',
        duration: 'per month',
        features: [
            'Up to 10,000 leads',
            'Custom workflows',
            'Priority support',
            'Advanced integrations'
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: '$199',
        duration: 'per month',
        features: [
            'Unlimited leads',
            'Custom development',
            '24/7 dedicated support',
            'White-label options'
        ]
    }
];

const businessGoalsOptions = [
    'Increase lead generation',
    'Improve sales conversion',
    'Automate marketing campaigns',
    'Better customer management',
    'Team collaboration',
    'Sales analytics and reporting',
    'Social media management',
    'Email marketing automation'
];

export default function SignupStep2({ onPrevious, onComplete, initialData }: SignupStep2Props) {
    const [firstName, setFirstName] = useState(initialData.firstName || '');
    const [lastName, setLastName] = useState(initialData.lastName || '');
    const [company, setCompany] = useState(initialData.company || '');
    const [phoneNumber, setPhoneNumber] = useState(initialData.phoneNumber || '');
    const [selectedPlan, setSelectedPlan] = useState(initialData.selectedPlan || 'trial');
    const [businessGoals, setBusinessGoals] = useState<string[]>(initialData.businessGoals || []);
    const [errors, setErrors] = useState<any>({});

    const handleGoalToggle = (goal: string) => {
        setBusinessGoals(prev =>
            prev.includes(goal)
                ? prev.filter(g => g !== goal)
                : [...prev, goal]
        );
    };

    const validateForm = () => {
        const newErrors: any = {};

        if (!firstName.trim()) newErrors.firstName = 'First name is required';
        if (!lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!company.trim()) newErrors.company = 'Company name is required';
        if (businessGoals.length === 0) newErrors.businessGoals = 'Please select at least one business goal';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onComplete({
                firstName,
                lastName,
                company,
                phoneNumber,
                selectedPlan,
                businessGoals
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
                <p className="text-gray-600">Tell us about your business and goals</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name *
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your first name"
                            />
                            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your last name"
                            />
                            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                        </div>

                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                id="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.company ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your company name"
                            />
                            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number (Optional)
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your phone number"
                            />
                        </div>
                    </div>
                </div>

                {/* Subscription Plans */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Plan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {subscriptionPlans.map((plan) => (
                            <div
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id)}
                                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${selectedPlan === plan.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    } ${plan.recommended ? 'ring-2 ring-blue-200' : ''}`}
                            >
                                {plan.recommended && (
                                    <div className="absolute -top-2 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                        Recommended
                                    </div>
                                )}
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id
                                            ? 'border-blue-500 bg-blue-500'
                                            : 'border-gray-300'
                                        }`}>
                                        {selectedPlan === plan.id && (
                                            <CheckIcon className="w-3 h-3 text-white" />
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-600">/{plan.duration}</span>
                                </div>
                                <ul className="space-y-1">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="text-sm text-gray-600 flex items-center">
                                            <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Business Goals */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">What are your main business goals? *</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {businessGoalsOptions.map((goal) => (
                            <div
                                key={goal}
                                onClick={() => handleGoalToggle(goal)}
                                className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${businessGoals.includes(goal)
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 ${businessGoals.includes(goal)
                                            ? 'border-blue-500 bg-blue-500'
                                            : 'border-gray-300'
                                        }`}>
                                        {businessGoals.includes(goal) && (
                                            <CheckIcon className="w-3 h-3 text-white" />
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{goal}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {errors.businessGoals && <p className="mt-2 text-sm text-red-600">{errors.businessGoals}</p>}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Previous
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        Complete Signup
                    </button>
                </div>
            </form>
        </div>
    );
}
