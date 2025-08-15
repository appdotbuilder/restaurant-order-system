<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTenantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->isSuperadmin() ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:tenants,slug,' . $this->route('tenant')->id,
            'description' => 'nullable|string',
            'logo' => 'nullable|string|max:255',
            'contact_info' => 'nullable|array',
            'contact_info.phone' => 'nullable|string|max:20',
            'contact_info.email' => 'nullable|email|max:255',
            'contact_info.address' => 'nullable|string',
            'business_hours' => 'nullable|array',
            'status' => 'required|in:active,inactive',
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
            'name.required' => 'Restaurant name is required.',
            'slug.unique' => 'This restaurant slug is already taken.',
            'status.required' => 'Please select a status for the restaurant.',
            'contact_info.email.email' => 'Please provide a valid email address.',
        ];
    }
}