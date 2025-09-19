<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the POS dashboard on the home page.
     */
    public function index()
    {
        $totalProducts = Product::count();
        $activeProducts = Product::active()->count();
        $totalValue = Product::sum('price');
        $lowStockProducts = Product::where('stock', '<=', 10)->count();
        $recentProducts = Product::latest()->take(5)->get();
        
        return Inertia::render('pos-dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'activeProducts' => $activeProducts,
                'totalValue' => $totalValue,
                'lowStockProducts' => $lowStockProducts,
            ],
            'recentProducts' => $recentProducts
        ]);
    }
}