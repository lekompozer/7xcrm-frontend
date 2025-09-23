import DashboardLayout from '@/components/layout/DashboardLayout';

export default function MarketingAssistantPage() {
    return (
        <DashboardLayout>
            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Marketing Assistant</h1>
                        <p className="mt-2 text-gray-600">AI-powered marketing assistance and automation tools</p>
                    </div>

                    {/* Coming Soon Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="text-center">
                            <div className="mx-auto h-24 w-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="h-12 w-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Marketing Assistant Coming Soon</h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                Get ready for intelligent marketing automation powered by advanced AI technology.
                            </p>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-md mx-auto">
                                <h4 className="font-medium text-purple-900 mb-2">Upcoming features:</h4>
                                <ul className="text-sm text-purple-800 space-y-1 text-left">
                                    <li>• AI-generated marketing content</li>
                                    <li>• Automated email campaigns</li>
                                    <li>• Lead scoring and qualification</li>
                                    <li>• Social media automation</li>
                                    <li>• Performance analytics</li>
                                    <li>• Personalized recommendations</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Feature Preview Cards */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 border border-blue-200">
                            <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Content Generation</h3>
                            <p className="text-sm text-gray-600">AI-powered content creation for emails, social posts, and marketing materials.</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6 border border-green-200">
                            <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Smart Automation</h3>
                            <p className="text-sm text-gray-600">Intelligent workflow automation based on customer behavior and preferences.</p>
                        </div>

                        <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg p-6 border border-amber-200">
                            <div className="h-12 w-12 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Analytics & Insights</h3>
                            <p className="text-sm text-gray-600">Deep analytics and actionable insights to optimize your marketing campaigns.</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}