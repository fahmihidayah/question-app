'use client';
import { Conference } from "@/payload-types";
import { Share2, Trash2, ExternalLink, Copy } from "lucide-react";
import { PaginatedDocs } from "payload";
import { useState } from "react";
import { deleteConferenceById } from "../actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ListConferences({
    docs
}: {
    docs: PaginatedDocs<Conference>
}) {
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const router = useRouter();
    

    const handleDelete = async (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus konferensi ini?")) {
            setIsDeleting(id);
            try {
                await deleteConferenceById(id);
                router.refresh();
            } catch (error) {
                console.error("Gagal menghapus konferensi:", error);
            } finally {
                setIsDeleting(null);
            }
        }
    };

    async function handleCopy(conference: Conference) {
         navigator.clipboard.writeText(window.location.origin + `/conferences/${conference.slug || ''}/question`);
        alert("Link konferensi berhasil disalin ke clipboard!");
    }

    

    const handleShare = (conference: Conference) => {
        if (navigator.share) {
            navigator.share({
                title: conference.title,
                url: window.location.origin + `/conferences/${conference.slug || ''}/question`,
            });
        } else {
            navigator.clipboard.writeText(window.location.origin + `/conferences/${conference.slug || ''}/question`);
            alert("Link konferensi berhasil disalin ke clipboard!");
        }
    };

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
            docs.docs.map((conference) => {
                return (
                    <Link href={`/conferences/${conference.slug}`} 
                        key={conference.id} 
                        className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700">
                                {conference.title}
                            </h2>
                            <div className="flex gap-2 transition-opacity duration-200 z-10">
                                
                                
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        handleShare(conference)
                                    }}
                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                    title="Bagikan konferensi"
                                >
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        handleDelete(conference.id)
                                    }}
                                    disabled={isDeleting === conference.id}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                    title="Hapus konferensi"
                                >
                                    {isDeleting === conference.id ? (
                                        <div className="w-4 h-4 animate-spin border-2 border-red-600 border-t-transparent rounded-full"></div>
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        handleCopy(conference)
                                    }}
                                    className="p-2 text-gray-500 hover:text-green-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                    title="Bagikan konferensi"
                                >
                                    <Copy  className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                            {conference.description}
                        </p>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <button
                                onClick={() => router.push(`/conferences/${conference.slug || ''}`)}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span className="text-sm font-medium">Lihat Detail</span>
                            </button>
                            <div className="text-xs text-gray-400">
                                {conference.createdAt ? new Date(conference.createdAt).toLocaleDateString() : ''}
                            </div>
                        </div>

                        
                    </Link>
                );
            })
        }
    </div>
}