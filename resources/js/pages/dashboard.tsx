import React, { useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { SharedData } from '@/types';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    useEffect(() => {
        // Redirect based on user role
        if (user) {
            if (user.role === 'superadmin' || user.role === 'admin') {
                // For admin users, redirect to admin dashboard
                router.get('/admin/dashboard');
            } else {
                // For customers, redirect to home page
                router.get('/');
            }
        }
    }, [user]);

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Redirecting...
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Taking you to the right place
                    </p>
                </div>
            </div>
        </AppShell>
    );
}