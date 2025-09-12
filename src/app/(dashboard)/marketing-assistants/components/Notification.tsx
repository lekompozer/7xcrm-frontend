import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
}

export default function Notification({ message, type, isVisible }: NotificationProps) {
    if (!isVisible) return null;

    return (
        <div className="fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out"
            style={{ top: '80px' }}>
            <div className={`flex items-center p-4 rounded-md shadow-lg max-w-md ${type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                {type === 'success' ? (
                    <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                ) : (
                    <XCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{message}</span>
            </div>
        </div>
    );
}
