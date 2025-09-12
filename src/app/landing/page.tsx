'use client';

import { useEffect, useState } from 'react';
// import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  Globe, 
  ArrowRight,
  CheckCircle,
  Star,
  Activity,
  Wallet,
  Search,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const features = [
    {
      icon: TrendingUp,
      title: "Real-time Market Data",
      description: "Get live cryptocurrency prices, market caps, and trading volumes updated every second."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-grade security with 99.9% uptime guarantee. Your data is always protected."
    },
    {
      icon: Zap,
      title: "Ultra-low Latency",
      description: "Lightning-fast execution with sub-millisecond response times for critical trading decisions."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive charts, technical indicators, and market insights to guide your investments."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of traders sharing insights, strategies, and market analysis."
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Track over 10,000 cryptocurrencies across 500+ exchanges worldwide."
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Cryptocurrencies", value: "10K+" },
    { label: "Exchanges", value: "500+" },
    { label: "Countries", value: "150+" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Professional Trader",
      content: "Clean Mind has revolutionized my trading strategy. The real-time data and analytics are unmatched.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Crypto Investor",
      content: "The platform's intuitive design and comprehensive market coverage make it my go-to tool for crypto analysis.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Portfolio Manager",
      content: "Outstanding performance and reliability. Clean Mind has become an essential part of my investment workflow.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 modern-scrollbar">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/landing" className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-slate-100">Clean Mind</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Dashboard
              </Link>
              <Link href="/markets" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Markets
              </Link>
              <Link href="/exchanges" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Exchanges
              </Link>
              <Link href="/analytics" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Analytics
              </Link>
              <Link href="/">
                <Button className="btn-gradient">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                Dashboard
              </Link>
              <Link href="/markets" className="block px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                Markets
              </Link>
              <Link href="/exchanges" className="block px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                Exchanges
              </Link>
              <Link href="/analytics" className="block px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                Analytics
              </Link>
              <div className="px-3 py-2">
                <Link href="/">
                  <Button className="w-full btn-gradient">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="space-y-16 pt-16 p-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 animated-bg opacity-10 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
          <div className="relative glass rounded-3xl p-8 md:p-12">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mr-4 float">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-600 to-purple-600 dark:from-slate-100 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Clean Mind
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">Crypto Monitor</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-xl max-w-3xl leading-relaxed">
                Track the cryptocurrency market with real-time data, trending coins, and comprehensive analytics. 
                <span className="text-blue-600 dark:text-blue-400 font-semibold"> Zero slippage, low latency execution.</span>
              </p>
              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full pulse-glow"></div>
                  <span>Real-time data</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full pulse-glow"></div>
                  <span>Ultra-low latency</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full pulse-glow"></div>
                  <span>Advanced analytics</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                <Link href="/">
                  <Button size="lg" className="btn-gradient">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="glass">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center glass">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Why Choose Clean Mind?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We provide the most comprehensive and reliable cryptocurrency market data platform 
              with cutting-edge technology and user-friendly interface.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Overview */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Complete Trading Platform
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to succeed in cryptocurrency trading, all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Market Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Real-time price tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Advanced charting tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Technical indicators</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Market sentiment analysis</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-blue-600" />
                  Portfolio Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Portfolio tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Performance analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Risk assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Watchlist management</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              What Our Users Say
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Join thousands of satisfied traders who trust Clean Mind for their cryptocurrency needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl"></div>
          <div className="relative glass rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Ready to Start Trading?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Join Clean Mind today and experience the future of cryptocurrency trading. 
              Get started in minutes with our intuitive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="btn-gradient">
                  Start Trading Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/markets">
                <Button size="lg" variant="outline" className="glass">
                  Explore Markets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}