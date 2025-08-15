import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface OrderItem {
    id: number;
    item_name: string;
    quantity: number;
    item_price: number;
    total_price: number;
    special_instructions: string | null;
}

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    customer_phone: string | null;
    subtotal: number;
    tax_amount: number;
    total_amount: number;
    status: string;
    payment_status: string;
    table: {
        number: string;
    };
    tenant: {
        name: string;
        slug: string;
    };
    items: OrderItem[];
}

interface Props {
    order: Order;
    [key: string]: unknown;
}

export default function OrderConfirmation({ order }: Props) {
    return (
        <>
            <Head title={`Order ${order.order_number} - Confirmation`} />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    {/* Success Header */}
                    <div className="text-center">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-4xl">
                            ✅
                        </div>
                        <h1 className="mt-4 text-3xl font-bold text-gray-900">
                            Order Placed Successfully!
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Thank you for your order at {order.tenant.name}
                        </p>
                    </div>

                    {/* Order Details Card */}
                    <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Order #{order.order_number}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Table {order.table.number} • {order.customer_name}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                                        📋 {order.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4">
                            {/* Order Items */}
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                🍽️ Order Items
                            </h3>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                                    >
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">
                                                {item.item_name}
                                            </h4>
                                            {item.special_instructions && (
                                                <p className="text-sm text-gray-600">
                                                    Note: {item.special_instructions}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-500">
                                                Rp {item.item_price.toLocaleString('id-ID')} × {item.quantity}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-lg font-semibold text-gray-900">
                                                Rp {item.total_price.toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="mt-6 rounded-lg bg-gray-50 p-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>Rp {order.subtotal.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Tax (10%)</span>
                                        <span>Rp {order.tax_amount.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-2">
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span>Total</span>
                                            <span>Rp {order.total_amount.toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Status */}
                            <div className="mt-6 rounded-lg border border-orange-200 bg-orange-50 p-4">
                                <div className="flex items-center">
                                    <div className="text-2xl">💳</div>
                                    <div className="ml-3">
                                        <h4 className="font-semibold text-orange-800">
                                            Payment Required
                                        </h4>
                                        <p className="text-sm text-orange-700">
                                            Please proceed to payment to complete your order.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="w-full rounded-lg bg-orange-500 px-4 py-3 text-lg font-medium text-white hover:bg-orange-600 transition-colors"
                                    >
                                        💳 Pay with Midtrans
                                    </button>
                                </div>
                            </div>

                            {/* Next Steps */}
                            <div className="mt-6 rounded-lg bg-blue-50 p-4">
                                <h4 className="font-semibold text-blue-800 mb-2">
                                    📋 What happens next?
                                </h4>
                                <div className="space-y-1 text-sm text-blue-700">
                                    <p>1. Complete payment using the button above</p>
                                    <p>2. Our kitchen will start preparing your order</p>
                                    <p>3. We'll notify you when your food is ready</p>
                                    <p>4. Enjoy your meal! 🍽️</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link
                            href={route('menu.index', order.tenant.slug)}
                            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            ← Back to Menu
                        </Link>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="rounded-lg bg-gray-600 px-6 py-3 text-lg font-medium text-white hover:bg-gray-700 transition-colors"
                        >
                            🖨️ Print Receipt
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}