'use client';

import React from 'react';
import Image from 'next/image';

export default function MarketingIntegrationPage() {
    return (
        <div className="w-full h-screen relative">
            <Image
                src="/marketing-integration.png"
                alt="Marketing Integration"
                fill
                className="object-cover"
                priority
            />
        </div>
    );
}