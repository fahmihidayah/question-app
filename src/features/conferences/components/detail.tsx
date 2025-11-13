'use client';
import { getListQuestionByConferenceId, deleteQuestion } from "@/features/questions/actions";
import { Conference, Question } from "@/payload-types";
import { usePusher } from "@/utilities/pusher/usePusher";
import { MessageCircle, Calendar, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuestionItem from "./question-item";
import QuestionHighlight from "./question-highlight";

interface ConferenceDetailProps {
    conference?: Conference;
    questions?: Question[];
}

export default function ConferenceDetail({ conference, questions }: ConferenceDetailProps) {
    const router = useRouter();

    const [listQuestions, setListQuestion] = useState(questions);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    usePusher('questions-channel', 'new-question', conference?.slug ?? "", () => {
        const request = async () => {
            const result = await getListQuestionByConferenceId(conference?.id)
            setListQuestion(result.docs)
        }   
        request()
    })

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'Tidak diketahui';
        return new Date(dateString).toLocaleString();
    };

    const handleDeleteQuestion = async (questionId: number) => {
        const confirmed = window.confirm('Apakah Anda yakin ingin menghapus pertanyaan ini?');
        
        if (!confirmed) return;

        setIsDeleting(questionId);
        
        try {
            const result = await deleteQuestion(questionId);
            
            if (result.success) {
                // Remove the deleted question from the list
                setListQuestion(prev => prev?.filter(q => q.id !== questionId) || []);
            } else {
                alert('Gagal menghapus pertanyaan: ' + (result.error || 'Kesalahan tidak diketahui'));
            }
        } catch (error) {
            console.error('Error deleting question:', error);
            alert('Terjadi kesalahan saat menghapus pertanyaan. Silakan coba lagi.');
        } finally {
            setIsDeleting(null);
        }
    };

    const handleQuestionClick = (question: Question) => {
        setSelectedQuestion(question);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedQuestion(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 w-full">
            <div className="mx-auto px-10 w-full">
                {/* Header with back button */}
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Konferensi</span>
                    </button>
                </div>

                {/* Conference Details Card */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 ">
                        {conference?.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Dibuat: {formatDate(conference?.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{listQuestions?.length} Pertanyaan</span>
                        </div>
                    </div>
                </div>

                {/* Questions Section */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            Pertanyaan ({questions?.length})
                        </h2>
                    </div>

                    <div className="p-6">
                        {listQuestions?.length === 0 ? (
                            <div className="text-center py-12">
                                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Belum ada pertanyaan</p>
                                <p className="text-gray-400 text-sm mt-2">
                                    Jadilah yang pertama bertanya untuk konferensi ini!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4 w-full overflow-y-auto">
                                {listQuestions?.map((question) => (
                                    <QuestionItem
                                        key={question.id}
                                        question={question}
                                        formatDate={formatDate}
                                        handleDeleteQuestion={handleDeleteQuestion}
                                        isDeleting={isDeleting}
                                        onClick={handleQuestionClick}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

               
            </div>
            
            {/* Question Highlight Modal */}
            <QuestionHighlight
                question={selectedQuestion}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                formatDate={formatDate}
            />
        </div>
    );
}