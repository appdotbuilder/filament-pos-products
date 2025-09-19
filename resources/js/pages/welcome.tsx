import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SharedData {
    auth: {
        user: unknown;
    };
    [key: string]: unknown;
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    if (auth.user) {
        return <AuthenticatedWelcome />;
    }

    return <GuestWelcome />;
}

function GuestWelcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="mb-6">
                        <span className="text-6xl">🛒</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Smart POS System
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Transform your business with our powerful Point of Sale application. 
                        Manage products, track inventory, and streamline your operations with ease.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="text-lg px-8">
                            <Link href="/login">🔐 Sign In</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg px-8">
                            <Link href="/register">🚀 Get Started</Link>
                        </Button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-4xl mb-4">📦</div>
                            <CardTitle>Product Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Add, edit, and organize your products with detailed information including 
                                names, descriptions, pricing, and stock levels.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-4xl mb-4">📊</div>
                            <CardTitle>Inventory Tracking</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Keep track of your stock levels in real-time. Get alerts for low inventory 
                                and never run out of popular items.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-4xl mb-4">💰</div>
                            <CardTitle>Sales Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Monitor your business performance with comprehensive analytics and 
                                reporting tools to make data-driven decisions.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-4xl mb-4">⚡</div>
                            <CardTitle>Fast Checkout</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Process transactions quickly with an intuitive interface designed 
                                for speed and efficiency during busy periods.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-4xl mb-4">📱</div>
                            <CardTitle>Mobile Ready</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Access your POS system from any device. Fully responsive design 
                                works perfectly on tablets, phones, and desktops.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-4xl mb-4">🔒</div>
                            <CardTitle>Secure & Reliable</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Built with enterprise-grade security and reliability. Your data 
                                is safe and your business operations are protected.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* Demo Section */}
                <div className="text-center mb-16">
                    <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">See It In Action</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-xl font-semibold mb-4">📋 Product Dashboard</h3>
                                <div className="space-y-2 text-sm text-gray-600 text-left">
                                    <div className="flex justify-between">
                                        <span>✅ Total Products:</span>
                                        <Badge variant="secondary">245</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>📈 Active Products:</span>
                                        <Badge variant="default">231</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>⚠️ Low Stock Alerts:</span>
                                        <Badge variant="destructive">12</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>💵 Total Inventory Value:</span>
                                        <Badge variant="outline">$45,230</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-xl font-semibold mb-4">🛍️ Quick Actions</h3>
                                <div className="space-y-3">
                                    <Button className="w-full" variant="outline">+ Add New Product</Button>
                                    <Button className="w-full" variant="outline">📊 View Reports</Button>
                                    <Button className="w-full" variant="outline">🔍 Search Inventory</Button>
                                    <Button className="w-full" variant="outline">📦 Manage Stock</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join thousands of businesses already using our POS system to grow their sales.
                    </p>
                    <Button asChild size="lg" className="text-lg px-12">
                        <Link href="/register">🚀 Start Your Free Trial</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

function AuthenticatedWelcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <div className="mb-6">
                        <span className="text-6xl">🎉</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Welcome Back to Your POS!
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Your Point of Sale system is ready to help you manage your business efficiently.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="text-lg px-8">
                            <Link href="/dashboard">📊 Go to Dashboard</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg px-8">
                            <Link href="/products">🛒 Manage Products</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-3xl mb-2">📦</div>
                            <CardTitle className="text-lg">Product Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/products">Manage Products</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-3xl mb-2">📊</div>
                            <CardTitle className="text-lg">Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/dashboard">View Dashboard</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-3xl mb-2">⚙️</div>
                            <CardTitle className="text-lg">Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/settings">Account Settings</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}