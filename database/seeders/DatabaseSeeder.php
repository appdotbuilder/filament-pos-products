<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create sample products for the POS system
        Product::factory()->count(20)->create();
        
        // Create some specific example products
        Product::factory()->create([
            'name' => 'Wireless Bluetooth Headphones',
            'description' => 'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
            'price' => 99.99,
            'stock' => 25,
            'sku' => 'WBH001',
            'active' => true,
        ]);
        
        Product::factory()->create([
            'name' => 'Smartphone Case',
            'description' => 'Durable protective case for smartphones with shock absorption.',
            'price' => 24.99,
            'stock' => 50,
            'sku' => 'SPC002',
            'active' => true,
        ]);
        
        Product::factory()->create([
            'name' => 'Coffee Mug Set',
            'description' => 'Set of 4 ceramic coffee mugs with ergonomic handles.',
            'price' => 34.99,
            'stock' => 5, // Low stock example
            'sku' => 'CMS003',
            'active' => true,
        ]);
        
        Product::factory()->create([
            'name' => 'Gaming Mouse',
            'description' => 'High-precision gaming mouse with customizable RGB lighting.',
            'price' => 79.99,
            'stock' => 0, // Out of stock example
            'sku' => 'GM004',
            'active' => true,
        ]);
    }
}
