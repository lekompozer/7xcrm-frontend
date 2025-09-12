export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
    lastLogin?: string;
    createdAt: string;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    subscriptionStatus: 'active' | 'cancelled' | 'pending';
    joinDate: string;
    totalSpent: string;
}

export interface Subscription {
    id: number;
    customerName: string;
    email: string;
    plan: string;
    status: 'active' | 'cancelled' | 'expired';
    startDate: string;
    nextBilling: string;
    amount: string;
}

export interface MarketingAssistant {
    id: number;
    name: string;
    description: string;
    status: 'active' | 'paused' | 'stopped';
    subscribers: number;
    campaigns: number;
    openRate: string;
    clickRate: string;
    lastActivity: string;
}

export interface PaymentAccount {
    id: number;
    name: string;
    type: string;
    status: 'active' | 'inactive';
    lastTransaction: string;
    monthlyVolume: string;
    successRate: string;
}

export interface Transaction {
    id: number;
    customer: string;
    amount: string;
    status: 'success' | 'failed' | 'pending';
    method: string;
    date: string;
}
