<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CouponRequest extends FormRequest
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
            'name_coupon' => 'string|max:255',
            'code_name' => 'string|max:10',
            'discount_type' => 'integer',
            'discount_value' => 'integer',
            'start_date' => 'date',
            'end_date' => 'date|after_or_equal:start_date',
        ];
    }
}
