import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface MenuItem {
    id: number;
    name: string;
    description: string | null;
    price: number;
    is_available: boolean;
    is_featured: boolean;
    category: {
        name: string;
        type: string;
    };
    tenant: {
        name: string;
    };
    [key: string]: unknown;
}

interface Category {
    id: number;
    name: string;
    type: string;
}

interface Props {
    menuItems: {
        data: MenuItem[];
        [key: string]: unknown;
    };
    categories: Category[];
    [key: string]: unknown;
}

export default function MenuItemsIndex({ menuItems }: Props) {
    return (
        <AppShell>
            <Head title="Menu Management" />
            
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                🍽️ Menu Management
                            </h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Manage food and drink items for your restaurants
                            </p>
                        </div>
                        <Link
                            href={route('admin.menu-items.create')}
                            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
                        >
                            Add Menu Item
                        </Link>
                    </div>

                    {/* Menu Items Table */}
                    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Item
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Restaurant
                                        </th>
                                        <th className="relative px-6 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {menuItems.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-2xl mr-3">
                                                        {item.category.type === 'food' ? '🍕' : '🥤'}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {item.name}
                                                            {item.is_featured && (
                                                                <span className="ml-2 text-yellow-500">⭐</span>
                                                            )}
                                                        </div>
                                                        {item.description && (
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {item.description.length > 50 
                                                                    ? item.description.substring(0, 50) + '...'
                                                                    : item.description
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {item.category.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                Rp {item.price.toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                    item.is_available
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {item.is_available ? 'Available' : 'Unavailable'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {item.tenant.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route('admin.menu-items.show', item.id)}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route('admin.menu-items.edit', item.id)}
                                                        className="text-orange-600 hover:text-orange-900 dark:text-orange-400"
                                                    >
                                                        Edit
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {menuItems.data.length === 0 && (
                        <div className="rounded-lg bg-white p-12 text-center shadow dark:bg-gray-800">
                            <div className="text-4xl mb-4">🍽️</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                No menu items yet
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Start building your menu by adding your first item.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href={route('admin.menu-items.create')}
                                    className="inline-flex items-center rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                                >
                                    Add Menu Item
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}