<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('allows authenticated users to view products index', function () {
    Product::factory()->count(3)->create();

    $response = $this->actingAs($this->user)
        ->get('/products');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('products/index')
            ->has('products.data', 3)
    );
});

it('allows authenticated users to create product', function () {
    $productData = [
        'name' => 'Test Product',
        'description' => 'A test product description',
        'price' => '99.99',
        'stock' => '10',
        'sku' => 'TEST001',
        'active' => true,
    ];

    $response = $this->actingAs($this->user)
        ->post('/products', $productData);

    $response->assertRedirect('/products');
    $this->assertDatabaseHas('products', [
        'name' => 'Test Product',
        'price' => 99.99,
        'stock' => 10,
        'sku' => 'TEST001',
        'active' => true,
    ]);
});

it('requires name and price for product creation', function () {
    $response = $this->actingAs($this->user)
        ->post('/products', [
            'description' => 'Missing name and price',
            'stock' => '5',
        ]);

    $response->assertSessionHasErrors(['name', 'price']);
});

it('allows authenticated users to view single product', function () {
    $product = Product::factory()->create();

    $response = $this->actingAs($this->user)
        ->get("/products/{$product->id}");

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('products/show')
            ->where('product.id', $product->id)
            ->where('product.name', $product->name)
    );
});

it('allows authenticated users to update product', function () {
    $product = Product::factory()->create();

    $updateData = [
        'name' => 'Updated Product Name',
        'description' => 'Updated description',
        'price' => '149.99',
        'stock' => '20',
        'sku' => 'UPD001',
        'active' => false,
    ];

    $response = $this->actingAs($this->user)
        ->put("/products/{$product->id}", $updateData);

    $response->assertRedirect('/products');
    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Updated Product Name',
        'price' => 149.99,
        'stock' => 20,
        'active' => false,
    ]);
});

it('allows authenticated users to delete product', function () {
    $product = Product::factory()->create();

    $response = $this->actingAs($this->user)
        ->delete("/products/{$product->id}");

    $response->assertRedirect('/products');
    $this->assertDatabaseMissing('products', ['id' => $product->id]);
});

it('requires unique SKU', function () {
    Product::factory()->create(['sku' => 'UNIQUE001']);

    $response = $this->actingAs($this->user)
        ->post('/products', [
            'name' => 'Another Product',
            'price' => '50.00',
            'stock' => '5',
            'sku' => 'UNIQUE001', // Duplicate SKU
        ]);

    $response->assertSessionHasErrors(['sku']);
});

it('prevents guests from accessing product management', function () {
    $response = $this->get('/products');
    $response->assertRedirect('/login');

    $response = $this->post('/products', []);
    $response->assertRedirect('/login');
});

it('shows POS dashboard on home page', function () {
    Product::factory()->count(5)->create();

    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('pos-dashboard')
            ->has('stats')
            ->has('recentProducts')
    );
});