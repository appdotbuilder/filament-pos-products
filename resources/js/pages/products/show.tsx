import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    active: boolean;
    sku: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    product: Product;
    [key: string]: unknown;
}

export default function ShowProduct({ product }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDelete = () => {
        router.delete(route('products.destroy', product.id), {
            onSuccess: () => {
                router.visit('/products');
            },
        });
    };

    const getStockStatus = () => {
        if (product.stock === 0) {
            return { text: 'Out of Stock', variant: 'destructive' as const, emoji: '❌' };
        } else if (product.stock <= 10) {
            return { text: 'Low Stock', variant: 'destructive' as const, emoji: '⚠️' };
        }
        return { text: 'In Stock', variant: 'default' as const, emoji: '✅' };
    };

    const stockStatus = getStockStatus();

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">📦</span>
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant={product.active ? 'default' : 'secondary'}>
                                {product.active ? '✅ Active' : '❌ Inactive'}
                            </Badge>
                            <Badge variant={stockStatus.variant}>
                                {stockStatus.emoji} {stockStatus.text}
                            </Badge>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={`/products/${product.id}/edit`}>✏️ Edit</Link>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <span className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2">🗑️ Delete</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete "{product.name}"? 
                                        This action cannot be undone and will remove the product from your inventory.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDelete}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        Delete Product
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Product Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-xl">📋</span>
                                    Product Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Product Name</h3>
                                    <p className="text-gray-600">{product.name}</p>
                                </div>
                                
                                {product.description && (
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Description</h3>
                                        <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
                                    </div>
                                )}

                                {product.sku && (
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">SKU</h3>
                                        <p className="text-gray-600 font-mono">{product.sku}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* System Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-xl">🕐</span>
                                    System Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Product ID</h3>
                                    <p className="text-gray-600">#{product.id}</p>
                                </div>
                                
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Created</h3>
                                    <p className="text-gray-600">{formatDate(product.created_at)}</p>
                                </div>
                                
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Last Updated</h3>
                                    <p className="text-gray-600">{formatDate(product.updated_at)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Pricing and Inventory */}
                    <div className="space-y-6">
                        {/* Pricing */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-xl">💰</span>
                                    Pricing
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-green-600 mb-2">
                                    {formatCurrency(product.price)}
                                </div>
                                <p className="text-sm text-gray-600">Current selling price</p>
                            </CardContent>
                        </Card>

                        {/* Inventory Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-xl">📊</span>
                                    Inventory
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium">Current Stock</span>
                                            <Badge variant={stockStatus.variant}>
                                                {stockStatus.emoji} {stockStatus.text}
                                            </Badge>
                                        </div>
                                        <div className={`text-2xl font-bold ${
                                            product.stock === 0 ? 'text-red-600' : 
                                            product.stock <= 10 ? 'text-orange-600' : 
                                            'text-green-600'
                                        }`}>
                                            {product.stock} units
                                        </div>
                                    </div>

                                    {product.stock <= 10 && product.stock > 0 && (
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                            <p className="text-sm text-orange-800">
                                                ⚠️ <strong>Low Stock Alert:</strong> Consider restocking this product soon.
                                            </p>
                                        </div>
                                    )}

                                    {product.stock === 0 && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                            <p className="text-sm text-red-800">
                                                ❌ <strong>Out of Stock:</strong> This product is currently unavailable for sale.
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <span className="text-sm text-gray-600">Estimated Value</span>
                                        <div className="text-lg font-semibold">
                                            {formatCurrency(product.price * product.stock)}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-xl">⚡</span>
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full" variant="outline">
                                    <Link href={`/products/${product.id}/edit`}>
                                        ✏️ Edit Product
                                    </Link>
                                </Button>
                                <Button asChild className="w-full" variant="outline">
                                    <Link href="/products">
                                        📋 Back to Products
                                    </Link>
                                </Button>
                                <Button asChild className="w-full" variant="outline">
                                    <Link href="/products/create">
                                        ➕ Add New Product
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}