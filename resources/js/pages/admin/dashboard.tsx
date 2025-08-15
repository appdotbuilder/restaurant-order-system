import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { SharedData } from '@/types';

interface DashboardStats {
    totalTenants?: number;
    totalOrders?: number;
    totalRevenue?: number;
    todayOrders?: number;
    [key: string]: unknown;
}

interface DashboardProps extends SharedData {
    stats?: DashboardStats;
}

export default function AdminDashboard() {
    const { auth } = usePage<DashboardProps>().props;
    const user = auth.user;

    const isSuperadmin = user?.role === 'superadmin';

    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {isSuperadmin ? '👑 Super Admin Dashboard' : '👩‍🍳 Restaurant Dashboard'}
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {isSuperadmin 
                                ? 'Manage all tenants and oversee platform operations'
                                : 'Manage your restaurant operations and view reports'
                            }
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-2xl dark:bg-blue-900/20">
                                        📊
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Total Orders
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        0
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-2xl dark:bg-green-900/20">
                                        💰
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Revenue
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        Rp 0
                                    </p>
                                </div>
                            </div>
                        </div>

                        {isSuperadmin && (
                            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-2xl dark:bg-purple-900/20">
                                            🏪
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Active Tenants
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            2
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-2xl dark:bg-orange-900/20">
                                        🍽️
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Menu Items
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        0
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-8">
                        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                            🚀 Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {isSuperadmin && (
                                <Link
                                    href={route('admin.tenants.index')}
                                    className="rounded-lg border border-gray-200 bg-white p-6 shadow transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <div className="flex items-center">
                                        <div className="text-3xl">🏪</div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                Manage Tenants
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Add, edit, or remove restaurant tenants
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            <Link
                                href={route('admin.menu-items.index')}
                                className="rounded-lg border border-gray-200 bg-white p-6 shadow transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                <div className="flex items-center">
                                    <div className="text-3xl">🍽️</div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                            Menu Management
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Manage food and drink items
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href={route('orders.index')}
                                className="rounded-lg border border-gray-200 bg-white p-6 shadow transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                <div className="flex items-center">
                                    <div className="text-3xl">📋</div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                            Orders
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            View and manage customer orders
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                📈 Recent Activity
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">📊</div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    No recent activity to display
                                </p>
                                <p className="text-sm text-gray-400 dark:text-gray-500">
                                    Activity will appear here once you start receiving orders
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}