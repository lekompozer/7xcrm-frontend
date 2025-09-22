'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const features = [
    { name: 'Lead Management', href: '#lead-management' },
    { name: 'Marketing Automation', href: '#marketing-automation' },
    { name: 'Customer Analytics', href: '#customer-analytics' },
    { name: 'Sales Pipeline', href: '#sales-pipeline' },
    { name: 'Team Collaboration', href: '#team-collaboration' },
    { name: 'Reporting & Insights', href: '#reporting' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'vi', name: 'Tiếng Việt' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                7x CRM
              </Link>
            </div>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {/* Features Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>Features</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                {isFeaturesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    {features.map((feature, index) => (
                      <a
                        key={index}
                        href={feature.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      >
                        {feature.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <Link href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                Pricing
              </Link>

              {/* Resources Dropdown */}
              <div className="relative">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                  <span>Resources</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </div>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <GlobeAltIcon className="h-4 w-4" />
                  <span>{currentLanguage}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setCurrentLanguage(language.name);
                          setIsLanguageOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/app/home" className="text-gray-700 hover:text-blue-600 transition-colors">
                Sign In
              </Link>

              <Link
                href="/signup"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start for Free
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Supercharge Your Sales with 7x CRM
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            The all-in-one Customer Relationship Management platform that helps you manage leads, automate marketing, and close more deals faster than ever before.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Free Trial
            </Link>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="lead-management" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Grow Your Business
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you manage customers, automate processes, and drive revenue growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Lead Management',
                description: 'Capture, track, and nurture leads through your sales pipeline with advanced automation.',
                icon: '👥'
              },
              {
                title: 'Marketing Automation',
                description: 'Create targeted campaigns and automate follow-ups to convert more prospects.',
                icon: '🚀'
              },
              {
                title: 'Customer Analytics',
                description: 'Get deep insights into customer behavior and sales performance with detailed reports.',
                icon: '📊'
              },
              {
                title: 'Sales Pipeline',
                description: 'Visualize your sales process and identify bottlenecks to close deals faster.',
                icon: '💰'
              },
              {
                title: 'Team Collaboration',
                description: 'Work together seamlessly with shared contacts, notes, and real-time updates.',
                icon: '🤝'
              },
              {
                title: 'Integration Ready',
                description: 'Connect with your favorite tools and platforms for a unified workflow.',
                icon: '🔗'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$29',
                period: 'per month',
                features: ['Up to 1,000 contacts', '10,000 emails/month', '5 team members', 'Basic support'],
                popular: false
              },
              {
                name: 'Professional',
                price: '$59',
                period: 'per month',
                features: ['Up to 10,000 contacts', '50,000 emails/month', '25 team members', 'Priority support', 'Advanced analytics'],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '$119',
                period: 'per month',
                features: ['Unlimited contacts', 'Unlimited emails', 'Unlimited team members', '24/7 support', 'Custom integrations'],
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`border rounded-lg p-8 relative ${plan.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to 7x Your Sales?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using 7x CRM to grow their revenue.
          </p>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block"
          >
            Start Your Free Trial Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">7x CRM</h3>
              <p className="text-gray-400">
                The most powerful CRM for growing businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="/admin" className="hover:text-white">Admin</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 7x CRM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
