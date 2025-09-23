import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ContactSalesPage() {
    return (
        <DashboardLayout>
            <div className="px-6 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Sales</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Ready to transform your business with 7x CRM? Let&apos;s discuss how we can help you achieve your goals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Business Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                                            Industry
                                        </label>
                                        <select
                                            id="industry"
                                            name="industry"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Industry</option>
                                            <option value="technology">Technology</option>
                                            <option value="healthcare">Healthcare</option>
                                            <option value="finance">Finance</option>
                                            <option value="retail">Retail</option>
                                            <option value="manufacturing">Manufacturing</option>
                                            <option value="education">Education</option>
                                            <option value="real-estate">Real Estate</option>
                                            <option value="consulting">Consulting</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Size
                                        </label>
                                        <select
                                            id="companySize"
                                            name="companySize"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Size</option>
                                            <option value="1-10">1-10 employees</option>
                                            <option value="11-50">11-50 employees</option>
                                            <option value="51-200">51-200 employees</option>
                                            <option value="201-500">201-500 employees</option>
                                            <option value="501-1000">501-1000 employees</option>
                                            <option value="1000+">1000+ employees</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                                        What are you interested in?
                                    </label>
                                    <select
                                        id="interest"
                                        name="interest"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Interest</option>
                                        <option value="demo">Schedule a Demo</option>
                                        <option value="pricing">Pricing Information</option>
                                        <option value="trial">Free Trial</option>
                                        <option value="migration">Migration from Current CRM</option>
                                        <option value="enterprise">Enterprise Solutions</option>
                                        <option value="integration">Custom Integrations</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Tell us about your needs
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        placeholder="Describe your current challenges, goals, and what you're looking for in a CRM solution..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        name="consent"
                                        required
                                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="consent" className="ml-3 text-sm text-gray-700">
                                        I agree to receive communications from 7x CRM and understand that I can unsubscribe at any time. *
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
                                >
                                    Contact Sales Team
                                </button>
                            </form>
                        </div>

                        {/* Sales Information */}
                        <div className="space-y-8">
                            {/* Contact Information */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 border border-blue-200">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Get Direct Access</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Call Sales</p>
                                            <p className="text-gray-600">+1 (555) 123-SALES</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Email Sales</p>
                                            <p className="text-gray-600">sales@7xcrm.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Business Hours</p>
                                            <p className="text-gray-600">Mon-Fri: 8 AM - 8 PM PST</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Why Choose 7x CRM */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Why Choose 7x CRM?</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                            <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Easy Setup & Migration</p>
                                            <p className="text-sm text-gray-600">Get up and running in days, not months</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                            <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">24/7 Expert Support</p>
                                            <p className="text-sm text-gray-600">Dedicated support team whenever you need help</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                            <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Scalable Solutions</p>
                                            <p className="text-sm text-gray-600">Grows with your business from startup to enterprise</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                            <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">ROI Guarantee</p>
                                            <p className="text-sm text-gray-600">See measurable results within 90 days</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Success Stories */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-8 border border-green-200">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Success</h3>
                                <blockquote className="text-gray-700 mb-4">
                                    &ldquo;7x CRM transformed our sales process. We&apos;ve seen a 40% increase in conversion rates and saved 15 hours per week on administrative tasks.&rdquo;
                                </blockquote>
                                <div className="flex items-center">
                                    <div className="h-12 w-12 bg-gray-300 rounded-full mr-4"></div>
                                    <div>
                                        <p className="font-medium text-gray-900">Sarah Johnson</p>
                                        <p className="text-sm text-gray-600">VP of Sales, TechCorp</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="bg-blue-600 rounded-lg p-6 text-center">
                                <h3 className="text-lg font-semibold text-white mb-2">Ready to get started?</h3>
                                <p className="text-blue-100 mb-4">Schedule a personalized demo today</p>
                                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                                    Book Demo Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}