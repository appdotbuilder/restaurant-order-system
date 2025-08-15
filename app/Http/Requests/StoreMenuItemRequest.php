<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMenuItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();
        return $user && ($user->isSuperadmin() || $user->isAdmin());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0|max:999999999',
            'preparation_time' => 'nullable|integer|min:1|max:300',
            'ingredients' => 'nullable|array',
            'ingredients.*' => 'string|max:100',
            'allergens' => 'nullable|array',
            'allergens.*' => 'string|max:100',
            'is_available' => 'boolean',
            'is_featured' => 'boolean',
            'sort_order' => 'integer|min:0',
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
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'Selected category is not valid.',
            'name.required' => 'Menu item name is required.',
            'price.required' => 'Price is required.',
            'price.numeric' => 'Price must be a valid number.',
            'price.min' => 'Price cannot be negative.',
            'price.max' => 'Price is too high.',
            'preparation_time.min' => 'Preparation time must be at least 1 minute.',
            'preparation_time.max' => 'Preparation time cannot exceed 300 minutes.',
        ];
    }
}