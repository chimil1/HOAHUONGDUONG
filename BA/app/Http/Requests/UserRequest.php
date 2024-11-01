<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:50|unique',
            'email' => 'required|string|email|max:100|unique:users,email,',
            'password' => 'nullable|string|min:6', // Optional on update
            'role' => 'required|integer',
        ];
    }
    public function messages()
    {
        return [
            'email.required' => 'The email field is required.',
            'email.unique' => 'This email is already taken.',
            'password.min' => 'The password must be at least 6 characters.',
        ];
    }
}
