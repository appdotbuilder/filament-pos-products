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

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    products: PaginatedProducts;
    [key: string]: unknown;
}

export default function ProductsIndex({ products }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const handleDelete = (product: Product) => {
        router.delete(route('products.destroy', product.id), {
            onSuccess: () => {
                // Success handled by flash message
            },
        });
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">🛒</span>
                            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                        </div>
                        <p className="text-gray-600">
                            Manage your product inventory and catalog
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/products/create">➕ Add New Product</Link>
                    </Button>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{products.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Active Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {products.data.filter(p => p.active).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Low Stock</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {products.data.filter(p => p.stock <= 10).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Out of Stock</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-700">
                                {products.data.filter(p => p.stock === 0).length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Products Grid */}
                {products.data.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Yet</h3>
                            <p className="text-gray-600 mb-6">
                                Start building your inventory by adding your first product to the catalog.
                            </p>
                            <Button asChild size="lg">
                                <Link href="/products/create">🚀 Add Your First Product</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {products.data.map((product) => (
                                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                                            <div className="flex flex-col gap-1 items-end">
                                                {!product.active && (
                                                    <Badge variant="secondary">Inactive</Badge>
                                                )}
                                                {product.active && product.stock <= 10 && product.stock > 0 && (
                                                    <Badge variant="destructive">Low Stock</Badge>
                                                )}
                                                {product.stock === 0 && (
                                                    <Badge variant="destructive">Out of Stock</Badge>
                                                )}
                                                {product.active && product.stock > 10 && (
                                                    <Badge variant="default">In Stock</Badge>
                                                )}
                                            </div>
                                        </div>
                                        {product.description && (
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {product.description}
                                            </p>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Price:</span>
                                                <span className="font-semibold text-lg">
                                                    {formatCurrency(product.price)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Stock:</span>
                                                <span className={`font-semibold ${
                                                    product.stock === 0 ? 'text-red-600' : 
                                                    product.stock <= 10 ? 'text-orange-600' : 
                                                    'text-green-600'
                                                }`}>
                                                    {product.stock} units
                                                </span>
                                            </div>
                                            {product.sku && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">SKU:</span>
                                                    <span className="text-sm font-mono">{product.sku}</span>
                                                </div>
                                            )}
                                            
                                            <div className="flex gap-2 pt-3">
                                                <Button asChild variant="outline" size="sm" className="flex-1">
                                                    <Link href={`/products/${product.id}`}>👁️ View</Link>
                                                </Button>
                                                <Button asChild variant="outline" size="sm" className="flex-1">
                                                    <Link href={`/products/${product.id}/edit`}>✏️ Edit</Link>
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        <span className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-8 px-3">🗑️</span>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete "{product.name}"? 
                                                                This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(product)}
                                                                className="bg-red-600 hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {products.last_page > 1 && (
                            <div className="flex justify-center items-center gap-2">
                                {products.current_page > 1 && (
                                    <Button asChild variant="outline">
                                        <Link href={`/products?page=${products.current_page - 1}`}>
                                            Previous
                                        </Link>
                                    </Button>
                                )}
                                
                                <span className="px-4 py-2 text-sm text-gray-600">
                                    Page {products.current_page} of {products.last_page}
                                </span>
                                
                                {products.current_page < products.last_page && (
                                    <Button asChild variant="outline">
                                        <Link href={`/products?page=${products.current_page + 1}`}>
                                            Next
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AppShell>
    );
}