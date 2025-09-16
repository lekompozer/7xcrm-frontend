'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Lead } from '@/types/lead';

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'completed';
    priority: 'low' | 'medium' | 'high';
}

interface Appointment {
    id: string;
    title: string;
    date: string;
    time: string;
    type: 'call' | 'meeting' | 'presentation';
    status: 'scheduled' | 'completed' | 'cancelled';
}

interface Note {
    id: string;
    content: string;
    createdAt: string;
    author: string;
    type: 'general' | 'call' | 'meeting';
}

interface LeadActionPanelProps {
    isOpen: boolean;
    onClose: () => void;
    lead: Lead;
}

// Sample data - in real app this would come from API
const sampleTasks: Task[] = [
    {
        id: '1',
        title: 'Follow up call',
        description: 'Call to discuss premium package options',
        dueDate: '2024-01-20',
        status: 'pending',
        priority: 'high'
    },
    {
        id: '2',
        title: 'Send proposal',
        description: 'Email detailed proposal for business plan',
        dueDate: '2024-01-18',
        status: 'completed',
        priority: 'medium'
    }
];

const sampleAppointments: Appointment[] = [
    {
        id: '1',
        title: 'Initial consultation',
        date: '2024-01-22',
        time: '10:00 AM',
        type: 'meeting',
        status: 'scheduled'
    },
    {
        id: '2',
        title: 'Product demo',
        date: '2024-01-15',
        time: '2:00 PM',
        type: 'presentation',
        status: 'completed'
    }
];

const sampleNotes: Note[] = [
    {
        id: '1',
        content: 'Very interested in premium features, budget approved by management',
        createdAt: '2024-01-15 14:30',
        author: 'John Smith',
        type: 'call'
    },
    {
        id: '2',
        content: 'Requested additional information about implementation timeline',
        createdAt: '2024-01-14 09:15',
        author: 'Sarah Johnson',
        type: 'meeting'
    }
];

export default function LeadActionPanel({ isOpen, onClose, lead }: LeadActionPanelProps) {
    const [activeTab, setActiveTab] = useState<'tasks' | 'appointments' | 'notes'>('tasks');
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 50);
        } else {
            setIsAnimating(false);
            setTimeout(() => setIsVisible(false), 350);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-50';
            case 'medium': return 'text-yellow-600 bg-yellow-50';
            case 'low': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-50';
            case 'pending': return 'text-blue-600 bg-blue-50';
            case 'scheduled': return 'text-blue-600 bg-blue-50';
            case 'cancelled': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'call': return '📞';
            case 'meeting': return '🤝';
            case 'presentation': return '📊';
            case 'general': return '📝';
            default: return '📄';
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Invisible Backdrop for click-to-close */}
            <div
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            ></div>

            {/* Panel */}
            <div className={`absolute right-0 top-0 h-full w-96 bg-white/90 backdrop-blur-md shadow-2xl border-l border-gray-200/50 flex flex-col transform transition-all duration-300 ease-in-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {/* Avatar */}
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                                {lead.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">{lead.name}</h2>
                                <p className="text-sm text-gray-500">{lead.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-all duration-200 p-1 hover:bg-gray-100 rounded-full hover:shadow-md"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-gray-50/80 backdrop-blur-sm relative">
                    <nav className="flex relative">
                        {/* Animated Border */}
                        <div
                            className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out z-20"
                            style={{
                                width: '33.333%',
                                transform: `translateX(${activeTab === 'tasks' ? '0%' :
                                    activeTab === 'appointments' ? '100%' : '200%'
                                    })`
                            }}
                        />

                        {[
                            { key: 'tasks', label: 'Tasks' },
                            { key: 'appointments', label: 'Appointments' },
                            { key: 'notes', label: 'Notes' }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as 'tasks' | 'appointments' | 'notes')}
                                className={`flex-1 px-4 py-3 text-sm font-medium relative transition-all duration-300 ease-in-out border-b border-gray-200/50 ${activeTab === tab.key
                                    ? 'text-blue-600 bg-white/90 backdrop-blur-sm shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-white/50 backdrop-blur-sm'
                                    }`}
                            >
                                <span className="relative z-10">{tab.label}</span>
                                {activeTab === tab.key && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-blue-100/30 transition-opacity duration-300"></div>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {activeTab === 'tasks' && (
                        <div className="p-6">
                            {/* Section Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-lg font-bold text-gray-900">Tasks</h3>
                                    <button className="flex items-center space-x-1 px-2 py-1 border border-blue-200 rounded-md text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                                        <PlusIcon className="h-4 w-4" />
                                        <span className="text-sm font-medium">New</span>
                                    </button>
                                </div>
                                <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium">
                                    View All
                                </button>
                            </div>

                            {/* Tasks List */}
                            <div className="space-y-3">
                                {sampleTasks.map((task) => (
                                    <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-medium text-gray-900">{task.title}</h4>
                                            <div className="flex space-x-2">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                                                    {task.priority}
                                                </span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                                                    {task.status}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                        <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'appointments' && (
                        <div className="p-6">
                            {/* Section Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-lg font-bold text-gray-900">Appointments</h3>
                                    <button className="flex items-center space-x-1 px-2 py-1 border border-blue-200 rounded-md text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                                        <PlusIcon className="h-4 w-4" />
                                        <span className="text-sm font-medium">New</span>
                                    </button>
                                </div>
                                <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium">
                                    View All
                                </button>
                            </div>

                            {/* Appointments List */}
                            <div className="space-y-3">
                                {sampleAppointments.map((appointment) => (
                                    <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg">{getTypeIcon(appointment.type)}</span>
                                                <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                                                {appointment.status}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <p>{appointment.date} at {appointment.time}</p>
                                            <p className="capitalize">{appointment.type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'notes' && (
                        <div className="p-6">
                            {/* Section Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-lg font-bold text-gray-900">Notes</h3>
                                    <button className="flex items-center space-x-1 px-2 py-1 border border-blue-200 rounded-md text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                                        <PlusIcon className="h-4 w-4" />
                                        <span className="text-sm font-medium">New</span>
                                    </button>
                                </div>
                                <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium">
                                    View All
                                </button>
                            </div>

                            {/* Notes List */}
                            <div className="space-y-3">
                                {sampleNotes.map((note) => (
                                    <div key={note.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg">{getTypeIcon(note.type)}</span>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{note.author}</p>
                                                    <p className="text-xs text-gray-500">{note.createdAt}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-700">{note.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
