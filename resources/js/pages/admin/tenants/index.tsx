import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Tenant {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    status: string;
    users_count: number;
    orders_count: number;
    menu_items_count: number;
    [key: string]: unknown;
}

interface Props {
    tenants: {
        data: Tenant[];
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

export default function TenantsIndex({ tenants }: Props) {
    return (
        <AppShell>
            <Head title="Tenant Management" />
            
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                🏪 Tenant Management
                            </h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Manage restaurant tenants across the platform
                            </p>
                        </div>
                        <Link
                            href={route('admin.tenants.create')}
                            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
                        >
                            Add New Tenant
                        </Link>
                    </div>

                    {/* Tenants Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {tenants.data.map((tenant) => (
                            <div
                                key={tenant.id}
                                className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"
                            >
                                <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl dark:bg-orange-900/20">
                                                🍽️
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {tenant.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {tenant.slug}
                                            </p>
                                        </div>
                                        <div>
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                tenant.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {tenant.status}
                                            </span>
                                        </div>
                                    </div>

                                    {tenant.description && (
                                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                                            {tenant.description}
                                        </p>
                                    )}

                                    <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>📋 {tenant.orders_count} orders</span>
                                        <span>🍽️ {tenant.menu_items_count} items</span>
                                        <span>👥 {tenant.users_count} users</span>
                                    </div>

                                    <div className="mt-6 flex space-x-3">
                                        <Link
                                            href={route('admin.tenants.show', tenant.id)}
                                            className="flex-1 rounded-md bg-gray-100 px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route('admin.tenants.edit', tenant.id)}
                                            className="flex-1 rounded-md bg-orange-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-orange-600"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {tenants.data.length === 0 && (
                        <div className="rounded-lg bg-white p-12 text-center shadow dark:bg-gray-800">
                            <div className="text-4xl mb-4">🏪</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                No tenants yet
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Get started by adding your first restaurant tenant.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href={route('admin.tenants.create')}
                                    className="inline-flex items-center rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                                >
                                    Add New Tenant
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}