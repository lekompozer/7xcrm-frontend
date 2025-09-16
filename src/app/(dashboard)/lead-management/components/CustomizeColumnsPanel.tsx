'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

interface Column {
    id: string;
    name: string;
    width: number;
    visible: boolean;
    sticky: 'left' | 'right' | 'none';
    draggable: boolean;
}

interface CustomizeColumnsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    columns: Column[];
    onColumnsChange: (columns: Column[]) => void;
}

export default function CustomizeColumnsPanel({
    isOpen,
    onClose,
    columns,
    onColumnsChange
}: CustomizeColumnsPanelProps) {
    const [localColumns, setLocalColumns] = useState<Column[]>(columns);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setLocalColumns(columns);
    }, [columns]);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);

    const handleDragStart = (index: number) => {
        if (!localColumns[index].draggable) return;
        setDraggedItem(index);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        if (draggedItem === null || !localColumns[dropIndex].draggable) return;

        const newColumns = [...localColumns];
        const draggedColumn = newColumns[draggedItem];

        // Remove dragged item
        newColumns.splice(draggedItem, 1);

        // Insert at new position
        newColumns.splice(dropIndex, 0, draggedColumn);

        setLocalColumns(newColumns);
        setDraggedItem(null);
    };

    const handleVisibilityToggle = (index: number) => {
        const newColumns = [...localColumns];
        const column = newColumns[index];
        
        // Simply toggle visibility without moving position
        column.visible = !column.visible;
        
        setLocalColumns(newColumns);
    };

    const handleApply = () => {
        // When applying, ensure sticky columns (selection, lead, actions) are preserved
        const finalColumns = [...localColumns];
        
        // Find and remove Actions column
        const actionsIndex = finalColumns.findIndex(col => col.id === 'actions');
        let actionsColumn = null;
        if (actionsIndex !== -1) {
            actionsColumn = finalColumns.splice(actionsIndex, 1)[0];
        }
        
        // If Actions column exists, add it to the end
        if (actionsColumn) {
            finalColumns.push(actionsColumn);
        }
        
        // Ensure selection and lead columns are at the beginning and sticky
        const selectionIndex = finalColumns.findIndex(col => col.id === 'selection');
        const leadIndex = finalColumns.findIndex(col => col.id === 'lead');
        
        if (selectionIndex !== -1) {
            finalColumns[selectionIndex].visible = true;
            finalColumns[selectionIndex].sticky = 'left';
        }
        
        if (leadIndex !== -1) {
            finalColumns[leadIndex].visible = true;
            finalColumns[leadIndex].sticky = 'left';
        }
        
        onColumnsChange(finalColumns);
        onClose();
    };

    const handleReset = () => {
        // Reset to default configuration
        const defaultColumns: Column[] = [
            { id: 'selection', name: 'Selection', width: 50, visible: true, sticky: 'left', draggable: false },
            { id: 'lead', name: 'Lead', width: 220, visible: true, sticky: 'left', draggable: false },
            { id: 'leadId', name: 'Lead ID', width: 108, visible: true, sticky: 'none', draggable: true },
            { id: 'stage', name: 'Stage', width: 100, visible: true, sticky: 'none', draggable: true },
            { id: 'source', name: 'Source', width: 140, visible: true, sticky: 'none', draggable: true },
            { id: 'status', name: 'Status', width: 100, visible: true, sticky: 'none', draggable: true },
            { id: 'cellphone', name: 'Cellphone', width: 130, visible: true, sticky: 'none', draggable: true },
            { id: 'state', name: 'State', width: 120, visible: true, sticky: 'none', draggable: true },
            { id: 'leadType', name: 'Lead Type', width: 100, visible: true, sticky: 'none', draggable: true },
            { id: 'contactName', name: 'Contact Name', width: 200, visible: false, sticky: 'none', draggable: true },
            { id: 'workPhone', name: 'Work Phone', width: 130, visible: false, sticky: 'none', draggable: true },
            { id: 'agent', name: 'Agent', width: 150, visible: false, sticky: 'none', draggable: true },
            { id: 'owner', name: 'Owner', width: 150, visible: false, sticky: 'none', draggable: true },
            { id: 'cellphone2', name: 'Cellphone 2', width: 130, visible: false, sticky: 'none', draggable: true },
            { id: 'homePhone', name: 'Home Phone', width: 130, visible: false, sticky: 'none', draggable: true },
            { id: 'email', name: 'Email', width: 200, visible: false, sticky: 'none', draggable: true },
            { id: 'gender', name: 'Gender', width: 100, visible: false, sticky: 'none', draggable: true },
            { id: 'dateOfBirth', name: 'Date of Birth', width: 120, visible: false, sticky: 'none', draggable: true },
            { id: 'policyStatus', name: 'Policy Status', width: 120, visible: false, sticky: 'none', draggable: true },
            { id: 'leadTag', name: 'Lead Tag', width: 120, visible: false, sticky: 'none', draggable: true },
            { id: 'city', name: 'City', width: 120, visible: false, sticky: 'none', draggable: true },
            { id: 'usaCitizen', name: 'USA Citizen', width: 120, visible: false, sticky: 'none', draggable: true },
            { id: 'greenCard', name: 'Green Card', width: 120, visible: false, sticky: 'none', draggable: true },
            { id: 'driverLicense', name: 'Driver License', width: 130, visible: false, sticky: 'none', draggable: true },
            { id: 'actions', name: 'Actions', width: 120, visible: true, sticky: 'right', draggable: false },
        ];
        setLocalColumns(defaultColumns);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-40 overflow-hidden">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            ></div>

            {/* Slide-in Panel */}
            <div className={`absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-10 transform transition-all duration-300 ease-in-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                        <h2 className="text-lg font-semibold text-gray-900">Customize Columns</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-full"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-6 py-6 overflow-y-auto max-h-[calc(100vh-140px)]">
                        {/* Default Fields Section */}
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                Default Fields
                            </h3>
                            <div className="space-y-2">
                                {localColumns
                                    .map((column, index) => ({ column, originalIndex: index }))
                                    .filter(({ column }) => {
                                        // Default fields are visible by default, but exclude sticky columns
                                        const defaultFields = ['leadId', 'stage', 'source', 'status', 'cellphone', 'state', 'leadType'];
                                        return defaultFields.includes(column.id);
                                    })
                                    .map(({ column, originalIndex }) => (
                                        <div
                                            key={column.id}
                                            draggable={column.draggable}
                                            onDragStart={() => handleDragStart(originalIndex)}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, originalIndex)}
                                            className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg border-gray-200 border transition-all duration-200 ${column.draggable
                                                ? 'cursor-move hover:bg-white hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5'
                                                : 'opacity-75'
                                                } ${draggedItem === originalIndex ? 'opacity-50 shadow-lg scale-105' : ''}`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                {column.draggable && (
                                                    <Bars3Icon className="h-4 w-4 text-gray-400" />
                                                )}
                                                <div>
                                                    <div className="font-medium text-sm text-gray-900">
                                                        {column.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {column.width}px
                                                        {column.sticky !== 'none' && (
                                                            <span className="ml-1 text-blue-600">
                                                                • {column.sticky}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={column.visible}
                                                    onChange={() => handleVisibilityToggle(originalIndex)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Other Fields Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                                Other Fields
                            </h3>
                            <div className="space-y-2">
                                {localColumns
                                    .map((column, index) => ({ column, originalIndex: index }))
                                    .filter(({ column }) => {
                                        // Other fields are additional optional fields, exclude sticky columns
                                        const defaultFields = ['leadId', 'stage', 'source', 'status', 'cellphone', 'state', 'leadType'];
                                        const stickyFields = ['selection', 'lead', 'actions']; // These should not appear in customize panel
                                        return !defaultFields.includes(column.id) && !stickyFields.includes(column.id);
                                    })
                                    .map(({ column, originalIndex }) => (
                                        <div
                                            key={column.id}
                                            draggable={column.draggable}
                                            onDragStart={() => handleDragStart(originalIndex)}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, originalIndex)}
                                            className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg border-gray-200 border transition-all duration-200 ${column.draggable
                                                ? 'cursor-move hover:bg-white hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5'
                                                : 'opacity-75'
                                                } ${draggedItem === originalIndex ? 'opacity-50 shadow-lg scale-105' : ''}`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                {column.draggable && (
                                                    <Bars3Icon className="h-4 w-4 text-gray-400" />
                                                )}
                                                <div>
                                                    <div className="font-medium text-sm text-gray-900">
                                                        {column.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {column.width}px
                                                        {column.sticky !== 'none' && (
                                                            <span className="ml-1 text-blue-600">
                                                                • {column.sticky}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={column.visible}
                                                    onChange={() => handleVisibilityToggle(originalIndex)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-200 bg-gray-50">
                        <div className="flex space-x-3">
                            <button
                                onClick={handleReset}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Reset to Default
                            </button>
                            <button
                                onClick={handleApply}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Apply Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
