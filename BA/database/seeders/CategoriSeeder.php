<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categori;



class CategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categori::create([
            'name' => 'Category 1',
            'description' => 'Description for Category 1',
            'img' => 'http://example.com/image1.png',
            'status' => 1,
        ]);

        Categori::create([
            'name' => 'Category 2',
            'description' => 'Description for Category 2',
            'img' => 'http://example.com/image2.png',
            'status' => 1,
        ]);
    }
}
