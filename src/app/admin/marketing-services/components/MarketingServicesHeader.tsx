interface MarketingServicesHeaderProps {
    onAddCustomer: () => void;
    onShowDeactivatedList: () => void;
}

export default function MarketingServicesHeader({
    onAddCustomer,
    onShowDeactivatedList
}: MarketingServicesHeaderProps) {
    return (
        <div className="mb-8 flex justify-between items-start">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Marketing Services</h1>
                <p className="text-gray-600">Manage customers who subscribed to marketing assistant services</p>
            </div>
            <div className="flex space-x-3">
                <button
                    onClick={onShowDeactivatedList}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
                >
                    Deactivated List
                </button>
                <button
                    onClick={onAddCustomer}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                    Add Customer
                </button>
            </div>
        </div>
    );
}
