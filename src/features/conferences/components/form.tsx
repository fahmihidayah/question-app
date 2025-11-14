'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { conferenceFormSchema, ConferenceFormSchema } from "../type";
import { createConferenceAction } from "../actions";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export const ConferenceForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<ConferenceFormSchema>({
        resolver: zodResolver(conferenceFormSchema),
        defaultValues: {
            title: "",
            description: ""
        }
    });

    const {
        reset
    } = form;

    const onSubmit = async (data: ConferenceFormSchema) => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            await createConferenceAction(data);
            window.location.href = "/dashboard/conferences"
            reset();
        } catch (error) {
            console.error("Pembuatan konferensi gagal:", error);
            setSubmitError(error instanceof Error ? error.message : "Terjadi kesalahan saat membuat konferensi");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-4">
            <div className="w-full">


                {/* Error Message */}
                {submitError && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-700 dark:text-red-400 text-sm">{submitError}</p>
                    </div>
                )}

                {/* Form */}
                <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-gray-700">
                    <Form  {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Judul Konferensi</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='Masukkan judul konferensi'
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
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deskripsi
                                            <span className="text-red-500 dark:text-red-400 ml-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <textarea
                                                rows={4}
                                                className="text-gray-900 dark:text-gray-100 flex w-full rounded-lg border bg-white dark:bg-gray-700 px-4 py-3 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400 dark:placeholder:text-gray-500 touch-manipulation border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                                                placeholder="Masukkan deskripsi konferensi"
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
                            >
                                {isSubmitting ? "Membuat Konferensi..." : "Buat Konferensi"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ConferenceForm;