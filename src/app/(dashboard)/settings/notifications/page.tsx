'use client';

import { useState } from 'react';
import { PlusIcon, BellIcon, EnvelopeIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface NotificationTemplate {
    id: number;
    name: string;
    type: 'popup' | 'email';
    subject: string;
    content: string;
    triggerEvent: string;
    targetUsers: string[];
    status: 'active' | 'inactive';
    createdAt: string;
    emailTemplate?: File | null;
}

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    notification: NotificationTemplate | null;
    onSave: (notification: Omit<NotificationTemplate, 'id' | 'createdAt'>) => void;
}

function NotificationModal({ isOpen, onClose, notification, onSave }: NotificationModalProps) {
    const [formData, setFormData] = useState({
        name: notification?.name || '',
        type: notification?.type || 'popup' as const,
        subject: notification?.subject || '',
        content: notification?.content || '',
        triggerEvent: notification?.triggerEvent || '',
        targetUsers: notification?.targetUsers || [],
        status: notification?.status || 'active' as const,
        emailTemplate: null as File | null
    });

    const [availableUsers] = useState([
        'All Users',
        'Trial Users',
        'Subscription Users',
        'Essential Package Users',
        'Standard Package Users',
        'Professional Package Users',
        'Elite Package Users',
        'Marketing Service Users',
        'Specific Users'
    ]);

    const [popupTriggerEvents] = useState([
        'Đăng nhập lần đầu tiên',
        'Hạn cuối của Trial',
        'Đăng nhập khi đã hết hạn Trial',
        'Thông báo vào thời gian cụ thể'
    ]);

    const [emailTriggerEvents] = useState([
        'Đăng ký tài khoản dùng thử (Trial Registration)',
        'Mua gói subscriptions thành công',
        'Hủy gói subscriptions',
        'Sử dụng Marketing Service (đăng ký hoặc hủy)',
        'Cập nhật hệ thống mới vào ngày giờ cụ thể',
        'Thông báo khác'
    ]);

    const [emailTargetUsers] = useState([
        '{Action_user}',
        'All Users',
        'Trial Users',
        'Subscription Users',
        'Essential Package Users',
        'Standard Package Users',
        'Professional Package Users',
        'Elite Package Users',
        'Marketing Service Users',
        'Specific Users'
    ]);

    const getTriggerEvents = () => {
        return formData.type === 'popup' ? popupTriggerEvents : emailTriggerEvents;
    };

    const getTargetUsers = () => {
        return formData.type === 'popup' ? availableUsers : emailTargetUsers;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
        setFormData({
            name: '',
            type: 'popup',
            subject: '',
            content: '',
            triggerEvent: '',
            targetUsers: [],
            status: 'active',
            emailTemplate: null
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, emailTemplate: file });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-2xl w-full mx-4 border border-gray-200 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {notification ? 'Edit Notification' : 'Add New Notification'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Notification Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'popup' | 'email' })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="popup">Popup Notification</option>
                                <option value="email">Email Notification</option>
                            </select>
                        </div>
                    </div>

                    {/* Subject (for email) */}
                    {formData.type === 'email' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Subject
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required={formData.type === 'email'}
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email Template Upload */}
                    {formData.type === 'email' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Template (Optional)
                            </label>
                            <input
                                type="file"
                                accept=".html,.htm"
                                onChange={handleFileUpload}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Upload HTML template file for custom email design
                            </p>
                        </div>
                    )}

                    {/* Trigger Event */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Trigger Event
                        </label>
                        <select
                            value={formData.triggerEvent}
                            onChange={(e) => setFormData({ ...formData, triggerEvent: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select trigger event</option>
                            {getTriggerEvents().map((event) => (
                                <option key={event} value={event}>{event}</option>
                            ))}
                        </select>
                    </div>

                    {/* Scheduled Time - Only for specific time notifications */}
                    {formData.triggerEvent === 'Thông báo vào thời gian cụ thể' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Scheduled Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Select date and time"
                            />
                        </div>
                    )}

                    {/* System Update Time - Only for system update notifications */}
                    {formData.triggerEvent === 'Cập nhật hệ thống mới vào ngày giờ cụ thể' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                System Update Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Select system update time"
                            />
                        </div>
                    )}

                    {/* Target Users */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target Users
                        </label>
                        <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-3">
                            {getTargetUsers().map((user) => (
                                <label key={user} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.targetUsers.includes(user)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFormData({
                                                    ...formData,
                                                    targetUsers: [...formData.targetUsers, user]
                                                });
                                            } else {
                                                setFormData({
                                                    ...formData,
                                                    targetUsers: formData.targetUsers.filter(u => u !== user)
                                                });
                                            }
                                        }}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{user}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {notification ? 'Update' : 'Create'} Notification
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<NotificationTemplate[]>([
        {
            id: 1,
            name: 'Welcome New User',
            type: 'email',
            subject: 'Welcome to 7x CRM',
            content: 'Welcome to our platform! We are excited to have you on board.',
            triggerEvent: 'Đăng ký tài khoản dùng thử (Trial Registration)',
            targetUsers: ['All Users'],
            status: 'active',
            createdAt: '2024-01-15'
        },
        {
            id: 2,
            name: 'Trial Expiry Warning',
            type: 'popup',
            subject: '',
            content: 'Your trial will expire in 3 days. Please upgrade to continue using our services.',
            triggerEvent: 'Hạn cuối của Trial',
            targetUsers: ['Trial Users'],
            status: 'active',
            createdAt: '2024-01-10'
        },
        {
            id: 3,
            name: 'First Login Welcome',
            type: 'popup',
            subject: '',
            content: 'Welcome to 7x CRM! Let us guide you through the platform.',
            triggerEvent: 'Đăng nhập lần đầu tiên',
            targetUsers: ['All Users'],
            status: 'active',
            createdAt: '2024-01-12'
        },
        {
            id: 4,
            name: 'Subscription Success',
            type: 'email',
            subject: 'Subscription Activated Successfully',
            content: 'Thank you for subscribing! Your account has been upgraded.',
            triggerEvent: 'Mua gói subscriptions thành công',
            targetUsers: ['{Action_user}'],
            status: 'active',
            createdAt: '2024-01-08'
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingNotification, setEditingNotification] = useState<NotificationTemplate | null>(null);

    const handleAddNotification = () => {
        setEditingNotification(null);
        setShowModal(true);
    };

    const handleEditNotification = (notification: NotificationTemplate) => {
        setEditingNotification(notification);
        setShowModal(true);
    };

    const handleDeleteNotification = (id: number) => {
        if (confirm('Are you sure you want to delete this notification?')) {
            setNotifications(notifications.filter(n => n.id !== id));
        }
    };

    const handleSaveNotification = (notificationData: Omit<NotificationTemplate, 'id' | 'createdAt'>) => {
        if (editingNotification) {
            // Update existing
            setNotifications(notifications.map(n =>
                n.id === editingNotification.id
                    ? { ...notificationData, id: editingNotification.id, createdAt: editingNotification.createdAt }
                    : n
            ));
        } else {
            // Add new
            const newNotification: NotificationTemplate = {
                ...notificationData,
                id: Math.max(...notifications.map(n => n.id)) + 1,
                createdAt: new Date().toISOString().split('T')[0]
            };
            setNotifications([...notifications, newNotification]);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notification Management</h1>
                    <p className="text-gray-600">Manage popup notifications and email templates</p>
                </div>
                <button
                    onClick={handleAddNotification}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    Add Notification
                </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <BellIcon className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                            <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <EnvelopeIcon className="h-8 w-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Email Templates</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {notifications.filter(n => n.type === 'email').length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <BellIcon className="h-8 w-8 text-orange-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Notifications</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {notifications.filter(n => n.status === 'active').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Notification Templates</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trigger Event
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Target Users
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
                            {notifications.map((notification) => (
                                <tr key={notification.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {notification.type === 'email' ? (
                                                <EnvelopeIcon className="h-5 w-5 text-green-600 mr-3" />
                                            ) : (
                                                <BellIcon className="h-5 w-5 text-blue-600 mr-3" />
                                            )}
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {notification.name}
                                                </div>
                                                {notification.type === 'email' && (
                                                    <div className="text-sm text-gray-500">
                                                        {notification.subject}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${notification.type === 'email'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {notification.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {notification.triggerEvent}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {notification.targetUsers.join(', ')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${notification.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {notification.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditNotification(notification)}
                                                className="text-blue-600 hover:text-blue-900 p-1"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteNotification(notification.id)}
                                                className="text-red-600 hover:text-red-900 p-1"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Notification Modal */}
            <NotificationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                notification={editingNotification}
                onSave={handleSaveNotification}
            />
        </div>
    );
}
