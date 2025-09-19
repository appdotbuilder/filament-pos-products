import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    active: boolean;
    sku: string | null;
    created_at: string;
}

interface Stats {
    totalProducts: number;
    activeProducts: number;
    totalValue: number;
    lowStockProducts: number;
}

interface Props {
    stats: Stats;
    recentProducts: Product[];
    [key: string]: unknown;
}

export default function PosDashboard({ stats, recentProducts }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">🛒</span>
                        <h1 className="text-3xl font-bold text-gray-900">POS Dashboard</h1>
                    </div>
                    <p className="text-gray-600">
                        Overview of your Point of Sale system and product inventory
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <Button asChild>
                        <Link href="/products">📦 View All Products</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/products/create">➕ Add New Product</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/dashboard">📊 Analytics Dashboard</Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                            <span className="text-2xl">📦</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalProducts}</div>
                            <p className="text-xs text-muted-foreground">
                                Products in your catalog
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                            <span className="text-2xl">✅</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.activeProducts}</div>
                            <p className="text-xs text-muted-foreground">
                                Currently available for sale
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
                            <span className="text-2xl">💰</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
                            <p className="text-xs text-muted-foreground">
                                Total value of all products
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
                            <span className="text-2xl">⚠️</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.lowStockProducts}</div>
                            <p className="text-xs text-muted-foreground">
                                Products with ≤10 items
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Products */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-xl">🕐</span>
                            Recent Products
                        </CardTitle>
                        <CardDescription>
                            Latest products added to your inventory
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentProducts.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">📦</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Yet</h3>
                                <p className="text-gray-600 mb-4">
                                    Start building your inventory by adding your first product.
                                </p>
                                <Button asChild>
                                    <Link href="/products/create">🚀 Add Your First Product</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                                                {!product.active && (
                                                    <Badge variant="secondary">Inactive</Badge>
                                                )}
                                                {product.stock <= 10 && product.stock > 0 && (
                                                    <Badge variant="destructive">Low Stock</Badge>
                                                )}
                                                {product.stock === 0 && (
                                                    <Badge variant="destructive">Out of Stock</Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <span>💰 {formatCurrency(product.price)}</span>
                                                <span>📦 {product.stock} in stock</span>
                                                {product.sku && <span>🏷️ {product.sku}</span>}
                                                <span>📅 Added {formatDate(product.created_at)}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/products/${product.id}`}>View</Link>
                                            </Button>
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/products/${product.id}/edit`}>Edit</Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <div className="text-center pt-4">
                                    <Button asChild variant="outline">
                                        <Link href="/products">View All Products →</Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}