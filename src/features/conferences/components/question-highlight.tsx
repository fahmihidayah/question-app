'use client';

import { Question } from "@/payload-types";
import { X, User } from "lucide-react";
import { useEffect } from "react";

interface QuestionHighlightProps {
    question: Question | null;
    isOpen: boolean;
    onClose: () => void;
    formatDate: (dateString: string | null | undefined) => string;
}

export default function QuestionHighlight({ 
    question, 
    isOpen, 
    onClose, 
    formatDate 
}: QuestionHighlightProps) {
    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !question) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/20 transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-200 z-10"
                    title="Close"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Content */}
                <div className="p-8 overflow-y-auto max-h-[90vh]">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 text-gray-600 mb-4">
                            <User className="w-6 h-6" />
                            <span className="font-medium text-lg">{
                                question.hideName ? "Abdullah" : question.name
                                }</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">{formatDate(question.createdAt)}</span>
                        </div>
                    </div>

                    {/* Question Text */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 leading-relaxed whitespace-pre-wrap">
                            {question.question}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}