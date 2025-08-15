import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Tenant {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    logo: string | null;
    contact_info: Record<string, unknown> | null;
    business_hours: Record<string, unknown> | null;
    status: string;
    menu_items: MenuItem[];
}

interface MenuItem {
    id: number;
    name: string;
    price: number;
    formatted_price: string;
    category: {
        name: string;
        type: string;
    };
}

interface WelcomeProps extends SharedData {
    tenants: Tenant[];
    [key: string]: unknown;
}

export default function Welcome() {
    const { auth, tenants } = usePage<WelcomeProps>().props;

    return (
        <>
            <Head title="RestaurantOS - Multi-Tenant Restaurant Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Header */}
                <header className="border-b border-orange-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-2xl">
                                    🍽️
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                        RestaurantOS
                                    </h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Multi-Tenant Restaurant Management
                                    </p>
                                </div>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-medium text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-400"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg border border-orange-300 px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400 dark:hover:bg-orange-900/20"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                            🏪 Restaurant Management
                            <span className="block text-orange-600 dark:text-orange-400">Made Simple</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            Complete multi-tenant restaurant platform with QR code ordering, payment processing, 
                            and comprehensive management tools for superadmins, restaurant owners, and customers.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                    >
                                        Start Your Restaurant
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
                                    >
                                        Sign In <span aria-hidden="true">→</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-2xl dark:bg-orange-900/20">
                                👥
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Multi-Tenant
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                Manage multiple restaurants from a single platform with role-based access control.
                            </p>
                        </div>
                        
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-2xl dark:bg-blue-900/20">
                                📱
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                QR Code Ordering
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                Customers scan table QR codes to view menus and place orders instantly.
                            </p>
                        </div>
                        
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-2xl dark:bg-green-900/20">
                                💳
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Payment Integration
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                Secure payments with Midtrans gateway and automatic invoice generation.
                            </p>
                        </div>
                        
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-2xl dark:bg-purple-900/20">
                                📊
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Analytics & Reports
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                Comprehensive reporting for sales, orders, and performance metrics.
                            </p>
                        </div>
                    </div>

                    {/* Available Restaurants */}
                    {tenants && tenants.length > 0 && (
                        <div className="mt-20">
                            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                🍴 Featured Restaurants
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
                                Discover amazing restaurants and browse their menus
                            </p>
                            
                            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {tenants.map((tenant) => (
                                    <div
                                        key={tenant.id}
                                        className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {tenant.name}
                                                    </h3>
                                                    {tenant.description && (
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                            {tenant.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="ml-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl dark:bg-orange-900/20">
                                                    🍽️
                                                </div>
                                            </div>
                                            
                                            {tenant.menu_items && tenant.menu_items.length > 0 && (
                                                <div className="mt-4">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        Featured Items:
                                                    </p>
                                                    <div className="mt-2 space-y-1">
                                                        {tenant.menu_items.slice(0, 3).map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="flex items-center justify-between text-sm"
                                                            >
                                                                <span className="text-gray-600 dark:text-gray-300">
                                                                    {item.name}
                                                                </span>
                                                                <span className="font-medium text-orange-600 dark:text-orange-400">
                                                                    Rp {Number(item.price).toLocaleString('id-ID')}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="mt-6">
                                                <Link
                                                    href={route('menu.index', tenant.slug)}
                                                    className="inline-flex w-full items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                                >
                                                    View Menu
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* User Roles Section */}
                    <div className="mt-20">
                        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            👨‍💼 User Roles & Access
                        </h2>
                        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
                                <div className="text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl dark:bg-red-900/20">
                                        👑
                                    </div>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                                        Superadmin
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        Manage all tenants, view platform-wide reports, and oversee the entire system.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
                                <div className="text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl dark:bg-blue-900/20">
                                        👩‍🍳
                                    </div>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                                        Admin/Cashier
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        Manage restaurant menus, process orders, and view tenant-specific analytics.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
                                <div className="text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl dark:bg-green-900/20">
                                        👥
                                    </div>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                                        Customer
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        Browse menus, place orders via QR codes, and make secure payments.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-20 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Built with ❤️ using Laravel, React, and Inertia.js
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}