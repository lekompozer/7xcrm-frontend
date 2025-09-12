import { XMarkIcon } from '@heroicons/react/24/outline';

interface NewAssistant {
    name: string;
    email: string;
    specialization: string;
    phoneNumber: string;
    status: 'Active' | 'Inactive';
}

interface AddAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: () => void;
    newAssistant: NewAssistant;
    setNewAssistant: React.Dispatch<React.SetStateAction<NewAssistant>>;
}

export default function AddAssistantModal({
    isOpen,
    onClose,
    onAdd,
    newAssistant,
    setNewAssistant
}: AddAssistantModalProps) {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newAssistant.name && newAssistant.email && newAssistant.specialization) {
            onAdd();
        }
    };

    const specializations = [
        'Social Media Marketing',
        'Content Marketing',
        'Email Marketing',
        'SEO & Analytics',
        'Paid Advertising',
        'Brand Strategy',
        'Marketing Automation',
        'Conversion Optimization',
        'Video Marketing',
        'Influencer Marketing'
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Add New Assistant</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={newAssistant.name}
                            onChange={(e) => setNewAssistant({ ...newAssistant, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter assistant's full name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            value={newAssistant.email}
                            onChange={(e) => setNewAssistant({ ...newAssistant, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email address"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={newAssistant.phoneNumber}
                            onChange={(e) => setNewAssistant({ ...newAssistant, phoneNumber: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Specialization *
                        </label>
                        <select
                            value={newAssistant.specialization}
                            onChange={(e) => setNewAssistant({ ...newAssistant, specialization: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select specialization</option>
                            {specializations.map((spec) => (
                                <option key={spec} value={spec}>
                                    {spec}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={newAssistant.status}
                            onChange={(e) => setNewAssistant({ ...newAssistant, status: e.target.value as 'Active' | 'Inactive' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            Add Assistant
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
