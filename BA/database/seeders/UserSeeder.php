<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin123@gamil.com',
            'email_verified_at' => now(),
            'password' => Hash::make('admin123'),
            'role' => 0,
        ]);

        User::create([
            'name' => 'Tinhnh123',
            'email' => 'tinhnh123@gmail.com',
            'password' => Hash::make('Tinhnh123'),
            'email_verified_at' => now(),
            'role' => 1,
        ]);
    }
}
