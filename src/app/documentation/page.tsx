import DashboardLayout from '@/components/layout/DashboardLayout';

export default function DocumentationPage() {
    return (
        <DashboardLayout>
            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
                        <p className="mt-2 text-gray-600">Comprehensive guides and resources for using 7x CRM</p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Documentation Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* Getting Started */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Getting Started</h3>
                            <p className="text-gray-600 mb-4">Learn the basics of 7x CRM and set up your account</p>
                            <div className="space-y-2">
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Quick Start Guide</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Account Setup</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• First Steps</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Basic Configuration</a>
                            </div>
                        </div>

                        {/* User Guides */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Guides</h3>
                            <p className="text-gray-600 mb-4">Detailed guides for all CRM features and functions</p>
                            <div className="space-y-2">
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Lead Management</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Sales Pipeline</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Customer Management</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Reporting & Analytics</a>
                            </div>
                        </div>

                        {/* API Documentation */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">API Documentation</h3>
                            <p className="text-gray-600 mb-4">Integration guides and API references for developers</p>
                            <div className="space-y-2">
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• REST API Reference</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Authentication</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Webhooks</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• SDKs & Libraries</a>
                            </div>
                        </div>

                        {/* Advanced Features */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Features</h3>
                            <p className="text-gray-600 mb-4">Power user guides and advanced configuration</p>
                            <div className="space-y-2">
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Automation Rules</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Custom Fields</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Workflow Design</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Advanced Reporting</a>
                            </div>
                        </div>

                        {/* Troubleshooting */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Troubleshooting</h3>
                            <p className="text-gray-600 mb-4">Common issues and their solutions</p>
                            <div className="space-y-2">
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Common Issues</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Error Messages</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Performance Tips</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Best Practices</a>
                            </div>
                        </div>

                        {/* Video Tutorials */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1M7 7h10M7 7l-3-3m3 3l-3 3m10-3l3-3m-3 3l3 3" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
                            <p className="text-gray-600 mb-4">Step-by-step video guides and walkthroughs</p>
                            <div className="space-y-2">
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Getting Started Videos</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Feature Walkthroughs</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Webinar Recordings</a>
                                <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">• Tips & Tricks</a>
                            </div>
                        </div>
                    </div>

                    {/* Popular Articles */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <a href="#" className="block bg-white rounded-lg p-4 hover:shadow-sm transition-shadow">
                                <h4 className="font-medium text-gray-900 mb-1">How to Import Your Contacts</h4>
                                <p className="text-sm text-gray-600">Learn how to quickly import your existing contacts into 7x CRM</p>
                            </a>
                            <a href="#" className="block bg-white rounded-lg p-4 hover:shadow-sm transition-shadow">
                                <h4 className="font-medium text-gray-900 mb-1">Setting Up Your Sales Pipeline</h4>
                                <p className="text-sm text-gray-600">Configure your sales stages and workflow for optimal results</p>
                            </a>
                            <a href="#" className="block bg-white rounded-lg p-4 hover:shadow-sm transition-shadow">
                                <h4 className="font-medium text-gray-900 mb-1">Creating Custom Reports</h4>
                                <p className="text-sm text-gray-600">Build custom reports to track your key performance metrics</p>
                            </a>
                            <a href="#" className="block bg-white rounded-lg p-4 hover:shadow-sm transition-shadow">
                                <h4 className="font-medium text-gray-900 mb-1">Integrating with Third-Party Tools</h4>
                                <p className="text-sm text-gray-600">Connect 7x CRM with your favorite business tools and apps</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}