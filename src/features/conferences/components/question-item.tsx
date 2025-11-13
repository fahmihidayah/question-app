'use client';

import { Question } from "@/payload-types";
import { User, Trash2 } from "lucide-react";

interface QuestionItemProps {
    question: Question;
    formatDate: (dateString: string | null | undefined) => string;
    handleDeleteQuestion: (id: number) => Promise<void>;
    isDeleting: number | null;
    onClick: (question: Question) => void;
}

export default function QuestionItem({ 
    question, 
    formatDate, 
    handleDeleteQuestion, 
    isDeleting,
    onClick 
}: QuestionItemProps) {
    return (
        <div
            key={question.id}
            className={`flex justify-start w-full`}
        >
            <div
                className={`w-full p-4 rounded-2xl bg-blue-100 text-white rounded-br-sm shadow-sm relative cursor-pointer hover:bg-blue-200 transition-colors`}
                onClick={() => onClick(question)}
            >
                <div className="mb-2">
                    <div className={`flex items-center justify-between text-x text-blue-800 mb-2`}>
                        <div className="flex items-center gap-2">
                            <User className="w-6 h-6" />
                            <span className="font-medium">{question.name}</span>
                            <span>{formatDate(question.createdAt)}</span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the parent onClick
                                handleDeleteQuestion(question.id);
                            }}
                            onTouchStart={() => {}}
                            disabled={isDeleting === question.id}
                            className="p-3 rounded-full hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation select-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                            title="Hapus pertanyaan"
                            style={{ 
                                WebkitTapHighlightColor: 'transparent', 
                                touchAction: 'manipulation',
                                WebkitUserSelect: 'none',
                                userSelect: 'none'
                            }}
                        >
                            {isDeleting === question.id ? (
                                <div className="w-4 h-4 animate-spin border-2 border-red-600 border-t-transparent rounded-full"></div>
                            ) : (
                                <Trash2 className="w-4 h-4 pointer-events-none" />
                            )}
                        </button>
                    </div>
                    <p className="text-lg leading-relaxed whitespace-pre-wrap text-blue-800">
                        {question.question}
                    </p>
                </div>
            </div>
        </div>
    );
}