import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export default function Notification({
    message,
    type,
    isVisible,
    onClose,
    duration = 4000
}: NotificationProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                setTimeout(() => {
                    onClose();
                }, 300); // Wait for fade out animation
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}
            style={{ top: '80px' }}
        >
            <div
                className={`shadow-lg rounded-lg pointer-events-auto overflow-hidden ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: '500px' }}
            >
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-white">
                                {message}
                            </p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                            <button
                                className="inline-flex text-white hover:text-gray-200 focus:outline-none"
                                onClick={() => {
                                    setIsAnimating(false);
                                    setTimeout(() => {
                                        onClose();
                                    }, 300);
                                }}
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
