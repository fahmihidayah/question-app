'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { questionFormSchema, QuestionFormSchema } from "../type";
import { createQuestionAction } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User } from "@/payload-types";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestionFormProps {
    user : User;
    conferenceSlug: string;
    conferenceName?: string;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ user, conferenceSlug, conferenceName }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();
    
    const form = useForm<QuestionFormSchema>({
        resolver: zodResolver(questionFormSchema),
        defaultValues: {
            name: user.name ?? "",
            hideName : false,
            question: "",
            conference: conferenceSlug
        }
    });

    const {
        reset
    } = form;

    const onSubmit = async (data: QuestionFormSchema) => {
        setIsSubmitting(true);
        setSubmitError(null);
        setSuccessMessage(null);
        
        try {
            await createQuestionAction(data);
            setSuccessMessage("Pertanyaan berhasil dikirim!");
            reset();
            
        } catch (error) {
            console.error("Gagal mengirim pertanyaan:", error);
            setSubmitError(error instanceof Error ? error.message : "Gagal mengirim pertanyaan. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white p-4 w-full">
            <div className="w-full max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajukan Pertanyaan</h1>
                    {conferenceName && (
                        <p className="text-gray-600">Untuk: {conferenceName}</p>
                    )}
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-700 text-sm">{successMessage}</p>
                    </div>
                )}

                {/* Error Message */}
                {submitError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm">{submitError}</p>
                    </div>
                )}

                {/* Form */}
                <div className="space-y-6">
                    <Form  {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Hidden conference field */}
                            <FormField
                                control={form.control}
                                name='conference'
                                render={({ field }) => (
                                    <FormItem className="hidden">
                                        <FormControl>
                                            <input
                                                type="hidden"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Name Field */}
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Anda</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='Masukkan nama Anda'
                                                disabled={isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='hideName'
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                Sembunyikan Nama Saya
                                            </FormLabel>
                                            <p className="text-sm text-muted-foreground">
                                                Jika dicentang, nama Anda tidak akan ditampilkan saat pertanyaan ditayangkan
                                            </p>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Question Field */}
                            <FormField
                                control={form.control}
                                name='question'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pertanyaan Anda
                                            <span className="text-red-500 ml-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <textarea
                                                rows={6}
                                                className="text-black flex w-full rounded-lg border px-4 py-3 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400 touch-manipulation resize-vertical border-gray-300 hover:border-gray-400"
                                                placeholder="Ketik pertanyaan Anda di sini..."
                                                disabled={isSubmitting}
                                                style={{
                                                    WebkitTapHighlightColor: 'transparent',
                                                    touchAction: 'manipulation'
                                                }}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                variant="default"
                                size="default"
                                className="w-full"
                            >
                                {isSubmitting ? "Mengirim Pertanyaan..." : "Kirim Pertanyaan"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;