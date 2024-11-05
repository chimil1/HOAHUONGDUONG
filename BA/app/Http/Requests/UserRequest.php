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
            'name' => 'required|string|max:50|unique:users,name',
            'email' => 'required|email|max:100|unique:users,email,' . $this->User,
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|integer',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'Tên không được bỏ trống.',
            'name.max' => 'Tên không được vượt quá 50 ký tự.',

            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Vui lòng nhập địa chỉ email hợp lệ.',
            'email.unique' => 'Email này đã được sử dụng.',

            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'password.confirmed' => 'Mật khẩu xác nhận không khớp.',

            'role.required' => 'Vui lòng chọn vai trò.',
            'role.integer' => 'Vai trò phải là một số nguyên.',
        ];
    }

}
