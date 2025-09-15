export interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    company?: string;
    joinDate?: string;
    totalSpent?: string;
    source?: string;
    referrer?: string;
    notes?: string;
}

export interface CustomerForSubscription extends Customer {
    subscriptionPackage?: string;
    marketingService?: string;
    status?: string;
    startedDate?: string;
    totalAmount?: string;
}

export interface CustomerForMarketing extends Customer {
    assignedAssistant?: string;
    serviceType?: string;
    campaignStatus?: string;
}
