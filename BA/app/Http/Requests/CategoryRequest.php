<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
            'status' => 'required|integer',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.max' => 'The name field must be at most 255 characters long.',
            'description.max' => 'The description field must be at most 255 characters long.',
            'image.image' => 'The image must be an image.',
            'image.mimes' => 'The image must be a jpeg, png, or jpg file.',
            'image.max' => 'The image file must be less than 2MB.',
           'status.required' => 'The status field is required.',
            'status.integer' => 'The status field must be an integer.',
        ];
    }
}
