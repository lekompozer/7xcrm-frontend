interface SignupIntroProps {
    currentStep: number;
}

export default function SignupIntro({ currentStep }: SignupIntroProps) {
    const step1Content = {
        title: "Welcome to 7x CRM",
        subtitle: "Your Complete Business Management Solution",
        features: [
            {
                title: "Advanced Lead Management",
                description: "Capture, track, and convert leads with our intelligent CRM system"
            },
            {
                title: "Marketing Automation",
                description: "Streamline your marketing campaigns with AI-powered tools"
            },
            {
                title: "Sales Analytics",
                description: "Get real-time insights into your sales performance and revenue"
            },
            {
                title: "Team Collaboration",
                description: "Work seamlessly with your team across all departments"
            }
        ]
    };

    const step2Content = {
        title: "Choose Your Growth Path",
        subtitle: "Select the perfect plan for your business needs",
        features: [
            {
                title: "Trial Period",
                description: "Start with a 14-day free trial to explore all features"
            },
            {
                title: "Flexible Plans",
                description: "From essential to enterprise - scale as you grow"
            },
            {
                title: "Marketing Services",
                description: "Optional professional marketing assistance available"
            },
            {
                title: "24/7 Support",
                description: "Our team is here to help you succeed every step of the way"
            }
        ]
    };

    const content = currentStep === 1 ? step1Content : step2Content;

    return (
        <div className="flex flex-col justify-center h-full w-full p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {content.title}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600">
                    {content.subtitle}
                </p>
            </div>

            <div className="space-y-6">
                {content.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {currentStep === 1 && (
                <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                        <p className="text-gray-600">Businesses trust 7x CRM</p>
                    </div>
                </div>
            )}

            {currentStep === 2 && (
                <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">14 Days</div>
                        <p className="text-gray-600">Free trial with all features</p>
                    </div>
                </div>
            )}
        </div>
    );
}
