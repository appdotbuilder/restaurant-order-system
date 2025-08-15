<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'table_id' => 'required|exists:tables,id',
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1|max:50',
            'items.*.special_instructions' => 'nullable|string|max:500',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'table_id.required' => 'Table selection is required.',
            'table_id.exists' => 'Selected table is not valid.',
            'customer_name.required' => 'Customer name is required.',
            'items.required' => 'Please add at least one item to your order.',
            'items.min' => 'Please add at least one item to your order.',
            'items.*.menu_item_id.required' => 'Menu item selection is required.',
            'items.*.menu_item_id.exists' => 'Selected menu item is not available.',
            'items.*.quantity.required' => 'Item quantity is required.',
            'items.*.quantity.min' => 'Quantity must be at least 1.',
            'items.*.quantity.max' => 'Quantity cannot exceed 50.',
        ];
    }
}