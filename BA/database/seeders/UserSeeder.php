<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Tạo người dùng mới
        $user = User::create([
            'name' => 'Test User1',
            'email' => 'tes1t@example.com',
            'role' => 1,
            'password' => bcrypt('password'), // Mã hóa mật khẩu
        ]);

        // Tạo token cho người dùng
        $token = $user->createToken('auth_token')->plainTextToken;

        // In ra token (có thể không cần thiết, chỉ để kiểm tra)
        echo "Token for {$user->email}: {$token}\n";
    }
}
