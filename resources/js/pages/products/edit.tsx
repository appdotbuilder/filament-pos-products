import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';

interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    active: boolean;
    sku: string | null;
}

type ProductFormData = {
    name: string;
    description: string;
    price: string;
    stock: string;
    sku: string;
    active: boolean;
}

interface Props {
    product: Product;
    [key: string]: unknown;
}

export default function EditProduct({ product }: Props) {
    const { data, setData, put, processing, errors } = useForm<ProductFormData>({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        stock: product.stock.toString(),
        sku: product.sku || '',
        active: product.active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">✏️</span>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
                    </div>
                    <p className="text-gray-600">
                        Update product information and inventory details
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-xl">📦</span>
                                Product Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Product Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter product name"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Enter product description (optional)"
                                        rows={3}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Price */}
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Price *</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                            <Input
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.price}
                                                onChange={(e) => setData('price', e.target.value)}
                                                placeholder="0.00"
                                                className={`pl-8 ${errors.price ? 'border-red-500' : ''}`}
                                            />
                                        </div>
                                        <InputError message={errors.price} />
                                    </div>

                                    {/* Stock */}
                                    <div className="space-y-2">
                                        <Label htmlFor="stock">Stock Quantity *</Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            min="0"
                                            value={data.stock}
                                            onChange={(e) => setData('stock', e.target.value)}
                                            placeholder="0"
                                            className={errors.stock ? 'border-red-500' : ''}
                                        />
                                        <InputError message={errors.stock} />
                                    </div>
                                </div>

                                {/* SKU */}
                                <div className="space-y-2">
                                    <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                                    <Input
                                        id="sku"
                                        type="text"
                                        value={data.sku}
                                        onChange={(e) => setData('sku', e.target.value)}
                                        placeholder="e.g., ABC123"
                                        className={errors.sku ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.sku} />
                                    <p className="text-sm text-gray-500">
                                        Optional unique identifier for inventory tracking
                                    </p>
                                </div>

                                {/* Active Status */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="active"
                                        checked={data.active}
                                        onCheckedChange={(checked) => setData('active', !!checked)}
                                    />
                                    <Label htmlFor="active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Product is active and available for sale
                                    </Label>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button type="submit" disabled={processing} className="flex-1">
                                        {processing ? '⏳ Updating...' : '✅ Update Product'}
                                    </Button>
                                    <Button asChild variant="outline" className="flex-1">
                                        <Link href="/products">❌ Cancel</Link>
                                    </Button>
                                    <Button asChild variant="secondary" className="flex-1">
                                        <Link href={`/products/${product.id}`}>👁️ View Product</Link>
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Product Info */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <span>ℹ️</span>
                                Product Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-gray-600">
                            <p>• <strong>Product ID:</strong> #{product.id}</p>
                            <p>• <strong>Current Stock:</strong> {product.stock} units</p>
                            <p>• <strong>Current Price:</strong> ${product.price}</p>
                            <p>• <strong>Status:</strong> {product.active ? '✅ Active' : '❌ Inactive'}</p>
                            {product.sku && <p>• <strong>Current SKU:</strong> {product.sku}</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}