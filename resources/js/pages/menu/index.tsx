import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

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

interface Props {
    tenant: Tenant;
    categories: Category[];
    [key: string]: unknown;
}

export default function MenuIndex({ tenant, categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [cartItems, setCartItems] = useState<{[key: number]: number}>({});

    const addToCart = (menuItemId: number) => {
        setCartItems(prev => ({
            ...prev,
            [menuItemId]: (prev[menuItemId] || 0) + 1
        }));
    };

    const removeFromCart = (menuItemId: number) => {
        setCartItems(prev => {
            const newItems = { ...prev };
            if (newItems[menuItemId] > 1) {
                newItems[menuItemId]--;
            } else {
                delete newItems[menuItemId];
            }
            return newItems;
        });
    };

    const filteredCategories = selectedCategory === 'all' 
        ? categories 
        : categories.filter(cat => cat.type === selectedCategory);

    const cartTotal = Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
        const item = categories
            .flatMap(cat => cat.menu_items)
            .find(item => item.id === parseInt(itemId));
        return total + (item ? item.price * quantity : 0);
    }, 0);

    const cartItemsCount = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);

    return (
        <>
            <Head title={`${tenant.name} - Menu`} />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    🍽️ {tenant.name}
                                </h1>
                                {tenant.description && (
                                    <p className="mt-1 text-gray-600">{tenant.description}</p>
                                )}
                            </div>
                            {cartItemsCount > 0 && (
                                <div className="rounded-lg bg-orange-100 px-4 py-2">
                                    <span className="text-sm font-medium text-orange-800">
                                        🛒 Cart: {cartItemsCount} items - Rp {cartTotal.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
                                                            {cartItems[item.id]}
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => addToCart(item.id)}
                                                    className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

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