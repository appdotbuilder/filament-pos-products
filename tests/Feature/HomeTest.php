<?php

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('displays POS dashboard with stats on home page', function () {
    // Create test products
    Product::factory()->count(10)->create(['active' => true]);
    Product::factory()->count(2)->create(['active' => false]);
    Product::factory()->count(3)->create(['stock' => 5]); // Low stock

    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('pos-dashboard')
            ->has('stats')
            ->has('recentProducts')
            ->where('stats.totalProducts', 15)
            ->where('stats.activeProducts', 13) // 10 + 3 from low stock
    );
});

it('shows recent products on home page', function () {
    Product::factory()->count(8)->create();

    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('pos-dashboard')
            ->has('recentProducts', 5) // Should limit to 5
    );
});

it('works with no products', function () {
    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('pos-dashboard')
            ->where('stats.totalProducts', 0)
            ->where('stats.activeProducts', 0)
            ->has('recentProducts', 0)
    );
});