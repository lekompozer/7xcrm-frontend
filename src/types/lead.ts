export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    workPhone?: string;
    company?: string;
    position?: string;
    leadType: 'Individual' | 'Business' | 'Partner';
    stage: 'New' | 'Contacted' | 'Consulted' | 'Quote' | 'Closed' | 'Lost';
    status: 'Cold' | 'Unidentified' | 'Follow Later' | 'Interest' | 'Hot Interest' | 'Close' | 'Stop' | 'Re-buy' | 'Change Mind' | 'Denied';
    source: 'Website' | 'Social Media' | 'Referral' | 'Cold Call' | 'Email Campaign' | 'Event';
    owner: string;
    agent?: string;
    state?: string;
    dateAdded: string;
    birthday?: string;
    lastInteraction?: string;
    value?: number;
    notes?: string;
    address?: string;
}

export interface LeadStats {
    id: string;
    name: string;
    count: number;
    color: string;
    previousCount: number;
    period: string;
}

export interface LeadOverviewStats {
    totalLeads: number;
    newLeads: number;
    qualifiedLeads: number;
    convertedLeads: number;
    totalValue: number;
    averageValue: number;
    conversionRate: number;
    responseRate: number;
}

export interface LeadFilters {
    owner?: string;
    leadType?: string;
    stage?: string;
    status?: string;
    source?: string;
    dateAddedFrom?: string;
    dateAddedTo?: string;
    birthdayFrom?: string;
    birthdayTo?: string;
    interactionFrom?: string;
    interactionTo?: string;
}
