'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { signInFormSchema, SignInFormSchema } from "../types";
import { signInAction } from "../actions";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { adminAuthClient } from '@/utilities/auth';
import Link from "next/link";


export const SignInForm: React.FC = () => {
    const { oauth } = adminAuthClient.signin()
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const router = useRouter();
    
    const form = useForm<SignInFormSchema>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const {
        reset
    } = form;

    const onSubmit = async (data: SignInFormSchema) => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            await signInAction(data)
            const redirect = searchParams.get("redirect")
            if(redirect) {
                router.push(redirect)
            }
            else {
                 router.push("/")
            }
           
            reset();
        } catch (error) {
            console.error("Masuk gagal:", error);
            setSubmitError(error instanceof Error ? error.message : "Terjadi kesalahan saat masuk. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            oauth('google')
            // const result = await 
            // window.location.href = result.redirectUrl;
        } catch (error) {
            console.error("Google sign-in failed:", error);
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-900 mb-2">Selamat Datang Kembali</h1>
                        <p className="text-blue-600">Masuk ke akun Anda</p>
                    </div>

                    {/* Google Sign In */}
                    <div className="mb-6">
                        <Button
                            onClick={handleGoogleSignIn}
                            disabled={isGoogleLoading || isSubmitting}
                            variant="outline"
                            className="w-full border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-3"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            {isGoogleLoading ? "Menghubungkan..." : "Masuk dengan Google"}
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">atau</span>
                        </div>
                    </div>

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
                                                    placeholder='Masukkan kata sandi Anda'
                                                    disabled={isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-sm text-blue-700">Ingat saya</span>
                                    </label>
                                    <Button
                                        type="button"
                                        variant="link"
                                        size="sm"
                                    >
                                        Lupa kata sandi?
                                    </Button>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    variant="default"
                                    size="default"
                                    className="w-full"
                                >
                                    {isSubmitting ? "Sedang masuk..." : "Masuk"}
                                </Button>
                            </form>
                        </Form>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-blue-600">
                            Belum punya akun?{' '}
                            <Link
                                href={"/sign-up"}
                                className="font-semibold"
                            >
                                Daftar di sini
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};