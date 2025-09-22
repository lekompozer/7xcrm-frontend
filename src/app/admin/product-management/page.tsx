'use client';

import { useState } from 'react';
import {
    PlusIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import AddProductModal from './components/AddProductModal';

interface Product {
    id: string;
    productName: string;
    productId: string;
    branch: string;
    yearOfContribution: number;
    premiumMode: string;
    premiumPayment: number;
    targetPremium: number;
    faceAmount: number;
    description: string;
    status: 'Active' | 'Inactive' | 'Discontinued';
    createdAt: string;
}

export default function ProductManagementPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showNewProductModal, setShowNewProductModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBranch, setSelectedBranch] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedPremiumMode, setSelectedPremiumMode] = useState('all');

    const itemsPerPage = 10;

    // New Product State
    const [newProduct, setNewProduct] = useState({
        productName: '',
        productId: '',
        branch: '',
        yearOfContribution: new Date().getFullYear(),
        premiumMode: '',
        premiumPayment: 0,
        targetPremium: 0,
        faceAmount: 0,
        description: '',
        status: 'Active'
    });

    // Sample products data (Life Insurance products in US)
    const [products, setProducts] = useState<Product[]>([
        {
            id: '1',
            productName: 'Indexed Universal Life (IUL)',
            productId: 'IUL-001',
            branch: 'Life Insurance',
            yearOfContribution: 2023,
            premiumMode: 'Annual',
            premiumPayment: 12000,
            targetPremium: 15000,
            faceAmount: 500000,
            description: 'Indexed Universal Life insurance with market-linked growth potential',
            status: 'Active',
            createdAt: '2023-01-15'
        },
        {
            id: '2',
            productName: 'Flex Life II',
            productId: 'FL2-002',
            branch: 'Life Insurance',
            yearOfContribution: 2022,
            premiumMode: 'Monthly',
            premiumPayment: 850,
            targetPremium: 1000,
            faceAmount: 250000,
            description: 'Flexible premium universal life insurance with guaranteed minimum interest',
            status: 'Active',
            createdAt: '2022-06-20'
        },
        {
            id: '3',
            productName: 'Whole Life Premium',
            productId: 'WLP-003',
            branch: 'Life Insurance',
            yearOfContribution: 2024,
            premiumMode: 'Annual',
            premiumPayment: 8500,
            targetPremium: 10000,
            faceAmount: 300000,
            description: 'Traditional whole life insurance with guaranteed cash value growth',
            status: 'Active',
            createdAt: '2024-02-10'
        },
        {
            id: '4',
            productName: 'Term Life 20',
            productId: 'TL20-004',
            branch: 'Life Insurance',
            yearOfContribution: 2023,
            premiumMode: 'Monthly',
            premiumPayment: 125,
            targetPremium: 150,
            faceAmount: 1000000,
            description: '20-year level term life insurance with conversion options',
            status: 'Active',
            createdAt: '2023-09-05'
        },
        {
            id: '5',
            productName: 'Variable Universal Life',
            productId: 'VUL-005',
            branch: 'Life Insurance',
            yearOfContribution: 2021,
            premiumMode: 'Quarterly',
            premiumPayment: 2500,
            targetPremium: 3000,
            faceAmount: 750000,
            description: 'Variable universal life with investment sub-accounts',
            status: 'Discontinued',
            createdAt: '2021-11-30'
        },
        {
            id: '6',
            productName: 'Guaranteed Universal Life',
            productId: 'GUL-006',
            branch: 'Life Insurance',
            yearOfContribution: 2024,
            premiumMode: 'Annual',
            premiumPayment: 5500,
            targetPremium: 6000,
            faceAmount: 400000,
            description: 'Guaranteed universal life insurance with no-lapse guarantee',
            status: 'Active',
            createdAt: '2024-01-12'
        },
        {
            id: '7',
            productName: 'Final Expense Life',
            productId: 'FEL-007',
            branch: 'Life Insurance',
            yearOfContribution: 2023,
            premiumMode: 'Monthly',
            premiumPayment: 85,
            targetPremium: 100,
            faceAmount: 25000,
            description: 'Final expense whole life insurance for seniors',
            status: 'Active',
            createdAt: '2023-03-25'
        },
        {
            id: '8',
            productName: 'Survivorship Life',
            productId: 'SL-008',
            branch: 'Life Insurance',
            yearOfContribution: 2022,
            premiumMode: 'Annual',
            premiumPayment: 18000,
            targetPremium: 20000,
            faceAmount: 2000000,
            description: 'Second-to-die life insurance for estate planning',
            status: 'Active',
            createdAt: '2022-08-15'
        }
    ]);

    // Filter products based on search and filters
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesBranch = selectedBranch === 'all' || product.branch === selectedBranch;
        const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
        const matchesPremiumMode = selectedPremiumMode === 'all' || product.premiumMode === selectedPremiumMode;

        return matchesSearch && matchesBranch && matchesStatus && matchesPremiumMode;
    });

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            'Active': 'bg-green-100 text-green-800',
            'Inactive': 'bg-yellow-100 text-yellow-800',
            'Discontinued': 'bg-red-100 text-red-800'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
                {status}
            </span>
        );
    };

    // Handle new product form
    const handleProductChange = (field: string, value: string | number) => {
        setNewProduct(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddProduct = () => {
        setShowNewProductModal(true);
    };

    const handleCloseModal = () => {
        setShowNewProductModal(false);
        // Reset form
        setNewProduct({
            productName: '',
            productId: '',
            branch: '',
            yearOfContribution: new Date().getFullYear(),
            premiumMode: '',
            premiumPayment: 0,
            targetPremium: 0,
            faceAmount: 0,
            description: '',
            status: 'Active'
        });
    };

    const handleSubmitProduct = () => {
        // Generate new ID
        const newId = (products.length + 1).toString();

        // Create new product
        const productToAdd: Product = {
            id: newId,
            productName: newProduct.productName,
            productId: newProduct.productId,
            branch: newProduct.branch,
            yearOfContribution: newProduct.yearOfContribution,
            premiumMode: newProduct.premiumMode,
            premiumPayment: newProduct.premiumPayment,
            targetPremium: newProduct.targetPremium,
            faceAmount: newProduct.faceAmount,
            description: newProduct.description,
            status: newProduct.status as 'Active' | 'Inactive' | 'Discontinued',
            createdAt: new Date().toISOString().split('T')[0]
        };

        // Add to products list
        setProducts(prev => [productToAdd, ...prev]);

        // Close modal and reset form
        handleCloseModal();
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                    <p className="text-gray-600 mt-2">Manage your life insurance products and policies</p>
                </div>
                <button
                    onClick={handleAddProduct}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    <span>New Product</span>
                </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        <FunnelIcon className="h-5 w-5" />
                        <span>Filters</span>
                    </button>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                                <select
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="all">All Branches</option>
                                    <option value="Life Insurance">Life Insurance</option>
                                    <option value="Health Insurance">Health Insurance</option>
                                    <option value="Disability Insurance">Disability Insurance</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Discontinued">Discontinued</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Premium Mode</label>
                                <select
                                    value={selectedPremiumMode}
                                    onChange={(e) => setSelectedPremiumMode(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="all">All Modes</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Annual">Annual</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Branch
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Year
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Premium Mode
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Premium Payment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Target Premium
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Face Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{product.productName}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.productId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.branch}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.yearOfContribution}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.premiumMode}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatCurrency(product.premiumPayment)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatCurrency(product.targetPremium)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatCurrency(product.faceAmount)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(product.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <EyeIcon className="h-4 w-4" />
                                            </button>
                                            <button className="text-green-600 hover:text-green-900">
                                                <PencilIcon className="h-4 w-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                    <span className="font-medium">
                                        {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
                                    </span>{' '}
                                    of <span className="font-medium">{filteredProducts.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronLeftIcon className="h-5 w-5" />
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => {
                                        const page = index + 1;
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}
                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Product Modal */}
            <AddProductModal
                isOpen={showNewProductModal}
                onClose={handleCloseModal}
                newProduct={newProduct}
                onProductChange={handleProductChange}
                onSubmit={handleSubmitProduct}
            />
        </div>
    );
}
