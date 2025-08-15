import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    type: string;
    menu_items: MenuItem[];
}

interface MenuItem {
    id: number;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    preparation_time: number | null;
    ingredients: string[] | null;
    allergens: string[] | null;
    is_available: boolean;
    is_featured: boolean;
}

interface Tenant {
    id: number;
    name: string;
    description: string | null;
    contact_info: Record<string, unknown> | null;
}

interface Table {
    id: number;
    number: string;
    capacity: number;
}

interface CartItem {
    menu_item_id: number;
    quantity: number;
    special_instructions?: string;
    [key: string]: unknown;
}

interface Props {
    tenant: Tenant;
    table: Table;
    categories: Category[];
    [key: string]: unknown;
}

export default function MenuTable({ tenant, table, categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [cartItems, setCartItems] = useState<{[key: number]: CartItem}>({});
    const [customerName, setCustomerName] = useState<string>('');
    const [customerPhone, setCustomerPhone] = useState<string>('');
    const [notes] = useState<string>('');
    const [isOrdering, setIsOrdering] = useState(false);

    const addToCart = (menuItem: MenuItem) => {
        setCartItems(prev => ({
            ...prev,
            [menuItem.id]: {
                menu_item_id: menuItem.id,
                quantity: (prev[menuItem.id]?.quantity || 0) + 1,
                special_instructions: prev[menuItem.id]?.special_instructions || ''
            }
        }));
    };

    const removeFromCart = (menuItemId: number) => {
        setCartItems(prev => {
            const newItems = { ...prev };
            if (newItems[menuItemId]?.quantity > 1) {
                newItems[menuItemId].quantity--;
            } else {
                delete newItems[menuItemId];
            }
            return newItems;
        });
    };

    const updateSpecialInstructions = (menuItemId: number, instructions: string) => {
        setCartItems(prev => ({
            ...prev,
            [menuItemId]: {
                ...prev[menuItemId],
                special_instructions: instructions
            }
        }));
    };

    const filteredCategories = selectedCategory === 'all' 
        ? categories 
        : categories.filter(cat => cat.type === selectedCategory);

    const allMenuItems = categories.flatMap(cat => cat.menu_items);
    
    const cartTotal = Object.values(cartItems).reduce((total, item) => {
        const menuItem = allMenuItems.find(mi => mi.id === item.menu_item_id);
        return total + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);

    const cartItemsCount = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);

    const handlePlaceOrder = () => {
        if (!customerName.trim() || Object.keys(cartItems).length === 0) {
            return;
        }

        setIsOrdering(true);

        const formData = new FormData();
        formData.append('table_id', table.id.toString());
        formData.append('customer_name', customerName.trim());
        if (customerPhone.trim()) {
            formData.append('customer_phone', customerPhone.trim());
        }
        formData.append('items', JSON.stringify(Object.values(cartItems)));
        if (notes.trim()) {
            formData.append('notes', notes.trim());
        }

        router.post(route('orders.store'), formData, {
            onSuccess: () => {
                // Order confirmation page will be shown
            },
            onError: (errors) => {
                console.error('Order failed:', errors);
                setIsOrdering(false);
            },
            onFinish: () => {
                setIsOrdering(false);
            }
        });
    };

    return (
        <>
            <Head title={`${tenant.name} - Table ${table.number}`} />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2">
                                <span className="text-sm font-medium text-orange-800">
                                    📍 Table {table.number}
                                </span>
                            </div>
                            <h1 className="mt-2 text-3xl font-bold text-gray-900">
                                🍽️ {tenant.name}
                            </h1>
                            {tenant.description && (
                                <p className="mt-1 text-gray-600">{tenant.description}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Customer Info Form */}
                    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-bold text-gray-900">👤 Customer Information</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="customer_name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700">
                                    Phone (Optional)
                                </label>
                                <input
                                    type="tel"
                                    id="customer_phone"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-8 flex space-x-2 overflow-x-auto pb-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                selectedCategory === 'all'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            🍽️ All Items
                        </button>
                        <button
                            onClick={() => setSelectedCategory('food')}
                            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                selectedCategory === 'food'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            🍕 Food
                        </button>
                        <button
                            onClick={() => setSelectedCategory('drink')}
                            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                selectedCategory === 'drink'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            🥤 Drinks
                        </button>
                    </div>

                    {/* Menu Categories */}
                    <div className="space-y-8">
                        {filteredCategories.map((category) => (
                            <div key={category.id} className="rounded-lg bg-white p-6 shadow-sm">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                    {category.type === 'food' ? '🍕' : '🥤'} {category.name}
                                </h2>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {category.menu_items.filter(item => item.is_available).map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">
                                                        {item.name}
                                                        {item.is_featured && (
                                                            <span className="ml-2 text-yellow-500">⭐</span>
                                                        )}
                                                    </h3>
                                                    {item.description && (
                                                        <p className="mt-1 text-sm text-gray-600">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <span className="text-lg font-bold text-orange-600">
                                                            Rp {item.price.toLocaleString('id-ID')}
                                                        </span>
                                                        {item.preparation_time && (
                                                            <span className="text-xs text-gray-500">
                                                                ⏱️ {item.preparation_time} min
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    {cartItems[item.id] && (
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                                                        >
                                                            −
                                                        </button>
                                                    )}
                                                    {cartItems[item.id] && (
                                                        <span className="text-sm font-medium">
                                                            {cartItems[item.id].quantity}
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>

                                            {cartItems[item.id] && (
                                                <div className="mt-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Special instructions (optional)"
                                                        value={cartItems[item.id].special_instructions || ''}
                                                        onChange={(e) => updateSpecialInstructions(item.id, e.target.value)}
                                                        className="w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary & Order */}
                    {cartItemsCount > 0 && (
                        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
                            <div className="mx-auto max-w-7xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-semibold text-gray-900">
                                            🛒 {cartItemsCount} items - Rp {cartTotal.toLocaleString('id-ID')}
                                        </p>
                                        <p className="text-sm text-gray-600">Tax (10%) will be added</p>
                                    </div>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={!customerName.trim() || isOrdering}
                                        className="rounded-lg bg-orange-500 px-6 py-3 text-lg font-medium text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isOrdering ? 'Placing Order...' : 'Place Order'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bottom padding for fixed cart */}
                    {cartItemsCount > 0 && <div className="h-24"></div>}

                    {categories.length === 0 && (
                        <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                            <p className="text-lg text-gray-600">
                                🍽️ No menu items available at the moment.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}