'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { signUpFormSchema, SignUpFormSchema } from "../types";
import { signUpAction } from "../actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export const SignUpForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();
    
    const form = useForm<SignUpFormSchema>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const {
        reset
    } = form;

    const onSubmit = async (data: SignUpFormSchema) => {
        setIsSubmitting(true);
        setSubmitError(null);
        setSuccessMessage(null);
        
        try {
            const result = await signUpAction(data);
            
            if (result.success) {
                setSuccessMessage("Pendaftaran berhasil! Anda akan dialihkan ke dashboard...");
                reset();
                
                // Redirect to conferences after successful signup
                setTimeout(() => {
                    router.push("/conferences");
                    router.refresh(); // Refresh to update auth state
                }, 2000);
            } else {
                setSubmitError(result.error || "Pendaftaran gagal. Silakan coba lagi.");
            }
        } catch (error) {
            console.error("Pendaftaran gagal:", error);
            setSubmitError(error instanceof Error ? error.message : "Terjadi kesalahan saat pendaftaran. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-900 mb-2">Buat Akun Baru</h1>
                        <p className="text-blue-600">Bergabunglah dengan KonfQ</p>
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
                                {/* Name Field */}
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Lengkap</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    placeholder='Masukkan nama lengkap Anda'
                                                    disabled={isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alamat Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='email'
                                                    placeholder='Masukkan email Anda'
                                                    disabled={isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password Field */}
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Kata Sandi</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='password'
                                                    placeholder='Masukkan kata sandi'
                                                    disabled={isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Confirm Password Field */}
                                <FormField
                                    control={form.control}
                                    name='confirmPassword'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='password'
                                                    placeholder='Ulangi kata sandi'
                                                    disabled={isSubmitting}
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
                                    {isSubmitting ? "Mendaftarkan..." : "Daftar"}
                                </Button>
                            </form>
                        </Form>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-blue-600">
                            Sudah punya akun?{' '}
                            <Link 
                                href="/auth" 
                                className="font-semibold text-blue-700 hover:text-blue-900 hover:underline transition-colors duration-200"
                            >
                                Masuk di sini
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};