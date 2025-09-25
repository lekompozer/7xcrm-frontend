'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    attachments?: {
        name: string;
        type: 'image' | 'file';
        url: string;
    }[];
}

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: 'todo' | 'inprogress' | 'completed' | 'pending';
    priority: 'low' | 'medium' | 'high';
    assignedTo?: string;
    attachments?: string[];
    comments?: {
        id: string;
        author: string;
        authorType: 'customer' | 'assistant';
        content: string;
        timestamp: Date;
        avatar: string;
    }[];
}

interface Conversation {
    id: string;
    name: string;
    assistant: {
        name: string;
        type: string;
        avatar: string;
        status: 'online' | 'offline';
    };
    lastMessage: string;
    lastMessageTime: Date;
    unreadCount: number;
    messages: Message[];
    serviceStatus: 'pending' | 'active' | 'completed';
}

// Sample tasks data
const sampleTasks: Task[] = [
    {
        id: '1',
        title: 'Setup Facebook Campaign',
        description: 'Create and optimize Facebook ads for new product launch with target audience analysis',
        dueDate: '2025-09-25',
        status: 'inprogress',
        priority: 'high',
        assignedTo: 'Marketing Assistant - Ads',
        attachments: ['campaign-brief.pdf'],
        comments: [
            {
                id: '1',
                author: 'Marketing Assistant - Ads',
                authorType: 'assistant',
                content: 'Started initial setup for the campaign targeting parameters.',
                timestamp: new Date('2025-09-24T10:00:00'),
                avatar: '🎯'
            },
            {
                id: '2',
                author: 'John Customer',
                authorType: 'customer',
                content: 'Need approval for budget increase to $5000.',
                timestamp: new Date('2025-09-24T14:30:00'),
                avatar: 'JC'
            }
        ]
    },
    {
        id: '2',
        title: 'Content Calendar Planning',
        description: 'Plan social media content for October including holidays and special events',
        dueDate: '2025-09-23',
        status: 'completed',
        priority: 'medium',
        assignedTo: 'Marketing Assistant - Social',
        attachments: ['content-calendar.xlsx'],
        comments: [
            {
                id: '1',
                author: 'Marketing Assistant - Social',
                authorType: 'assistant',
                content: 'All content scheduled successfully across all platforms.',
                timestamp: new Date('2025-09-23T16:00:00'),
                avatar: '📱'
            }
        ]
    },
    {
        id: '3',
        title: 'Email Marketing Setup',
        description: 'Setup automated email sequences for new subscribers',
        dueDate: '2025-09-28',
        status: 'todo',
        priority: 'medium',
        assignedTo: 'Marketing Assistant - Email',
        attachments: [],
        comments: []
    },
    {
        id: '4',
        title: 'Performance Analysis Report',
        description: 'Generate monthly performance report for all marketing channels',
        dueDate: '2025-09-30',
        status: 'pending',
        priority: 'low',
        assignedTo: 'Marketing Assistant - Analytics',
        attachments: ['template.pptx'],
        comments: [
            {
                id: '1',
                author: 'Marketing Assistant - Analytics',
                authorType: 'assistant',
                content: 'Waiting for data access permissions from IT department.',
                timestamp: new Date('2025-09-24T09:00:00'),
                avatar: '📊'
            }
        ]
    }
];

export default function MarketingAssistantConversationsPage() {
    const [conversations, setConversations] = useState<Conversation[]>([
        {
            id: '1',
            name: 'Social Media Campaign',
            assistant: {
                name: 'Marketing Assistant - Social',
                type: 'MA-2 Social & Content',
                avatar: '📱',
                status: 'online'
            },
            lastMessage: 'Tôi đã hoàn thành việc lên lịch content cho tuần này. Bạn có muốn xem preview không?',
            lastMessageTime: new Date('2025-09-24T10:30:00'),
            unreadCount: 2,
            serviceStatus: 'pending',
            messages: [
                {
                    id: '1',
                    type: 'assistant',
                    content: 'Chào bạn! Tôi là Marketing Assistant chuyên về Social Media & Content. Tôi có thể giúp bạn quản lý fanpage, tạo content và lên lịch đăng bài.',
                    timestamp: new Date('2025-09-24T09:00:00')
                },
                {
                    id: '2',
                    type: 'user',
                    content: 'Tôi cần lên lịch content cho tuần này',
                    timestamp: new Date('2025-09-24T09:15:00')
                },
                {
                    id: '3',
                    type: 'assistant',
                    content: 'Tôi đã hoàn thành việc lên lịch content cho tuần này. Bạn có muốn xem preview không?',
                    timestamp: new Date('2025-09-24T10:30:00')
                }
            ]
        },
        {
            id: '2',
            name: 'Performance Ads Setup',
            assistant: {
                name: 'Marketing Assistant - Ads',
                type: 'MA-3 Performance Ads',
                avatar: '🎯',
                status: 'online'
            },
            lastMessage: 'Campaign Facebook Ads đã được setup và đang chạy thử nghiệm.',
            lastMessageTime: new Date('2025-09-24T14:20:00'),
            unreadCount: 0,
            serviceStatus: 'active',
            messages: [
                {
                    id: '1',
                    type: 'assistant',
                    content: 'Xin chào! Tôi là Marketing Assistant chuyên về Performance Ads. Tôi sẽ giúp bạn tối ưu các campaign quảng cáo để đạt hiệu quả cao nhất.',
                    timestamp: new Date('2025-09-24T13:00:00')
                },
                {
                    id: '2',
                    type: 'user',
                    content: 'Tôi cần setup campaign Facebook Ads cho sản phẩm mới',
                    timestamp: new Date('2025-09-24T13:30:00')
                },
                {
                    id: '3',
                    type: 'assistant',
                    content: 'Campaign Facebook Ads đã được setup và đang chạy thử nghiệm.',
                    timestamp: new Date('2025-09-24T14:20:00')
                }
            ]
        }
    ]);

    const [activeConversationId, setActiveConversationId] = useState<string>('1');
    const [inputMessage, setInputMessage] = useState('');
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [activeTaskStatus, setActiveTaskStatus] = useState<'todo' | 'inprogress' | 'completed' | 'pending'>('todo');
    const [showTaskDetail, setShowTaskDetail] = useState<string | null>(null);
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);
    const [newTaskAttachments, setNewTaskAttachments] = useState<File[]>([]);
    const [editTaskMode, setEditTaskMode] = useState(false);
    const [newComment, setNewComment] = useState('');

    // State for scroll position
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [openTaskDropdown, setOpenTaskDropdown] = useState<string | null>(null);

    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
        }
    };

    const scrollTabs = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200; // pixels to scroll
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const handleResize = () => checkScrollPosition();
        window.addEventListener('resize', handleResize);

        // Close dropdown when clicking outside
        const handleClickOutside = () => {
            if (openTaskDropdown) {
                setOpenTaskDropdown(null);
            }
        };

        // Close popups when pressing ESC key
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (showTaskDetail) {
                    setShowTaskDetail(null);
                } else if (showNewTaskForm) {
                    setShowNewTaskForm(false);
                    setNewTaskAttachments([]);
                }
            }
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [openTaskDropdown, showTaskDetail, showNewTaskForm]);

    const activeConversation = conversations.find(conv => conv.id === activeConversationId);
    const messages = activeConversation?.messages || [];

    const handleSendMessage = () => {
        if (!inputMessage.trim() || !activeConversation) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputMessage,
            timestamp: new Date()
        };

        setConversations(prev => prev.map(conv =>
            conv.id === activeConversationId
                ? {
                    ...conv,
                    messages: [...conv.messages, newMessage],
                    lastMessage: inputMessage,
                    lastMessageTime: new Date()
                }
                : conv
        ));

        setInputMessage('');
        setAttachedFiles([]); // Clear attached files after sending

        setTimeout(() => {
            const assistantResponse: Message = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: `Tôi đã nhận được yêu cầu của bạn về "${inputMessage}". Hãy để tôi phân tích và đưa ra gợi ý phù hợp nhất.`,
                timestamp: new Date()
            };

            setConversations(prev => prev.map(conv =>
                conv.id === activeConversationId
                    ? {
                        ...conv,
                        messages: [...conv.messages, assistantResponse],
                        lastMessage: assistantResponse.content,
                        lastMessageTime: new Date()
                    }
                    : conv
            ));
        }, 1000);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newFiles = Array.from(files);
        setAttachedFiles(prev => [...prev, ...newFiles]);
    };

    const removeAttachedFile = (index: number) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="flex relative" style={{ height: 'calc(100vh - 100px)' }}>
            {/* Conversations List */}
            <div className="w-80 bg-white border-r border-gray-200 h-full flex flex-col">
                <div className="p-6 border-b border-gray-200 flex-shrink-0">
                    <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
                    <p className="text-sm text-gray-600 mt-1">Marketing Assistants you&apos;re subscribed to</p>
                </div>
                <div className="flex-1 divide-y divide-gray-200 overflow-y-auto pb-20">
                    {conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => setActiveConversationId(conversation.id)}
                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${activeConversationId === conversation.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                }`}
                        >
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 relative">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl">
                                        {conversation.assistant.avatar}
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${conversation.assistant.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                        }`}></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium text-gray-900 text-sm truncate">
                                                    {conversation.name}
                                                </h3>
                                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${conversation.serviceStatus === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : conversation.serviceStatus === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {conversation.serviceStatus === 'active' ? 'Active' :
                                                        conversation.serviceStatus === 'pending' ? 'Pending' : 'Completed'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">
                                                {conversation.assistant.type}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs text-gray-500">
                                                {conversation.lastMessageTime.toLocaleTimeString('vi-VN', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                            {conversation.unreadCount > 0 && (
                                                <span className="mt-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                                                    {conversation.unreadCount}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600 truncate">
                                        {conversation.lastMessage}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 h-full bg-white flex flex-col">
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                                {activeConversation?.assistant.avatar || '🤖'}
                            </div>
                            <div className="ml-4">
                                <div className="flex items-center space-x-3">
                                    <h1 className="text-lg font-semibold text-gray-900">
                                        {activeConversation?.assistant.name || 'Marketing Assistant'}
                                    </h1>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${activeConversation?.serviceStatus === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : activeConversation?.serviceStatus === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {activeConversation?.serviceStatus === 'active' ? 'Active' :
                                            activeConversation?.serviceStatus === 'pending' ? 'Pending' : 'Completed'}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <p className={`text-sm ${activeConversation?.assistant.status === 'online'
                                        ? 'text-green-600'
                                        : 'text-gray-500'
                                        }`}>
                                        ● {activeConversation?.assistant.status === 'online' ? 'Online' : 'Offline'} - {activeConversation?.assistant.name}
                                    </p>
                                    <span className="text-gray-300">•</span>
                                    <p className="text-sm text-gray-600">
                                        {activeConversation?.assistant.type}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowTaskModal(true)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            Marketing Tasks
                        </button>
                    </div>
                </div>

                {/* Scrollable Messages Area */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-lg px-4 py-3 ${message.type === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                                }`}>
                                <p className="text-sm">{message.content}</p>
                                <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                                    }`}>
                                    {message.timestamp.toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area at bottom of chat area */}
                <div className="px-6 py-4 bg-white border-t border-gray-200 flex-shrink-0">
                    {/* Attached files display area */}
                    {attachedFiles.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                            {attachedFiles.map((file, index) => (
                                <div key={index} className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm">
                                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {file.type.startsWith('image/') ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        )}
                                    </svg>
                                    <span className="mr-2 truncate max-w-32">{file.name}</span>
                                    <button
                                        onClick={() => removeAttachedFile(index)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Message input area */}
                    <div className="relative">
                        <div className="relative border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent" style={{ height: '116px' }}>
                            <textarea
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                placeholder="Type your message..."
                                className="w-full resize-none border-0 rounded-lg px-4 pt-3 pr-4 pb-2 focus:outline-none bg-transparent overflow-y-auto"
                                style={{
                                    height: '72px',
                                    lineHeight: '24px',
                                    maxHeight: '72px',
                                    minHeight: '24px'
                                }}
                                rows={1}
                            />
                        </div>                        {/* Bottom row with file icons and send button - Fixed at bottom */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between" style={{ height: '32px' }}>
                            {/* File upload icons */}
                            <div className="flex items-center space-x-3">
                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,*/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <div className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <div className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </label>
                            </div>

                            {/* Send button */}
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim()}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marketing Tasks Panel */}
            {showTaskModal && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/30 transition-opacity duration-300"
                        onClick={() => setShowTaskModal(false)}
                    ></div>

                    {/* Panel */}
                    <div className="absolute right-0 top-0 h-full w-96 bg-white/90 backdrop-blur-md shadow-2xl border-l border-gray-200/50 flex flex-col">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                        MT
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Marketing Tasks</h2>
                                        <p className="text-sm text-gray-500">Manage your marketing activities</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowTaskModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-all duration-200 p-1 hover:bg-gray-100 rounded-full hover:shadow-md"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Status Tabs - Horizontal Scroll */}
                        <div className="bg-gray-50/80 backdrop-blur-sm border-b border-gray-200/50">
                            <div className="px-6 py-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Tasks</h3>
                                    <button
                                        onClick={() => setShowNewTaskForm(true)}
                                        className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        New
                                    </button>
                                </div>

                                <div className="relative flex items-center">
                                    {/* Left Arrow */}
                                    {canScrollLeft && (
                                        <button
                                            onClick={() => scrollTabs('left')}
                                            className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:bg-white transition-colors"
                                            style={{ marginLeft: '-16px' }}
                                        >
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                    )}

                                    {/* Scrollable Container */}
                                    <div
                                        ref={scrollContainerRef}
                                        className="flex space-x-2 overflow-x-auto scrollbar-hide"
                                        onScroll={checkScrollPosition}
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {[
                                            { key: 'todo', label: 'To Do', count: sampleTasks.filter(t => t.status === 'todo').length },
                                            { key: 'inprogress', label: 'In Progress', count: sampleTasks.filter(t => t.status === 'inprogress').length },
                                            { key: 'completed', label: 'Completed', count: sampleTasks.filter(t => t.status === 'completed').length },
                                            { key: 'pending', label: 'Pending', count: sampleTasks.filter(t => t.status === 'pending').length }
                                        ].map((status) => {
                                            const getStatusColors = (statusKey: string, isActive: boolean) => {
                                                if (isActive) {
                                                    switch (statusKey) {
                                                        case 'todo':
                                                            return { bg: 'bg-gray-100', text: 'text-gray-700', countBg: 'bg-gray-200', countText: 'text-gray-800' };
                                                        case 'inprogress':
                                                            return { bg: 'bg-blue-100', text: 'text-blue-700', countBg: 'bg-blue-200', countText: 'text-blue-800' };
                                                        case 'completed':
                                                            return { bg: 'bg-green-100', text: 'text-green-700', countBg: 'bg-green-200', countText: 'text-green-800' };
                                                        case 'pending':
                                                            return { bg: 'bg-orange-100', text: 'text-orange-700', countBg: 'bg-orange-200', countText: 'text-orange-800' };
                                                        default:
                                                            return { bg: 'bg-gray-100', text: 'text-gray-700', countBg: 'bg-gray-200', countText: 'text-gray-800' };
                                                    }
                                                } else {
                                                    return { bg: 'bg-white/50', text: 'text-gray-600', countBg: 'bg-gray-200', countText: 'text-gray-600' };
                                                }
                                            };

                                            const colors = getStatusColors(status.key, activeTaskStatus === status.key);

                                            return (
                                                <button
                                                    key={status.key}
                                                    onClick={() => setActiveTaskStatus(status.key as 'todo' | 'inprogress' | 'completed' | 'pending')}
                                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${colors.bg} ${colors.text} ${activeTaskStatus === status.key ? 'shadow-sm' : 'hover:bg-white/80 hover:text-gray-800'}`}
                                                >
                                                    <span>{status.label}</span>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs ${colors.countBg} ${colors.countText}`}>
                                                        {status.count}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Right Arrow */}
                                    {canScrollRight && (
                                        <button
                                            onClick={() => scrollTabs('right')}
                                            className="absolute right-0 z-10 flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:bg-white transition-colors"
                                            style={{ marginRight: '-16px' }}
                                        >
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tasks List */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-3">
                                {sampleTasks
                                    .filter(task => task.status === activeTaskStatus)
                                    .map((task) => (
                                        <div
                                            key={task.id}
                                            onClick={() => setShowTaskDetail(task.id)}
                                            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-medium text-gray-900 flex-1 mr-2">{task.title}</h4>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${task.priority === 'high' ? 'text-red-600 bg-red-50' :
                                                        task.priority === 'medium' ? 'text-yellow-600 bg-yellow-50' :
                                                            'text-green-600 bg-green-50'
                                                        }`}>
                                                        {task.priority}
                                                    </span>
                                                    <span className={`px-2 py-1 text-xs rounded-full ${task.status === 'completed' ? 'text-green-600 bg-green-50' :
                                                        task.status === 'inprogress' ? 'text-blue-600 bg-blue-50' :
                                                            task.status === 'pending' ? 'text-yellow-600 bg-yellow-50' :
                                                                'text-gray-600 bg-gray-50'
                                                        }`}>
                                                        {task.status.replace('inprogress', 'in progress')}
                                                    </span>
                                                    <div className="relative">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setOpenTaskDropdown(openTaskDropdown === task.id ? null : task.id);
                                                            }}
                                                            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                                            </svg>
                                                        </button>

                                                        {/* Dropdown Menu */}
                                                        {openTaskDropdown === task.id && (
                                                            <div className="absolute right-0 top-8 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                                                <div className="py-1">
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setOpenTaskDropdown(null);
                                                                            // Add edit functionality here
                                                                            console.log('Edit task:', task.id);
                                                                        }}
                                                                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                                    >
                                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                        </svg>
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setOpenTaskDropdown(null);
                                                                            // Add delete functionality here
                                                                            console.log('Delete task:', task.id);
                                                                        }}
                                                                        className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                                    >
                                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{task.description}</p>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>Due: {task.dueDate}</span>
                                                {task.assignedTo && <span>Assigned: {task.assignedTo}</span>}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Task Detail Popup */}
            {showTaskDetail && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-60"
                    onClick={() => setShowTaskDetail(null)}
                >
                    <div
                        className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {(() => {
                            const task = sampleTasks.find(t => t.id === showTaskDetail);
                            if (!task) return null;

                            return (
                                <div>
                                    {/* Header */}
                                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => setEditTaskMode(!editTaskMode)}
                                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${editTaskMode
                                                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                        }`}
                                                >
                                                    <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    {editTaskMode ? 'Cancel' : 'Edit'}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setShowTaskDetail(null);
                                                        setEditTaskMode(false);
                                                    }}
                                                    className="text-gray-400 hover:text-gray-600"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Content Layout - Two Columns */}
                                    <div className="grid grid-cols-3 gap-0 flex-1 overflow-hidden">
                                        {/* Task Content - Left Side (2/3) */}
                                        <div className="col-span-2 px-6 py-4 space-y-4 overflow-y-auto">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-1">Title</label>
                                                {editTaskMode ? (
                                                    <input
                                                        type="text"
                                                        defaultValue={task.title}
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 font-medium">{task.title}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-1">Description</label>
                                                {editTaskMode ? (
                                                    <textarea
                                                        rows={3}
                                                        defaultValue={task.description}
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 font-medium">{task.description}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-1">Priority</label>
                                                    {editTaskMode ? (
                                                        <select
                                                            defaultValue={task.priority}
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            <option value="low">Low</option>
                                                            <option value="medium">Medium</option>
                                                            <option value="high">High</option>
                                                        </select>
                                                    ) : (
                                                        <span className={`inline-flex px-3 py-1 text-sm rounded-full ${task.priority === 'high' ? 'text-red-600 bg-red-50' :
                                                            task.priority === 'medium' ? 'text-yellow-600 bg-yellow-50' :
                                                                'text-green-600 bg-green-50'
                                                            }`}>
                                                            {task.priority}
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-1">Status</label>
                                                    {editTaskMode ? (
                                                        <select
                                                            defaultValue={task.status}
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            <option value="todo">To Do</option>
                                                            <option value="inprogress">In Progress</option>
                                                            <option value="completed">Completed</option>
                                                            <option value="pending">Pending</option>
                                                        </select>
                                                    ) : (
                                                        <span className={`inline-flex px-3 py-1 text-sm rounded-full ${task.status === 'completed' ? 'text-green-600 bg-green-50' :
                                                            task.status === 'inprogress' ? 'text-blue-600 bg-blue-50' :
                                                                task.status === 'pending' ? 'text-yellow-600 bg-yellow-50' :
                                                                    'text-gray-600 bg-gray-50'
                                                            }`}>
                                                            {task.status.replace('inprogress', 'in progress')}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-900 mb-1">Due Date</label>
                                                    {editTaskMode ? (
                                                        <input
                                                            type="date"
                                                            defaultValue={task.dueDate}
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    ) : (
                                                        <p className="text-gray-900 font-medium">{task.dueDate}</p>
                                                    )}
                                                </div>

                                                {task.assignedTo && (
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-900 mb-1">Assigned To</label>
                                                        {editTaskMode ? (
                                                            <input
                                                                type="text"
                                                                defaultValue={task.assignedTo}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />
                                                        ) : (
                                                            <p className="text-gray-900 font-medium">{task.assignedTo}</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {task.attachments && task.attachments.length > 0 && (
                                                <div className="bg-green-50/50 p-4 rounded-lg border border-green-200">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                                                    <div className="space-y-2">
                                                        {task.attachments.map((attachment, index) => (
                                                            <div key={index} className="flex items-center justify-between space-x-2 p-2 bg-white/70 rounded border border-green-300">
                                                                <div className="flex items-center space-x-2">
                                                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                                    </svg>
                                                                    <span className="text-sm text-gray-700">{attachment}</span>
                                                                </div>
                                                                <button
                                                                    onClick={() => {
                                                                        // Add delete attachment functionality here
                                                                        console.log('Delete attachment:', attachment);
                                                                    }}
                                                                    className="text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {editTaskMode && (
                                                        <div className="mt-2">
                                                            <input
                                                                type="file"
                                                                multiple
                                                                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {editTaskMode && (
                                                <div className="flex justify-end space-x-2 pt-4">
                                                    <button
                                                        onClick={() => setEditTaskMode(false)}
                                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            // Save logic here
                                                            setEditTaskMode(false);
                                                        }}
                                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Comments Section - Right Side (1/3) */}
                                        <div className="col-span-1 bg-gray-50 border-l border-gray-200 flex flex-col h-[calc(90vh-120px)]">
                                            <div className="px-4 py-4 border-b border-gray-300">
                                                <h4 className="text-lg font-bold text-gray-900">Comments</h4>
                                            </div>

                                            {/* Comments List - Scrollable */}
                                            <div className="flex-1 overflow-y-auto px-4 py-4">
                                                {task.comments && task.comments.length > 0 ? (
                                                    <div className="space-y-4">
                                                        {task.comments.map((comment, index) => (
                                                            <div key={comment.id || index} className={`flex ${comment.authorType === 'customer' ? 'justify-start' : 'justify-end'}`}>
                                                                <div className={`max-w-[85%] ${comment.authorType === 'customer' ? 'order-1' : 'order-2'}`}>
                                                                    <div className={`p-3 rounded-lg border ${comment.authorType === 'customer'
                                                                        ? 'bg-white border-gray-200'
                                                                        : 'bg-blue-50 border-blue-200'
                                                                        }`}>
                                                                        <div className={`flex items-start space-x-2 ${comment.authorType === 'assistant' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${comment.authorType === 'assistant'
                                                                                ? 'bg-blue-100 text-blue-600'
                                                                                : 'bg-green-100 text-green-600'
                                                                                }`}>
                                                                                {comment.avatar}
                                                                            </div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <div className={`flex items-center space-x-2 mb-1 ${comment.authorType === 'assistant' ? 'justify-end' : 'justify-start'}`}>
                                                                                    <p className="text-xs font-medium text-gray-900">{comment.author}</p>
                                                                                    <span className="text-xs text-gray-500">
                                                                                        {comment.timestamp.toLocaleDateString()}
                                                                                    </span>
                                                                                </div>
                                                                                <p className="text-sm text-gray-700">{comment.content}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center h-full">
                                                        <p className="text-sm text-gray-500 text-center">No comments yet</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Add Comment Input - Fixed at bottom */}
                                            <div className="px-4 py-4 border-t border-gray-300 bg-gray-50 mt-auto">
                                                <div className="flex items-end space-x-2">
                                                    <div className="flex-1">
                                                        <textarea
                                                            value={newComment}
                                                            onChange={(e) => setNewComment(e.target.value)}
                                                            rows={1}
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white"
                                                            placeholder="Type your comment..."
                                                            onInput={(e) => {
                                                                const target = e.target as HTMLTextAreaElement;
                                                                target.style.height = 'auto';
                                                                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                                                            }}
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            if (newComment.trim()) {
                                                                // Add comment logic here
                                                                console.log('Adding comment:', newComment);
                                                                setNewComment('');
                                                            }
                                                        }}
                                                        disabled={!newComment.trim()}
                                                        className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* New Task Form */}
            {showNewTaskForm && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-60"
                    onClick={() => {
                        setShowNewTaskForm(false);
                        setNewTaskAttachments([]);
                    }}
                >
                    <div
                        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Create New Task</h3>
                                <button
                                    onClick={() => setShowNewTaskForm(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <form className="px-6 py-4 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-1">Task Title</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter task title..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-1">Description</label>
                                <textarea
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Describe the task..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-1">Priority</label>
                                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-1">Assign to Marketing Assistant</label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select Assistant...</option>
                                    <option value="Marketing Assistant - Social">Marketing Assistant - Social</option>
                                    <option value="Marketing Assistant - Ads">Marketing Assistant - Ads</option>
                                    <option value="Marketing Assistant - Email">Marketing Assistant - Email</option>
                                    <option value="Marketing Assistant - Analytics">Marketing Assistant - Analytics</option>
                                </select>
                            </div>

                            {/* Attachments Section */}
                            <div className="bg-green-50/50 p-4 rounded-lg border border-green-200">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Attachments</label>

                                {/* Selected Files Display */}
                                {newTaskAttachments.length > 0 && (
                                    <div className="space-y-2 mb-3">
                                        {newTaskAttachments.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between space-x-2 p-2 bg-white/70 rounded border border-green-300">
                                                <div className="flex items-center space-x-2">
                                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                    </svg>
                                                    <span className="text-sm text-gray-700">{file.name}</span>
                                                    <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setNewTaskAttachments(prev => prev.filter((_, i) => i !== index));
                                                    }}
                                                    className="text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* File Input */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files || []);
                                            setNewTaskAttachments(prev => [...prev, ...files]);
                                        }}
                                        className="hidden"
                                        id="newTaskFileInput"
                                    />
                                    <label
                                        htmlFor="newTaskFileInput"
                                        className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50/70 transition-colors"
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            e.currentTarget.classList.add('border-green-400', 'bg-green-50/70');
                                        }}
                                        onDragLeave={(e) => {
                                            e.preventDefault();
                                            e.currentTarget.classList.remove('border-green-400', 'bg-green-50/70');
                                        }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            e.currentTarget.classList.remove('border-green-400', 'bg-green-50/70');
                                            const files = Array.from(e.dataTransfer.files);
                                            setNewTaskAttachments(prev => [...prev, ...files]);
                                        }}
                                    >
                                        <div className="text-center">
                                            <svg className="w-6 h-6 text-green-500 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="text-sm text-green-600">
                                                Click to upload files or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                PDF, DOC, XLS, PPT, TXT, Images (Max 10MB each)
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowNewTaskForm(false);
                                        setNewTaskAttachments([]);
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Create task logic here with attachments
                                        console.log('Creating task with attachments:', newTaskAttachments);
                                        setShowNewTaskForm(false);
                                        setNewTaskAttachments([]);
                                    }}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}